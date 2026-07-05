# Reader feedback

This folder is where reading notes land so Claude can act on them.

## How it works

1. While reading in `reader.html` (locally, or on the Vercel/Pages deployment), select any
   passage and tap **💬 Add note** to leave a comment. Notes are saved in your browser and shown
   in the **Notes & feedback** panel (the 💬 button in the toolbar).
2. When you want Claude to act on them, open that panel and either:
   - **Copy for Claude** and paste the result straight into your chat, or
   - **Download .md** and drop the file into this folder (e.g. `feedback/reader-notes.md`) and
     push it.
3. Claude reads any `feedback/*.md` at the start of a writing session, treats each note as
   durable author feedback (applies it, records the resulting convention in the skill/story
   bible, and confirms where it was filed), then the note has done its job.

Notes are grouped by chapter and quote the passage they refer to, so they can be applied
precisely. Nothing here is published to the public reader deploy (the `.vercelignore` and the
Pages workflow both exclude it).
