# MODE: DRAFT — write a new chapter

**When this mode is selected:** the request is to write, draft, or continue a chapter that does
not yet exist. Never selected for an edit to existing prose (see `revise-moderate.md`).

## LOAD

**Measured load: ~36,800 words.** See the router for the baseline and the method.

Always, before anything else: `references/session-locks.md`.

Then, in this order:
- `references/storycraft.md` (full) — the story curriculum. Module 14 supplies the plan block.
- `references/style-guide.md` (full), `references/voice-rothfuss-mancour.md` (full)
- `references/feedback-engine.md` (full) — write *toward* it from the first line
- `state/story-bible.md` — the **spine**: STATUS, SESSION-LOCKED block, LOCKED CANON, CAST,
  WHO KNOWS WHAT, NUMBERS LEDGER. Plus the `ESTABLISHED ON THE PAGE` blocks for
  the two or three chapters adjacent to this one. Not the whole file.
- `state/geography.md`, `state/thread-ledger.md`
- `state/manuscript-log.md` — the target's neighbours and the last few entries, not all of it
- `references/outline.md` — the target entry and its neighbours
- the previous chapter's file in `manuscript/`, in full
- `feedback/notes.md` and `feedback/revisions.md`

On demand only: `references/exemplars.md` (when a `craft-check.sh` WARN cites a module and you
want a worked model), `references/editorial-read.md`, `references/economy.md`,
`state/engine-reports.md`, `references/engine-changelog.md`.

## PRESERVE / FORBID

Canon and the load-bearing destinations (see the router). Everything else is open — this is the
one mode permitted to invent events, characters, dialogue, and scenes.

## POST-FLIGHT

Full sequence below, including all state updates. This is the only mode that always writes state.

---

## BEFORE DRAFTING

The LOAD block above is the reading contract; do not also re-read whole files it scopes. What
follows is the guidance those reads carry, which the LOAD list cannot express:

- **`storycraft.md` governs the STORY where the style guide governs the SENTENCES.** Sixteen
  modules: Module 0 is the house register every other module inherits (the content covenants,
  underplay as the reaction system, friction's ceiling as a refusal, stillness as a deliverable);
  Modules 1-4A are structural and narrational law and are enforced in the plan block; 5-12 are
  technique; 13-14 are process. **Module 14 supplies the pre-draft plan block** and its eight
  lines. When any rule there collides with a session lock, the lock wins and the collision is
  logged in the engine report.
- **`references/outline.md` is read around the target only** — the entry and its neighbours, as
  direction and not a script. Follow it, widen it, or depart from it; canon and the story bible
  are the only fences.
- **The previous chapter is read in full**, for voice continuity, its last image, and the
  emotional temperature you are inheriting.
- **`feedback/` carries two different things and they are handled differently.**
  `feedback/notes.md` are notes about passages: treat each as durable author feedback per the
  protocol in `references/session-locks.md` — apply it, record the resulting convention, tell the
  author where it was filed. `feedback/revisions.md` are tracked changes, literal edits the author
  already made in the reader, each with an ORIGINAL paragraph and a REVISED version (or
  `(delete this paragraph)`). Apply those as written. **A revision is a decision already made,
  not a suggestion to weigh**; pause only if it would break canon, and then say so. If a revision
  reveals a preference that should generalize, record that convention too.

**Precedence when documents disagree:** `references/session-locks.md` > `feedback-engine.md` (the
author's own accumulated notes, each sourced) > `storycraft.md` (the story curriculum). Three
tiers, not four: `craft.md` was retired into storycraft on 2026-07-31, so there is no longer a
craft-versus-storycraft collision to adjudicate. Log any collision you do resolve.

Only then begin drafting.

---

## DRAFTING A CHAPTER

When asked to write chapter N:

**Plan first (in a scratch block, not the manuscript).** In 5–8 lines, state:
- Which of the four threads (building / apprentices / grief / undercurrent) are alive in this
  chapter. Follow the ones the story has made live here; don't force a quota. A chapter whose
  real work is atmosphere, a single relationship, or the narrator's voice is a whole chapter if
  the attention is alive.
- The chapter's anchor (season, day, place, task), its turn (the small shift) if it has one,
  and its closing image.
- Every canon fact the chapter touches, checked against the story bible.
- How this chapter relates to the outline's suggested beat — following it, widening it, or
  departing from it. Any of the three is fine; the outline is scaffolding, canon and continuity
  are not.
- Any NPC voices in play, with their one-line rule recalled from the style guide.
- The last image of the previous chapter, so you open in continuity with it.
- **The engine's PRE-DRAFT BRIEF** (see the top of `references/feedback-engine.md`): the 3–4
  engine rules this chapter's material is most at risk of breaking; which ACTIVE BLIND SEEDS
  (`state/thread-ledger.md`) the chapter touches or deliberately RESTS, and how each touched
  one stays blind (unremarked, ordinary temperature, doing a second mundane job); any [OPEN]
  question the chapter brushes that must not be foreclosed; and which signature tics the previous
  chapter leaned on, so this one varies them (the lint's adjacent-echo check is the backstop).
- **If this chapter turns on money, land, trade, or an institution:** run the **P1b ledger rules**
  (`references/feedback-engine.md`). Name the people the economics will be delivered through and the
  two or three transactions to DRAMATIZE; check that every sum respects the *reason* an earlier
  chapter gave for the state of things; and list the ordinary money routes that must be visibly
  closed before any unconventional solution is allowed to appear.
- **Three continuity locates (Tier-2 spines — the arithmetic a per-chapter check can't see):**
  1. **Locate this chapter on the CALENDAR SPINE** (story-bible NUMBERS LEDGER): its season and
     cumulative elapsed. Is the clock honest — does it move forward without skipping a season
     un-bridged or running backward? Add its row after drafting.
  2. **Locate it on the GRIEF-THAW CURVE** (`state/thread-ledger.md`): what stage of grief is
     allowed here. Confirm no beat lets go of a sealed thing (letter, chest, Arielle's name, the
     river house) before the Ch27–28 finale — mid-book grief is a threshold, never a release.
  3. **Recall the previous TWO chapters' CLOSING SHAPES** (image vs. line-of-dialogue, and their
     subject) so this close varies from both (craft dial #3 / the lint's Bookend check backstops it).
  4. **DECLARE THE CAUSAL PARENT (momentum, not just continuity).** Write the line: *this chapter
     happens because of ____.* Name a prior chapter or a named prior event. The honest connective
     between consecutive chapters should be **therefore** or **but**, almost never *and then*. If the
     only true answer is "time passed," you have found the chapter that needs work — and the cause is
     nearly always already on the page a chapter or two back, unclaimed. This line goes into the
     chapter's `engine-reports.md` block as `caused-by:`, and `chapter-check.sh` asserts it exists.
     See `references/storycraft.md` Module 2 (cause before effect).
   - **CAUSAL check, not just calendar:** ask what REASON earlier chapters gave for the current state
     of things (why the ground is poor, why a tenancy is free, why a route is closed), and confirm
     this chapter's outcome does not quietly contradict it. Each chapter can pass its own canon check
     while the contradiction lives in the causation between them.
  5. **Renames:** if a chapter file is renumbered or renamed, rewrite its rows in
     `tools/phrase-registry.txt` and `tools/vouched.txt` to the new basename, or the lint will throw
     false reuse-FAILs and stale vouches. (Bitten twice on 2026-07-15.)

**Then draft the prose.** Length follows session-lock #7 (flexible: most chapters ~3,000–5,000,
short chapters ~1,500–2,500 welcome when that is their natural size, longer when earned; never pad,
never bloat). Draft to the four CRAFT DIALS (style guide, locked 2026-07-14): play the load-bearing
beats as REAL-TIME SCENE with a high dialogue share (summary only bridges); vary the chapter
opening (not another weather/season/state-of-me start); land at least one genuine comic beat. The common shape (anchor → encounter or work → turn → settle) is
a tendency, not a mold; a chapter may be a walk, a conversation, or a long noticing, and the
narrator's attention can override the shape when it has reason to. End on an image or a single
line of dialogue — never a question to the reader, never a cliffhanger (except Ch 28, which ends
on the needle).

**Write to a file.** Save as `manuscript/NN-slug.md` (zero-padded, e.g. `07-wednesdays.md`;
the prologue is `00-prologue.md`; interludes between parts as `NNb-interlude-*.md` so they sort
into place, e.g. `07b-interlude-one.md`). Give each a small front-matter header: chapter number,
title, **POV** (either "Emlyn, first person, past tense" or "third-person limited on <name>, past
tense" for an other-POV chapter/interlude), season/day, word count, and the threads touched. Do NOT
put the title as an in-prose heading inside the scene.

**Update state (this is mandatory — continuity falls apart without it):**
- Append a recap line to `state/manuscript-log.md`: chapter number, title, one-sentence
  summary, the closing image, and any NEW facts established (so later chapters inherit them).
- Update `state/story-bible.md` with anything the chapter made newly true: a character
  learning a secret, an object moving, a relationship shifting, a building completed, a
  seed planted for later payoff. Move any "planted" seed to a "pending payoff" list with its
  target chapter.
- Update `state/geography.md` if the chapter placed, named, or moved any place, direction,
  distance, or landmark: promote the relevant [OPEN] items to [PAGE ch N], add a change-log
  line, and adjust the map if the layout changed.
- Update the story bible's **NUMBERS, AGES & DURATIONS LEDGER** with any age, date, duration, or
  relationship-length the chapter stated or newly fixed. This is the check that keeps figures
  from drifting (the flagged trap: Penworth's tenure told as "longer than I can recall" in one
  place and "thirty years" in another). Never state a figure that disagrees with the ledger.
- If you created a NEW chapter file, append its filename (in reading order) to
  `manuscript/manifest.json`. The live HTML reader (`reader.html` at the repo root) reads that
  manifest to load and list the chapters, so a new chapter is invisible to the reader until it
  is added there.

**Run the post-flight check** from `references/continuity-checklist.md` before declaring the
chapter done. If any check fails, fix the prose, not the checklist.

**Run the PROSE LINT (mandatory, mechanical):**
```
.claude/skills/write-ardenmoor/tools/prose-lint.sh manuscript/NN-slug.md
```

**Run the CRAFT CHECK (mandatory, mechanical):**
```
.claude/skills/write-ardenmoor/tools/craft-check.sh manuscript/NN-slug.md
```
Guards the chapter's SHAPE where the prose lint guards its line. Everything it emits is a WARN and
nothing it emits is automatically wrong: a WARN means look. Run it BEFORE the feedback-engine pass so
its findings are inputs to that judgment rather than an afterthought. Anything kept is justified in
the engine report, exactly as with the lint. The principles behind each check are in
`references/storycraft.md`; worked models are in `references/exemplars.md`.

**Run the SPAN CHECK at part boundaries, before delivering three or more chapters, and after ANY
renumber, split, merge, or reorder:**
```
.claude/skills/write-ardenmoor/tools/span-check.sh manuscript/2*.md
```
This is the answer to the engine's oldest documented failure: *a per-chapter pass CANNOT see
restructuring damage, because every chapter passes in isolation.* Do not skip it after a restructure.
- A **FAIL** (en dashes, an em-dash density over 2.0 per 1,000 words, memoir-frame phrases, a
  registry phrase reused outside its home chapter) must be fixed in the prose, no exceptions.
- A **WARN** means a signature tic is over its per-chapter budget: review every instance; dialogue
  and individually vetted keepers may stay, but say so in the engine report. Do not ship a WARN you
  haven't reviewed.
- Then **append the new chapter's 3–5 most distinctive coinages** to
  `tools/phrase-registry.txt` (format `NN-slug.md|phrase`) so future chapters can't dilute them by
  accidental reuse. Do NOT register deliberate cross-chapter callbacks (note them in the registry's
  comments instead).

**Run the FEEDBACK ENGINE pass (mandatory, and the last thing before delivery).** Open
`references/feedback-engine.md` and run its rubric over the finished chapter, cold, as if you were
the author holding their own accumulated preferences. This is the "additional pass before I see a
draft" the author asked for: it catches the recurring *classes* of note (stray dashes, unearned
transitions, forced epiphany, roll-call introductions, half-formed asides, inflated scale,
incoherent world logic, repeated sensory details, vague referents) and fixes them in the prose
before the draft reaches the author. Then give the author a short (2–4 line) **engine report**:
what the pass flagged, what it changed, and anything you deliberately kept and why. Do not present
a chapter as ready until this pass has run.

**Run the BLIND-SEED FALSIFICATION PROBE if the chapter planted or watered an active seed** (check
the pre-draft brief / `state/thread-ledger.md`). Spawn a fresh sub-agent given ONLY the manuscript
through this chapter — blind to the bible, outline, and payoffs — and ask it the single question in
`feedback-engine.md` P1 [PROBE]: does anything here read as deliberately set up to matter later? If
it names an active seed by its real function, the seed is telegraphing; replant it flatter and
re-probe. This is the only uncontaminated test of the [HARD] blind-seed rule, because every other
reviewer already knows the payoffs. Skip it for a chapter that rests all its seeds.

**Then archive the pass (the last drafting step).** Append one terse block for this chapter to
`state/engine-reports.md` in its schema (counts + deliberate keeps, never prose). This records
what the engine CLAIMED at ship time so a later author note can be told apart from a silent miss:
if the engine claimed a chapter clean and a note later catches a real defect, the rule was missing
or too narrow (SHARPEN it); if the engine flagged it and vouched a keep the author still disliked,
the judgment bar was wrong. It is append-only and is NOT part of the startup read; it is consulted
on demand at intake gap-analysis and whenever revising a chapter to a note.

**Run the DELIVERY RECEIPT (the final mechanical gate).** After all state wiring is done, run:
```
.claude/skills/write-ardenmoor/tools/chapter-check.sh manuscript/NN-slug.md
```
It re-runs the lint and asserts the chapter is actually plumbed in — listed in `manifest.json` (or
it is invisible to `reader.html`), has a `phrase-registry.txt` row, and has a log recap line. Any
FAIL means a wiring step was skipped; fix it before declaring the chapter done. This catches the
silent, mechanical omissions (a forgotten manifest entry) that no prose pass looks for.

---

## VOICE IN ONE BREATH

Le Guin's floor, Rothfuss's teller, Mancour's world. The prose is quiet, patient, and restrained
(Le Guin); the narrator is intimate and close, a teller who was there and has thought about it
since, who notices the exact weight of light and the silence after a word, and whose sentences
occasionally open into music (Rothfuss). And the world beneath the telling is a Spellmonger
world (Mancour): a wizard building up a real magical practice and the tower around it, magic
traded as an honest commercial craft, a cast gathering to the work. That building is much of the
book's warmth and most of its domestic plot, and it's rendered with relish. The one discipline:
commerce is always also character — every deal carries a feeling, and the practice never hardens
into a spreadsheet. Lyric attention trained on a built, working world, on a floor of restraint.
The full articulation is in `references/voice-rothfuss-mancour.md` and governs everything.

Hard voice rules (from the style guide, non-negotiable):
- **POV (Spellmonger hybrid, session-lock #1):** Emlyn's chapters are FIRST PERSON, past tense, in
  his immediate wry-warm voice (no ancient-chronicler framing). Other characters' chapters and the
  four between-part interludes are THIRD-PERSON LIMITED on one character (the hill, for interludes),
  same blended voice. Mostly Emlyn; step out only when the reader needs an away-scene. One POV per
  chapter.
- Concrete anchor for every abstraction. Name no emotion the reader can infer from behavior.
- The prose gets QUIETER at the biggest moments, not louder.
- No modern idiom, no techspeak, no fake-archaic incantations. Magic is silent craft.
- NPC voices are fixed: Jorin speaks in single freighted words; Tomas in stillness and one
  load-bearing question; Brenna considers then speaks completely; Lira in neutral ledger-facts
  and service, never stated warmth; Soren solemn and structural; Ren honest to the grain.

---

## THE FOUR THREADS (they run under the whole book; a chapter follows whichever are alive in it)

These are not quests to advance on a schedule. They are the currents the book moves through. A
chapter picks up whichever the story has made live; some chapters touch one lightly, some hold
still inside a single one.

- **Building** — the tower grows across the book (study, quarters, stable, greenhouse,
  storehouse, road, lab), a life rebuilt one structure at a time. Each structure is also a
  relationship, never a milestone on a build-order.
- **Apprentices** — Soren (informal, protective) and Ren (discovery → secrecy → formal),
  converging at the Part IV ceremony.
- **Grief** — measured only in domestic thresholds (the chest, the letter, the sticking
  drawer, the sparse bedroom). No flashbacks of Arielle. Resolves Ch 27–28.
- **Undercurrent** — the hum, Tomas's confession, the Deep Grammar readings, the three
  correspondents, Lira's letters, the Conclave's interest. Stays weather until Part IV, then
  tightens into the twist (compass points down).

---

## PACING & MONTAGE

Time moves honestly. Errands take hours; a quarry round-trip is a day; construction takes
weeks and is compressed in montage paragraphs ANCHORED by day-labels and physical progress,
never by "time passed." The undercurrent surfaces when the story's pressure calls for it, not on
a fixed count; otherwise it's a letter, a look, a pause at the forge. Let the opening chapters
especially run wide and unhurried — establish the narrator, the hill, the village, and the
texture of this rebuilt life before the plot tightens. Start broad; earn the reader's love of
the world before asking anything of them.

---

## HOW WE'LL WORK TOGETHER

The user will ask for these in ordinary language; treat them as requests, not console commands.

- **Write / draft chapter N** — run startup, plan, draft, save, update state, post-flight check.
- **Continue / next chapter** — write the next undrafted chapter in sequence.
- **Revise chapter N (with a note)** — reread that chapter and its neighbors, and read that
  chapter's block in `state/engine-reports.md` FIRST (did the engine claim it clean here — a silent
  miss to sharpen the rule for — or vouch the keep the note disputes — a judgment-bar miss?); then
  revise to the note, re-run the post-flight check, update state if facts changed.
- **Where are we / recap** — summarize the manuscript-log ledger: what's drafted, what's pending
  payoff.
- **Check continuity** — run the full checklist against the drafted chapters; report any drift.
- **Show the story so far** — show the current story-bible state.
- **Voice check chapter N** — read the chapter against the voice note; flag any line that drifts
  modern, over-explains, admires itself, or breaks a character's speech rule.
- **Run the feedback engine on chapter N** — run `references/feedback-engine.md` over an existing
  chapter as a standalone pass; report what it flags and apply the fixes. (This same pass runs
  automatically on every fresh draft before delivery.)

## FAILURE MODES TO AVOID

- Drafting before reading the previous chapter (causes voice and image discontinuity).
- Forgetting to update the story bible (later chapters then contradict this one).
- Letting stakes inflate to epic (this is village-sized cozy fantasy; implications grow, not
  volume).
- Letting the built practice harden into a spreadsheet — info-dumping the magic system,
  logistics with no relationship inside them, deals as bare mechanics. The building and the trade
  stay and are a joy; every transaction is also a character beat.
- Forcing a plot beat into a chapter that wanted to be quiet, or padding to a word count. Trust
  the still chapter when its attention is alive.
- A sentence that admires itself, or a digression that forgets to come back. Lyricism is a
  spice, not the meal.
- Explaining a silence or naming an emotion.
- Writing an Arielle flashback (she exists in objects only).
- Ending a chapter on a question or cliffhanger (except Ch 28).
- Revealing the twist's mechanism early — the compass points down only in Ch 28.
- Presenting a draft as ready without running the FEEDBACK ENGINE pass
  (`references/feedback-engine.md`) — the pre-delivery self-review that catches the recurring
  classes of author note before the author has to.
- Presenting a draft as ready without running `tools/prose-lint.sh` on it, shipping an unreviewed
  WARN, or forgetting to add the chapter's distinctive coinages to `tools/phrase-registry.txt`.
  The lint is the mechanical arm of the voice: it exists because signature constructions drift
  into mannerism by frequency, and drift is invisible from inside a draft.
