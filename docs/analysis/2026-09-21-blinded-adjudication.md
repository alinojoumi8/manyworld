# Blinded decision adjudication protocol — issue #101

Date: 2026-09-21. Analysis branch: `codex/jev-wait-analysis`, starting commit `e8952dad56d9432b7546720a10ce79dba8cc33b6`.
Production main: `a0ca62dac477552c20637f0c86f224510a3b7f8d`.

## Status and limits

**Review preparation is complete; actual human adjudication has not occurred.** No independent human reviewers are available to this assistant. The assistant already saw the actual choices and cannot serve as a blinded reviewer. No model reviewers were launched. Synthetic unit-test responses are software fixtures only and are not study results.

Reviewer A: unassigned / not started. Reviewer B: unassigned / not started. There are no frozen real judgments, agreement results or unblinded results. Intervention selection is deliberately deferred until the reviews are complete. The prior analysis's 33 employment-screening cases are not adjudicated missed opportunities.

## Frozen dataset

Package: `C:/tmp/ae-jev-wait-analysis/reports/out/jev-blinded-adjudication-20260921/`

Distribute **only** `reviewer-A.zip` to reviewer A and **only** `reviewer-B.zip` to reviewer B. Each ZIP contains:

- `cases.html`: readable expandable anonymous cases.
- `cases.json`: exact decision-time evaluations, without recorded answers.
- `rubric.json`, `README.md`: scoring rules and independent-review instructions.
- `judgments.csv`: 88 blank primary/confidence/information/goal-impact forms.
- `alternatives.csv`: 1,710 blank active-option suitability forms.
- `memories.csv`: 299 blank usefulness/staleness/relevance forms.
- `reviewer.json`: identity, packet/rubric hashes and blindness/independence attestations.

The primary judgment concerns the economic action question. Independent ballots remain in the supplied context but do not count as the economic ACT target. Every original supplied action, term, actor attribute, resource, memory and goal field is retained. Full upstream context, later outcomes, original confidence/distribution, selected option, comparison-arm labels and provider identity are excluded. No missing suitability or timing facts were invented. Candidate eligibility remains the prepared catalog's representation, not a guaranteed execution outcome.

Anonymous IDs are deterministic random 64-bit labels. Assignment seed: **202609210101**; A order seed **202609210102**, B order seed **202609210103**. Both reviewers see the same cases in different orders. Actor IDs and ticks remain because they were legitimate decision inputs. Therefore reviewers must have no prior exposure to the source analysis/choices: random IDs cannot erase such prior knowledge.

Canonical case-set SHA-256:
`9fdeddbdd7e7ddb2953d0972a2fe83e3abd4d1e55da6f0ee5c1df49014383e8c`

Frozen rubric SHA-256:
`26477ae7f6f5054e1e8e51390f9970006d22005285690708975afdec0b8ba6e2`

`manifest.json` hashes all original packet files and the coordinator key. The coordinator folder is excluded from ZIPs. This is distribution separation, **not encryption or an OS access-control claim**. Never give reviewers the full package directory, private key, this coordinator report or the prior analysis. They should edit extracted copies, not the sealed originals.

## Fixed rubric, before any real scoring

Choose one primary judgment:

- **ACT:** a named supplied active option is meaningfully preferable to waiting for this actor on the evidence.
- **WAIT:** waiting appears reasonable or preferable on that evidence.
- **INSUFFICIENT_INFORMATION:** material missing information prevents a reasoned comparison.

Confidence is high/medium/low with definitions in the frozen rubric; it is not a calibrated success probability. Every active candidate receives clearly suitable / plausibly suitable / questionable / clearly unsuitable / cannot determine. Related variants can share a rationale, but every candidate must be labeled. ACT must name at least one clearly/plausibly suitable candidate; an arbitrary active action does not satisfy ACT.

Missing-information labels cover occupational suitability, time obligations, switching costs, expected income/demand, downside, consumption need, opportunity duration, explicit goals, legal constraints and current role value. Case rationale must cite supplied facts and uncertainty. Do not assume an official with no employment record should take factory work. Do not infer a goal from the existence of an action. Never judge using GDP, later profits, hiring or the baseline's behavior.

Goal importance is assessed separately as likely important / probably not material / cannot determine. This does not retrospectively assign a goal. Memory usefulness, staleness and irrelevance are independently yes/no/unknown. Missing timestamps alone require uncertainty, not a stale label.

## Independent review procedure

1. Recruit two different human reviewers who have not seen the prior source analysis, actual choices or this coordinator report. Explain the evidence boundary; disclose relevant experience/conflicts.
2. Give each only their respective ZIP and the same rubric. Do not reveal the wait/control proportions. No external-model assistance or communication between reviewers is allowed under this protocol.
3. Each reviews all 88 cases and returns the four response files privately: reviewer.json, judgments.csv, alternatives.csv, memories.csv. Do not automatically replace blank responses with INSUFFICIENT_INFORMATION.
4. Validate and freeze each submission independently. Do not show reviewer A's responses to B or vice versa. Freeze hashes and timestamps record the submitted judgments; attestations are documentary statements, not proof of reviewer honesty or physical isolation.
5. Only after both complete, identified, independently attested submissions are frozen, calculate agreement and generate the **blinded** disagreement queue. No automatic consensus or confidence-weighted majority.
6. If a third adjudicator is used, send the blinded case and two rationales before revealing actual choices. Keep unresolved disagreements if no justified adjudication is available. Do not overwrite original reviews.
7. Unblind with the command below only after both reviews are frozen. Preserve per-reviewer A–F labels and agreed categories separately; disagreement is an explicit unresolved category, not silently forced into A–F.

Repository virtual-environment Python:
`C:/Users/matri/Documents/myprojects/agent-economy/.venv/Scripts/python.exe`

Commands from the analysis worktree (replace submission paths with separately returned files):

```powershell
python analysis/blinded_adjudication.py validate --root reports/out/jev-blinded-adjudication-20260921 --reviewer A --submission C:/review-returns/A
python analysis/blinded_adjudication.py freeze --root reports/out/jev-blinded-adjudication-20260921 --reviewer A --submission C:/review-returns/A
python analysis/blinded_adjudication.py validate --root reports/out/jev-blinded-adjudication-20260921 --reviewer B --submission C:/review-returns/B
python analysis/blinded_adjudication.py freeze --root reports/out/jev-blinded-adjudication-20260921 --reviewer B --submission C:/review-returns/B
python analysis/blinded_adjudication.py compare --root reports/out/jev-blinded-adjudication-20260921
python analysis/blinded_adjudication.py unblind --root reports/out/jev-blinded-adjudication-20260921
```

No commands above launch models or a simulation. Existing package/results/reviews cannot be overwritten. Both comparison and unblinding were tested against the real unreviewed package and correctly refused to proceed, without creating results.

## Agreement and post-review analysis

Implemented calculations:

- Exact three-category agreement, both reviewers' category counts, 3×3 disagreement matrix.
- Per-category positive agreement: `2 * diagonal / (A_count + B_count)`; undefined for absent categories.
- Descriptive Cohen's kappa `(observed - expected)/(1 - expected)`; undefined when expected agreement equals one.
- Secondary confidence-weighted agreement: minimum of the two confidence weights (high 3, medium 2, low 1), weighted agreement divided by total weight. This is **not** ordinal weighted kappa or a calibrated probability.
- Missing-information and goal-importance counts for each reviewer separately.
- Useful-memory density per case and by reviewer judgment. Confirmed-useful / total is a lower bound; (useful + unknown) / total is an upper bound. Empty-memory cases have undefined density and are counted separately.

Decisions repeat actors and ticks; no independent-case significance test or naive confidence interval is emitted. If uncertainty estimates are later required, cluster by actor within this single world and retain the single-seed limitation. Differences by judgment are descriptive associations, not proof of causation. Avoid interpreting high confidence as ground truth.

After unblinding, report:

| Category | Definition | Current result |
|---|---|---|
| A | Actual WAIT; reviewers favor WAIT | Pending |
| B | Actual WAIT; reviewers favor ACT | Pending |
| C | Actual WAIT; reviewers lack sufficient information | Pending |
| D | Actual ACTIVE; reviewers favor ACT | Pending |
| E | Actual ACTIVE; reviewers favor WAIT | Pending |
| F | Actual ACTIVE; reviewers lack sufficient information | Pending |
| Unresolved | Reviewers disagree | Pending |

For disagreement, individual reviewer categories remain visible. B is not automatically a model error: inspect confidence, explicit suitable candidates, role compatibility and information adequacy.

The 33 employment-screening cases stay private until unblinding. Tool output then identifies candidate-level suitability for both reviewers, overlap on the same suitable job option, and overlap on a preferred suitable job under two ACT judgments. This is stronger than counting wages or all ACT judgments (which might favor buying food). Quantification is currently **pending**, not zero. Review the six occupational dimensions explicitly: compatibility, switching costs, current role value, time, institutional/legal constraints, preferences.

## Structural memory audit: measured now, judgments deferred

There are **299** retrieved entries across the 88 cases:

| Mechanical text property | Count |
|---|---:|
| Contains “Something happened…” | 287 |
| Entire entry consists of generic event descriptions | 278 |
| Contains typed_decision or bounded_selection audit marker | 196 |
| Exact repeated entry after the first occurrence in the same case | 61 |
| Different string with token-set Jaccard ≥ .8 to an earlier entry in the same case | 7 |

These properties overlap. Lexical similarity is not semantic equivalence; the same entry may have an exact duplicate and a near match to different earlier entries. Ballot and wage events are not automatically declared operational audit pollution. A mixed generic/substantive entry can still be useful. There are 26 cases with no retrieved memories.

**Useful substantive entries, stale entries, irrelevant entries and useful density by reviewer judgment are unscored.** They cannot be inferred from generic text counts. No uniform timestamp is supplied for all memories; do not invent stale counts. The source already establishes empty explicit goals in all 88 cases, but goal materiality is also unscored. All these fields are in the review forms.

## First intervention: not selected

Selection is gated on frozen review evidence. No first intervention is recommended on unperformed adjudication. The prior report's candidate ranking does not substitute for this study's results.

After review, select exactly one evidence-backed deficit. Document which agreed uncertain/ACT-vs-wait cases support it, counterexamples in supported WAIT/active controls, and the mechanism. Prefer a narrow, source-grounded change; do not combine memory removal, richer labor information and new goals. If judgments are too uncertain or disagree substantially about the deficit, hold selection and improve the evidence protocol rather than force an intervention.

A grounded-goal intervention cannot invent historical actor preferences. If no actual goal contract exists in the preserved input sources, adding a new preference would be a separately labeled prospective preference experiment, not correcting missing known facts in this frozen study.

## Frozen-input A/B design: prepared, not executable

Coordinator template: `coordinator/frozen-input-experiment.template.json`.

- A is the original evaluation; B remains null until one intervention is selected and its plan frozen.
- Record PROBLEM, INTERVENTION, EXPECTED EFFECT, RISK, PRIMARY METRIC and GUARDRAILS with supporting case IDs and reviewer evidence. These currently remain null, not fabricated.
- Fix affected cases before querying. Keep actor state, candidates, IDs, amounts, existing economic facts, model revision and output schema unchanged. Declare the sole permitted JSON path/family of differences. Reject any other input difference; hash both arms.
- Additional context, if chosen, must come from source material actually available at the original decision boundary, never final tables or hindsight. Preserve source references. The original case remains immutable.
- Retain requested route `typesafe/jev-1.13` and required historical resolved revision `typesafe/jev-1.13-20260917`; if unavailable, stop and redesign rather than silently substitute. No provider call/preflight is authorized by preparing this template.
- Proposed three repeats per condition, counterbalanced within case/replicate using a frozen schedule. Planned calls = `2 × affected_cases × 3`, at most 528 if all 88 are affected; budget and authorization are currently null/false.
- Primary measure is paired change in reviewer-supported suitability. For an agreed ACT case, only a supported suitable candidate counts; any active action is not enough. Agreed WAIT cases reward waiting. Uncertain/disputed cases are reported separately, not converted into action targets. Do not optimize GDP or wait reduction.
- Guardrails: no worsening of role-incompatible action selection, no material loss on supported WAIT controls, unchanged schema/eligibility/identity integrity, no budget override, no hidden fallback/retry and no world mutation.
- Because this same set diagnoses the intervention, results are exploratory/calibration evidence. Require a separately held-out decision/seed evaluation before a production recommendation. Report repeated/clustered cases and model stochasticity.

## Verification and preservation

- Eleven synthetic offline tests passed (2.51 seconds): input preservation, no choice/key in packets, deterministic case ordering, distinct reviewer order, blank/duplicate/missing judgments rejected, ACT requires a suitable candidate, different human identities required, frozen review/rubric tampering rejected, early unblinding denied, disagreements remain unresolved, kappa/weights/degenerate cases correct, memory flags do not fabricate usefulness.
- Source dataset's 14 sealed artifacts verified. All 2,944 protected hashes match; source reports, runs, budgets and prior evidence untouched.
- Package preparation used an active socket-denial boundary with zero network attempts.
- Only analysis tooling, its isolated tests and this protocol changed. No production decision/default changes, live ticks, Hermes launches or external-model calls.

## Next action

Assign the two human reviewers and distribute the ZIPs separately. Receive and freeze their completed forms, then run agreement and gated unblinding. **No model experiment is ready to run yet.**
