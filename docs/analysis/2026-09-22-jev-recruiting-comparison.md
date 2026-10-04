# Recruiting presentation comparison — prepared, not executed

## Finding and recommendation

The three previously identified missed-opportunity candidates already supplied the relevant staffing facts to JEV. All involve Ines Aldana / Aegis Mutual (firm 5): zero employees, zero open jobs, target headcount two, firm cash and available resources of 5,000,000 cents, and a listed job with a 1,200,000-cent resource requirement. The fourth ACT-majority case is the same actor at tick 5, where JEV selected an active bundle. These are repeated observations of one business, not four independent business failures.

Do not remove JEV from founder decisions on this evidence. First test one presentation change: group existing recruiting evidence together. Do not invent goals, demand forecasts, profitability, or occupational benefits. A staffing target and affordable menu option are not proof that hiring is economically worthwhile. In particular, zero goods sales for an insurance firm does not establish that it lacks insurance demand.

## Source trace

- `agents/domain_options.py:92–133`: founder options include applicant offers; job posting is exposed only when employees plus open jobs are below target headcount. Candidate resource requirements reference the firm's currency-specific resource.
- `agents/domain_candidates.py:47–78`: a standalone job option may also appear bundled with pricing. Preserve both forms and their exact identities.
- `agents/policies.py:911–1005`: the existing deterministic founder policy has additional recovery, negotiation, cash, and workforce rules. The experimental baseline below is deliberately a separate narrow comparator, not a claim to reproduce that production policy.
- `engine/actions.py:679–688` and `engine/labor.py:34–40`: posting creates a job advertisement and an event; it is not itself a hire or an immediate payroll payment. Production validation is untouched.

## Frozen inputs

Package: `reports/out/jev-recruiting-presentation-20260922`.

All 20 original cases exposing founder operations are included, spanning five actors. For every case:

- A is the original preserved evaluation, semantically unchanged.
- B differs only by an added `/state/recruiting_evidence` object. It duplicates existing staffing, financial, sales-window, firm-resource, and recruiting-candidate facts verbatim, keyed by their original JSON paths.
- Missing fields stay missing. No missing value becomes zero. Personal funds never substitute for firm resources.
- Questions, candidate IDs, actions, output contract, other economic/actor state, memories, and empty goals remain unchanged.

This is a salience/presentation experiment, not an experiment adding unavailable information. It may increase input length; measure tokens and latency alongside decisions. It is separate from the interrupted memory-removal experiment and cannot complete or repair its missing observations.

## Transparent comparison policies

The staffing baseline selects an existing standalone `post_job` candidate only when employees plus open vacancies fall below target and every declared resource requirement is covered. It never constructs a new action. Unknown staffing, mismatched resources/currency, or lack of a qualifying option causes deferral. Deterministic candidate-ID ordering resolves ties.

Results before any model execution: eight job postings; twelve waits because the staffing target is already covered, including open vacancies. These twelve waits mean **do not post another vacancy**; they do not rule out making offers on existing vacancies or another useful economic action. Include always-WAIT as a second descriptive comparator. Neither policy is human ground truth or a proven optimal economic policy.

## Evaluation plan

The schedule freezes three paired repetitions per case, 120 maximum model calls, shuffled with seed 20260922. Model/provider are held at the original OpenRouter snapshot `typesafe/jev-1.13-20260917` for this proposed comparison; do not change transport in only one arm or splice direct-provider results into it. If direct JEV is chosen instead before execution, freeze a separately identified protocol with both arms on that exact model/transport. No execution runner, credential loading, or paid request is part of this preparation.

Before any future execution, freeze the exact runner/settings and an isolated spending cap. No automatic retries: stop and retain an ambiguous reservation on timeout. Both arms use the same settings and evaluation procedure.

Primary descriptive readout: paired ACT selection change on the four ACT-majority cases, accompanied by exact preferred-candidate agreement for **each** reviewer. Explicitly report whether an ACT contains `post_job`; an unrelated ACT must not be described as a recruiting improvement. Report the three original WAIT cases separately from the already-active tick-5 control. Repeat counts are not independent samples.

Guardrails: report activity increases in the two WAIT-majority cases, all fourteen disputed cases individually, candidate suitability, resource validity, exact menu membership, tokens, latency, failures, and actor-family-level results. Never reconcile disagreement automatically. Do not select a winner solely by increasing ACT frequency or matching the simple staffing baseline.

All cases have already been reviewed and inspected. This is retrospective exploratory evidence, not a held-out validation or causal economic-benefit claim. Any apparent improvement needs new independent founder cases, including justified waits, before production changes.

## Verification and preservation

- 17 tests passed across recruiting-preparation and delegation-scorecard tests.
- Python compilation passed for the added preparation script and test file.
- Preparation ran with socket creation, connection, and DNS disabled: zero network attempts.
- 528 preexisting analysis/evidence files remained byte-identical; before/after hashes are in `preservation.json`.
- Original blinded case-set hash preserved: `9fdeddbdd7e7ddb2953d0972a2fe83e3abd4d1e55da6f0ee5c1df49014383e8c`.
- Original package manifest verified before preparation. Output files have SHA-256 hashes in `SHA256SUMS.json`.
- Analysis HEAD remains `645bcf95b254e935b02387a8ccc9fb750f300004`; local main remains `f22a051b9a591cdebe238b483db094ec05da08e8`. No tracked production changes, live database access, simulation operations, models, or PR modifications.

Commands executed:

```powershell
python -m pytest -q tests/test_recruiting_comparison_preparation.py tests/test_delegation_scorecard.py
python analysis/prepare_recruiting_comparison.py --output reports/out/jev-recruiting-presentation-20260922
python -m py_compile analysis/prepare_recruiting_comparison.py tests/test_recruiting_comparison_preparation.py
git diff --exit-code
```

All Python commands used the repository virtual environment. This package is ready for protocol review; model efficacy has not been tested.
