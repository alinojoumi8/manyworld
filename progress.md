# Gauntlet Loop — the Living City

Live status. Branch `feat/live-city`, baseline `8b08902`.

---

## The bars — verified by film, not by title

A still cannot show whether a city moves, so every bar is captured as a **frame sequence** and judged as a
labelled filmstrip.

| Bar | Governs | Status |
|---|---|---|
| **minitokyo3d.com** | Continuous entity motion on a city map; atmosphere; calm; legibility while moving | ✅ **verified** — 6 frames over 39s, trains visibly advance along real routes |
| **globe.adsbexchange.com** | Density at scale; live-entity legibility; click-an-entity-to-see-why | ✅ **verified** — live aircraft map, no bot wall |
| ~~flightradar24.com~~ | *was* the density bar | ❌ **REJECTED — Cloudflare "Verify you are human"** |
| ~~ai-town.convex.dev~~ | closest conceptual peer | ❌ unreachable from this environment |
| ~~marinetraffic.com~~ | candidate replacement | ❌ Cloudflare "Sorry, you have been blocked" |

**Flightradar24 passed a naive check and failed a real one.** Navigating to it returned a valid page title,
so it looked reachable. Filming it returned six identical frames of a CAPTCHA — 95 KB against Mini Tokyo's
1,713 KB. Had the loop trusted the title, six critics would have "compared" our city against a bot-check page
and produced confident nonsense. **This is the single most common way a gauntlet loop fails**, and the only
defence is fetching the bar for real before trusting it.

CAPTCHAs are not to be solved or worked around; the bar was replaced instead.

## The motion rule

Every rendered position must derive from a **recorded placement**. An agent's day is exactly three recorded
points — its `morning`, `business` and `evening` place. Chips glide between *those* points across the tick.
**An agent whose consecutive slots are the same place does not move.** No idle drift, no milling, no filler
agents, no waypoint that is not on the segment between two real placements. The UI must say, permanently and
quietly, that movement between recorded points is interpolated.

## The substrate — one endpoint has the whole city

`GET /api/v2/map` → 408 KB in 62 ms (paused). Verified live:

- **899 presence rows = 300 distinct agents × 3 slots**, every row carrying `x`/`y` normalised 0–1
- slots: `morning` 300 · `business` 299 · `evening` 300 — one agent legitimately lacks a business slot
- `source_type`: `routine_home` 600 · `routine_work` 250 · `public_commons` 46 · `privacy_aggregate` 3
- plus 266 `places`, 236 `firms`, 3 `regions`, all with coordinates

`privacy_aggregate` rows carry `agent_id: null` — licensing-office occupants are deliberately anonymised and
must render as an anonymous count, never as a person.

**No backend plumbing is needed for this surface.** The plan assumed the World projection would have to be
extended; it does not, because `/api/v2/map` already returns everything.

## Timing reality (measured)

- A tick takes **44–49 s**; `MORNING` alone is ~45 s of it. Every other phase is sub-second.
- The city therefore gets **one frame of truth per ~45 s** — pace the three-beat day across that, ~15 s a beat.
- The WebSocket is **not** starved the way HTTP is (frames land ~0.3–1 s after the tick boundary), but it is
  **silent between ticks and indefinitely while paused**. The UI must animate locally off last-known state.

## Environment

| | | |
|---|---|---|
| Simulation | `127.0.0.1:8000` | run `53f5b4ce8c`, semantics 12, 300 agents, **paused at tick 349**, spend `$0.00` |
| Dev server | `127.0.0.1:4174` | vite, proxies to `:8000` with the stock config |
| Motion capture | `scratchpad/film.js` | `film <url> <name> --frames N --interval MS` → frames + labelled filmstrip |
| Blind pairing | `scratchpad/harness.js` | `pair <piece> <ours> <ref>` → randomised A/B with a sealed key |

**Servers were reaped mid-session and restored on `:8000`** (previously `:8002`), which also means the stock
`vite.config.js` works unmodified — no env var, and a future revert cannot break the proxy.

## Do NOT build — these would be fabrications

| Tempting | Reality |
|---|---|
| Rumour arrows agent → agent | Information spreads by **broadcast lottery**; no transmitter is recorded, all 98,058 exposures are `channel='news'` |
| Social edges forming over time | `social_ties` has no tick column — current state only |
| A movement event feed | No `agent_moved`/`travel`/`arrived_at` kind exists; movement lives only in `effective_presence` |
| Idle drift or milling | No motion without a recorded origin and destination |

Truthfully animatable instead: a claim washing across the population tick by tick — a spreading stain, never
a chain of arrows.

## Piece status

Legend: ⬜ queued · 🔨 building · 🔍 in judgement · ❌ rejected · ✅ critic picked ours blind

| # | Piece | Bar | Status |
|---|---|---|---|
| 1 | Full-bleed map + 300 agents at real coordinates + de-collision | MINI TOKYO | 🔨 round 1 building |
| 2 | The commute — interpolated three-beat day paced across the tick | MINI TOKYO | 🔨 with piece 1 |
| 3 | Day clock driving atmosphere | MINI TOKYO | 🔨 with piece 1 |
| 4 | Interpolation disclosure | both | 🔨 with piece 1 |
| 5 | Conversation bubbles pinned at the co-located place | MINI TOKYO | ⬜ |
| 6 | Errands & scheduled intent | ADS-B | ⬜ |
| 7 | Click an agent → its day | ADS-B | ⬜ |
| 8 | Claim diffusion as a spreading stain | ADS-B | ⬜ |
| 9 | Live transport — fix the cursor bug, carry `city` in the delta | ADS-B | ⬜ |
| 10 | Density at 300 | ADS-B | ⬜ |

## Known bugs found during planning (not yet fixed)

- 🐛 **`previous_event_cursor` is computed wrong** (`server/projections/transport.py:41-43`) — it resolves to
  the *same* tick's earlier commit, never the cursor the client holds, so `cursorReducer.js:70-72` flags
  `cursor_gap` on **every** live delta and the payload is discarded and re-handshaked. This is the source of
  the permanent "stale" banner. Piece 9.
- ⚠️ uvicorn's default `ws_ping_interval`/`ws_ping_timeout` are 20 s while `MORNING` blocks ~45 s, so
  keepalive drops are plausible. Inferred from library defaults, not yet measured.
- **My own error, on record:** the `45.4`/`45.3` sub-tick notation in the earlier design specimens was
  *invented* — it exists nowhere in the codebase. Real and usable instead: `events.phase` + monotonic
  `events.id` + millisecond `created_at` (tick 348 produced 920 phase-ordered events).

## Log

_(newest first)_

- **Bars verified by film; Flightradar24 rejected and replaced** with ADS-B Exchange after filming revealed a
  CAPTCHA behind a valid-looking page title.
- **Branch `feat/live-city` opened**, prior design-system work committed as baseline `8b08902` so the
  live-city diff stays isolated.
- **`/api/v2/map` confirmed sufficient** — 899 presence rows with coordinates; the planned backend plumbing
  piece is unnecessary.
