# Completed blinded review and frozen memory ablation — 2026-09-21

Analysis base: 645bcf95b254e935b02387a8ccc9fb750f300004, codex/jev-wait-analysis.
Main before/after this task: f22a051b9a591cdebe238b483db094ec05da08e8. No production changes or live models.

## Review provenance and freeze

Both submissions passed the original validator before freeze, comparison and unblinding, in that order. Each contains 88 judgments, 1,710 alternative ratings and 299 memory ratings. No responses filled or altered. A identifies as Hessam-hashemi, B as Reviewer B; human authorship, blindness and independence are documentary self-attestations, not independently verified facts. The earlier explicitly AI A submission was rejected and is excluded; the accepted replacement has different response-file hashes. Reviewer identifiers and declarations do not independently prove authorship.

Original case-set hash remains 9fdeddbdd7e7ddb2953d0972a2fe83e3abd4d1e55da6f0ee5c1df49014383e8c.
Frozen canonical review.json SHA256:
- A: 70476a78b3250b38787aa718070a5887937fd28cea6d6fabbb7628fefaca9d32
- B: 2b10d5054e68f0fdc6b6ed8c93f7f096f59bfbdab1635c9697326d87a3362b41

Freeze receipts under reports/out/jev-blinded-adjudication-20260921/coordinator/frozen include UTC times and original four-file hashes. Returned originals remain separately preserved at C:/tmp/ae-review-recheck-20260921T221501Z. The completed results concern 88 selected typed decisions; nine scheduled strategic-review receipts are excluded by design.

## Agreement

| Reviewer | ACT | WAIT | INSUFFICIENT_INFORMATION | High confidence | Medium | Low |
|---|---:|---:|---:|---:|---:|---:|
| A | 0 | 69 | 19 | 49 | 39 | 0 |
| B | 10 | 76 | 2 | 88 | 0 | 0 |

Matrix rows A, columns B:

| | ACT | WAIT | INSUFFICIENT_INFORMATION |
|---|---:|---:|---:|
| ACT | 0 | 0 | 0 |
| WAIT | 4 | 63 | 2 |
| INSUFFICIENT_INFORMATION | 6 | 13 | 0 |

Exact agreement 63/88 = 71.5909%; expected marginal agreement 68.2076%; Cohen kappa 0.106418. Positive agreement ACT 0%, WAIT 86.8966%, INSUFFICIENT_INFORMATION 0%. Secondary minimum-confidence-weight agreement 68%. No automatic reconciliation. The WAIT-heavy marginal distributions explain why high raw agreement is not strong agreement beyond chance. Repeated actors/ticks in one world invalidate naive independent-case significance; statistics are descriptive.

## Unblinded results

| Category | A alone | B alone | Both agree |
|---|---:|---:|---:|
| A: JEV WAIT, human WAIT | 66 | 75 | 62 |
| B: JEV WAIT, human ACT | 0 | 4 | 0 |
| C: JEV WAIT, human insufficient | 15 | 2 | 0 |
| D: JEV ACTIVE, human ACT | 0 | 6 | 0 |
| E: JEV ACTIVE, human WAIT | 3 | 1 | 1 |
| F: JEV ACTIVE, human insufficient | 4 | 0 | 0 |

25 unresolved cases: 19 actual waits and six active controls. Zero agreed B/C cases is lack of joint endorsement, not proof of zero missed opportunities or adequate context. Supported waits: 62. Possible missed opportunities: four, all Reviewer-B-only. Insufficient-context waits: 15 by A, two by B, zero jointly; these sets are disjoint (17 total).

The four disputed possible opportunities are Ines/Aegis recruiting in C-81de541b8971c732, C-be3f165d86ca12ef and C-6b96a7c61d7164dc, and Amara/hospital hiring in C-fbf89f59ba95edb2. A labels two insufficient and two WAIT; B favors ACT. Their rationales do not establish counterfactual economic benefit. No agreed ACT target exists.

The one agreed E is Rosa buying one food unit, event 405, C-580f36ae42b4d54c. Both WAIT rationales discuss liquidity and other alternatives more than the actual food purchase. Preserve the label, but do not call this a demonstrated execution or economic error.

## Employment, memory and goals

Of 33 employment-screening cases, 29 are jointly WAIT, three A-insufficient/B-WAIT, one A-WAIT/B-insufficient. No case has a job option both rate clearly/plausibly suitable; no joint job-over-wait preference. This does not prove all jobs unsuitable. Public/professional role constraints in some rationales are inferred rather than established legal/time restrictions. Do not turn these assumptions into engine facts.

299 memory slots:
- A: useful 10, not useful 289; stale unknown 289/no 10; irrelevant yes 11/no 10/unknown 278.
- B: useful 5, not useful 294; stale yes 3/unknown 296; irrelevant yes 294/no 5.
- Both useful: five. Usefulness slot density A 3.34%, B 1.67%; not independent observations. Do not equate not useful with proven irrelevant or stale.

Descriptive association (WAIT / insufficient / ACT):
- A empty memories: 21/5/0 across 26; no useful memory: 44/12/0 across 56; some useful: 4/2/0 across six.
- B empty: 22/1/3 across 26; no useful: 51/1/7 across 59; some useful: 3/0/0 across three.

No clean monotonic link establishes poor evidence causes WAIT or insufficient judgments. Useful-memory groups are tiny and actor/role confounded. Memory cleanup is a controlled information-quality ablation, not an established cure for inaction.

All 88 inputs have empty goals. A: important 47/undetermined 41. B: important 44/not material 44. Both important in 25. Explicit goals appear in missing-information labels A 88/B 78. Absence is constant, so no within-dataset empty-vs-present effect can be estimated. No historical goals may be invented.

## Exactly one intervention, prepared but not run

PROBLEM: shared evidence that most memory slots are not useful, including generic operational markers. Low primary agreement and lack of agreed ACT cases preclude claiming a missed-opportunity fix.

INTERVENTION: remove an entire memory entry only when composed exclusively of `Something happened: typed_decision.`, `Something happened: bounded_selection.`, or `Something happened: information_exposed.` fragments, AND both raters mark it not useful. Do not edit mixed entries, substantive text, ballot/wage entries, goals, framing, employment or time context. No replacement or refill.

AFFECTED: 186 entries in 62 cases: 57 actual waits/five active; 43 agreed A, one agreed E, 18 unresolved. Remaining 26 cases unaffected and excluded from calls. Per-case deleted indices/texts saved in edits.json.

EXPECTED EFFECT: reduce operational noise while preserving supported decisions; action-rate direction unspecified. No causal or improvement claim before experiment.

PRIMARY METRIC: paired B-minus-A WAIT selection rate on 44 affected jointly-WAIT cases, equal case weight, three repeats each arm. No agreed ACT cases: active-choice accuracy improvement is not identifiable with consensus targets. Disputed and insufficient cases reported separately per reviewer. Do not optimize WAIT reduction.

GUARDRAILS: no aggregate or case-level loss in supported-WAIT concordance, no newly selected option rated clearly unsuitable by either reviewer, no schema/ID/eligibility failures; unchanged model revision, candidates, actor/economic state and output contract. No hidden retry, fallback or budget override. Input-character reduction secondary; it is not itself better decisions. A passing no-regression ablation is not a production adoption recommendation.

A original preserved evaluation; B identical except /state/memories deletions. Every pair was mechanically restored and compared for equality outside that field. 124 input files, fixed seed 202609212230, three paired repeats: 372 future calls. Route typesafe/jev-1.13, required revision typesafe/jev-1.13-20260917; unavailable revision means stop. Budget and live authorization remain unset. Selection and evaluation use this same sample, so a held-out study is necessary before production claims.

Frozen inputs, schedule, plan, results and SHA256SUMS.json:
C:/tmp/ae-jev-wait-analysis/reports/out/jev-adjudication-results-20260921/

Per-case A-F and rationales remain in the original coordinator/results/unblinded.json; disagreement queue retained. The preparation script analysis/summarize_blinded_reviews.py is offline-only and refuses overwrite. Socket construction, resolution and connect denied during preparation; zero attempts. All 39 original package/frozen-review/result files remained hash-identical during preparation. Eleven existing synthetic protocol tests passed in 2.13s; compilation and diff checks passed. No live DB, provider budget or Hermes access was needed or performed.
