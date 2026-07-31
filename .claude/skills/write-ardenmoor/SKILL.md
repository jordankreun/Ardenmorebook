---
name: write-ardenmoor
description: >
  Draft and revise "The Tower of Ardenmoor" Book One, a cozy, slice-of-life fantasy novel in one
  blended voice: a wry, plainspoken Terry Mancour-style teller with a constant Rothfuss undertone
  throughout, on a Le Guin restraint floor, set in a Mancour-style world where a wizard builds
  up a real magical practice and the tower around it. Structured Spellmonger-style: the wizard's
  chapters are first person; other characters' chapters and the between-part interludes are
  third-person limited.
  Use when the user wants to write, draft, revise, edit, tighten, restructure, or continue the
  novel, or to repair its continuity. Trigger on "write chapter N", "draft the next chapter",
  "revise chapter N", "tighten this passage", "continue the book", or any reference to Ardenmoor
  novel chapters, the outline, or the manuscript. Routes the request to an explicit mode, holds
  continuity via a running story bible and recap ledger, and never contradicts locked canon.
---

# WRITE ARDENMOOR — BOOK ONE

**This file is a router.** It decides what kind of work is being asked for, then hands off to one
mode file. It is deliberately short: the engine's oldest failure mode is loading every rule it
owns at once and giving them all equal authority, so that a request to tighten a paragraph
inherits the requirements for drafting a chapter.

The book is **The Tower of Ardenmoor, Book One** — a cozy, slice-of-life fantasy novel, and a
novel rather than a game or a chronicle of an enterprise. The story and the teller lead; the
machinery exists only to keep the book whole across a long draft. **Book One is drafted**
(37 files, Prologue through the coda). Most work now is revision, not continuation.

## STEP 1 — ALWAYS, IN EVERY MODE

Read **`references/CARD.md`** (77 lines) and then **`references/session-locks.md`**, before
anything else. The CARD carries the house register, the covenants, the plan block, the
precedence order and where truth lives; the locks bind every mode and supersede the reference
docs wherever they differ.

## STEP 2 — THE ONE RULE ABOVE ALL

**Never contradict the established facts of the book.** Those live in the **canon appendix** in
`references/outline.md` (the fixed world, magic, people, geography) and `state/story-bible.md`
(everything earlier chapters have already made true). Hold the book's load-bearing
**destinations** too: the thesis (*ask for passage*), grief resolving in the order
letter-then-chest, the compass pointing down at the close, the Part IV apprenticeship
convergence, and the reader learning of Lira's letters before Emlyn does. When in doubt, stop and
check. A single broken fact, a character's eyes, a building's location, who knows the secret,
costs the reader their trust in the whole book.

The rest of the outline is **scaffolding, not law.** Its chapter beats are candidate scenes to
draw from, reorder, widen, merge, or replace; invent events it never lists whenever the novel
wants them. The discipline is continuity, not obedience.

## STEP 3 — SELECT A MODE, THEN LOAD ONLY WHAT IT ASKS FOR

| The request | Mode | File |
|---|---|---|
| Write / draft / continue a chapter that does not exist yet | **draft** | `modes/draft.md` |
| Fix a line, a word, a punctuation call, a small factual slip | **revise-light** | `modes/revise-light.md` |
| Rewrite, tighten, smooth, improve, or "make this move better" on existing prose | **revise-moderate** | `modes/revise-moderate.md` |
| Restructure, cut or merge scenes, re-order, add or remove a beat, fix the bones | **developmental** | `modes/developmental.md` |
| Reconcile contradictions in canon, timeline, geography, or state files | **continuity-repair** | `modes/continuity-repair.md` |

Three routing rules, and they are the point of this file:

1. **An unspecified request to change existing prose is `revise-moderate`.** Not draft.
2. **No silent escalation.** If the work turns out to need structural change, say so and get
   agreement before switching to `developmental`. A revision that quietly becomes a rewrite is
   the failure this router exists to prevent.
3. **Only `draft` and `developmental` may invent.** Every other mode is forbidden new events,
   new dialogue, new named entities, and new jokes, however much better the line might read.

State the chosen mode in one short line before starting, so a wrong route can be corrected
cheaply.

**Measured loads**, against a baseline of **69,556 words** — what the engine read at startup for
every task alike before the modes existed:

| mode | load | of baseline |
|---|---|---|
| revise-light | ~6,300 | 9% |
| continuity-repair | ~15,400 | 22% |
| developmental | ~18,400 | 26% |
| revise-moderate | ~16,900 | 24% |
| draft | ~36,800 | 53% |

Method: words in the files a mode's LOAD block names, plus an allowance for the target text and
excerpts. The largest single saving is common to every mode — `state/story-bible.md` is read as
its **spine (5,397w)** rather than in full (27,572w). Re-measure and update this table whenever a
LOAD block changes; a stale figure here is how the modes quietly drift back toward loading
everything.


## STEP 4 — READ PROFILES (what a session actually opens)

The mode says what work this is; the profile says what to read. **Every profile starts with the
CARD and the locks.**

**DRAFT** — CARD · locks · `state/story-bible.md` (spine) · `state/thread-ledger.md` ·
`state/geography.md` · the previous chapter **in full** · the outline neighbourhood ·
`feedback/notes.md` + `feedback/revisions.md`. Then **targeted `storycraft.md` sections named in
the plan block, with a reason** — not the whole curriculum.
*Full `storycraft.md` re-read is required only at a part boundary, or after a 7-day gap.*

**REVISE / PASS** — CARD · locks · the files the pass touches · the named `feedback-engine.md`
sections for the mode (see `modes/revise-moderate.md`) · relevant craft sections only.

**APPLY-FEEDBACK** — CARD · locks · `feedback/notes.md` + `feedback/revisions.md` · the touched
chapters. Nothing else: a tracked change is a decision already made, not a question to research.

## STEP 5 — THE TOOLS ARE A BACKSTOP, NEVER A TARGET

This engine has eight tools and about a dozen thresholds. Every one of them exists to catch drift
that is invisible from inside a draft. **None of them can tell whether a page is alive**, and a
book written to satisfy them would be correct and dead. That failure has a name and it is the one
to watch for: *writing toward the lint*.

Four standing licences, binding in every mode:

1. **The ear outranks the tool.** When a WARN and your judgment disagree, judgment wins. Keep the
   line, and log the disagreement in the engine report — that is what the report is for. A
   sentence kept against a tool with a stated reason is a decision; a sentence changed to silence
   a tool is damage.
2. **Every chapter may break a budget on purpose.** Deliberate excess is a technique: three
   similes in a row when the narrator is overwhelmed, a run-on when the day ran on, a coda that
   *is* the point. Name it and it stands. `tools/vouched.txt` exists for exactly this on
   cross-chapter echoes; the same principle governs everything else.
3. **Contrast is a deliverable, not slack.** Not every paragraph should be memorable. Ordinary
   competence — logistics, motion, a thing done, plain dialogue — is what makes the worked
   paragraphs land. Five lyric paragraphs in a row flatten each other, and `craft-check.sh` now
   says so. **The fix is always to add a plain paragraph, never to thin the lyric ones.**
4. **The narrator is allowed not to know.** Older Emlyn currently explains younger Emlyn with near
   total confidence: across 111,837 words the manuscript contains **two** admissions of
   uncertainty. Real memory is messier than that. *"I was not sure why."* / *"I understood that
   only later."* / *"I have never settled it."* should appear far more often than they do. This is
   the engine's one **additive** rule — everything else it knows how to ask for is subtraction.

**A note on what the thresholds are for.** They mark where a habit has become a tic *at the scale
the tool can see*. They do not describe good prose, they cannot see rhythm, and they are silent on
everything that makes a page worth reading. Treat a clean run as the absence of known drift, never
as evidence the writing is good.


## THE REPOSITORY

Paths are relative to the REPO ROOT.

- `references/` — `session-locks.md` (binding, always) · `storycraft.md` (story curriculum) ·
  `style-guide.md` (the sentences) · `voice-rothfuss-mancour.md` (the voice) ·
  `feedback-engine.md` (the author's accumulated preferences, each sourced) ·
  `continuity-checklist.md` · `outline.md` · and on demand `exemplars.md`,
  `editorial-read.md`, `economy.md`, `engine-changelog.md`
- `state/` — `story-bible.md` (what is TRUE now) · `manuscript-log.md` (recap ledger) ·
  `geography.md` · `thread-ledger.md` (setups: PAID / BANKED / OPEN) · `engine-reports.md`
  (append-only, on demand) · `structural-diagnostic.md`
- `tools/` — `prose-lint.sh` (the line) · `craft-check.sh` (the chapter's shape) ·
  `span-check.sh` (cross-chapter damage) · **`revision-diff.sh` (source vs candidate — the only
  tool that can see what a revision DID)** · `chapter-check.sh` (delivery receipt) ·
  `state-check.sh` (state freshness) · `doc-audit.sh` (retired rules still stated as live) ·
  `phrase-registry.txt` · `vouched.txt` · `superseded.txt`
- `manuscript/` — one file per chapter, `NN-slug.md`, listed in `manifest.json`
- `feedback/` — reader notes and tracked changes synced from `reader.html`

## VOICE IN ONE BREATH

Le Guin's floor, Rothfuss's teller, Mancour's world. The prose is quiet, patient, and restrained;
the narrator is intimate and close, a teller who was there and has thought about it since, who
notices the exact weight of light and the silence after a word, and whose sentences occasionally
open into music. The world beneath the telling is a wizard building a real magical practice and
the tower around it, magic traded as an honest commercial craft, a cast gathering to the work.
The one discipline: commerce is always also character. Every deal carries a feeling, and the
practice never hardens into a spreadsheet.

Non-negotiable, in every mode:
- **POV (session-lock #1):** Emlyn's chapters are FIRST PERSON, past tense, in his immediate
  wry-warm voice, with no ancient-chronicler framing. Other characters' chapters and the
  between-part interludes are THIRD-PERSON LIMITED on one character (the hill, for interludes).
  One POV per chapter.
- Concrete anchor for every abstraction. Name no emotion the reader can infer from behaviour.
- The prose gets QUIETER at the biggest moments, not louder.
- No modern idiom, no techspeak, no fake-archaic incantations. Magic is silent craft.
- NPC voices are fixed: Jorin speaks in single freighted words; Tomas in stillness and one
  load-bearing question; Brenna considers then speaks completely; Lira in neutral ledger-facts
  and service, never stated warmth; Soren solemn and structural; Ren honest to the grain.

## THE FOUR THREADS

Not quests on a schedule; the currents the book moves through. A chapter picks up whichever the
story has made live.

- **Building** — the tower grows across the book, a life rebuilt one structure at a time. Each
  structure is also a relationship, never a milestone on a build-order.
- **Apprentices** — Soren (informal, protective) and Ren (discovery, secrecy, formal), converging
  at the Part IV ceremony.
- **Grief** — measured only in domestic thresholds (the chest, the letter, the sticking drawer,
  the sparse bedroom). No flashbacks of Arielle. Resolves Ch 27–28.
- **Undercurrent** — the hum, Tomas's confession, the Deep Grammar readings, the three
  correspondents, Lira's letters, the Conclave's interest. Stays weather until Part IV.
