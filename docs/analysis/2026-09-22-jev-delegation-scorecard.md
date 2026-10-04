# JEV delegation recommendation — offline audit, 22 September 2026

## Recommendation

**Do not remove JEV wholesale or change production delegation from this dataset. Keep it as a bounded candidate selector with deterministic execution and budget validation. Prioritize founder recruiting for a separate input-quality investigation; do not expand unvalidated stock trading, startup formation, financing or policy delegation on the strength of these results.**

This is a supplementary descriptive audit of frozen reviews, not a change to the original experiment, a new consensus exercise, or a measured economic-utility trial. No production configuration is changed. The keep/hold recommendations are provisional evidence-based judgments, not automated pass/fail thresholds or instructions to disable currently configured routes.

## Verified evidence

- Original case-set SHA-256: `9fdeddbdd7e7ddb2953d0972a2fe83e3abd4d1e55da6f0ee5c1df49014383e8c`.
- Four frozen review hashes verified against their freeze receipts; original package and four-reviewer/extraction manifests verified.
- 97 original controller receipts: 88 typed selected decisions and nine scheduled strategic-review handoffs. The nine handoffs are not invalid JEV answers.
- Among 88 economic choices: 81 WAIT and seven active.
- Of 81 WAITs: 67 supported by at least three reviewers, three ACT-majority candidate missed opportunities, 11 unresolved. None has a majority insufficient-information label, but that does not erase individual uncertainty.
- Seven active choices: one ACT-majority, one unanimous WAIT preference, five unresolved.
- Four-way unanimity: 44/88; 16 cases have no majority. Fleiss kappa 0.1335 indicates limited agreement beyond marginal label frequencies. Majority is not ground truth.
- Cases reuse actors and opportunities within one world. Counts are not independent trials and do not support naive confidence intervals.

## Domain scorecard

Exposure means a domain occurs somewhere in the economic action menu. It is **not** a completed decision in that domain. Compound candidates expose both domains; do not sum exposure columns as unique cases. WAIT is global to the mixed menu and cannot be assigned as a domain-specific success or failure.

| Domain | Cases exposed | Cases selected | Recommendation |
|---|---:|---:|---|
| consumption | 83 | 1 | KEEP GUARDED |
| career | 49 | 0 | KEEP GUARDED |
| founder_operations | 20 | 6 | IMPROVE FIRST |
| personal_finance | 86 | 0 | HOLD EXPANSION |
| investment | 35 | 0 | HOLD EXPANSION |
| entrepreneurship | 8 | 0 | HOLD EXPANSION |
| funding | 0 | 0 | NOT ASSESSED |
| mergers_ip | 0 | 0 | NOT ASSESSED |
| bank_policy | 1 | 0 | HOLD EXPANSION |
| contracts_legal | 0 | 0 | NOT ASSESSED |
| regulatory | 0 | 0 | NOT ASSESSED |
| politics | 0 | 0 | REVIEW SEPARATELY |
| communications | 0 | 0 | NOT ASSESSED |
| learning_compute | 10 | 0 | IMPROVE CONTEXT |
| regional | 0 | 0 | NOT ASSESSED |
| estates | 0 | 0 | NOT ASSESSED |
| construction | 0 | 0 | NOT ASSESSED |
| household_time | 88 | 0 | IMPROVE CONTEXT |
| frontier | 0 | 0 | NOT ASSESSED |

### Career versus founder recruiting

The 33 employment-screening cases involve the job-seeker question. Fourteen are unanimous WAIT, 18 are majority WAIT and one is unresolved (A/C WAIT, B/D insufficient). There is no ACT majority in this subset. It would be wrong to claim that 33 missed jobs justify removing career decisions.

The three candidate missed opportunities instead concern Ines Aldana/Aegis founder recruiting: `C-6b96a7c61d7164dc` (tick 1), `C-be3f165d86ca12ef` (tick 3), and `C-81de541b8971c732` (tick 4). B/C/D favor ACT, with named options in founder_operations; A favors WAIT or insufficient information. These are one repeated actor/opportunity family, not three independent failures. The active ACT-majority control is also Ines, at tick 5.

Inspect the exact supplied workforce, vacancies, demand, capacity, wage and affordability facts. Do not turn reviewers' role expectations into invented engine facts or impose mandatory hiring. Five other active founder choices remain disputed, and price changes are bundled with recruiting/offering jobs. A later independent experiment should isolate recruitment suitability; do not change candidates or add that intervention to the already frozen memory experiment.

### The opposed food purchase is not a proven harmful action

`C-580f36ae42b4d54c`, Rosa Farah at tick 3, selected a small `buy_goods` purchase. All four primary labels favor WAIT. However, A/C/D rate the exact purchase plausibly suitable; B rates it questionable. D also mentions a prior intention to top up food. This is a concrete warning against translating primary-label disagreement into an automatic economic-error label. Review the declared consumption target and supplied needs; do not remove consumption on this one case.

### Stocks, starting businesses, and voting

There are 35 stock/investment menu exposures but no selected trade, and eight entrepreneurship exposures but no selected company formation. These samples demonstrate neither positive decision value nor bad executed decisions in those domains. Hold expansion and collect targeted, grounded cases first.

Voting is separate: 27 fiscal plus 10 legislative ballot questions occur in the typed inputs, but the human forms grade the economic `action` decision. The receipt's `ballot_actions` field is a catalog of alternatives, not evidence that every alternative was executed. This scorecard makes **no ballot-quality verdict**. Assess votes against supplied policy consequences, actor preferences and consistency—not the evaluator's preferred political outcome.

## Descriptive baseline on the same cases

A deterministic always-WAIT choice is available in every reviewed menu. Among the 72 cases with a >=3-reviewer label:

| Measure | Recorded JEV | Always WAIT |
|---|---:|---:|
| Overall ACT/WAIT label matches | 68/72 | 68/72 |
| WAIT-majority cases matched | 67/68 | 68/68 |
| ACT-majority cases matched | 1/4 | 0/4 |

This is **not** proof of equal economic utility or an endorsement of always WAIT. It demonstrates why aggregate label accuracy is a poor primary success metric in this WAIT-heavy sample. The four ACT-majority cases all concern the same recruiting family. Exact candidate quality, material outcomes and review disagreement must remain visible. The 16 unresolved cases are explicitly excluded from this label comparison, not imputed.

The historical generative baseline has only 12 matches on named economic axes, 61 differing states and 24 unmatched receipts; even the 12 do not match full context. It is not a valid replacement-quality experiment on identical inputs.

## Memory, goals and the interrupted experiment

Useful memory slots out of 299: A 10, B five, C five, D 12. D marks most remaining slots UNKNOWN, so do not claim unanimous endorsement of deletion. All reviewed inputs lack explicit goals; there is no present-goals comparison identifying a causal effect. Do not invent goals to encourage activity.

The completed 72-call pilot saved 0.8421% input tokens and changed one of 36 paired choices. It passed the frozen safety/harness gate, not an efficacy gate. The larger experiment has 126 valid recorded results, one ambiguous timed-out call, and 245 unattempted slots. These counts do not permit the planned full efficacy conclusion.

Keep its inputs, schedule, model, original A/B scoring and ambiguity intact. First reconcile the timeout against authoritative provider evidence. If it cannot be resolved, a new explicitly documented continuation/missing-data decision is required; do not silently rerun, impute, or substitute direct-provider results. No continuation was run during this audit.

## What to do next

1. Preserve current delegation and the frozen experiment. No entire domain has sufficient evidence for removal today.
2. Investigate the three recruiting misses using existing engine facts and exact named reviewer alternatives. Prepare a **separate** founder-recruiting context experiment after the existing experiment has a documented disposition; do not combine interventions.
3. For a domain decision, compare JEV and a transparent deterministic baseline on the same frozen inputs. Report candidate suitability, supported ACT recall, unsupported activity, uncertainty, invalid selections, cost and latency. Use held-out actor/opportunity families, including cases with genuine reasons to act; keep unresolved reviewer judgments visible.
4. Only after frozen-input evidence supports a change should a bounded governed world test compare economic outcomes. Removal requires a better evidenced replacement, not merely fewer WAITs or a faster route.

No numerical deployment threshold is invented after observing this sample. Freeze thresholds and a held-out evaluation protocol before any next efficacy experiment.

## Validation and preservation

Eleven offline tests passed, covering the scorecard's mixed-menu attribution, majority threshold and named-domain voting plus existing four-reviewer and pilot-preparation regressions. Compilation and diff checks passed. Active socket/DNS denial recorded **zero network attempts**. All **521** protected evidence files matched before/after hashes. All four review files and the case-set hash remain unchanged.

Analysis branch/head: `codex/jev-wait-analysis` / `645bcf95b254e935b02387a8ccc9fb750f300004`. Local main remains `f22a051b9a591cdebe238b483db094ec05da08e8`. Changes are additive analysis/report/tests only, uncommitted alongside preserved pre-existing analysis work. No production JEV changes, model calls, Hermes calls, simulation ticks, live DB operations, PR modifications or merges.

Machine-readable files: `scorecard.json`, `domains.csv`, `case-audit.json`, `recommendations.json`, and `preservation.json`. The case audit retains all four labels, rationales, missing-information statements and exact chosen-option suitability; no disagreement was reconciled.
