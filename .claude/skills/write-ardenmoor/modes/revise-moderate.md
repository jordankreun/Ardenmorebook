# MODE: REVISE-MODERATE — improve existing prose without redesigning it

**This is the DEFAULT mode for any request to change existing prose.** "Rewrite this," "tighten
this," "make it move better," "this drags," "clean up chapter N" all land here unless the author
names another mode.

The job is to **remove friction, not redesign the chapter.** The scene that exists is the scene
that stays.

## LOAD

**Measured load: ~20,900 words (30% of the old always-on startup, which was 69,556 words in every mode regardless of the task).** feedback-engine (9,009w) is the bulk and is kept deliberately: it is the record of author taste, which is precisely what a revision calibrates to. The story bible is read as its
**spine** (5,370w) rather than in full (27,395w); that substitution is most of the saving
and applies to every mode.

- `references/session-locks.md` (always, first)
- `references/style-guide.md` — the primary prose authority in this mode
- `references/feedback-engine.md` — the author's accumulated preferences
- the target passage, and enough of the chapter around it to hear the rhythm it sits in
- `state/story-bible.md` — **only** the spine (SESSION-LOCKED, LOCKED CANON, CAST, NUMBERS
  LEDGER) plus the `ESTABLISHED ON THE PAGE` block for this chapter
- `state/engine-reports.md` — this chapter's block, if one exists. It tells a silent miss from a
  conscious keep, which changes what a note means.

**Do NOT load** `storycraft.md`, `craft.md`, `outline.md`, `exemplars.md`, or the drafting
curriculum. Those govern what a chapter IS. This mode is not permitted to change what a chapter
is, so loading them only invites the escalation the router forbids.

## PRESERVE

Everything that carries the story's architecture:

- scene order, and the number of scenes
- dialogue substance and each character's speech rules
- technical and economic exposition wherever it establishes a constraint, a decision, a cost, or
  a payoff. The world's logic is not padding.
- emotional turns, and the objects that carry them
- foreshadowing, and every blind seed at its current temperature
- reflective breadth, material specificity, village texture, deliberate atmosphere. **Stillness
  is a deliverable, not a defect** (storycraft Module 0). A passage is not broken because it is
  quiet.

## FORBID

- new plot events, new magical effects, new named entities, new jokes, new dialogue, new conflict
- changing the scene's outcome, or what a character knows at the end of it
- reaching for structure. If the real problem is structural, **stop and say so** rather than
  solving it here.

## WHAT THE WORK ACTUALLY IS

Movement comes from subtraction and sentence control, not added activity:

- **Duplicated interpretation is the primary target.** The book's characteristic flaw is saying a
  thing in an image and then again in a conclusion. Keep the image; cut the gloss.
- Redundant conclusions, overextended transitions, overloaded sentence tails.
- Where the source offers two strong images for one beat, keep the better one.
- Long sentences are kept **where they accumulate meaning**, and split or trimmed where they
  continue past their natural landing point. Length is not the defect; continuing after the
  landing is.
- Let concrete action and objects carry the emotion without a second explanatory paragraph.

## LENGTH — NO COMPRESSION TARGET, AND THIS IS MEASURED

There is deliberately **no compression band** in this mode, and any instruction to hit one should
be treated as a defect in the instruction.

An external brief proposed calibrating this mode to 11–16% compression. The repo holds 60
author-approved before/after pairs in `feedback/revisions.json` — the author's own tracked
changes, which are the only real evidence of what an approved revision looks like here. Measured
across the 59 rewrites:

| author's own edits | share |
|---|---|
| within ±3% of source length | **51%** |
| cut more than 10% | 25% |
| grew | 8% |
| **aggregate across all 59** | **−4.4%** |

Median ratio 0.991. **The author's demonstrated edit is substitution, not compression.** Cutting
to a percentage would systematically over-cut against the author's revealed preference.

So: compression is *one legitimate move among several*, and it happens where the prose is
genuinely duplicating itself. If a passage is already saying each thing once, the right revision
may change its wording and keep its length, or lengthen it. Report what the length did; never aim
at a number.

## POST-FLIGHT

- `tools/prose-lint.sh` on the file. Zero FAILs. Review every WARN.
- `tools/craft-check.sh` if the revision touched a whole chapter, as a shape sanity check only.
- **Do NOT update state when no facts changed.** A prose revision that alters no canon, no
  timeline, no geography, and no thread status writes nothing to `state/`. Updating state for a
  wording change is how the ledgers fill with noise.
- If a fact *did* change, you are in the wrong mode for at least part of the work; say so.
- Give the author a 2–4 line report: what you cut, what you deliberately kept, and what the word
  count did.
