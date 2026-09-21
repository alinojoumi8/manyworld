# JEV-v4 wait analysis — issue #101

Analysis date: 2026-09-21. Branch: `codex/jev-wait-analysis`.
Production source: main `a0ca62dac477552c20637f0c86f224510a3b7f8d` (same tree as recorded comparison head `483cce6754b06c606b8b32094d5d3e540c26263b`). No decision behavior, policy default, server, budget or live run changed.

## Main finding

The 81 waits were explicit, valid model selections. They were not inserted by confidence gating, a missing-menu fallback, a failed call, replay, or execution rejection. What remains unproven is why the model preferred them. The strongest concrete problems are decision-input quality and the interpretation of the denominator, not a demonstrated model defect or a reason to reward spending.

- 97 typed-decision receipts: 88 model selections, of which 81 selected economic wait (92.05%), seven selected an active economic bundle. Nine receipts used the scheduled strategic-review route. Do not count those nine as typed model waits (81/97 is 83.51%, a different denominator).
- These are native agents, not the ten external Hermes citizens. There are 27 native actors represented across the receipts.
- All 88 choices equal both the recorded model choice and a maximum of its returned option distribution. All reasons are `provider_choice`; minimum confidence was zero. No abstentions, escalations or no-candidate shortcuts in these 88.
- Forty-four waits belong to institutional roles. All 33 employment-screening cases involve institutional roles, not ordinary unemployed households. The engine's `employed=false` means no employment record, not no meaningful occupation or public responsibility.
- Thirty-four economic waits also emitted a ballot response: 18 substantive votes, 16 abstentions. Economic wait is not necessarily complete inactivity.
- Every model-selected menu had active alternatives: two to 47 (four to 49 options including wait/escalate). A menu option is prepared eligibility, not a guarantee of successful execution, a hire, a fill, profitability or appropriateness.

## Inspectable dataset and preservation

Artifacts are local and excluded from Git because they contain full simulation request/evidence bodies. Do not publish these raw records automatically.

Location: `C:/tmp/ae-jev-wait-analysis/reports/out/jev-wait-analysis/`

- `decisions.json`: all 97 receipts, complete predecision context, exact provider evaluation, stored output, probability/confidence, actor finances/business/opportunities, immediate proposals/results, later observed tick-5 employment/firms/proposals, baseline context and outcomes, per-wait label and limitations.
- `decisions.csv`: one row per receipt; counts, alternatives, selected bundle, cash/employment/company, confidence, missing-context indicators and outcomes.
- `candidates.csv`: every supplied candidate, order, complete action, facts, resource requirements, selection and probability.
- `baseline-pairs.csv`: same actor/tick/purpose matches with explicit context differences and results. No counterfactual outcomes invented.
- `summary.json`, `input-quality.json`: measured denominators, statistics, role mix and job-bound audit.
- `recompilation-checks.json`: 97/97 exact candidate/evaluation/menu-hash/observation-hash reconstructions.
- `preservation.json`: 2,944 protected paths matched before/after, including both historical runs and frozen comparison evidence.
- `network.json`: active socket-denial self-test passed; zero analysis network attempts, live model calls or world steps.

Source: frozen tick-5 DB images in `C:/tmp/ae-pr96-combined-20260921/reports/out/final-matched-20260921/{baseline,jev-v4}/live-tick-5/world.db`; baseline run `b4f43f5c4e`, treatment `ae65a21f8f`. Their hashes are in preservation.json. Source bytes are deserialized into private in-memory SQLite, never opened as writable source databases. Decision-time facts come from recorded requests, never reconstructed from final tables. Tick-5 tables are used only as explicitly later outcomes, not prior context.

Reproduction from this worktree with the repository virtual environment:

```powershell
& C:\Users\matri\Documents\myprojects\agent-economy\.venv\Scripts\python.exe analysis/run_jev_wait_offline.py
```

These one-off scripts deliberately reference the preserved local package and prior merge preservation manifest; they fail if the sealed evidence differs. They are analysis tooling, not a production interface. No model dispatch or simulation step is used. The logged request context includes the gateway's `_evaluation` copy; removing that documented transport-added key before recompilation restores the original observation hash. The initial analysis assertion exposed that distinction and was corrected in the analysis only; no evidence or production hashes were rewritten.

## Wait classification

Classification is an auditable screening rubric, not a reconstructed reason or an optimal-policy label. Priority: A if no active candidate; C if the actor is not employed, owns no firm and has a positive-wage application/acceptance candidate; otherwise G. Each record stores the rule. C intentionally means attractive-looking on a narrow wage screen and requires review of role suitability. No class is inferred from GDP or the baseline's action.

| Class | Meaning | Count | % of 81 waits |
|---|---|---:|---:|
| A | No executable alternative supplied | 0 | 0% |
| B | Alternatives established to be economically unattractive | 0 | 0% |
| C | Positive-wage opportunity warrants review; suitability unproven | 33 | 40.74% |
| D | Missing information established to prevent a confident choice | 0 | 0% |
| E | Relevant option established to be suppressed by ranking | 0 | 0% |
| F | Specific implementation/prompt defect established to cause this wait | 0 | 0% |
| G | Preserved evidence cannot determine whether waiting was preferable | 48 | 59.26% |

Zero D/E/F labels do not mean inputs/ranking/prompts are adequate: their limitations are measured below as overlapping secondary findings. There is no causal experiment showing which limitation caused a particular wait. High response confidence is not calibrated decision quality.

All 33 C cases concern 14 institutional actors: reporter/editor, exchange, government official, legislators, regulators, lawyer, executive and lobbyist. None is confirmed avoidable. Of all waits, 44 contained application candidates, one an acceptance offer, seven company-formation variants and 76 purchases (categories overlap). Founders with personal `employed=false` are excluded from C.

### Specific review candidates

- **Event 510, tick 4, actor 16 Ugo Novak (lobbyist):** an existing 360,000-cent wage offer (offer 1, Manufacturing Co 3) could be accepted with no immediate cash requirement; cash 100,000 cents, no employment record. Wait probability .78, confidence .77. No employment appears by tick 5. The provider saw the offered wage but not the full offer's employer/title or a pay-period/labor-obligation explanation. This is the strongest offer-review case, not proof a lobbyist should take factory work. Baseline applied for another job at the same actor/tick; states/offers differed and baseline also has no employment by tick 5.
- **Event 250, tick 2, actor 10 Pia Nguyen (legislator):** 360,000-cent posted wage, cash 100,000 cents, application candidate available, no incoming offer. Wait probability .85, confidence .83. Baseline applied and obtained application 3; neither arm shows an employment for Pia by tick 5. A submitted application is not a realized wage or evidence baseline was better.
- **Event 193, tick 1, actor 21 Enzo Khan:** formation variants from 100,000 to 150,000 cents, cash 1,636,180, already employed, risk tolerance .11, measured sector sales zero. Baseline founded firm 6; JEV waited (.59 probability). This remains G: the opportunity is legally available, but the evidence does not establish demand, expected profit or a preference to leave employment.

### Rationally defensible waits, without claiming optimality

- **Events 180 and 366, actor 5 Zoe Nguyen, ticks 1 and 3:** VC role with no pending pitches. The only economic alternatives were 360/480-minute future work plans, with no eligible work in the recorded daily-time context. Waiting is defensible; no financing opportunity was ignored. At tick 5 a pitch arrived and the scheduled-review route proposed a term sheet. Do not infer VC passivity from the first two waits.
- **Event 193 above:** preserving capital with an existing job, low risk tolerance and no measured demand is defensible, despite legal company-formation eligibility.
- **Event 358, actor 1 Governor Vale, tick 3:** Holding policy steady can be defensible; available rate changes do not establish their welfare benefit. No central-bank utility optimum is claimed.

## Baseline comparison and limitations

The dataset pairs 73/97 receipts with a baseline call for the same actor/tick/purpose. Twelve share the named economic axes; 61 differ; 24 have no same-purpose call at that boundary. Of the 88 typed selections, 65 have paired baseline calls. Named-axis equality is not full-state equality: actor fields, finances, firm, goods, jobs, incoming offers, original founding opportunity, VC fund/pitches are compared. Extra v4 `alive`/currency and authorization-option formatting are not mistaken for economic divergence. All raw differences remain available. Role-specific context omissions still matter.

Examples with equal named axes, all tick 1:

| Actor | Baseline outcome | JEV economic choice | Interpretation |
|---|---|---|---|
| Zane Novak (event 179) | Bought 7 units for 2,499 cents; future work plan | Wait | Baseline purchase size exceeds v4 max quantity 3: not the same menu experiment |
| Nate Cohen (183) | Bought one unit for 357 cents | Wait | Same apparent purchase availability; no welfare/hunger label establishes the better choice |
| Counsel Reyes (181) | Set future work plan | Wait | Effectiveness of a plan is distinct from immediate work or income |
| Enzo Khan (193) | Founded firm 6 | Wait | Legal opportunity and creation do not prove positive expected value |
| Rosa Farah (196) | Founded firm 7 | Wait | Later treatment buys one food unit at tick 3; not a causal return estimate |
| Devi Garcia (198) | Founding rejected: daily entrepreneurship capacity reached | Wait | Baseline activity can fail a shared capacity check despite attractive visible terms |

Seven active typed selections: five price-plus-job-post bundles (Amir ticks 1/2, Amara ticks 2/3, Ines tick 5), one price-plus-job-offer bundle (Amir tick 3), one goods purchase (Rosa tick 3). Their economic actions were accepted. There were no typed accepted applications, typed accepted offers, typed company formations or typed VC pitches to compare as successful active-input groups. Those observed aggregate activities must be separated from Hermes actions and the nine scheduled reviews. The latter include two applications, two purchases, three job offers and a term-sheet proposal.

Savings: baseline Ugo Ford withdrew savings and purchased on tick 1; typed alternatives do not expose arbitrary savings withdrawal (retirement shortfall has a specific gate). This is a scope difference, not evidence the provider rejected a supplied withdrawal.

Politics: ballots are separate questions and appended actions. Thirty-four waits still answered them. Extra election wakes and the recorded-voting policy differ across the original full-policy arms. The original comparison is not a pure same-opportunity choice experiment.

The earlier five-tick aggregate results remain descriptive: lower native cost/runtime, more waits, higher unemployment and lower GDP proxy. No agent-quality ranking follows from those outcomes alone.

## Decision pipeline: where wait enters

1. **World → context.** `agents/prompts.py:274` dispatches role/citizen context; `:648` retrieves up to six memories; `:671` supplies actor risk/occupation/role; `:679` obtains visible jobs. `agents/domain_observations.py:15` adds v4 wallets/commitments, current action terms and authorization-bound alternatives. Facts are contemporaneous detached context, not final-state reconstruction.
2. **Eligibility/options.** `agents/domain_options.py:11` and nested `add` at `:21` check domain, resources and occupancy/actor constraints. Consumption at `:55` bounds cash, inventory, quantity and takes two cheapest observed goods offers. Career at `:70` bounds to two wage-ranked nonpending jobs or supplied incoming offers. Founding uses exact supplied variants. These checks are not a promise that another actor cannot exhaust capacity before execution.
3. **Bundles/ranking.** `agents/domain_candidates.py:43` composes supported goods+career and pricing+hiring bundles. It does not compose every mutually compatible domain. `:63` deduplicates by action hash. More than 64 candidates triggers outside-menu routing, not truncation to wait; none of these receipts hit that boundary. `baseline_rank` selects a scripted comparator and duplicate representative; it is stripped before sending candidates to JEV. Active candidate order is hashed ID order, not expected value.
4. **Wait option/input projection.** `agents/domain_candidates.py:75` always adds wait and escalate. Wait says “Take no economic action; preserve resources.” The question at `:99` makes waiting real and discourages activity for its own sake. There is no numerical score bonus, engine probability normalization, or automatic default favoring wait on successful calls. Prompt/order effects remain hypotheses.
5. **Evidence ranking.** `agents/runtime.py:1103` calls attention ranking when memories exist; `agents/selection_services.py:90` scores and reorders all retrieved items with stable ties. It does not fetch additional evidence. `agents/domain_candidates.py:80` projects actor/finances/firm/beliefs, at most six memory strings and `decision_goals` (absent in every recorded context). Most full context keys are not copied; parts survive in candidate facts.
6. **Actual provider input.** `llm/gateway.py:1315` validates an evaluation and adds `_evaluation` to logged context. `llm/openrouter_decisions.py:50` sends only model, state, questions and no-fallback provider control. The ordinary stored system/user prompt and full context are NOT additionally sent to JEV. Thus baseline prompt advice about current facts overriding stale memories, monetary units and time-plan effectiveness cannot be assumed present unless represented in this projection.
7. **Response/gating.** `llm/decisions.py:72` validates question IDs, choice membership and optional confidence/probability bounds. `agents/typed_policy.py:95` takes the returned choice; only explicit escalation/low-confidence conditions can replace it. Threshold zero and no such statuses here rule that mechanism out for these 81 waits. Confidence is answer-distribution concentration, not success probability.
8. **Action and execution.** `agents/decision_candidates.py:50` maps wait to `do_nothing`; independent ballot choices are appended in `agents/typed_policy.py:116`. `agents/runtime.py:1536` invokes authoritative action execution. The records retain exact outcomes; offline recompilation and response checks find no active-to-wait conversion or changed candidates. No new replay/world step was performed.
9. **Feedback into later evidence.** `agents/runtime.py:1660` observes direct-subject events; typed/selection audit events are not filtered. `:1692` maps unknown kinds to “Something happened: KIND.” Those descriptions re-enter the bounded memory pool. This is a demonstrated low-information feedback path, not proof of the model's internal motivation.

## Input quality

| Measure | Wait (81) | Active (7) |
|---|---:|---:|
| Candidates incl. wait/escalate, min / median / max | 4 / 19 / 40 | 25 / 32 / 49 |
| Supplied memory count, min / median / max | 0 / 4 / 6 | 0 / 3 / 6 |
| Evaluation UTF-8 bytes, min / median / max | 2,307 / 8,434 / 17,759 | 10,630 / 13,899 / 19,532 |
| Provider input tokens, median | 4,247 | 6,934 |
| Confidence, min / median / max | .29 / .71 / .90 | .23 / .36 / .67 |
| Wait probability, median | .72 | .21 |
| Empty explicit goals | 81 | 7 |

Active group is six founder bundles and one purchase; larger contexts are confounded by role/menu complexity. This is not evidence that increasing prompt length improves choice.

- **Memory signal:** 299 selected-decision memory slots; 287 contain generic “Something happened:” (96.0%). 145 mention typed_decision, 90 bounded_selection, 65 ballot_cast; these overlap. Five contain the generic structured-facts reasoning sentence. Twenty-six selections have no memory. Sixty-one exact duplicate slots occur within individual inputs (56 wait, five active). No supplied memory exceeded the compiler's 384-character trim in this sample.
- **Paired check:** for the same 65 selected-decision actor/tick/purpose pairs, JEV has 193/202 generic slots versus baseline 113/192. Both have poor memories; v4 adds audit-event content. Slots are repeated correlated observations, not independent samples or a significance test.
- **Freshness:** context/evaluation tick binds correctly for all 97 reconstructed menus. Memory strings have no uniform timestamp/source-ID fields; this analysis cannot certify their event age. Do not call every memory stale. Structured firm sales windows intentionally stop at tick-1. No observed stale authorization or hash mismatch after removing the documented transport-added `_evaluation` key. Tick binding does not prove shared resources remain available after other actors execute; execution must recheck them.
- **Missing explicit objectives:** zero recorded contexts contain decision_goals. Selection asks for the actor's goals but gets an empty array. Role, risk, resources and some candidate facts are present; do not equate empty goals to total absence of preferences.
- **Household/time:** household and detailed daily_time are present upstream but absent as full state fields in all 88 evaluations. All 176 time-plan candidates have generic facts with empty bills/pending and null terms. Their effect-on-next-tick, wage-claim status, eligible work, existing plan, care duties and opportunity cost are not systematically explained by those facts. Amount/minutes in the action alone do not express benefits or necessity.
- **Labor:** positive wages are supplied, but application facts omit employer, title, competing application count, wage period and work obligations. The full upstream job/offer records contain some of these. For 47 selected contexts (45 waits), more than two nonpending observed jobs exist; a wage-first bound can omit lower-paying alternatives. No unchosen omitted job is established to be preferable. This is ranking exposure, not proven suppression of a relevant superior option.
- **Consumption:** price, quantity, resource cost and a target exist. `target_basis="declared preference"` actually labels a compiler heuristic (one plus legacy dependents, bounded by max quantity), not an explicit recorded actor preference. No direct marginal-utility/satiation goal is supplied. This is a provenance-label defect; it does not prove that buying would improve welfare.
- **Founding:** exact capital/reserve/market/risk facts are comparatively rich. Seven waits include founding alternatives; zero measured recent sales does not establish demand. Do not repair these waits by forcing entrepreneurship.
- **Funding:** no pitch_vc candidate appears in these 88 menus; no active-vs-wait pitch group exists. The VC's ticks 1/3 had no pending pitch; tick 5 used strategic review. Financing quality needs a separately sampled opportunity cohort.
- **Numerical asymmetry:** costs/commitments and some wage/production facts are explicit; wait positively names resource preservation, while many active options lack comparable benefit/obligation descriptions. Real limits/not-guaranteed warnings must remain. No evidence supports removing safeguards or mechanically rewarding active choices.

## Implementation findings

**No new execution, eligibility, accounting, response-validation or replay correctness failure established.** All frozen candidates/evaluations/identities reproduce and all model-selected choices match stored outputs.

Confirmed input/observability defects or gaps, left unchanged:

1. Audit events become generic lived-memory text and consume bounded evidence slots.
2. No explicit decision_goals in these contexts despite goal-referencing selection/ranking instructions.
3. Time-plan options lose operational-effect context; labor options retain wages but little suitability/timing detail.
4. A derived consumption target is labeled a declared preference.

These are code-grounded findings, not a claim each caused a wait. The current zero confidence threshold is not the problem. Raising it would discard some active low-confidence choices too (active minimum .23), not necessarily improve decisions. No architecture change, prompt tuning or threshold adjustment was implemented.

## Broader evaluation design (proposal only; no live authorization)

### Staged experiment structure

1. **Frozen-decision audit first:** blinded dual annotation of all 81 waits plus seven active controls. Reviewers see exact actor role, supplied menu/evidence and authorized upstream facts, but not provider label or realized GDP. Labels: role suitability, unmet obligation, information sufficiency, plausible benefit/cost, admissibility, defensible wait, avoidable-wait candidate, unresolved. Baseline action is never a gold label. Adjudicate disagreements and preserve uncertainty rather than force a winner.
2. **Small frozen-input diagnostic after separate approval:** 88 fixed menus, current input versus one independently specified input-quality treatment, three repeat calls per condition: 528 typed evaluations. Counterbalance arm/order, preserve candidate IDs/amounts and provider revision, use hard accounting limits and no world mutation. Do not combine memory, goals and wording changes in one treatment. Causal target is evidence-use/suitability on fixed scenarios, not more activity. Recorded outputs cannot test a changed prompt; any new model calls require explicit authorization.
3. **Pilot world study:** five seed pairs, 30 ticks, to estimate run-level variability, opportunity counts and costs. Do not use pilot results to choose whichever metric flatters a treatment; finalize rubric/metrics and size before held-out runs.
4. **Held-out study:** propose 20 new matched seed pairs × 50 ticks × two arms (40 worlds, 2,000 world ticks). This yields repeated weekly opportunities; longer business returns/disbursement can still be right-censored. Twenty pairs is an initial design target, not a claimed powered sample size. Pilot variance determines whether more pairs/horizon are required to resolve the predeclared practical difference.

Primary causal policy study: identical mechanics/semantics, population, source revision, provider revisions, seed, tick allowance, initial balance sheets and identities. Change only the declared decision-policy treatment; enable identical recorded-voting mechanics in both arms or exclude politics from both. Baseline retains its declared original decision routing; JEV-v4 remains frozen at current behavior. A same-menu comparator is a separate ablation, not a replacement for the real baseline. Freeze pre-treatment checkpoints and hash-verify initial economic equivalence.

For the primary policy-isolation study, use identical scripted external citizens in both arms (or native-only worlds declared prospectively), not stochastic live Hermes traffic. This changes the research population relative to the previous ten-Hermes test and must be labeled. Separately replicate a small authorized ten-Hermes subset to test external-agent interaction/generalization. Never replay a treatment citizen's action into an incompatible baseline world and pretend the worlds remained matched.

Randomize/interleave pair execution order, block by seed/provider revision, record wall-clock ordering, route changes, retries and outages. Same initial seed does not guarantee identical post-treatment random trajectories. Analyze paired run-level differences, report uncertainty across seed pairs, and cluster actor-level repeated decisions within runs; do not treat hundreds of decisions as independent trials. Report all assigned runs and failures, no selective reruns or cherry-picked exclusions. If a source/model revision changes, stop that block and report it separately.

### Metrics and gates

| Family | Report separately |
|---|---|
| Correctness | Invalid/rejected reasons (expected shared-capacity rejection separated), identity/receipt correctness, eligibility recheck, exactly-once actions, ledger/DB/FK integrity, budgets/reservations, exact offline replay |
| Decision quality | Blinded suitability, obligation fulfillment, defensible vs adjudicated avoidable waits, information sufficiency, role-specific opportunity utilization/response latency; explicit unavailable/uncertain labels |
| Economic outcomes | Employment segmented by institutional role vs labor-market actors, firm survival/formation, consumption and unmet needs, financing funnel to disbursement, GDP proxy, inequality, sentiment, solvency; no default preferred direction for spending/firm counts |
| Efficiency | Model/service calls, cached/uncached tokens, cost, active and wall runtime, retries; Hermes subscription usage separate from native spend |

Hard correctness gates: zero identity crossover, duplicate financial effects, unknown reservations or unexplained replay mismatch; limits never overridden. Shared-capacity/expired-action rejection is measured with explicit cause, not automatically an implementation failure.

Opportunity denominator: actor-turns where an authorized action is available **and** independently assessed suitable for that role/obligation, excluding consumed/expired/blocked opportunities. Candidate availability alone is insufficient. Funding metrics track pitch → term sheet → acceptance → disbursement, not just accepted pitch count. Time-plan submission is not time worked.

Quality acceptance threshold must be set after the rubric and pilot but before held-out outcomes: a practical change in adjudicated avoidable-wait rate/suitability with no material worsening of defensible waits or role/obligation errors. No numerical effect size/power is asserted from this single seed. Use uncertainty intervals and report a result as inconclusive if they do not resolve the predeclared effect. No single overall score and no default promotion based solely on cost/GDP.

Cost context only: the 88 historical typed selections cost $0.017421138 (~$0.000198 per selection). A 528-call frozen-input probe at that historical mean is ~$0.105; it is not a quote or spending authorization. Full baseline+treatment native cost was ~$0.188875 for five paired ticks; naive scaling to 1,000 paired ticks is ~$37.78, but opportunity counts, context growth, preflights, other service calls and model prices can change. Native-only/scripted external worlds are not cost-equivalent to live Hermes worlds. Obtain current tariffs and a conservative explicit hard cap before any live launch. Do not consume or reset old allowances.

## Candidate improvements, ranked by evidence (not implemented)

| Rank | Observed issue / component | Proposed change and expected benefit | Aggressiveness risk / evaluation / semantics |
|---|---|---|---|
| 1 | Audit-event memory pollution; runtime observation/description and memory retrieval | Separate operational audit receipts from lived evidence or summarize meaningful grounded outcomes; retain durable audit ledger | Could hide relevant failed-action history. Offline visibility tests + frozen-context ablation; new prospective policy/semantics contract, preserve old replay |
| 2 | Daily-time and labor projection gaps; domain_options/domain_candidates | Carry role-appropriate obligations, current plan/effective tick, wage period and job/employer facts already authorized upstream | More wage salience could wrongly steer officials into factory work. Blind role-specific scoring and exact eligibility tests; version the input contract |
| 3 | Empty goals and derived preference label | Populate goals only from explicit configured/user/role contracts; identify heuristic consumption target honestly | Do not invent consumption/employment mandates to induce activity. Test role-consistent restraint and obligations; version prospective decision semantics |
| 4 | Positive preservation framing vs incomplete consequences | Symmetric action/wait consequences, including true deferred obligations and uncertain upside; no invented utility forecast | Can nudge needless spending if wait costs exaggerated. Fixed-menu randomized wording ablation, label-preserving controls; version prompt contract |
| 5 | Two wage-ranked job choices / generic evidence ranking | Evaluate role-fit/diversity ranking and event freshness metadata; test candidate recall against a read-only full authorized inventory | Broader menu can add unsafe or irrelevant options. Offline bounded-menu and blinded suitability tests; preserve resource/auth gates and old contracts |
| 6 | Confidence interpretation / missing explanatory labels | Calibrate optional confidence on adjudicated tasks; consider bounded wait-reason taxonomy only if supported by a future provider contract | Reason labels can be post-hoc rationalizations; never request hidden reasoning. No threshold change without evidence; requires a new declared schema if fields change |

Do not tune GDP, spending, proposal count or company creation as the objective. Do not optimize against the baseline's decisions as truth.

## Recommended next experiment

Run the **offline blinded 88-case adjudication** first, prioritizing the 33 institutional employment cases, two VC no-pitch controls, seven formation waits and seven active controls. Use two independent reviewers and adjudication; preserve unresolved labels. Its concrete output is a role-aware label set and a single predeclared input-quality ablation (audit-memory evidence is the leading candidate). Do not launch a model study or multi-seed worlds until that design and budget are approved. No production behavior change is warranted solely by the 92% statistic.

## Verification results

- Offline extraction under active socket denial: passed; zero network attempts after the guard self-test.
- 97/97 candidate lists, evaluations, observation hashes and menu hashes exactly recompiled from preserved context.
- 88/88 recorded selected responses matched their chosen option; no choice-to-wait substitution.
- Both in-memory source images passed SQLite integrity and foreign-key checks.
- 2,944 preserved artifact hashes matched before/after, zero differences.
- Focused existing tests: **82 passed**, one existing Starlette/httpx deprecation warning, 19.82 seconds. Command: `python -m pytest -q tests/test_jev_candidates.py tests/test_jev_contract.py tests/test_jev_domains.py tests/test_jev_references.py tests/test_jev_services.py --basetemp=C:/tmp/ae-wait-analysis-tests --junitxml=reports/out/jev-wait-analysis/pytest.xml`.
- `python -m compileall -q analysis` passed. Git diff hygiene checked. No full suite/new live replay was required for analysis-only artifacts.

## Final boundary

Main remains `a0ca62dac477552c20637f0c86f224510a3b7f8d`. All production files remain identical to main in this worktree; changes are analysis scripts and this document only. JEV-v4 remains opt-in. Historical `9b08e45cca`, replay-qualified `e692152244`, comparison DBs, budgets and recorded evidence remain unchanged. No live model/Hermes run, server operation or simulation tick was performed.
