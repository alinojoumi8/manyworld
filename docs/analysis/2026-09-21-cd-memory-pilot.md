# Reviewer C/D packets and memory-filter pilot — 2026-09-21

## Outcome

SAFE TO SCALE at the precommitted harness/sanity gate, not proof the intervention improves JEV decisions. Exactly 72 authorized model calls completed. No further calls, simulations, Hermes execution, server operations or production modifications occurred. C/D reviews remain pending; the frozen intervention is unchanged.

Analysis branch codex/jev-wait-analysis; source HEAD 645bcf95b254e935b02387a8ccc9fb750f300004. Main remains f22a051b9a591cdebe238b483db094ec05da08e8. Existing tracked source, prior analysis files and A/B evidence: 1,577 protected files hash-identical. New scripts and this report are additive and uncommitted.

## Reviewer packets — distribute ZIPs only

Directory: C:/tmp/ae-jev-wait-analysis/reports/out/jev-cd-pilot-20260921/

| Reviewer | ZIP SHA256 | Ordering seed |
|---|---|---:|
| C | cc2fb60fb3fa61b0dbeed3e6d20c2a671ee6ad1d08450f63f67db0911bbd3de9 | 202609210104 |
| D | c8cb5c91ef53b09475dcd0b6eccc4302a4fc03a2e51c8130b5889f78861c38f0 | 202609210105 |

Files reviewer-C.zip and reviewer-D.zip contain only the same 88 evaluations, frozen rubric, independently shuffled forms, readable HTML, neutral instructions, and reviewer metadata with unique C/D slots. Actual human identity remains to be supplied; attestations start false. No results, key, intervention or outcomes are included. Underlying canonical case-set hash remains 9fdeddbdd7e7ddb2953d0972a2fe83e3abd4d1e55da6f0ee5c1df49014383e8c. Reordering does not create a new underlying set; each case ID/evaluation matches exactly. Full deterministic order is recorded in packet-manifest.json.

C/D return four forms privately; do not distribute this coordinator report or the whole output folder. Existing A/B source and reviews remain frozen. No C/D judgments were fabricated.

### Four-reviewer processing after returns

Validate exact 88/1710/299 IDs, field enums, ACT named suitability, insufficient-information explanations, identity and truthful independence attestations against the original rubric. Freeze each raw submission and canonical parsed review with hashes and UTC timestamps into new C/D locations; never rewrite A/B. The original A/B validator intentionally accepts only A/B: use a separately tested C/D extension when actual returns arrive, not relabeling them as A/B.

Only after all four are validated/frozen calculate six pairwise tables, raw agreements and descriptive Cohen kappas. For each case retain all four original judgments and classify vote patterns: unanimous 4; 3-of-4; 2-2; no-majority 2-1-1. A plurality is not a majority, and majority is not manufactured consensus or truth. Report nominal Fleiss kappa with per-case agreement sum(n_j*(n_j-1))/12, observed mean over 88 cases, expected sum of squared pooled category proportions; undefined if expected=1. Report confidence separately, without converting it into votes. Repeated actors/single-world cases remain correlated. Do not change the already frozen intervention in response to C/D.

## Frozen pilot selection

pilot-cases.json SHA256:
de748fa7e7e57375fa688cecf358de7e7e45dfcaa540cfa2d14be2eb18cb1d71

Selection occurred before any model dispatch. Distinct strata in requested order; rank descending targeted removable Unicode characters, then entry count, then ascending case ID. Historical WAIT required for joint-WAIT/disagreement/additional strata to retain exactly two historical active controls. Active-control eligibility additionally requires Reviewer B ACT, since there are no jointly ACT controls; Reviewer A disagreement remains visible.

| Stratum | Case | Removed chars | Input tokens removed per request |
|---|---|---:|---:|
| Joint WAIT | C-579016f016eb181a | 302 | 77 |
| Joint WAIT | C-2b63a64b884f6de8 | 225 | 55 |
| Joint WAIT | C-209d00dc35adf529 | 153 | 40 |
| Joint WAIT | C-2405b631a9c1f8f9 | 153 | 40 |
| Disagreement | C-912f7a7c48e1afcb | 267 | 67 |
| Disagreement | C-794f419a3401560e | 219 | 59 |
| Disagreement | C-4e82115ec12e2027 | 186 | 50 |
| Disagreement | C-fbf89f59ba95edb2 | 186 | 50 |
| Active control | C-ad82f1be0989a442 | 219 | 59 |
| Active control | C-2bbbb1edf4d7bfde | 153 | 39 |
| Additional | C-61f72e43405a126f | 153 | 40 |
| Additional | C-81de541b8971c732 | 153 | 40 |

The 72-call schedule is the exact selected subsequence of the original 372-call schedule, seed 202609212230. A/B order is randomized within each case/repeat pair; repeats remain paired in time. No order or cases changed after outputs. Selection deliberately enriches high-burden strata and is not a representative efficacy sample.

## Input and execution integrity

A/B are byte copies of already frozen experiment inputs. Restoring B's /state/memories from A produces exact object equality. All questions, actions, actor attributes, economic facts, goals and output schema unchanged. Whole audit-only entries removed by the original frozen filter; no new filtering rule or refill. 53 removed entries, 2,369 Unicode characters across 12 unique cases. Exact per-case original zero-based memory IDs, text and hashes in pilot-cases.json and analysis/per-case.json.

Used original OpenRouterDecisionsAdapter (unmodified), model route typesafe/jev-1.13, expected resolved typesafe/jev-1.13-20260917, native decisions endpoint, provider allow_fallbacks=false, 20s timeout. The original transport does not transmit temperature, seed or max_tokens; none were added. No chat conversion. Response contract checked by original llm.decisions.response_error. Every response resolved to the required revision.

72 dispatch receipts, 72 unique provider response IDs, 72 valid outcomes, zero retries/errors, zero unknown local accounting reservations. Application-level cache not used; underlying provider cached-token counts were not supplied and are reported unavailable, not zero. Per-call started/result records include the exact retained answer, raw usage, selected candidate/actions, timestamp, tokens, latency, local reservation state and cost. Each result is a model choice only, not an executed world action. Separate pilot receipts/accounting; live run/shared budget DBs never opened. Conservative local reserve $0.01 per call, stop ceiling $0.25, no additional provider preflight.

## Results

| Measure | Original A | Filtered B |
|---|---:|---:|
| Calls | 36 | 36 |
| Input tokens | 219,453 | 217,605 |
| Output tokens | 26,658 | 26,674 |
| WAIT | 30 | 29 |
| ACTIVE | 6 | 7 |
| Cost USD | 0.009217026 | 0.009139410 |

Input saving 1,848 tokens across 36 paired comparisons, 0.8421%; 39–77 input tokens per request. Total usage 490,390 tokens; cost $0.018356436. Median latency 279.0755ms, range 223.113–1046.103ms. Token usage provider-reported, not a guessed local tokenizer. Cached tokens unavailable on all 72 responses.

Within-arm choices stable in 23/24 case-arm groups. One group produced WAIT twice and ACTIVE once: 1/72 nonmodal outputs (1.39%). Exact choices differ in 1/36 A/B pairs (2.78%), one case. Complete answer distributions may differ even when selected action matches; these stability figures refer to the economic selected action, not byte-equal whole responses.

The change is C-81de541b8971c732 repeat 2: A wait; B c_d60f8fa7110426031ad6, post_job firm 5, title worker, wage 1200000 cents. Reviewer A labels the case insufficient but this option plausibly suitable; B labels ACT and this option clearly suitable. Do not call that an agreed missed-opportunity correction or attribute it causally from one stochastic pair.

Supported-WAIT guardrail: all five jointly-WAIT cases in this pilot stayed WAIT in both arms, all repeats: 15/15 per arm. No new unsuitable activity.

Active-control guardrail: both controls retained exactly the same candidate across both arms and all repeats: 6/6 per arm; no loss of B-supported active choices. These controls are disputed by A, not universally endorsed. No new B choice rated clearly unsuitable by either reviewer anywhere.

## Gate and next step

SAFE TO SCALE under the frozen gate: input construction exact, all outputs/accounting valid, no detected guardrail loss, repeat variance below the predeclared conservative 25% nonmodal threshold. The threshold is a safety heuristic, not statistical validation. Small enriched sample, correlated cases, only three repeats, disputed active targets and minor token savings limit inference. No efficacy success claim merely because WAIT fell by one.

Receive and freeze C/D reviews independently and compute the predeclared four-rater analysis without changing the intervention. Then, with separate authorization, finish the remaining 300 scheduled calls of the original 372-call experiment; retain these 72 receipts rather than rerunning or selectively replacing them. No remaining calls were executed here. A main/default change would require separate evidence and authorization.

14 offline tests passed (2.25 seconds), covering original protocol plus exact pilot inputs/schedule/strata/blind packet isolation. Compilation and diff checks passed. Full raw results: reports/out/jev-cd-pilot-20260921/execution; summary/calls CSV/per-case audit and source preservation under analysis/. Frozen manifest predates calls; result evidence hashed separately afterward.
