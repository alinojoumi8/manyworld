# JEV founder pricing pilot

## Scope and decision

Branch: `codex/jev-founder-pricing`, from JEV commit `f1e68fda`.
Implement the first opt-in pilot, not the entire decision expansion. The existing
shopping/job contracts v1-v3 remain unchanged. Use a separate versioned
`founder-price-choice-v1` contract: code builds admissible prices; JEV chooses an
ID; the existing executor revalidates control and performs the change.

The pilot only handles routine founder turns whose deterministic founder policy
would issue exactly one price action. Existing role decisions, hiring, financing,
legal/care work, operational recovery, and every seventh tick remain on the
original route. This is deliberately conservative coverage, not a claim that
routine pricing captures every strategic consideration.

## Implementation

1. Add an immutable founder-price compiler with hold, bounded +/-5% alternatives,
   explicit abstention, deterministic comparator, fixed domain/compiler version,
   and no generated actions or prose.
2. Expose owned-firm sales units and revenue from completed ticks only (three-tick
   window), input cost, production capacity and current payroll terms. Preserve
   all legacy observations unless this new contract is explicitly selected.
3. Price floors cover input costs plus a 20% markup. Compute a separate wage-
   inclusive floor at full utilization: below it, permit only hold or gradual
   increases, never further discounts. It is not a profit prediction. Exclude
   recovery firms, input-floor violations and cash below scheduled payroll.
4. Reuse gateway accounting, strict typed validation, abstention, execution
   receipts, and recorded replay. Confidence means answer concentration only.
5. Add offline and explicitly opt-in live profiles. Never run live inference or
   touch the prepared Hermes world during this implementation.

## Test and merge gates

- Pure compiler: determinism, immutable menus, integer bounds, duplicate removal,
  price floors, observation privacy, fixed identity, unsupported-context routing.
- Observation: quantity vs transaction count, prior-tick boundary, own firm only.
- Execution: accepted price update, rejected stale ownership, ledger reconciliation.
- Mock transport: strict selection, billable malformed answers, abstention,
  receipts, cost accounting, no silent fallback.
- Isolated world and replay: successful founder choices, no live HTTP during
  replay, exact replay, unchanged source artifact; v1-v3 regression tests.
- Existing CI smoke suite and documentation checks. Report exact commands and
  failures. Passing mocks establishes integration safety, not economic benefit.

## Adoption and next decisions

Merge as an experimental opt-in capability only if these gates pass. Do not
replace any existing default or prepared run. Before adopting live, separately
authorize a matched, metered study using the same frozen menus and initial seeds.
Measure coverage, invalid actions, sales units/revenue, realized margins,
inventory, survival, aggregate cost and latency against the comparator. Do not
interpret confidence as correctness or predicted profit. The existing frozen
study ECE/Brier summaries are not economic outcome evidence.

Defer founder hiring, career choices, memory scoring and message triage until
this pilot demonstrates useful coverage and economic outcomes. Shared-resource
choices must remain bundled; subjective strategy and narrative stay on their
existing paths. External Hermes agent intents are not intercepted by this pilot.

## Validation log

- Initial baseline invocation: 66 passed, 22 setup errors because the new worktree
  lacked the parent `tmp/` directory. Created that parent and reran unchanged code.
- Corrected baseline: `python -m pytest -q -p no:cacheprovider --tb=short
  --basetemp=tmp/jfp-base-02 tests/test_jev_contract.py tests/test_jev_candidates.py
  tests/test_jev_runtime.py tests/test_jev_studies.py tests/test_documentation.py`:
  **88 passed in 56.34s**.
- Development tests caught a compiler syntax error, an incomplete synthetic
  fixture, and missing founder receipt support in replay provenance. All were
  fixed; the focused pilot/runtime/study run then passed **55 tests in 60.75s**.
- Broad regression (Python 3.11.15, fresh `tmp/jfp-regression-01`):
  `python -m pytest -q -p no:cacheprovider --tb=short
  --basetemp=tmp/jfp-regression-01 tests/test_jev*.py
  tests/test_documentation.py tests/test_external_agent_gateway.py
  tests/test_research_export.py tests/test_prd_completion.py
  tests/test_recorded_replay_golden.py tests/test_population_workforce_recovery.py
  tests/test_bounded_replay.py`: **323 passed in 592.93s**, one existing
  Starlette/httpx deprecation warning. PowerShell expanded the JEV paths before
  invocation. Live-profile calls used HTTP mocks; no paid inference occurred.
- The three-tick whole-world examples each recorded five founder receipts:
  four bounded selections and one original-route portfolio/study turn. Both
  replayed exactly. This is small-fixture coverage, not an economic comparison.
- `python -m pip check`: passed, no broken requirements.
- `python run.py --verify-datasets config/data-manifest.yaml`: passed, all four
  required pinned datasets verified; two optional unpinned sources remain as
  declared. The first invocation could not create its local log directory under
  the worktree sandbox; automatic escalation approval allowed the rerun.
- Final review caught a Windows default-encoding issue in existing punctuation.
  Restored the original Unicode prompt headings and documentation, verifying
  changed prompt string constants against the base commit. Post-repair checks
  are recorded below.
- Post-repair: `python -m pytest -q -p no:cacheprovider --tb=short
  --basetemp=tmp/jfp-final-02 tests/test_jev*.py tests/test_documentation.py
  tests/test_live_response_contract.py tests/test_recorded_replay_golden.py`:
  **154 passed in 95.85s**.
- `python -m compileall -q agents engine experiments hosted llm oracle reports
  research server world run.py`: passed. `git diff --check`: passed.
- The isolated Graft index was refreshed with `graft build`.
- Full cross-platform Python matrix, dashboard/build/dependency-security audits,
  and real provider quality/cost measurements were not run. No dependency or
  frontend changes are included. CI's existing `test_jev_*.py` job includes the
  new tests automatically.

## Merge recommendation

Worth merging into JEV as an opt-in experimental capability after the normal CI
review gate passes. Keep existing profiles and defaults. The offline proofs
cover bounded actions, authority rejection, accounting and replay; they do not
prove that live JEV makes profitable choices or saves money. No merge, push or
live launch is part of this implementation.

The original JEV worktree and its untracked expansion plan were preserved.
Prepared run `9b08e45cca` remains tick 0, paused, with no active tick. Its database,
WAL, SHM and cohort manifest match the recorded baseline hashes. Ten Hermes
profiles remain present, each with its original 30-file count. No Hermes process
was launched and that prepared world was never stepped.
