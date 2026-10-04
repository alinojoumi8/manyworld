# Four-reviewer blinded adjudication — 2026-09-22 UTC

C and D passed complete validation against the original case set and rubric and were frozen before four-rater computation. Each supplies 88 judgments, 1,710 alternative ratings and 299 memory ratings. D's resubmission changed only 78 missing-information category fields; original judgments and all other forms remain preserved. Human identity, blindness and independence are self-attestations, not independently proven facts. C/D labels remain genuine C/D; the A/B validator and all original submissions were not modified.

## Frozen reviews

Canonical case-set SHA256 unchanged:
9fdeddbdd7e7ddb2953d0972a2fe83e3abd4d1e55da6f0ee5c1df49014383e8c

C review.json: 7f279fd3f4f5cfcfcf62283470599e48d875da78d934cfc89d689775fa3b4c3b
D review.json: 1b9d8f7d6026f368f157ecc1ca889d2a08932589428828c1fd28c1c73f254694

Frozen at 2026-09-22T01:58:55.423906+00:00 and 2026-09-22T01:58:55.471634+00:00 respectively. Raw four-file copies and per-file hashes accompany freeze receipts under reports/out/jev-four-reviewer-20260922/frozen/. A/B retain their prior hashes and locations. No answers inferred, filled or reconciled.

## Individual judgments and confidence

| Reviewer | ACT | WAIT | Insufficient information | High | Medium | Low |
|---|---:|---:|---:|---:|---:|---:|
| A | 0 | 69 | 19 | 49 | 39 | 0 |
| B | 10 | 76 | 2 | 88 | 0 | 0 |
| C | 21 | 67 | 0 | 83 | 5 | 0 |
| D | 4 | 66 | 18 | 1 | 87 | 0 |

Confidence is not used to manufacture a majority. Reviewers use the uncertainty and ACT categories differently.

## Four-way agreement

- Unanimous: 44/88 = 50%.
- 3-of-4: 28/88 = 31.82%.
- 2-2: 2/88 = 2.27%.
- No majority (2-1-1): 14/88 = 15.91%.
- Mean pairwise observed agreement: 69.3182%.
- Pooled-marginal expected agreement: 64.5903%.
- Fleiss kappa: 0.133519.

There are 72 cases with at least three votes for one label: WAIT 68, ACT four, insufficient zero. The other 16 remain unresolved. A 2-vote plurality in 2-1-1 is not treated as a majority. Majority labels are summaries of votes, not consensus, truth, causality or proven economic correctness. Cases repeat actors/ticks in one world: no naive independent-case significance or confidence interval.

| Pair | Exact agreement | Cohen kappa |
|---|---:|---:|
| A/B | 71.59% | 0.1064 |
| A/C | 70.45% | 0.2669 |
| A/D | 54.55% | -0.2360 |
| B/C | 86.36% | 0.5676 |
| B/D | 72.73% | 0.2036 |
| C/D | 60.23% | 0.0488 |

All six full 3x3 tables and per-category agreement metrics are retained in four-reviewer-results.json. Negative A/D kappa means below marginally expected agreement, not proof either reviewer is wrong.

## Recorded choices, with dissent intact

| Category | >=3 votes | Unanimous |
|---|---:|---:|
| A: JEV WAIT; reviewers favor WAIT | 67 | 43 |
| B: JEV WAIT; reviewers favor ACT | 3 | 0 |
| C: JEV WAIT; insufficient information | 0 | 0 |
| D: JEV ACTIVE; reviewers favor ACT | 1 | 0 |
| E: JEV ACTIVE; reviewers favor WAIT | 1 | 1 |
| F: JEV ACTIVE; insufficient information | 0 | 0 |
| No majority | 16 | Not applicable |

Unanimous A/E categories total 44. Another 28 have a dissenting reviewer. Original per-reviewer A-F labels and all 88 vote vectors are preserved in the JSON and all-cases.csv.

The three majority-supported candidate missed opportunities are all Ines Aldana/Aegis recruitment cases:
- C-6b96a7c61d7164dc: A WAIT, B/C/D ACT.
- C-81de541b8971c732: A insufficient, B/C/D ACT.
- C-be3f165d86ca12ef: A WAIT, B/C/D ACT.

These are repeated observations of the same actor/opportunity family, not three independent demonstrations. They support further examination of recruiting decisions, not a causal claim that filtering solves missed opportunities. The majority-supported active control C-94071ee18712e675 is also Ines, with A WAIT and B/C/D ACT. No unanimous ACT cases exist.

For the 33 employment-screening cases: 14 unanimous WAIT, 18 majority WAIT, one 2-2 split. The split is C-4169b97c05c93af1 (Ugo Novak): A/C WAIT, B/D insufficient. No employment-screening case has an ACT majority. Role/obligation assumptions in rationales are not automatically engine facts.

## Memory and goals: retain uncertainty

Useful memory slots out of 299: A 10, B five, C five, D 12. A marks remaining 289 not useful, B/C 294 not useful, but D marks remaining 287 UNKNOWN, not not-useful. Do not recode D uncertainty or claim all four endorse removal. D marks irrelevance yes 285/no 12/unknown two; all stale judgments unknown. B/C identical aggregate memory counts do not independently establish copying or independence.

Goal impact important: A 47, B 44, C 67, D 22. A's other 41 are undetermined; B/C/D classify remaining 44/21/66 as probably not material. All inputs lack explicit goals; no empty-versus-present causal effect is identifiable. These reviews do not authorize invented goals.

## Experiment remains frozen

Original A/B-based memory filter, selected 62 cases, original schedule, pilot inputs/results and 72-call evidence remain byte-identical. C/D are additional descriptive evidence, not a reason to change the intervention, sample, primary metric, original A/B guardrails or pilot classification after observing results. Four-reviewer strata can be reported separately as a clearly labeled supplementary analysis.

Prior pilot remains SAFE TO SCALE as a harness/sanity result only. The next authorized phase may execute the remaining 300 calls in the original 372-call experiment, retaining the first 72 without reruns or selective replacement. No model calls are authorized by this review-analysis continuation and none were made. The current step is complete; separate explicit authorization is needed to execute remaining calls.

## Verification

15 offline tests passed in 2.43s: frozen review protocol plus C/D validation, category/missing-row rejection, all four vote patterns, hand-calculated Fleiss kappa, undefined degenerate kappa, and missing-review failure. Compilation and diff check passed. Active socket denial: zero attempts. 1,776 protected files hash-identical before/after, including frozen reviews, prior experiment, pilot inputs and outputs. No production changes, live simulation, Hermes or provider calls.

Main before/after: f22a051b9a591cdebe238b483db094ec05da08e8. Analysis HEAD remains 645bcf95b254e935b02387a8ccc9fb750f300004; additive analysis script/tests/report are uncommitted. Full results, raw frozen submissions and SHA256SUMS.json: C:/tmp/ae-jev-wait-analysis/reports/out/jev-four-reviewer-20260922/.
