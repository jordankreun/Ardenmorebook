# MODE: REVISE-LIGHT — a line, a word, a mark

**When this mode is selected:** the request names a specific small thing. A word choice, a
punctuation call, a repeated phrase, a wrong name or number, a sentence that trips.

If the request is "make this passage better" rather than "fix this thing," it is
`revise-moderate`, not this mode.

## LOAD

**Measured load: ~6,300 words.** See the router for the baseline and the method.

- `references/session-locks.md` (always, first)
- `references/style-guide.md` — the punctuation and register authority
- the target lines, plus the paragraphs on either side so the fix does not break a rhythm or
  create an echo
- `state/story-bible.md` — only if the fix touches a fact: the CAST entry, the NUMBERS LEDGER, or
  the relevant `ESTABLISHED ON THE PAGE` block

Nothing else. This mode's whole value is that it is cheap.

## PRESERVE

Everything except the named thing. The surrounding prose is not an invitation.

## FORBID

- touching any sentence the request did not point at, unless the fix makes it ungrammatical
- "while I was in there" improvements. These are how a one-word fix becomes an unreviewed rewrite
  the author never asked for and cannot easily diff.
- anything in `revise-moderate`'s FORBID list, which applies here too

## POST-FLIGHT

- `tools/prose-lint.sh` on the file. Zero FAILs.
- Check the fix did not create a **registry collision** (`tools/phrase-registry.txt`) or an
  adjacent-chapter echo. Substituting a word is the most common way to do this accidentally.
- No state update unless a fact changed.
- One line to the author: what changed, and nothing else.
