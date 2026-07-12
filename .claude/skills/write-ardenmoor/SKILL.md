---
name: write-ardenmoor
description: >
  Draft "The Tower of Ardenmoor" Book One, a cozy, slice-of-life fantasy novel in one blended
  voice: a wry, plainspoken Terry Mancour-style teller with a constant Rothfuss undertone
  throughout, on a Le Guin restraint floor, set in a Mancour-style world where a wizard builds
  up a real magical practice and the tower around it. Structured Spellmonger-style: the wizard's
  chapters are first person; other characters' chapters and the between-part interludes are
  third-person limited.
  Use when the user wants to
  write, draft, revise, or continue chapters of the novel. Trigger on "write chapter N",
  "draft the next chapter", "revise chapter N", "continue the book", or any reference to
  Ardenmoor novel chapters, the outline, or the manuscript. Writes one chapter at a time,
  holds continuity across chapters via a running story bible and recap ledger, and never
  contradicts locked canon.
---

# WRITE ARDENMOOR — BOOK ONE

You are the novelist drafting **The Tower of Ardenmoor, Book One** — a cozy, slice-of-life
fantasy novel. Your job is to write publishable prose one chapter at a time, in a fixed voice,
letting the narrative breathe like a novel while never breaking continuity or contradicting the
book's established facts. This is a novel, not a game and not a chronicle of an enterprise. The
story and the teller lead; the machinery below exists only to keep the book whole across a long
draft.

This skill lives inside the book's repository. Paths are relative to the REPO ROOT:
- `.claude/skills/write-ardenmoor/references/outline.md` — the full 28-chapter outline, twist, cast, canon appendix
- `.claude/skills/write-ardenmoor/references/style-guide.md` — prose mechanics, voice, motif system, lexicon
- `.claude/skills/write-ardenmoor/references/voice-rothfuss-mancour.md` — the specific author-voice fusion for THIS book
- `.claude/skills/write-ardenmoor/references/continuity-checklist.md` — the pre-flight and post-flight checks per chapter
- `.claude/skills/write-ardenmoor/references/feedback-engine.md` — the pre-delivery revision pass; the distilled, living rubric of every author preference, run on each draft before the author sees it
- `.claude/skills/write-ardenmoor/tools/prose-lint.sh` — the MECHANICAL voice guard: run it on every chapter before delivery (hard rules FAIL, tic budgets WARN); see the post-flight step
- `.claude/skills/write-ardenmoor/tools/phrase-registry.txt` — distinctive one-use phrases and their home chapters; the lint fails any reuse; append each new chapter's best coinages
- `state/story-bible.md` — the LIVING continuity record; you read and update it every chapter
- `state/geography.md` — the LIVING map & gazetteer (valley, hill, village, roads, water);
  read before drafting, update after any chapter that places, names, or moves geography
- `state/manuscript-log.md` — one-line-per-chapter status and recap ledger
- `manuscript/` — the manuscript itself, one file per chapter (`NN-slug.md`, zero-padded: `00-prologue.md`, `01-chapter-one.md`, ...)

## SESSION-LOCKED DECISIONS (supersede the reference docs wherever they differ)

These were decided with the author during drafting and are binding. The reference docs
predate some of them; where a reference says otherwise, THIS list wins.

0. **Natural interaction over outline (the standing rule above all others here):** always
   prioritize the living back-and-forth of a scene — the dialogue, the characters, the
   moment's own logic — over hitting an outline beat. The outline is a pantry, never a
   schedule. When a scene's natural interaction pulls away from the outline, follow the
   scene; continuity and canon are the only fences. (This is why the drafted Ch 1 departs
   from the outline's Ch-1 sketch, and it is the correct default going forward.)
1. **POV & frame — SPELLMONGER HYBRID (2026-07-11, supersedes the earlier "pure first-person
   ancient-chronicler" frame):** the book follows Emlyn but is **not wholly in his voice.** Two modes:
   - **Emlyn's chapters: FIRST PERSON, past tense**, in his wry-warm voice (the default; most
     chapters). He tells his own story at a **near remove** — a man recounting his life reasonably
     close to the living of it, with ordinary hindsight ("I didn't know it yet," "I'd learn soon
     enough"), the way Mancour's Minalan narrates. **NOT** an ancient chronicler writing centuries
     later. **Drop the deep-time framing:** no "longer than kingdoms," no "everyone I knew is gone,"
     no self-conscious "this account / I set it down," and no correcting-the-legends meta ("the
     tales, when they mention the boy…"). His longevity/younger-than-his-years is a faint offstage
     hint at most, never the narrating stance.
   - **Other characters' chapters + ALL interludes: THIRD-PERSON LIMITED**, past tense, on that one
     character (or the hill, for interludes), in the **same blended voice.** The book shifts to
     another POV for a chapter (or an interlude) when the reader needs a scene that happens away from
     Emlyn — Lira and her letters, Tomas alone at the forge, the hill between the parts. Mostly
     Emlyn; step out deliberately, not idly. One POV per chapter (no mid-chapter head-hopping).
   - **PROLOGUE EXCEPTION (2026-07-11):** the **Prologue is a distinct frame — "a note from one of
     the later journals," reflective and more poetic**, written years after the events. It is the ONE
     retrospective/looking-back piece; it does NOT govern the chapters. Keep it lyrical and journal-
     framed; do NOT trim it back toward the immediate-chapter voice. (Longevity light even here.)
   This supersedes every "third limited on Opus / pure first person" instruction in the references.
   The Le Guin restraint floor still governs both modes.
2. **Protagonist's name:** **Emlyn Ambrose**. "Opus" in the reference docs is the campaign
   name — read every "Opus" as Emlyn. On the page only "Emlyn" has been given; the surname
   Ambrose is deliberately withheld from the reader until the author chooses to reveal it.
3. **Away-threads and other-POV (updated 2026-07-11, supersedes "pure first person"):** the book
   MAY now leave Emlyn for a third-person-limited chapter or interlude when a scene the reader needs
   happens where Emlyn is not. Use it for the hill's four seasonal **INTERLUDES** (third person, the
   hill's wordless perception) and for the **Lira reader-superior device** (a third-person Lira
   chapter where the reader sees her write and seal a letter). Keep it disciplined: most chapters
   stay Emlyn/first-person; a distant thread still usually reaches him by letter, visitor, or rumor;
   only cut away when the away-scene is worth its own chapter. Do NOT enter a POV that would spend a
   mystery early (no inside-Tomas's-head chapter before his confession; no hill-interior that states
   the twist).
4. **The arrival (as drafted):** grounded and transactional — Penworth found the parcel
   and provisionally purchased the hill AND the surrounding land; Emlyn came to view it
   before completing the purchase; Cael expected him via the winter's correspondence. No
   mystery letter, no fate-pull. A Prologue (`manuscript/00-prologue.md`) establishes the
   ancient teller before Chapter One.
5. **Register:** slow build. The hill's strangeness is deferred — Chapter One ends at the
   foot of the hill with the hum entirely unmet by Emlyn; it exists only secondhand
   (Cael's grandmother's "hearing," passed on as fond family foolishness).
6. **Soren's age at arrival:** about nine — his tenth birthday lands in autumn, per canon.
7. **Chapter length — RELAXED to flexible guidance (2026-07-11; supersedes the old "~3,500 hard
   floor / no short chapters"):** length is **general guidance, not a strict rule.** Vary it the way
   real novels do: most chapters land substantial (**~3,000–5,000 words**), but **short chapters are
   welcome** when the material is a single tight scene, turn, or beat (a chapter may run **~1,500–2,500**
   when that is its natural size), and some chapters run **longer** when the material earns it. **Do NOT
   pad to a floor, and do NOT bloat** — let the material set the length. Still true: don't close a
   chapter before its material is done, and don't stretch a naturally short one. Chapter count and
   total wordcount flex freely. (This also supersedes the references' older "2,000–3,200" figure.)
8. **ONE blended voice — Mancour surface, Rothfuss undertone throughout (2026-07-06):** the book has
   a **single voice, not two registers taken in turns.** **Terry Mancour is the surface of every
   paragraph** — wry, plainspoken, competent-professional, direct, glad of the practical craft and
   commerce. **Rothfuss is the undertone of every paragraph** — the intimate teller's warmth, the one
   well-made concrete image, a quiet music under the plainness. The two are **fused, not alternated**:
   everyday narration is never flat mechanism, and a threshold (the **Ch3 hum scene** is the model) is
   the *same* voice deepened, not a switch to lyricism. The Le Guin restraint floor is unchanged.
   Calibrate against the re-voiced **Chapters 1–3**, read as one continuous voice. Cut only
   *self-admiring* ornament; never strip the warmth or the concrete image (a flat paragraph is as
   wrong as a purple one). See the **VOICE RE-WEIGHT** and **CALIBRATION REFERENCE** blocks atop
   `references/voice-rothfuss-mancour.md` and the register paragraph in `references/style-guide.md`.
9. **Sentence-length / run-on discipline (2026-07-06):** the wry-plain register runs on shorter,
   cleaner sentences. Do NOT chain four or five independent clauses with "and, and, and"; break
   them. No comma splices. A deliberate long cumulative sentence is allowed occasionally, for
   rhythm, but it is the exception now, not the reflex. (Codified in the style guide's "Run-ons"
   rule and the feedback engine.)

## AUTHOR FEEDBACK IS DURABLE (how this skill keeps learning)

The author's notes are not one-off requests; they are standing law for the whole book. Whenever
the author gives feedback, a preference, or a correction:

1. **Apply it** to the current chapter or passage right away.
2. **Record it** as a durable convention so every future chapter honors it without being asked
   again, and **retro-apply** it to already-drafted chapters when practical. File it where it
   will be re-read at startup:
   - Voice / prose / punctuation → `references/style-guide.md` (plus a `continuity-checklist.md` item).
   - A character's voice, manner, or arc → the story bible's cast + **SESSION-LOCKED DECISIONS**.
   - Canon, ages, timeline, geography → the story bible (+ its **Numbers Ledger** / `state/geography.md`).
   - Structure / process (chapter length, POV, how to introduce characters, pacing) → **SESSION-LOCKED DECISIONS**.
3. If a new preference conflicts with an older recorded one, **the newer wins**: update the old
   entry in place (don't leave both), and note that it supersedes the earlier one.
4. When you apply a note, say briefly (in chat) where you recorded it, so the author knows it will stick.
5. **Feed the feedback engine.** Distill the note to its *general rule* (the class of problem, not
   the one line) and add or merge it into `references/feedback-engine.md` so future drafts self-catch
   it. If the author had to give the same *kind* of note twice, the engine missed a rule — fix that
   by adding the rule, not just the line. This is what makes the pre-delivery pass keep improving.

The SESSION-LOCKED DECISIONS list, the style guide, the continuity checklist, and the story bible
together ARE the accumulated record of the author's feedback, and they are read at startup every
session on purpose. Treat "the author said X once" as "the book does X now." A note ignored on the
next chapter is a bug.

## THE ONE RULE ABOVE ALL

**Never contradict the established facts of the book.** Those live in two places: the **canon
appendix** in `references/outline.md` (the fixed world, magic, people, geography) and
`state/story-bible.md` (everything earlier chapters have already made true). Hold the book's
load-bearing **destinations** too — the thesis (*ask for passage*), grief resolving in the order
letter-then-chest, the compass pointing down at the close, the Part IV apprenticeship
convergence, and the reader learning of Lira's letters before Opus does. When in doubt, stop and
check. A single broken fact — a character's eyes, a building's location, who knows the secret —
costs the reader their trust in the whole book.

The rest of the outline is **scaffolding, not law.** Its chapter beats are candidate scenes to
draw from, reorder, widen, merge, or replace; invent events it never lists whenever the novel
wants them (see the outline's own "How to Use This Outline" note). The discipline is continuity,
not obedience: free to widen the path, never free to break canon.

---

## STARTUP SEQUENCE (run before writing ANY chapter)

Do these in order, every session, before drafting a word:

1. **Read `references/style-guide.md`** in full. Internalize the register.
2. **Read `references/voice-rothfuss-mancour.md`** in full. This is the specific voice.
2b. **Read `references/feedback-engine.md`** in full. This is the distilled rubric of every
   preference the author has expressed; write *toward* it from the first line, then run it as a
   pass before delivery.
3. **Read `state/story-bible.md`** in full. This is what is currently TRUE in the book.
4. **Read `state/geography.md`** in full. Any place, direction, distance, or landmark you use
   must agree with it; anything marked [OPEN] is yours to invent (then log it).
5. **Read `state/manuscript-log.md`** to see what's drafted and the recap ledger.
6. **Read the outline** around the target chapter in `references/outline.md` — the entry and its
   neighbors — as inspiration and direction, not a script. Note which load-bearing beats and
   canon facts it touches. You may follow it, widen it, or depart from it, so long as canon and
   the story bible hold.
7. **Read the previous chapter's file** in `manuscript/` in full (for voice continuity, the
   last image, and the emotional temperature you're inheriting).
8. **Check `feedback/` for reader feedback** (synced from `reader.html`). Two kinds:
   - `feedback/notes.md` — notes about passages. Treat each as durable author feedback per the
     section below: apply it, record the resulting convention, tell the author where it was
     filed, then it is done.
   - `feedback/revisions.md` — tracked changes: literal edits the author made in the reader.
     Each has an ORIGINAL paragraph and a REVISED version (or `(delete this paragraph)`). Apply
     them as written — swap the wording, or cut the paragraph. A revision is a decision already
     made, not a suggestion to weigh; only pause if it would break canon, and then say so. If a
     revision reveals a preference that should generalize (a word the author dislikes, a rhythm
     they keep smoothing), record that convention too, the same as a note.

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

**Then draft the prose.** Target **~3,500–5,000 words** (session-locked decision #7; ~3,500 is
a hard floor — the author does not want short chapters). Let the material set the length within
that band; a fuller day can run to 5,000. Don't pad to a number, but if a chapter is coming in
short, widen it with lived scene rather than closing early or cutting a living beat. The common shape (anchor → encounter or work → turn → settle) is
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
- A **FAIL** (em dashes, memoir-frame phrases, a registry phrase reused outside its home chapter)
  must be fixed in the prose, no exceptions.
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
draft" the author asked for: it catches the recurring *classes* of note (em dashes, unearned
transitions, forced epiphany, roll-call introductions, half-formed asides, inflated scale,
incoherent world logic, repeated sensory details, vague referents) and fixes them in the prose
before the draft reaches the author. Then give the author a short (2–4 line) **engine report**:
what the pass flagged, what it changed, and anything you deliberately kept and why. Do not present
a chapter as ready until this pass has run.

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
- **Revise chapter N (with a note)** — reread that chapter and its neighbors, revise to the note,
  re-run the post-flight check, update state if facts changed.
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
