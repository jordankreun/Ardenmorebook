# MODE: REVISE-MODERATE — improve existing prose without redesigning it

**This is the DEFAULT mode for any request to change existing prose.** "Rewrite this," "tighten
this," "make it move better," "this drags," "clean up chapter N" all land here unless the author
names another mode.

The job is to **remove friction, not redesign the chapter.** The scene that exists is the scene
that stays.

## LOAD

**Measured load: ~16,900 words.** See the router for the baseline and the method.

- `references/session-locks.md` (always, first)
- `references/voice.md` — the primary prose authority in this mode. **Its SCENE CRAFT DIALS
  1, 2 and 4 do not apply here.** They instruct additions — more dialogue, summary converted to
  played scene, a comic beat — which are on this mode's FORBID list. Dial 3 (vary the bookends)
  does apply, being diagnostic rather than additive.
- `references/feedback-engine.md` — **named sections only, not the whole file.** In order:
  **P1c** (the author's line-edit fingerprint, extracted from 26 of their own tracked changes;
  the most relevant section in the engine for this mode), then **P0, P1, P2, P3, P4, P5, P6**.
  **Do NOT load** the PRE-DRAFT BRIEF or HOW TO RUN THE PASS (both are drafting instructions and
  say so), **P1b** (it directs which transactions to *dramatize*, which is invention), or the
  intake protocol. Loading the file whole puts ~2,158 words of drafting instruction inside a mode
  that forbids drafting.
- the target passage, and enough of the chapter around it to hear the rhythm it sits in
- `state/story-bible.md` — **only** the spine (SESSION-LOCKED, LOCKED CANON, CAST, NUMBERS
  LEDGER) plus the `ESTABLISHED ON THE PAGE` block for this chapter
- `state/engine-reports.md` — this chapter's block, if one exists. It tells a silent miss from a
  conscious keep, which changes what a note means.

**Do NOT load** `storycraft.md`, `outline.md`, or `exemplars.md`. Those govern what a chapter IS.
This mode is not permitted to change what a chapter is, so loading them only invites the
escalation the router forbids.

## PRESERVE

Everything that carries the story's architecture:

- scene order, and the number of scenes
- dialogue substance and each character's speech rules
- technical and economic exposition wherever it establishes a constraint, a decision, a cost, or
  a payoff. The world's logic is not padding.
- emotional turns, and the objects that carry them
- foreshadowing, and every blind seed at its current temperature
- reflective breadth, material specificity, village texture, deliberate atmosphere. **Stillness
  is a deliverable, not a defect** (storycraft Module 0). A passage is not broken because it is
  quiet.

## FORBID

- new plot events, new magical effects, new named entities, new jokes, new dialogue, new conflict
- changing the scene's outcome, or what a character knows at the end of it
- reaching for structure. If the real problem is structural, **stop and say so** rather than
  solving it here.

## THE WORKFLOW — FIVE STEPS, IN THIS ORDER

Do not begin at the sentence. "Improve the prose" is not a pass, and starting with polish is how a
revision quietly becomes a rewrite.

1. **Inventory.** Before changing a word, name the passage's scene function, immediate objective,
   obstacle, change, cost, dialogue exchanges, objects, and any foreshadowing. This is the list of
   what must survive; everything below is constrained by it.
2. **Find duplicated meaning.** Mark where the narrator explains what an image, action or silence
   already showed. This is the primary target and the section below defines it.
3. **Tighten internally before deleting anything whole.** Shorten clauses and transitions first.
   A digression is cut only after internal tightening has failed, and never merely for being a
   digression.
4. **Control sentence load.** Trim or split only sentences that continue past their natural
   landing point. Length is not the defect.
5. **Restore texture, then check for invention.** After cutting, verify that humour, material
   detail, reflective breadth and emotional indirection all survived. Then remove anything the
   revision introduced that was not in the source — a fact, a motive, a named entity, an effect.
   `tools/revision-diff.sh` runs this step mechanically; step 5 is not done until it has.

## WHAT THE WORK ACTUALLY IS

Movement comes from subtraction and sentence control, not added activity:

- **Duplicated interpretation is the primary target.** The book's characteristic flaw is saying a
  thing in an image and then again in a conclusion. Keep the image; cut the gloss.
- Redundant conclusions, overextended transitions, overloaded sentence tails.
- Where the source offers two strong images for one beat, keep the better one.
- Long sentences are kept **where they accumulate meaning**, and split or trimmed where they
  continue past their natural landing point. Length is not the defect; continuing after the
  landing is.
- Let concrete action and objects carry the emotion without a second explanatory paragraph.

## THE SCENE-ENDING CODA — THE PRIMARY TARGET

The book's most repeated structural habit is the **interpretive coda**: a scene lands, and then the
narrator steps in beside it to explain the workmanship. Where the LENGTH table below says the
words come from, this says which words.

For each scene ending, take the **final three paragraphs** and mark every sentence as one of:
action · image · new fact · character judgment · retrospective complication · thematic
interpretation · **repetition**. Then apply the one test:

> If the final interpretive paragraph is removed, does the scene still carry its emotional and
> thematic meaning?

When the answer is yes, cut the paragraph or keep only its strongest sentence.

**Interpretation earns its place only when it does one of six things**, and merely confirming what
the reader already understood is not among them:

1. shows older Emlyn understanding the event differently from younger Emlyn;
2. adds information unavailable in the scene;
3. complicates the apparent meaning rather than restating it;
4. creates irony between the remembered event and its consequences;
5. connects to a theme the scene cannot carry alone;
6. establishes a meaningful **misreading** by the narrator.

**Vary the endings.** The prohibited default is the four-beat run: concrete emotional event →
retrospective explanation → general truth → lyrical restatement. Reserve that for a genuine
turning point. Otherwise end on an unanswered question, an object, a changed gesture, an
interruption, a practical consequence, a line of dialogue, a silence, a sensory detail, a
contradiction, a promise, a mistake not yet recognised, or an image left unglossed.

**Protect blunt lines.** After "The wool owed me nothing.", "I will not make the fire beautiful.",
"And pointed straight down." — add nothing. The explanation is what would weaken them.

**Generalisation discipline.** Emlyn converts experience into what "a man" does. Keep it only
where it reveals his worldview, his avoidance of first-person confession, a belief the plot later
challenges, or older Emlyn turning private pain into usable knowledge. Where it is decorative
wisdom, make it personal: *I mistook this* over *a man mistakes this*.

## THE FOUR PATTERNS UNDER THE CODA

The coda is the visible form. These are the shapes it takes, and each has its own fix.

- **The doubled conclusion.** observation → reflection → conclusion → general truth → *second*
  conclusion → aphorism. The reader was finished at step two or three. Cut from the back until
  the paragraph stops repeating itself.
- **The untrusted image.** *I saw X → X was like Y → which meant Z → and perhaps that says
  something about life.* The first two earn the moment; the last two spend it. **Keep the image
  and stop.** Where two metaphors do the same work, keep the more precise one and delete the
  other outright — do not blend them.
- **Landing, then continuing.** At every scale. The clause arrives and another follows; the beat
  lands and an explanatory paragraph follows; the scene finishes and a page reinforces it. Almost
  none of these additions are bad, which is why they survive. They are simply unnecessary. Ask of
  every ending: *could this stop one beat earlier?*
- **The over-written transition.** house → thought about the house → why he thought about it →
  which reminded him → new topic. **One bridge sentence is enough**; readers infer the rest.

## THE ADDITIVE HALF — WHAT TO PUT IN

Everything above removes. Three things this mode is allowed, and expected, to **add**, because
each is an absence rather than an excess:

- **Uncertainty.** Where older Emlyn explains younger Emlyn with total confidence and the
  confidence is not earned, convert it: *I was not sure why, then.* / *I understood that only
  later.* Two such admissions exist in the whole manuscript. This is the single highest-value
  addition available in a revision, and it costs nothing structurally.
- **A plain paragraph inside a lyric run.** When `craft-check.sh` reports a lyric run, the fix is
  to let an ordinary paragraph stand between the worked ones — logistics, motion, a thing done.
  **Never thin the lyric paragraphs to satisfy it.**
- **Delay, where the world arrives before the curiosity.** Good fantasy lets the reader ask *how
  does this work?* before answering. Where an explanation precedes the question it answers, move
  the question earlier or the answer later. This reorders; it does not cut, and it is the one
  reordering this mode may do.

**Demonstrate the restraint, do not describe it.** The book's defining quality is Emlyn's
reticence, and it weakens every time the narration explains that he was being reticent. Let it
show in what he notices, what he declines to say, and what he does with his hands instead.

## LENGTH — TWO SCOPED EXPECTATIONS, NOT ONE BAND

Compression is an **outcome of removing duplicated meaning, never a target to hit.** But how much
it should come to depends entirely on the unit of work, and getting that wrong is the most
expensive mistake available in this mode.

Both numbers below are measured from the author's own approved work.

| unit of work | expect | evidence |
|---|---|---|
| a paragraph or a passage | **≈ neutral** (±3%) | 60 approved tracked changes, `feedback/revisions.json`: aggregate −4.4%, median ratio 0.991, 51% within ±3%, 8% *grew* |
| a whole chapter | **11–16%** | the golden fixture: Prologue −18.1%, Ch 1 −13.3%, −13.8% together |

They do not conflict. A paragraph-level edit is **substitution** — the author swaps wording and
keeps length. A chapter-level pass is **compression**, because duplicated interpretation is only
visible across a chapter. **Applying the chapter number to a paragraph is over-cutting**, and it
is the specific failure this table exists to prevent.

If a passage already says each thing once, the right revision may keep its length or lengthen it.
Report what the length did. Never cut to reach a number, and never treat a target as a reason to
remove necessary material.

**A whole-manuscript target is a third scope, and it is not this mode's.** The author's revision
brief sets a book-level goal of 12–16% (roughly 12,000–18,000 words), distributed across opening
compression, scene-ending codas, repeated technical procedure, repeated thematic formulations and
line-level tightening. That is a **campaign** across many chapters, run as a sequence of scoped
passes — not a percentage to apply to whatever passage is in front of you. Taking a book-level
figure to a single paragraph is the same over-cutting error as taking the chapter figure there,
one scope further out.

## THE STYLE REFERENCE — READ IT FOR THIS MODE

`references/golden/prologue-ch1/` holds the author's approved source/revision pair, a measured
`delta.md`, and **`moderate-revision-style.docx`, the author's own operational style reference,
which governs this mode wherever it and this file disagree.** Its §9 carries three worked
examples, including a deliberate *non*-example: a reflective passage left untouched, because
reflection that adds meaning the gesture does not contain is not a compression target.

Its governing sentence, and the best single test available here:

> The revision should feel as though the original author stopped one sentence earlier in the
> places where the prose was over-explaining, not as though a different author rewrote the
> chapter.

Its named shortcuts, all forbidden: adding action to make a chapter move; adding dialogue or
comedy to satisfy a quota; stripping technical exposition; converting the prose to short modern
sentences; cutting a digression merely for being one; adding a magical hint or plot hook;
explaining a strong blunt line afterward.

## THE HARD BOUNDARY — WHAT THE FIXTURE MUST NOT TEACH

The approved revision added one beat that is **not** in its source: the floorboards and the basin
water, in Ch 1. The style doc flags it itself as *"a developmental choice, not a normal feature of
the revision style."*

**Do not generalize from it.** A moderate revision that invents a beat, a hint, or a piece of
foreshadowing has left this mode without saying so, which is exactly what the router forbids. If
a passage genuinely needs one, stop and say so.

## OUTPUT CONTRACT

Return, in this order: a short diagnosis of what is slowing the passage; the revised passage; a
change log separating cuts from anything developmental that was explicitly requested; and a
continuity note for anything that cannot be resolved from the source.

## POST-FLIGHT

- **`tools/revision-diff.sh <source> <candidate> moderate`** — the mechanical half of this mode's
  contract, and the only tool in the engine that can see what a revision *did*. FAILs on an
  invented named entity, on dialogue removed, and on a registered coinage lost. Run it before the
  lint: if preservation broke, the line-level state of the prose does not matter yet. Get the
  source from git (`git show HEAD:manuscript/NN-slug.md > /tmp/src.md`).
- **The phrase registry.** If the diff reports a lost coinage, either restore the wording or
  update that row in `tools/phrase-registry.txt` to the new phrasing. Do neither and the row goes
  stale silently — `prose-lint` cannot detect an *absence*, and this has already happened once,
  in the author's own approved Ch 1 revision.
- `tools/prose-lint.sh` on the file. Zero FAILs. Review every WARN.
- `tools/craft-check.sh` if the revision touched a whole chapter, as a shape sanity check only.
- **Do NOT update state when no facts changed.** A prose revision that alters no canon, no
  timeline, no geography, and no thread status writes nothing to `state/`. Updating state for a
  wording change is how the ledgers fill with noise.
- If a fact *did* change, you are in the wrong mode for at least part of the work; say so.
- Give the author a 2–4 line report: what you cut, what you deliberately kept, and what the word
  count did.
