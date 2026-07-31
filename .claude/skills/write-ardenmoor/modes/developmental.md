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

## THE FOUR STRUCTURAL AUDITS

Run these before proposing any change. Do not begin with sentences.

**1. Scene map.** One row per scene: chapter · scene · immediate objective · obstacle · change ·
cost · new information · thematic function · does a coda explain it afterwards · necessity
(essential / combinable / compressible / removable). Flag every scene with no obstacle, change,
cost, or revelation.

*Do not automatically cut a quiet scene.* A quiet scene is necessary when it alters a
relationship, establishes a material condition needed later, creates contrast before disruption,
reveals character through action, introduces an object that will accrue meaning, or marks a
credible stage in Emlyn's recovery. Compress only scenes that repeat an already-established
pattern of welcome, competence, or community forming.

**2. Chapter pressure.** For each chapter name the unresolved question entering it, the new
complication, the choice made, and the consequence carried forward. A chapter must not merely
end in completion; it leaves behind a new obligation, a risk, a disagreement, a concealed fact, a
changed expectation, an unpaid cost, a relationship made harder, or a mystery made narrower and
more dangerous.

**3. Fallibility.** Find every scene where Emlyn judges, advises, designs, interprets a person,
decides for the community, withholds, or avoids a confrontation. Classify each: correct without
cost · correct with cost · partly correct · wrong but harmless · **wrong with consequence** ·
morally compromised · unresolved.

The book needs at least one major instance where Emlyn is substantively wrong **and another
person carries part of the cost** — growing from an established flaw (secrecy, paternalism,
arrogance disguised as patience, refusal to ask for help, treating silence as consent,
withholding painful information "for their protection", mistaking careful observation for
intimacy). Never manufacture this by having him ignore something obvious. The error must be
intelligent, understandable, and damaging. It must not be repaired by one good conversation.

Separately: for every harsh thing older Emlyn says about younger Emlyn, locate the scene that
proves it. Where none exists, either add the evidence, soften the claim, or reframe it as the
narrator's excessive self-condemnation — which is itself a legitimate and interesting choice.

**4. Success-cost.** Every major project carries at least one cost: money, time, trust, safety,
reputation, ecological disturbance, political attention, deeper dependence on Emlyn, a new
obligation, or the exposure of something concealed. Watch for the middle-book pattern — problem,
observation, consult a skilled person, humane solution, success, bonds deepen, meaning explained.
Break it by letting the threads interfere: a humane decision that causes a financial crisis, an
invention that creates a commercial problem, a discovery that makes building more dangerous, a
public promise that is hard to keep, a tenant who refuses the solution, Penworth's prudence
against a local obligation.

## ENSEMBLE AND SOREN

**Differentiate the cast.** Too many supporting characters are competent, restrained, observant,
dryly funny and quietly generous. Keep their professions and roles; vary speech rhythm, social
strategy (confront / placate / joke / withdraw / bargain / lecture / perform), relationship to
their work, relationship to Emlyn, a behaviourally visible flaw, a desire independent of him, a
boundary they hold, and something they get wrong. At least one recurring character should be
verbally expansive, socially inelegant, ambitious, or skeptical of Emlyn's methods for *rational*
reasons. Community includes inconvenience, faction, gossip and competing interests.

**Do not make Ardenmoor hostile.** Friction without erasing mutual dependence. Hostility is not
in this palette (Module 0: friction's ceiling is a refusal).

**Soren is a child, not an oracle.** Not every unusual behaviour is hidden wisdom. Sometimes
silence is fear, observation is suspicion, refusal is stubbornness, touching the ground is
curiosity, competence is a bid for approval. Give him selfishness, a petty resentment, a bad lie,
an impulsive risk, jealousy, a private interest unrelated to magic or Emlyn, a refusal that is
not secretly wise, a wish to impress, and a conflict between loyalty to Cael and to Emlyn. He
must not become Emlyn's emotional salvation.

**The covenants still bind** (Module 0). Soren's "impulsive risk" is a *social* risk, never
physical jeopardy; no cruelty is added to manufacture conflict; no villain acquires a body.

## ONE STANDING STRUCTURAL QUESTION

*(This section briefly held two. The destiny model was recorded here as unresolved on 2026-07-31
and resolved the same day, once the passages were actually read: **the hill waited for a question,
not for a man**, and the book says so in five places. It needs no structural work. The full
evidence is in the bible's OPEN QUESTIONS entry, along with the standing Book Two rule that the
hill may never be revealed to have waited for Emlyn personally.)*

**The ending enacts too little.** Book One closes on revelation — the chest, the letter, the
needle pointing down — with the response deferred. The revelation may stay unresolved; **Emlyn's
answer to it should not.** One decisive present-tense action belongs before the close: telling
someone what the needle showed, refusing to go down alone, bringing Soren or Tomas into knowledge
he would once have kept, committing publicly to the tower, or taking the first physical step
toward the passage. Then a brief scene in which he behaves unlike the man in Chapter One. The arc
should not rest on older Emlyn asserting that he changed.

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
