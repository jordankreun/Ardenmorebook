# write-ardenmoor — a Claude Code skill for drafting Book One

A self-contained skill that drafts *The Tower of Ardenmoor, Book One* one chapter at a time,
in an intimate, lyric voice — a Rothfuss-style teller on a Le Guin floor, set in a
Mancour-style built world of working, commercial magic — holding continuity across chapters via
a living story bible and recap ledger.

## Install

Drop this whole `write-ardenmoor/` folder into your Claude Code project's skills directory
(commonly `.claude/skills/` for a project-scoped skill, or your user skills directory for a
global one). Claude Code discovers it by the front-matter `name` and `description` in `SKILL.md`.

Folder layout:

```
write-ardenmoor/
  SKILL.md                     the novelist's behavior and rules
  README.md                    this file
  references/
    outline.md                 outline (a suggested path), twist, cast, canon appendix
    voice.md             prose mechanics, motifs, lexicon
    voice.md  the governing voice (Rothfuss-forward; governs everything)
    continuity-checklist.md    pre/post-flight checks per chapter
  state/
    story-bible.md             LIVING continuity record — read before, update after each chapter
    manuscript-log.md          one-line-per-chapter recap ledger
  chapters/                    the manuscript, one file per chapter (ch-NN-slug.md)
```

## Use

In Claude Code, once the skill is installed, prompt naturally:

- `Write chapter 1` — runs the startup sequence, plans, drafts the chapter (length set by the
  material), saves to `chapters/ch-01-*.md`, and updates the story bible and recap ledger.
- `Continue` / `Write the next chapter` — drafts the next undrafted chapter in sequence.
- `Revise chapter 3 — the Lira scene should stay colder` — targeted revision + state update.
- `Recap` — shows what's drafted and what payoffs are pending.
- `Check continuity` — audits drafted chapters against the bible and reports drift.
- `Bible` — prints the current story-bible state.
- `Voice check chapter 5` — flags lines that drift modern, over-explain, or break a speech rule.

## The two rules that keep it coherent

1. **Never contradict** the book's established facts — the canon appendix in `references/outline.md`
   and `state/story-bible.md` — or foreclose its load-bearing destinations (the *ask for passage*
   thesis, grief resolving letter-then-chest, the compass pointing down, the Part IV convergence,
   the Lira reader-superior device). The rest of the outline is scaffolding: widen the path freely.
2. **Always update state** after a chapter — the recap ledger and the bible are how the next
   chapter knows what's true. If you skip the update, later chapters will contradict earlier ones.

## First-session decisions

Before or during Chapter 1, lock these (the skill will ask if you haven't):
- **Ren vs. Wren** spelling — pick one, hold it.
- **Title** — *Ask for Passage* / *The Hill's Good Place* / *Foundations* / your own.
- **Twist configuration** — primary (compass points down + handwriting hook) is recommended;
  alternates are in the outline.

## Suggested workflow

Draft in order, front to back. The four seasonal parts and the ~28 chapters are a suggested
shape, not a cap — let a part run wider where the book wants the room (the opening especially).
After every 3–4 chapters, run `Check continuity` and skim the recap ledger. Insert the four
interludes at the part boundaries noted in `manuscript-log.md`. Keep the story bible honest; it
is the single source of truth the whole book leans on.
