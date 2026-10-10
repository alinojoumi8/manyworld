# Security remediation handoff — Manyworld (`agent-economy`)

**Prepared:** 2026-10-07
**Repository state:** `f27005b` (clean working tree; branch includes `4cd7833`, `2ad2871`, `1b74845`)
**Scope:** the full-project security audit performed on 2026-10-07 (HTTP surface, simulation core, dashboard, deployment).
**Purpose:** audit and remediation record. The findings below preserve the original evidence and proposed fixes; the status table records the implemented disposition. Appendix A records earlier fixes.

**Integration review (2026-10-09):** fresh-container testing caught a PostgreSQL
startup regression with `cap_drop: ALL`. Both profiles now start directly as
`postgres`; a fresh pinned-image database initialized the application and
supervisor roles successfully. The pinned MinIO server/client were rebuilt and
bootstrap was exercised with URL-reserved characters in disposable credentials.
Navigation additionally rejects control characters that browser URL parsing
would strip, and run IDs require a full-string match. No historical run was
rewritten and no provider calls were made during these checks.
The artifact redactors preserve HTTP(S) report URLs while still removing
relative filesystem artifacts; regressions cover both public response paths.

> **Remediation record (2026-10-07):** every open finding below is fixed in the
> working tree. Regression coverage lives in
> [tests/test_run_id_containment.py](../tests/test_run_id_containment.py),
> [tests/test_hosted_deployment.py](../tests/test_hosted_deployment.py),
> [tests/test_prd_completion.py](../tests/test_prd_completion.py),
> [tests/test_review_server_core.py](../tests/test_review_server_core.py), and
> the dashboard `navigation`/`civic-city` unit tests. The section text below is
> kept as the as-built rationale; the D2 implementation pipes both credential
> pairs to `mc` instead of using `MC_HOST_local` so URL-reserved characters in
> a strong root password cannot corrupt the alias URL.

Line numbers are exact for `f27005b`. Re-read each cited span before editing — the audit found the tree moves fast here.

---

## 0. Rules this repository imposes on the fixing agent

From [AGENTS.md](../AGENTS.md) — violating these will fail review even if the vulnerability is fixed:

- **v1/v2 replay behaviour must remain exact.** Never rewrite a stored source run during replay. Run `tests/test_recorded_replay_golden.py`, `tests/test_replay_source_lifecycle.py`, `tests/test_bounded_replay.py` after anything touching replay, storage, or `engine/store.py`.
- **Run databases are scientific artifacts.** Prefer additive columns/tables; new semantics that change historical output must be gated by `engine_semantics_version`.
- **Economic mutation stays in `engine/` or deterministic `world/` mechanics**, and every monetary effect goes through the ledger. (None of the open items below touch money, but do not refactor across that boundary.)
- **Add success, rejection, replay, and reconciliation tests** for new behaviour — rejection tests are not optional here.
- Local mode (`run.py --serve`) is **intentionally unauthenticated**, bound to `127.0.0.1`. Do not "fix" that; only fix defects *within* that design (e.g. cross-origin browser reachability).
- After code changes, refresh the context graph with `graft build` (deterministic, no key).

**Baseline verification commands** (all must stay green):

```bash
python -m pytest -q tests/test_documentation.py tests/test_external_agent_gateway.py \
  tests/test_research_export.py tests/test_prd_completion.py tests/test_recorded_replay_golden.py
python -m pytest -q tests/test_request_limits.py tests/test_replay_source_schema.py \
  tests/test_hosted_app.py tests/test_hosted_catalog.py tests/test_hosted_migrations.py \
  tests/test_security_review.py tests/test_hosted_deployment.py
python -m pytest -q tests/test_replay_source_lifecycle.py tests/test_bounded_replay.py
```

---

## 1. Status summary

| ID | Severity | Finding | Status |
|----|----------|---------|--------|
| D1 | **Medium** | MinIO container runs as root with full default capabilities | **FIXED** |
| L6 | Low | Hosted-reachable acceptance evaluation can be pinned continuously | **FIXED** |
| L7 | Low | `--resume` / `--export-static` / `--fork` run IDs lack path containment | **FIXED** |
| L8 | Low | `fork_run` trusts the `checkpoints.path` column for `copyfile` | **FIXED** |
| D2 | Low | Bootstrap/DB credentials exposed in process argv during init | **FIXED** |
| D3 | Low | Unauthenticated Prometheus lifecycle API on the backend network | **FIXED** |
| D4 | Low | Movable image tags on `postgres` and `caddy` | **FIXED** |
| D5 | Low | `auto_https disable_redirects` contradicts published port 80 | **FIXED** |
| D6 | Low | Hostinger secret bind mounts silently auto-create host paths | **FIXED** |
| F1 | Low | Dashboard: unencoded simulation id in links; server-supplied hrefs rendered verbatim | **FIXED** |
| H1–H5 | Hardening | Relative-path redaction gap, static CSRF default, `.dockerignore` gaps, container cap hygiene, BYPASSRLS backup role | **FIXED** |
| M1, M2, L1–L5 | — | SQL identifier injection, login DoS, WS origin (local + hosted), login CSRF, body limits, proxy cap/paging | **FIXED** — see [Appendix A](#appendix-a--already-fixed-do-not-redo) |

Suggested order: **D1 → L6 → L7 → L8 → D2–D6 → F1 → hardening**.

---

## 2. Open findings

### D1 — MinIO container runs as root with full default capabilities (MEDIUM)

**Where**
- [deploy/minio/Dockerfile:31-44](../deploy/minio/Dockerfile#L31-L44) — runtime stage `FROM debian:trixie-slim@sha256:… AS runtime`, then `FROM runtime AS server` (line 35). **No `USER` directive in any stage**; `/data` is `mkdir`-ed as root.
- [deploy/compose.yaml:51-69](../deploy/compose.yaml#L51-L69) — the `minio` service has no `user:`, no `cap_drop`, no `security_opt`. Same for `minio-init` at [deploy/compose.yaml:71-95](../deploy/compose.yaml#L71-L95).

**Evidence**

```yaml
# deploy/compose.yaml:51-57
  minio:
    image: manyworld-minio:2025-10-15-source
    build: {context: .., dockerfile: deploy/minio/Dockerfile, target: server}
    command: server /data --console-address :9001
```

Contrast the repo's own hardened services: `x-app-base` (`cap_drop: [ALL]`, `no-new-privileges`, `read_only`) around [deploy/compose.yaml:25-30](../deploy/compose.yaml#L25-L30), and caddy at [deploy/compose.yaml:165-168](../deploy/compose.yaml#L165-L168).

**Why it matters.** MinIO is the second-most-exposed network service (it parses untrusted S3 protocol traffic) and is the only one that is *not* sandboxed. An RCE or parser bug there yields near-host-root surface instead of an unprivileged user. `SECURITY.md` claims a hardened deployment; this is the one service that does not match.

**Fix direction.**
1. Add a non-root `USER 10001:10001` to `deploy/minio/Dockerfile` (`server` and `client` targets) and `chown -R 10001:10001 /data` (or set `user:` in compose and pre-create the volume with the right ownership).
2. Add to both `minio` and `minio-init` in `deploy/compose.yaml`:
   ```yaml
   security_opt: [no-new-privileges:true]
   cap_drop: [ALL]
   read_only: true          # if MinIO tolerates it; otherwise omit and say why
   tmpfs: [/tmp]
   ```
3. Apply the same to `deploy/hostinger/compose.yaml` if it defines MinIO (verify).

**Tests / verification.**
- `docker compose -f deploy/compose.yaml config` shows the new keys.
- A container smoke test: MinIO starts, `/minio/health/live` passes, and `docker inspect` shows `User` non-root.
- Note: [tests/test_hosted_deployment.py](../tests/test_hosted_deployment.py) asserts deployment invariants — extend it if that suite parses compose files (check before assuming).

---

### L6 — Acceptance evaluation can be pinned by one authenticated tenant (LOW)

**Where**
- Route: [server/app.py:536-580](../server/app.py#L536-L580) — `@app.get("/api/acceptance/status")`, cache TTL `2.0` seconds at lines 567 and 572, single-flight `acceptance_lock` at line 283, evaluation in a worker thread at line 578 (`await asyncio.to_thread(evaluate_acceptance, store.path)`).
- Hosted exposure: the path is allowlisted at [hosted/app.py:327](../hosted/app.py#L327) (`r"/api/acceptance/status\Z"`), proxied through `proxy_world` with a 10 s upstream timeout ([hosted/app.py:1593](../hosted/app.py#L1593)).

**Evidence**

```python
# server/app.py:566-578
        now = time.monotonic()
        cached = acceptance_cache["result"]
        if cached is not None and now - acceptance_cache["evaluated_at"] < 2.0:
            return _hosted_safe_document(cached) if hosted_safe else cached
        async with acceptance_lock:
            ...
            from reports.acceptance import evaluate_acceptance
            result = {"configured": True,
                      **await asyncio.to_thread(evaluate_acceptance, store.path),}
```

**Why it matters.** The code's own comment says a production DB "can be hundreds of MB" and that the evaluator "reconciles the ledger and builds causal shock traces". The cache/lock prevent *concurrent* evaluations (so no thread-pool exhaustion) but impose **no rate limit**: an authenticated `observer` looping this GET keeps one full-database evaluation running essentially continuously on a worker thread, contending for SQLite/IO with the live tick loop and with other `asyncio.to_thread` users (hosted catalog auth also uses `asyncio.to_thread`). Effect: sustained tick-latency degradation and proxy timeouts for that run — not data exposure.

**Fix direction.** Add a per-run cooldown for the *evaluated* (non-cached) path when `hosted_safe` is true — e.g. 30–60 s — returning the cached result with a header/flag (`stale: true`, `Retry-After`) rather than re-evaluating; or require an admin role for forced re-evaluation. Keep local behaviour unchanged (local is single-operator).

**Tests to add** (in `tests/test_hosted_app.py` or `tests/test_prd_completion.py`):
- Two rapid calls through the app evaluate once (monkeypatch/spy on `evaluate_acceptance`).
- An `observer` role cannot force back-to-back full evaluations.
- A stale-flagged response is returned instead of a 429 (pick one contract and assert it).

---

### L7 — `--resume` / `--export-static` / `--fork` run IDs are not containment-checked (LOW)

**Where**
- Resume: [run.py:675](../run.py#L675) — `db = data_dir / f"{run_id}.db"` then `Store(str(db))` (no parent check).
- Export-static fallback: [run.py:1606](../run.py#L1606) — `source = DATA_DIR / f"{args.export_static}.db"`.
- Fork parent lookup: [run.py:802](../run.py#L802) — `parent_db = data_dir / f"{run_id}.db"`.
- The guard that *should* be mirrored: [run.py:721](../run.py#L721) —
  ```python
  source_db = (source_root / f"{replay}.db").resolve()
  if source_db.parent != source_root:
      raise ValueError("replay source run id escapes its source root")
  ```
- Downstream amplification: the unvalidated `run_id` becomes the run identity and is interpolated into checkpoint filenames at [world/loop.py:1200](../world/loop.py#L1200) and [world/loop.py:1335](../world/loop.py#L1335) (`ckpt_dir / f"{run_id}_t{tick}.db"`), escaping the checkpoint directory; [engine/store.py:184](../engine/store.py#L184) even creates missing parent directories.

**Why it matters.** `--resume ../../x` reads and writes a SQLite DB outside `data/runs/`; `--export-static ../../x` reads an arbitrary `.db`; `--fork ../x@1` opens an out-of-tree parent and copies a checkpoint to `data/runs/`. Today only the local CLI operator can pass these flags, so it is self-inflicted — but the replay guard shows containment is intended, and a future HTTP surface reusing `open_run(resume=…)` inherits the gap. The `--export-static` case is the clearest: an absolute or `../` path is accepted verbatim when it exists as a file.

**Fix direction.** Apply one shared helper to all three sites: resolve the candidate and require `candidate.resolve().parent == data_dir.resolve()`, plus a strict run-id pattern (the replay path already uses `^[A-Za-z0-9_\-]{1,64}$` for HTTP run ids in [server/replay.py](../server/replay.py)). Reject before `Store(...)` is constructed, so no parent directories are created.

**Tests to add** (extend `tests/test_replay_source_lifecycle.py` or a new `tests/test_run_id_containment.py`):
- Rejection: `--resume ../../x`, `--resume /abs/path/x`, `--export-static ../../x`, `--fork ../x@1`.
- Success: normal run id still resumes/exports/forks.
- Assert no file/directory is created outside the data root on rejection (tmp_path assertion).

---

### L8 — `fork_run` trusts the `checkpoints.path` column (LOW)

**Where** — [run.py:798-819](../run.py#L798-L819):

```python
        parent = Store(str(parent_db), read_only=True)
        row = parent.query_one(
            "SELECT path, tick FROM checkpoints WHERE tick<=? ORDER BY tick DESC, id DESC LIMIT 1",
            (int(tick_s),))
        parent.close()
        ...
        src = Path(row["path"])
    if not src.exists():
        sys.exit(f"checkpoint not found: {src}")
    ...
    shutil.copyfile(src, dest)
```

**Why it matters.** A tampered run database can store any readable path (or symlink target) in `checkpoints.path`; that file is copied into `data/runs/<new>.db` and then opened as SQLite. Payload must be valid SQLite to survive `Store()`, so this is an arbitrary-file-copy / DoS hazard plus a symlink-follow, not code execution. The correct model already exists: [engine/checkpoint_retention.py:169](../engine/checkpoint_retention.py#L169) re-derives `path = root / f"{run_id}_t{tick}.db"` and refuses symlinks/hardlinks.

**Fix direction.** Do not trust the stored path. Derive the expected filename from the checkpoint root and the selected `tick` (`root / f"{run_id}_t{int(row['tick'])}.db"`), require it to exist as a regular unaliased file (`stat().st_nlink == 1`, `resolve() == absolute()`), and either reject a stored path that disagrees or ignore the stored path entirely. Mirror the refusal semantics in `checkpoint_retention`.

**Tests to add:**
- A run DB whose `checkpoints.path` points outside the checkpoint root is rejected (tamper the row in a fixture).
- A symlinked checkpoint path is rejected.
- A legitimate fork still succeeds and produces an identical DB (compare hashes).

---

### D2 — Bootstrap/DB credentials in process argv during init (LOW)

**Where**
- [deploy/compose.yaml:88](../deploy/compose.yaml#L88) — minio-init runs `mc alias set local http://minio:9000 "$${MINIO_ROOT_USER}" "$${MINIO_ROOT_PASSWORD}"` (MinIO **root** credentials in argv).
- [deploy/postgres/init/001_roles.sh:13-17](../deploy/postgres/init/001_roles.sh#L13-L17) — `psql … --set=app_password="$APP_DATABASE_PASSWORD" --set=supervisor_password="$SUPERVISOR_DATABASE_PASSWORD"` (both role passwords in argv).
- The correct pattern is already in the repo: [deploy/hostinger/postgres/002_backup_role.sh:11-15](../deploy/hostinger/postgres/002_backup_role.sh#L11-L15) uses `\getenv backup_password CATALOG_BACKUP_PASSWORD` with the comment *"Keep the password out of argv."*

**Why it matters.** `/proc/<pid>/cmdline` is world-readable by default on Linux hosts (unless `hidepid` is set), so any unprivileged local user on the Docker host can read these secrets while the short-lived init containers run.

**Fix direction.**
- minio-init: use `MC_HOST_local=http://$MINIO_ROOT_USER:$MINIO_ROOT_PASSWORD@minio:9000` (environment, not argv) and then plain `mc mb …`.
- `001_roles.sh`: `\getenv app_password APP_DATABASE_PASSWORD` / `\getenv supervisor_password SUPERVISOR_DATABASE_PASSWORD`, following `002_backup_role.sh`.

**Verification.** `docker compose config` is unchanged in behaviour; a shellcheck/grep assertion that neither `mc alias set` nor `psql --set=*password` appears in deploy scripts (`grep -rn "set=.*password" deploy/`).

---

### D3 — Unauthenticated Prometheus lifecycle API (LOW)

**Where** — [deploy/compose.yaml:176](../deploy/compose.yaml#L176): `- --web.enable-lifecycle`. The hostinger profile omits the flag (profiles are inconsistent).

**Why it matters.** Any container on the internal backend network (the internet-facing app is one of them) can `POST http://prometheus:9090/-/quit` with no authentication, silently killing detection/alerting (`deploy/hostinger/storage-alerts.yml` is the only monitoring). Requires a prior foothold, but it is a stealth/persistence win for an attacker.

**Fix direction.** Drop `--web.enable-lifecycle`, or gate it behind a `--web.config.file` with basic auth. Prefer dropping — nothing in the repo needs runtime reload.

**Verification.** `grep -rn "enable-lifecycle" deploy/` returns nothing; Prometheus still starts and scrapes.

---

### D4 — Movable image tags on the two riskiest images (LOW)

**Where**
- `postgres:17-bookworm` — [deploy/compose.yaml:34](../deploy/compose.yaml#L34) and [deploy/hostinger/compose.yaml:34](../deploy/hostinger/compose.yaml#L34) (holds all tenant/catalog data).
- `caddy:2-alpine` — [deploy/compose.yaml:152](../deploy/compose.yaml#L152) and [deploy/hostinger/compose.yaml:186](../deploy/hostinger/compose.yaml#L186) (the internet-facing TLS terminator).

**Why it matters.** Image content can change silently on rebuild, shifting the security perimeter with no code change. Everything else in the repo is rigorously pinned (`python` by digest in [Dockerfile:5](../Dockerfile#L5), golang/debian bases by digest in `deploy/minio/Dockerfile`, alertmanager by digest in the hostinger compose) — the inconsistency is the finding, and these two are the components that matter most.

**Fix direction.** Pin both by digest in all four places (`postgres:17-bookworm@sha256:…`, `caddy:2-alpine@sha256:…`), keeping the human-readable tag for readability.

**Verification.** `docker compose -f deploy/compose.yaml config` resolves; a grep shows `@sha256:` on both images in both files.

---

### D5 — `auto_https disable_redirects` contradicts the published port 80 (LOW)

**Where**
- [deploy/Caddyfile:3](../deploy/Caddyfile#L3) — `auto_https disable_redirects` inside the global block (`admin off` on line 2).
- [deploy/hostinger/compose.yaml:189](../deploy/hostinger/compose.yaml#L189) — `ports: ["80:80", "443:443"]`, mounting the same `../Caddyfile`.
- [deploy/compose.yaml:161](../deploy/compose.yaml#L161) mounts the same Caddyfile but publishes only `${HTTPS_PORT:-443}:443` (line 159).

**Why it matters.** Verified against Caddy source (`modules/caddyhttp/autohttps.go`): with `DisableRedir`, Caddy creates **no port-80 listener and no redirect routes** ("nothing left to do if auto redirects are disabled" → `continue` before any redirect server is built). On Hostinger, host port 80 is therefore dead, the ACME HTTP-01 challenge can never succeed, and certificate issuance depends solely on TLS-ALPN-01 through 443. This is fail-closed (nothing serves plaintext) but contradictory and fragile — HTTP-01 is the more robust challenge path.

**Fix direction.** Remove `auto_https disable_redirects` from `deploy/Caddyfile` (restores the 308 redirect and HTTP-01), **or** stop publishing `80:80` on Hostinger and document that issuance is TLS-ALPN-only. Note the file is shared by both compose profiles: on the main profile port 80 is not published, so the extra redirect listener is harmless. Validate after the change with a compose smoke run and a certificate issuance check.

---

### D6 — Hostinger secret bind mounts auto-create host paths (LOW)

**Where** — [deploy/hostinger/compose.yaml:86](../deploy/hostinger/compose.yaml#L86) (`./secrets/restore_key`), [:106](../deploy/hostinger/compose.yaml#L106) (`./secrets/backup_key`), [:131](../deploy/hostinger/compose.yaml#L131) (`./secrets/catalog_key`). The alertmanager service in the same file ([:156-158](../deploy/hostinger/compose.yaml#L156-L158)) uses the correct `secrets:`/`source:` form.

**Why it matters.** Classic short-syntax bind mounts auto-create a **directory** when the host path is missing. The app, Litestream, and catalog-backup then start with a broken key and fail only later at SFTP time — silent backup loss until the stale-backup alert fires.

**Fix direction.** Convert the three mounts to the long syntax with `bind: {create_host_path: false}`, or move them under a top-level `secrets:` block like alertmanager. Fail fast at container start instead of silently.

**Verification.** `docker compose -f deploy/hostinger/compose.yaml config` shows the mount options; removing a key file makes `up` fail immediately rather than starting a broken service.

---

### F1 — Dashboard: unencoded simulation id in links; server-supplied hrefs rendered verbatim (LOW)

**Where**
1. [dashboard/src/components/CivicCity.jsx:950](../dashboard/src/components/CivicCity.jsx#L950):
   ```jsx
   personHref={runId ? id => `/runs/${encodeURIComponent(runId)}/people/${id}${commonSuffix}` : null}
   ```
   `id` is `member.agent_id` from simulation data and is **not encoded**, while `runId` is.
2. [dashboard/src/lib/productNavigation.js:30](../dashboard/src/lib/productNavigation.js#L30):
   ```js
   href: navigation?.[item.key] || defaults[item.key],
   ```
   rendered verbatim by [dashboard/src/components/CitizenMenu.jsx:20](../dashboard/src/components/CitizenMenu.jsx#L20) (`<a href={item.href}>`). The values come from the run's `/api/v2/mode` document / `status.navigation`.

**Why it matters.** (1) is defence-in-depth: the href is prefix-anchored to `/runs/<encoded>/people/`, so `javascript:` is impossible and React sets the attribute as a string — but a non-numeric id containing `?`, `#`, or `../` would mangle same-origin SPA navigation. The server schema treats agent ids as integers today. (2) is the standard SPA trust model (the backend already owns JS execution), but a compromised backend could inject `javascript:` or an off-origin href; a one-line allowlist closes it.

**Fix direction.**
- Encode the id: `encodeURIComponent(id)` (and `commonSuffix` handling stays as-is).
- Validate navigation hrefs at the boundary: accept only same-origin relative paths — `typeof href === "string" && href.startsWith("/") && !href.startsWith("//")` — falling back to the default when the value fails.

**Tests to add** (dashboard vitest suite):
- A unit test that a crafted `agent_id` (`"1?x=2"`, `"../../evil"`) is percent-encoded in the produced href.
- A unit test that `productNavigation` falls back to the default for `javascript:alert(1)` and `https://evil.example`.

---

## 3. Hardening backlog (optional, lower priority than the above)

**H1 — Relative-path redaction gap (verified by execution).** [server/app.py:86](../server/app.py#L86) `_FILESYSTEM_PATH_VALUE` matches only absolute/drive-letter paths (`^(?:[A-Za-z]:[\\/]|\\\\|/(?!/))…`), and [hosted/app.py:445](../hosted/app.py#L445) `sanitize_public_payload` behaves the same. A relative path under an innocuous key survives both layers: `{"report": "reports/out/report_abc.html"}` or `{"note": "saved to data/runs/x.db"}`. No hosted-reachable payload carries such a value today (reachable endpoints replace `report_path` or use stripped path-shaped keys), but the dual-layer invariant will rot. Align both redactors on relative-path detection and add a regression test with a relative path under a neutral key.

**H2 — Static default CSRF token.** [server/v2_api.py:121](../server/v2_api.py#L121): `csrf_token = str(workspace_config.get("csrf_token", "local-observatory"))`. The token check is effectively decorative while the default is public; the real cross-site barrier is the custom-header requirement (browsers cannot attach `X-CSRF-Token` cross-origin without a successful preflight). Rotate per run or drop the pretence.

**H3 — `.dockerignore` gaps.** [Dockerfile](../Dockerfile) does `COPY . .`, and [.dockerignore](../.dockerignore) omits `logs/`, `builder_workspace/`, `graphify-out/`, `.claude/`, `.qoder/`, `.hypothesis/`, `.superpowers/` (all present in the workspace). Local operational/research artifacts can land in the production image. Add them.

**H4 — Container cap hygiene.** In [deploy/compose.yaml](../deploy/compose.yaml), the `postgres` service and (in the hostinger profile) `prometheus` lack the `no-new-privileges` / `cap_drop` that their siblings have — cheap consistency win on the service that holds all tenant data.

**H5 — `BYPASSRLS` backup role.** [deploy/hostinger/postgres/002_backup_role.sh:17](../deploy/hostinger/postgres/002_backup_role.sh#L17) creates `agent_economy_backup` with `BYPASSRLS` (repeat definition at line 24), and lines 27–28 grant it `SELECT` on all tables/sequences. This is intentional and documented in `SECURITY.md`, but its compromise is a full cross-tenant catalog read. Add an explicit credential-rotation line to the operator runbook.

---

## Appendix A — Already fixed (do NOT redo)

All landed in **`4cd7833` "Harden replay sources and hosted request boundaries"**, with follow-ups **`2ad2871`** and **`1b74845`**. `SECURITY.md` documents them; the existing tests below cover them.

| ID | Finding | Where the fix lives | Tests |
|----|---------|---------------------|-------|
| M1 | SQL identifier injection via crafted replay-source DB | `engine/store.py:28` `_quote_identifier` (used by `insert`/`update`/`set_meta`); `engine/schema.py:56` `assert_source_table_schema`; wired at `run.py` (`REPLAY_EXTERNAL_SOURCE_TABLES`, validation before any row read) | [tests/test_replay_source_schema.py](../tests/test_replay_source_schema.py) |
| M2 | Hosted `/auth/login` unbounded `auth_attempts` growth | `server/request_limits.py` `LoginRateLimitMiddleware` (600 global / 60 per peer per hour); `hosted/catalog.py` `auth_attempt_retention` (7 days) + 10 000-row per-tenant cap pruned inside the throttle transaction; `hosted/migrations.py` `DELETE` grant on `auth_attempts` | [tests/test_request_limits.py](../tests/test_request_limits.py), `tests/test_hosted_catalog.py`, `tests/test_hosted_postgres_integration.py` |
| L1 | Local `/ws` default-allow origin | `server/app.py` `_same_origin` — same scheme/host/port required, `server.allowed_origins` as escape hatch | `tests/test_prd_completion.py` (WS origin test) |
| L2 | Hosted WebSocket no `Origin` validation | `hosted/app.py` `hosted_websocket` origin check before `authorize` | `tests/test_hosted_app.py` |
| L3 | Login CSRF on hosted `/auth/login` | `hosted/app.py` `_reject_cross_site_session_start` (Sec-Fetch-Site / Origin) | `tests/test_hosted_app.py` |
| L4 | Local API unbounded bodies / chunked `Content-Length` bypass | `server/request_limits.py` `RequestBodyLimitMiddleware`; installed with a 1 MiB local cap in `server/app.py` | `tests/test_prd_completion.py`, `tests/test_request_limits.py` |
| L5 | Hosted world proxy buffering + unpaged `/api/agents` | `hosted/app.py` `_bounded_world_response` (cap before transport buffers), `proxy_world` injects `limit=100` for unpaged agent reads | `tests/test_hosted_app.py` |

Also verified clean during the audit and requiring no action: hash-pinned Python installs and a clean `pip-audit`; `npm audit` 0 vulnerabilities with registry-pinned lockfile; full-history `gitleaks` scan clean with `.env` never committed; path-traversal/zip-slip protections in checkpoint and archive restore; parameterized SQL everywhere else; SSRF-free proxy (in-process `ASGITransport` only); hosted RLS/CSRF/cookie hygiene; no `pull_request_target` or secret-bearing CI steps.

---

## Appendix B — How this audit was performed (for reproduction)

- Static audit of the HTTP surface (`server/`, `hosted/`), simulation core (`run.py`, `engine/`, `world/`, `llm/`), dashboard (`dashboard/`), and deployment (`deploy/`, `Dockerfile`, CI), plus targeted manual verification of each candidate finding (data-flow tracing to sinks, execution-level checks of the two redactors, Caddy source verification for D5).
- Tooling: `pip-audit -r requirements.lock`, `npm audit`, `gitleaks git --config .gitleaks.toml .` (608 commits), plus `grep`/AST-level tracing.
- Reporting conventions: every finding was confirmed against live code before being listed; speculative pattern matches were excluded. Severity reflects exploitability under the documented threat model (local mode trusted and loopback-bound; hosted mode internet-facing).
