"""Prepare only: frozen recruiting-presentation experiment, no provider runner."""
import argparse
from collections import Counter
from copy import deepcopy
import hashlib
import json
from pathlib import Path
import random
import socket

ROOT = Path(__file__).resolve().parents[1]
CASE_HASH = "9fdeddbdd7e7ddb2953d0972a2fe83e3abd4d1e55da6f0ee5c1df49014383e8c"


def canonical(value):
    return json.dumps(value, sort_keys=True, separators=(",", ":"), ensure_ascii=False).encode()


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def read(path):
    return json.loads(path.read_text(encoding="utf-8"))


def presentation(evaluation):
    """Duplicate existing facts verbatim with paths; add no recommendation or inference."""
    state = evaluation["state"]
    firm = state.get("own_business") or {}
    paths = {}
    for key in ("firm_id", "sector", "employees", "open_jobs", "target_headcount",
                "cash", "currency_code", "payroll", "default_wage_cents",
                "recent_sales", "executed_sales_units", "sales_window"):
        if key in firm:
            paths[f"/state/own_business/{key}"] = deepcopy(firm[key])
    key = f"firm:{firm.get('firm_id')}:{firm.get('currency_code')}"
    if key in state.get("resources", {}):
        paths[f"/state/resources/{key}"] = deepcopy(state["resources"][key])
    for cid, candidate in evaluation["questions"]["action"]["criteria"].items():
        if any(a.get("type") in ("post_job", "make_job_offer", "accept_job_offer", "hire", "fire")
               for a in candidate.get("actions", [])):
            paths[f"/questions/action/criteria/{cid}"] = deepcopy(candidate)
    changed = deepcopy(evaluation)
    if "recruiting_evidence" in state:
        raise ValueError("Refuse an already transformed input")
    changed["state"]["recruiting_evidence"] = paths
    return changed


def baseline(evaluation):
    """Narrow comparison policy, NOT a production policy or ground-truth label."""
    state = evaluation["state"]
    firm = state.get("own_business") or {}
    fields = [firm.get(k) for k in ("employees", "open_jobs", "target_headcount")]
    if any(type(v) is not int or v < 0 for v in fields):
        return {"choice": None, "reason": "unknown_staffing"}
    employees, vacancies, target = fields
    if employees + vacancies >= target:
        return {"choice": "wait", "reason": "target_covered_including_open_jobs"}
    firm_key = f"firm:{firm.get('firm_id')}:{firm.get('currency_code')}"
    criteria = evaluation["questions"]["action"]["criteria"]
    candidates = []
    for cid, candidate in sorted(criteria.items()):
        actions = candidate.get("actions", [])
        if len(actions) != 1 or actions[0].get("type") != "post_job":
            continue
        if actions[0].get("firm_id") != firm.get("firm_id"):
            continue
        requirements = candidate.get("requirements", {})
        if firm_key not in requirements or not firm.get("currency_code"):
            continue
        valid = True
        for resource, cost in requirements.items():
            available = state.get("resources", {}).get(resource, {}).get("available_cents")
            if (type(cost) is not int or cost < 0 or type(available) is not int
                    or available < cost):
                valid = False
        if valid:
            candidates.append(cid)
    if candidates:
        return {"choice": candidates[0], "reason": "gap_and_existing_standalone_post_job_requirements_met"}
    return {"choice": None, "reason": "no_eligible_standalone_post_job_defer_other_choices"}


def prepare(output):
    output = Path(output).resolve()
    if output.exists():
        raise ValueError("Never overwrite a frozen experiment")
    protected = [p for folder in (ROOT / "reports/out").glob("jev-*")
                 if folder.is_dir() for p in folder.rglob("*") if p.is_file()]
    before = {str(p): digest(p) for p in protected}
    package = ROOT / "reports/out/jev-blinded-adjudication-20260921"
    manifest = read(package / "manifest.json")
    for name, value in manifest["files"].items():
        if digest(package / name) != value:
            raise ValueError(f"Frozen source mismatch: {name}")
    cases = read(package / "coordinator/cases.json")
    if hashlib.sha256(canonical(cases)).hexdigest() != CASE_HASH:
        raise ValueError("Blinded case set changed")
    audit = {x["case_id"]: x for x in read(
        ROOT / "reports/out/jev-delegation-scorecard-final-20260922/case-audit.json")}
    rows = []
    selected = []
    for case in cases:
        original = case["evaluation"]
        if not any("founder_operations" in x.get("domain", "").split("+")
                   for x in original["questions"]["action"]["criteria"].values()):
            continue
        cid = case["case_id"]
        altered = presentation(original)
        check = deepcopy(altered)
        del check["state"]["recruiting_evidence"]
        assert check == original
        selected.append((cid, original, altered))
        a = audit[cid]
        rows.append({"case_id": cid, "actor": a["actor"], "tick": a["tick"],
                     "reviewer_labels": a["judgments"], "majority": a["majority"],
                     "historical_choice": a["actual_choice"], "baseline": baseline(original),
                     "always_wait_baseline": "wait", "review_evidence": a,
                     "A_sha256": hashlib.sha256(canonical(original)).hexdigest(),
                     "B_sha256": hashlib.sha256(canonical(altered)).hexdigest()})
    schedule = [{"case_id": cid, "repeat": repeat, "arm": arm}
                for cid, _, _ in selected for repeat in range(1, 4) for arm in ("A", "B")]
    random.Random(20260922).shuffle(schedule)
    output.mkdir(parents=True)

    def save(name, value):
        (output / name).write_text(json.dumps(value, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    for cid, original, altered in selected:
        save(f"{cid}-A.json", original)
        save(f"{cid}-B.json", altered)
    save("case-audit.json", rows)
    save("schedule.json", schedule)
    save("protocol.json", {
        "status": "PREPARED_NOT_RUN", "intervention": "verbatim recruiting facts grouped with source paths",
        "only_changed_path": "/state/recruiting_evidence", "cases": len(rows), "maximum_calls": len(schedule),
        "repeats": 3, "model": "typesafe/jev-1.13-20260917", "provider": "openrouter",
        "transport": "original frozen-input transport; do not substitute direct provider within this comparison",
        "execution_gate": "Not authorized by this preparation. Freeze exact runner/settings and isolated spending cap before execution.",
        "no_retries": True, "on_timeout": "stop; preserve unknown usage; never replace a slot",
        "baseline_scope": "existing standalone post_job with staffing gap and satisfied declared resource requirements; defer unknown/other choices",
        "primary_metric": "paired change in ACT selection among four ACT-majority cases, plus per-reviewer exact preferred-candidate agreement",
        "guardrails": ["report WAIT-majority ACT increases", "no selection outside original menu", "no resource-invalid selection",
                       "report independent actor-family results", "no new firm state, goals, demand forecasts or memory edits"],
        "limitations": ["All cases previously reviewed: retrospective exploratory comparison, not held-out confirmation",
                        "Four ACT-majority cases belong to one actor/firm; repeats are not independent cases",
                        "ACT/WAIT labels are not economic utility; baseline is not optimal-policy ground truth",
                        "Posting a job does not guarantee a hire; declared resource requirement is not a payroll runway estimate"],
        "blinded_case_set_sha256": CASE_HASH,
        "baseline_counts": dict(Counter(r["baseline"]["reason"] for r in rows)),
        "review_majorities": dict(Counter(str(r["majority"]) for r in rows)),
    })
    after = {str(p): digest(p) for p in protected}
    if after != before:
        raise RuntimeError("Protected source changed during preparation")
    save("preservation.json", {"unchanged": True, "file_count": len(before), "before": before, "after": after})
    save("SHA256SUMS.json", {p.name: digest(p) for p in output.iterdir() if p.is_file()})
    return {"cases": len(rows), "slots": len(schedule), "protected_files": len(before)}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", required=True)
    args = parser.parse_args()
    attempts = []

    def deny(*args, **kwargs):
        attempts.append("network")
        raise RuntimeError("Offline preparation forbids networking")

    socket.socket = socket.create_connection = socket.getaddrinfo = deny
    result = prepare(args.output)
    result["network_attempts"] = len(attempts)
    print(json.dumps(result))
