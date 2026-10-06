# Follow-up to the 100-Hermes test

The completed run `de5ccf8fb6` had 26 native agents and 100 Hermes arrivals.
All 100 day-3 Hermes actions executed successfully. One CLI exhausted its
iteration budget after submitting; the accepted action was not a failed wake.
The original run and its frozen replay source remain unchanged.

## Fixes

- Live City status uses the current run clock, matched by run ID, rather than
  the status of the last committed snapshot. Historical and fork views retain
  snapshot status; a missing or mismatched live clock is explicitly unavailable.
- Activity text and pending-marker initials have sufficient contrast.
- Atlas targets are at least 28 pixels, separated in screen space, and kept
  clear of map chrome. Canonical coordinates are unchanged. The evidence lens
  explains the display offsets. Dense layouts retain the keyboard explorer.
- Recorded-day controls reserve their space while data loads. Tablet controls
  use stable rows; mobile maps reserve enough height for separate targets.
- Hermes stops its owned process tree after both a durable queued receipt and
  a saved queued tool response in the exact wake's session. The next wake can
  resume that session. Rejected receipts or missing proof cannot end the wake
  successfully, and unrelated processes are never included in cleanup.

## Bank finding

At day 1, the bank had 1,046,697,865 cents in deposits, 33,707,565 cents in
reserves, and no loan assets. Its 10% reserve requirement produced a
70,962,221-cent shortfall. The recorded `lolr_denied` event names native central
banker 1 and model call 103. The bank then failed with a 0.0322 recovery rate.
This happened before Hermes wakes, so Hermes submissions did not cause it.

The small test's genesis reserve endowment did not scale with the deposit
inflow from 100 arrivals. This is a scenario calibration problem for a broad
functionality test, and a valid stress outcome under the configured rules.
Do not conceal it by disabling failure, relaxing the ledger, or rewriting the
run. Before another cohort, declare reserve capacity and job capacity for the
expected arrivals in a fresh, recorded scenario. Keep the original bank shock
as a separate stress case.

## Verification and remaining release coverage

Provider-free verification passed: 309 focused Python tests, 286 dashboard unit
tests, TypeScript checks, the Node 22 production build, and 42 World OS browser
tests. After strengthening saved-tool-response proof, all 57 Hermes operator
tests passed again, and six affected browser tests passed after the final mobile
layout change. Frozen recorded-replay golden tests are included in the
Python suite.

The production-bundle audit at widths 1440, 768, and 375 found no horizontal
overflow, browser errors, failed requests, or contrast violations. Target-size
checks passed both initially and with the map in view. Layout shift measured approximately
0.0092, 0.0011, and 0.00034 respectively; the previous tablet result was 0.225.
This is a fresh scripted world, not another paid or live-provider cohort.

The original test concentrated on job applications, with two training and two
insurance actions. A next live test should cover multiple days and a declared
mix of supported market, work, training, travel, and other enabled actions,
including rejection and retry cases. Confirm banking/job calibration offline
first. Broader feature coverage, screen-reader testing, and cloud CI remain
separate release gates; this patch alone does not certify shipping readiness.
