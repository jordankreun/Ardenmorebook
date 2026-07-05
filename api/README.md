# /api — the feedback + bookmark sync backend

`sync.js` is a Vercel serverless function. When configured, the reader syncs your notes and
your reading bookmark to **this repo** so they persist, follow you across devices, and land
somewhere Claude reads automatically.

- Notes are written to `feedback/notes.json` (source of truth) and `feedback/notes.md`
  (human-readable, what Claude reads at the start of a writing session).
- Your bookmark is written to `feedback/reader-state.json`, so "your spot" is the same on
  your phone and your laptop.

Everything degrades gracefully: with no backend configured (or when reading from a plain local
server), the reader still works fully using browser storage and the **Copy for Claude** /
**Download** export.

## One-time setup (in Vercel)

1. **Create a GitHub token.** GitHub → Settings → Developer settings → *Fine-grained tokens* →
   Generate new token. Give it access to **only this repository**, with **Repository permissions →
   Contents: Read and write**. Copy the token.
2. **Add three Environment Variables** to the Vercel project (Project → Settings → Environment
   Variables):
   - `GH_TOKEN` = the fine-grained token from step 1
   - `GH_REPO` = `jordankreun/Ardenmorebook`
   - `FEEDBACK_SECRET` = a password you invent (you'll type it into the reader once)
   - *(optional)* `GH_BRANCH` = `main` (the default if omitted)
3. **Redeploy** so the function picks up the variables.
4. In the reader, open the **💬 Notes & feedback** panel → **Turn on cross-device sync**, and
   enter the same `FEEDBACK_SECRET`. That password is stored only in your browser and sent with
   each request; without it, no one can read or write your notes.

## How it behaves

- Adding, editing, or deleting a note pushes the full note set to the repo (debounced).
- Pressing the bookmark (🔖) pushes your spot.
- On load, the reader pulls the server copy and merges it with anything local (newest note wins),
  and adopts the server bookmark.

## Notes

- `.vercelignore` keeps `feedback/` (and the outline/story bible) out of the *deployed* files;
  the function reads and writes them through the GitHub API, not the deployed filesystem, so the
  book's ending is never exposed even though notes live in the repo.
- Commits from the reader are small and infrequent (one per note change / bookmark), authored by
  the token's account.
