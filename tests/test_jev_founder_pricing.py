"""Founder pilot boundaries, execution authority, and metered typed transport."""
import asyncio
import copy
import json
from pathlib import Path

import httpx
import pytest

from agents.decision_candidates import compile_candidates
from agents.typed_policy import TypedDecisionPolicy
from llm.decision_config import FOUNDER_PRICE_VERSION, decision_policy
from llm.gateway import Gateway, LLMRequest, ProviderUnavailable
from run import open_run
from run_config import load_config
from tests.test_jev_candidates import observation
from tests.test_jev_contract import evaluation, transport
from tests.test_jev_gateway import configuration
from tests.test_jev_runtime import typed_handler

ROOT = Path(__file__).resolve().parents[1]


def config():
    value = configuration()
    value["llm"]["decision_policy"]["version"] = FOUNDER_PRICE_VERSION
    return value


def founder():
    value = observation()
    value["prices"] = []
    value["jobs"] = []
    value.update(purpose="founder", my_firm={
        "firm_id": 12, "price": 1000, "unit_cost": 200, "inventory": 50,
        "cash": 1000000, "employees": 1, "payroll": 3000, "recent_sales": 1,
        "employee_roster": [{"wage": 3000, "pay_interval_ticks": 30}],
        "pricing_observation": {"output_per_worker": 10, "currency_code": "CAD",
            "window_start_tick": 1, "window_end_tick": 3, "sales_units": 9, "revenue_cents": 9000}})
    return value


def menu(context=None):
    context = founder() if context is None else context
    return compile_candidates(context, context["tick"], decision_policy(config()))


def test_pure_bounded_menu_projects_only_authorized_pricing_facts():
    context = founder()
    before = copy.deepcopy(context)
    result = menu(context)
    assert result.unsupported_reason is None
    assert result.compiler_version == "founder-prices-v1"
    assert result.menu_hash == menu(copy.deepcopy(context)).menu_hash
    assert context == before
    assert "private_balance_sheet" not in result.evaluation_json
    assert "other_unneeded_private_content" not in result.evaluation_json
    assert "memories" not in result.evaluation["state"]
    assert result.actions_for(result.baseline_choice) == [{"type": "set_price", "firm_id": 12, "price": 950}]
    assert {c["facts"].get("price_cents") for c in result.candidates[:-1]} == {950, 1000, 1050}
    for candidate in result.candidates:
        for action in candidate["actions"]:
            assert action["type"] == "set_price" and action["firm_id"] == 12
            assert abs(action["price"] - 1000) * 10000 <= 1000 * 500
    result.actions_for(result.baseline_choice)[0]["price"] = 1
    assert result.actions_for(result.baseline_choice)[0]["price"] == 950
    with pytest.raises(ValueError):
        result.actions_for("invented")
    with pytest.raises(ValueError):
        result.actions_for("escalate")
    context["my_firm"]["pricing_observation"]["sales_units"] += 1
    assert menu(context).menu_hash != result.menu_hash


@pytest.mark.parametrize("price", [1, 2, 19, 20, 21, 99, 101, 999, 10**15])
def test_integer_rounding_no_duplicate_prices_or_bound_overflow(price):
    context = founder()
    context["my_firm"].update(price=price, unit_cost=0, payroll=0,
        employee_roster=[{"wage": 0, "pay_interval_ticks": 30}])
    result = menu(context)
    prices = [a["price"] for c in result.candidates for a in c["actions"]]
    assert len(prices) == len(set(prices))
    assert all(1 <= p <= 10**15 and 0 < abs(p-price)*10000 <= price*500 for p in prices)


def test_payroll_floor_prevents_discounts_but_allows_gradual_recovery():
    context = founder()
    context["my_firm"].update(payroll=300000,
        employee_roster=[{"wage": 300000, "pay_interval_ticks": 30}])
    result = menu(context)
    assert result.unsupported_reason is None
    assert result.evaluation["state"]["payroll_floor_cents"] == 1440
    assert result.evaluation["state"]["price_floor_cents"] == 1000
    assert [a["price"] for c in result.candidates for a in c["actions"]] == [1050]
    assert result.baseline_choice == "wait"


@pytest.mark.parametrize("field,value", [("price", True), ("unit_cost", -1), ("inventory", 1.5),
    ("cash", 10**16), ("payroll", False), ("employees", 2)])
def test_invalid_observation_cannot_compile(field, value):
    context = founder()
    context["my_firm"][field] = value
    with pytest.raises(ValueError):
        menu(context)


@pytest.mark.parametrize("change,reason", [
    ({"tick": 7}, "periodic_founder_strategy_review"),
    ({"portfolio_day": True}, "portfolio_or_study_review"),
    ({"household_decisions": {"pending": [1]}}, "household_decision_due"),
    ({"civic_required_action": {"type": "vote"}}, "required_civic_action"),
    ({"legal_work": {"pending": [1]}}, "legal_work"),
])
def test_required_work_and_strategy_review_use_original_route(change, reason):
    context = founder()
    context.update(change)
    assert menu(context).unsupported_reason == reason


def test_hiring_and_recovery_remain_outside_pricing_menu():
    context = founder()
    context["firm_applications"] = [{"application_id": 42}]
    assert menu(context).unsupported_reason == "non_pricing_founder_work"
    context = founder()
    context["my_firm"]["recovery"] = {"active": True}
    assert menu(context).unsupported_reason == "operational_recovery"


def test_citizens_legacy_founders_and_specialists_are_not_intercepted(store, monkeypatch):
    monkeypatch.setenv("TEST_JEV_KEY", "fixture-key")
    gateway = Gateway(store, config())
    try:
        policy = TypedDecisionPolicy(gateway, config())
        assert policy.prepare(observation(), 4) is None
        old_policy = TypedDecisionPolicy(gateway, configuration())
        assert old_policy.prepare(founder(), 4) is None
        context = founder()
        context["agent"]["role"] = "reporter"
        assert policy.prepare(context, 4).unsupported_reason == "specialized_role"
    finally:
        gateway.close()


@pytest.mark.parametrize("answer", ["normal", "invented", "low_confidence"])
def test_founder_transport_is_accounted_strict_and_reused(store, monkeypatch, answer):
    monkeypatch.setenv("TEST_JEV_KEY", "fixture-key")
    calls = []
    def handler(request):
        calls.append(request)
        body = json.loads(typed_handler(request).content)
        if answer == "invented":
            body["answers"]["action"]["choice"] = "invented"
        if answer == "low_confidence":
            body["answers"]["action"]["confidence"] = .1
        return httpx.Response(200, json=body)
    transport(monkeypatch, handler)
    cfg = config()
    cfg["llm"]["decision_policy"]["minimum_confidence"] = .5
    gateway = Gateway(store, cfg)
    policy = TypedDecisionPolicy(gateway, cfg)
    context = founder()
    request = LLMRequest(role="citizen", purpose="founder", tick=4, agent_id=7, context=context)
    try:
        for _ in range(2):
            if answer == "invented":
                with pytest.raises(ProviderUnavailable):
                    asyncio.run(policy.complete(request, menu(context)))
            else:
                result = asyncio.run(policy.complete(request, menu(context)))
                assert result.receipt["contract"] == FOUNDER_PRICE_VERSION
                assert result.receipt["purpose"] == "founder"
                assert result.envelope["reasoning"] == ""
                if answer == "low_confidence":
                    assert result.receipt["status"] == "abstained"
                    assert result.envelope["actions"] == [{"type": "do_nothing"}]
                else:
                    assert result.envelope["actions"][0]["type"] == "set_price"
        assert len(calls) == 1
        assert gateway.governor.total_spend() == pytest.approx(.0000042)
        assert gateway._typed_reserved_usd == 0
    finally:
        gateway.close()


def test_untyped_founder_request_still_rejected(monkeypatch):
    from llm.openrouter_decisions import OpenRouterDecisionsAdapter
    monkeypatch.setenv("TEST_JEV_KEY", "fixture-key")
    adapter = OpenRouterDecisionsAdapter({"api_key_env": "TEST_JEV_KEY"})
    with pytest.raises(ValueError, match="typed evaluation"):
        asyncio.run(adapter.complete("typesafe/jev-1.13", [], purpose="founder",
                                     context={"_evaluation": evaluation()}))


def test_owned_firm_completed_sales_window_and_execution_authority(tmp_path):
    cfg = load_config(ROOT / "runs/jev-founder-offline.yaml")
    store, world, _ = open_run(cfg, None, None, data_dir=tmp_path)
    try:
        firm = store.query_one("SELECT * FROM firms WHERE founder_agent_id IS NOT NULL ORDER BY id LIMIT 1")
        firm_id, actor = int(firm["id"]), int(firm["founder_agent_id"])
        for tick, identity, qty in [(0, firm_id, 50), (1, firm_id, 2), (3, firm_id, 7),
                                    (4, firm_id, 100), (2, firm_id+100, 200)]:
            store.log_event(tick, "goods_sale", {"firm_id": identity, "qty": qty, "total_cents": qty*1000})
        view = world.runtime.ctx._firm_view(firm, 4)
        assert view["pricing_observation"]["sales_units"] == 9
        assert view["pricing_observation"]["revenue_cents"] == 9000
        context = founder()
        context["agent"]["id"] = actor
        context["my_firm"]["firm_id"] = firm_id
        selected = menu(context)
        actions = selected.actions_for(selected.baseline_choice)
        before = store.scalar("SELECT COUNT(*) FROM transactions")
        outcomes = world.runtime.executor.execute_actions(4, actor, actions, phase="EXECUTION")
        assert outcomes[0]["ok"]
        product = json.loads(store.scalar("SELECT product_json FROM firms WHERE id=?", (firm_id,)))
        assert product["unit_price_cents"] == 950
        # Ownership is checked at execution, even if a formerly valid menu exists.
        store.update("firms", firm_id, founder_agent_id=None)
        outcomes = world.runtime.executor.execute_actions(4, actor, actions, phase="EXECUTION")
        assert not outcomes[0]["ok"] and "control" in outcomes[0]["reason"]
        assert store.scalar("SELECT COUNT(*) FROM transactions") == before
        assert world.economy.ledger.reconcile()[0]
    finally:
        world.close()


def test_comparator_uses_completed_units_instead_of_legacy_transaction_count():
    context = founder()
    first = menu(context)
    context["my_firm"]["recent_sales"] = 999999
    assert menu(context).candidates == first.candidates
    assert menu(context).baseline_choice == first.baseline_choice
    context["my_firm"]["pricing_observation"]["window_end_tick"] = 4
    with pytest.raises(ValueError, match="completed sales window"):
        menu(context)


def test_founder_profiles_are_opt_in_and_keep_background_routes_scripted():
    from llm.readiness import validate_llm_config
    offline = load_config(ROOT / "runs/jev-founder-offline.yaml")
    live = load_config(ROOT / "runs/jev-founder-live.yaml")
    assert validate_llm_config(offline)["ready"]
    for cfg in (offline, live):
        assert decision_policy(cfg)["version"] == FOUNDER_PRICE_VERSION
        assert cfg["llm"]["default_route"] == {"provider": "scripted", "model": "scripted"}
    assert decision_policy(load_config(ROOT / "runs/jev-offline.yaml"))["version"] == "bounded-economic-choice-v1"
    offline["engine_semantics_version"] = 15
    with pytest.raises(ValueError, match="Semantics 16"):
        decision_policy(offline)
