# Investigation Conflict Resolution and Browser Export Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close AE-EXT-INVESTIGATION-CONFLICT-001 and AE-EXT-EXPORT-BROWSER-UI-001 with same-operator multi-tab resolution and redacted investigation downloads.

**Architecture:** Keep the server-side optimistic version contract. The browser receives a typed workspace error, edits a title against its loaded version, fetches the latest record after a 409, and offers reload or copy-draft. Export uses the existing redacted route and browser Blob downloads only.

**Tech Stack:** React 19, TypeScript, TanStack Query, FastAPI, SQLite operator workspace, Playwright, Node test runner.

## Global Constraints

- Do not alter owner scoping, CSRF, append-only audit behavior, or the existing redaction manifest.
- A 409 must not retry, silently merge, or overwrite the server record.
- This is same-author concurrent tabs, not cross-operator shared investigations or a membership/RLS change.
- Browser export exposes only existing redacted JSON and Markdown, never filesystem paths, Parquet, private bodies, audit rows, or browser persistence.
- Write behavioral tests first; mock only the network boundary in browser tests.

---

### Task 1: Preserve workspace HTTP error details

**Files:**

- Modify: `dashboard/src/app/api.ts`
- Create: `dashboard/tests/workspace-api.test.js`

**Interfaces:**

- Produces `WorkspaceApiError extends Error` with `status`, `detail`, and `payload`.
- Makes `workspaceApi<T>()` throw that error for every non-2xx response.

- [ ] **Step 1: Write failing error-contract test**

```javascript
test("workspaceApi preserves 409 status and detail", async () => {
  global.fetch = async () => new Response(JSON.stringify({ detail: "investigation version conflict" }), {
    status: 409, headers: { "Content-Type": "application/json" },
  });
  await assert.rejects(
    () => workspaceApi("/api/v2/operator/investigations/id", { method: "PATCH" }),
    error => error instanceof WorkspaceApiError
      && error.status === 409
      && error.detail === "investigation version conflict",
  );
});
```

- [ ] **Step 2: Run RED**

Run: `npm test -- workspace-api.test.js`

Expected: an import or assertion failure because the typed error is absent.

- [ ] **Step 3: Implement the error**

```ts
export class WorkspaceApiError extends Error {
  constructor(readonly status: number, readonly detail: string, readonly payload: unknown) {
    super(detail);
    this.name = "WorkspaceApiError";
  }
}
```

Parse JSON once, use a safe fallback detail for non-JSON failures, and retain the successful response shape.

- [ ] **Step 4: Run GREEN and typecheck**

Run: `npm test -- workspace-api.test.js && npm run typecheck`

Expected: error contract and TypeScript build pass.

- [ ] **Step 5: Commit**

Run: `git add dashboard/src/app/api.ts dashboard/tests/workspace-api.test.js`

Run: `git commit -m "feat: expose workspace conflict responses"`

### Task 2: Add explicit multi-tab conflict resolution

**Files:**

- Modify: `dashboard/src/workspaces/InvestigationsWorkspace.tsx`
- Create: `dashboard/tests/e2e/investigation-conflict.spec.ts`
- Modify: `tests/test_semantics8_projections_api.py`
- Modify: `docs/test-cases.md`

**Interfaces:**

- Consumes `WorkspaceApiError`, GET/PATCH/POST investigation endpoints, and session CSRF.
- Produces title draft controls, Save, a `role="alertdialog"` conflict panel, Reload server, and Copy my draft.

- [ ] **Step 1: Write failing server and browser tests**

```python
def test_investigation_update_conflict_keeps_latest_server_title(economy, tmp_path):
    app, *_ = _app_fixture(economy, tmp_path)
    with TestClient(app) as client:
        record = create_operator_investigation(client)
        assert patch_title(client, record["id"], 1, "tab A").status_code == 200
        assert patch_title(client, record["id"], 1, "tab B").status_code == 409
        assert client.get(f"/api/v2/operator/investigations/{record['id']}").json()["title"] == "tab A"
```

```ts
test("two same-operator tabs resolve stale title without overwrite", async ({ browser }) => {
  const first = await browser.newPage();
  const second = await browser.newPage();
  await first.getByLabel("Investigation title").fill("first tab");
  await first.getByRole("button", { name: "Save investigation" }).click();
  await second.getByLabel("Investigation title").fill("second tab");
  await second.getByRole("button", { name: "Save investigation" }).click();
  await expect(second.getByRole("alertdialog")).toContainText("changed in another tab");
  await second.getByRole("button", { name: "Copy my draft" }).click();
  await expect(second.getByText("second tab (conflicted copy)")).toBeVisible();
});
```

- [ ] **Step 2: Run RED**

Run: `../../.venv/bin/python -m pytest -q tests/test_semantics8_projections_api.py -k investigation`

Run: `npm run test:e2e -- investigation-conflict.spec.ts`

Expected: browser controls are not present.

- [ ] **Step 3: Implement title draft and conflict panel**

Initialize draft title and base version from the selected record. PATCH with `expected_version`; on 409 fetch the authoritative record but preserve local draft. Reload replaces draft/base version with the server record. Copy POSTs a new record containing local title, query, layout, and pinned tick, appending ` (conflicted copy)` only when needed. Display mutation errors with `role="alert"`.

- [ ] **Step 4: Run GREEN**

Run: `../../.venv/bin/python -m pytest -q tests/test_semantics8_projections_api.py -k investigation`

Run: `npm run test:e2e -- investigation-conflict.spec.ts`

Run: `npm run typecheck`

Expected: stale writes remain rejected and user action is non-lossy.

- [ ] **Step 5: Mark row automated and commit**

Update AE-EXT-INVESTIGATION-CONFLICT-001 with the Playwright file and `newly-automated` status.

Run: `git add dashboard/src/workspaces/InvestigationsWorkspace.tsx dashboard/tests/e2e/investigation-conflict.spec.ts tests/test_semantics8_projections_api.py docs/test-cases.md`

Run: `git commit -m "feat: resolve concurrent investigation edits"`

### Task 3: Add redacted browser export downloads

**Files:**

- Modify: `dashboard/src/workspaces/InvestigationsWorkspace.tsx`
- Create: `dashboard/tests/e2e/investigation-export.spec.ts`
- Modify: `tests/test_operator_workspace.py`
- Modify: `docs/test-cases.md`

**Interfaces:**

- Consumes `GET /api/v2/operator/investigations/{id}/export` returning `{json, markdown}`.
- Produces redaction-profile text and `application/json` / `text/markdown` downloads named by investigation ID.

- [ ] **Step 1: Write failing endpoint and browser tests**

```python
def test_investigation_export_has_redaction_manifest_and_no_private_body(tmp_path):
    workspace = OperatorWorkspace(tmp_path / "operator.db")
    record = workspace.create_investigation(owner_id="alice", title="Export", run_id="run")
    payload, markdown = workspace.export(record["id"], owner_id="alice")
    assert payload["redaction_manifest"]["private_message_bodies"] == "not_copied"
    assert "private-body-canary" not in json.dumps(payload) + markdown
```

```ts
test("operator downloads redacted JSON and Markdown without browser persistence", async ({ page }) => {
  await page.goto("/runs/run/investigations/investigation-1");
  await expect(page.getByText("private-body-canary")).toHaveCount(0);
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download JSON" }).click();
  await expect(await download).toHaveSuggestedFilename(/investigation-1\.json$/);
  await expect(page.evaluate(() => Object.keys(localStorage))).resolves.toEqual([]);
});
```

- [ ] **Step 2: Run RED**

Run: `../../.venv/bin/python -m pytest -q tests/test_operator_workspace.py`

Run: `npm run test:e2e -- investigation-export.spec.ts`

Expected: export buttons and downloads are absent.

- [ ] **Step 3: Implement Blob downloads and manifest display**

Fetch the existing route with `workspaceApi`, render each manifest entry, create a Blob and temporary object URL per file, click an ephemeral `download` anchor, and revoke the URL. Do not place export payloads in React Query, URL parameters, localStorage, sessionStorage, or logs.

- [ ] **Step 4: Run GREEN, build, and privacy tests**

Run: `../../.venv/bin/python -m pytest -q tests/test_operator_workspace.py tests/test_semantics8_projections_api.py`

Run: `npm run test:e2e -- investigation-export.spec.ts world-os-privacy.spec.ts`

Run: `npm run build`

Expected: both downloads succeed, redaction is visible, privacy checks pass, and static output builds.

- [ ] **Step 5: Mark row automated and commit**

Update AE-EXT-EXPORT-BROWSER-UI-001 with the Playwright file and `newly-automated` status.

Run: `git add dashboard/src/workspaces/InvestigationsWorkspace.tsx dashboard/tests/e2e/investigation-export.spec.ts tests/test_operator_workspace.py docs/test-cases.md`

Run: `git commit -m "feat: export investigations from browser"`
