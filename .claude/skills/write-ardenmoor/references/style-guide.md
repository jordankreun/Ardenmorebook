# THE TOWER OF ARDENMOOR — TONE & STYLE GUIDE
### For the writing model. Read fully before drafting a single chapter.

---

## THE REGISTER IN ONE PARAGRAPH

This book is written in the key of Ursula K. Le Guin's Earthsea: quiet, sensory, patient, morally serious without being solemn. Magic has weight, not spectacle. Domestic life is rendered with the same care as workings of power — a kettle coming to the boil deserves as exact a sentence as a ward going into the ground. Comparable shelf-mates: *Legends & Lattes* (stakes and warmth), *Emily Wilde's Encyclopaedia of Faeries* (precision of voice), *The Goblin Emperor* (kindness as drama) — but the *prose* model is Le Guin, and where those comps are chatty, this book is still. On that Le Guin floor sits the teller, in **one blended voice (as of 2026-07-06; see the VOICE RE-WEIGHT at the top of `voice-rothfuss-mancour.md`): Terry Mancour on the surface, Rothfuss as a constant undertone, throughout.** The surface of every paragraph is wry, plainspoken, competent-professional, direct, glad of the practical craft of the trade; the undertone of every paragraph is the intimate teller's warmth, the one well-made concrete image, and a quiet music beneath the plainness. These are fused, not alternated: this is not plain-Mancour with occasional lyric bursts, and it is not lyric prose with a wry veneer. Say things straight, but always keep the teller's undertone and the concrete image; cut only self-admiring ornament (a flat paragraph is as wrong as a purple one). It never overrides Le Guin's restraint, it inhabits it.

---

## PROSE MECHANICS

**Sentences.** Vary length deliberately. The default is a medium declarative sentence with concrete nouns. Short sentences are spent like money: they land beats, close scenes, deliver Jorin's dialogue. Long sentences are permitted when they enact something continuous (walking a property line, a working settling into ground) and must never tangle. Read aloud in your head; the rhythm should feel like someone speaking evenly by a fire.

**Run-ons (avoid; the Mancour-leaning register runs on cleaner sentences).** Do not chain four or five independent clauses with "and, and, and, and" (e.g. "I got down, and my legs told me how far we had come, and a boy appeared, and took the reins, and led her off"). Split them. **No comma splices** (two independent clauses joined by a bare comma). A single deliberate cumulative sentence, run long on purpose for rhythm at a threshold or a walk, is still allowed, but it is now the *exception* and must read as a controlled build, not a pile-up. Test: if a sentence has three or more "and"-joined independent clauses and you cannot say it aloud in one breath without losing the thread, break it. Favor the period.

**Concreteness.** Every abstraction must be paid for with a physical anchor. Not "he felt grief" but the drawer that sticks and is allowed to stay stuck. Not "the village distrusted him" but being served promptly, correctly, and with the warmth of a signed receipt. If a paragraph contains no object, temperature, sound, or texture, revise it.

**Restraint.** The book's power lives in what is withheld. Never name an emotion the reader can infer from behavior. Never explain a silence. When something enormous happens (the compass points down), the prose gets *quieter*, not louder. No exclamation points outside dialogue, and almost none inside it.

**Punctuation.** The em dash (—) is **permitted, and every use is a deliberate choice** (author reversal, 2026-07-31; the earlier zero-tolerance rule is retired and lives in `tools/superseded.txt`). The reasoning behind the old ban still stands and still governs the default: the em dash has become a machine's tic, and it is the fastest way to make prose read as generated. So the default remains a comma, a period (split the sentence), a semicolon, a colon, or parentheses, chosen for the flow of that particular sentence and *varied* so no one mark becomes its own tic. Favor the period: real people speaking a story aloud break into new sentences far more than they nest clauses in dashes. Reach for the em dash when that specific sentence genuinely wants it and no other mark will do, not as a habit. `tools/prose-lint.sh` enforces this shape rather than a ban: it WARNs on every occurrence, so each one is looked at and justified in the engine report, and FAILs above 2.0 per 1,000 words, the density at which the mark stops reading as a choice. This is **not retroactive**: finished prose is not to be re-punctuated to add dashes. The manuscript held zero until the author's approved Prologue+Ch 1 revision (2026-07-31) introduced 6, all in Ch 1, at 1.2 per 1,000 words — comfortably inside the ceiling, and a useful worked example of what deliberate use looks like. For a trailing-off or cut-off in dialogue, use an ellipsis (…), not a dash. **En dashes and any dash built from hyphens remain out** (a prose-lint FAIL); ordinary hyphens inside compound words are fine. Chapter titles take a colon, not a dash. Read every finished paragraph aloud in your head: if it sounds like a person by a fire, keep it; if it sounds like a keyboard's default, re-punctuate.

**Narratorial asides (use sparingly).** The teller may occasionally reach out of the scene, but
sentences that stop the story to wink at the reader ("I will not pretend I knew what I was looking
at", "I did not know then that…", "the trouble with knowing the ending is you keep wanting to give
it away", mid-sentence parentheticals that editorialize) INTERRUPT FLOW. Keep them rare and only
where one clearly earns its place; the default is to stay inside the scene and let the reader feel
the foreshadow rather than be told it exists. When in doubt, cut the aside and keep the image.

**Asides must be fully formed, or cut.** A worse failure than the aside that winks is the aside
that is only *half* an observation: a throwaway clause that raises a question and then walks away
from it without paying it off. "Lira, who I do not believe slept at all, set porridge in front of
me" is a bug: it invites the reader to wonder *why* the narrator believes that, or what it says
about her, and then answers nothing, so it adds interest it never spends. Either the observation
earns a beat of its own (give the reason, the evidence, the meaning it points to) or it does not
belong in the sentence at all. Do not sprinkle these unformed, faux-knowing fragments in for
texture. If an aside cannot say the whole of what it means to say, delete it and let the plain
image stand. Test every aside: *does it finish the thought it starts?* If not, cut it.

**Weather and season.** Every chapter is anchored in season and time of day within its first paragraph: frost, light quality, smell of the air. The seasons are structural, not decorative; autumn light going long and gold is doing narrative work.

**The hum.** The hill's sub-harmonic is never described the same way twice, and never as sound alone: it is felt in the soles of the feet, in the bones, as pressure, as attention, as "a knowing." Keep it below hearing. Its two daily pulses (dusk, predawn) can mark scene time.

**Interludes.** Four short passages from the hill's perception between parts, third person, present or timeless in feel. No dialogue, no named emotions, geologic patience. The hill has no words; it has weight, warmth, direction, and waiting. Sentence fragments allowed here and only here. Keep them short (roughly half a page to a page) and set apart from the numbered chapters (`NNb-interlude-*.md`). They carry the mystery's pulse and always know a little more than Emlyn does about how much the hill notices; they never state the twist outright.

---

## POINT OF VIEW DISCIPLINE (Spellmonger hybrid — updated 2026-07-11)

The book follows Emlyn but is **not wholly in his voice.** Two modes, one per chapter, never mixed
within a chapter:

- **Emlyn's chapters (the default, most of the book): FIRST PERSON, past tense.** His voice: dry,
  precise, self-aware, warm underneath; he observes his own grief the way he'd observe a ward with a
  flaw he isn't ready to repair. He tells it at a **near remove** — close to the living of it, with
  ordinary hindsight ("I didn't know it yet") — **not** as an ancient chronicler decades later. No
  deep-time framing, no "this account," no correcting the legends about himself. Inside an Emlyn
  chapter we still never enter another head: we see others only through what is physically observable
  (Lira folding a letter, Jorin's hammer pausing a half-beat).
- **Other-character chapters + interludes: THIRD-PERSON LIMITED**, past tense, on one character (or
  the hill, for interludes), in the same blended voice. Used when the reader needs a scene away from
  Emlyn (Lira sealing a Conclave letter; Tomas alone with the hum before his confession — but only
  *after* the mystery can bear it; the hill between parts). Stay in that one head for the whole
  chapter; no head-hopping. Reserve it — most chapters are Emlyn's.

Never spend a mystery early by choosing a POV that knows too much: no inside-Tomas chapter before
his confession beat, no hill-interior that states the twist.

---

## DIALOGUE & CHARACTER VOICES

General law: nobody in this book explains themselves at length. Subtext over text. Conversations carry freight in what is *not* said. Attribution stays simple — said, asked; action beats over adverbs.

**Emlyn** — precise, courteous, quietly funny; humor is dry and self-deprecating ("what's the point of being a big mysterious wizard if I can't make roads appear"). Teaches by question and demonstration. Never lectures on grief.

**Jorin** (builder) — single words carrying paragraphs: "Good." "Even it runs north. Slight. You feel it." "Boy's ready." When he says more than two sentences, the moment is major. He aligns objects with table edges.

**Tomas** (smith) — stillness. Speaks in short complete sentences with long silences between. Asks single load-bearing questions ("Waiting for what?"). His "Even." closes deals. Never uses two words where the pause will do.

**Brenna** (herbalist) — precise and unhurried; considers before speaking, then speaks completely. Channels her grandmother in counsel ("I'd ask the hill. Walk the property line."). Comfortable with silence; the only character who matches Emlyn's register.

**Lira** (tavern keeper) — ledger-speak: facts offered neutrally, watched for reaction ("Edran's been routing the quarry deliveries through Maret's yard."). Warmth expressed only through service — the refilled jug, the lamp in the window — never through words. Her almost-smile is a chapter-level event.

**Soren** (10) — solemn, exact, whole-attention. Asks structural questions ("Is that why the Study doesn't fall?"). Child logic rendered with dignity, never cuteness. His territorial arithmetic about shared attention shows in a one-second look, then generosity.

**Ren** (16) — careful, honest to the grain; differentiates what he knows from what merely sounds right ("That felt like someone explaining something they'd read about, not something they'd felt"). Physical metaphors from building ("like pouring from two pitchers into one cup — the water would crash").

**Penworth** — dry, formal, loyalty expressed as impeccable logistics. Letters in his voice are miniature essays of understatement. (Novel canon, per the story bible: he is ~Emlyn's own age and has run Emlyn's affairs ~a decade — never "old," never "thirty years with him.")

**Cael** — elder's obliqueness; approaches subjects sideways and lets the listener close the distance.

---

## MAGIC ON THE PAGE

Magic is craft, and it is written like craft: preparation, attention, cost, and rest. Rules for the drafting model:

Workings are *asked*, not commanded — the book's thesis ("ask for passage") is enacted in every ritual scene. Show the wizard feeling for what is already there before adding anything. After significant work, show cost: aching shoulders, spent concentration, early sleep. Never fireballs, never glowing eyes, never incantations in fake archaic language; workings are mostly silent, done with hands, breath, and attention. Enchantment scenes read like lutherie or smithing — tools, tolerances, materials with opinions. Instruments (resonance fork, sensitized paper, recording blanks) behave consistently per the canon appendix in the outline. Wonder comes from *response* — the ground answering, a plant turning its leaves toward the hill — not from display.

---

## PACING & CHAPTER SHAPE

Let the material set the length; session-lock #7 makes chapter length deliberately flexible and there is no target or floor. Some chapters are a single quiet scene, others a fuller day. Don't pad to a length and don't cut a living scene to hit one. What IS worth watching is scene density rather than size: long paragraphs and few voices are the signature of summary standing in for scene (tools/craft-check.sh measures it; references/craft.md §2 explains it). Don't pad to a target and don't cut a living scene to hit one. The common shape is a domestic one — anchor (season, place, task) → encounter or work → turn (something small shifts) → settle (an image, not a summary) — but it is a tendency, not a mold; a chapter may be a walk, a conversation, or a long noticing, and the narrator's attention can override the shape whenever it has reason to. End chapters on images or single lines of dialogue, never on cliffhangers or questions to the reader — with the sole exception of the finale, which ends on the needle.

Slice-of-life is the texture, and the four threads (building, apprentices, grief, undercurrent) run under the whole book — but a chapter follows whichever are alive in it, and one whose real work is atmosphere, character, or the narrator's voice earns its place if the attention is alive on the page. What gets cut is the empty chapter: one that neither moves nor deepens anything, not the quiet one. The undercurrent surfaces when the story's pressure calls for it, not on a fixed count; most of the time it stays as weather — a letter, a look, a pause at the forge.

The opening especially breathes. Give the first several chapters room to establish the narrator's voice, the hill, the village, and the texture of this rebuilt life before the undercurrent tightens. Start wide and unhurried; let the reader fall in love with the world and the teller before the plot asks anything of them.

Time moves honestly. Errands take hours; a round trip to the quarry consumes a day; construction takes weeks and is compressed in montage paragraphs anchored by day-labels and physical progress, never by "time passed."

---

## MOTIF SYSTEM (repeat with variation; never explain)

The kettle (domestic time; interruption and welcome). Frost and its lifting (thaw = trust). Lamp-light and the LUMEN's amber (made warmth against old dark). Hands (every character characterized by what their hands do). Bread (hospitality; the apprenticeship is sealed with it). The refilled jug (Lira's entire arc in an object). River stones weighting paper (a child keeping what matters from floating away). The sticking drawer (grief's grip; it opens when the letter is read). The pause before Tomas speaks. The needle (only at the very end; earned by all the rest).

---

## DO / DO NOT

**Do:** trust silence; let readers assemble meaning; keep stakes village-sized while implications grow; render children with dignity; keep the Conclave and the correspondents as distant weather until Part IV; let the twist recontextualize rather than shock.

**Do not:** use modern idiom or techspeak ("okay," "process his feelings," "energy signature" — say *imprint* or *signature* only as the instruments' craft-terms already established); psychoanalyze characters in narration; write flashbacks of Arielle (she exists in objects only); inflate to epic stakes; give villains page-time (there are none on stage in Book One); use numbered lists, headers, or any structural furniture inside the narrative; break POV; explain the marginal note — quote it and let it work.

---

## LEXICON (use these terms exactly)

**The LUMEN** — the original lamp in the Study, drinking hill-song. **LUMEN Series** — the sellable line drinking ambient light; three layers (photonic architecture, sensitivity lattice, binding) set into crystalline blanks, then housed in Tomas's metal fittings. **Deep Grammar** — Emlyn's recording program; **blanks** are the crystalline recorders; readings are done palm-to-crystal. **Reshaping ward** — excavation/leveling working. **The Singer / the Listener** — the grandmother's names for hill and oak. **Keeper plant** — her thirty-year charge. **Planewright** — Emlyn's discipline; **the Planewright's Compass** — his hidden instrument that finds existing potential planes. **The Conclave** — the distant magical authority; **Drace** — its interested official. **Sensitized paper**, **resonance fork**, **the hum**, **the pulses** (dusk and predawn). Spelling: **Ren** (or "Wren" if the author prefers — choose once, hold throughout).

---

## SCENE CRAFT DIALS (locked 2026-07-14 — the author's four standing pushes; write toward these from the first line)

1. **More dialogue.** The book's most alive passages are its talkiest (Cael at the inn, Jorin's
   "Good"). Let load-bearing exchanges PLAY OUT IN VOICES: negotiations, confessions, teases,
   bargains happen as talk on the page, not as the narrator's recounting of talk. Every chapter
   wants at least one or two sustained dialogue scenes. NPC speech rules still govern every line.
2. **Scene over summary.** Montage/summary is a BRIDGE between beats, never the beat itself. If a
   chapter's turn, deal, discovery, or first-meeting happens inside a summarizing paragraph, stop
   and dramatize it in real time. (The montage habit is the identified drift: several early
   chapters compress lived scenes into recounted report.)
3. **Vary the bookends (openings AND closes).** The default open (weather/season/state-of-me) has
   become a pattern; so has the evening-alone-reflective close. Rotate OPENINGS deliberately: open
   mid-dialogue, mid-task, on another person arriving, on an object, in a room the reader hasn't
   seen. And glance at the previous 2–3 CLOSES: if a third straight quiet-evening-coda is forming,
   vary the *shape* of the close (time of day, subject, who is present), never its calm. This does
   NOT ban the cozy close (the register's birthright) or the deliberate callback-closers (the
   lamplight, "for company," "see what the morning would bring"); it just prevents an accidental
   third in a row. Check the previous chapter's opening and the last two closes before drafting
   (pre-draft brief item).
4. **More humor.** Wry asides alone don't carry the Mancour warmth. Aim for at least one genuine
   comic beat per chapter: a running bit (Snow's grudges, Penworth's letters, the village's
   standing opinions), a deadpan exchange, a small domestic absurdity. Humor is a craft beat, not
   a garnish; it earns the quiet moments. Running bits MAY recur across chapters (they are
   callbacks, not echoes — note deliberate ones in the phrase registry's comments, don't register
   them as one-use).
