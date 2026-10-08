# Manyworld complete branch register

Observed 2026-10-05T16:40:07.570545+00:00. Companion to the [branch consolidation and release plan](2026-10-05-manyworld-branch-and-release-plan.md). This is an evidence snapshot and proposed disposition register; no listed branch or worktree was changed or removed during the audit.

## Current execution checkpoint

Main is `7d7cfe98ab655bf03c6b15aa0cf2f003780256e7` after #113, #117 and #116 landed (in addition to earlier #115). All 35 live GitHub heads match their fetched local refs; exact current SHAs are in `reports/out/pr-execution-20261005/branch-sync-after-merges.json`. The new `codex/city-filter-navigation-fix` branch remains preserved at `3700a7215ea77ec6843580cfc6c12520c6aa3fa4`, with its clean worktree at `/home/ali/.codex/worktrees/city-navigation-repair/agent-economy`.

The 34-head table, ahead/behind counts and worktree/stash listings below are the original dated audit snapshot. They are retained as history rather than presented as current tips. Seven PRs remain: #90, #91, #83, #84, #85, #86 and #88. No branch, existing stash or protected worktree was removed. The original planning document is backed up before this checkpoint update.

## How to read the register

Main is `620b6e414b0e0a6e71a04a9126180aa9255e1d1e`. Every one of the 34 GitHub branch tips matched its local branch and `origin/` tracking ref. There are 58 local product branches in total, plus 105 local `pr/*` review snapshots.

Counts are **A/B/U**: commits ahead of main, commits behind main, and non-merge commits remaining after patch-equivalence filtering. U is a screening signal: squash merges can leave positive counts even when reviewed work is integrated. Per-commit listings and full SHAs are retained in the ignored `reports/out/branch-plan-20261005/branch-inventory.json` snapshot. Counts are relative to the observed main and will change after each merge.

The upstream abbreviation `origin/same` means `origin/` followed by the exact branch name in that row. A configured upstream is not proof that its remote branch still exists; the two sections distinguish live remote heads from local-only refs. Worktree IDs refer to the absolute paths and dirty-state details below.

## All GitHub branch heads

| Branch and tip | A/B/U and PR | Worktree and upstream | Classification evidence and proposed action |
|---|---|---|---|
| `JEV` / `09fd83f` | 1/58/1; [#95 merged](https://github.com/alinojoumi8/manyworld/pull/95) | —; `origin/same` | **port-source**. #95 is merged, but current tip adds one later 584-line plan; that residual is not in main. Review 09fd83f as historical decision-expansion documentation; selectively port useful notes alongside #101, preserving completed/remaining distinctions. |
| `codex/archive-readme-20260917` / `2fd6e7b` | 1/154/0; None | —; `origin/same` | **merged**. All non-merge patches are equivalent to main; branch/worktree preservation is separate. No duplicate merge. Preserve any uncommitted work separately before cleanup. |
| `codex/archive-stash-progress` / `c09664f` | 3/202/2; None | —; `origin/same` | **archived**. Tip tree has no diff from its main merge base, but two non-merge parent commits preserve index/untracked objects. Preserve the stash-shaped history and its untracked parent. Do not treat its empty tip diff as dispensable. |
| `codex/circleci-release-checks` / `67f1ac9` | 3/16/2; [#113 open](https://github.com/alinojoumi8/manyworld/pull/113) | —; `origin/same` | **open-review**. Open PR #113; current reported checks pass; optional full/service jobs skipped. Land PR #113 in the release queue after its listed acceptance checks. |
| `codex/city-unified-observer` / `8427625` | 0/76/0; [#93 merged](https://github.com/alinojoumi8/manyworld/pull/93) | —; `origin/same` | **merged**. Tip is an ancestor of current main. No integration needed. Retain until an explicitly approved cleanup. |
| `codex/docker-replay-runtime` / `5a2828d` | 2/10/1; [#115 open](https://github.com/alinojoumi8/manyworld/pull/115) | —; `origin/same` | **open-review**. Open PR #115; current reported checks pass; optional full/service jobs skipped. Land PR #115 in the release queue after its listed acceptance checks. |
| `codex/financing-lifecycle-validation` / `a034608` | 0/25/0; [#112 merged](https://github.com/alinojoumi8/manyworld/pull/112) | —; `origin/same` | **merged**. Tip is an ancestor of current main. No integration needed. Retain until an explicitly approved cleanup. |
| `codex/hermes-diagnostics` / `d6c304a` | 0/37/0; [#97 merged](https://github.com/alinojoumi8/manyworld/pull/97) | —; `origin/same` | **merged**. Tip is an ancestor of current main. No integration needed. Retain until an explicitly approved cleanup. |
| `codex/hermes-native-validation` / `42f89b8` | 2/104/2; None | —; `origin/same` | **port-source**. 0cc46ad is contained in #84/#85/#86/#88; 42f89b8 is patch-equivalent in #88. Resolve through #84 and #88. Do not open a duplicate merge for the old branch. |
| `codex/hermes-receipt-diagnostics` / `667f708` | 0/21/0; [#114 merged](https://github.com/alinojoumi8/manyworld/pull/114) | —; `origin/same` | **merged**. Tip is an ancestor of current main. No integration needed. Retain until an explicitly approved cleanup. |
| `codex/hostinger-storage-recovery` / `d672c06` | 11/6/8; [#83 open](https://github.com/alinojoumi8/manyworld/pull/83) | —; `origin/same` | **open-review**. Open draft PR #83; current reported checks pass; optional full/service jobs skipped. Land PR #83 in the release queue after its listed acceptance checks. |
| `codex/jev-decision-domains` / `483cce6` | 0/35/0; [#96 merged](https://github.com/alinojoumi8/manyworld/pull/96) | —; `origin/same` | **merged**. Tip is an ancestor of current main. No integration needed. Retain until an explicitly approved cleanup. |
| `codex/jev-direct-typesafe` / `8bf97e6` | 0/27/0; [#105 merged](https://github.com/alinojoumi8/manyworld/pull/105) | —; `origin/same` | **merged**. Tip is an ancestor of current main. No integration needed. Retain until an explicitly approved cleanup. |
| `codex/jev-founder-pricing` / `43f25b0` | 2/58/2; None | —; `origin/same` | **port-source**. Two unique commits b4e8c03 and 43f25b0; no open PR; changes include pricing policy, runtime and a historical 20-tick report. Keep the pricing pilot opt-in and outside the working-app release queue. Review current decision contracts and quality evidence before a focused port. |
| `codex/jev-quality-study-plan-20261005` / `f45b9e4` | 2/6/2; [#116 open](https://github.com/alinojoumi8/manyworld/pull/116) | W4 clean; `origin/same` | **open-review**. Open PR #116; current reported checks pass; optional full/service jobs skipped. Land PR #116 in the release queue after its listed acceptance checks. |
| `codex/jev-wait-analysis` / `f7335e0` | 3/34/3; None | —; `origin/same` | **port-source**. Three unique commits e8952da, 645bcf9, f7335e0; 28 files; no open PR. Select offline analysis/extraction helpers useful to #98/#101/#102; review source provenance and tests. Preserve live-run scripts without executing them. |
| `codex/live-ui-validation` / `57869b0` | 3/6/1; [#84 open](https://github.com/alinojoumi8/manyworld/pull/84) | W1 clean; `origin/same` | **open-review**. Open draft PR #84; current reported checks pass; optional full/service jobs skipped. Land PR #84 in the release queue after its listed acceptance checks. |
| `codex/manyworld-rebrand` / `9c16d85` | 0/32/0; [#107 merged](https://github.com/alinojoumi8/manyworld/pull/107) | —; `origin/same` | **merged**. Tip is an ancestor of current main. No integration needed. Retain until an explicitly approved cleanup. |
| `codex/mcp-probe-contract` / `ff67dc3` | 0/27/0; [#111 merged](https://github.com/alinojoumi8/manyworld/pull/111) | —; `origin/same` | **merged**. Tip is an ancestor of current main. No integration needed. Retain until an explicitly approved cleanup. |
| `codex/merge-93-guard-fixes` / `be89ce9` | 0/88/0; None | —; `origin/same` | **merged**. Tip is an ancestor of current main. No integration needed. Retain until an explicitly approved cleanup. |
| `codex/named-hermes-citizens` / `073cd43` | 0/85/0; [#94 merged](https://github.com/alinojoumi8/manyworld/pull/94) | —; `origin/same` | **merged**. Tip is an ancestor of current main. No integration needed. Retain until an explicitly approved cleanup. |
| `codex/pr96-combined-review-fixes` / `483cce6` | 0/35/0; None | —; `origin/same` | **merged**. Tip is an ancestor of current main. No integration needed. Retain until an explicitly approved cleanup. |
| `codex/prepared-passport-contract` / `ca4ef9d` | 0/30/0; [#109 merged](https://github.com/alinojoumi8/manyworld/pull/109) | —; `origin/same` | **merged**. Tip is an ancestor of current main. No integration needed. Retain until an explicitly approved cleanup. |
| `codex/production-ops-20260916` / `787b489` | 25/6/14; [#86 open](https://github.com/alinojoumi8/manyworld/pull/86) | —; `origin/same` | **open-review**. Open draft PR #86; current reported checks pass; optional full/service jobs skipped. Land PR #86 in the release queue after its listed acceptance checks. |
| `codex/readme-project-story` / `e8182c1` | 1/104/1; None | —; `origin/same` | **port-source**. Unique docs/artwork commit e8182c1; no open PR; not patch-equivalent to main. Review artwork/provenance and reusable prose against the Manyworld README; port only wanted content without restoring old branding. |
| `codex/research-city-price-lab` / `7bb8aa1` | 0/115/0; [#82 merged](https://github.com/alinojoumi8/manyworld/pull/82) | —; `origin/same` | **merged**. Tip is an ancestor of current main. No integration needed. Retain until an explicitly approved cleanup. |
| `codex/staging-release-20260916` / `62f7185` | 21/6/12; [#85 open](https://github.com/alinojoumi8/manyworld/pull/85) | W2 dirty; `origin/same` | **active-protected**. Open draft PR #85; current reported checks pass; optional full/service jobs skipped. Land PR #85 in the release queue after its listed acceptance checks. |
| `codex/testclient-httpx2` / `d4ae123` | 0/30/0; [#108 merged](https://github.com/alinojoumi8/manyworld/pull/108) | —; `origin/same` | **merged**. Tip is an ancestor of current main. No integration needed. Retain until an explicitly approved cleanup. |
| `codex/urllib3-security-pin` / `141a778` | 0/30/0; [#110 merged](https://github.com/alinojoumi8/manyworld/pull/110) | —; `origin/same` | **merged**. Tip is an ancestor of current main. No integration needed. Retain until an explicitly approved cleanup. |
| `codex/verified-integration-20260917` / `32a8d41` | 36/6/21; [#88 open](https://github.com/alinojoumi8/manyworld/pull/88) | —; `origin/same` | **open-review**. Open draft PR #88; current reported checks pass; optional full/service jobs skipped. Land PR #88 in the release queue after its listed acceptance checks. |
| `dependabot/npm_and_yarn/dashboard/deck.gl/react-9.4.0` / `8ffde7c` | 4/6/1; [#91 open](https://github.com/alinojoumi8/manyworld/pull/91) | —; `origin/same` | **open-review**. Open PR #91; current reported checks pass; optional full/service jobs skipped. Land PR #91 in the release queue after its listed acceptance checks. |
| `dependabot/npm_and_yarn/dashboard/multi-7f19880bf6` / `6cff756` | 4/6/1; [#90 open](https://github.com/alinojoumi8/manyworld/pull/90) | —; `origin/same` | **open-review**. Open PR #90; current reported checks pass; optional full/service jobs skipped. Land PR #90 in the release queue after its listed acceptance checks. |
| `main` / `620b6e4` | 0/0/0; None | W0 clean; `origin/same` | **main**. Local HEAD and GitHub origin/main agree. Keep as the clean integration destination. |
| `simcity` / `669dc37` | 0/198/0; None | —; `origin/same` | **merged**. Tip is an ancestor of current main. No integration needed. Retain until an explicitly approved cleanup. |

## Additional local product branches

| Branch and tip | A/B/U and PR | Worktree and upstream | Classification evidence and proposed action |
|---|---|---|---|
| `backup/main-before-github-sync-20260809` / `724dbcb` | 25/230/25; None | —; `none` | **merged**. Contained in #43 head 15ca924; its tree exactly equals merged commit 0904063, an ancestor of main. No duplicate merge; retain historical evidence until cleanup is approved. |
| `codex/editorial-wordmark` / `669dc37` | 0/198/0; None | —; `none` | **merged**. Tip is an ancestor of current main. No integration needed. Retain until an explicitly approved cleanup. |
| `codex/integrate-origin-20260805` / `28714dd` | 0/242/0; None | —; `none` | **merged**. Tip is an ancestor of current main. No integration needed. Retain until an explicitly approved cleanup. |
| `codex/live-dual-paid-20260807` / `a448205` | 1/229/0; [#45 merged](https://github.com/alinojoumi8/manyworld/pull/45) | W7 clean; `origin/same` | **merged**. All non-merge patches are equivalent to main; branch/worktree preservation is separate. No duplicate merge. Preserve any uncommitted work separately before cleanup. |
| `codex/local-security-hardening-20260809` / `ce3001d` | 26/230/25; None | —; `none` | **merged**. All 25 patch-unique commits are in #43 head 15ca924; remaining ce3001d security-scanning commit is patch-equivalent to main. #43 merged tree equality verified. No duplicate merge. Retain the historical security branch until an explicitly approved cleanup. |
| `codex/pre-pull-20260805` / `154a5b7` | 0/293/0; None | —; `none` | **merged**. Tip is an ancestor of current main. No integration needed. Retain until an explicitly approved cleanup. |
| `codex/publish-20260805` / `5faf098` | 0/235/0; None | —; `none` | **merged**. Tip is an ancestor of current main. No integration needed. Retain until an explicitly approved cleanup. |
| `codex/react-query-5.101.4` / `a366b06` | 0/231/0; [#42 merged](https://github.com/alinojoumi8/manyworld/pull/42) | W8 clean; `origin/same` | **merged**. Tip is an ancestor of current main. No integration needed. Retain until an explicitly approved cleanup. |
| `codex/recharts-3.10.1` / `9bba0dc` | 0/234/0; [#41 merged](https://github.com/alinojoumi8/manyworld/pull/41) | —; `origin/same` | **merged**. Tip is an ancestor of current main. No integration needed. Retain until an explicitly approved cleanup. |
| `codex/reconcile-main-github-20260809` / `724dbcb` | 25/230/25; None | —; `none` | **merged**. Contained in #43 head 15ca924; its tree exactly equals merged commit 0904063, an ancestor of main. No duplicate merge; retain historical evidence until cleanup is approved. |
| `codex/reconcile-recovery-20260805` / `e69beb0` | 23/230/23; None | W9 clean; `none` | **merged**. Contained in #43 head 15ca924; its tree exactly equals merged commit 0904063, an ancestor of main. No duplicate merge; retain historical evidence until cleanup is approved. |
| `codex/reconcile-release` / `d63d48a` | 26/280/26; None | W6 clean; `none` | **superseded**. All 26 source commits have dispositions in docs/reconciliation/2026-08-05-recovery-port-ledger.md; target is included through #43. Preserve as the source of the reviewed recovery port; no wholesale merge. |
| `codex/release-preflight-20261004` / `28be4cd` | 0/31/0; None | —; `none` | **merged**. Tip is an ancestor of current main. No integration needed. Retain until an explicitly approved cleanup. |
| `codex/release-validation-20261005` / `5391346` | 58/2/27; None | W3 clean; `none` | **archived**. Candidate 5391346 includes 11 earlier PR heads and generated bundle; tested offline, excludes later #116 and uncommitted MinIO repair. Retain as the historical combined test candidate only; land its source PRs separately. |
| `codex/salvage-living-20260805` / `15ca924` | 91/230/90; [#43 merged](https://github.com/alinojoumi8/manyworld/pull/43) | W10 clean; `origin/same` | **merged**. Contained in #43 head 15ca924; its tree exactly equals merged commit 0904063, an ancestor of main. No duplicate merge; retain historical evidence until cleanup is approved. |
| `codex/scale-170-live-20260808` / `2376082` | 1/216/0; None | W11 clean; `origin/main` | **merged**. All non-merge patches are equivalent to main; branch/worktree preservation is separate. No duplicate merge. Preserve any uncommitted work separately before cleanup. |
| `codex/scale-270-acceptance-design-20260810` / `d5533d7` | 7/204/7; [#53 merged](https://github.com/alinojoumi8/manyworld/pull/53) | —; `origin/same` | **merged**. PR #53 head tree exactly equals merged commit 983669b, an ancestor of main. No duplicate merge; retain the approved #52 acceptance design. |
| `codex/scale-validation-receipts-20260810` / `6d72ead` | 1/202/0; [#55 merged](https://github.com/alinojoumi8/manyworld/pull/55) | W12 dirty; `origin/same` | **active-protected**. All non-merge patches are equivalent to main; branch/worktree preservation is separate. No duplicate merge. Preserve any uncommitted work separately before cleanup. |
| `codex/sync-main-github-20260809` / `d5502ff` | 0/211/0; None | —; `origin/main` | **merged**. Tip is an ancestor of current main. No integration needed. Retain until an explicitly approved cleanup. |
| `dependabot/npm_and_yarn/dashboard/playwright/test-1.63.0` / `1754bf2` | 0/29/0; [#89 merged](https://github.com/alinojoumi8/manyworld/pull/89) | —; `origin/same` | **merged**. Tip is an ancestor of current main. No integration needed. Retain until an explicitly approved cleanup. |
| `dependabot/npm_and_yarn/dashboard/tanstack/react-query-5.102.8` / `c093f78` | 0/29/0; [#79 merged](https://github.com/alinojoumi8/manyworld/pull/79) | —; `origin/same` | **merged**. Tip is an ancestor of current main. No integration needed. Retain until an explicitly approved cleanup. |
| `dependabot/npm_and_yarn/dashboard/vite-8.3.0` / `9483772` | 0/25/0; [#92 merged](https://github.com/alinojoumi8/manyworld/pull/92) | —; `origin/same` | **merged**. Tip is an ancestor of current main. No integration needed. Retain until an explicitly approved cleanup. |
| `dependabot/pip/pandas-gte-2.3.3-and-lt-4` / `57502ee` | 0/29/0; [#106 merged](https://github.com/alinojoumi8/manyworld/pull/106) | —; `origin/same` | **merged**. Tip is an ancestor of current main. No integration needed. Retain until an explicitly approved cleanup. |
| `feature/living-economy-map` / `c86a9cf` | 21/287/20; [#27 closed](https://github.com/alinojoumi8/manyworld/pull/27) | W5 dirty; `origin/same` | **active-protected**. Closed PR #27; 20 patch-unique commits plus dirty worktree. Do not infer abandonment or full equivalence. Checkpoint the 34 changed/untracked paths separately; compare desired residual changes with current main before a selective port. |

## Worktrees

Dirty counts include tracked changes and untracked paths, but exclude ignored runtime artifacts. A clean worktree can still own important ignored databases or evidence; inspect those before any future removal.

| ID | Branch | Absolute path | State at audit |
|---|---|---|---|
| W0 | `main` | `/mnt/data/projects/agent-economy` | Clean |
| W1 | `codex/live-ui-validation` | `/home/ali/.codex/worktrees/release-preflight-20261004/agent-economy` | Clean |
| W2 | `codex/staging-release-20260916` | `/home/ali/.codex/worktrees/storage-pr83-repair/agent-economy` | Dirty: 7 paths |
| W3 | `codex/release-validation-20261005` | `/home/ali/.codex/worktrees/testclient-httpx2/agent-economy` | Clean |
| W4 | `codex/jev-quality-study-plan-20261005` | `/home/ali/.codex/worktrees/urllib3-security-pin/agent-economy` | Clean |
| W5 | `feature/living-economy-map` | `/home/ali/Documents/myprojects/agent-economy/.worktrees/living-economy-map` | Dirty: 34 paths |
| W6 | `codex/reconcile-release` | `/home/ali/Documents/myprojects/agent-economy/.worktrees/reconcile-release` | Clean |
| W7 | `codex/live-dual-paid-20260807` | `/mnt/data/projects/agent-economy/.worktrees/live-dual-paid-20260807` | Clean |
| W8 | `codex/react-query-5.101.4` | `/mnt/data/projects/agent-economy/.worktrees/publish-20260805` | Clean |
| W9 | `codex/reconcile-recovery-20260805` | `/mnt/data/projects/agent-economy/.worktrees/reconcile-recovery-20260805` | Clean |
| W10 | `codex/salvage-living-20260805` | `/mnt/data/projects/agent-economy/.worktrees/salvage-living-20260805` | Clean |
| W11 | `codex/scale-170-live-20260808` | `/mnt/data/projects/agent-economy/.worktrees/scale-170-live-20260808` | Clean |
| W12 | `codex/scale-validation-receipts-20260810` | `/mnt/data/projects/agent-economy/.worktrees/scale-validation-receipts-20260810` | Dirty: 4 paths |

### Protected staging work

W2 contains four tracked edits (`.github/workflows/ci.yml`, `deploy/compose.yaml`, `docs/development.md`, and `docs/plans/2026-09-16-staging-release.md`), the new `deploy/minio/Dockerfile`, and two untracked browser-result files. Preserve all seven paths. Review/checkpoint the five intended product/documentation files as a cohesive storage-fixture repair; keep failed browser evidence separate. No receipt currently proves the final uncommitted repair against the real durable-service suite.

### Protected living economy work

W5 has 34 changed/untracked paths spanning memory, prompts/runtime, engine actions, metrics/newsroom, reporting, API/replay, profiles, dashboard, generated assets and tests. Preserve its proposed `agents/numeric_grounding.py` and every untracked bundle. Compare desired residual behavior with the already integrated #43 work; do not reset this worktree because PR #27 is closed.

### Protected scale receipt work

W12 has uncommitted changes in `reports/scale_economic_health.py`, `scripts/run_scale_validation.py`, `tests/test_scale_economic_health.py`, and `tests/test_scale_validation.py`. Its committed patch has integration evidence through #55; these four working changes do not. Checkpoint and review them before #52 stage three, retaining the required separate-stage and zero-open-PR gates.

## Unique sources outside the merge queue

These residual changes have explicit proposed review paths. Retain the original refs even when a selective port is chosen.

| Source | Commit scope | Review outcome sought |
|---|---|---|
| `JEV` | `09fd83f` docs(jev): preserve decision expansion plan | Review 09fd83f as historical decision-expansion documentation; selectively port useful notes alongside #101, preserving completed/remaining distinctions. |
| `codex/hermes-native-validation` | `42f89b8` fix(oauth): allow validated browser callback redirects; `0cc46ad` fix: polish city navigation and Passport OAuth discovery | Resolve through #84 and #88. Do not open a duplicate merge for the old branch. |
| `codex/jev-founder-pricing` | `43f25b0` docs(jev): record 20-tick live pricing evaluation; `b4e8c03` feat(jev): add opt-in founder pricing pilot | Keep the pricing pilot opt-in and outside the working-app release queue. Review current decision contracts and quality evidence before a focused port. |
| `codex/jev-wait-analysis` | `f7335e0` feat(analysis): preserve Jev experiment analysis and tests; `645bcf9` feat(analysis): prepare blinded human adjudication workflow; `e8952da` docs(jev): analyze recorded waits and plan broader evaluation | Select offline analysis/extraction helpers useful to #98/#101/#102; review source provenance and tests. Preserve live-run scripts without executing them. |
| `codex/readme-project-story` | `e8182c1` docs(readme): introduce project story and generated city artwork | Review artwork/provenance and reusable prose against the Manyworld README; port only wanted content without restoring old branding. |

## Integration evidence for old branches

- Ancestry proves the straightforward merged rows. In particular, `simcity` at `669dc37` is now an ancestor of main; the September 11 plan's unmerged assessment is historical.
- [PR #43](https://github.com/alinojoumi8/manyworld/pull/43) head `15ca924` has exactly the same tree as merged commit `0904063`, which is on main. The backup, reconciliation-main and recovery-port tips are ancestors of that reviewed head. The local security line's other 25 patches are within #43 and `ce3001d` itself is patch-equivalent to main.
- [PR #53](https://github.com/alinojoumi8/manyworld/pull/53) head `d5533d7` has exactly the same tree as merged commit `983669b` on main. Its seven apparent unique documentation commits do not need another merge.
- `codex/archive-readme-20260917`, `codex/live-dual-paid-20260807`, `codex/scale-170-live-20260808` and the committed `codex/scale-validation-receipts-20260810` have no unmatched non-merge patches against main. The scale worktree remains protected because it is dirty.
- The [recovery port ledger](../reconciliation/2026-08-05-recovery-port-ledger.md) records a disposition for all 26 `codex/reconcile-release` source commits. Its reviewed port is included through #43; never merge the stale source wholesale.
- `codex/archive-stash-progress` has a stash-shaped history: the tip diff is empty, but index/untracked parent objects remain valuable recovery evidence.
- The original native Hermes UI commit `0cc46ad` is in #84 and the staging stack. Callback commit `42f89b8` is patch-equivalent in #88. That line resolves through those existing PRs, not an eleventh duplicate integration PR.

## Stash and pull request snapshots

- `stash@{0} 0aa046851173d872c3ec9cd057e00c9f4ebadefa On codex/editorial-wordmark: preserve editorial-wordmark work before Manyworld sync 2026-10-04`

Preserve the 105 local `pr/*` refs and fetched `origin/pr/*` refs as review snapshots until a separate cleanup decision. They are not 105 product branches to merge. `codex/editorial-wordmark` has a merged tip, but the stash above preserves additional work not represented by that tip.

## Cleanup gate

After the accepted changes are integrated, refresh this register. Propose exact local refs, remote refs and worktrees eligible for cleanup, with reviewed patch/ancestry evidence and recovery locations. Obtain the required explicit deletion authorization, recheck dirty/ignored artifacts and worktree ownership, and use ordinary deletion only where its checks pass. This plan authorizes no force push, deletion, reset, database cleanup or worktree removal.

## Audit artifacts

The ignored `reports/out/branch-plan-20261005/` directory contains `branch-inventory.json`, `pull-requests.json`, `issues.json`, `historical-integration-evidence.json`, and `prior-candidate-test-summary.json`. Product branches were assessed from local refs and live GitHub metadata; untracked or ignored runtime contents were not uploaded to Pages or GitHub.
