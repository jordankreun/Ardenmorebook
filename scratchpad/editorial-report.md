# THE TOWER OF ARDENMOOR — EDITORIAL REPORT AFTER THE WHOLE-BOOK VOICE PASS

---

## 1. THE VERDICT

**The pass did not flatten the book, and it did not break the seams. It did exactly the job it was scoped to do, and its failures are all failures of sightline rather than of taste.** I measured the things a flattening pass would damage first. Chapter closes range from two words to 101 with a median of 17 — no convergence on a house length. The humor fence holds absolutely where it matters: I read Ch 31 and Ch 32 end to end, 11,772 words at the book's grief peak, and there is not one comic beat in either. The declared budget raises are in the commit record with counts and reasons attached (`7ff2664`: *"Ch 31 teller 5 against 3. Three of the five are inside the closing block the author's note forbids touching"*), which is what §5 asks for. Where a lens charged a 6x teller overspend, the skeptic found the arithmetic had counted withholdings and give-in-full promises as retrospective noticings; the real figure is about 3x and most of it is locked canon. The prose is intact.

**What 33 blind editors could not do is see across a chapter boundary, and every real defect in this report sits on that seam.** The same figure — *"the way a man reaches for a dropped tool"* — carries the same argument about the same boy in three chapters, two of them two chapters apart. Ch 10 calls a handshake *"the second bargain I shook on in that valley"* when it is the fourth. Ch 17's closing summary describes a deal that does not happen until Ch 18. Part IV spends five aphorisms against a budget of two that §5 says explicitly does not scale — a per-chapter agent cannot enforce a Part-level budget even in principle. And one defect is older and larger than the pass: **the artificer's-kit ruling of 2026-08-10 was applied to one chapter and left standing in eight**, so Ch 7 now carries both kits, 220 lines apart, making opposite claims. That is a canon problem, not a voice problem, and the pass was right not to touch it — but nobody escalated it past a note about one paragraph. It is the first thing in the report because it is the one thing here a reader could actually catch out.

Four things must be fixed. Eleven should probably be. Nothing needs rewriting.

---

## 2. WHAT MUST BE FIXED

### HIGH-1 — Ch 7 carries two incompatible descriptions of Emlyn's kit, 220 lines apart

`manuscript/07-wednesdays.md` line 67:

> "What lay in my own bench drawer was all indoor work: fine files in a roll, drawn wire coiled by gauge, **a small brass scale**, the glass itself. His trade walks out and measures the world. Mine sits still in one room and asks it questions."

`manuscript/07-wednesdays.md` line 287, same chapter:

> "People who ask to see a wizard's kit are disappointed by mine. **There is nothing in it for measuring.** ... Blanks... Binding wire... waxed silk... A cake of the yellow wax. A lump of my own hill off my own crown."

A brass scale is for measuring. Both paragraphs run the identical rhetorical move — *here is what people expect, here is what I actually have* — and give opposite contents. This is not a bench-tools-versus-field-kit distinction, because Ch 4 line 19 makes the same speech a third time and lands on the artificer side:

> "There is a notion abroad that a wizard's tools look like something. **Mine looked like a watchmaker's.** Callipers, three pairs... A jeweller's glass on a lanyard. A brass scale with a pan the size of a thumbnail..."

— and Ch 4 line 23 then has him *measuring with it* on ground he has not made up his mind about, which is precisely the practice the new rule says he does not have: *"I loaded the brass scale to a hair of balance and left it under a box, out of the wind, through the cold hour before the birds, and in the morning it was where I had left it, hair for hair."*

**How it happened.** Commit `aefd2c8` (2026-08-10), whose own message closes *"LESSON, logged: a correction is not applied until the CLASS of the error is fixed"*, touched exactly one manuscript file — Ch 7 — adding the wizard's-kit paragraph without removing the artificer paragraph in the same chapter. The class was not fixed. Nine passages in eight chapters still carry the old kit: Ch 3:279, Ch 4:7, Ch 4:19, Ch 4:23, Ch 7:67, Ch 8:77, Ch 8:147, Ch 10:281, Ch 10:289, Ch 11:17, Ch 11:369, Ch 15:95. The `superseded.txt` patterns that were supposed to catch this are `a tinker's drawer`, `tap-hammer`, `gauges on a ring` — none of which match the words actually on the page (*watchmaker's, callipers, jeweller's glass, brass scale*), and `doc-audit.sh` greps docs, not `manuscript/`. `state/story-bible.md` carries **both** rules in the same file: the wizard's kit at line 227, the artificer's kit still stated as locked canon at lines 526–527.

**Smallest fix.** Do not strip measuring instruments book-wide — see §4(b), where I argue against it on craft grounds. Fix the one contradiction that a reader can catch: **Ch 7 line 67 only**. Change *"a small brass scale, the glass itself"* to bench materials that do not measure, or cut the inventory clause and keep the contrast, which is the good part and survives without it: *"His trade walks out and measures the world. Mine sits still in one room and asks it questions."* That leaves one kit per chapter and costs nine words.

---

### HIGH-2 — The same figure carries the same argument about the same boy three times

*"the way a man reaches for a dropped tool"* — Emlyn's protect-the-gifted-child fear.

- **Ch 14 line 165** (narrated, about Soren): *"There are hands in this world that reach for a talent **the way a man reaches for a dropped tool**, briskly, as a matter of course, because it is useful and it is there, and the child at the end of that reach is not asked what he thinks of it."*
- **Ch 25 line 201** (spoken to Ren): *"there are hands in the world that take up a gifted child **as a man takes up a dropped tool**, and do not ask the child much about it"*
- **Ch 27 line 55** (spoken to Jorin): *"the noticing is done by people who reach for a gifted boy **the way a man reaches for a dropped tool**, and the boy is not asked, and the father is not asked"*

Ch 25 and Ch 27 are two chapters apart and both about Ren. Not in `phrase-registry.txt`. Three reaches for one dropped tool is over.

**Smallest fix.** Keep Ch 14 — it is the narrated original and it earns the figure. Rebuild **both** later instances, not one; Ch 25→Ch 27 is the pair a reader will feel. Ch 27 is staged *"in his yard, with the swallows going over"* and Jorin is the master builder (`story-bible.md` l.547), so a timber or hinge figure is in provenance under §3 — and the yard already has *"The hinge stayed where he had left it, half driven"* sitting three paragraphs later.

**Secondary, same passage.** Ch 27 frames the speech as *"what I feared, which I had told no one whole until that evening"* — but he told a version of it to Ren in Ch 25. Either soften to *"told no grown man"* or drop the clause.

---

### HIGH-3 — Ch 17's closing summary describes a deal that has not happened yet

*(Raised from the skeptic's MEDIUM. The reason: it is not only a misattribution, it is a chronology error, and it sits in the sentence the chapter's whole eleven days land on.)*

`17-the-rent-book.md` line 349:

> "I had gone out to collect a wage bill and come back with a fleece, and somewhere between the two I had also given away rent I was owed and **promised three years of forgiven rent to a man on a doorstep**."

The chapter's only doorstep is Ned Pardon's, at line 161, and the deal there is **a cheese and a fleece for life** — *"an undertaking, extracted from me on his own doorstep and never afterward rescinded, that the arrangement would be the arrangement while he lived."* The three forgiven years exist only in Ch 18: line 91, *"Rent free for three years while she got it into heart, then a tenth"* — Alice Bewick, a woman, at her own table, and weeks later in story time.

`state/manuscript-log.md` records Ch 18 as *"SPLIT from The Rent Book 2026-07-15"*. The summary kept a deal that walked out with the other half of the chapter.

**Smallest fix.** Replace the clause with what Ch 17 actually played: refusing a man's arrears on his own doorstep and binding himself to that man's terms for life. Do not import Bewick's three years — they belong to Ch 18 and land there.

---

### HIGH-4 (process, one line) — `state/manuscript-log.md` has an unterminated HTML comment

Line 470 opens `<!--` ("EXAMPLE of the line format to append") and there is no `-->` anywhere in the file. **The entire RECAP LEDGER is commented out** — every chapter recap, including the Ch 10 and Ch 16–19 entries. Anything that renders the markdown sees nothing. One character fixes it.

---

## 3. WHAT SHOULD PROBABLY BE FIXED

Compressed. All verified on the page.

**Ch 10:123 — a number that invites counting and does not survive being counted.** *"Then Hal Wray put out one of those big raw hands, and I took it. That was the second bargain I shook on in that valley."* It is the fourth: Cael on the crown (Ch 2:305), Jorin's *"Build there, then"* (Ch 5:59), Kellard's yard (Ch 8:301). Cael's is not forgettable — Ch 3:7 and Ch 5:279 both date events from it. **Do not write "the fourth."** Drop the count and land on the hands. *(Predates the pass; `17137e9` shows the pre-pass line read "the second bargain I ever shook on".)*

**Part IV spends five aphorisms against a budget of two that §5 says does not scale.** Ch 28:247 *"Weather is nobody's doing. A question set down is somebody's, every time it happens."* / Ch 29:173 *"A first light should burn itself in."* / Ch 30:25 *"A man in a burning house does not choose what matters. He discovers it."* / Ch 31:137 *"You do not tell a grief what to be."* / Ch 32:119 *"a maker's own scratch on his own work is a date."* Keep Ch 30's (the chapter's whole action pays for it) and Ch 31's (funded since Ch 4). Cut Ch 32's first — the scratch is already shown two clauses earlier, *"put there by me and kept by me and never once mended"*, so the maxim glosses a thing just seen. Then Ch 28's, whose paragraph already lists four concrete instances of somebody choosing. **This is the one budget no per-chapter agent could have enforced.**

**"the whole of" runs 193 times across 36 of 37 files** — roughly one per 1,150 words. Ch 8 carries 11 in 9,064 words, including *"the binding is **the whole of the argument**"* (l.75) and *"I drew the binding, **the whole of the argument**"* (l.147). Ch 6 carries 10, Ch 3/9/11 nine each. It is uniform front-to-back, so it is a tic and not drift, and a first-person idiolect is allowed a signature. Thin the filler instances only; keep the ones where *whole* works against a genuine part. **Ch 8's doubled "the whole of the argument" is the single clearest cut.**

**"I stood" appears in the final two paragraphs of ten chapters** (5, 6, 7, 14, 19, 24, 25, 26, 28, 31) and in the *final* paragraph of six (5, 7, 14, 19, 24, 25). §21.3 names this accumulation by name. But three of the six do not land the last image on the standing — Ch 5 closes on the morning, Ch 24 on *"I live on top of a word"*, Ch 28 on *"Light going both ways now."* **Vary the posture in two or three of Ch 7, Ch 14, Ch 25 only.** Leave Ch 5's and Ch 28's alone: Ch 5's morning-closer is protected by §21.3 by name, and Ch 28's amber is the Lira arc's payoff rhyming with the registered Ch 21 coinage.

**Ch 19's 317-word final paragraph** — median is 70, next-longest is Ch 6 at 195. It doubles its own formula inside one closing movement: *"that is **the whole of** that particular battle"* (l.259) and then, ~120 words later, *"And that is nearly **the whole of** it, that a man made a bed"* (l.265). And it states its lesson after a clean four-word landing. Fix: cut the final sentence and land on **"The drawer could keep."** Change the earlier "whole of" summary, which is the disposable one. See §4(a) — do **not** reshape the ending type.

**Ch 31's close is the longest in the book by 31 words** — 101 words, 10 *and*s, at the grief peak, carrying figuration (*"the deep quiet before its deepest hour"*, *"the whole patient ground of my life holding its breath in the dark"*) against §5's *"figuration drops to zero."* It is defensible as descent-plus-landing, since the actual landing is *"and I asked"* — three words, no figure. If touched at all: break after *"for the first time in three years."* **Do not cut "if letters see"** — the letter/chest pairing is the §17 sticking-drawer payoff.

**Ch 5's landing names an emotion six words after showing it.** *"...an old man who had smelled the soil and called the work good, a chest in the corner I would not open. **I found that I was glad to be alive**, and that I meant to see what the morning would bring."* §3: *"Name no emotion the reader can infer from behavior. Absolute."* The defect is placement, not existence — the book says *"I was glad of it"* ten other times and the page has settled that *glad* is inside the voice. Cut *"I found that I was glad to be alive, and that"* and keep the morning callback, which §21.3 protects.

**Ch 11 and Ch 20 run the same template about the same boy.** Ch 11:329 *"the particular nothing he did that was in truth a kind of listening"* / Ch 20:137 *"the particular thing he did that looked like a boy wasting an afternoon and was in truth a kind of surveying."* Ch 20's is doing plot work; recast **Ch 11's** to plain behaviour. Do not touch Ch 3's — `phrase-registry.txt` l.21 owns it.

**Ch 5–9 close on the same shape** — dusk or dark, Emlyn alone, lamp or fire, reflective summing-up; Ch 11 and Ch 13 too. §21.3 is live in every mode and names this drift. Vary the *shape* of **one or two of Ch 6 / Ch 8 only** — different hour, or a second person still in the room. Note the run is not unbroken (07b sits between Ch 7 and Ch 8) and Ch 9 turns outward at the last sentence. **Leave both "morning would bring" lines alone.**

**Ch 31 teller.** Not the 5.8x the lens charged, and the declarations exist. If anything goes, cut the two cheapest world-comparison clauses — *"The paper was heavier than people trouble with now"* and *"which nobody does any more"* — the only two that reach outside the valley and gesture at deep time, which §19 forbids. **Leave Ch 32 alone; its four are locked canon.** Worth writing into §5: a two-line counting rule saying withholdings, present-tense facts about surviving objects, and reader-address are *not* teller instances — or the next audit will produce this same wrong number.

**Ch 16, 17 and 18 never went through the pass.** Verified by walking every voice-pass commit with `git show --name-only`: the ten commits touch exactly 33 distinct manuscript files, and 16/17/18/32b are the four that appear in none. `git log -- manuscript/17-the-rent-book.md` ends at `a8e6c1a` *"WIP: Parts III-IV drafted; twelve chapters NOT YET VERIFIED."* The closing commit says *"all 33 files now through the pass"* and exactly 33 went through, so nothing was misreported — **but no document declares 16/17/18 exempt.** Either record the exemption in `state/manuscript-log.md`, or run them, carrying HIGH-3 and the Ch 10 count into that run.

**Three registry / documentation entries are stale against the page.** (1) `phrase-registry.txt` l.53 assigns Ch 13 *"the particular nothing that is a great many things being held extremely still"* — that string is not in Ch 13. (2) ll.13–15 flag *"never once been asked"* as a Ch 2→Ch 4 callback; it appears only in Ch 4. (3) ll.5–6 protect *"for company"* as a **Ch 6/Ch 8 closer pair** — the rhyme is fully intact and deliberate (*"I took it for company"* / *"I took it, rightly this time, for company"*), but it is mid-chapter in both: paragraph 106 of 114 in Ch 6, paragraph 116 of 164 in Ch 8. **Amend the comment, do not move the prose** — relocating a working mid-chapter callback into two chapter landings would manufacture the exact ending-sameness this report already flags. (4) `state/manuscript-log.md` l.483 says the bottoms list *"DOES NOT TOUCH IT FOR EIGHTEEN MONTHS"*; Ch 10:287 says *"It sat there half a year."* The page is right — the eighteen months is his ownership (Ch 17:9), not the delay.

**Two near-verbatim strings worth one pass each.** Ch 23:159 and Ch 29:61 both read *"the glasshouse throwing its long light down the slope"* (nine words) — recast Ch 29's from the carrying men's angle. Ch 5:175 *"I will not give you the whole of it stone by stone, though I could, for I remember every course"* / Ch 19:221 *"I will not give you the whole of it pane by pane, though I could"* — vary the Ch 19 half; Ch 5 has priority and earns it. Then register whichever survives, so a future pass cannot re-create it. *(It may be an intended parallel — a stone building, a glass building, the same refusal — but nobody logged it.)*

---

## 4. THE TWO AUTHOR QUESTIONS

### (a) Ch 19 ends on reflection rather than image or dialogue. Reshape it?

**No. Do not reshape the ending type. Cut one sentence.**

I classified the final sentence of all 37 files. Reflective closes are **roughly eight of thirty-seven — about one in five** — and they are distributed evenly across the whole book, not clustered:

- **Prologue:** *"and that is the one advantage I have ever held over him, and the one I would most gladly give back."*
- **Ch 2:** *"It was the first evening in three years that I had wanted the morning to come."*
- **Ch 5:** *"I found that I was glad to be alive..."*
- **Ch 6:** *"I could carry only so much at once, and I had a room and a light."*
- **Ch 17:** *"I lay there in the dark before dawn and began, without meaning to, to move the pieces about."*
- **Ch 19:** *"The hill was patient, and so, I was learning, slowly, and late, and against my own grain, could I be."*
- **Ch 24:** *"I live on top of a word."*
- **Ch 30:** *"Some mornings I did not mind it."*

The other twenty-nine land on image (Ch 4's undriven anchors, Ch 9's dark bottoms, Ch 29's burning lamp, Ch 32's quivering needle), on action (Ch 3 *"went out into the rain with my hands empty, and began"*, Ch 10 *"put the brass scale back on the sheet and went to my supper"*, Ch 31 *"and I asked"*), or on a single line of dialogue (Ch 12 *"Not yet."*, Ch 18 *"And who's setting it?"*, Ch 23, Ch 32b). **Nothing in voice.md rations reflective endings**, and §4's only literal prohibitions are *"Never land on a lyric lift"*, a question to the reader, and a cliffhanger. One in five is a rhythm, not a habit. Reshaping the class would cost you Ch 24's *"I live on top of a word"* and Ch 30's *"Some mornings I did not mind it"*, which are two of the best closes in the book. **A book-wide reshape would be a mistake and this affects many chapters, which is exactly why it should not be done on taste.**

What is actually wrong with Ch 19 is not that it reflects. It is three measurable things, all local to that one paragraph:

1. **It is 317 words.** The median final paragraph is 70; the next-longest is Ch 6 at 195. It is 62% longer than anything else in the book.
2. **It doubles its own summarizing formula** inside one closing movement, 120 words apart: *"that is the whole of that particular battle"* and *"that is nearly the whole of it."*
3. **It explains a landing it has already made.** *"I let it stay stuck... I left the one drawer shut, and I went out to see to the lamps... It was enough, that autumn, to have built the bed. **The drawer could keep.**"* That is the landing. The sentence after it states the lesson outright, and it echoes the prologue's *"I learned most of it the slow way, late, and at a cost to better people than myself"* closely enough to read as a reprise rather than an arrival.

**Recommendation: cut the last sentence. End on "The drawer could keep."** Four words, image-adjacent, weight-bearing, and it leaves the reflective register intact because the chapter has been in it for two paragraphs already. Then change the earlier *"whole of that particular battle"*. Nothing else in the paragraph should move — and specifically **do not** cut back to the glasshouse and stop at *"against the coming frost"*, which deletes the drawer beat, the §17 motif this chapter exists to plant.

---

### (b) The struck-through artificer's-kit entry in voice.md §18 — keep or delete? And Ch 8 ¶77?

**The question as posed understates the problem, and the answer to both halves is: neither. The entry is not superseded on the page, and Ch 8 ¶77 is not the only survivor — it is one of nine.**

The 2026-08-10 ruling exists in **two** manuscript paragraphs: Ch 7:287 and Ch 29:61. The artificer's kit exists in **nine**, across eight chapters: Ch 3:279, Ch 4:7, Ch 4:19, Ch 4:23, Ch 7:67, Ch 8:77, Ch 8:147, Ch 10:281/289, Ch 11:17/369, Ch 15:95. The voice pass went over Ch 4, 8, 10, 11 and 15 and lightly edited the Ch 4 inventory paragraph itself (`17137e9` changed *"Mine look like a watchmaker's"* to *"Mine looked like"* and cut a sentence) without touching its contents — correctly, since that is a fact change. `state/story-bible.md` states **both** rules, at l.227 and at l.526. So the "superseded" entry is currently the majority reading of the manuscript and half the bible.

**Three reasons not to enforce the ruling across the manuscript:**

1. **One of the four locked grief objects is a measuring instrument.** `story-bible.md` l.260 and l.794: *"dimensional callipers in a sticking drawer."* Ch 19:265: *"A pair of dimensional callipers, fine ones, the finest I ever owned, in a fitted case worn soft at the corners. I need not tell you how they came to me or whose they had been the making of."* That object draws its whole charge from callipers being **his** kind of thing. Strip callipers from Ch 4 and Ch 8 as foreign to his trade and you drain the drawer.
2. **The book already reconciles the two.** Ch 4:7 does it in one clause: *"I set out the instruments of my trade on a folding table under the canvas, the gauges and the glasses and the lengths of drawn wire, and I used them **the way I had come round to using them, which is to say to listen with, and not to command**."* That is the ruling's principle — *he asks first* — carried by the old objects. The bible's own words are *"there is nothing in his kit for MEASURING"*; the page's better version is *he owns measuring instruments and has stopped measuring with them*, which is more interesting and is already written.
3. **The ruling is unenforceable at scale without a rewrite of eight chapters**, which is not a voice pass, and the author has read and kept every one of those passages across multiple prior passes.

**Recommendation on §18: keep the entry, keep the strike-through block, and rewrite the block's verdict.** §16 forbids dropping an entry, and the record of the two wrong turns is genuinely useful — `aefd2c8`'s own lesson (*"a correction is not applied until the CLASS of the error is fixed"*) is the single most load-bearing sentence in the repo and it should stay visible, especially since the commit that wrote it did not obey it. But the block currently says *"they are not the rule,"* which the manuscript contradicts nine times to two. Change it to state the live position honestly: **the wizard's kit — blanks, binding wire, waxed silk, wax, the lump of hill, the hands — is what he carries to ask ground a question; the bench instruments are what he makes lamps with; and he no longer commands with either.** Then reconcile `story-bible.md` l.526–527 to match l.227, because right now one file gives an agent two orders.

**Recommendation on the manuscript: leave Ch 8 ¶77 exactly as it is.** *"The doing of it is bench work. Filthy, close, patient bench work, done with the jeweller's glass screwed into my eye socket until it ached..."* — that paragraph is making a lamp at a bench, not asking a hill a question, and it is one of the best hands-outward passages in the book. The pass was right to flag and not change it. **Change only Ch 7:67**, per HIGH-1, so that no single chapter contains both claims. That is the only place where the contradiction is close enough for a reader to catch.

**And add the real patterns to `superseded.txt`** — `watchmaker's`, `jeweller's glass`, `brass scale`, `callipers` — with a note that these are LICENSED on the page and the audit is recording their existence, not failing on them. Otherwise the next auditor will re-derive this whole finding from scratch, which is what happened this time.

---

## 5. WHAT I CHECKED AND FOUND CLEAN

**Verified clean, with evidence:**

- **The humor fence holds absolutely at the grief peak.** I read Ch 31 and Ch 32 end to end — zero comic beats across 11,772 words. Ch 26's four beats (ll. 49, 77, 79, 123) all sit before the climb; its back half, from the dusk pulse to Tomas's confession, carries none. Ch 30's two sit in the tail, well past the fire and its approach. §7.2's *"either side of the weight, never on it"* is being obeyed. **Do not let a future pass "balance" Part IV by adding beats into Ch 26's back half, Ch 31 or Ch 32** — those three places are governed by a fence, not a budget. Worth recording in `state/engine-reports.md` so it is not re-litigated.
- **Chapter closes are not converging.** Median 17 words, distribution 2–101, and the shapes rotate across image, action, dialogue and reflection.
- **The budget raises were declared.** Ch 5, 6, 7, 8, 15, 20, 23, 30, 31 and 32 all carry counted, reasoned declarations in the commit record. The "nine chapters silently over budget" charge is false.
- **POV discipline holds.** Third-limited survives only in the four interludes and Ch 21, per §19. Ch 21 never enters Emlyn's head.

**Killed by the skeptic — 43 findings — and this matters, because the pattern in what died is as informative as what survived:**

- **The lamp-in-the-dark census.** A lens counted light in the closing three paragraphs of 13 of 37 files and called it the default the book reaches for when it has not found an ending. Killed three ways: §17 makes lamp-light a standing motif, §16 forbids retiring a motif *"for looking overused — a motif's whole function is that it returns,"* and §21.3 names *"the lamplight"* outright as a protected callback-closer. Its two surgical targets both reach past the lamp to their own landing.
- **"see what the morning would bring" as a repeated closer.** §21.3 exempts it **by name**. Only two files contain the phrase at all.
- **"small and steady" in Ch 29 and Ch 32.** Called authorial poverty. It is the same lamp, in the same room, three chapters on: Ch 29 *"It burns there yet"* → Ch 32 *"as it burns tonight."* A signed bookend, and `phrase-registry.txt`'s header explicitly says not to register deliberate cross-chapter rhymes. Only Ch 26's unrelated Brenna-window use is worth touching.
- **Ch 22's "contradictory" double walk.** No contradiction: the falling snow had stopped, and he walks through a foot of lying snow. No false ending either — it is the soft landing of an embedded flashback, and the chapter closes four paragraphs later on *"a man at his work counting along with the ground beneath him."*
- **Ch 30 "spoiling" the winter.** Its retrospective closes the fire's thread and says nothing about the drawer, the letter or Arielle, which is the entire held breath of Ch 31–32. §10: *"years may live in a subordinate clause."*
- **Ch 21's "continuity error."** *"A woman had caught her boy back from an edge"* is the second exemplar in a generic classification closed by *"Such things happen in market squares"* — a category needs more than one member. At most a four-word tense stumble.
- **Ch 15 "abandoning Soren."** The scene runs ~600 words (ll. 65–89) with the interiority the finding said was missing — *"He sat down on the step below me without being asked. That had taken a year to arrive at, and it had arrived."* And the absence in Ch 16–18 has a cause on the page: harvest, then eleven days of Emlyn walking the valley on foot.
- **The 6x teller overspend, the 30x withholding overspend, and the eight Part IV aphorisms** all shrank under counting — to ~3x, to one real duplicate, and to five.

**What that tells you.** More than half the findings died on the same failure: a lens counted a construction, found a high number, and did not check whether voice.md had already licensed it. The document is doing its job — §16, §17, §21.3 and the registry header killed most of these single-handed. **The findings that survived are almost all the opposite kind: things no per-chapter reader could see and no rule anticipated** — a figure used three times in three chapters, a handshake miscounted across eight, a Part-level budget spent by four different agents, and a canon ruling applied to one file out of nine. That is the correct residue from a pass structured this way, and it is a short list.