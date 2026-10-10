# Manyworld branch consolidation and release plan

Prepared October 5, 2026 for Ali. Status: execution started at the user's request. The original audit below is retained as a dated starting point; the current checkpoint follows.

The immediate goal is a working local Manyworld app on one verified `main`, followed by an isolated staging candidate and the existing public-release gates. Integrate the ordered PR queue in small steps. Preserve older experiments and recovery branches with an explicit disposition instead of adding their entire history to the release.

This plan uses the ECC Git Workflow and Production Audit skills and the repository's [branch lifecycle](../branch-lifecycle.md). The [complete branch register](2026-10-05-manyworld-branch-inventory.md) accounts for every remote head, local product branch, worktree and stash observed during this audit.

## Execution checkpoint — October 6, 2026

- Landed #113, #117 and #116 after each exact candidate passed its GitHub gates and had no unresolved review threads. #113 also passed its final-head CircleCI cloud smoke. Earlier #115 remains landed.
- Local main equals origin/main at `7d7cfe98ab655bf03c6b15aa0cf2f003780256e7`. All 35 GitHub branch heads match fetched local refs. Existing planning files and stashes were verified unchanged before this checkpoint refresh; their original copies are preserved under `reports/out/pr-execution-20261005/planning-before-final-checkpoint/`.
- #117 fixes the City List view being lost during an agent-filter update and then omitted from its Evidence bookmark. Diagnosis uses the preserved #116 CI trace. The new observer update uses the current browser URL and retains stale selection-repair guards. Forty repeated City cases, all 152 enabled local browser cases and all 142 critical CI browser cases passed.
- A newly detected npm advisory, GHSA-68fv-2mgg-jv7q, blocked fresh CI. #117 updates only the locked `source-map-js` version to 1.2.2, preserving platform metadata. Node 22 notices/build checks passed, npm audit reports zero vulnerabilities, and CI confirms the committed bundle matches its build. All 284 units and eight focused browser cases passed after the patch.
- The final local main passed all 162 provider-free smoke cases. Its freshly installed dashboard passed all 284 unit cases, typechecking and notices checks. The [final merged-main GitHub run](https://github.com/alinojoumi8/manyworld/actions/runs/37411327971) passed: 32 successful jobs and two expected skips. Earlier failed/superseded CI runs remain preserved; their cancellation is not a successful result.
- #116 remains preparation only: extractor, frozen manifest, approved live bounds, #101 quality evidence and #99 endurance remain outstanding. No paid model run, deployment, branch deletion or Pages/Space update occurred.
- Next: refresh and land React #90, then Deck.gl #91, followed by #83, #84, #85, #86 and #88. Preserve protected worktrees and review each residual diff. The real local storage/recovery/OAuth/control evidence from the earlier checkpoint is retained with its original source commit and receipts; it is not production acceptance.

## Verified starting point

| Surface | Observed state | Meaning for the plan |
|---|---|---|
| Canonical repository | [alinojoumi8/manyworld](https://github.com/alinojoumi8/manyworld) | The rebrand is already merged. Keep the existing local directory name for now. |
| Main | `620b6e414b0e0a6e71a04a9126180aa9255e1d1e`; local HEAD equals `origin/main` | The checkout was clean before adding this plan. [Post-merge CI passed](https://github.com/alinojoumi8/manyworld/actions/runs/37279831596). |
| Branches | 34 GitHub heads; all 34 local and remote-tracking tips match GitHub; 24 additional local product branches | 58 product branches total, including main. Another 105 local `pr/*` refs are review snapshots, not separate integration targets. |
| Review queue | 10 open PRs; all reported checks pass; five are drafts | Optional full-matrix and hosted-service checks are skipped. A green rollup does not establish full release coverage. |
| Work in progress | Three dirty worktrees and one stash | Protect staging's MinIO repair, living-economy work and scale-receipt changes before consolidation. |
| Local environment | `.venv/bin/python` points to `/usr/bin/python3`, now Python 3.14.4; it cannot import pytest; the shell has no `python` alias | Recreate the development environment from the lockfile using documented Python 3.11/3.12. Preserve the old environment until the replacement works. The observed setup failure does not establish an application-code defect. |

Current main already contains the Manyworld rebrand, SimCity, research-city work, TypeSafe JEV, TestClient transport repair, prepared-Passport contract, urllib3 pin, MCP probe contract, financing validation and receipt diagnostics. Do not reopen those integrations because their old branches remain visible.

## First milestone and release blockers

**First implementation milestone:** restore a supported local development environment, preserve the staging work, finish the disposable storage-service repair, and prove a provider-free local startup. The primary checkout's old environment currently cannot run pytest. The current MinIO pull failed before the PostgreSQL/S3 tests could execute. The source-build replacement is present only as uncommitted work in the staging worktree.

1. Create a separate Python 3.11/3.12 environment, install `requirements.lock` with hashes and verify dependency consistency and the smoke suite. Review and checkpoint only the intended Dockerfile, Compose, CI and documentation changes. Keep browser failure artifacts separate. Preserve the failed image-pull receipt.
2. Rebuild both MinIO server and client from the final pinned recipe. Check image identity, required notices and reproducibility. Validate clean volumes first; test upgrade and rollback on disposable copied volumes before any existing data is used.
3. Pass all nine current PostgreSQL/S3 integration cases, the real Litestream file/SFTP tests, catalog backup/restore and replacement/resume drill. A skipped service test is still missing evidence.
4. Create a disposable provider-free world with the supported interpreter and committed production bundle. Verify load, Step, Run, Pause, reload/resume, city navigation, replay and exports. Preserve existing worlds untouched.

The source-build proposal restores a test fixture; it does not settle production storage ownership. Staging must explicitly choose the reference S3-compatible stack or the Hostinger/SFTP stack and prove its recovery path. Current configuration, target availability and operational support must be verified when that choice is implemented.

## Ordered merge queue

The landed sequence is #115 → #113 → #117 → #116. Seven PRs remain. Refresh each branch against current main, review its residual changes, fix conflicts, and pass its focused and GitHub gates before merging. Regenerate tracked dashboard assets from the final source and lockfile. Verify CI on the resulting main; retain failed and superseded results honestly.

| Order | PR and current head | Work needed before landing | Acceptance evidence |
|---|---|---|---|
| 1 | [#90 React and React DOM](https://github.com/alinojoumi8/manyworld/pull/90), `df30c6a` | Refresh against current main, preserving the navigation and source-map patch. Keep React, React DOM and types aligned; rebuild notices and assets. | Dashboard units, typecheck, notices, audit, build and browser navigation. |
| 2 | [#91 Deck.gl](https://github.com/alinojoumi8/manyworld/pull/91), `7010cc3` | Refresh after #90; align core/layers/react and regenerate the complete bundle. | City rendering, picking, pan/rotate, desktop/mobile controls and browser console checks. |
| 3 | [#83 Storage and Hostinger recovery](https://github.com/alinojoumi8/manyworld/pull/83), `bae2520` | Review the draft residual after main refresh; preserve immutable artifacts, awaited authentication and backup permissions. | Focused storage/gateway/replay/export checks and real Litestream/SFTP/catalog restore. |
| 4 | [#84 Passport and city UI](https://github.com/alinojoumi8/manyworld/pull/84), `2d06417` | Refresh after dependency/storage landings; reconcile the latest source and rebuilt bundle deliberately. | Passport/gateway contracts, browser routes, controls, reconnect/error states and real-backend menu checks. |
| 5 | [#85 Staging candidate](https://github.com/alinojoumi8/manyworld/pull/85), `d5189a7` | The source-pinned MinIO repair is complete. Review the residual after #83/#84 and preserve protected local work. | Real PostgreSQL/S3 tests, Compose builds, storage-pressure controls and migration/restore checks. |
| 6 | [#86 Production operations](https://github.com/alinojoumi8/manyworld/pull/86), `62ab4c6` | Carry validated staging changes forward; review bounded starts, recovery, retention and alerts. | Replacement/resume without duplicate actions, isolation/load, firing/resolved alerts and rollback. Real destination delivery remains a separate target-specific gate. |
| 7 | [#88 Verified integration](https://github.com/alinojoumi8/manyworld/pull/88), `dd9962f` | Review remaining OAuth/CSP/integration changes after its predecessors land; refresh stale evidence wording. | Real approve/deny PKCE callbacks, callback origins/CSP, gateway/TypeSafe/replay checks, then final combined release gates. |

Git ancestry proves #85 contains the current #83 head, #86 contains #85, and #88 contains #86. The original UI fix is present in this stack, but the current #84 tip is not an ancestor of #85. Reconcile its latest source and rebuilt bundle deliberately instead of assuming the stack already contains the whole current UI branch.

The old `codex/hermes-native-validation` line needs no additional feature PR: its UI commit is in #84 and its callback patch is equivalent to the implementation in #88. Verify that equivalence remains true after conflict resolution.

## Remaining branch decisions

Across all 58 product branches, the register classifies 37 as merged, nine as open-review, three as active-protected, five as port-source, two as archived, one as superseded and main as the integration destination. The protected staging branch is the tenth open PR.

- **Already integrated:** leave the 37 merged refs out of the merge queue. This includes reviewed squash integration and patch-equivalence evidence, not only ancestry. Cleanup is a later, separately approved operation.
- **Historical or optional sources:** review JEV's later decision-expansion document, the founder-pricing experiment, offline wait-analysis helpers and the old README/artwork selectively. Keep pricing changes opt-in. These are outside the initial working-app milestone; they must not silently replace current mechanics or branding.
- **Protected local changes:** checkpoint and compare the living-economy and scale-receipt work before deciding whether any residual patch is needed. A merged branch tip does not include its uncommitted changes.
- **Verification and recovery refs:** retain the combined candidate, stash-shaped archive, recovery source and 105 PR snapshots as evidence. The combined candidate is a test artifact; land its source PRs through the queue above.

Resolve every wanted residual change into a focused PR or record why it is retained/deferred. No branch, worktree, stash, database or remote ref is deleted by this plan.

## Working local app acceptance

After the queue and any accepted release-critical residual ports land, freeze a clean main commit, tree, lockfiles and container digest. Record the actual interpreter, SQLite and Node versions. Keep the candidate unchanged throughout research and replay validation.

1. Pass all nine maintained [reproducibility-v1 gates](../reproducibility-release-profile.md) and collect candidate-bound hashed receipts. Run the offline collector against the complete package.
2. Run the full Python release matrix required by [development](../development.md), including all 16 shards per selected OS/Python pair. A subset must be labeled partial. Reconcile every optional skip against an explicitly executed service drill.
3. Pass dashboard unit tests, typecheck, license/notice freshness, dependency audit, a clean production build and tracked/untracked asset-drift checks. Run Chromium against both mocked contracts and a disposable real backend, including mobile/keyboard navigation and OAuth.
4. Complete `scripts/city_research_acceptance.py`: both G2/F2 studies, independent bundle imports and unchanged source-world hashes. Exercise run controls, reload/resume and historical/replay views using disposable data.
5. Build the final container, run exact replay with network disabled, and repeat the durable-service/backup/replacement checks for that same candidate. Run the current provenance, dataset, dependency, license and tree/history secret audits.
6. Record the documented local launch command and a visible working app. Main must equal origin/main, post-merge CI must be green, and no generated assets may remain uncommitted.

Only call this milestone complete when the final merged candidate has these receipts. The prior combined candidate provides useful regression evidence but cannot fill new candidate-bound release rows.

## Evidence already available

The saved candidate `5391346b151388790676cd6e862c79a37240d31c` includes eleven earlier PR heads. Its completed receipts were rechecked in this planning pass:

| Evidence | Verified result | Limit |
|---|---|---|
| Python suite | 16/16 shard exit codes zero; 3,961 passed, 13 skipped, zero failures/errors; 3,974 unique JUnit cases | Skips need PostgreSQL/S3, Litestream, catalog or replacement services. The initial identity file still says `running`; final results and all 16 XML files establish completion. |
| Chromium | 155 passed, two opt-in skips | Prior combined candidate, not final main. |
| Real-backend smoke | Passed at tick three, zero provider calls and unchanged world hash | Disposable local world only. |
| City research acceptance | Both G2/F2 exports independently verified; source hash unchanged | 25-agent, three-tick local acceptance only. |
| Container replay | Eight cases passed with Python 3.12.15 / SQLite 3.46.1 | Before the uncommitted storage fixture repair. |
| Durable services | Failed during MinIO container startup; owned resources removed | Tests did not execute. Preserve the failure; do not count it as a skip or pass. |
| CircleCI #113 | [Remote smoke](https://app.circleci.com/workflow/a3e177f4-bbc9-45ab-979e-a6d44417a3d5) reported 158 passes at `67f1ac9` | The optional CircleCI full suite was not run. |

Local receipts are under ignored `reports/out/release-repairs-20261005/combined-candidate/`. The refreshed inventory, GitHub snapshots and independently counted JUnit summary are under ignored `reports/out/branch-plan-20261005/`. Preserve these originals; do not commit databases, credentials or private provider bodies.

## Open issues and launch scope

| Issue | Proposed action and completion boundary |
|---|---|
| [#52 308-agent economic acceptance](https://github.com/alinojoumi8/manyworld/issues/52) | Stages one and two are implemented. First resolve every open PR, verify post-merge CI and synchronize main. Then execute the 120-tick provider-free A/B, repair economic gates, and pass the formal 1,000-tick recovery acceptance in the required separate stages. Paid canaries follow only with explicit caps. Never substitute a short run or a clean ledger for economic-health evidence. |
| [#98 Context and token efficiency](https://github.com/alinojoumi8/manyworld/issues/98) | Recover the original raw audits or document their absence; compare prospective matched configurations and cached/uncached costs. Preserve capabilities, isolation and receipts. The issue explicitly calls this an efficiency follow-up, not an integration blocker. |
| [#102 Receipt lookup diagnostics](https://github.com/alinojoumi8/manyworld/issues/102) | #114 adds offline fixtures. Preserve the historical failed lookups when their source files are recovered, and distinguish wrong IDs, premature lookup and stale context. Do not claim a historical cause or weaken production retries from fixture coverage alone. |
| [#101 JEV quality](https://github.com/alinojoumi8/manyworld/issues/101) | Land #116, implement and test the extractor, freeze the manifest and evaluate matched seeds/horizons with uncertainty and hard replay/accounting gates. Keep JEV-v4 opt-in; cheaper execution does not establish better decisions. |
| [#99 Hermes/JEV endurance](https://github.com/alinojoumi8/manyworld/issues/99) | Prepare checkpoints, exactly-once receipts, reservation/ledger checks and network-disabled replay. A longer live run needs its own duration/provider/spend bounds. Five ticks cannot prove endurance. |

## Staging and public release

A working local app is the first deliverable. The current [go/no-go contract](../release-readiness-go-no-go.md) still requires the fixed 16-gate `production-v1` package for a public tag or deployment. This plan retains that contract.

After local acceptance, prepare the exact staging candidate, target, HTTPS origin, isolated tenant/volumes, operator-managed secrets, backup destination, monitoring owner, costs and rollback evidence. Present that concrete package for the required target-specific execution decision.

The remaining production rows include five independent connector receipts; three Semantics 10 rollout receipts; V9 calibration; the corrected 30-day rumor pilot; the subsequent 365-day production acceptance; provenance and dependency/license/secret audits; hosted backup/restore and isolation/load; and the final deployment receipt. The first fifteen must pass before the separately approved deployment step. Collect each against the required candidate identity and preserve failures.

No fixed ship date is justified until the disposable storage checks and final merged-candidate acceptance pass and the hosted/live execution bounds are settled. If a smaller release is desired, make that a separate explicit product-scope decision with accurate claims; a renamed profile or omitted gate must not be presented as passing `production-v1`.

## Manyworld Space handoff

Cancelled by the user on October 5, 2026. Continue PR repairs and repository work only; no Pages or Manyworld Space updates are requested.

## Completion record for this planning pass

- Completed: current GitHub PR/issue/CI audit, remote/local tip comparison, all 58 product-branch dispositions, all 13 worktree checks, stash preservation record and prior-candidate result verification.
- Created: this execution plan and the complete branch register; linked the active audit from the handbook and branch lifecycle guide.
- Verified: all 58 branches occur exactly once in the register; new-document local links resolve; 22 documentation tests passed from the primary checkout using the existing Python 3.11 validation environment. The primary `.venv` attempt failed because pytest is unavailable; that setup problem remains an implementation task.
- Not performed: product changes, branch merges, pushes, deletions, paid calls, hosted deployment or new runtime acceptance runs.
- Next implementation: restore the supported local environment and finish the protected staging storage repair, then execute the ordered merge queue with fresh evidence after each landing.
