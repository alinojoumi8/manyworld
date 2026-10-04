"""Offline audit of the frozen recruiting experiment; no model dispatch."""
import hashlib
import json
from collections import Counter
from pathlib import Path
from statistics import median

ROOT = Path(__file__).resolve().parents[1]
P = ROOT / "reports/out/jev-recruiting-presentation-20260922"
D = ROOT / "reports/out/jev-recruiting-execution-20260922"


def read(p):
    return json.loads(p.read_text(encoding="utf-8"))


def sha(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()


def analyze():
    completion = read(D / "execution/completion.json")
    records = [read(p) for p in sorted((D / "execution").glob("*-result.json"))]
    schedule = read(P / "schedule.json")
    audit = {r["case_id"]: r for r in read(P / "case-audit.json")}
    reviews = {}
    alternatives = {}
    for reviewer in "ABCD":
        folder = (ROOT / "reports/out/jev-blinded-adjudication-20260921/coordinator/frozen"
                  if reviewer in "AB" else ROOT / "reports/out/jev-four-reviewer-20260922/frozen")
        review = read(folder / reviewer / "review.json")
        reviews[reviewer] = {r["case_id"]: r for r in review["judgments"]}
        alternatives[reviewer] = {(r["case_id"], r["candidate_id"]): r for r in review["alternatives"]}
    errors = []
    for index, record in enumerate(records):
        if any(record[k] != schedule[index][k] for k in ("case_id", "arm", "repeat")):
            errors.append("schedule mismatch")
        ev = read(P / f"{record['case_id']}-{record['arm']}.json")
        if record["input_sha256"] != sha(P / f"{record['case_id']}-{record['arm']}.json"):
            errors.append("input hash mismatch")
        if record["status"] != "completed":
            continue
        candidate = ev["questions"]["action"]["criteria"].get(record["selected_action"])
        if candidate is None:
            errors.append("invalid candidate")
            continue
        if record["actions"] != candidate.get("actions", []):
            errors.append("candidate action mismatch")
        for key, amount in candidate.get("requirements", {}).items():
            if ev["state"]["resources"].get(key, {}).get("available_cents", -1) < amount:
                errors.append("resource-invalid choice")
    valid = [r for r in records if r["status"] == "completed"]
    slots = {(r["case_id"], r["repeat"], r["arm"]): r for r in valid}
    assert len(slots) == len(valid), "duplicate slots"
    ids = [r["response"].get("id") for r in valid]
    assert len(ids) == len(set(ids)), "duplicate response IDs"
    per_case = []
    for cid, original in audit.items():
        row = {"case_id": cid, "actor": original["actor"], "tick": original["tick"],
               "majority": original["majority"], "reviewer_labels": original["reviewer_labels"],
               "historical_choice": original["historical_choice"], "baseline": original["baseline"]}
        for arm in "AB":
            rs = [r for r in valid if r["case_id"] == cid and r["arm"] == arm]
            row[arm] = {"choices": dict(Counter(r["selected_action"] for r in rs)),
                        "action_types": dict(Counter(a["type"] for r in rs for a in r["actions"])),
                        "ACT": sum(r["choice_kind"] == "ACTIVE" for r in rs),
                        "post_job": sum(any(a["type"] == "post_job" for a in r["actions"]) for r in rs),
                        "preferred_candidate_matches": {v: sum(r["selected_action"] in {
                            c.strip() for c in reviews[v][cid]["preferred_active_candidate_ids"].split(";") if c.strip()}
                            for r in rs) for v in reviews}}
        per_case.append(row)
    pairs = [(slots[(cid, rep, "A")], slots[(cid, rep, "B")])
             for cid in audit for rep in range(1, 4)
             if (cid, rep, "A") in slots and (cid, rep, "B") in slots]
    stats = {}
    for arm in "AB":
        rs = [r for r in valid if r["arm"] == arm]
        stats[arm] = {"calls": len(rs), "choices": dict(Counter(r["choice_kind"] for r in rs)),
                      "post_job": sum(any(a["type"] == "post_job" for a in r["actions"]) for r in rs),
                      "input_tokens": sum(r["input_tokens"] for r in rs),
                      "output_tokens": sum(r["output_tokens"] for r in rs),
                      "cost_usd": sum(r["cost_usd"] for r in rs),
                      "median_latency_ms": median(r["latency_ms"] for r in rs) if rs else None,
                      "ACT_majority_ACT": sum(r["choice_kind"] == "ACTIVE" for r in rs if audit[r["case_id"]]["majority"] == "ACT"),
                      "WAIT_majority_ACT": sum(r["choice_kind"] == "ACTIVE" for r in rs if audit[r["case_id"]]["majority"] == "WAIT"),
                      "preferred_matches_ACT_cases": {v: sum(x[arm]["preferred_candidate_matches"][v] for x in per_case if x["majority"] == "ACT") for v in reviews},
                      "active_choice_suitability": {v: dict(Counter(alternatives[v].get(
                          (r["case_id"], r["selected_action"]), {}).get("suitability", "not_rated")
                          for r in rs if r["choice_kind"] == "ACTIVE")) for v in reviews},
                      "exact_baseline_matches": sum(r["selected_action"] == audit[r["case_id"]]["baseline"]["choice"] for r in rs),
                      "ACT_majority_post_job": sum(any(a["type"] == "post_job" for a in r["actions"])
                          for r in rs if audit[r["case_id"]]["majority"] == "ACT")}
    before = read(D / "before-hashes.json")
    changed = [p for p, h in before.items() if not Path(p).exists() or sha(Path(p)) != h]
    result = {"completion": completion, "arms": stats, "pairs": len(pairs),
              "changed_choice_pairs": sum(a["selected_action"] != b["selected_action"] for a, b in pairs),
              "errors": errors, "source_changed": changed, "protected_files": len(before),
              "resolved_models": sorted({r["response"]["model"] for r in valid}), "cases": per_case}
    (D / "results.json").write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({k: v for k, v in result.items() if k != "cases"}, indent=2))


if __name__ == "__main__":
    analyze()
