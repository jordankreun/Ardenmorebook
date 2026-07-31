# MODE: CONTINUITY-REPAIR — make the record agree with itself

**When this mode is selected:** something contradicts something else. A character's age, a
distance, a date, who knows a secret, a building's location, a state file that describes a
different book than `manuscript/` holds.

This mode changes **facts and records**, and touches prose only where prose states the wrong
fact. It is not a licence to improve the sentence the error was living in.

## LOAD

**Measured load: ~15,400 words.** See the router for the baseline and the method.

- `references/session-locks.md` (always, first)
- `state/story-bible.md` — the spine, plus every `ESTABLISHED ON THE PAGE` block that touches the
  disputed fact
- `state/geography.md` for anything spatial; the **NUMBERS, AGES & DURATIONS LEDGER** for anything
  numeric
- `state/manuscript-log.md` entries for the chapters involved
- `references/outline.md` canon appendix
- every manuscript passage that states the fact — find them all before changing any of them

No prose-craft docs. Repair is an accounting operation.

## PRESERVE

- every occurrence of the fact you are NOT changing. Half-applied repairs are worse than the
  original contradiction, because the next reader trusts the record.
- the prose around the fix

## FORBID

- **guessing.** If the manuscript says one thing in Ch 4 and another in Ch 19 and no authority
  settles it, do not pick. Report both, with locations, and ask.
- silently resolving a conflict a script surfaced. An unresolved contradiction goes to the author,
  not into the bible as though it were decided.
- changing canon to match a mistake, when the mistake is the thing that should change

## PRECEDENCE — WHICH SOURCE WINS

1. **The manuscript text**, for anything the reader has already been told. The book is the record.
2. **Explicit author decisions** (`references/session-locks.md`, the bible's session-locked block).
3. **Structured canon**: the bible's LOCKED CANON, NUMBERS LEDGER, `state/geography.md`.
4. **Summaries** (`manuscript-log.md` recaps, STATUS blocks) last. These are derived and are the
   most likely thing to be stale — the STATUS block was once 24 chapters behind the manuscript
   while every per-chapter check passed.

When 1 and 3 disagree, that is an author decision, not a repair. Surface it.

## POST-FLIGHT

- `tools/state-check.sh` — manifest against disk, recap coverage, and STATUS freshness
- `tools/doc-audit.sh` — no retired rule left stated as live
- `tools/prose-lint.sh` on any manuscript file touched
- update the bible, the NUMBERS LEDGER, `state/geography.md`, and the log entries **together**;
  a repair that fixes the prose and not the record will be undone by the next chapter drafted
- list every location changed, so the author can check the sweep was complete
