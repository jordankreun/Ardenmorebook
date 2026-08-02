# THE FEEDBACK ENGINE — a pre-delivery revision pass

**Purpose.** Every note the author has ever given points at a *class* of problem, not just the one
line it landed on. This file distills those into a rubric the draft is audited against **before
the author ever sees it**, so the same kinds of issues get caught and fixed on the way out instead
of coming back as feedback. It is the "additional pass based on my preferences" the author asked
for.

This is a **living document.** Every new piece of author feedback gets distilled into its
generalized form and added or merged here (see "Keeping the engine learning" at the bottom). The
rubric only gets sharper.

---

## THE PRE-DRAFT BRIEF (run BEFORE drafting — the engine's forward pass)

> **SCOPE: `modes/draft.md` only.** This section plans a chapter that does not exist yet. It is
> not loaded by the revision modes and must not be run against finished prose.

The audit below catches failures after they're written; this step prevents them from being written.
As part of the chapter plan (the scratch block in `modes/draft.md`), assemble a short **brief** from this file
and the story bible, and draft against it:

1. **Rules most at risk for THIS chapter's material.** A build chapter → world-logic, spreadsheet
   drift, scale; an emotional chapter → forced epiphany, named emotions, purple; a new-character
   chapter → roll-call, significance tags; a seed-touching chapter → invisible setups. Name the
   3–4 rules this chapter is most likely to break, so they're live while writing, not after.
2. **ACTIVE BLIND SEEDS in play.** From the `state/thread-ledger.md`: which live seeds does this
   chapter touch (or deliberately rest)? For each, note HOW it stays blind this time. Seeds the
   chapter doesn't touch are also a decision — write it down ("resting Snow/barn this chapter").
3. **OPEN questions that must not close.** List anything marked [OPEN] the chapter brushes
   against (the two grandmothers, unnamed proper names) so no line forecloses them by accident.
4. **Tic exposure.** Note which signature constructions the previous chapter leaned on, so this
   one varies instead of echoing (the lint's echo check is the backstop, not the plan).
5. **If the chapter's subject is money, land, trade or an institution (P1b): name the PEOPLE it will
   be delivered through, and which two or three transactions will be DRAMATIZED as scenes.** Also
   name what the earlier chapters have already established as the *reason* for the state of things,
   so the arithmetic respects it, and list which ordinary routes to money must be visibly closed
   before any unconventional solution appears. A ledger chapter that cannot name its people in the
   brief will be written as a catalogue.

Keep the brief to ~6 lines. It is the difference between an engine that grades homework and an
engine that teaches the writing.

---

## HOW TO RUN THE PASS

> **SCOPE: drafting and developmental work.** The sequence below assumes a chapter has just been
> drafted and state updated. Revision modes run their own POST-FLIGHT; see `modes/`.

Run this **after** the chapter is drafted and state is updated, and **before** presenting the draft
or telling the author it's ready. It is a distinct pass, not a vibe: reread the finished chapter
**cold, as if you were the author holding this rubric**, and for each rule below scan the whole
chapter for violations.

1. Go rule by rule. For each, look for the failure pattern across the entire chapter (not just
   where you remember writing something).
2. When a rule fires, **fix it in the prose in place** using the rule's fix pattern. Re-check the
   surrounding lines for the same class of issue (problems cluster).
3. Keep a short internal tally of what fired and what you changed.
4. Re-run the two mechanical hard-fails (P0) one last time after edits, because fixes can
   introduce a stray dash or drop the word count.
5. Deliver, then give the author a 2–4 line **engine report**: what the pass flagged, what it
   changed, and anything you deliberately left (with why). Short. It proves the pass ran and
   surfaces judgment calls without making the author re-review the whole chapter. **Then archive it:**
   as the last drafting step, append the terse block (counts + kept + misses) to
   `state/engine-reports.md`. That archive is the read side of intake step 3 below — without it, a
   silent miss is indistinguishable from a conscious keep after the turn ends.

For a long or high-stakes chapter, run the pass with genuine fresh eyes — ideally as a separate
reviewer perspective (a sub-agent reading the chapter against this file and returning a flagged
list), then apply the fixes. Redundancy here is cheap; a shipped violation is not.

**Read this rubric as an EDITOR, not a rule-matcher.** This file is the enumerated *what*; how to
read is `references/editorial-read.md` — the developmental judgment a checklist cannot reach (does a
scene earn its place, is the turn earned, where does the reader disengage) plus the persona and
protocol for the cold read and the **adversarial verification**. Both the workflow "read" phase
(cold developmental read) and the "verify" phase (adversarial vet of each finding) run as that
editor: skeptical of taste and of the rubber-stamp alike, and — when confirming a defect — owing the
author the editor's own best fix in the author's voice, not merely a yes/no on the finder's note.
Any cold-read or verifier sub-agent prompt must invoke that persona.

**Severity:**
- **[HARD]** — must be fixed before delivery, no exceptions. A shipped [HARD] is a bug.
- **[CRAFT]** — fix unless there's a real reason not to; if you keep it, say so in the report.
- **[CHECK]** — verify; usually a quick confirmation, occasionally a catch.

---

## P0 — MECHANICAL HARD-FAILS (scan first and last)

- **[CRAFT] The em dash is permitted, deliberately (author reversal, 2026-07-31).** The old rule
  was zero-tolerance; it is retired. What replaces it is not permission to reach for the mark, but
  a requirement to *choose* it: `tools/prose-lint.sh` WARNs on every occurrence so each one is
  looked at, and FAILs above 2.0 per 1,000 words, where the mark stops reading as a choice and
  starts reading as the machine tic the ban existed to prevent. Default still favors the comma,
  the period, the semicolon, the colon, and parentheses, varied so no one mark becomes a tic.
  This is NOT retroactive: finished prose is not to be re-punctuated to add dashes. The manuscript
  held zero until the author's approved Prologue+Ch 1 revision (2026-07-31) introduced 6, all in
  Ch 1, at 1.2 per 1,000 words — the worked example of what deliberate use looks like. *Source: "never use em dash, make writing feel human" (2026-07-11), reversed by the
  author 2026-07-31.*
- **[HARD] No en dashes (–) and no ` -- `.** The reversal above named the em dash only; these stay
  a prose-lint FAIL, and ` -- ` is nearly always a mistyped em dash.
- **[CRAFT] Length fits the material (RELAXED — no hard floor).** Vary chapter length like real
  novels: most chapters substantial (~3,000–5,000), **short chapters (~1,500–2,500) are fine** for a
  single tight scene/turn/beat, and some run longer when earned. **Never pad to a number and never
  bloat** — let the material decide. Don't close a chapter before its material is done; don't stretch a
  naturally short one. *Source: session-lock #7, relaxed 2026-07-11 ("relax the chapter legs… short
  chapters and slightly longer chapters… look at how other authors vary").* (The old ~3,500 hard floor
  is retired.)
- **[HARD] No contradiction of locked canon** or of anything already true in `state/`. Cross-check
  every name, age, date, place, direction, distance, relationship-length, and who-knows-what
  against the story bible, geography, and NUMBERS LEDGER. *Source: the one rule above all.*
- **[HARD] Every sentence parses.** No sentence whose meaning you cannot state plainly. Read any
  long/inverted sentence aloud; if it doesn't land cleanly, rewrite it. *Source: prologue "last
  sentence doesn't make sense"; Ch1 "and in the matter of what I ought to want — unclear."*
- **[CRAFT] No run-ons or comma splices.** Scan for any sentence chaining **four or more
  independent clauses with "and, and, and"** and split it; scan for **comma splices** (two
  independent clauses joined by a bare comma) and repunctuate. One deliberate long cumulative
  sentence per scene at most, and only when it reads as a controlled build. Favor the period.
  *Source: the run-on pass; session-lock #9.*
- **[CRAFT] Break the action-plus-aphorism weld.** When a sentence states a specific action or
  observation and then welds a GENERAL reflection or aphorism onto it with "and" or a semicolon,
  split it: end the concrete clause, and start the reflection as its OWN sentence so the aphorism
  lands. (Model: "There was no reason on earth to hurry, and I have never much trusted a man who
  hurries uphill" → "There was no reason on earth to hurry. I have never much trusted a man who
  hurries uphill.") Signature welds: `…, and I have (never / always / come to / learned / found)…`;
  `…, and a man (does / has to / cannot / ought / who…) …`; `…, and it is the (nearest / only /
  way)…`. Test: is the tail a standalone truth about people, life, or the self that would land
  harder alone? Then break it. Do NOT split a deliberate cumulative CLIMAX built as one sentence for
  cadence (the prologue's close; the "Good" payoff) or a genuine parallel TRIAD ("I was tired, and
  it was spring, and a man has to be sent somewhere"). The lint surfaces the weld markers as a
  review-list. *Source: author note 2026-07-14 ("sentences like this that could read better broken
  up into two… start sentence 2 at I have never"); applied across Ch 2–10 (11 breaks).*

## P1 — BELIEVABILITY & GROUNDEDNESS (the author's most frequent objection)

- **[CRAFT] No fate, no coincidence, no destiny-pull.** Meetings are *arranged*, purchases are
  *transacted*, the protagonist has *reasons*. If something happens because the plot needed it,
  reground it in ordinary cause (Penworth arranged it; a letter came; Cael expected him). *Source:
  "meeting arranged with Cael not random… more believable"; the grounded-arrival session-lock.*
- **[CRAFT] Names and coinages must be believable, never on-the-nose.** No placeholder-feeling
  names, no name that states its own theme (rejected: "Opus," surname "Warden"). If a name winks at
  its function, change it. *Source: "Opus not believable"; "Warden is too on the nose."*
- **[CRAFT] Don't telegraph the throughline.** The book's deep subject (asking the ground; the
  hill) is felt, not announced. No line that reaches out to tell the reader "this will matter."
  *Source: "less explicit on the warder through line… slower build."*
- **[HARD] Setups are invisible — plant seeds BLIND.** When planting anything meant to pay off
  later (an object, an unease, a choice that will go wrong, a pause, a look), the narration must
  not change temperature around it. Banned at a seed: hindsight flags ("I would learn later," "I
  did not see it coming," "I have the key now," "that comes later," "not for the last time");
  confessional framing ("I had better own to it here," "I mention him now because…"); self-deception
  flags ("I told myself… I believed it"); and any closing moral that names the lesson ("the cheap
  thing and the sound thing were not always the same"). Render the seed as ordinary life — precise,
  deniable, unremarked — and close its topic the way life closes topics: a joke, a shrug, the next
  task ("A man's hammer is his own affair"). Ordinary Mancour hindsight stays legal as *general
  texture*, but never attached to a planted seed; attached, it converts the seed into a signpost.
  **Test: could a first-time reader tell the paragraph is load-bearing? If yes, replant.** (This is
  the third member of the telegraph family — throughline, character tags, now seeds — hence [HARD].)
  *Source: "Make it not obvious it's a set up" (2026-07-13, the wood-first seeding); retro-swept
  Ch 5 (Tomas's hammer), Ch 6 (the grandmothers question), Ch 9 (barn/cabin).*
- **[CRAFT] Water a blind seed rarely, and never the same way twice.** Frequency is also a
  telegraph: a detail that recurs every chapter announces itself no matter how quietly each
  instance is written. A live seed (Snow's unease, the hum's hours, Lira's letters) gets touched at
  most every few chapters, in a *varied* form (a different symptom, a different witness, a
  different register), at ordinary narrative temperature, and is usually doing some second, mundane
  job in the scene (the barn beat is about money; the pause is about a commission). Between
  waterings a seed RESTS, and resting is the default. Check the pre-draft brief: if the previous
  chapter touched a seed, this one almost certainly shouldn't. *Source: forward-robustness review,
  2026-07-13 (corollary of "Setups are invisible").*
- **[PROBE] The blind-seed falsification instrument (run it when the chapter plants or waters an
  active seed).** The "could a first-time reader tell?" test above has a built-in flaw: *every*
  reviewer this engine can field already knows the book, so none of them can honestly answer it —
  they read the seed as load-bearing because they know it is. The only uncontaminated instrument is
  a **fresh, bible-blind sub-agent** who has never seen the payoff. Protocol:
  1. Spawn a sub-agent given **only the manuscript through this chapter** (no bible, no outline, no
     the thread ledger, no pre-draft brief — genuinely blind to what pays off later).
  2. Ask it exactly one question: *"Reading this as a first-time reader, is anything here being
     deliberately set up to matter later? List anything that reads as planted, and say why."*
  3. **Cross-check its list against the `state/thread-ledger.md`.** If it names an active blind seed
     **by its real function** (not just "this object was mentioned" — it must clock the *setup*),
     that seed FAILED the [HARD] test: it is telegraphing. Replant it flatter and re-probe.
     A seed the blind reader files as ordinary life has passed. Log a fail + the replant in the
     changelog.
  - **Keep it to the one narrow question.** Do NOT bolt on the four-question "where did you skim /
    what confused you / what did you expect that never came / what felt like a promise" reader that
    was proposed alongside this: an LLM confabulates a skim-map, the editor's read already owns
    disengagement, and "what did you expect that never came" is an engine for flagging exactly the
    things the book withholds ON PURPOSE — the deferred surname, the Part-IV twist, the sealed
    grief. That reader would generate false alarms against the book's deliberate structure. The
    blind-seed probe asks only whether a seed reads as a seed, which is the one thing no knowing
    reviewer can judge. *Source: engine roadmap Tier 3 (2026-07-15), the narrow half of the naive-reader idea.*
- **[CRAFT] No forced epiphany or spiritual beat.** Big moments stay measured. When the protagonist
  encounters the numinous, the honest register is often "neither disappointed nor blown away," a
  view and a quiet, not a revelation. The prose gets *quieter* at the largest moments. *Source: Ch2
  crown, "make it more about how I didn't have a huge moment… neither disappointed nor blown away."*
- **[CRAFT] The protagonist is a skeptic, not a mystic.** He meets local wonder-talk as
  superstition or ordinary explanation first (bad masonry, a failed wall grown into a legend); any
  belief is earned slowly and privately. *Source: Ch2, "have it heard as more of a challenge…
  village superstition and bad building."*

## P1b — MONEY, LAND & INSTITUTIONS (the ledger rules; added 2026-07-15 from the tenancy arc)

> **SCOPE: drafting and developmental work.** This section directs which transactions to
> DRAMATIZE and which people to deliver the economics through — that is invention, and
> `revise-moderate` and `revise-light` forbid it. Use it to judge economics already on the page;
> never to add a scene during a revision.

This book runs on commerce, and the commerce is a lot of its pleasure. These rules exist because a
book about a man building an enterprise can drift into being *about the enterprise*, and because the
author has repeatedly (and rightly) pushed the arithmetic to be harder and more honest.

- **[HARD] Every sum must be causally consistent with its own stated reason.** If a chapter explains
  WHY a thing is so (rough ground repays the third year, not the first), a later chapter may not
  quietly rely on the opposite (a bumper first harvest). This is the failure the calendar/numbers
  spine cannot see: each chapter passes alone; the contradiction lives in the causation BETWEEN them.
  *Check at pre-draft: what reason did an earlier chapter give, and does my outcome respect it?*
  *Source: the author's question "why is the Wrays' first year free?" (2026-07-15), which exposed
  exactly this between Ch 9 and Ch 15.*
- **[HARD] Money is never solved by convenience.** No windfalls, no round numbers that happen to fit,
  no unexplained slack. When a sum works out, show the parts. When it doesn't, the shortfall drives
  the next chapter. Emlyn ends the tenancy arc on **eleven silver**, and that figure is load-bearing.
- **[CRAFT] Close the doors on the page.** Before a character solves a money problem an unexpected way,
  the reader must have watched the ordinary routes close, by name (the hill twice-charged; the patents
  already leant on; the lamps are bread not a wage bill; the crop and the house sold and spent). A
  solution the reader could have thought of first is not a solution; it is a plot hole they are being
  asked to ignore.
- **[CRAFT] Pay in kind when there is no coin.** This valley is cash-poor and rich in everything else.
  The most characterful deals are barter of skill, time, land, reprieve, and future work (three years
  of footings; a season at the forge; first refusal on a crop; a lifetime's firewood; rent-free years
  instead of an outlay). *Craft-debt is a different kind of debt, and it binds people together where
  cash would separate them.*
- **[CRAFT] Both sides must win, and the narrator must be able to say how.** Every bargain in this
  book is legible from the other party's side (Jorin gets a winter's work AND three years of certain
  ground; Kellard gets something to boast of; Hal gets to be a tenant rather than an object of pity).
  A deal the other party would not take is a deal the reader will not believe.
- **[HARD] PEOPLE FIRST, LEDGER SECOND — the anti-dryness rule.** In any chapter whose subject is
  money, land, or an institution, the **economics must be delivered THROUGH people in scenes**, not
  catalogued. Test: could this section be a table? If yes, rewrite it as encounters. A named person
  standing in their own kitchen while the figure is read out is worth ten lines of accounting.
  Concretely: **dramatize at least the two or three transactions that cost somebody something**, and
  give each of them a want, a voice, and a piece of dignity to defend. *Source: the Ch 16 audit
  (2026-07-15) — the first draft ran 21% dialogue against 56% and 44% in its neighbours because the
  five tenants were listed rather than met; rewritten to 30% and the chapter came alive.*
- **[CRAFT] Owning things costs the owner something moral.** Land is people. When consolidation,
  eviction, or a renegotiation happens, at least one person must be genuinely worse served by the
  right decision, and the narrator must NOT resolve his own discomfort about it (the Hask beat).
  Refuse the tidy absolution; leave the two sentences that will not sit together.
- **[CHECK] The institutional detail is domestic.** Patents, rent rolls, escrow, arrears, tranches and
  schedules are welcome and are part of the world's texture, but each one arrives attached to a person
  and a feeling: a widow's saucer of coin, eleven fleeces in a loft, a boy going red at a window.

## P1c — THE AUTHOR'S LINE-EDIT FINGERPRINT (from the 2026-07-28 reader pass on Ch 0–3; 26 tracked changes analysed)
These patterns were extracted from the author's own hand-edits. They outrank house style where they
conflict. Check every draft and every editing pass against them.

- **[HARD] CUT THE EXPLANATORY TAIL.** When an image is followed by a clause explaining what the
  image means ("…the smell of a place people go to when they are frightened for someone they
  love"), cut the tail. The image stands alone. This is the author's most consistent edit.
- **[HARD] NO FORESHADOW FLAGS.** "I did not know then…", "that came later, and I will get to it",
  "nor that the two of them had been holding a conversation" — all cut on sight. The narrator may
  have hindsight; he may not ADVERTISE it. Let later chapters land unannounced.
- **[HARD] DE-AGE THE CAST.** Cael is late-50s and vigorous: no bad knees, no "the old man's knees
  at last willing", "a fair way yet from invalid," not "from grey." Jorin has "just the beginning
  of grey," and is "a big man," never "a big grey man." No infirmity props on anyone the author
  has not explicitly aged. Age lives in judgment and standing, not joints.
- **[HARD] POV KNOWLEDGE DISCIPLINE.** The narrator may not use knowledge before he acquires it
  ("his grandson" before anyone says so — write "the young boy"), and may not explain to a
  character what that character already knows (Penworth negotiated with Cael; Emlyn's letter does
  not introduce "an honest man named Cael," just "an honest man").
- **[CRAFT] ADJECTIVES TRAVEL IN PAIRS AT MOST.** "Clear and crisp," not "clear and cold and
  washed." A triple stack is a flag.
- **[CRAFT] HEDGE THE DEAD.** Characters do not speak for the dead with certainty: "someone I
  suspect she'd have approved of." Certainty about a dead person's mind is presumption; the
  author softens it every time.
- **[CRAFT] INSTITUTIONS OVER MYTH.** "The village sent me," "I lead our parish meetings on the
  rare occasion they're held" — not "the families sent the oldest man they had." The valley has
  ordinary civic machinery, rendered dryly, with self-deprecation ("could be bothered").
- **[CRAFT] NO UNINTRODUCED COMPARATORS.** Never measure against a person or place the reader has
  not met ("more land than the squire down at Wainford" → "more untouched and unused land than one
  man could ever figure out what to do with").
- **[CRAFT] LOGISTICS ARE REAL.** Wagons do not climb a roadless hill: goods unload into a corner
  of the inn's stable, let for the purpose; books go up to the rented room; a camp is a tent, a
  kettle, and what a horse can carry. The author catches every physically lazy convenience.
- **[CRAFT] THE VALLEY'S EARLY VIEW OF EMLYN IS GENTLY COMIC — CONFIRMED by the author
  2026-07-28 ("Gently comic is fine").** "The foolish and strange wizard who had bought Cael's
  hill." Allow the village a little amusement at him, recurring, not once; he reports it without
  defending himself, and the amusement fades into respect only as the work earns it, never because
  the narration tires of the joke.
- **[VOICE, small]** "wizardly enough," not "wizard enough" · the holding is "a living," never "a
  farm" · trim possessive tics ("a great deal of money," not "of your man's money") · direct
  address in dialogue ("How long would you need," not "would your man of affairs and mine need").
- **[CANON] THE RIVER-HOUSE MONEY, ON THE PAGE:** it comes "in two lump sums, one the buyer's
  deposit to secure the sale and one to come at a later date from his lender." The word "halved"
  is retired from the page (the internal net-of-debt arithmetic in economy.md stands, unstated).
  The note's menace tail ("begin, quietly and then not quietly, to eat me") is also retired: state
  the deadline, skip the melodrama.
- **[CANON] THE CHEST AND ALL GOODS WAIT AT THE INN** (stable corner, oilcloth) until there is a
  built room to receive them. The chest does not sit in the tent. It comes up when the Study does.

- **[OPS, standing — 2026-07-28] CLEAR THE REVIEW APP AFTER APPLYING.** Whenever reader feedback is
  applied to the manuscript, mark those entries `resolved:true` with a FRESH `ts` in
  feedback/notes.json and feedback/revisions.json (revs: `resolvedVia:"applied"`), and regenerate
  both .md files (renderers in api/sync.js filter `!resolved`). The fresh ts is what makes the
  reader's newest-wins sync merge propagate the cleared state to every device; deleting entries
  instead would resurrect them from a device's localStorage. The app auto-resolves a tracked change
  whose original paragraph vanished, but notes NEVER auto-resolve, so this step is mandatory.

- **[OPS, standing — 2026-07-28] AUTO-RESOLVE ALL VERIFIED FINDINGS.** Author's directive
  ("Automatically resolve all"): on any editorial/cold-read pass, verify each finding's receipt
  against the text, then fix everything that survives — BLOCKER, MAJOR, and MINOR alike — without
  per-item consultation. Rejected-on-verification findings are logged, not applied. Push the
  corrected text to the app in the same session. Only findings that would change a LOCKED author
  decision (canon marked ⚠️ by the author's own choice) are exempt and get surfaced instead.

- **[P1c ADDITIONS — 2026-07-29 round (Prologue + Ch 3-6):]**
  - **Cut narrator flourishes about the artifact itself** ("Three lines. I have the book yet, and
    I could copy the very slant of them"; "because the why is the chapter"). The teller does not
    admire his own telling or his props' provenance.
  - **Marginalia and documents read as working trade prose,** not oracle: the reader EXPANDED the
    surveyor's margin note into practical instruction before its aphorism. In-world text should
    sound like its genre first and only then land its line.
  - **Dedupe signature formulations.** "Saying a thing to that boy/family was the surest way to
    make them careful of it" appears ONCE (Ch 3); the Ch 5 echo was cut. One coinage, one use.
  - **Side characters observe, they do not oracle.** Soren's "It said yes" became "You've
    started" — the boy reports what a boy can see; he does not voice the hill for the wizard.
  - **Jorin (and his kind) confirm with tools, not questions.** Survey, test, verdict. The fewer
    questions a craftsman asks aloud, the better the scene.
  - **Weather is allowed to clear.** The reader twice brightened rain-endings (rain clearing, sun
    breaking through). Don't default to persistent drizzle for mood.
  - **Magic is engineering:** iterated R&D on the page (several failures, then a working version
    with a real limitation, then the refinement that removes the limitation). One-failure-then-
    success reads as fable; the reader wants the development arc.
  - **The prologue frame stays light:** conditional "Perhaps I will set it down" over direct
    "You have asked me" — the addressee device is kept latent until the coda.

## P1d — THE 2026-08-02 READER PASS (5 notes on Ch 4, 7, 8; each distilled to its class)

Same standing as P1c: extracted from the author's own notes, and they outrank house style where
they conflict.

- **[HARD] EMLYN DOES NOT EXPLAIN HIS WORKINGS.** He gave a joiner the full mechanism of the lumen
  across a shop counter — *"drinks something that lives only under my particular hill."* He would
  not. To a customer, a neighbour, or anyone who has not earned it, he gives the **outcome** and
  withholds the **how**. The reader still gets the mechanism, **from the narration**. Check every
  scene where he answers a question about his trade: if the sentence would work equally well in the
  narrator's voice, it does not belong in his mouth.
- **[HARD] NO DIMINISHING SELF-LABELS FOR THE PRACTICE.** The retired formulation was "the work of a
  country wizard in a small valley" → "the work **available** to a wizard in a small valley." (The
  bare phrase "country wizard" is fine and stays: the outline's "a country wizard is a marvel" says
  the opposite and is correct.) He is a rare major talent doing
  the work a small valley has to offer. Scarcity of *work* is never scarcity of *ability*, and the
  narrator does not run himself down by class.
- **[HARD] MAGIC HAS TWO MODES AND YOU MUST KNOW WHICH YOU ARE WRITING.** Conventional practice
  asserts a will; Emlyn listens and negotiates. He arrived at it alone — no teacher, no tradition,
  and never phrased as destiny. Any line saying he was *taught* to listen is a canon error. (One was
  found and fixed in Ch 4, where the retired wording "the way I had been taught to use them" became
  "the way I had come round to using them".) Full rule in `state/story-bible.md` under THE TWO MODES.
- **[CRAFT] A CHILD'S GIFT IS SPECIFIC, NOT GENERAL.** Soren was written as *failing* at letters so
  that his real gift would stand out; the author's correction is that he learns them fast and
  properly and simply does not go further. **Do not manufacture a deficit to make a talent legible,
  and do not let quickness at one thing spread into quickness at all things.** The sibling rule is
  "Soren is a child, not an oracle" (`modes/developmental.md`).
- **[CRAFT] THE REGISTER WANTS A PHYSICAL COMIC BEAT AT THE WIZARD'S OWN EXPENSE.** A failed
  experiment reported in summary was asked to become a pratfall: flare, blinded, over backward off
  the stool, the lamp in pieces, nothing hurt but his dignity. When a failure is narrated rather
  than played, ask whether the scene wants a body in it. Covenant-safe by construction: the wizard
  is the only casualty.
- **[CRAFT] HIS INSTRUMENTS ARE AN ARTIFICER'S.** Calipers, fine files, a small brass scale, a
  jeweller's glass, levels, gauges, drawn wire — not a surveyor's rods, chains, plumbs and
  trueing-squares. Customers' surveying sets stay surveying sets; the contrast is the point.

## P2 — CHARACTER INTRODUCTION & THE ASIDE DISCIPLINE

- **[CRAFT] Introduce people organically, as ambience before acquaintance.** No roll-call, no
  lining everyone up and labeling them. A villager first registers as a hammer heard, a smell from
  a shop, a flour-white figure who lifts two fingers, and is named only when the narrator actually
  deals with them. *Source: "don't line up and introduce everyone so neatly… there was a blacksmith
  heard as I passed."*
- **[CRAFT] Cut future-significance tags.** No "who would one day…," no foreshadow that flags a
  minor character as load-bearing. Let significance arrive when it arrives. (For *plot* seeds the
  same discipline is [HARD] — see "Setups are invisible" in P1.) *Source: the Jorin/Ren
  pullback; organic-introduction rule.*
- **[CRAFT] Asides are rare AND fully formed.** The teller may reach out of the scene only
  occasionally, and when he does the aside must **finish the thought it starts.** A half-observation
  that raises a question and walks away ("Lira, who I do not believe slept at all") is a bug: cut it
  or pay it off. Test every aside: *does this finish what it opens?* If not, cut it and keep the
  plain image. *Source: "adjust skill to write [asides] sparingly"; "who I do not believe slept at
  all… not fully formed."*

## P3 — WORLD LOGIC & SENSORY VARIETY

- **[CRAFT] The world's economics and infrastructure must cohere.** A working village with an inn
  and a mill has a real (if humble) road, not one that peters into trackless grass. Land holdings
  come from plausible, mixed sources, not one owner's convenient largesse. A hill of no
  agricultural worth still sits among leasable farmland. *Source: the road note; "make [the land]
  more expansive and not solely owned by Cael"; the farmland note.*
- **[CHECK] Concrete physical facts are accurate and consistent.** If the inn is one of the few
  three-storey buildings, it is not also "low." A well-paid room is a good room. Check that each
  object matches what the story has already established about the place. *Source: "not low, one of
  few three-storey buildings"; "make her nicer room."*
- **[CRAFT] Sensory texture must vary — no re-running the same two details.** If the smith and the
  herb-shop carried the evening, the morning needs *different* life (a communal oven, a dairymaid, a
  thatcher). Reach for period-correct specifics the scene hasn't used yet. Every abstraction still
  pays for itself with one physical anchor. *Source: "add more variety… same two shops… add a
  period-correct oven/baker."*

## P4 — PACING, SCALE & TRANSITIONS

- **[CRAFT] Keep scale honest and human.** Distances and times are ordinary: a walk to the hill is
  ~half an hour, not an epic trek; village-sized, not epic-sized. Don't inflate. *Source: "not too
  long… like a 30-minute walk outside the town"; the stakes-stay-village-sized rule.*
- **[CRAFT] Scene over summary (craft dial, 2026-07-14).** A chapter's load-bearing beats (the
  turn, the deal, the discovery, the first meeting) happen in REAL-TIME SCENE; summary only
  bridges. Flag any beat that lives inside a recounted montage paragraph and dramatize it.
- **[CRAFT] Dialogue share (craft dial, 2026-07-14).** If a chapter has no sustained dialogue
  scene, or its key exchange is narrated instead of spoken, that's a finding: put it in voices.
  The lint prints a dialogue-share % and WARNs below a ~15% floor — a montage-compression flag, not
  a target; a genuinely interior chapter that clears the floor is fine.
- **[CHECK] Speaker trackable (paired safety for the dialogue dials, 2026-07-14).** Where a scene
  runs 3+ speakers or a long two-hander, can a reader always tell who is talking? Flag ONLY genuine
  ambiguity (a long bare-quote run with no tag or action beat to anchor it); the fix is one small
  attribution or gesture, not a tag on every line. Attribution stays simple; do not clutter the
  spare cozy dialogue. (This exists because dials #1/#2 push toward the crowded scenes where this
  risk lives.)
- **[CHECK] Bookend variety (craft dial #3, widened 2026-07-14).** If this chapter opens on
  weather/season/state-of-me AND the previous chapter did too, recast one (mid-task, mid-dialogue,
  another person, an object). Same for CLOSES: glance at the previous 2–3 chapter endings, and if a
  third straight evening-alone-reflective coda is forming, vary the shape (time of day, subject,
  who's present). NOT a ban on the quiet cozy close — that is the register's birthright, and the
  deliberate callback-closers (the lamplight motif, "for company," "see what the morning would
  bring") are whitelisted; the point is to avoid an accidental third in a row.
- **[CHECK] One comic beat (craft dial, 2026-07-14).** At least one genuine comic beat per
  chapter (running bit, deadpan exchange, domestic absurdity). If the pass finds none, the
  chapter is running colder than the register wants.
- **[CRAFT] Give events their own room; don't cram.** A thing worth its own beat gets its own day
  or its own scene rather than being stacked into one crowded afternoon. *Source: "make this be the
  next day meeting."*
- **[CRAFT] Decisions and turns must be earned, not snapped.** A man does not agree to sell (or buy,
  or trust) in one line. Give the deliberation its beat: the silence, the weighing, the physical
  tell, before the outcome. If a transition feels abrupt, it is. *Source: "this is abrupt for
  agreement to sell."*
- **[CHECK] Set up before you pay off — and RE-CHECK after every revision.** If a later line leans
  on a fact (it's cold; it's night; the tales favor wonder-boys), make sure the earlier passage
  actually plants it **in the CURRENT draft** — revision is the usual killer: cutting or rewriting
  a passage silently orphans every later line that leaned on it. When a revision cuts material,
  sweep forward for its dependents (and when canon changes, sweep the whole book for stale facts:
  the modest-townhouse retcon left "far more rooms than one man had any use for" standing two
  chapters running). *Source: Ch2 "cold — make it clear in an earlier passage"; prologue "not on a
  boy… doesn't work without earlier mention — see earlier drafts" (2026-07-14); the townhouse-size
  mismatch note (2026-07-14).*

## P5 — VOICE & EMOTIONAL REGISTER

- **[CHECK] The fixed voice holds:** Le Guin's restraint floor; the blended voice; longevity
  implied, never stated. No modern idiom, no techspeak, no fake-archaic incantation.
- **[CHECK] POV is right for the chapter (Spellmonger hybrid).** An **Emlyn chapter** is FIRST
  person, past tense, told close to the events with ordinary hindsight. Flag and cut any **ancient-
  chronicler / deep-time framing** that crept in: "longer than kingdoms," "everyone I knew is gone,"
  "this account," "I set it down," "the tales, when they mention…," or a narrator writing from
  centuries later. Keep Mancour's near-hindsight ("I didn't know it yet"); drop the memoir frame. An
  **other-character chapter or interlude** is THIRD-person limited on ONE head, past tense, same
  blended voice; flag any slip into "I/we" or into a second head (no head-hopping), and any POV that
  spends a mystery early (inside Tomas before his confession; a hill-interior that states the twist).
  *Source: "more in line with Spellmonger… follows the main character but isn't wholly in his voice…
  changes perspective per chapter… we can do interludes"; session-lock #1.*
- **[CRAFT] ONE blended voice — Mancour surface, Rothfuss undertone throughout (not
  compartmentalized).** The teller is wry, plainspoken, competent-professional, and direct on the
  surface of EVERY paragraph, with a constant Rothfuss undertone under EVERY paragraph (warmth, the
  one well-made concrete image, a quiet music). Flag two opposite failures: (a) a paragraph gone
  **purple / self-admiring** — plain the ornament down; and (b) a paragraph gone **flat mechanism**,
  stripped of warmth or image — put the undertone back. A threshold (the Ch3 hum scene) is the same
  voice *deepened*, never a switch. Do not compartmentalize plain-here / lyric-there; calibrate
  against the re-voiced Chapters 1–3 read as one continuous voice. *Source: "one voice throughout, a
  blend of the two, Terry Mancour with an undertone of Rothfuss throughout"; session-lock #8.*
- **[CRAFT] Emotional registers are precise, not generic.** Characters are their exact temperature:
  Lira measured and reserved, giving nothing unpaid-for — not warm, not frosty. Never name an
  emotion the reader can infer from behavior; never explain a silence. *Source: "make Lira less
  friendly, a little less frost… more measured"; the restraint rule.*
- **[CRAFT] Restraint over grandiosity.** The narrator is not a legend the world sings about; keep
  the scale of self-regard and reputation small and honest. *Source: prologue "make him less
  famous… stories so warped it's barely fantasy, not many of them."*
- **[CRAFT] No sentence that admires itself; no digression that forgets to return.** Lyricism is a
  spice. If a line is performing, plain it down. *Source: the failure-modes list.*
- **[CRAFT] RATION THE SIGNATURE TICS (professional-polish rule, 2026-07-12).** The teller's
  signature constructions are voice in small doses and mannerism in large ones. Per chapter, hold
  them to roughly: **", which is/was …" appositive tails ≤ ~5–6** (keep only the ones that land a
  judgment or a joke; recast the rest with a colon, a period, or "and that was…"); **"a good/great
  deal / a great many" ≤ ~3–4** (elsewhere use *much, far, many, most,* or cut the measure entirely);
  **"the way you/a …" similes ≤ ~5** (keep the vivid, cut the reflexive); **"I will not pretend / I
  will not tell you" ≤ 1** (elsewhere state the thing directly: "The first ones did not work.");
  **"in the end" ≤ 2**; **"which is to say" ≤ 1–2.** Also scan for a phrase repeated across ADJACENT
  chapters ("while my back was turned") and vary the later use. The fix is always to keep the BEST
  instance and recast the weak ones, never to purge the construction. **THREE LEVELS, one gradient
  (do not conflate them):** the numbers just above are the **RATION** — the revision ceiling you hold
  a finished chapter to. The voice doc's figures are the lower **AIM** you write *toward*. The lint's
  `tools/prose-lint.sh` numbers are a still-looser **THRESHOLD** — a backstop set above the ration on
  purpose, so it fires on real drift, not on a vetted chapter sitting at healthy density. So a lint
  WARN is not "you broke the ration"; it means "you are past the backstop, review every instance." A
  chapter can clear the lint and still owe the ration a trim. **MECHANICAL ARM:** run
  `tools/prose-lint.sh` — it FAILs the hard rules (em dashes, memoir-frame phrases, registry reuse)
  and WARNs the tic thresholds, the review-lists (seed-telegraph, aphorism-weld), adjacent-chapter
  echoes (deliberate motifs vouched in `tools/vouched.txt`), and a low dialogue share (craft dial #1);
  review every WARN, then append the chapter's coinages to the registry. *Source: the 2026-07-12
  professional-polish pass; the 2026-07-14 engine audit (the docs had falsely claimed lint == ration).*
- **[CRAFT] Concision: cut verbosity, keep the voice.** The lyric register earns long sentences, but
  it does not license padding. Hunt and cut: **doubled clauses** that restate the same beat ("and
  they were not wrong, and I never troubled to mend it" → drop the first); **over-qualification**
  ("I do not think I could have borne" → "I could not have borne"); **tautological asides** ("because
  I promised you the truth of it and this is the truth of it"); and **theme-explaining tails** that
  spell out what the scene already showed. The test: if a clause can go without losing image,
  meaning, or music, it goes. Tighten toward the strongest version of the same sentence, not toward a
  shorter, flatter one, and never pad back to a word count. *Source: the "some sections seem overly
  verbose" readability pass on Ch 1–3.*

## P6 — CLARITY (fast final sweep)

- **[CHECK] Every referent is introduced before it's leaned on.** Name the horse the first time it
  matters; don't refer to "the letter" or "what I ought to want" before the reader can hold it.
  *Source: "good horse — better introduce"; "and in the matter of what I ought to want — unclear."*
- **[CHECK] No vague abstraction standing in for a thing.** Prefer the concrete noun. If a phrase
  could mean three things, it means none. *Source: the clarity notes.*
- **[CHECK] Dialogue-share sanity against the neighbours.** Run the lint's meter and compare with the
  chapters either side. A chapter far below its neighbours is usually not "interior by design"; it is
  usually a chapter where people were summarized instead of met. Interior chapters are legitimate and
  vouchable, but the burden is on the draft to justify it. *Source: the Ch 16 audit, 2026-07-15
  (21% against neighbours at 56% and 44%).*

---

## Keeping the engine learning (the intake protocol — run ALL six steps on every note)

When the author gives new feedback, after applying it to the prose (per "AUTHOR FEEDBACK IS
DURABLE" in `references/session-locks.md`), run this full protocol. A note that only fixes the one line has NOT been learned.

1. **Generalize.** Ask: *what is the class of failure behind this specific note?* Phrase it as a
   checkable failure pattern + a fix pattern, not as the one line.
2. **Place & merge.** Add it to the right pass above, or merge it into the closest existing rule
   (newer wins; never leave two rules for one class). Tag it `*Source:*` with the author's words
   and date so its origin stays legible.
3. **Gap analysis.** Ask: *should an existing rule already have caught this?* If yes, the rule
   failed, not the rulebook — sharpen its wording (usually: it was scoped too narrowly), and say so
   in the changelog. **Read the chapter's block in `state/engine-reports.md` first:** if the engine
   claimed that chapter clean, this is a SILENT MISS (the rule was missing/too narrow — sharpen or
   add it); if the engine flagged it and vouched a keep, the JUDGMENT BAR was wrong, not the rule
   (tighten the bar, don't add machinery). Then record the miss on that block's `misses:` line.
   **Escalation is mandatory, not optional: the second note in the same family makes that family
   [HARD], and a third requires a mechanical lint pattern.**
4. **Mechanize (and DE-escalate in the same breath).** If ANY part of the rule is detectable by
   pattern (a phrase, a construction, a count), add it to `tools/prose-lint.sh` the same day, as
   FAIL (hard rules) or WARN (review lists / budgets). The lint is the only part of this system that
   cannot forget, get tired, or talk itself into an exception. A rule that could be mechanized and
   wasn't is a future repeat. **Whenever you ADD a lint pattern, spend one line pruning:** review
   whether any *existing* WARN has ever come near a real catch, and relax or retire the ones that
   are pure noise, logging the retirement in the changelog and adding the old formulation to
   `tools/superseded.txt` if it was a rule. The prune reflex must fire exactly when the add reflex
   does, or the lint silently accretes false-friends until every WARN is background noise and the
   real ones get ignored (the seed-telegraph false-friends were retired for exactly this reason).
   **One caveat: a low catch-rate does NOT condemn a deterrent tripwire.** A budget-0 pattern
   (seed-telegraph, welds, `had had`) is *supposed* to almost never fire; its value is deterrence,
   and near-zero hits mean it is working, not that it is noise. Retire a WARN only when it fires
   *and is wrong* — never merely because it is quiet. *Source: engine roadmap Tier 3 (2026-07-15).*
5. **Retro-sweep.** Grep the drafted manuscript for the same failure class (the lint pattern from
   step 4 is the sweep tool). Fix instances where the change is surgical; where a fix would alter
   a beat the author has read and liked, flag it to the author instead of silently changing it.
   A rule that only governs future chapters leaves the shipped book inconsistent with it.
6. **Log it.** Append a dated line to `references/engine-changelog.md`: the note (short), the rule
   added/changed, whether a lint pattern was added, and the retro-sweep result. The changelog is
   the audit trail that proves learning happened, and rereading it is how repeat families get
   noticed (step 3's escalation depends on it).

**The engine report closes the loop.** Every delivery's 2–4 line report must include the pass
tally (which P-sections fired and what changed), so a skipped pass is visible instead of silent.

The goal: the author should never have to give the same *kind* of note twice. If they do, that is
an engine bug — fix the engine (steps 3–4), not just the line.

---

## ENGINE CHANGELOG

Moved to `references/engine-changelog.md` on 2026-07-31. It is an append-only audit trail, it was
38% of this file by word count, and it sat between P1b and P1c so that every reader crossed 3,435
words of history to reach a live rule. **Consult on demand; do not load it to draft or revise.**
New entries still go there, per step 6 of the intake protocol above.
