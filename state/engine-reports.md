# ENGINE REPORTS — append-only archive of the per-chapter pre-delivery pass

### Why this file exists
The engine report (pass tally + deliberate keeps) is delivered in chat and lost after one turn.
This archives what the engine CLAIMED at ship time, so intake gap-analysis can tell two things apart:
- a **silent miss** — the engine claimed a chapter clean, but an author note later caught a real
  defect → the rule was missing or too narrow; SHARPEN it (intake step 3).
- a **conscious keep** — the engine flagged it and vouched a keep, and the author still disliked it
  → the JUDGMENT BAR was wrong, not the rule.

### How to use it
- WRITE: the **last drafting step** for every chapter appends one terse block below (schema next).
  Counts + slugs, never prose. Do not narrate.
- READ: at **intake step 3 (gap analysis)** and whenever REVISING a chapter to an author note,
  read that chapter's block FIRST — did the engine claim clean here (silent miss) or vouch the keep?
- This file is NOT part of the startup read (it would bloat it). It is consulted on demand only.

### Schema (one block per chapter; keep it mechanical)
```
## [NN] slug — YYYY-MM-DD
counts: dashes=0 dialogue=NN% echoes=N(vouched=M) tics-over=[which:8, deal:7] seed-tel=0 welds=0
kept:   <one line per deliberate keep over a WARN, with the one-clause why> | none
misses: none-yet   <- change to a dated line ONLY when a later author note catches something this pass should have>
```

---

## [10] the-listener-and-the-singer — 2026-07-14
counts: dashes=0 dialogue=~20% echoes=1(Snow/keeper rested) tics-over=[which:14>7 at draft] seed-tel=1 welds=0
kept:   at draft, one "I would come to understand" read as character texture — LATER OVERTURNED by the editorial verify (refine pass 2, finding 23) and tightened; logged here as a judgment-bar correction.
misses: 2026-07-14 refine-pass-2 (editorial verify) caught, in this chapter, a forty-vs-thirty timeline error and a keeper-leaf dating error that this pre-delivery pass did NOT — CANON checks are per-chapter only and cannot see cross-chapter arithmetic. → motivates the Tier-2 CALENDAR SPINE + NUMBERS-LEDGER discipline (now added).

## [11] what-tomas-carried — 2026-07-15
counts: dashes=0 dialogue=~33% echoes=0(one accidental "was going to its evening" vs Ch10 VARIED, not vouched) tics-over=none seed-tel=0 welds=0
kept:   the Tomas callbacks "That hill," (Ch6) and "Even" (his deal-word) deliberately reused as motif — intentional payoff of the Ch5/Ch6 seeds, not accidental echo; not registered in phrase-registry (they are callbacks by design).
misses: 2026-07-15 SILENT MISS caught by the same-day review pass (editorial read): "I set this down so you will understand…" (¶9) tripped session-lock #1's banned scribe/ancient-chronicler framing. The drafting engine claimed clean AND the lint's memoir-frame FAIL list missed it — the list had 'this account' but not the 'set this/it down' variant, i.e. the pattern was scoped too narrowly. → FIXED to "I tell you all this…"; MECHANIZED: added 'set this down'/'setting this down' to the lint memoir-frame FAIL list (regression-tested; 0 false positives on Ch1–10). Also applied two review improvements (not misses): surfaced Emlyn's "I don't know" as a spoken line (scene-over-summary on the pivot beat, per editorial Note 1); trimmed the lightning-thunder tail's over-explaining clause (editorial Note 3 + blind-seed probe item 5). Blind-seed probe: strict test PASSED (no active seed decoded by function; Emlyn's private listening stayed invisible).
