"""Agent runtime — the perceive → decide → execute loop (PRD R2, TECH-SPEC §3).

Decisions for a tick are computed concurrently (LLM calls parallelise), then the
executor applies them in deterministic agent-id order so replay is exact. This
module also captures engine events as agent observations, and runs nightly memory
compression + belief extraction.
"""
from __future__ import annotations

import asyncio
import hashlib
import json
import logging
from typing import Optional

from engine.actions import ActionExecutor
from engine.core import Economy
from engine.store import load_json
from causal import CausalLinkService
from world.recovery import assess_recovery
from llm.gateway import (
    BudgetExceeded, Gateway, GatewayInterrupted, LLMRequest, ProviderUnavailable,
)
from .memory import Memory
from .personas.library import (
    PERSONA_SCHEMA_HINT,
    configured_outlet_ids,
    persona_request,
    scripted_persona_enrichment,
    validate_persona_enrichment,
)
from .prompts import ContextBuilder
from .policies import (
    SUPPLIER_WARNING_POLICY_CONTRACT_HASH,
    SUPPLIER_WARNING_POLICY_ID,
    register_scripted_policies,
    scripted_decision,
)
from .scheduler import Scheduler
from .participant import ParticipantService
from .external import ExternalAgentService
from observability import get_logger, log_event as operational_log


logger = get_logger("agents")


async def _gather_fail_fast(coroutines):
    """Preserve input ordering while cancelling queued work after a failure."""
    tasks = [asyncio.create_task(coroutine) for coroutine in coroutines]
    try:
        return await asyncio.gather(*tasks)
    except BaseException:
        for task in tasks:
            if not task.done():
                task.cancel()
        await asyncio.gather(*tasks, return_exceptions=True)
        raise


class AgentRuntime:
    def __init__(self, economy: Economy, gateway: Gateway, config: dict):
        self.e = economy
        self.store = economy.store
        self.gw = gateway
        self.config = config
        self.mem = Memory(self.store, config)
        self.ctx = ContextBuilder(economy, self.mem, config)
        self.participant = ParticipantService(self.store, self.ctx, config)
        self.external = ExternalAgentService(economy, self.participant, config)
        self._recovery_hire_tick: int | None = None
        self._recovery_completed_hires: dict[int, int] = {}
        self.executor = ActionExecutor(
            economy,
            pre_action_hook=self._pre_recovery_employment_action,
            post_action_hook=self._post_recovery_employment_action,
        )
        self.causal = CausalLinkService(self.store)
        self.scheduler = Scheduler(self.store, config)
        register_scripted_policies(self.gw.scripted)
        self.gw.scripted.register("persona", scripted_persona_enrichment)

    async def enrich_pending_arrivals(self, tick: int) -> None:
        """Run each semantics-7 arrival's one governed persona enrichment call.

        Completion is marked by a logical public event, while the gateway owns
        private call provenance and durable same-run reuse.  If a process stops
        after the call is recorded but before the marker is written, retrying
        this phase reuses the stored response and applies the update once.
        """
        arrivals = self.store.query(
            "SELECT a.* FROM agents a WHERE a.arrived_tick=? AND a.kind='citizen' "
            "AND NOT EXISTS ("
            "  SELECT 1 FROM events e WHERE e.subject_type='agent' "
            "  AND e.subject_id=a.id AND e.kind IN "
            "  ('persona_enriched','persona_enrichment_fallback')"
            ") ORDER BY a.id",
            (tick,),
        )
        if not arrivals:
            return

        outlet_ids = configured_outlet_ids(
            self.config.get("outlets", [{"id": 1}, {"id": 2}]))
        for agent in arrivals:
            agent_id = int(agent["id"])
            system, user, context = persona_request(agent, outlet_ids)
            request = LLMRequest(
                role="persona",
                purpose="persona",
                system=system,
                user=user,
                context=context,
                agent_id=agent_id,
                tick=tick,
                max_tokens=int(self.config.get("llm", {}).get(
                    "persona_max_tokens", 350)),
                temperature=0.4,
            )
            # Budget/provider/replay failures deliberately propagate to World,
            # which pauses the partial tick instead of silently skipping a call.
            response = await self.gw.complete(
                request, schema_hint=PERSONA_SCHEMA_HINT)
            enrichment, error = validate_persona_enrichment(
                response.parsed, outlet_ids)
            if not response.ok or enrichment is None:
                reason = "gateway_contract_invalid" if not response.ok else str(error)
                with self.store.savepoint(
                        f"persona_fallback_{tick}_{agent_id}"):
                    self.store.log_event(
                        tick,
                        "persona_enrichment_fallback",
                        {"agent_id": agent_id, "reason": reason,
                         "source": "deterministic_base_persona"},
                        phase="MORNING",
                        subject_type="agent",
                        subject_id=agent_id,
                        importance=1.0,
                    )
                continue

            # The state update and its completion marker must commit together.
            # The preceding gateway row is already durable, so a process stop
            # before this savepoint releases retries against the unchanged base
            # prompt and reuses that one logical call.
            with self.store.savepoint(f"persona_enrich_{tick}_{agent_id}"):
                self.store.update(
                    "agents",
                    agent_id,
                    occupation=enrichment["occupation"],
                    personality_json=json.dumps(
                        enrichment["personality"], sort_keys=True),
                    political_lean=enrichment["political_lean"],
                    media_diet_json=json.dumps(enrichment["media_diet"]),
                    risk_tolerance=enrichment["risk_tolerance"],
                )
                self.store.log_event(
                    tick,
                    "persona_enriched",
                    {"agent_id": agent_id,
                     "fields": ["occupation", "personality", "political_lean",
                                "media_diet", "risk_tolerance"],
                     "source": "governed_llm"},
                    phase="MORNING",
                    subject_type="agent",
                    subject_id=agent_id,
                    importance=1.0,
                )

    # ── MORNING: decide (concurrent) ─────────────────────────────────────────
    async def decide_all(self, tick: int) -> list[dict]:
        gov = self.gw.governor
        agents = self.scheduler.scheduled_agents(
            tick, cadence_multiplier=gov.cadence_multiplier(), citizens_enabled=gov.citizens_enabled())
        participant_decision = self.participant.decision_for_tick(tick)
        external_agent_ids, external_decisions = self.external.decisions_for_tick(tick)
        participant_agent_id = (
            int(participant_decision["agent_id"]) if participant_decision is not None else None)
        if participant_agent_id is not None:
            agents = [a for a in agents if int(a["id"]) != participant_agent_id]
        if external_agent_ids:
            agents = [a for a in agents if int(a["id"]) not in external_agent_ids]
        tasks = [self._decide_guarded(tick, a) for a in agents]
        results = await _gather_fail_fast(tasks)
        decisions = []
        errors = 0
        for a, res in zip(agents, results):
            if isinstance(res, (BudgetExceeded, GatewayInterrupted, ProviderUnavailable)):
                raise res
            if isinstance(res, Exception):
                errors += 1
                self.store.log_event(tick, "decision_error", {
                    "agent_id": int(a["id"]), "error": str(res)}, phase="MORNING", importance=0.5)
                operational_log(logger, logging.WARNING, "agent.decision.failed",
                                run_id=self.gw.run_id, tick=tick, agent_id=int(a["id"]),
                                role=a["role"] or "citizen",
                                error_type=type(res).__name__, error=str(res))
                continue
            if res is not None:
                decisions.append(res)
        if participant_decision is not None:
            self._attach_civic_decision_context(tick, participant_decision)
            decisions.append(participant_decision)
        for decision in external_decisions:
            self._attach_civic_decision_context(tick, decision)
        decisions.extend(external_decisions)
        # An LLM outage pauses the sim rather than skipping agents silently (§8).
        if agents and errors > len(agents) // 2:
            operational_log(logger, logging.ERROR, "agent.decision.outage_suspected",
                            run_id=self.gw.run_id, tick=tick, errors=errors,
                            scheduled_agents=len(agents))
            raise RuntimeError(
                f"LLM outage suspected: {errors}/{len(agents)} decisions failed at tick {tick}")
        # deterministic execution order
        decisions.sort(key=lambda d: d["agent_id"])
        return decisions

    def _attach_civic_decision_context(self, tick: int, decision: dict) -> None:
        if (
            int(self.config.get("engine_semantics_version", 1)) < 12
            or not self.e.city.enabled
            or decision.get("attention_context_key")
        ):
            return
        agent_id = int(decision["agent_id"])
        agent = self.store.query_one(
            "SELECT * FROM agents WHERE id=? AND alive=1", (agent_id,))
        if agent is None:
            return
        context = self.ctx.build(agent, tick)
        purpose = str(decision.get("purpose") or context.get("purpose") or "decision")
        context_key, source_event_ids = self.e.city.persist_attention_context(
            agent_id,
            tick,
            purpose,
            context.get("attention", {}),
        )
        decision["attention_context_key"] = context_key or None
        decision["attention_source_event_ids"] = source_event_ids

    async def _decide_guarded(self, tick: int, agent):
        try:
            return await self._decide_one(tick, agent)
        except (BudgetExceeded, GatewayInterrupted, ProviderUnavailable):
            raise
        except Exception as exc:
            return exc

    async def _decide_one(self, tick: int, a) -> Optional[dict]:
        context = self.ctx.build(a, tick)
        self.ctx.persist_inbox_read_context(int(a["id"]), tick, context)
        purpose = context.get("purpose", "decision")
        attention_context_key, attention_source_event_ids = (
            self.e.city.persist_attention_context(
                int(a["id"]),
                tick,
                str(purpose),
                context.get("attention", {}),
            )
            if int(self.config.get("engine_semantics_version", 1)) >= 12
            else ("", [])
        )
        role = a["role"] or "citizen"
        semantics = int(self.config.get("engine_semantics_version", 1))
        if (7 <= semantics < 11
                and a["population_tier"] != "core"):
            env = scripted_decision(purpose, context)
            return {"agent_id": int(a["id"]), "purpose": purpose, "envelope": env,
                    "reasoning": env.get("reasoning", ""), "llm_call_id": None,
                    "communication_sources": context.get("communication_sources", []),
                    "communication_read_context_key": context.get(
                        "communication_read_context_key"),
                    "attention_context_key": attention_context_key or None,
                    "attention_source_event_ids": attention_source_event_ids}
        system, user = self.ctx.render_prompt(context)
        req = LLMRequest(role=role, purpose=purpose, system=system, user=user, context=context,
                         agent_id=int(a["id"]), tick=tick,
                         max_tokens=int(self.config.get("llm", {}).get(
                             "decision_max_tokens", 900)))
        resp = await self.gw.complete(req)
        env = resp.parsed if isinstance(resp.parsed, dict) else {}
        return {"agent_id": int(a["id"]), "purpose": purpose, "envelope": env,
                "reasoning": env.get("reasoning", ""),
                "llm_call_id": getattr(resp, "call_id", None),
                "communication_sources": context.get("communication_sources", []),
                "communication_read_context_key": context.get(
                    "communication_read_context_key"),
                "attention_context_key": attention_context_key or None,
                "attention_source_event_ids": attention_source_event_ids}

    def _recovery_employment_target(
            self, actor_id: int, action: dict, phase: str) -> tuple[int, int, str] | None:
        """Return only a currently authorized, live recovery employment action."""
        action_type = str(action.get("type") or "")
        if action_type not in {
                "post_job", "make_job_offer", "counter_job_offer",
                "accept_job_offer", "hire"}:
            return None
        try:
            if action_type == "post_job":
                firm_id = int(action.get("firm_id", 0))
                if firm_id <= 0:
                    firm_id = self.executor._owned_firm(actor_id)
                if firm_id <= 0 or not self.executor._controls_firm(actor_id, firm_id):
                    return None
                return firm_id, int(action.get("wage", -1)), action_type
            if action_type == "make_job_offer":
                if self.executor.engine_semantics_version < 6:
                    return None
                application_id = int(action.get("application_id", 0))
                application = self.executor._job_offer_application(application_id)
                if (application is None
                        or not self.executor._controls_firm(
                            actor_id, int(application["firm_id"]))
                        or int(application["agent_id"]) == actor_id
                        or not self.executor._alive(int(application["agent_id"]))
                        or not self.executor._job_currency_matches(application)):
                    return None
                return int(application["firm_id"]), int(action.get("wage", -1)), action_type
            if action_type == "hire":
                if self.executor.engine_semantics_version >= 6 and phase != "FIXTURE":
                    return None
                application_id = int(action.get("application_id", 0))
                application = self.store.query_one(
                    "SELECT * FROM applications WHERE id=? AND state='pending'", (application_id,))
                if application is None or not self.executor._alive(int(application["agent_id"])):
                    return None
                job = self.store.query_one(
                    "SELECT firm_id,wage_cents FROM jobs WHERE id=? AND status='open'",
                    (int(application["job_id"]),))
                if job is None or not self.executor._controls_firm(actor_id, int(job["firm_id"])):
                    return None
                return int(job["firm_id"]), int(job["wage_cents"]), action_type
            if self.executor.engine_semantics_version < 6:
                return None
            offer_id = int(action.get("offer_id", 0))
            offer = self.executor._job_offer(offer_id)
            if (self.executor._job_offer_counterparty_error(actor_id, offer)
                    or not self.executor._alive(int(offer["agent_id"]))
                    or not self.executor._job_currency_matches(offer)):
                return None
            wage = (int(action.get("wage", -1))
                    if action_type == "counter_job_offer" else int(offer["wage_cents"]))
            return int(offer["firm_id"]), wage, action_type
        except (TypeError, ValueError):
            return None

    def _recovery_hiring_state(self, tick: int, firm_id: int, wage_cents: int):
        """Reassess live firm economics at the actual action wage."""
        firm = self.store.query_one("SELECT * FROM firms WHERE id=?", (firm_id,))
        if firm is None:
            return None
        recovery = self.ctx._firm_view(firm, tick).get("recovery")
        if not isinstance(recovery, dict) or not bool(recovery.get("active")):
            return None
        settings = recovery.get("settings")
        inputs = recovery.get("inputs")
        if not isinstance(settings, dict) or not isinstance(inputs, dict):
            return (0, None, 0, 1)
        try:
            floor = int(settings["wage_floor_cents"])
            assessment = assess_recovery(
                enabled=True,
                settings=settings,
                price_cents=int(inputs["price_cents"]),
                input_cost_cents=int(inputs["input_cost_cents"]),
                output_per_worker=int(inputs["output_per_worker"]),
                pay_interval_ticks=int(inputs["pay_interval_ticks"]),
                wage_cents=int(wage_cents),
                cash_cents=int(inputs["cash_cents"]),
                current_payroll_cents=int(inputs["current_payroll_cents"]),
                current_headcount=int(inputs["current_headcount"]),
                target_headcount=int(inputs["target_headcount"]),
                recent_sales_units=int(inputs["recent_sales_units"]),
            )
            max_hires = max(0, int(settings["max_hires_per_firm_per_period"]))
            open_vacancies = max(0, int(recovery.get("open_vacancies", 1)))
        except (KeyError, TypeError, ValueError):
            return (0, None, 0, 1)
        return floor, assessment, max_hires, open_vacancies

    def _pre_recovery_employment_action(
            self, tick: int, actor_id: int, action: dict, phase: str) -> str | None:
        self._reset_recovery_hire_count(tick)
        target = self._recovery_employment_target(actor_id, action, phase)
        if target is None:
            return None
        firm_id, wage_cents, action_type = target
        state = self._recovery_hiring_state(tick, firm_id, wage_cents)
        if state is None:
            return None
        floor, assessment, max_hires, open_vacancies = state
        if assessment is None or floor <= 0 or wage_cents < floor:
            return "recovery policy rejects a wage below the configured floor"
        if assessment.allowed_new_hires < 1:
            return f"recovery policy rejects action: {assessment.reason}"
        if action_type == "post_job" and open_vacancies > 0:
            return "recovery policy rejects duplicate live vacancy"
        if (action_type in {"hire", "accept_job_offer"}
                and self._recovery_completed_hires.get(firm_id, 0) >= max_hires):
            return "recovery policy rejects hire cap for this period"
        return None

    def _post_recovery_employment_action(
            self, tick: int, actor_id: int, action: dict, phase: str, result: dict) -> None:
        if not result.get("ok") or action.get("type") not in {"hire", "accept_job_offer"}:
            return
        employment_id = int(result.get("employment_id", 0))
        employment = self.store.query_one(
            "SELECT firm_id,wage_cents FROM employments WHERE id=?", (employment_id,))
        if employment is None:
            return
        firm_key = int(employment["firm_id"])
        if self._recovery_hiring_state(
                tick, firm_key, int(employment["wage_cents"])) is None:
            return
        self._recovery_completed_hires[firm_key] = (
            self._recovery_completed_hires.get(firm_key, 0) + 1)

    def _reset_recovery_hire_count(self, tick: int) -> None:
        if self._recovery_hire_tick != int(tick):
            self._recovery_hire_tick = int(tick)
            self._recovery_completed_hires = {}

    # ── EXECUTION: apply (deterministic order) ───────────────────────────────
    def execute_decisions(self, tick: int, decisions: list[dict]) -> None:
        self._reset_recovery_hire_count(tick)
        for d in decisions:
            agent_id = d["agent_id"]
            env = d["envelope"] or {}
            actions = env.get("actions", []) if isinstance(env, dict) else []
            supplier_warning_protocol = (
                d.get("llm_call_id") is None
                and any(
                    isinstance(action, dict)
                    and action.get("policy_contract_hash")
                    == SUPPLIER_WARNING_POLICY_CONTRACT_HASH
                    for action in actions
                )
            )
            decision_id = None
            method = None
            if int(self.config.get("engine_semantics_version", 1)) >= 8:
                decision_id, method = self._record_decision(tick, d)
                if int(self.config.get("engine_semantics_version", 1)) >= 12:
                    self.e.city.bind_attention_decision(
                        d.get("attention_context_key"), decision_id)
                    for source_event_id in d.get(
                            "attention_source_event_ids", []):
                        self.causal.create(
                            "event",
                            int(source_event_id),
                            "decision",
                            decision_id,
                            "cited",
                            "actor_claim",
                            created_tick=tick,
                            actor_agent_id=int(agent_id),
                            method=method,
                            provenance={
                                "attention_context_key": d.get(
                                    "attention_context_key"),
                                "lane_limit": self.e.city.lane_limit,
                            },
                        )
                if not supplier_warning_protocol:
                    for source in d.get("communication_sources", []):
                        self.causal.create(
                            "memory", int(source["memory_id"]),
                            "decision", decision_id,
                            "motivated", "actor_claim",
                            actor_agent_id=int(agent_id),
                            method=method,
                            provenance={
                                "message_id": int(source["message_id"]),
                                "read_context_key": d.get("communication_read_context_key"),
                            },
                        )
            model_call_id = d.get("llm_call_id")
            rationale = str(d.get("reasoning") or "").strip()[:500]
            attributed_actions = []
            for action in actions:
                if not isinstance(action, dict):
                    attributed_actions.append(action)
                    continue
                attributed = dict(action)
                # Provenance is execution metadata, not model-controlled state.
                # Always bind an LLM-originated action to the authoritative call
                # record returned by the gateway, regardless of model output.
                if model_call_id is not None:
                    attributed["model_call_id"] = model_call_id
                if rationale and not attributed.get("rationale_summary"):
                    attributed["rationale_summary"] = rationale
                attributed_actions.append(attributed)
            last_proposal_id = int(self.store.scalar(
                "SELECT COALESCE(MAX(id),0) FROM action_proposals", default=0))
            last_event_id = int(self.store.scalar(
                "SELECT COALESCE(MAX(id),0) FROM events", default=0))
            results = self.executor.execute_actions(
                tick, agent_id, attributed_actions, phase="EXECUTION")
            proposals = self.store.query(
                    "SELECT id,payload_json FROM action_proposals WHERE id>? AND tick=? AND actor_id=? "
                    "ORDER BY id",
                    (last_proposal_id, tick, agent_id),
                )
            if decision_id is not None and not supplier_warning_protocol:
                for proposal in proposals:
                    self.causal.create(
                        "decision", decision_id,
                        "action_proposal", int(proposal["id"]),
                        "triggered", "engine",
                        created_tick=tick,
                        provenance={"execution_order": "agent_id_action_sequence"},
                    )
            self.participant.complete(d.get("participant_action_id"), results, tick)
            external_event_ids = [int(row["id"]) for row in self.store.query(
                "SELECT id FROM events WHERE id>? ORDER BY id", (last_event_id,))]
            external = getattr(self, "external", None)
            if external is not None:
                external.complete(
                    d.get("external_submission_id"), results, tick,
                    event_ids=external_event_ids,
                    resulting_state_hash=external.state_hash(agent_id))
            self.mem.apply_belief_updates(
                agent_id, env.get("belief_updates", []), tick,
                source=str(d.get("purpose") or "decision"),
                source_llm_call_id=d.get("llm_call_id"))
            if decision_id is not None:
                for update in env.get("belief_updates", []) or []:
                    if not isinstance(update, dict) or update.get("key") is None:
                        continue
                    belief = self.store.query_one(
                        "SELECT id FROM beliefs WHERE agent_id=? AND key=?",
                        (agent_id, str(update["key"])),
                    )
                    if belief is None:
                        continue
                    for source in d.get("communication_sources", []):
                        self.causal.create(
                            "memory", int(source["memory_id"]),
                            "belief", int(belief["id"]),
                            "triggered", "engine",
                            created_tick=tick,
                            provenance={
                                "decision_id": decision_id,
                                "rule": (
                                    SUPPLIER_WARNING_POLICY_ID
                                    if supplier_warning_protocol else "decision_belief_update"
                                ),
                            },
                        )
                    if supplier_warning_protocol:
                        for action, proposal in zip(attributed_actions, proposals):
                            if (not isinstance(action, dict)
                                    or action.get("causal_belief_key") != str(update["key"])):
                                continue
                            self.causal.create(
                                "belief", int(belief["id"]),
                                "action_proposal", int(proposal["id"]),
                                "motivated", "actor_claim",
                                created_tick=tick,
                                actor_agent_id=int(agent_id),
                                method=SUPPLIER_WARNING_POLICY_ID,
                                provenance={
                                    "decision_id": decision_id,
                                    "policy_contract_hash": action["policy_contract_hash"],
                                    "policy_input_hash": action["policy_input_hash"],
                                    "read_context_key": d.get(
                                        "communication_read_context_key"),
                                },
                            )
            reasoning = (d.get("reasoning") or "").strip()
            if reasoning:
                self.mem.observe(agent_id, tick, f"I decided: {reasoning}", importance=1.0,
                                 entities=["self"])

    def _record_decision(self, tick: int, decision: dict) -> tuple[int, str]:
        agent_id = int(decision["agent_id"])
        purpose = str(decision.get("purpose") or "decision")
        if decision.get("participant_action_id") is not None:
            method = "participant"
        elif decision.get("llm_call_id") is not None:
            method = "model_call"
        else:
            method = "scripted_policy"
        identity = {
            "tick": int(tick),
            "agent_id": agent_id,
            "purpose": purpose,
            "method": method,
        }
        dedupe_key = hashlib.sha256(
            json.dumps(identity, sort_keys=True, separators=(",", ":")).encode("utf-8")
        ).hexdigest()
        reasoning_fingerprint = hashlib.sha256(
            str(decision.get("reasoning") or "").encode("utf-8")
        ).hexdigest()
        self.store.execute(
            "INSERT OR IGNORE INTO agent_decisions "
            "(dedupe_key,tick,agent_id,purpose,method,model_call_id,read_context_key,"
            "attention_context_key,reasoning_fingerprint) VALUES (?,?,?,?,?,?,?,?,?)",
            (
                dedupe_key, tick, agent_id, purpose, method,
                decision.get("llm_call_id"),
                decision.get("communication_read_context_key"),
                decision.get("attention_context_key"),
                reasoning_fingerprint,
            ),
        )
        row = self.store.query_one(
            "SELECT id,reasoning_fingerprint,attention_context_key "
            "FROM agent_decisions WHERE dedupe_key=?",
            (dedupe_key,),
        )
        if row["reasoning_fingerprint"] != reasoning_fingerprint:
            raise RuntimeError("decision replay identity mismatch")
        if row["attention_context_key"] != decision.get("attention_context_key"):
            raise RuntimeError("decision attention context replay identity mismatch")
        return int(row["id"]), method

    # ── observation capture from engine events ───────────────────────────────
    def capture_event_observations(self, tick: int) -> None:
        events = self.store.query(
            "SELECT * FROM events WHERE tick=? AND kind NOT IN "
            "('action_rejected','metrics_snapshot','arrival_scheduled',"
            "'belief_updated','belief_update_normalized','belief_update_rejected') "
            "ORDER BY id", (tick,))
        for ev in events:
            payload = load_json(ev["payload_json"], {}) or {}
            kind = ev["kind"]
            importance = float(ev["importance"])
            # Direct-subject observation.
            if ev["subject_type"] == "agent" and ev["subject_id"]:
                self.mem.observe(int(ev["subject_id"]), tick, self._describe(kind, payload),
                                 importance=importance, entities=self._entities(kind, payload))
            # Bank failure / rumor concern depositors of that bank.
            if kind == "bank_failure":
                bank_id = payload.get("bank_id")
                for dep in self._depositors(bank_id):
                    self.mem.observe(dep, tick, f"My bank (bank {bank_id}) failed.",
                                     importance=5.0, entities=[f"bank:{bank_id}", f"rumor_bank:{bank_id}"])
            if kind == "death":
                for tie in self._ties(payload.get("agent_id")):
                    self.mem.observe(tie, tick, f"{payload.get('name','Someone')} has died.",
                                     importance=3.0, entities=["death"])

    def _describe(self, kind: str, payload: dict) -> str:
        return {
            "wage_paid": f"I was paid {payload.get('wage_cents',0)}c.",
            "hired": "I got a job.",
            "fired": "I was let go from my job.",
            "loan_originated": f"My loan of {payload.get('amount_cents',0)}c was approved.",
            "loan_default": "I defaulted on a loan.",
            "loan_arrears": "I missed a loan payment.",
            "illness_onset": "I fell ill.",
            "recovery": "I recovered.",
            "goods_sale": "I bought goods.",
            "deposit_move": f"I moved my deposits to bank {payload.get('to_bank')}.",
            "retirement": "I retired.",
            "birth": "A new dependent joined my household.",
            "benefit_paid": "I received an unemployment benefit payment.",
            "policy_bought": "I took out health insurance.",
            "policy_lapsed": "My health insurance lapsed - I couldn't pay the premium.",
            "insurance_claim": "My insurance covered part of my medical bill.",
            "pitch_made": "I pitched my company to the venture fund.",
            "vc_funded": "My company raised a venture round.",
        }.get(kind, f"Something happened: {kind}.")

    def _entities(self, kind: str, payload: dict) -> list[str]:
        ents = ["self"]
        if "bank_id" in payload:
            ents.append(f"bank:{payload['bank_id']}")
        if "to_bank" in payload:
            ents.append(f"bank:{payload['to_bank']}")
        if "firm_id" in payload:
            ents.append(f"firm:{payload['firm_id']}")
        return ents

    def _depositors(self, bank_id) -> list[int]:
        if bank_id is None:
            return []
        rows = self.store.query(
            "SELECT DISTINCT owner_id FROM accounts WHERE bank_id=? AND owner_type='agent'", (bank_id,))
        return [int(r["owner_id"]) for r in rows if r["owner_id"] is not None]

    def _ties(self, agent_id) -> list[int]:
        if agent_id is None:
            return []
        rows = self.store.query(
            "SELECT CASE WHEN agent_a=? THEN agent_b ELSE agent_a END AS other FROM social_ties "
            "WHERE agent_a=? OR agent_b=?", (agent_id, agent_id, agent_id))
        return [int(r["other"]) for r in rows]

    # ── MEMORY: nightly compression + belief extraction ──────────────────────
    async def compress_memories(self, tick: int) -> None:
        # Only agents with observations today need compressing.
        living_world = int(self.config.get("engine_semantics_version", 1)) >= 5
        if living_world:
            rows = self.store.query(
                "SELECT DISTINCT m.agent_id,a.population_tier FROM memories m "
                "JOIN agents a ON a.id=m.agent_id "
                "WHERE m.tick=? AND m.kind='observation' "
                "AND m.agent_id NOT IN (SELECT agent_id FROM memories "
                "WHERE tick=? AND kind='summary') ORDER BY m.agent_id", (tick, tick))
        else:
            rows = self.store.query(
                "SELECT DISTINCT agent_id,NULL AS population_tier FROM memories "
                "WHERE tick=? AND kind='observation' "
                "AND agent_id NOT IN (SELECT agent_id FROM memories "
                "WHERE tick=? AND kind='summary') ORDER BY agent_id", (tick, tick))
        # Semantics-v5 uses deterministic daily compression for everyone and a
        # model-capable weekly reflection for the core below. Older semantics
        # retain their daily model path unchanged.
        agent_ids = [] if living_world else [int(r["agent_id"]) for r in rows]
        for row in rows:
            if not living_world:
                continue
            aid = int(row["agent_id"])
            observations = self.mem.todays_observations(aid, tick)
            if not observations:
                continue
            summary = " | ".join(
                str(item.get("text", item)) for item in observations)[:1800]
            importance = max(
                (float(item.get("importance", 1.0)) for item in observations),
                default=1.0,
            )
            self.mem.write_summary(aid, tick, summary, importance)
        sem_tasks = [self._compress_one(tick, aid) for aid in agent_ids]
        results = await _gather_fail_fast(sem_tasks)
        for aid, res in zip(agent_ids, results):
            if isinstance(res, BudgetExceeded):
                raise res
            if isinstance(res, Exception):
                raise res
            if res is None:
                continue
            summary, importance, belief_updates, llm_call_id = res
            self.mem.apply_belief_updates(
                aid, belief_updates, tick, source="memory",
                source_llm_call_id=llm_call_id)
            self.mem.write_summary(aid, tick, summary, importance)

        if tick % 7 == 0:
            if living_world:
                weekly_rows = self.store.query(
                    "SELECT DISTINCT m.agent_id,a.population_tier FROM memories m "
                    "JOIN agents a ON a.id=m.agent_id WHERE m.kind='summary' "
                    "AND m.demoted=0 AND m.tick BETWEEN ? AND ? ORDER BY m.agent_id",
                    (tick - 6, tick))
            else:
                weekly_rows = self.store.query(
                    "SELECT DISTINCT agent_id,NULL AS population_tier FROM memories "
                    "WHERE kind='summary' AND demoted=0 AND tick BETWEEN ? AND ? "
                    "ORDER BY agent_id", (tick - 6, tick))
            weekly_ids = [
                int(r["agent_id"]) for r in weekly_rows
                if not living_world or r["population_tier"] == "core"
            ]
            for row in weekly_rows:
                if not living_world or row["population_tier"] == "core":
                    continue
                aid = int(row["agent_id"])
                daily = self.store.query(
                    "SELECT text,importance FROM memories WHERE agent_id=? "
                    "AND kind='summary' AND demoted=0 AND tick BETWEEN ? AND ? "
                    "ORDER BY tick,id", (aid, tick - 6, tick))
                if daily:
                    summary = "Week summary: " + " | ".join(
                        str(item["text"]) for item in daily)[:1800]
                    importance = max(float(item["importance"]) for item in daily)
                    self.mem.weekly_rollup(aid, tick, summary, importance)
            weekly_results = await _gather_fail_fast(
                self._rollup_week(tick, aid) for aid in weekly_ids)
            for aid, res in zip(weekly_ids, weekly_results):
                if isinstance(res, Exception):
                    raise res
                if res is None:
                    continue
                summary, importance = res
                self.mem.weekly_rollup(aid, tick, summary, importance)

    async def _compress_one(
        self, tick: int, agent_id: int,
    ) -> Optional[tuple[str, float, list[dict], Optional[int]]]:
        obs = self.mem.todays_observations(agent_id, tick)
        if not obs:
            return
        context = {"observations": obs, "tick": tick, "rng_seed": agent_id * 7 + tick,
                   "infl_hint": self.ctx.inflation_signal()}
        schema = '{"summary":"concise memory","importance":1.0,"belief_updates":[]}'
        req = LLMRequest(
            role="citizen", purpose="memory",
            system=(
                "Compress today's observations into one concise first-person memory. "
                "Respond ONLY with JSON matching " + schema
                + ". importance must be a number from 0 to 5. belief_updates must "
                  "contain only objects with key and numeric value fields."),
            user=json.dumps(context)[:4000], context=context,
            agent_id=agent_id, tick=tick, max_tokens=200)
        resp = await self.gw.complete(req, schema_hint=schema)
        env = resp.parsed if isinstance(resp.parsed, dict) else {}
        summary = str(env.get("summary", "")).strip()
        if not summary:
            summary = " | ".join(str(item.get("text", item)) for item in obs)[:1800]
        try:
            importance = float(env.get("importance", 1.0))
        except (TypeError, ValueError):
            importance = 1.0
        updates = env.get("belief_updates", [])
        return (summary, importance, updates if isinstance(updates, list) else [],
                getattr(resp, "call_id", None))

    async def _rollup_week(
        self, tick: int, agent_id: int,
    ) -> Optional[tuple[str, float]]:
        rows = self.store.query(
            "SELECT tick, text, importance FROM memories WHERE agent_id=? "
            "AND kind='summary' AND demoted=0 AND tick BETWEEN ? AND ? ORDER BY tick, id",
            (agent_id, tick - 6, tick))
        if not rows:
            return None
        daily = [{"tick": int(r["tick"]), "text": r["text"],
                  "importance": float(r["importance"])} for r in rows]
        context = {"weekly_summaries": daily, "tick": tick,
                   "rng_seed": agent_id * 701 + tick}
        schema = '{"summary":"concise weekly memory","importance":1.0}'
        req = LLMRequest(
            role="citizen", purpose="memory",
            system=("Synthesize the daily summaries into one concise weekly memory. "
                    "Respond ONLY with JSON matching " + schema + "."),
            user=json.dumps(daily)[:4000], context=context,
            agent_id=agent_id, tick=tick, max_tokens=240)
        resp = await self.gw.complete(req, schema_hint=schema)
        env = resp.parsed if isinstance(resp.parsed, dict) else {}
        summary = str(env.get("summary", "")).strip()
        if not summary:
            summary = "Week summary: " + " | ".join(r["text"] for r in daily)[:1800]
        importance = float(env.get("importance", max(r["importance"] for r in daily)))
        return summary, importance
