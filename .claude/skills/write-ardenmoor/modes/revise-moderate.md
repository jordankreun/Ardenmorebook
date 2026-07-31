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

## LENGTH — TWO SCOPED EXPECTATIONS, NOT ONE BAND

Compression is an **outcome of removing duplicated meaning, never a target to hit.** But how much
it should come to depends entirely on the unit of work, and getting that wrong is the most
expensive mistake available in this mode.

Both numbers below are measured from the author's own approved work.

| unit of work | expect | evidence |
|---|---|---|
| a paragraph or a passage | **≈ neutral** (±3%) | 60 approved tracked changes, `feedback/revisions.json`: aggregate −4.4%, median ratio 0.991, 51% within ±3%, 8% *grew* |
| a whole chapter | **11–16%** | the golden fixture: Prologue −18.1%, Ch 1 −13.3%, −13.8% together |

They do not conflict. A paragraph-level edit is **substitution** — the author swaps wording and
keeps length. A chapter-level pass is **compression**, because duplicated interpretation is only
visible across a chapter. **Applying the chapter number to a paragraph is over-cutting**, and it
is the specific failure this table exists to prevent.

If a passage already says each thing once, the right revision may keep its length or lengthen it.
Report what the length did. Never cut to reach a number, and never treat a target as a reason to
remove necessary material.

## THE STYLE REFERENCE — READ IT FOR THIS MODE

`references/golden/prologue-ch1/` holds the author's approved source/revision pair, a measured
`delta.md`, and **`moderate-revision-style.docx`, the author's own operational style reference,
which governs this mode wherever it and this file disagree.** Its §9 carries three worked
examples, including a deliberate *non*-example: a reflective passage left untouched, because
reflection that adds meaning the gesture does not contain is not a compression target.

Its governing sentence, and the best single test available here:

> The revision should feel as though the original author stopped one sentence earlier in the
> places where the prose was over-explaining, not as though a different author rewrote the
> chapter.

Its named shortcuts, all forbidden: adding action to make a chapter move; adding dialogue or
comedy to satisfy a quota; stripping technical exposition; converting the prose to short modern
sentences; cutting a digression merely for being one; adding a magical hint or plot hook;
explaining a strong blunt line afterward.

## THE HARD BOUNDARY — WHAT THE FIXTURE MUST NOT TEACH

The approved revision added one beat that is **not** in its source: the floorboards and the basin
water, in Ch 1. The style doc flags it itself as *"a developmental choice, not a normal feature of
the revision style."*

**Do not generalize from it.** A moderate revision that invents a beat, a hint, or a piece of
foreshadowing has left this mode without saying so, which is exactly what the router forbids. If
a passage genuinely needs one, stop and say so.

## OUTPUT CONTRACT

Return, in this order: a short diagnosis of what is slowing the passage; the revised passage; a
change log separating cuts from anything developmental that was explicitly requested; and a
continuity note for anything that cannot be resolved from the source.

## POST-FLIGHT

- `tools/prose-lint.sh` on the file. Zero FAILs. Review every WARN.
- `tools/craft-check.sh` if the revision touched a whole chapter, as a shape sanity check only.
- **Do NOT update state when no facts changed.** A prose revision that alters no canon, no
  timeline, no geography, and no thread status writes nothing to `state/`. Updating state for a
  wording change is how the ledgers fill with noise.
- If a fact *did* change, you are in the wrong mode for at least part of the work; say so.
- Give the author a 2–4 line report: what you cut, what you deliberately kept, and what the word
  count did.
