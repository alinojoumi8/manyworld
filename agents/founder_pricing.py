"""Prospective, conservative founder pricing menus; no world reads or mutations."""
from __future__ import annotations

from llm.decision_config import FOUNDER_PRICE_VERSION
from llm.decisions import canonical_json, decision_hash, validate_evaluation
from .decision_candidates import COMPILER_VERSIONS, DecisionMenu, _integer, _unsupported
from .policies import founder_decision


def compile_founder_prices(context: dict, tick: int) -> DecisionMenu:
    """Use a distinct contract; legacy citizen menus and founder routes stay intact."""
    if type(tick) is not int or type(context.get("tick")) is not int or context["tick"] != tick:
        raise ValueError("founder pricing observation is not bound to the requested tick")
    actor = _integer(context.get("agent", {}).get("id"), "actor", minimum=1)
    firm = context.get("my_firm") or {}
    reason = None
    target = None
    projection = {"domain": FOUNDER_PRICE_VERSION, "tick": tick, "actor_id": actor}
    candidates = [{"id": "wait", "actions": [], "facts": {"meaning": "Hold the current price."}}]
    if context.get("purpose") != "founder" or not firm:
        reason = "not_a_founder_turn"
    elif context.get("agent", {}).get("role"):
        reason = "specialized_role"
    elif tick % 7 == 0:
        reason = "periodic_founder_strategy_review"
    elif firm.get("recovery", {}).get("active"):
        reason = "operational_recovery"
    else:
        # Reuse required personal/legal/care boundaries without treating firm
        # ownership itself as an exclusion. No mutation of the supplied context.
        reason = _unsupported({**context, "purpose": "decision", "my_firm": None})
    if reason is None:
        for field in ("price", "unit_cost", "inventory", "cash", "payroll", "employees"):
            _integer(firm.get(field), field, minimum=1 if field == "price" else 0)
        history = firm.get("pricing_observation") or {}
        if (type(history.get("window_start_tick")) is not int
                or type(history.get("window_end_tick")) is not int
                or history["window_start_tick"] != max(0, tick - 3)
                or history["window_end_tick"] != tick - 1):
            raise ValueError("founder pricing requires its completed sales window")
        units = _integer(history.get("sales_units"), "sales units")
        # Legacy recent_sales counts transactions and may include today's sales.
        # Only this new contract uses completed-window units for its comparator.
        baseline_context = {**context, "my_firm": {**firm, "recent_sales": units}}
        actions = founder_decision(baseline_context).get("actions", [])
        if (len(actions) != 1 or actions[0].get("type") != "set_price"
                or actions[0].get("firm_id") != firm.get("firm_id")):
            reason = "non_pricing_founder_work"
        else:
            target = _integer(actions[0].get("price"), "baseline price", minimum=1)
    if reason is None:
        firm_id = _integer(firm.get("firm_id"), "firm", minimum=1)
        price = _integer(firm.get("price"), "price", minimum=1)
        cost = _integer(firm.get("unit_cost"), "input cost")
        inventory = _integer(firm.get("inventory"), "inventory")
        cash = _integer(firm.get("cash"), "firm cash")
        payroll = _integer(firm.get("payroll"), "payroll")
        workers = _integer(firm.get("employees"), "employees")
        history = firm.get("pricing_observation") or {}
        output = _integer(history.get("output_per_worker"), "output per worker")
        roster = firm.get("employee_roster")
        if not isinstance(roster, list) or len(roster) != workers:
            raise ValueError("founder pricing requires the current employee roster")
        wages = []
        for row in roster:
            wage = _integer(row.get("wage"), "wage")
            interval = _integer(row.get("pay_interval_ticks"), "pay interval", minimum=1)
            wages.append((wage, interval))
        if sum(wage for wage, _ in wages) != payroll:
            raise ValueError("founder pricing payroll and roster disagree")
        revenue = _integer(history.get("revenue_cents"), "revenue")
        currency = history.get("currency_code")
        if not isinstance(currency, str) or len(currency) != 3 or not currency.isalpha() or not currency.isupper():
            raise ValueError("founder pricing requires the firm's currency")
        if workers == 0 or output == 0:
            reason = "unstaffed_or_unknown_capacity"
        else:
            # Conservative full-utilization floor: cover the most costly active
            # worker, then a 20% markup. Demand/idle time can still cause losses.
            wage_per_unit = max((wage + interval * output - 1) // (interval * output)
                                for wage, interval in wages)
            payroll_floor = max(1, ((cost + wage_per_unit) * 120 + 99) // 100)
            input_floor = max(1, (cost * 120 + 99) // 100)
            # A firm below the wage-inclusive floor may hold or improve its
            # price gradually, but cannot discount farther below that floor.
            floor = max(input_floor, min(price, payroll_floor))
            if price < input_floor or cash < payroll:
                reason = "cost_or_payroll_stress"
            else:
                projection.update(firm_id=firm_id, currency_code=currency,
                    current_price_cents=price, unit_input_cost_cents=cost,
                    payroll_cents=payroll, cash_cents=cash, inventory_units=inventory,
                    employees=workers, output_per_worker=output,
                    sales_window={key: history[key] for key in (
                        "window_start_tick", "window_end_tick", "sales_units", "revenue_cents")},
                    price_floor_cents=floor, payroll_floor_cents=payroll_floor, max_change_bps=500,
                    objective="Balance inventory clearance and unit margin; no demand or profit forecast.",
                    floor_assumption="No discount below current price when below the full-utilization wage floor; not guaranteed profit.")
                candidates[0]["facts"]["price_cents"] = price
                # Round down the step so each option changes by at most 5%.
                step = price * 500 // 10000
                for proposed in sorted({price - step, price + step}):
                    if proposed == price or proposed < floor or proposed > 10**15:
                        continue
                    action = {"type": "set_price", "firm_id": firm_id, "price": proposed}
                    candidates.append({"id": "price_" + decision_hash(action)[:16],
                        "actions": [action], "facts": {"price_cents": proposed,
                            "input_margin_cents": proposed - cost}})
    candidates.append({"id": "escalate", "actions": [], "facts": {
        "meaning": "Menu is insufficient; follow the configured abstention policy."}})
    baseline = "wait"
    if reason is None and target is not None:
        baseline = min(candidates[:-1], key=lambda c: (
            abs(c["facts"]["price_cents"] - target), c["id"]))["id"]
    projection["candidate_order"] = [c["id"] for c in candidates]
    evaluation = validate_evaluation({"state": projection, "questions": {"action": {
        "type": "choice", "instructions": "Choose a supplied price or hold. All amounts and bounds "
            "are computed. Sales are historical observations, not predictions. Choose escalate "
            "if these options cannot express a suitable decision. Never invent an action.",
        "criteria": {c["id"]: {"actions": c["actions"], **c["facts"]} for c in candidates}}}})
    return DecisionMenu(decision_hash(context), canonical_json(candidates), canonical_json(evaluation),
                        baseline, reason, COMPILER_VERSIONS[FOUNDER_PRICE_VERSION])
