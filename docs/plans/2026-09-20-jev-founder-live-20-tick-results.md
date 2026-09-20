# Twenty-tick live founder pricing evaluation

## Decision

Do not enable the current founder-pricing pilot as the default. Retain the
implementation as an experiment while revising its candidate-price policy.
JEV's live integration passed, but the bounded policy sold materially less than
the original scripted founder policy in this small world.

This supersedes the earlier expectation that integration tests alone would be
sufficient to recommend adoption. It does not establish that JEV is intrinsically
worse at pricing: both bounded variants restricted the available actions.

## Design and provenance

- Evaluated commit: `b4e8c030c598e1a7ee3e647aa9962a7358f65253` on
  `codex/jev-founder-pricing`.
- One paired seed (`1`), twenty ticks per arm, three firms, identical scripted
  background cognition. The predeclared arms were `jev-founder-offline.yaml`
  (deterministic selection from the same menu) and `jev-founder-live.yaml`.
- User explicitly authorized fictional simulation observations to OpenRouter,
  capped at US$1 and 100 calls. Actual model: `typesafe/jev-1.13-20260917`.
- The prepared study manifest hash is
  `88b8528396f5a9d49a6e6c83af9b985e61e444c6005fad97b22aca75d53c744f`.
- After the paired result, a separately identified, provider-free diagnostic
  removed `llm.decision_policy` and ran the original founder policy for twenty
  ticks with the same seed and remaining settings. This third comparison is
  post-hoc, not an additional predeclared study arm.
- No Hermes agents or prepared live-world processes were launched.

## Observations

Revenue and operating figures below are **simulated USD**, not real earnings.
Provider cost is real USD and must not be treated as directly comparable profit.

| Measurement, ticks 1-20 | Bounded rule baseline | Live JEV | Original scripted policy |
|---|---:|---:|---:|
| Goods units sold | 459 | 459 | 607 |
| Goods sales transactions | 65 | 65 | 81 |
| Goods revenue | $1,155.84 | $1,176.00 | $1,475.20 |
| Production inputs paid | $1,887.40 | $1,887.40 | $1,887.40 |
| Revenue less production cash expenditure | -$731.56 | -$711.40 | -$412.20 |
| Final inventory, units | 767 | 767 | 619 |
| Firm bankruptcies | 0 | 0 | 0 |
| Live model calls | 0 | 19 | 0 |
| Real recorded model cost | $0 | $0.000597996 | $0 |
| Exact replay | Passed | Passed | Passed |

The cash-expenditure row is not accounting profit: it excludes wages, financing,
other expenses and unsold inventory valuation. All nine employments had their
first scheduled payday at tick 30, beyond this test.

JEV improved cumulative revenue by $20.16 (1.74%) against the same-menu rule.
It held seventeen times and raised one retailer's price twice: 322 to 338 cents
at tick 3, then 338 to 354 cents at tick 5. All nineteen selected decisions were
accepted. The bounded baseline held on all nineteen decisions.

Against the original scripted policy, JEV sold 148 fewer units (-24.38%) and
produced $299.20 less goods revenue (-20.28%). Production expenditure was equal.
The original policy sold the extra 148 units from the manufacturing firm;
the two bounded arms sold only the retailer's goods. The retailer gained from
JEV's two increases, but customers paid more for the same volume: this is not
evidence of higher total output or improved consumer welfare.

The predeclared tick-20 macro indicators were identical between bounded arms.
They are snapshots/one-tick flows, so they miss the earlier cumulative revenue
difference. The report therefore also reads complete tick-1-through-20 goods
sales and firm ledger entries. No missing sentiment metric was filled with zero.

## Mechanism and limits

None of the nineteen live menus offered a price cut. All selected firms were
below the compiler's wage-inclusive full-utilization floor, which allowed only
holding or increasing prices. The original policy could discount inventory.
This restriction is a likely contributor to the lost manufacturing sales;
the post-hoc comparison does not isolate every effect of changing the policy.

Do not solve this by asking JEV to choose better among the same incomplete menu.
Review which pricing constraints express a hard execution rule versus a soft
business objective. A follow-up version could expose bounded discounts with
explicit cost, cash-runway and inventory trade-offs, then compare that revised
menu with the original and deterministic equal-menu policies. Do not change
this tested version or silently relax its constraints in an existing run.

The result is one small seed and a short horizon. It does not establish sustained
profit, survival through payroll, behavior under other demand conditions, or
savings against Hermes/another live LLM. The comparison used scripted background
agents. Broader testing requires a separately declared study and live allowance.

## Reliability and cost

- Nineteen successful OpenRouter attempts; zero rate limits or fallback attempts.
- No rejected bounded JEV actions, unknown-usage calls, unresolved calls, or
  allowance breaches. The shared provider budget is sealed.
- Six out-of-stock rejections occurred on original-route founder household
  shopping turns in each bounded arm. They were not invalid JEV price actions.
- Median recorded JEV call latency: 321 ms; mean 372.05 ms; range 224-628 ms.
- Resolved model: `typesafe/jev-1.13-20260917`.
- Call-record cost sum: US$0.000597996. The conservative integer-nanodollar shared
  ledger records US$0.000597998; the two-nanodollar difference is rounding.
- Every source replayed exactly without provider dispatch and retained its
  original SHA-256. Ledger reconciliation passed.

The supplementary offline runner initially asserted that the gateway's dispatch
counter must be zero. That counter also counts scripted dispatches outside
replay. The already-completed source was inspected, confirming all 349 calls
were scripted and cost zero, then replayed without rerunning or paid inference.

## Retained evidence

Artifacts are local and ignored by Git under
`data/studies/jev-founder-live-20t-20260920/`: `manifest.json`,
`budget-contract.json`, `provider-budget.db`, `result.json`, `analysis.json`,
`preservation-before.json`, `preservation-result.json`, and the source/replay
subdirectories. No credentials were copied into this study.

| Arm | Source run ID | Source SHA-256 |
|---|---|---|
| Bounded rule | `1148ad577c` | `a3b7e3f9dc16c7330316b4e527a20661b6ced8cc618305481715eebc3ab3d0aa` |
| Live JEV | `6cd854a7b1` | `062df42c31c8375bfd4011dc50ea2258a56b47f87bfc9865a042f91febadb224` |
| Original policy, post-hoc | `274ec76b31` | `55ef1f0d5a939a1f19808ccd698b3b908f0a15d6944951a9768c744fe4e90e84` |

All 304 protected files were hash-checked before and after: the prepared world's
database, WAL, SHM, cohort manifest and all 300 Hermes profile files were unchanged.
Prepared run `9b08e45cca` remains at tick 0, paused, with no active tick.
