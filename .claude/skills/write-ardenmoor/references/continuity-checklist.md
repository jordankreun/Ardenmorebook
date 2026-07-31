# CONTINUITY CHECKLIST — human judgment only

### Everything mechanical moved to `tools/check.sh` on 2026-07-31 (39 boxes → 18). What is left
### is what a script cannot decide. If a box here could be automated, automate it and delete it.
### Reading is governed by the profile in `SKILL.md` STEP 4; planning by the plan block in
### `references/CARD.md`. Neither is repeated here.

---

## PRE-FLIGHT (before writing) — 6

- [ ] **The plan block is written** (`CARD.md`), and `caused-by:` names a real prior event rather
      than "time passed."
- [ ] I know **which of the four threads are alive here** — following the live ones, not filling a
      quota. A chapter whose real work is atmosphere or one relationship is a whole chapter.
- [ ] I have listed **every canon fact this chapter will touch** and checked each against the
      bible, the NUMBERS LEDGER, and `geography.md`. Anything `[OPEN]` stays open.
- [ ] I know the **anchor** (season, day, place, task), the **turn**, and the **closing image** —
      and the closing shape differs from the previous two chapters'.
- [ ] For every character who will speak, I have recalled their **fixed speech rule**.
- [ ] I know which **live seeds** this chapter touches or deliberately rests, and how each touched
      one stays blind.

## POST-FLIGHT (before done) — 12

- [ ] **`tools/check.sh chapter manuscript/NN-slug.md` has run, and every WARN is either fixed or
      justified in the engine report.** This box replaces sixteen mechanical ones.
- [ ] **Nothing contradicts locked canon**, and the load-bearing destinations are still reachable
      (letter-then-chest, the compass down at the close, the Part IV convergence).
- [ ] **The timeline is honest**: travel took time, construction took the weeks it takes, the
      season agrees with the previous chapter.
- [ ] **Anyone who "knows" a secret was shown learning it** (or already knew, per the bible), and
      objects are where the bible says they are.
- [ ] **POV is correct** (session-lock #1): first person for an Emlyn chapter, third-limited for
      another character or an interlude, one POV throughout.
- [ ] **Every character's dialogue obeys their speech rule**, and no line is modern, techspeak, or
      fake-archaic.
- [ ] **No abstraction without a physical anchor; no named emotion the reader could infer**; the
      biggest beat is the quietest on the page.
- [ ] **No sentence admires itself**, and any digression came back with something gained.
- [ ] **The craft is legible** — a reader learns how the working works through action, not
      lecture — and the practice has not hardened into a spreadsheet.
- [ ] **The chapter moves or deepens something real.** A quiet chapter passes this if its
      attention is alive; an empty one does not.
- [ ] **The undercurrent is weather, not storm** (until Part IV), and the twist's mechanism was
      not revealed early.
- [ ] **State is updated**: recap line, bible facts, `thread-ledger.md` for any seed planted,
      watered or paid, and `geography.md` if a place moved.

---

## WHERE THE REMOVED BOXES WENT

Twenty-one boxes were deleted, none of them lost:

| removed | now enforced by |
|---|---|
| read style guide / voice / bible / geography / previous chapter / outline | `SKILL.md` STEP 4 read profiles |
| know the anchor · the turn · threads · speech rules · seeds touched | the plan block, `CARD.md` |
| prose-lint has run · zero FAILs · registry row appended | `check.sh chapter` |
| every em dash is deliberate | `prose-lint` WARN + density FAIL |
| ends on an image, not a question | `check.sh chapter` (migrated) |
| recap line appended · chapter in manifest · front matter | `chapter-check.sh` |
| seed logged with a target chapter · payoff delivered | `state/thread-ledger.md` + `span-check` |
| length serves the material | retired — no length target exists (session-lock #7) |
| no purple paragraphs / one earned lyric sentence | `craft-check.sh` lyric-run WARN |
| anchor → work → turn → settle rhythm | plan block SHAPE line; a tendency, not a mould |

**Part-boundary review** is not here and never was: it lives in `storycraft.md` Module 14, and
`check.sh span` is its mechanical half.
