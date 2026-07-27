# Live Connector, Cognition, and Deployment Evidence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make release evidence machine-verifiable, capture all locally available live receipts, and leave only externally unavailable connector/deployment gates explicitly unchecked.

**Architecture:** Existing provider and hosted tooling remains authoritative. A small receipt-manifest tool records immutable run facts, sanitized command outcomes, artifact digests, and evidence mode. It cannot turn mocks into live proof; release documentation reads its manifest only after the named verification commands succeed.

**Tech Stack:** Python 3.12, JSON/Markdown, existing `scripts/live_cognition_probe.py`, generic Python/TypeScript clients, Hermes/OpenClaw runbooks, hosted Compose/Caddy/HTTPS tooling.

## Global Constraints

- Never echo, commit, serialize, or store API keys, tokens, cookies, OAuth codes, raw Authorization headers, or private request/response bodies.
- A mocked client, a local unit test, or a partial `--allow-missing` cognition probe cannot satisfy a live connector/deployment gate.
- Each receipt identifies commit SHA, UTC timestamp, verifier command, configuration digest, result, and SHA-256 artifact digests.
- Mark a checklist item complete only after fresh evidence exists; keep unavailable credential/host requirements visible.
- Use the real provider and connector boundary, not synthetic-only validation, where credentials and authorization permit.

---

### Task 1: Add a sanitized, verifiable release receipt manifest

**Files:**

- Create: `release_evidence.py`
- Create: `scripts/collect_release_evidence.py`
- Create: `tests/test_release_evidence.py`
- Modify: `docs/world-os/EXTERNAL-AGENT-ACCEPTANCE.md` only to link the manifest format, not to mark gates complete.

**Interfaces:**

- Produces `build_manifest(records, commit, generated_at) -> dict`, `verify_manifest(path) -> dict`, and a CLI that accepts declared artifact paths.
- A record contains `gate`, `mode`, `command`, `exit_code`, `artifact_sha256`, `passed`, and sanitized `notes`.

- [ ] **Step 1: Write failing manifest tests**

```python
def test_manifest_rejects_a_live_gate_without_a_successful_artifact(tmp_path):
    manifest = build_manifest(
        commit="a" * 40,
        generated_at="2026-07-27T00:00:00+00:00",
        records=[{"gate": "hermes_three_wakes", "mode": "live", "command": "hermes mcp test agent_economy",
                  "exit_code": 0, "passed": True, "artifact_path": str(tmp_path / "missing.json")}],
    )
    assert manifest["passed"] is False
    assert manifest["records"][0]["error"] == "missing_artifact"

def test_manifest_redacts_sensitive_values_from_notes(tmp_path):
    artifact = tmp_path / "receipt.json"
    artifact.write_text('{"ok": true}', encoding="utf-8")
    manifest = build_manifest(
        commit="b" * 40, generated_at="2026-07-27T00:00:00+00:00",
        records=[{"gate": "cognition", "mode": "live",
                  "command": "python scripts/live_cognition_probe.py", "exit_code": 0,
                  "passed": True, "artifact_path": str(artifact),
                  "notes": "Bearer secret-value"}],
    )
    assert "secret-value" not in json.dumps(manifest)
```

- [ ] **Step 2: Run RED**

Run: `../../.venv/bin/python -m pytest -q tests/test_release_evidence.py`

Expected: import failure because no manifest module exists.

- [ ] **Step 3: Implement strict artifact manifesting**

Hash artifacts after reading them from explicit paths. Reject unsupported modes,
missing artifacts, failed commands, malformed commit SHA, duplicate gate names,
and any string matching credential-shaped patterns. The tool may report
`not_run` or `blocked` but never converts either into `passed`.

- [ ] **Step 4: Run GREEN**

Run: `../../.venv/bin/python -m pytest -q tests/test_release_evidence.py`

Expected: strict acceptance and redaction cases pass.

- [ ] **Step 5: Commit**

Run: `git add release_evidence.py scripts/collect_release_evidence.py tests/test_release_evidence.py docs/world-os/EXTERNAL-AGENT-ACCEPTANCE.md`

Run: `git commit -m "feat: record verified release evidence"`

### Task 2: Capture live cognition and stored-response replay proof

**Files:**

- Create outside Git: probe, cognition-acceptance, and manifest JSON files in `reports/out/`, named with the run ID printed by the live world command.
- Modify: `docs/live-provider-validation.md` only after a fresh successful receipt.

**Interfaces:**

- Consumes credentials from ignored `env` or process environment and the configured real provider profile.
- Produces a full-scope probe receipt, a live run ID, and exact replay evidence.

- [ ] **Step 1: Verify live configuration without exposing credentials**

Run: `set -a; . ./env; set +a; ../../.venv/bin/python run.py --config runs/production.yaml --preflight-live`

Expected: provider names/models are reported as ready and no key value appears.

- [ ] **Step 2: Run a real-provider probe and verify the receipt**

Run: `set -a; . ./env; set +a; ../../.venv/bin/python scripts/live_cognition_probe.py --config runs/production.yaml --output reports/out/cognition-probe.json`

Expected: `passed: true`, full scope, real provider calls, concurrency/fallback checks, and no sensitive fields.

- [ ] **Step 3: Run a bounded live world and exact replay**

After the live world command prints its new run ID, assign that exact value to
the shell variable `LIVE_RUN_ID` before the replay and cognition-acceptance commands.

Run: `set -a; . ./env; set +a; ../../.venv/bin/python run.py --config runs/production.yaml --ticks 10 --approve-live-inference`

Run: `../../.venv/bin/python run.py --replay "$LIVE_RUN_ID"`

Expected: persisted provider receipts exist and replay reports no differences.

- [ ] **Step 4: Generate cognition acceptance and manifest entry**

Run: `../../.venv/bin/python -m reports.cognition_acceptance "$LIVE_RUN_ID" --probe reports/out/cognition-probe.json --output "reports/out/$LIVE_RUN_ID-cognition-acceptance.json"`

Run: `../../.venv/bin/python scripts/collect_release_evidence.py --record "cognition=live:reports/out/$LIVE_RUN_ID-cognition-acceptance.json" --output reports/out/release-evidence.json`

Expected: the manifest hashes a passing live receipt. If a provider is unavailable,
record a blocked/partial entry and do not edit a checklist to complete.

### Task 3: Obtain external-agent connector receipts at the real boundary

**Files:**

- Create outside Git: independent MCP, Hermes, OpenClaw, generic Python, and generic TypeScript receipt files.
- Modify: `docs/world-os/EXTERNAL-AGENT-ACCEPTANCE.md` only for gates with concrete passing receipts.

**Interfaces:**

- Consumes a named HTTPS hosted test tenant, OAuth client/redirect configuration, and client-specific credentials.
- Produces a receipt with discovery/protected-resource behavior, connection identity, wake/turn IDs, action receipts, and verifier result.

- [ ] **Step 1: Run independent MCP conformance**

Use a client outside this repository against the hosted `/.well-known` discovery and
protected-resource endpoints. Save its sanitized report; do not use the project’s
own client as the verifier.

- [ ] **Step 2: Run Hermes three-wake flow**

Use `integrations/hermes/mcp-config.yaml` with ephemeral credentials, execute three
separate wakes, make each read a completed action receipt, and save the hosted
tenant result. A local dry run is recorded as local-only, not live.

- [ ] **Step 3: Run OpenClaw OAuth Streamable HTTP flow**

Follow `integrations/openclaw/README.md` against the same hosted tenant, complete
OAuth, run its probe, invoke a permitted tool, and save the receipt.

- [ ] **Step 4: Run generic Python and TypeScript flows**

Install/use the checked-in thin clients against the hosted HTTPS endpoint, then
record authenticated identity, turn long-poll, action submission, and receipt
readback. Confirm each client cannot observe another tenant’s run.

- [ ] **Step 5: Add only successful records to manifest and checklist**

Run: `../../.venv/bin/python scripts/collect_release_evidence.py --record mcp=live:reports/out/mcp-conformance.json --record hermes=live:reports/out/hermes-three-wakes.json --record openclaw=live:reports/out/openclaw-streamable-http.json --record python=live:reports/out/python-client.json --record typescript=live:reports/out/typescript-client.json --output reports/out/release-evidence.json`

Expected: every claimed checked row maps to a separately hashed artifact.

### Task 4: Validate an authorized HTTPS deployment

**Files:**

- Create outside Git: deployment health/auth/isolation receipt and final manifest.
- Modify: `TASKS.md` and `docs/implementation-status.md` only after the named public target passes.

**Interfaces:**

- Consumes a user-authorized public base URL, tenant fixture identities, and deployment credentials.
- Produces `/health/live`, `/health/ready`, auth, cross-tenant denial, and load/isolation receipts.

- [ ] **Step 1: Confirm the deployment target is HTTPS and reachable**

Run: `../../.venv/bin/python -m hosted.load_test --base-url "$AGENT_ECONOMY_PUBLIC_BASE_URL" --help`

Expected: target is explicit; do not substitute loopback for a public deployment claim.

- [ ] **Step 2: Run hosted health/auth/isolation validation**

Run the existing hosted migration, Compose smoke, backup/restore verification, and
`hosted.load_test` with distinct tenant credentials. Capture sanitized results.

- [ ] **Step 3: Run final provenance/dependency/license/secret audit**

Run the repository’s documented audit commands on the exact deployed commit and
save all exit codes and output digests. Secret scanning output must not retain
matched secret material.

- [ ] **Step 4: Add deployment record and update final status only on success**

Run: `../../.venv/bin/python scripts/collect_release_evidence.py --record deployment=live:reports/out/deployment.json --output reports/out/release-evidence.json`

Expected: a passing manifest entry plus a real public URL/UTC verification time.
If no target or authorization exists, leave this gate unchecked and report the
specific missing authority.
