# Reader feedback

This folder is where reading feedback lands so Claude can act on it. There are two kinds:
**notes** (a comment about a passage) and **tracked changes** (a direct rewrite or deletion of a
passage). Both are left from `reader.html` and, if cross-device sync is on, land here
automatically via `api/sync.js`.

## The files

- `notes.json` / `notes.md` — reader notes, grouped by chapter, each quoting the passage it
  refers to. `notes.md` is the human/Claude-readable version.
- `revisions.json` / `revisions.md` — tracked changes. Each entry has the ORIGINAL paragraph and
  the REVISED text the reader wants; `REVISED: (delete this paragraph)` means cut it entirely.
  `revisions.md` is the version to read.
- `reader-state.json` — the reading bookmark, so your spot follows you across devices.

## How it works

1. While reading (locally or on the Vercel deployment), select any passage. Two buttons appear:
   - **💬 Note** — leave a comment about the passage.
   - **✏️ Edit** — rewrite the paragraph inline (or clear it to cut the passage). The change
     shows as track changes in the text (struck-through removals, highlighted additions) and
     collects under the **Track changes** tab of the feedback panel.
2. When you want Claude to act on them, open the feedback panel (💬 in the toolbar) and either:
   - **Copy for Claude** and paste straight into chat, or
   - **Download .md**, or
   - just leave cross-device sync on, which writes everything here on its own.
3. Claude reads `feedback/*.md` at the start of a writing session:
   - **Notes** are treated as durable author feedback — applied, and any resulting convention
     recorded in the skill/story bible.
   - **Tracked changes** are applied as literal edits (swap the ORIGINAL wording for the REVISED,
     or delete the paragraph). A revision is a decision already made, not a suggestion to weigh.
   Once applied, the item has done its job.

Both kinds quote/carry the exact passage so they can be applied precisely. Nothing here is
published to the public reader deploy (the `.vercelignore` and the Pages workflow both exclude it).

## Resolving feedback (so it doesn't linger)

Every note and tracked change has a **Resolve** action in the feedback panel, and each list has a
collapsed **Resolved** section (with **Reopen**). Resolved items stay in `notes.json` /
`revisions.json` as history but are **omitted from `notes.md` / `revisions.md`**, so the files
Claude reads at session start only ever show *open* feedback. The toolbar badge counts open items
only.

**Tracked changes verify themselves.** Because the reader loads the manuscript live from GitHub,
on every load it checks each open tracked change against the current text: if the change's
original paragraph is no longer present (i.e. the edit was applied), the change is **auto-resolved**
and tagged **✓ applied**. So once Claude pushes an edit to `main`, the next time the reader loads
that change drops out of the open list on its own. Notes can't be auto-verified (they're freeform),
so they use the manual **Resolve** button.
