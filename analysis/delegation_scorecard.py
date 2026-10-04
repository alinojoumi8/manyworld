"""Offline descriptive delegation audit; never changes frozen labels or inputs."""
from collections import Counter
import argparse
import csv
import hashlib
import json
from pathlib import Path
import socket
import sys

import yaml

ROOT = Path(__file__).resolve().parents[1]
EXPECTED_CASE_HASH = "9fdeddbdd7e7ddb2953d0972a2fe83e3abd4d1e55da6f0ee5c1df49014383e8c"


def read(path):
    return json.loads(path.read_text(encoding="utf-8"))


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def majority(labels):
    if len(labels) != 4:
        raise ValueError("Four original reviewer labels required")
    return next((label for label, n in Counter(labels).items() if n >= 3), None)


def domains(candidate):
    return set(candidate.get("domain", "").split("+")) - {"", "wait", "escalate"}


def aggregate(rows, domain_names):
    result = []
    for domain in domain_names:
        exposed = [r for r in rows if domain in r["exposed_domains"]]
        selected = [r for r in rows if domain in r["selected_domains"]]
        result.append({
            "domain": domain, "menu_exposure_cases": len(exposed),
            "selected_cases": len(selected),
            "selected_majority_ACT": sum(r["majority"] == "ACT" for r in selected),
            "selected_majority_WAIT": sum(r["majority"] == "WAIT" for r in selected),
            "selected_unresolved": sum(r["majority"] is None for r in selected),
            "wait_cases_with_exposure": sum(r["actual_wait"] for r in exposed),
            "missed_opportunity_cases_with_three_named_domain_votes": sum(
                r["actual_wait"] and r["majority"] == "ACT"
                and r["preferred_domain_votes"].get(domain, 0) >= 3 for r in rows),
            "case_ids": [r["case_id"] for r in exposed],
        })
    return result


def main(output):
    attempts = []

    def deny(*args, **kwargs):
        attempts.append("network")
        raise RuntimeError("Offline scorecard forbids networking")

    socket.socket = socket.create_connection = socket.getaddrinfo = deny
    out = Path(output).resolve()
    if out.exists():
        raise ValueError("Never overwrite an existing scorecard")
    old = ROOT / "reports/out/jev-blinded-adjudication-20260921"
    four = ROOT / "reports/out/jev-four-reviewer-20260922"
    raw = ROOT / "reports/out/jev-wait-analysis"
    protected = [p for folder in (ROOT / "reports/out").iterdir()
                 if folder.is_dir() and folder.name.startswith("jev-")
                 for p in folder.rglob("*") if p.is_file()]
    before = {str(p): sha(p) for p in protected}
    manifest = read(old / "manifest.json")
    for name, digest in manifest["files"].items():
        assert sha(old / name) == digest, name
    cases = read(old / "coordinator/cases.json")
    canonical = json.dumps(cases, sort_keys=True, separators=(",", ":"), ensure_ascii=False)
    assert hashlib.sha256(canonical.encode()).hexdigest() == EXPECTED_CASE_HASH
    for folder in (four, raw):
        for name, digest in read(folder / "SHA256SUMS.json").items():
            assert sha(folder / name) == digest, name
    reviews, review_hashes = {}, {}
    for label in "ABCD":
        folder = (old / "coordinator/frozen" if label in "AB" else four / "frozen") / label
        assert sha(folder / "review.json") == read(folder / "freeze.json")["review_sha256"]
        reviews[label] = read(folder / "review.json")
        review_hashes[label] = sha(folder / "review.json")
        assert len(reviews[label]["judgments"]) == len(cases) == 88
    key = read(old / "coordinator/unblinding-key.json")
    decisions = {d["event_id"]: d for d in read(raw / "decisions.json")}
    judgments = {s: {r["case_id"]: r for r in v["judgments"]} for s, v in reviews.items()}
    alternatives = {s: {(r["case_id"], r["candidate_id"]): r for r in v["alternatives"]}
                    for s, v in reviews.items()}
    prior = {r["case_id"]: r for r in read(four / "four-reviewer-results.json")["by_case"]}
    rows = []
    for case in sorted(cases, key=lambda c: c["case_id"]):
        cid = case["case_id"]
        k = key[cid]
        decision = decisions[k["event_id"]]
        menu = case["evaluation"]["questions"]["action"]["criteria"]
        actual = menu[k["actual_choice"]]
        labels = {s: judgments[s][cid]["primary"] for s in "ABCD"}
        m = majority(list(labels.values()))
        assert m == prior[cid]["majority_label"]
        votes = Counter()
        for s in "ABCD":
            if labels[s] == "ACT":
                ids = [x.strip() for x in judgments[s][cid]["preferred_active_candidate_ids"].split(";") if x.strip()]
                vote_domains = set().union(*(domains(menu[x]) for x in ids))
                votes.update(vote_domains)
        rows.append({"case_id": cid, "event_id": k["event_id"],
            "actor": decision["actor_name"], "actor_id": decision["actor_id"],
            "tick": decision["tick"], "actual_wait": k["actual_wait"],
            "ballot_action_catalog": decision["receipt"].get("ballot_actions", {}),
            "actual_choice": k["actual_choice"], "actual_actions": k["actual_actions"],
            "employment_screen": k["employment_screen"], "judgments": labels,
            "majority": m, "vote_pattern": prior[cid]["pattern"],
            "exposed_domains": sorted(set().union(*(domains(c) for c in menu.values()))),
            "selected_domains": sorted(domains(actual)), "preferred_domain_votes": dict(votes),
            "selected_suitability": {} if k["actual_wait"] else {
                s: alternatives[s][cid, k["actual_choice"]]["suitability"] for s in "ABCD"},
            "rationales": {s: judgments[s][cid]["rationale"] for s in "ABCD"},
            "missing_information": {s: judgments[s][cid]["missing_information"] for s in "ABCD"}})
    configured = yaml.safe_load((ROOT / "runs/jev-domains-offline.yaml").read_text())["llm"]["decision_policy"]["domains"]
    scorecard = aggregate(rows, configured)
    summary = {"case_set_sha256": EXPECTED_CASE_HASH, "review_hashes": review_hashes,
        "n": len(rows), "actual_wait": sum(r["actual_wait"] for r in rows),
        "supported_waits": sum(r["actual_wait"] and r["majority"] == "WAIT" for r in rows),
        "candidate_missed_opportunities": sum(r["actual_wait"] and r["majority"] == "ACT" for r in rows),
        "unresolved_waits": sum(r["actual_wait"] and r["majority"] is None for r in rows),
        "unresolved_cases": sum(r["majority"] is None for r in rows),
        "employment": dict(Counter(r["majority"] or "unresolved" for r in rows if r["employment_screen"])),
        "secondary_questions_not_scored_by_action_rubric": dict(Counter(
            q for case in cases for q in case["evaluation"]["questions"] if q != "action")),
        "descriptive_always_wait_baseline": {
            "resolved_cases": sum(r["majority"] is not None for r in rows),
            "always_wait_majority_label_matches": sum(r["majority"] == "WAIT" for r in rows),
            "jev_majority_label_matches": sum(r["majority"] == ("WAIT" if r["actual_wait"] else "ACT") for r in rows),
            "scope": "Action-versus-wait label agreement only, not economic utility or exact option correctness; unresolved cases excluded explicitly."},
        "domains": scorecard,
        "limitations": ["Mixed-menu WAIT is not domain-specific accuracy", "Repeated actors/ticks in one world are correlated",
                        "Majority summaries do not erase dissent or establish economic correctness", "Unexposed domains are untested, not failures"]}
    out.mkdir()
    for name, value in (("scorecard.json", summary), ("case-audit.json", rows)):
        (out / name).write_text(json.dumps(value, indent=2, ensure_ascii=False), encoding="utf-8")
    with (out / "domains.csv").open("w", newline="", encoding="utf-8") as f:
        fields = [k for k in scorecard[0] if k != "case_ids"]
        writer = csv.DictWriter(f, fieldnames=fields)
        writer.writeheader()
        writer.writerows({k: row[k] for k in fields} for row in scorecard)
    after = {str(p): sha(p) for p in protected}
    assert before == after
    assert not attempts
    (out / "preservation.json").write_text(json.dumps({"files": len(before), "unchanged": before == after,
        "network_attempts": len(attempts), "before": before, "after": after}, indent=2), encoding="utf-8")
    print(json.dumps({k: v for k, v in summary.items() if k not in ("domains", "review_hashes", "limitations")}))
    print(json.dumps(scorecard, indent=2))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--out", type=Path, default=ROOT / "reports/out/jev-delegation-scorecard-20260922")
    main(parser.parse_args().out)
