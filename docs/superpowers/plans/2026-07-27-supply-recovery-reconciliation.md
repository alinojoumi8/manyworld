# Sustainable Supply Recovery and Reconciliation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the relevant local recovery behavior onto current main and deliver an opt-in, economically viable 1,000-tick recovery profile with bounded checkpoint storage and a reproducible acceptance receipt.

**Architecture:** A pure `world.recovery` module calculates wage, cash, and demand limits from real firm inputs. Genesis, prompt construction, scripted decisions, and the world loop consume its opt-in results while feature-off configurations retain existing behavior. A persisted report evaluates run facts rather than trusting runtime logs.

**Tech Stack:** Python 3.12, SQLite, PyYAML, pytest, and the existing run/replay infrastructure.

## Global Constraints

- Base every source change on `7785a858285f84391b4b872b200e9c70a13ab0a5`; do not modify the original dirty checkout.
- Preserve historical Semantics-7 through Semantics-12 replay when `supply_recovery.enabled` is absent or false.
- Recovery must not post a recapitalization, bailout, subsidy, or unrecorded wage-rewrite ledger entry.
- The acceptance profile uses `gross_margin_coverage_bps: 12500`, `cash_payroll_coverage_periods: 2`, `max_hires_per_firm_per_period: 1`, `demand_buffer_ticks: 5`, `checkpoint_every: 100`, and `checkpoint_keep_last: 2`.
- Write each behavioral test first, observe its intended failure, then implement the smallest passing code.
- Keep persisted run data, credentials, generated static files, and reports out of Git.

---

### Task 1: Add pure recovery economics and profile validation

**Files:**

- Create: `world/recovery.py`
- Create: `tests/test_supply_recovery.py`

**Interfaces:**

- Produces: `RecoveryAssessment`, `recovery_settings(config)`, `assess_recovery`, and `validate_recovery_settings(config)`.
- Consumes: mappings and integer cents/ticks only; it must not import `Store`, `World`, or an action executor.

- [ ] **Step 1: Write the failing economics tests**

```python
from world.recovery import assess_recovery, validate_recovery_settings

def test_assessment_rejects_wage_above_gross_margin_ceiling():
    assessment = assess_recovery(
        enabled=True, price_cents=500, input_cost_cents=180,
        output_per_worker=6, pay_interval_ticks=30, wage_cents=250_000,
        cash_cents=1_000_000, current_payroll_cents=0, current_headcount=0,
        target_headcount=3, recent_sales_units=180,
        settings={"gross_margin_coverage_bps": 12_500,
                  "cash_payroll_coverage_periods": 2,
                  "max_hires_per_firm_per_period": 1,
                  "demand_buffer_ticks": 5},
    )
    assert assessment.safe_wage_ceiling_cents == 46_080
    assert assessment.allowed_new_hires == 0
    assert assessment.reason == "wage_exceeds_margin_ceiling"

def test_profile_validation_rejects_insufficient_margin_coverage():
    with pytest.raises(ValueError, match="gross_margin_coverage_bps"):
        validate_recovery_settings({"supply_recovery": {
            "enabled": True, "wage_floor_cents": 50_000,
            "gross_margin_coverage_bps": 9_999,
            "cash_payroll_coverage_periods": 2,
            "max_hires_per_firm_per_period": 1,
            "demand_buffer_ticks": 5,
        }})

def test_profile_validation_defers_wage_floor_to_firm_assessment():
    settings = validate_recovery_settings({"supply_recovery": {
        "enabled": True, "wage_floor_cents": 50_000,
        "gross_margin_coverage_bps": 12_500,
        "cash_payroll_coverage_periods": 2,
        "max_hires_per_firm_per_period": 1,
        "demand_buffer_ticks": 5,
    }})
    assert settings["wage_floor_cents"] == 50_000
```

- [ ] **Step 2: Run the test to verify RED**

Run: `../../.venv/bin/python -m pytest -q tests/test_supply_recovery.py`

Expected: import failure because `world.recovery` does not exist.

- [ ] **Step 3: Implement the pure assessment**

```python
@dataclass(frozen=True)
class RecoveryAssessment:
    unit_margin_cents: int
    gross_margin_per_worker_period_cents: int
    safe_wage_ceiling_cents: int
    demand_limited_headcount: int
    cash_limited_headcount: int
    allowed_new_hires: int
    reason: str

def assess_recovery(*, enabled: bool, price_cents: int, input_cost_cents: int,
                    output_per_worker: int, pay_interval_ticks: int,
                    wage_cents: int, cash_cents: int,
                    current_payroll_cents: int, current_headcount: int,
                    target_headcount: int, recent_sales_units: int,
                    settings: Mapping[str, int]) -> RecoveryAssessment:
    normalized = _normalized_settings(settings)
    margin = max(0, price_cents - input_cost_cents)
    period_margin = margin * max(0, output_per_worker) * max(1, pay_interval_ticks)
    ceiling = period_margin * 10_000 // normalized["gross_margin_coverage_bps"]
    demand_cap = max(1, (max(0, recent_sales_units) + (
        normalized["demand_buffer_ticks"] * max(0, output_per_worker))
    ) // max(1, output_per_worker))
    cash_cap = max(0, (max(0, cash_cents) - max(0, current_payroll_cents)) // (
        max(1, wage_cents) * normalized["cash_payroll_coverage_periods"]
    ))
    allowed = min(normalized["max_hires_per_firm_per_period"],
                  max(0, target_headcount - current_headcount),
                  max(0, demand_cap - current_headcount), cash_cap)
    return _assessment(enabled, margin, period_margin, ceiling, demand_cap, cash_cap,
                       allowed, wage_cents)
```

Use integer arithmetic. Compute the ceiling as gross margin per worker period
times 10,000 divided by `gross_margin_coverage_bps`. Validate only structural
profile settings here: a wage floor is assessed later against each firm's actual
unit economics, rather than against a fabricated global reference product.
Limit demand by observed sales plus the configured output buffer, cash by two
full payroll periods, and new jobs by the one-hire limit. Return stable reason
strings for zero-hire paths.

- [ ] **Step 4: Run focused tests to verify GREEN**

Run: `../../.venv/bin/python -m pytest -q tests/test_supply_recovery.py`

Expected: all tests pass, including feature-off and one-hire-per-period cases.

- [ ] **Step 5: Commit**

```bash
git add world/recovery.py tests/test_supply_recovery.py
git commit -m "feat: add sustainable recovery economics"
```

### Task 2: Apply recovery economics to genesis, context, and decisions

**Files:**

- Modify: `world/genesis.py:317-344`
- Modify: `agents/prompts.py:_firm_view`
- Modify: `agents/policies.py:citizen_decision` and `agents/policies.py:founder_decision`
- Modify: `agents/runtime.py` only if a deterministic recovery action overlay is required
- Modify: `tests/test_supply_recovery.py`
- Modify: `tests/test_prd_completion.py` for feature-off regression coverage

**Interfaces:**

- Consumes: `RecoveryAssessment` from Task 1.
- Produces: a recovery firm view with assessment fields, an opt-in viable wage floor, capacity-weighted goods selection, and application-load-aware job selection.

- [ ] **Step 1: Write failing integration tests**

```python
def test_recovery_genesis_wage_is_below_actual_margin_ceiling(economy):
    economy.config["supply_recovery"] = recovery_profile(wage_floor_cents=15_000)
    Genesis(economy).run()
    rows = economy.store.query("SELECT wage_cents FROM employments ORDER BY id")
    assert rows and all(int(row["wage_cents"]) <= 15_000 for row in rows)

def test_recovery_founder_does_not_post_unaffordable_or_demandless_job():
    decision = founder_decision(recovery_context(cash=20_000, recent_sales=0))
    assert not any(action["type"] == "post_job" for action in decision["actions"])

def test_feature_off_shopping_keeps_legacy_cheapest_firm_selection():
    assert _select_stocked_firm(legacy_context(), random.Random(7))["firm_id"] == 2
```

- [ ] **Step 2: Run the tests to verify RED**

Run: `../../.venv/bin/python -m pytest -q tests/test_supply_recovery.py tests/test_prd_completion.py`

Expected: recovery assertions fail while the feature-off assertion describes current behavior.

- [ ] **Step 3: Implement the gated integration**

Add a recovery initial-wage path in `Genesis._staff_firm`, leaving the legacy
`max(250_000, price * 400)` path untouched when disabled. In `_firm_view`, pass
actual product margin/output, payroll, cash, headcount, and recent sales to
`assess_recovery`. In `founder_decision`, post, offer, or accept only when
`allowed_new_hires > 0`; use the assessment ceiling bounded by the configured
15,000-cent recovery floor. In `citizen_decision`, use weighted stock selection
and inverse application-count weighting only when the recovery flag is present.

- [ ] **Step 4: Run focused regression tests to verify GREEN**

Run: `../../.venv/bin/python -m pytest -q tests/test_supply_recovery.py tests/test_prd_completion.py tests/test_spec_completion_properties.py`

Expected: recovery tests and historical feature-off property tests pass.

- [ ] **Step 5: Commit**

```bash
git add world/genesis.py agents/prompts.py agents/policies.py agents/runtime.py tests/test_supply_recovery.py tests/test_prd_completion.py
git commit -m "feat: gate supply and workforce recovery by viable economics"
```

### Task 3: Bound checkpoint retention without touching historical runs

**Files:**

- Modify: `world/loop.py:checkpoint`
- Create: `tests/test_checkpoint_retention.py`

**Interfaces:**

- Produces: `World._prune_checkpoints(run_id, keep_last)` invoked after a successful new checkpoint.
- Consumes: `checkpoint_keep_last` from the active configuration.

- [ ] **Step 1: Write failing retention tests**

```python
def test_retention_keeps_two_newest_checkpoints_for_only_this_run(world, tmp_path):
    world.config.update({"checkpoint_dir": str(tmp_path), "checkpoint_keep_last": 2})
    for tick in (100, 200, 300):
        assert world.checkpoint(tick)
    rows = world.store.query("SELECT tick,path FROM checkpoints ORDER BY tick")
    assert [int(row["tick"]) for row in rows] == [200, 300]
    assert not (tmp_path / f"{world.gateway.run_id}_t100.db").exists()

def test_retention_is_disabled_when_setting_is_absent(world, tmp_path):
    world.config.update({"checkpoint_dir": str(tmp_path)})
    for tick in (100, 200, 300):
        assert world.checkpoint(tick)
    rows = world.store.query("SELECT tick FROM checkpoints ORDER BY tick")
    assert [int(row["tick"]) for row in rows] == [100, 200, 300]
```

- [ ] **Step 2: Run the test to verify RED**

Run: `../../.venv/bin/python -m pytest -q tests/test_checkpoint_retention.py`

Expected: the first test fails because all three checkpoints remain.

- [ ] **Step 3: Implement pruning after durable checkpoint creation**

Delete only manifest/database sidecars whose rows belong to the current run and
are older than the newest `keep_last` rows. Remove the SQLite row only after
artifact deletion succeeds. A missing stale artifact may still remove its row.
A deletion failure logs `checkpoint_prune_failed` and leaves its row intact.

- [ ] **Step 4: Run the test to verify GREEN**

Run: `../../.venv/bin/python -m pytest -q tests/test_checkpoint_retention.py tests/test_compatibility_guards.py`

Expected: retention works and historical checkpoint compatibility remains intact.

- [ ] **Step 5: Commit**

```bash
git add world/loop.py tests/test_checkpoint_retention.py
git commit -m "feat: retain bounded recovery checkpoints"
```

### Task 4: Add the acceptance profile and persisted recovery receipt

**Files:**

- Create: `runs/acceptance/supply-recovery.yaml`
- Create: `reports/supply_recovery.py`
- Modify: `run.py`
- Create: `tests/test_supply_recovery_report.py`
- Modify: `docs/test-cases.md`

**Interfaces:**

- Produces: `evaluate_supply_recovery(store) -> dict` and `python run.py --supply-recovery-report RUN_ID`.
- Consumes: persisted events, metrics, checkpoints, ledger, and run metadata; it must not derive outcomes from config alone.

- [ ] **Step 1: Write failing report tests**

```python
def test_report_rejects_post_warmup_unemployment_rebound(store):
    seed_recovery_metrics(store, unemployment=[0.42] * 60 + [0.55] * 60)
    report = evaluate_supply_recovery(store)
    assert report["passed"] is False
    assert report["checks"]["unemployment_rebound_within_10pp"] is False

def test_report_requires_bounded_checkpoint_rows_and_reconciled_ledger(store):
    seed_healthy_recovery_run(store)
    report = evaluate_supply_recovery(store)
    assert report["checks"]["checkpoint_retention"] is True
    assert report["checks"]["ledger_reconciled"] is True
```

- [ ] **Step 2: Run the test to verify RED**

Run: `../../.venv/bin/python -m pytest -q tests/test_supply_recovery_report.py`

Expected: import failure because the report module and CLI option do not exist.

- [ ] **Step 3: Implement the profile and report**

Set the exact global constraint values in the YAML profile and choose the
provider-free route for mechanical acceptance. The report returns a JSON-safe
mapping with explicit checks for 60-tick purchase rejection, unemployment
rebound, recovery-managed insolvency, queue growth, ledger balance, SQLite
integrity, and checkpoint retention. The CLI prints JSON and writes Markdown
only when an explicit output path is supplied.

- [ ] **Step 4: Run report tests to verify GREEN**

Run: `../../.venv/bin/python -m pytest -q tests/test_supply_recovery.py tests/test_supply_recovery_report.py tests/test_checkpoint_retention.py`

Expected: all recovery contracts pass without a network provider.

- [ ] **Step 5: Commit**

```bash
git add runs/acceptance/supply-recovery.yaml reports/supply_recovery.py run.py tests/test_supply_recovery_report.py docs/test-cases.md
git commit -m "feat: add supply recovery acceptance receipt"
```

### Task 5: Port selected local recovery behavior and execute the long-horizon gate

**Files:**

- Modify only source files named by Tasks 1–4 when an equivalent local recovery behavior is still absent.
- Create outside Git: a new database in `data/runs/` and JSON/Markdown reports in `reports/out/`, each named with the run ID printed by the acceptance command.

**Interfaces:**

- Consumes: the acceptance profile, recovery report, and `world/replay_verify.py`.
- Produces: a 1,000-tick run ID, report paths, and exact-replay result.

- [ ] **Step 1: Write one failing integration assertion before any selected port**

```python
def test_local_recovery_port_does_not_change_feature_off_semantics(golden_run):
    assert replay_exactly(golden_run) is True
```

- [ ] **Step 2: Run it to verify RED only when selected behavior is missing**

Run: `../../.venv/bin/python -m pytest -q tests/test_supply_recovery.py -k feature_off`

Expected: a missing local behavior has a focused failure; do not port unrelated dirty edits.

- [ ] **Step 3: Port the smallest missing behavior and rerun its tests**

Use the rescue patch only as evidence. Manually reapply the smallest coherent
recovery change onto current code; do not apply generated assets, `env`,
database files, or unrelated legal/bank/dashboard changes.

- [ ] **Step 4: Run durable acceptance**

After the first command prints its newly created run ID, assign that exact value
to the shell variable `RUN_ID` before running the report and replay commands.

```bash
../../.venv/bin/python run.py --config runs/acceptance/supply-recovery.yaml --ticks 1000
../../.venv/bin/python run.py --supply-recovery-report "$RUN_ID" --output "reports/out/$RUN_ID-supply-recovery"
../../.venv/bin/python run.py --replay "$RUN_ID"
```

Expected: the run reaches tick 1000, every report check is true, and replay has no difference.

- [ ] **Step 5: Commit source/tests only**

```bash
git add world/recovery.py world/genesis.py world/loop.py agents/prompts.py agents/policies.py agents/runtime.py reports/supply_recovery.py run.py runs/acceptance/supply-recovery.yaml tests/test_supply_recovery.py tests/test_checkpoint_retention.py tests/test_supply_recovery_report.py docs/test-cases.md
git commit -m "fix: complete sustainable supply recovery"
```
