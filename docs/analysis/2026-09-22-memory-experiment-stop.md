# Frozen memory experiment continuation — stopped 2026-09-22 UTC

The authorized remaining-300 execution stopped automatically at its first transport error. It was not retried or restarted. No live world, production behavior, prior reviews, inputs, pilot records or scoring protocol changed.

Verified the 372-slot original schedule and all input/recording manifests. Removed only the 72 pilot slots, yielding 300 unique unconsumed slots over 50 cases. The remaining subsequence was frozen before execution with SHA256 a11c373c08704c43dffc930e2ec1ede89c68c1abf3e4dc818367c45ffe519798. Every original A/B pair differed only by the frozen memory deletion. Original adapter/model/schema/settings unchanged. Local conservative reserve $0.01 before each call, total experiment ceiling $0.25 including pilot; no live-run budget database access.

## Stop boundary

- 54 new valid completed calls; all resolved to typesafe/jev-1.13-20260917.
- New attempt 55 timed out after 20 seconds; no response ID, output, tokens or cost available.
- 245 new scheduled calls never attempted.
- Original 72 pilot calls preserved: combined 126 valid results, 127 attempted requests.
- Zero retries, zero invalid completed outputs. One unknown local accounting reservation.

Ambiguous slot: full schedule index 79, C-35e1e4a458119b22, arm A, repeat 1, reservation full-055.
Dispatch 2026-09-22T02:09:29.727859+00:00; timeout receipt 2026-09-22T02:09:49.801768+00:00.
Exact error: `provider request to https://openrouter.ai/api/alpha/decisions timed out after 20.0s` (AdapterTimeoutError).

This proves a client-observed timeout, not whether the provider executed/billed the request, nor the underlying cause. Do not treat its usage as zero or replay the slot automatically.

Known new cost $0.011348568; known total including pilot $0.029705004. Failed request cost remains unknown. New completed-call input tokens 270,204, output tokens 31,692. No full efficacy or guardrail conclusion is warranted on incomplete data; no selective case exclusion/imputation performed.

## Preservation and next action

1,798 protected files hash-identical after stop. Compilation/diff checks passed. Main unchanged at f22a051b9a591cdebe238b483db094ec05da08e8; analysis HEAD remains 645bcf95b254e935b02387a8ccc9fb750f300004. New standalone scripts and report are additive/uncommitted. No host policy rejection occurred.

Next: reconcile this timestamp/slot against provider activity records without invoking a model. Preserve the timeout as ambiguous unless an authoritative response/accounting record can be recovered. A new explicit continuation decision is needed before any more calls; do not silently retry, increase timeout, replace the missing result or change the frozen schedule. The full-results analysis script intentionally refuses to analyze an incomplete run.

Evidence: C:/tmp/ae-jev-wait-analysis/reports/out/jev-memory-full-20260922/stop-report.json, execution/055-started.json, execution/055-result.json, preservation-after-stop.json and evidence-sha256.json. All 54 valid responses remain recorded separately from the historical pilot.
