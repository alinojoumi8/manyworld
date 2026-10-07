# Branch recovery review — October 7, 2026

Reviewed against main `f44dbbe92426eb511a39f670de476999fdf04df6`.
This completes the follow-up review of the two dirty historical worktrees;
it does not promote their old branches or generated dashboard bundles.

## Preservation

Both original worktrees remain unchanged. An external recovery package contains
a verified Git bundle for both branch tips, binary tracked and staged patches,
the three untracked living-map files, SHA-256 manifests, and an inventory of
ignored files. A temporary detached restore reproduced all four scale-validator
paths and all 34 living-map paths, including the deleted generated files.
Ignored databases, reports, and private configuration remain in their original
worktrees; the recovery package inventories them without copying them. Do not
remove either worktree until that ignored material has been handled separately.

## Scale validation receipts

Source tip: `6d72eadb9183b3c481bec0dc73633f0c995d9333`.

| Uncommitted intent | Current implementation and evidence | Disposition |
| --- | --- | --- |
| Missing/malformed expected recovery profile fails A/B validation closed | `reports/scale_economic_health.py:evaluate_scale_ab` handles OSError, TypeError and ValueError and verifies the loaded mapping; `tests/test_scale_economic_health.py` covers malformed-policy rejection | Already represented with stronger input handling |
| Explicit live versus provider-free spend contract | `scripts/run_scale_validation.py:run_validation` already uses the parenthesized branches | Already represented |
| CLI receipt path comes from its recorded artifact identity | `scripts/run_scale_validation.py:main` already resolves the persisted filename; `test_cli_reports_the_persisted_runtime_artifact` exercises CLI output | Already represented; the old helper adds no missing behavior |

No runtime port is needed from this worktree.

## Living economy map

Source tip: `c86a9cf2662345209f6fa4698e149705678a9087`.
The earlier path-by-path inventory is retained in
[`2026-08-05-dirty-worktree-inventory.md`](2026-08-05-dirty-worktree-inventory.md).
Its original portable classifications are historical; its implemented closure
section and current code show that the following work has since landed.

| Uncommitted intent and paths | Current evidence | Disposition |
| --- | --- | --- |
| Resume hydration and forward-only activations: `run.py`, compatibility tests | `activate_entrepreneurship_for_run`, `activate_numeric_grounding_for_run`, `_hydrate_resumed_world`; compatibility and research-validity tests | Already represented; current boundary validation is stronger |
| Reserved-belief step guards and public model reasoning/memories: `agents/memory.py`, `agents/runtime.py`, `agents/numeric_grounding.py`, research-validity tests | Current validators reject out-of-step changes rather than silently clamping; raw governed calls remain auditable; the shared Decimal-based numeric contract handles malformed inputs | Already represented or superseded by stricter validation |
| Prompt grounding, cents, historical-memory labels: `agents/prompts.py`, `runs/base.yaml` | Current grounding suffix, shared unit-aware renderer, persisted activation boundary | Already represented except reserved-baseline display ordering |
| Startup activation, formation cap, pre-seed, IP and mergers: prompts, `engine/actions.py`, `world/metrics.py`, native profile and tests | Current native-entrepreneurship tests cover activation, caps and engine-priced funding/IP/merger transitions, including rejection of mutated prices | Already represented; old IP exposure while financing was pending is intentionally superseded |
| News, conversations, reports, API and replay grounding: `world/newsroom.py`, `reports/generate.py`, `server/app.py`, `server/replay.py` and their tests | Current public projections and numeric redaction tests; replay uses the requested historical tick instead of imposing a later grounding boundary | Already represented; the historical replay behavior is safer than the old patch |
| Local mode handshake: `server/app.py`, R21 tests | Current local/hosted mode contract returns `/api/v2`; the old `/api` value is obsolete | Superseded |
| Metric units, deltas, trust precision, authority labels, redaction markers, partial days: dashboard API and all seven modified panel components, two old dashboard test files | Current shared formatters and `dashboard/tests/ui.test.js` verify these public presentation contracts | Already represented |
| Old `server/static` asset removals/additions and index references | Current production build has different generated asset identities | Generated historical artifacts; preserve for recovery, never port directly |

## Recovered gap: reserved belief context

`render_prompt` displays at most eight beliefs. Its original insertion order can
fill that window with custom beliefs, hiding the baselines needed for valid
model updates. The old worktree sorted bank trust first; that could still hide
sentiment and inflation expectations when many bank beliefs exist.

The focused port prioritizes the current bank's trust, sentiment and inflation
expectations, followed by other bank trust and custom beliefs. It changes only
the rendered context, without mutating belief values or input dictionaries.

The new persisted setting `beliefs.prioritize_reserved_belief_context: true` is
enabled for new runs using the base profile. Reordering also requires the
existing numeric-grounding boundary to be active. Missing, false or malformed
settings preserve original order, as do ticks before grounding activation.
Stored runs and replay configs lacking the opt-in retain their prompt contract.
This change does not activate or rewrite any stored run.

Verification includes a reproduced failure with eight custom beliefs and twelve
bank trust beliefs, plus opt-in/off/missing/malformed/pre-boundary cases. The
existing compatibility and recorded replay suites are part of the focused gate.

## Cleanup disposition

Both source branches are preservation archives, not whole-branch merge targets.
The scale worktree has no missing reviewed runtime behavior. After the focused
reserved-context port lands, the living-map worktree has no remaining reviewed
behavior to port. Keep ignored scientific artifacts separate from branch
cleanup, and use focused PRs for the other historical recovery families.
