# JEV-v4 matched quality study

Prospective protocol for issue #101, coordinated with endurance issue #99.
Status: preparation only. JEV-v4 remains opt-in; execution needs the separate
provider/model, duration and total-spend approval required by those issues.
The historical five-tick comparison is diagnostic evidence, not superiority
or endurance evidence. This protocol does not advance issue #52's sequential
308-agent program or replace its 1,000-tick acceptance.

## Freeze before dispatch

Use six declared seeds: `0`, `1`, `42`, `1337`, `31337`, `20260921`.
Use completed horizons of 20 and 120 ticks. These horizons are proposals for the
separately bounded run, not permission to dispatch. Report both horizons for
every seed; never select a successful seed or stop early to improve results.
Each seed is one independent paired replicate, not hundreds of independent
citizens or ticks.

Pair the opt-in JEV-v4 arm with the existing Hermes/native reference route used
for the intended comparison. Obtain its actual configuration before running;
do not reconstruct it from the missing historical audit files. Freeze and hash
one canonical initial world with the same ten admitted citizens for each pair,
initial balances, capabilities, routing, prompts/tool descriptions, schedules,
engine semantics and policy/mechanics flags. Fork copies, never modify the
preserved source. Alternate execution order by seed index. Retain separate
sessions, identities, budget ledgers and receipts for both arms.

A freeze manifest must contain the Git commit, dirty-state/source fingerprint,
Python/SQLite runtime, population and admitted actor identities, seed, initial
world/checkpoint hashes, profile/configuration hashes, exact provider/model
identifiers for every paid route, transport/version, engine semantics, declared
horizons, request/output limits, per-arm caps and approved total cap. Never infer
model equivalence from a brand or transport name. Changed policy, mechanics,
model, prompt, context or tool scope is a separate experiment; do not pool it.
Credentials, private reasoning, raw provider bodies and databases stay outside
committed evidence. Preserve originals privately; publish sanitized receipts
with hashes and artifact references.

## Measurements

At both horizons, publish each paired seed's results and its denominators.

| Measure | Definition and grouping |
|---|---|
| Activity | Submitted, accepted, rejected and executed decisions; wait fraction; recovery/timeout/ambiguous counts. Group by decision purpose, actor role and available opportunity. |
| Employment | Employed and eligible labor-force counts, unemployment fraction, work assignments and executed productive work. Preserve an explicitly undefined rate when the denominator is zero. |
| Production | Physical units by commodity and firm, sold output, inventory and unmet demand. Label the existing GDP proxy as a proxy; do not substitute it for physical output. |
| Consumption | Executed purchases, fulfilled demand and rejected purchase reasons by commodity. Separate affordability from absent inventory and policy restrictions. |
| Financing | Offered, accepted and disbursed amounts, accepted terms, funded firms, rejected/stale closes, and cap-table/ledger reconciliation. No funding is inferred from a proposal alone. |
| Calibration | Only declared probabilities for a predeclared, observable event with a fixed resolution horizon. Use Brier score and show sample size by event/purpose. Unresolved events stay unscored; confidence text and unrelated proposal purposes are not calibration samples. |
| Cost/latency | Model requests and attempts, uncached input, cached input and output tokens separately; provider-reported cost or labeled tariff estimate; settled/reserved/unknown amounts; wall time and decision latency. Do not treat cached tokens as uncached billable tokens. |

Record outcomes using persisted world actions, receipts, economic-health output,
ledger and budget artifacts. Freeze an extraction script and metric definitions
before the first live dispatch. Its offline fixture must include waiting,
rejected purchases, zero denominators, an accepted but unfunded offer, stale
receipts, unresolved calibration events and unknown billing. This preparation
is incomplete until that extractor and the approved freeze manifest exist.

## Acceptance thresholds

Correctness is a hard gate for every seed and arm: zero cross-session/identity
leaks, zero duplicate execution/disbursement, zero unexplained ledger imbalance,
no unresolved reservation or ambiguous execution, and exact network-disabled
recorded-response replay with unchanged source hashes. Verify checkpoints,
SQLite integrity, expected completed horizon and all declared resource/spend
limits. A failed pair remains in the report and blocks acceptance; do not retry
it into the accepted sample. Stop dispatch on ambiguity or a breached limit.

For economic non-inferiority, predeclare a maximum 10% loss in physical
production and fulfilled consumption, and a maximum 5 percentage-point increase
in unemployment and wait fraction. These are proposed tolerance limits for this
study, not production service-level claims. Compute paired differences at both
horizons and one-sided simultaneous nominal 95% confidence bounds across those four
metrics and two horizons, resampling whole seed pairs with a fixed analysis
seed of `20261005` (10,000 draws; Bonferroni-adjusted bounds). Relative production
and consumption differences use the reference arm's positive value; zero
reference output makes that relative gate indeterminate and requires an
absolute threshold frozen before dispatch, not a post-result substitution.

All bounds must meet their limits to report economic non-inferiority. Six pairs
may be too few for reliable bootstrap coverage or a useful bound: report the
study as inconclusive in that case. The nominal confidence level is not a
finite-sample coverage guarantee.
Never claim that a nonsignificant difference establishes equivalence. Report
per-seed effects, both horizons, failed/partial pairs and sensitivity to each
seed; do not silently pool ticks or citizen decisions as independent samples.

Report financing and calibration separately with opportunity/sample counts.
Absence of financing opportunities or resolved calibration events is missing
evidence, not a passing quality result. Do not claim economic superiority or a
default-route change from this study. Any proposed cost-efficiency improvement
requires correctness and all economic gates first, then a confidence interval
for the paired cost effect; elapsed time, context size and tokens alone are not
proof of a lower billed cost.

## Evidence and completion

Retain the original historical #98/#102 audits without rewriting or repairing
them. Their missing location does not permit synthetic replacement. The new
study must have its own manifest, approval bounds, request/attempt receipts,
checkpoints, source/replay preservation hashes, extraction code, per-seed table,
uncertainty calculations and sanitized conclusion. Link the issued manifest to
this frozen protocol before dispatch. Record any protocol amendment as a new
version before execution; amendments after seeing outcomes cannot be presented
as this study's predeclared analysis.

Issue #101 remains open until the approved study is executed and its quality,
uncertainty, accounting and replay evidence is reviewed. Issue #99 separately
requires completed longer-horizon endurance evidence. Neither is closed by this
preparation document or by the earlier five-tick comparison.
