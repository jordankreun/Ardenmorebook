# MODE: DEVELOPMENTAL — change what the chapter IS

**When this mode is selected:** the author has explicitly asked for structural work. Restructure,
cut or merge a scene, re-order chapters, add or remove a beat, convert summary to scene, fix the
bones.

**This mode is never entered silently.** If a revision reveals a structural problem, name it and
get agreement first. That handoff is the router's second rule and the reason these modes exist.

## LOAD

**Measured load: ~18,400 words.** See the router for the baseline and the method.

- `references/session-locks.md` (always, first)
- `references/storycraft.md` (full) — Modules 1–4A are the structural law this mode works under
- `references/storycraft.md` — §5 causality, §2 scene, the OVERRULED table
- `references/editorial-read.md` — how to read a draft as an editor rather than a rule-matcher
- `references/exemplars.md` — worked models, when a technique is at risk
- `state/story-bible.md` spine + the `ESTABLISHED ON THE PAGE` blocks for every chapter in scope
- `state/thread-ledger.md` — setups and their PAID / BANKED / OPEN state
- `state/structural-diagnostic.md` — the standing structural read
- `references/outline.md` around the affected chapters
- the affected chapters in full, and their immediate neighbours

## PRESERVE

- canon and the load-bearing destinations (router, step 2)
- the content covenants (storycraft Module 0): no on-page violence or cruelty, no sexual content,
  deaths offstage, animals safe, a child's jeopardy only ever social, no villain with a body on
  stage
- **no romance line.** Warmth stays companionate. This is a standing lock.
- every blind seed's blindness. Restructuring is the easiest way to accidentally promote a seed
  into a flagged setup.

## FORBID

- raising stakes by adding incident. Implications grow; volume does not. A "slow" chapter fixed
  by adding an event has been misread.
- solving a structural problem in a chapter the author did not put in scope
- letting a cut orphan a payoff. Check `state/thread-ledger.md` before removing anything.

## POST-FLIGHT

This mode has the heaviest post-flight in the engine, because restructuring is the one operation
per-chapter tools cannot see:

- `tools/span-check.sh` over the affected span. **Mandatory.** A per-chapter pass cannot detect
  restructuring damage by construction; every chapter passes in isolation while the span rots.
- `tools/craft-check.sh` and `tools/prose-lint.sh` on every touched file
- `tools/state-check.sh` if any file was renamed, renumbered, added, or removed
- **Renames:** rewrite the file's rows in `tools/phrase-registry.txt` and `tools/vouched.txt` to
  the new basename, or the lint throws false reuse-FAILs and stale vouches. (Bitten twice on
  2026-07-15.)
- update `state/manuscript-log.md`, `state/story-bible.md`, `state/thread-ledger.md`, and
  `manuscript/manifest.json` to match what the structure now is
- record the change and its reasoning in `state/engine-reports.md`
