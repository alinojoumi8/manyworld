# Reconciliation, Sustainable Recovery, Workspace UI, and Release Evidence Design

## Purpose

Bring the local supply-recovery work forward to GitHub `main` at
`7785a858285f84391b4b872b200e9c70a13ab0a5`, complete a truthful long-horizon
recovery run, close the two documented browser gaps, and produce only
evidence that was actually obtained from a live provider, connector, or
deployment.

## Decisions

1. The original dirty checkout and its run data remain untouched. A source-only
   rescue patch and archive are retained outside the repository. All new work
   happens on `codex/reconcile-release`, rooted at current GitHub `main`.
2. Recovery is an opt-in, forward-only profile. It does not alter historical
   Semantics-7/12 replay and does not use bailouts, hidden subsidies, or
   unrecorded contract changes.
3. The recovery acceptance candidate is a fresh configured run, not a resumed
   copy of `999bb94c13`: that run has an interrupted mid-phase marker and
   already-issued wage contracts that are structurally unprofitable. It remains
   a diagnostic artifact. A tick-149 fork may be used for comparison only.
4. “Multi-investigator” means concurrent tabs for the same authorized operator.
   Cross-operator shared workspaces need membership/RLS design and are outside
   this change. A conflict must never silently overwrite another tab.
5. Browser export means the existing redacted investigation JSON and Markdown
   payload. It does not expose a filesystem path or the broader Parquet bundle.
6. Release receipts are never fabricated. Missing credentials, a hosted tenant,
   or a public deployment target stay visible as release blockers.

## A. Workspace reconciliation

The current checkout has unrelated edits, generated dashboard files, an ignored
`env`, Graphify output, and roughly 95 GB of run data. Reconciliation therefore
uses a selective port rather than a dirty rebase:

1. Preserve tracked changes as a binary patch and the four untracked source
   files as a small archive; exclude `data/`, `env`, `graphify-out/`, and built
   static assets.
2. Work in an ignored worktree based on the verified upstream commit.
3. Port only recovery behavior and its tests in coherent slices. Re-evaluate
   changes that overlap newer upstream semantics instead of applying the old
   patch wholesale.
4. Regenerate dashboard static files only after a successful dashboard build;
   never port stale generated assets.
5. Leave the original checkout available for comparison until the new branch
   passes reconciliation, recovery, UI, and release evidence gates.

## B. Sustainable supply and workforce recovery

### Root cause

At the observed recovery settings, a worker produces approximately six units
per tick at a 500-cent sale price and 180-cent input cost. That is about
1,920 cents of gross margin per tick, while the 250,000-cent wage per
30-tick period costs about 8,333 cents per tick. Recapitalization can delay
failure but cannot make that payroll sustainable. The later bankruptcies, not
purchase rejection, caused the unemployment rebound.

### Architecture

Add a small, pure recovery-economics module plus an opt-in configuration block:

```yaml
supply_recovery:
  enabled: true
  policy_version: supply-recovery-v1
  activation_tick: 0
  gross_margin_coverage_bps: 12500
  cash_payroll_coverage_periods: 2
  max_hires_per_firm_per_period: 1
  demand_buffer_ticks: 5
checkpoint_every: 100
checkpoint_keep_last: 2
```

For each goods-producing firm, the module derives a safe wage ceiling from
the actual unit margin, output per worker, pay interval, and required margin
coverage. The profile is invalid when its configured wage floor exceeds that
ceiling. It also computes the maximum workforce that can be carried with the
configured cash reserve. A founder may post, offer, or accept only jobs within
both limits. The calculation is recorded in a recovery event so acceptance
reports can show why a job was or was not created.

The recovery profile uses capacity-weighted shopper choice and
application-load-aware job choice to spread demand and applications across
available stock and vacancies. Those behaviors are gated by the same opt-in
profile. New recovery configuration chooses a wage/output/price combination
that satisfies the gate before the run begins; it does not inject money.

Checkpoint retention is forward-only and opt-in: after a successful checkpoint,
the loop retains the two newest checkpoint rows/files for that run. It never
deletes a checkpoint from a historical configuration that has no retention
setting. This prevents the tick-1 checkpoint policy from reproducing the
95 GB growth during the 1,000-tick acceptance run.

### Acceptance contract

The recovery run must use an explicit `runs/acceptance/supply-recovery.yaml`
profile and complete all 1,000 ticks. It must produce a sanitized JSON/Markdown
receipt containing:

- the validated unit-economics inputs and per-firm ceilings;
- rolling 60-tick purchase rejection at or below 5 percent after warm-up;
- no post-warm-up unemployment rebound larger than 10 percentage points over
  the preceding 60-tick trough;
- no recovery-managed goods firm bankruptcy caused by insufficient payroll
  coverage;
- drained job/application backlog rather than unbounded pending applications;
- ledger reconciliation, SQLite integrity, and exact stored-response replay;
- retained checkpoint count at or below the configured limit.

The test suite proves invalid economics are rejected before a run, safe hiring
does not exceed the calculated ceiling, feature-off profiles remain unchanged,
and pruning never reaches historical checkpoints.

## C. Investigation conflict resolution and browser export

### Conflict flow

The API already conditionally updates an investigation with `expected_version`
and returns HTTP 409. The browser will gain an editable title draft, a typed
workspace error that retains HTTP status and payload, and an explicit conflict
panel.

```text
tab draft + base version -> PATCH expected_version
                         -> 409 -> GET current record
                         -> show local draft and server title/version
                         -> Reload server OR Copy local draft to a new record
```

Reload replaces the draft with the fetched record. Copy creates a new
investigation with the local title/query/layout and leaves the server record
unchanged. The UI must not retry a stale write or merge fields automatically.

### Export flow

The existing authenticated investigation-export route remains authoritative.
The workspace adds an Export action which fetches it, renders the redaction
manifest, and creates two browser Blob downloads: `<id>.json` and `<id>.md`.
Failure is visible to the operator and no response is saved in browser storage.

Tests cover typed 409 propagation, a two-tab conflict resolution path, both
downloads, visible redaction information, and no private-body canary in the
download, DOM, URL, or browser storage.

## D. Release evidence

Release tooling will produce a versioned, sanitized receipt manifest with
command, UTC time, commit, configuration digest, result, and stable artifact
paths. It must distinguish local simulated evidence from live evidence.

The requested live gates are:

1. a real MiniMax/Kimi cognition receipt plus stored-response replay;
2. independent MCP OAuth/protected-resource conformance;
3. three Hermes wakes with executed receipts against a hosted test tenant;
4. an OpenClaw OAuth Streamable HTTP flow;
5. generic Python and TypeScript REST client receipts; and
6. a final authenticated HTTPS deployment health/auth/isolation receipt plus
   provenance, license, dependency, and secret scans.

The implementation can automate receipt collection and local hosted validation.
The actual connector and public deployment rows remain unchecked until a
reachable tenant, authorized credentials, and a named deployment target are
available.

## E. Review and verification

Terra-max performs implementation in isolated, test-first tasks. Each task has
a focused review. Sol-max performs the final whole-branch review and any
required re-review after fixes. Completion requires fresh test/build/runtime
evidence mapped to every requirement above, not a claim based on source edits.
