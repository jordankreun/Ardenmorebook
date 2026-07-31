# ENGINE CHANGELOG — audit trail (append, never rewrite)

### Split out of `references/feedback-engine.md` on 2026-07-31. The entries below are unchanged.
### This file is CONSULT-ON-DEMAND and is deliberately not in any mode's LOAD list: it records how
### the engine got its rules, which matters when diagnosing a miss and never matters while drafting.
### Read it when asking "was this rule ever considered, and why is it worded this way?"


- **2026-07-13 — "Make it not obvious it's a set up."** New P1 [HARD] "Setups are invisible —
  plant seeds blind." Gap analysis: P1 telegraph + P2 significance-tags existed but were scoped to
  the throughline and to characters; plot seeds were uncovered — third member of one family, hence
  [HARD] on arrival. Lint: seed-telegraph WARN list added (review-every-instance, budget 0).
  Retro-sweep: fixed Ch 9 (barn confessional frame, closing moral, cabin self-deception flag),
  Ch 5 (Tomas hammer: "a good deal turned on him later… I have the key now" → unremarked + "A
  man's hammer is his own affair"), Ch 6 (grandmothers: "the answer… was not the one I expected.
  But that comes later" → "I let the question keep" — which also un-forecloses an OPEN question).
- **2026-07-13 — "Review how the engine learns; make more robust."** Rewrote this intake protocol
  from 3 advisory steps to 6 mandatory ones: added gap analysis with mandatory escalation,
  same-day mechanization, an operational retro-sweep step, this changelog, and the pass-tally
  requirement in engine reports.
- **2026-07-13 — "But the feedback engine for going forward."** Forward pass added: the engine now
  runs BEFORE drafting too. New PRE-DRAFT BRIEF section (at-risk rules, active blind seeds
  touched/rested, [OPEN] questions not to foreclose, previous chapter's tic exposure), wired into
  SKILL.md's plan block. New P1 [CRAFT] "Water a blind seed rarely" (frequency is also a
  telegraph; cadence + variation + second-mundane-job). Lint: mechanized the adjacent-chapter echo
  rule (5-word shingles vs the previous manifest entry, WARN). Sweep on arrival found real echoes
  ("lowered himself onto the bench" Ch1↔Ch2; "every wall in two lifetimes" Ch4↔Ch5) — left for a
  dedicated polish pass, flagged to the author. Bible's PENDING PAYOFFS header now carries the
  blind-seed handling rules at the point of use.
- **2026-07-14 — "when you do the adversarial read, act as an editor would."** New reference doc
  `references/editorial-read.md`: the fiction-editor persona, the FOUR-LEVEL read (developmental /
  scene / line / copy) with the developmental layer a rule-lint cannot reach, the note-vs-nitpick
  bar, and the "adversarial verify AS AN EDITOR" protocol (skeptical of taste AND of the
  rubber-stamp; when confirming, owe the author the editor's own best fix; look up from the
  finding for what the finder missed). Wired into SKILL.md's reference list and this file's
  HOW-TO-RUN block; cold-read and verifier sub-agent prompts must now invoke that persona.
- **2026-07-14 — skill + engine REWORK (author: "audit the skill… rework the skill and self
  learning engine").** (a) Fixed a live self-contradiction: SKILL.md's drafting section still
  commanded the retired 3,500 hard floor against session-lock #7 — the rulebook itself needed the
  retro-sweep discipline. (b) Mechanized that class: new `tools/superseded.txt` (registry of
  retired rule formulations) + `tools/doc-audit.sh` (greps ALL skill+state docs for retired rules
  still stated as live; run after any lock/canon change). First run caught two more live strays
  (a hard-floor line in the bible; a magic-scarcity line in geography, both now reworded). (c) OUTLINE fully rewritten
  to the two-year map with all locks (28–30 ch, fire at Ch 27 pre-finale, Lira chapter Part III,
  sale money mid-book with rooms crated under seal, tenants/harvest/note-payment beats, ages
  spanning two years, Emlyn/fiancée naming). (d) Four CRAFT DIALS locked (dialogue share, scene
  over summary, opening variety, one comic beat) — style guide section + the four rules above.
- **2026-07-14 — "sentences like this that could read better broken up into two" (the action+aphorism weld).** New P0 [CRAFT] rule "Break the action-plus-aphorism weld" + a lint review-list (WARN, budget 0) for the weld markers. Gap analysis: session-lock #9 / the run-on rule governed 4+-clause chains and comma splices but NOT the two-clause "concrete action, and general aphorism" weld, which is a distinct rhythm fault; added it. Applied 11 breaks across Ch 2-10; deliberately KEPT the prologue close, the "Good" payoff, and the Ch 1 triad (the lint surfaces that triad for review and it is vouched). 
- **2026-07-14 — feedback export (6 notes + 6 tracked changes, Prologue/Ch 1).** Gap analysis:
  two notes were engine misses. (1) The prologue "not on a boy" payoff had its setup cut in an
  earlier prologue rewrite — P4 "set up before you pay off" was drafted for within-chapter facts,
  not revision-orphaned dependents; rule sharpened to re-check dependents after every revision.
  (2) The townhouse-size mismatch was a **retro-sweep miss**: the modest-house retcon (2026-07-12)
  changed canon without sweeping Ch 1 ¶13/Ch 3 for stale "large house" facts — the intake
  protocol's step 5 existed and was skipped for a canon-only change; canon changes sweep the
  book, same as note-driven rules. Mechanized: lint now flags "had had"/"that that" (stacked
  perfects read as typos; source: "the double had is at issue"). Diction: trains are "crude,"
  not "early." Canon recorded in the bible: Cael negotiates as VILLAGE ELDER for the assembled
  families (why no haggling), hill-only reservation, outsider-buying-so-much suspicion; the inn
  is the ONLY three-storey building; the family townhouse is remembered FONDLY.
- **2026-07-15 — engine ROADMAP build (author: "Tier 1 + all of Tier 2"), from the 6-lens
  self-improvement audit.** Tier 1: (a) **dialogue-share meter** in the lint — WARN below a ~15%
  floor (prose lines with a quote mark ÷ total), prologue+interludes exempt, deliberately-interior
  chapters vouchable; surfaces the single highest-leverage dial (craft dial #1). It fires on Ch3
  (0%) and Ch4 (3%), both genuinely interior (arrival, first working) and left as designed. (b)
  **Echo dedup via merge_runs** — overlapping 5-word shingles now merge into maximal runs before
  reporting, killing the triple-count noise. (c) **VOUCH LEDGER** `tools/vouched.txt` — deliberate
  cross-chapter motifs (the valley-evening "lamps one window at a time" refrain; "the failing of
  the light"; the NE-corner/chest twist groundwork) are suppressed per file-pair and PRINTED as
  "VOUCHED (n)" so it stays auditable; a new echo still fires. (d) Pruned the seed-telegraph
  patterns to require the actual hindsight tail (bare "I would learn" → "I would learn later" etc.),
  taking the book's false-positive count 4→0. (e) P5 tic rule reworded to a three-level gradient
  (AIM / RATION / THRESHOLD) — the docs had falsely conflated "lint budget" with "hard ration."
  Tier 2: (f) **CALENDAR SPINE** + (g) **GRIEF-THAW CURVE** added to the bible (the two cross-chapter
  arithmetic axes a per-chapter CANON check is blind to — the exact source of the Ch10 forty-vs-thirty
  and keeper-leaf slips), each with a PRE-FLIGHT line; back-filled Ch1–10 onto both. Three new
  pre-draft-brief LOCATES wired into SKILL.md (locate on the calendar / is-the-clock-honest; locate
  on the thaw / not-healed-early; recall the last two closing shapes). (h) **`state/engine-reports.md`**
  — append-only archive of what each pass CLAIMED at ship time (NOT a startup read), so intake
  gap-analysis can tell a **silent miss** (engine claimed clean; note later caught a real defect →
  sharpen the rule) from a **conscious keep** (engine flagged + vouched; author still disliked →
  judgment bar was wrong); intake step 3 and the revise-flow now read it first. (i) [CHECK] Speaker
  trackability + widened [CHECK] Bookend variety (openings AND closes) in P4; editorial-read level-2
  gained speaker-trackability; style-guide dial #3 widened to "vary the bookends." doc-audit clean;
  full lint shows no new FAILs.
- **2026-07-15 — engine ROADMAP build (author: "build 3" = Tier 3), the three optional items, each
  built as the AUDIT'S NARROW HALF (the over-built half of each was explicitly rejected).** (j)
  **Blind-seed falsification PROBE** — new P1 [PROBE] instrument: when a chapter plants/waters an
  active seed, spawn a fresh *bible-blind* sub-agent given only the manuscript through that chapter
  and ask the ONE question — does anything read as deliberately set up to matter later? — then
  cross-check its list against PENDING PAYOFFS; a seed named by function failed the [HARD] test and
  is replanted. This is the only uncontaminated test of the blind-seed rule (every knowing reviewer
  already sees the payoff). *Rejected half:* the four-question skim/confusion/expectation reader —
  an LLM confabulates a skim-map and "what did you expect that never came" would false-alarm against
  the book's DELIBERATE withholdings (the surname, the twist, the sealed grief). Wired into SKILL.md
  post-flight (conditional on a live seed). (k) **Delivery receipt** `tools/chapter-check.sh` —
  existence-only gate run at end of drafting: re-runs the lint and asserts the chapter is plumbed in
  (in `manifest.json` — else invisible to `reader.html`; has a phrase-registry row; has a log recap
  line). One PASS/FAIL line each; exit 1 on any FAIL. *Rejected half:* the front-matter-keys check
  (would FAIL all existing files; the header spec is a dead letter), the gameable "bible modified or
  N/A" self-assertions, and above all a tracked git pre-commit hook (can't tell a new-chapter commit
  from this repo's constant revision commits, so it only trains `--no-verify`). Verified: PASS on the
  wired Ch1–11 + interlude, FAIL on an unwired file. Wired into SKILL.md as the final mechanical
  gate. (l) **De-escalation discipline note** — folded into intake step 4 (Mechanize): whenever you
  ADD a lint pattern, in the same breath review whether any existing WARN ever neared a real catch
  and retire the pure-noise ones (log it, add to `superseded.txt`) — the prune reflex fires when the
  add reflex does, so the lint can't silently accrete false-friends. Caveat codified: a budget-0
  deterrent tripwire (seed-telegraph, welds, `had had`) is SUPPOSED to almost never fire; retire a
  WARN only when it fires *and is wrong*, never merely because it is quiet. **One roadmap item stays
  REJECTED** (not built): mechanizing repeat-family escalation — premature at this changelog depth;
  manual family-spotting has worked. Roadmap now fully resolved (Tier 1 + 2 + 3 built; one reject).
- **2026-07-15 — review pass on Ch 11 (author: "take a pass at the book's review"), the new
  instruments' first live run.** The blind-seed PROBE (bible-blind reader) passed the strict test:
  it decoded NO active seed by function (Emlyn's hidden listening + the twist both stayed invisible);
  its extra "significance-telegraphing" flags on the metronome/opening were adjudicated by the
  editorial read as earned/intended, so left. The EDITORIAL read caught one CONFIRMED **silent miss**:
  "I set this down…" (Ch11 ¶9) tripped session-lock #1's banned scribe framing — the drafting engine
  claimed clean and the lint's memoir-frame FAIL list was scoped too narrowly (had 'this account',
  not the 'set this down' variant). Gap analysis (intake step 3): SILENT MISS → SHARPEN. Mechanized:
  added 'set this down'/'setting this down' to the memoir-frame FAIL list (step 4), regression-tested
  0 false positives on Ch1–10. Two further review improvements applied (not misses, craft): surfaced
  Emlyn's "I don't know" as a spoken line (scene-over-summary on the pivot); trimmed the
  lightning-thunder tail's over-explaining clause. Lesson: a locked-decision breach is a FAIL class
  the mechanical list must cover phrase-by-phrase; when a lock bans a *family* of phrasing, seed the
  list with every variant the lock names, not just the first.
- **2026-07-15 — the TENANCY ARC (author-guided rewrite of Ch 9–17) → new P1b MONEY, LAND &
  INSTITUTIONS section.** Five distinct lessons, all from author pushes, all now rules:
  (a) **Causal consistency across chapters.** The author asked "why is the Wrays' first year free?"
  Ch 9's answer (rough ground repays the third year, not the first) logically forbade Ch 15's bumper
  harvest, but each chapter passed its own CANON check because the contradiction lived in the
  causation BETWEEN them, not in any date or figure. → [HARD] rule + a new pre-draft CAUSAL check.
  (b) **No convenient money.** The author repeatedly hardened the arithmetic (greenhouse rescaled to
  a bet-the-hill second borrowing; harvest made meagre; every liquid coin burned to eleven
  silver). → [HARD] "money is never solved by convenience," and the shortfall drives the next
  chapter rather than being absorbed.
  (c) **Close the doors on the page.** The author's steer that the arrears were "the plan" and their
  failure "the nail in the coffin" produced the closed-door reckoning (hill twice-charged, patents
  leant on, lamps are bread not a wage bill, crop and house spent). → [CRAFT] rule: the reader must
  watch the ordinary routes close, by name, before an unconventional solution appears.
  (d) **Pay in kind when there is no coin**, and **both sides must visibly win.** The labour bargain
  became craft-for-work (3 yrs of footings, a season at the forge, first refusal on a crop). → two
  [CRAFT] rules; craft-debt binds where cash separates.
  (e) **PEOPLE FIRST, LEDGER SECOND (the anti-dryness rule).** Author: "make sure it's still focused
  on people equally with finances so it doesn't read dry." A dialogue-share audit showed Ch 16 at
  **21%** against neighbours at **56%** and **44%** — the five tenants had been LISTED, not met.
  Rewritten as encounters (Ned Pardon's eleven unclaimed fleeces in a loft; Alice Bewick's saucer of
  coin and her "I don't take that sort of arrangement") → 30%, and the chapter came alive. → [HARD]
  rule ("could this section be a table? then rewrite it as encounters"; dramatize the two or three
  transactions that cost somebody something) + a new P6 [CHECK] comparing dialogue share against the
  neighbouring chapters.
  Also added: [CRAFT] "owning things costs the owner something moral" (the Hask beat — refuse the
  tidy absolution) and [CHECK] "institutional detail is domestic" (every patent/arrear/tranche
  arrives attached to a person and a feeling). Process fix in SKILL.md: a chapter RENAME must
  rewrite its `phrase-registry.txt` and `vouched.txt` rows (bitten twice in one session).
- **2026-07-15 — author correction: Emlyn's trade is GENERAL WIZARDRY + PATENTS**, not ground-command.
  I had drifted into writing ground-work as his defining craft and built a bargain on it; corrected in
  prose and bible, both formulations added to `superseded.txt`, and doc-audit immediately caught a
  third stale instance I had just written. LESSON (now in the intake protocol's spirit): an invented
  professional/world detail must be checked against occupation canon BEFORE it propagates — this one
  reached three files in two turns.
