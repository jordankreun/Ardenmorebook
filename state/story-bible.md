# STORY BIBLE — what is CURRENTLY TRUE in The Tower of Ardenmoor

### Read the spine before any work; read an ESTABLISHED entry when you touch that chapter.
### This file states current truth ONLY. It carries no drafting history: what was cut, which pass
### changed what, and why a rule exists all live in `archive/state-compaction-2026-07-31/`.
### Compacted 2026-07-31 from 1,921 lines. Nothing was deleted, only moved or folded.

## STATUS

- Chapters drafted: **BOOK ONE IS COMPLETE — Prologue + Chapters 1–32 + coda + Interludes I–III.** 37 files,
  `00-prologue.md` … `32b-coda.md`, all listed in `manuscript/manifest.json`. **185,036 words**
  (prose lines only; blank lines and `#`-headers excluded — the method `tools/state-check.sh`
  documents). Keep this bullet current: `state-check.sh` FAILs when it falls behind the manifest.
- **Current work is REVISION, not continuation.** The storycraft pass (2026-07-31) runs part by
  part; Part I is done. Part boundaries: I = Prologue–Ch 7 + Interlude I · II = Ch 8–15 +
  Interlude II · III = Ch 16–25 + Interlude III · IV = Ch 26–32 + coda.
- **⚠️ THE BOOK IS CURRENTLY LOPSIDED, BY DECISION (2026-08-09).** Parts I and II were expanded to
  roughly **2.3× their length** on the author's instruction ("these chapters seem too short … at
  least twice as long"). Ch 1–15 now run **5,000–10,400 words**; Ch 16–32 still run **2,000–5,600**.
  **Parts III–IV are queued for the same treatment** and until they get it a reader will feel the
  back half accelerate. Do not "fix" the imbalance by cutting Part I, and do not treat the Part I
  lengths as the new house target — session-lock #7 (length is flexible, material sets it) is
  unchanged. **The method, for the follow-up run: SUMMARY BECOMES SCENE.** The compressions already
  in the text ("Jorin came up to build it, and brought Ren") are opened out into played scenes with
  dialogue, weather and hands. No new plot, no new named entities, no raised stakes; every existing
  sentence preserved by anchored insertion. Parts III–IV carry more plot and less summary than
  Parts I–II did, so the same 2× target will strain harder and must not be met with padding.

## WHERE TRUTH LIVES (read this before looking for a fact)

| you want | it lives in |
|---|---|
| how to write it (process, voice, POV, forks) | `references/session-locks.md` — binding, read first every session |
| what is true in the world | **this file** |
| every setup and whether it is PAID / BANKED / OPEN | `state/thread-ledger.md` |
| places, directions, distances | `state/geography.md` |
| money model in full | `references/economy.md` |
| why a rule or fact exists | `archive/state-compaction-2026-07-31/` |

**PENDING PAYOFFS is gone** (524 lines, removed 2026-07-31). `state/thread-ledger.md` supersedes
it and says so in its own header. Do not re-create a second setup list here.

## SESSION-LOCKED WORLD FACTS (binding; supersede the references where they differ)

Process and craft locks live in `references/session-locks.md`. What follows is locked **fact**.

- **Name.** The protagonist is **Emlyn Ambrose**. Only "Emlyn" has been given on the page;
  **Ambrose is withheld** until the author reveals it.
- **Emlyn.** Past forty at the opening, looks a good deal younger. Only child, both parents dead.
  Father was an architect who founded a small Vethmark firm; Emlyn learned drawing at his elbow
  and paid his way through school with drafting work. **Engaged, not married** — lost his fiancée
  about three years before page one, before the wedding.
- **Penworth.** Roughly **Emlyn's own age** (never write him "old"); has run Emlyn's affairs
  **about a decade**. A **minor magical talent**, hence slightly long-lived — indirect at most,
  never stated outright. In a world where talent is rare, that minor gift is a real edge and part
  of why he is so formidable.
- **Talent slows aging** (soft rule, continuity not exposition): greater talent, younger-worn
  years. Emlyn markedly, Penworth slightly. Never explained in prose.
- **"NOT EVERYONE IS GONE."** Because talent slows aging, the narrator has outlived *most* of
  this story's people but **not all** — other long-lived talents endure. **Never write "everyone
  I knew is gone."** The grief of long life is outliving most while a few of his own kind remain.
- **Lira.** Measured, practiced, reserved. Few words, no wasted motion; she "gives a stranger
  nothing he has not paid for, neither warmth nor its opposite." Not warm initially and not
  frosty: the reserve is **economy, not coldness**, and real warmth is earned and comes later.
  She volunteers nothing and shows no curiosity about the hill. Her Conclave-informant thread
  stands; the reserve suits it.
- **Soren** is about nine at arrival; his tenth birthday lands in autumn.
- **The arrival.** Penworth found and provisionally purchased the hill plus surrounding land. The
  hill has no agricultural worth; the holdings deliberately include **leasable plough-land in the
  bottoms**, the woodland strip, the NE meadow, and a mill-pond water stake. Emlyn came to view
  before completing. **No fate-pull**; the narrator explicitly disclaims it.
- **THE COINAGE — LOCKED 2026-07-27.** The reader learns three words they know and **one new
  one**. **gold · half-gold · silver · half-silver · copper**; the halves need no teaching. The
  one new word: **a MARK = one silver piece**, the Commonwealth's unit of account, used by banks,
  contracts and Penworth's letters the way sterling says *pound*. Nothing else is named.
  *Behind the scenes only, never for the reader: 12 copper = 1 silver · 24 silver = 1 gold.*
  A reader must never need that arithmetic.
  **Teach magnitude, not ratios:** a loaf 1–2 copper · a pint 2–3 copper · a day's labour 3
  silver · **a labouring man's week 20 silver (just under a gold)** · a skilled man's week 36
  silver · Jorin's week 48 silver · a cottage's year rent 5 gold · a cow ~12 gold · a good horse
  ~30 gold. **THE ANCHOR: a gold is about a week's wages for a working man** — land that once,
  early and in passing, and the reader has the scale forever. So the poverty beat needs no
  explaining: eleven silver is half a labouring man's week.
  **Register:** metal everywhere, including Emlyn's own head; **marks only** in contracts, bank
  paper, the rent roll and Penworth's letters. Penworth writes *"eleven marks"*; Emlyn thinks
  *"eleven silver and four copper."* **The gap is the distance he has travelled.** Track the
  drift toward metal by Book Two; nobody remarks on it.
  **Prose rule: one denomination per sentence.** Never make anyone add across units.
  Full model: `references/economy.md` §0.
- **THE MONEY IS FINITE (session-locked 2026-07-11).** Emlyn is comfortable, professional-class
  and **leveraged**, not limitless. He buys undeveloped, undervalued land in one large finite
  purchase and must build and grow it into something that pays, or the debt sinks him. He cannot
  simply buy the next thing. This constraint is load-bearing and must stay felt.
  - **Two city homes.** The **family townhouse** he inherited from his parents, and the **river
    house** across the water — the wedding-gift home, grander than anything his father would have
    signed, drawn by Emlyn in the good years, never lived in.
  - **The forcing lever (set at Ch 1).** By the opening Penworth has found a buyer for the river
    house and has not said so. The errand to Ardenmoor is the lever that lets the unsellable house
    be sold out from under him.
  - **The river house returns HALF — locked 2026-07-27.**
  - **Financing:** Penworth-arranged, finite, with a **grace period**; an initial outlay against
    the rest. Post-purchase Emlyn is **capital-constrained and carrying a note**.
  - **⚠️ THE FIRST BILL IS THE TRANSFER DUTY (author, 2026-08-09).** The financing above is
    unchanged, but the pressure in the Ch 8–9 stretch is **the Commonwealth's transfer duty on the
    holding** — levied on every acre, working and waste alike, on reckoned worth rather than on what
    the land earns — plus the plain running cost of the place. Set out in Ch 3 in Penworth's second
    column and named again in Ch 9 ("costs coming due", not "a note"). **Parts III–IV are untouched:**
    Penworth's three conditions (Ch 19), the harvest as an installment (Ch 16) and "The note was
    paid" (Ch 18) all still refer to the financing.
  - **The lamp trade is NOT a rescue** (same decision). Penworth's columns in Ch 8 deliberately size
    the run small: it buys timber, a guest cabin, the unglamorous materials a building year eats —
    and it does not touch the duty, and cash is still wanted in spring. Never let the lamps read as
    the thing that services the debt.
  - **The river house was a COMMISSION, not his design** (author, 2026-08-09). He drew a small part
    of it; his father's firm drew the rest and managed the build. The emotional content is that he
    was taught to ask a house what it wanted to be, and instead told the men who taught him what he
    wanted — so the garish pile is his father's wisdom thrown away, not his own draughtsmanship.
    This is what makes Ch 9's *"I sat down at my own bench, and I took a clean sheet, and I drew a
    house"* land, and that line is protected.
  - **Grief and money are entangled** (author, 2026-07-14: "money mid-book, rooms sealed").

## NUMBERS, AGES & DURATIONS LEDGER (check every stated figure against this)

Keep these consistent across chapters — the exact trap the author flagged (e.g. Penworth
"longer than I can recall" vs "thirty years"). If a chapter states a number, it must agree here;
if it needs a new one, add it here.

- **⚠️ EMLYN'S PROFESSION — CORRECTED 2026-07-15 (author): his trade is GENERAL WIZARDRY + PATENTS.**
  A practising wizard eats two ways: (1) **the general practice** — being the one person in the
  district who can do the things nobody else can, a great many unrelated jobs that pay the week's
  bills; and (2) **PATENTS**, which is where the money that lasts comes from. A wizard who devises a
  genuinely new working **registers** it; thereafter anyone wanting that working done pays for the
  right, and **a good deal of a wizard's life is spent quietly defending the patents he holds against
  men who would rather not pay.** ("It is a duller profession than the tales allow. It is largely
  correspondence.") This is canon-consistent with the existing loan "secured against old, already-
  LICENSED patents" (quarterly royalties) and the **LUMEN Series patent** (Ch 8) / "the spring patents"
  (outline Ch 19).
  **⚠️ GROUND-WORKING IS NOT HIS TRADE.** It is ONE patented invention: devised **when he was young and
  still half in his father's office**, after the firm had a bad season with a riverside site that would
  not hold what his father had drawn. He solved it "the way a draftsman's son goes at things," and
  **registered it**; the firm never lost another site; it has paid him **a few gold a quarter** ever
  since from builders who have never met him. He had **not laid a footing in years** except his own.
  → Do NOT write ground-command as his everyday craft or his defining skill. When it appears, it is
  (a) a specific owned working, and (b) notable *because* he rarely uses it.
- **Emlyn's years in practice before the hill: ~TWENTY** (was "thirty", corrected 2026-07-14; and the
  old gloss "twenty years learning to command ground" is RETIRED 2026-07-15 — see the profession entry
  above; it is twenty years of general practice, not of ground-working). Talent developed AFTER boyhood drafting + paid schooling, so ~20 years of practice fits a man past forty; also consistent with the 20-year 'level I had carried' (Ch 7). Do NOT write thirty.

- **Emlyn's age at arrival:** past forty (40s); looks markedly younger (talent slows aging).
- **Emlyn's bereavement (ENGAGED, not married):** his **fiancée Arielle** died ~**3 years** before
  arrival, **before their wedding**; the death-notice letter came "three weeks late." "A bad few
  years" (prologue) = these ~3 years. NOT a widower (they never married); update any "wife/widowed"
  wording to fiancée/lost-before-the-wedding.
- **Penworth ↔ Emlyn:** ~**a decade** (Penworth took over "something over a decade" ago).
  Penworth is **~Emlyn's own age**. Do NOT reintroduce "thirty years [with Emlyn]" or "old."
- **CALENDAR SPINE (the book's clock — check every chapter's season/elapsed against this row;
  this is the cross-chapter arithmetic the per-chapter CANON check cannot see, and the trap that
  produced the Ch10 forty-vs-thirty + keeper-leaf dating slips):** arrival is **Year 1, third week
  of spring**. Elapsed is measured FROM arrival. When a new chapter states or implies a season,
  add its row here and confirm it does not run the clock backward or skip a season without a
  bridge. Season order: spring → summer → autumn → winter → spring(Yr2)…
  - **Ch 1–2** — Yr1, 3rd wk spring — elapsed ~1.5 days (arrival evening → next night).
  - **Ch 3** — Yr1, mid–late spring — elapsed ~2 wks (purchase completes; move onto the crown).
  - **Ch 4** — Yr1, **early summer** — elapsed ~2.5–3 mo (the first working; "weeks into summer").
  - **Ch 5** — Yr1, **late summer** — elapsed ~4–5 mo (Study raised, finished at **summer's end**).
  - **Ch 6** — Yr1, **early autumn** — elapsed ~6 mo (first lumen; "the winter's excuse gone").
  - **Ch 7** — Yr1, **autumn** — elapsed ~7 mo (Wednesdays; "autumn while my back was turned").
  - **Interlude I** — Yr1, autumn→winter turn (hill's seasonal, no dated events).
  - **Ch 8** — Yr1, **edge of winter** — elapsed ~9 mo (lamp business; "that winter, one lamp on Brenna's sill").
  - **Ch 9** — Yr1 winter → **thaw into spring Yr2** — elapsed ~12–13 mo (first winter passes; bathhouse ~3 wks).
  - **Ch 10 (THE WRAYS — NEW)** — **Yr2, spring** — elapsed ~12–13 mo (Cael names them; the tenancy negotiation; they arrive; a fortnight later Hal tells him what is really on his land).
  - **Ch 11** — **Yr2, late spring** — elapsed ~14 mo (Brenna's cottage; keeper plant; soldier's-heart flowered midwinter).
  - **Ch 12** — **Yr2, early summer** — elapsed ~15 mo (Tomas's forge, dusk; lamp-collar pickup; the confession).
  - **Ch 13** — **Yr2, early–mid summer** — elapsed ~16 mo (the cellar dug under the Study; chest carried down; recording blank set for a 30-day read; river-house SOLD, her things crated under seal).
  - **Ch 14** — **Yr2, mid-summer** — elapsed ~17 mo (a market morning; a bolting cart horse; Soren's talent slips DENIABLY at the square well; Cael's denial; Emlyn tells no one).
  - **Ch 15** — **Yr2, mid–late summer** — elapsed ~18 mo (30 days after the blank was set; Emlyn reads it; Penworth stays THREE DAYS; first loan payment made; a second blank started).
  - **Interlude II** — Yr2, a predawn (hill register; no dated events; the hill "says the shape of him back to the dark").
  - **Ch 16 (HARVEST HOME — swapped into this slot 2026-07-15)** — **Yr2, early autumn** — elapsed ~19 mo (the bottoms come in over nine days; the Wrays' supper; the cave found; the crop sold at Wainford).
  - **Ch 17 (THE RENT BOOK — NEW)** — **Yr2, October** — elapsed ~20 mo (eleven days on foot; the five inherited occupiers; consolidation by deal; Hask; Tam's twenty-four acres; the schedule to Penworth in November).
  - **Ch 18 (NOBODY WORSE OFF — split from The Rent Book)** — **Yr2, late October → November** — elapsed ~20–21 mo (the consolidation by deal; Hask; Tam's twenty-four acres; the schedule to Penworth).
  - **Ch 19 (STEEL AND GLASS — was 15, then 16, then 17)** — **Yr2, late autumn → into winter** — elapsed ~21–23 mo (frame up the road on 11 wagons; Jorin's winter crew set it; glass hung; Brenna's north corner; Essa's bed; the callipers drawer let stay stuck).
  - **PRE-FLIGHT:** the loan grace year (a full turn of seasons from Ch3) is **now up in Yr2**;
    the fire is **early winter Yr2** (~Ch27); the river-house sale closes **spring** (finale/Book Two).
    From Ch10 on the clock SLOWS (session-lock #10) — do not compress a season again without cause.
- **Ren:** ~**16** (confirmed on the page, Ch 5: "perhaps sixteen that summer").
- **Cael:** **late 50s** (adjusted 2026-07-12 per reader note "maybe in his late 50s, described
  vaguely"; was ~mid-60s). Described vaguely on the page — "a solid man on the near side of old, not
  young but a fair way yet from grey" (Ch 1). Grandfather; "private treaty with his knees." Timeline
  still coheres: his father's failed shelter ~**forty years back and further** (Cael a boy, ~9) →
  ~48–50 yrs ago; his grandmother died ~**forty years** ago ("forty years in the churchyard") and
  **left him the hill**, which he has "kept forty years" (he was **~18** then). Daughter Mira
  (~mid-30s) → grandson Soren (9). Keep the page description vague; don't state a number.
  ⚠️ **Novel canon:** Cael **inherited** the hill from his grandmother (she owned it; his father
  failed to build on it; she left it to Cael, not the father). This overrides the campaign's
  "Cael bought it himself." He now sells it to Emlyn.
- **Soren:** ~**9** at arrival (turns 10 in autumn, per canon).
- **The narrator's distance (updated 2026-07-11, Spellmonger hybrid):** Emlyn tells it CLOSE to the
  events, not from an ancient chronicler's vantage; his long life is a faint offstage hint, never the
  narrating stance (drop "longer than kingdoms"). No number.
- **Only child; parents both deceased** (father: founded a small Vethmark architecture firm, still
  operating, and **Emlyn holds his father's retained share** = modest steady income; Emlyn trained as
  a draftsman there). Father **designed the family townhouse for Emlyn's mother**; Emlyn later **had
  that same firm design the grander "river house"** as an echo of it. Talent-slowed aging is why the
  parents are gone while he looks young.
- **Emlyn's homes (Vethmark), TWO, now distinguished:**
  - **Family townhouse** — INHERITED from his parents; the "large, mostly-empty, dust-sheeted"
    house he wintered in alone (Ch 1). Comfortable, not extravagant. He **KEEPS** it.
  - **The "river house"** — the grander home he and Arielle chose together **ahead of their wedding**,
    bought as his **wedding gift** to her; she **died before the wedding**, so he **never lived there**
    and has not entered it since (= the canon "her rooms," the shelf-gap spellbook, their half-made
    home). **Penworth forces its SALE** (primary capital for the hill); it closes / is cleared in the
    **spring** (finale / Book Two). See the FINANCES & ORIGINS session-lock.
  - Vethmark ↔ Ardenmoor ≈ **a week's travel** (3 days' train to the railhead + 4 days' ride; see the
    revised DISTANCE & TRAVEL bullet). Penworth is based in Vethmark.
- **Arielle's rooms = the river house** (RESOLVED): in **Vethmark**, the never-lived-in wedding-gift
  home, untouched through Book One, cleared in spring (Book Two).

---

## LOCKED CANON (never contradict; see outline canon appendix for full detail)

**Protagonist.** Emlyn Ambrose — planewright wizard. Precise, patient, dry humor, grief-slowed.
Only child of a Vethmark architect; trained as a draftsman before his talent developed. **Fiancée
Arielle** (engaged, not married; she died ~3 yrs ago **before their wedding**) is dead before the
story opens; she appears ONLY through objects, never in flashback. Four grief-objects: the locked
chest (cellar NE corner), her mother's unopened letter (Study desk), dimensional callipers in a
sticking desk drawer, the gap on the spellbook shelf where a third book should be (that book is in
her **city rooms = the never-lived-in wedding-gift "river house,"** which he is forced to sell to
fund the hill but cannot clear until spring — see FINANCES & ORIGINS).

**The hill.** Hums sub-harmonically; pulses at dusk and predawn; responds to storms; cooperates
with workings that ask rather than command; defeated every prior building attempt (Cael's
father, 40 years ago). In conversation with the old oak (north wood) longer than living memory.
Per the Deep Grammar readings: carries Emlyn's specific shape; predawn pulse developing
structure; transmits a *greeting* toward the cellar's NE corner. TWIST (Ch 28 only): the
Planewright's Compass, when finally used, points straight DOWN — the hill is adjacent to an
existing potential plane and has been waiting for someone to notice the door.

**⚠️ THE GRAIN AND THE KNOT — what is under the hill (author, 2026-08-08).**
Magic is **ambient and everywhere, in roughly even distribution** (Ch 1 already says it: *"There is
no shortage of magic in the world; it is short of people who can work it"*). In any place it lies
along that place's **grain**. Ordinarily the grain is inert: it takes the shape a working gives it
and makes nothing of it. **Where the grain converges you get a KNOT** — a point unusually sensitive
and *reactive to workings*. Four locks:
  • **A knot is a PHENOMENON, not a being.** It reacts; it does not intend, prefer, choose or wait
    for anyone. The interludes already hold this exactly and must keep it: *"It does not know what
    they are."* / *"neither triumph nor sorrow. Only the grain having its way."* / *"The hill does
    not understand this. It does not need to."* / *"The hill is not troubled."* Never add intention.
  • **The reactivity IS the instability.** Push a knot and it gives the pushing back — which is why
    nothing set on that crown ever stayed set, and why Cael's father's four square walls failed.
    Interlude I states the mechanism: *"a shape forced down against the grain, a telling. The hill
    did to it what it does to all pushing."* Ask instead, and it accommodates. This is the same law
    as THE TWO MODES below; they are one system, not two.
  • **The reactivity scales with working done there**, not with the man doing it. Ch 24's record
    accelerates "from the winter of the glasshouse". Ch 15 now says the flat version aloud: *"Ground
    that leans toward a sleeping man would lean toward any sleeping man."* This is what keeps the
    destiny lock airtight — a knot is an accident of place, and anyone might have asked.
  • **A knot is why a door is POSSIBLE there.** The convergence thins what a planewright would call
    the architecture, which is why an existing potential plane sits under Ardenmoor and why the
    compass points down. The knot does not *make* the door; it makes the door possible.

**BOOK ONE CARRIES EVIDENCE ONLY, NEVER THE CONCLUSION** (author, 2026-08-08). The word "knot" is
**never used of the hill** — Ch 7's cold-spot simile (*"the way a knot grows in a tree, around a
small original wrongness"*) is the only use in the book and is the quiet plant; nothing may point at
it. Emlyn assembles the observations and declines to name the mechanism, exactly as Ch 24 already has
him *"declining, as a professional matter, to use the word for it."* The grandmother supplies the
word **grain** for the medium (Ch 11), and Ch 24 lays her ear against his instrument without drawing
a conclusion. The reader may get there first. **No maps of the grain, no measured "power", nothing
that turns the practice into a spreadsheet** (Module 0).

**⚠️ THE TWO MODES — the deepest rule about magic in this book (author, 2026-08-02).**
**Conventional practice asserts a will on the world through workings.** You find the grain of a
thing, take hold of it, and tell it what to be, and thereafter it has no say. That is what a working
*is*, it is the whole of the literature from the first primer up, and it is the discipline Emlyn
trained in, published in, and withdrew from. **Emlyn's approach is to listen and negotiate** — find
what a thing already wants and get out of its way earlier than anyone thought to (Ch 20 states it
plainly; Ch 29 dramatizes it when he tells Ren *"You're commanding it"*). Four locks on this:
  • **He arrived at it ALONE.** No book taught it, no teacher gave it, no tradition holds it. That is
    exactly why the literature was useless to him on the hill and why the hill had gone unasked for
    an age. Never give him a master, a school, or a lineage for the listening.
  • **It must not become destiny.** The standing Book Two rule is unchanged: the hill waited for **a
    question**, never for Emlyn personally. He is first to ask because he invented asking, and
    anyone might have invented it. Contingent, never chosen.
  • **Brenna's grandmother is NOT overwritten.** She *listened* for forty years — that is perception,
    and it is hers. Emlyn *negotiates* — that is working. The two are different acts, and the
    distinction protects her notebooks and her forty years entire.
  • **The office's interest is in the METHOD, not the size of the talent** (Ch 23). His published
    notation carries marks for what a thing is doing on its own before you touch it — a mark a
    discipline of pure will has no use for. This is what makes "the office remains interested"
    mean what it means, and it deepens the unsigned hand at no cost: someone trained in his notation
    is someone who learned to listen.

**Magic rules — SOURCING (author, corrected 2026-08-08).** **Making** a working costs the maker
heavily and separately; that is what the Ch 1 arithmetic measures ("eaten more in the making than a
lifetime of coal"). **Running** one needs a source, and there are exactly two:
  • **The wielder.** The ordinary way. The working feeds on whoever is using it, so it needs a talent
    to run at all — which is why most artifice is useless in ordinary hands, and why Emlyn's
    self-sourcing lamps were "the first thing in my life that a great many people were going to be
    able to use."
  • **Something external.** This **predates Emlyn** and is **rare and unpopular**, for the reason Ch 8
    already gives: the rich sources are alive and *"you cannot take from a living thing, you can only
    be given by it"*, and a discipline built on asserting will is bad at asking. The sources that can
    simply be taken are thin. The field tried it, found it needed a skill it had no use for, and
    turned away.
  Emlyn's contribution is one move with two halves: he brought the asking-method to the abandoned
  branch, which made external sourcing reliable (the LUMEN, still bound to one hill because it drinks
  a knot), then pointed it at a source that exists everywhere, ordinary daylight, which made it
  portable (the Series). That is why it sells.
  *(This entry previously read that a set working draws externally "but never on him". That was
  wrong, was flagged as an assumption at the time, and the author overturned it.)*
**Magic is RARE (2026-07-11): practitioners are uncommon and getting rarer — major
talents (Emlyn) very rare, minor talents (Penworth) uncommon; even a slight gift is a real advantage.
So magic is a rare, PRIZED craft practiced by very few, the Conclave is small, and there is
exactly one institution of magic, the Conclave, in Vethmark — no rival schools, no secondary academies anywhere (see SETTING & POLITY).** Workings
cost energy and require rest. Wards ask, not command. Reshaping wards excavate/level. Enchantment
binds function into prepared objects. LUMEN lamps = crystalline blanks in three layers (photonic
architecture, sensitivity lattice, binding) housed in metal fittings; the original LUMEN drinks
hill-song, the Series drinks ambient light. Sensitivity manifests as hearing / feeling / seeing
(don't always correlate). Sensitized paper records an arcane signature (imprint). A resonance fork
tuned to the hill's baseline calls an answer. Planewright work = architecture of planes; Emlyn
**trained and published at the Conclave in Vethmark** (the continent's one institution of magic;
his "school of notation"); his published papers omit ~70% of his demiplane working because extending
it incomplete causes lethal interior collapse. The Planewright's
Compass (his own making, unknown to the Conclave) finds existing potential planes.

**The secrets (undercurrent).** (1) The compass in the chest. (2) Three correspondents probing
his incomplete demiplane papers — two named scholars (containable), one UNSIGNED who wrote "the
interior architecture is beautiful" and whose hand later shows training in his own notation (i.e.
schooled at the same Conclave). (3) The **Conclave** — the governing/oversight body of
magic, **seated in Vethmark** (one institution with its school; see SETTING & POLITY) —
whose inquiry is closed "but the office remains interested"; **Drace** its interested official;
**Lira** an informal informant. **Cecily** — investigator, offstage, letters only — engaged to
trace the three.

---

## SETTING & POLITY (world frame — session-locked, 2026-07-11)

Establishes the geopolitics so the cheap land and the urban/rural split make sense. All of it stays
**backdrop**: the book remains village-sized and cozy; the council, the capital, the Conclave, and the
Conclave reach the story only by letter, licence, or a rare visitor, never as epic politics.

- **The polity: a COMMONWEALTH governed by a RULING COUNCIL** — NOT a monarchy (no king/crown/feudal
  lords; the page has none, confirmed). Politics is light and mostly offstage. Working proper name
  "the Commonwealth"; a more distinctive name is **[OPEN]** (author to pick). The **political capital**
  (seat of the ruling council) is **elsewhere and largely offstage**; name **[OPEN]**.
- **Land tenure = old commons + allodial "old land."** In the Commonwealth's remote parts, land is
  held under old, loose title: parish/common ground no one quite owns, allodial old-family holdings,
  forgotten corners. This is the PRECEDENT for how Penworth assembled the Ardenmoor holding cheaply
  from many small/old owners + unclaimed parish ground (Ch 2, "sat down with the parish"). Keep this
  as the mechanism for cheap, assemblable frontier land.
- **TALENT IS RARE, NOT MAGIC (session-locked 2026-07-11; PRECISION RE-LOCK 2026-07-13 — the author:
  "Magic in this world is not lacking; the number of talented people are") — load-bearing.** Magic
  itself is NOT a scarce substance, a dwindling well, or a rationed force: there is no shortage of
  magic and never has been. **The scarcity is PEOPLE: the born talent to work magic is what's rare.**
  The talent is born, not made; the Conclave sharpens it where it appears but cannot create it. Never
  render magic as a commodity that "runs low" or must be hoarded; every scarcity consequence below
  flows from too few PRACTITIONERS (and their finite time/attention), never from any shortage of magic itself.
  Wizards/practitioners are UNCOMMON in this world, and getting rarer. **Major talents (like Emlyn) are VERY rare** — a genuine marvel;
  a country village may never have met one (fits the wary "You'll be the wizard, then" and "is it true
  you're a wizard, what can you do" beats). **Minor talents (like Penworth) are uncommon and
  increasingly rare** — rare enough that even a slight gift is a real professional EDGE (why Penworth,
  a minor talent, is so formidable a man of affairs, and slightly long-lived). Consequences to hold:
  (a) magic is a **rare, prized craft practiced by very few** — Emlyn's practice is real and
  commercial (the Mancour/Spellmonger build stays) but PRECIOUS, not commonplace; his lumens are
  wonders, his services notable, his person unusual. (b) The Conclave (school + governing body in one) is
  therefore SMALL** — nowhere near big enough to build a city around (this REVISES the earlier
  "Vethmark built around the academy" — retired). (c) There is **EXACTLY ONE institution of magic — THE CONCLAVE (named by the author 2026-07-14; formal long name: the Conclave of the Arts Arcane; everyday shorthand: "the Conclave")**, in Vethmark: the sole center of magical study for the
  whole CONTINENT** (talent is that scarce).
- **VETHMARK = a major economic/regional city that HOSTS the Conclave (NOT the
  capital).** Vethmark is a **big city of industry and commerce and a regional
  seat of power** — a principal city of the Commonwealth, a regional/provincial (or city-state) seat,
  the **banking/credit** seat, and Emlyn's origin (his two homes, his father's architecture firm). Its
  size and importance come from **commerce/industry, NOT magic.** The continent's single, small
  institution of magic — **THE CONCLAVE** (formal long name **the Conclave of the Arts Arcane**;
  named 2026-07-14) — is **school and governing body IN ONE**: at once the only place magic is
  studied/taught on the continent (where Emlyn trained and published — his "school of notation";
  cf. Ch 8) AND the craft's small oversight body (LOCKED CANON: inquiry closed, "the office remains
  interested," **Drace** its official, **Lira** its informal informant). It is **located in Vethmark
  BECAUSE Vethmark is a major hub** (well-connected, resourced, central). USAGE: everyday speech and
  narration say "the Conclave"; the formal long name appears on documents, seals, and letters ("by
  order of the Conclave of the Arts Arcane").
  So Vethmark is the magical center by virtue of being a commercial center, not the other way round;
  it is NOT the Commonwealth's political capital. This still roots the outside-world subplot (Conclave,
  the correspondents, the unsigned "school-trained hand") in Vethmark. Institution named: **the Conclave** (see above); only the Commonwealth + capital names remain [OPEN].
- **ARDENMOOR = deep, remote, undeveloped frontier of the Commonwealth.** Forested and marginally
  agricultural, thinly settled, "yet to be developed," loosely incorporated (still part of the
  Commonwealth, but its far edge). This is WHY the land is CHEAP (remote + undeveloped + agriculturally
  marginal + no demand) and the region nearly untapped (Ardenmoor is one of few small villages in a
  large wild area). The cozy frontier a grieving man escapes to and builds up.
- **TECH LEVEL & RAILWAYS (2026-07-11, refined).** The world runs on **EARLY, PRIMITIVE STEAM + a
  SMALL amount of ARTIFICE.** Steam tech is **new and crude** (soot-breathing iron engines, bulky
  machinery). Crucially, **there are too few PRACTITIONERS to power infrastructure with magic** (re-locked
  2026-07-13; NOT "magic is scarce stuff"): a working must be fed/tended/renewed by a working talent,
  talents are a "scattered handful, every one of them wanted in six places at once," and "no sane man
  spends a wizard where a stoker will serve" — so **the railways are "barely arcane" — brute iron, fire,
  and water, almost no magic at all** (Ch 1). **Artifice is confined to small, precious, hand-made devices**
  (lumens, fine instruments), never mass infrastructure. The **developed Commonwealth is
  industrializing and has RAILWAYS** (crude steam); Vethmark is on the network. The rail reaches only
  the **settled, paying country**; **Ardenmoor lies BEYOND the end of the line** — the deepest reason it
  is remote, undeveloped, and cheap ("Land the rails have reached is land somebody wants. This was the
  other kind."). **The village stays PRE-INDUSTRIAL and cozy** (horses, wagons, forge, tallow, quarry)
  — steam/rail belong to the metropole Emlyn left; keep the frontier texture pre-steam. Tech split:
  **crude steam metropole ↔ pre-industrial frontier.**
- **EMLYN'S DEVICE-MAKING GIFT (session-locked 2026-07-11) — a distinguishing capability.** Emlyn can
  **invent and make far BETTER, SMALLER, more refined steam-and-artifice devices** than the crude
  world-norm — a major magical talent fused with his **draftsman/architect/engineer training** (he
  "cannot let a made thing alone"). Where the world's tech is bulky, loud, and dear, his is elegant,
  small, and efficient; the **LUMEN is the exemplar** (refined small artifice), and this seeds future
  inventions (better devices for the tower/practice; possibly the later rail/barge improvements). The
  one limit is the world's scarcity of working HANDS (his own time; the few talents alive), not his
  skill ("how much smaller and quieter and cleverer the whole of it could have been built, if the world
  had only had the hands to spare," Ch 1; re-locked 2026-07-13: talent scarcity, not magic-stuff). Render
  it as competence and an engineer's itch, NOT boastfully; it makes his goods notable and prized.
- **WAINFORD — the railhead (named 2026-07-11; full entry in `state/geography.md`).** The terminus
  town where the rail ends at the edge of settled country, **4 days' ride from Ardenmoor**; a **rail
  port for agriculture** (steam + a little artifice), on a river. This is the Ch 1 "last station."
  Emlyn detrained here; it is **where he meets Penworth** (Penworth rails out; they meet at the
  railhead), where he **returns to collect goods/furniture shipped from Vethmark**, and where he will
  **buy a warehouse** (future). Later-books seeds: **rail-extension toward Ardenmoor** and/or a **river-
  barge service** (do NOT open now). Rename-able; alternates Draymere / Marchford.
- **DISTANCE & TRAVEL (Vethmark ↔ Ardenmoor ≈ A WEEK'S TRAVEL; supersedes the
  earlier "4 days' ride"):** **3 days by TRAIN** (Vethmark → **Wainford**, the railhead / last station
  where the line gives out at the edge of settled country) + **4 days on HORSEBACK** through roadless
  frontier past the railhead = **~1 week** total. ON THE PAGE now: Ch 1 "the railway had set me down
  four days back, at the last station on a line that gave out… exactly where the paying traffic did";
  Ch 3 "a week of road and rail away" and "three days on the railway to the end of the line… then four
  days more on horseback"; Ch 8 "a city a week's road and rail away." A **loaded wagon** needs ~a
  **fortnight** for the frontier leg (rail + transload + slow haul over the giving-up road) — matches
  the established fortnight wait for Emlyn's goods. **Emlyn's ARRIVAL:** rail to **Wainford** (the
  railhead), then the 4-day horse leg (the "long road," ridden slowly by choice — grief, no hurry: "I
  let Snow set the pace, which was slow"). Railhead now NAMED **Wainford** (still "the last station" on
  the page in Ch 1; name it on the page when he next visits).
- **MAGICAL TRAVEL-ACCELERATION — RETIRED (2026-07-11).** The earlier "costly art of accelerated
  travel" is DROPPED: with magic now RARE and railways in the world, the **train is the fast way**
  across distance, not exotic magic. Do not use magical travel-acceleration as a routine means. (If
  ever needed, it would be exotic/rare; default to the railway + horse.) Emlyn's **spring journey** to
  the city = rail + horse, the ordinary way.

---

## CAST — FIXED TRAITS & SPEECH RULES

- **Emlyn** — dry, courteous, self-deprecating; teaches by question and demonstration;
  observes his own grief like a flaw he isn't ready to repair. **Only child of a Vethmark architect;
  trained as a draftsman before his talent developed** (funded his schooling); lost his **fiancée
  Arielle ~3 yrs ago, before their wedding** (engaged, not married); comfortable but LEVERAGED, not
  rich (see FINANCES & ORIGINS session-lock). Lives in his inherited family townhouse; is forced to
  sell the never-lived-in wedding-gift "river house" to fund the hill. **A rare MAJOR magical talent**
  (magic is rare; see Magic rules), and an **engineer-wizard who makes far better/smaller/refined
  steam-and-artifice devices than the crude world-norm** ("cannot let a made thing alone"; the lumen
  is the exemplar) — limited only by the scarcity of working talent (his own two hands included).
  **He does NOT volunteer the mechanism of his own workings** (2026-08-02). To a customer, a
  neighbour, or anyone who has not earned it, he gives the outcome and withholds the how — *"It won't
  leave my hill. I'm at work on why."* The reader still gets the mechanism, from the NARRATION, never
  from his mouth. This is the same trait the fallibility arc costs him (Ch 14/21/28); the book now
  carries both its charm and its price, and neither may be written away.
  **His own instruments are an ARTIFICER'S, not a surveyor's** (2026-08-02): calipers, fine files, a
  small brass scale, a jeweller's glass, levels, gauges, drawn wire. Customers' surveying sets stay
  surveying sets — the contrast is doing work, and Ch 4 states it (*"distant cousins who do not much
  like to admit the relation; they read the world with rods and chains"*). His draughting schooling
  is unchanged canon: he was trained to draw buildings and became a man who makes instruments.
- **Soren**, 10 — village elder's grandson; HEARS the hum; solemn, structural, whole-attention;
  asks questions like "Is that why the Study doesn't fall?"; child logic with dignity, never cute.
  **His gift is SPECIFIC, not general** (author, 2026-08-02): a savant at numbers and at hearing, and
  ordinarily competent at everything else. He learned his letters FAST and reads and writes a fair
  plain hand — better than his grandfather — and that is where it stops, and the stopping is the
  point. Never let quickness at one thing spread into quickness at all things. (This is the same rule
  `modes/developmental.md` states as "Soren is a child, not an oracle," now with a worked instance.)
- **Ren**, 16 — builder's son; FEELS magic through his hands; honest to the grain, distinguishes
  what he knows from what merely sounds right; building metaphors.
- **Jorin** — master builder; single freighted words ("Good." "Even." "Boy's ready."); aligns
  objects to edges; >2 sentences = major moment.
- **Tomas** — blacksmith; stillness, long pauses, one load-bearing question; "Even." closes
  deals; heard the hum alone for months before Emlyn and told no one; standing promise: he will
  know when Emlyn knows.
- **Brenna** — herbalist; considers then speaks completely; inherits her grandmother's 40 years
  of notebooks on the Singer (hill) and Listener (oak); custodian of the keeper plant; the only
  voice that matches Emlyn's register.
- **Lira** — tavern keeper; neutral ledger-facts, warmth only through service (refilled jug,
  lamp in window); slowest thaw in the book; writes to a Conclave contact.
- **Cael** — elder; oblique; sold Emlyn the hill his father failed on.
- **Penworth** — man of affairs; dry, formal, impeccable logistics; letters are miniature essays
  of understatement; **~Emlyn's age**, has run Emlyn's affairs **~a decade** (NOT "old," NOT
  "thirty years with him"); a minor magical talent / slightly long-lived (kept indirect);
  daughter **Nerys** seeded for Book Two (a full practitioner with her late mother's perceptive).
- **Edran** (quarry), **Maret** (mill), **Kellard** (supply yard), **Essa** (furniture).
- **Hal & Bess Wray** (Ch 9) — the first TENANTS, working the bottoms. **Hal:** young, big, quiet,
  careful, "built for exactly this," speaks only when sure. **Bess:** quieter manner, a quicker mind
  than she shows. "More children than land." Fair-terms tenancy (yr1 free → 1/10 → 1/5); mend & live in
  the old bottoms farmhouse. New neighbors / the land coming alive; not tagged as load-bearing.

---

## GEOGRAPHY (fixed — summary only; the FULL living map & gazetteer is `state/geography.md`)

> Detailed layout, the schematic map, compass anchors, the two-oaks distinction, distances,
> and the [CANON]/[PAGE]/[OPEN] tiers all live in **`state/geography.md`** — read and update
> that file. The summary below is the canonical skeleton.

Tower on the hill's crown; cellar beneath (recording blank in floor, chest in NE corner);
stable; greenhouse (enchanted wrought-steel frame + glass) on the SE slope; storehouse cut into
the shelf below the cellar, rear wall on compass bearing (for a future cellar connection);
cart-road to the main road through Emlyn's woodland strip, branching to the village; the old oak
in the north wood; village below — tavern (Lira), smithy (Tomas), mill (Maret), quarry road
(Edran), Kellard's yard, Brenna's cottage at the lane's end by the birches.

---

## KEEPER PLANT

Brenna's grandmother's charge; ~30 years unkillable-but-unthriving in a dark cellar; put out
three new leaves the week Emlyn took the hill. Comes to ground in the greenhouse's shaded north
zone in Part IV; by morning its leaves turn toward the hill, not the glass.

---

## WHO KNOWS WHAT (secrets ledger — update as chapters reveal)

| Secret | Known by (at seed) |
|---|---|
| Emlyn is grieving Arielle | Emlyn; Penworth (implied); reader learns through objects |
| The hill hums / is aware | Emlyn; **Tomas — now SHARED OPENLY with Emlyn (Ch 11 confession): Tomas has heard it ~2 yrs alone; Emlyn confirmed belief by naming the pre-dawn hour, gave the STANDING PROMISE ("when I know what it is, you will know") but did NOT confess his own listening**; **Soren (has heard it his WHOLE LIFE, natively — revealed Ch 7; never thought it strange)**; Brenna's grandmother (dead); **Brenna (via her gran's notebooks, believes it now, Ch 6)**; Cael (suspects) |
| The hill AND the old oak are "the talking pair" | Brenna's grandmother (dead); Brenna (Ch 6); Emlyn (told Ch 6, half-believes) |
| Soren's talent | **Emlyn (SAW it plainly, Ch 13, and told no one)**; **Cael — half-saw and is in DENIAL** (measured the arithmetic, found a small wrongness, and closed the gate: "Boy's quick"); **Soren himself DOES NOT KNOW** (the slip was deniable and he registered it as catching the bucket; there is NO protection pact yet); **Lira watched the WELL when the whole square watched the horse** (Ch 13; what she saw is unstated); the square noticed NOTHING (the commotion covered it) |
| Ren's talent | Emlyn; Jorin (sensed it); Ren (after his assessment) |
| The compass exists | Emlyn only |
| The three correspondents / incomplete papers | Emlyn; Penworth; Cecily (offstage) |
| Lira reports to the Conclave | Lira; the reader (reveal MOVED to Part III, author 2026-07-14; was outline Ch 12); NOT Emlyn until later |
| What Emlyn's silence has cost other people | the reader (Ch 21); **Emlyn knows the SHAPE from Ch 28 and never the MECHANISM** — he grasps that the valley's not-asking is repeated choosing, not weather, and that he can neither thank nor repay it without naming the thing being declined; he does not learn of the reports, the office, or the packet in Book One |

---

- **CH 10 — THE LISTENER & THE SINGER (state established):** (a) **Brenna↔Emlyn now PARTNERSHIP-leaning**
  (courtesy tipped; she trusts him with her grandmother's memory). (b) **NOTEBOOKS LENT ONE VOLUME AT A
  TIME** (Brenna's rule; a running device through the undercurrent arc — do NOT let Emlyn read ahead or
  possess the whole set). (c) **KEEPER PLANT: Emlyn has SEEN it** (Brenna's cellar; 3 new leaves since
  "the week you took the hill"); he privately senses it "points" like the oak toward the unheard thing
  but KEEPS THE HUM PRIVATE (partial candor holds — he has still told no one he lies awake listening).
  **(c-rev, author 2026-07-15): Emlyn stays CAUTIOUS, but Brenna CALLS HIM OUT as shaken** ("you've
  gone grey as that wall… I'll not be told it's nothing"). He holds his silence (won't say WHAT); she
  respects the boundary but refuses to let him call it nothing, and he is quietly glad of "the one
  person who will not let you get away with yourself." → **Brenna character note (durable): she reads
  faces and NAMES what she sees, and will not accept a plain lie, though she won't force the reason.**
  (d) **SINGER = hill, LISTENER = oak** now NAMED ON-PAGE (the grandmother's terms); her early-book line
  "it is not for me… the tree is only holding it. Passing it on." (e) The theory's SPINE ("the Singer
  sings to something NOT YET ARRIVED") is deliberately BURIED in later volumes — NOT yet reached; save
  it. (f) **soldier's-heart** (Ch 6 cutting) flowered midwinter on Emlyn's north sill (dark red,
  fist-shaped, held 3 weeks) — the spur that sent him down; a warmth/callback beat. (g) Two-grandmothers
  question UNTOUCHED and still OPEN.

## ESTABLISHED ON THE PAGE — Prologue to Ch 9 (digest)

Load-bearing canon only. The full blocks, with the drafting reasoning, are in
`archive/state-compaction-2026-07-31/story-bible-history.md`.

- **Prologue.** A poetic journal-note frame, written years after; the ONE retrospective piece.
  Emlyn hears his own legend told in a taproom and refuses it: "no boy, no wonder, only a man."
- **Ch 1 — Ardenmoor.** Arrives on Snow after rail to Wainford + four days' ride. Cael is the
  **village elder** who sells (re-locked 2026-07-14) and who asked the question in the open on
  purpose. Cast introduced **organically and mostly unnamed**: the smith, the herbalist, the
  miller. Soren's name comes only from Lira's line. Grief objects on stage: the locked chest, the
  unopened letter. **Promises made: none standing.** The inn is the only three-storey building in
  Ardenmoor. First-night anomaly at the inn: the floorboards, then the basin water moving once,
  dismissed as timber in the cold (added 2026-07-31; a live blind seed — see thread-ledger).
- **Ch 2 — Walking the Bounds.** Emlyn climbs the crown alone: **no epiphany**, a view, a great
  sweeping quiet, and the real turn — *he does not want to leave* (first wanting in three years,
  which reads to him as alarm). Marks the old oak. The room warns "nothing stands on that hill"
  ("you and Cael's father both"). **Jorin named by Cael**; his son present but **unnamed** (Ren
  deferred). Cael's father's failed shelter planted. The purchase closes the chapter.
- **Ch 4 — Ask for Passage.** The **thesis discovered and earned**: ask, do not command.
  Hill **storm-sensitivity** established (groundwork for the Deep Grammar reading).
  "Attention vs appetite." **Soren hears the working.**
- **Ch 5 — Good.** Jorin hired; the **Study is raised**. Tomas seeded. **Ren met and named
  organically.** The night test. **The chest is now in the Study's NORTHEAST corner.**
- **Ch 6 — First Light.** **The LUMEN is bound** — first light on the crown, after an instructive
  failed first working. Tomas deepened (second commission, watched start to finish). **Brenna
  introduced organically**, and her **grandmother** becomes major canon: forty years of listening,
  the notebooks, "the talking pair." **The two-grandmothers question is explicitly OPEN — do not
  resolve.** The old oak visited; the hill answers the oak-visit.
- **Ch 7 — Wednesdays.** Interior/domestic. The practice is a going concern. The cold-spot at
  Kellard's rendered as method-on-the-page. **Wednesday = the boy's day** (revised 2026-07-31).
  **Soren's household (canon, 2026-07-31):** mother **dead before page one and UNNAMED** (died
  the night of his birth); he is raised by Cael. **The name Mira has left the manuscript
  entirely.** Soren has heard the hum his whole life, natively, and never thought it strange.
- **Ch 8 — The Lamp Business.** **The LUMEN Series invented**; commerce becomes a going concern.
  Penworth on the page by correspondence. **First quiet mention of the lost fiancée — still
  unnamed.** Grief object landed: **the shelf-gap**. Brenna partnership warms. Essa introduced.
- **Ch 9 — Breaking Ground.** The **first tenants: the Wray family**, via Cael. The **cabin**,
  Emlyn's own small stone house. Obstacle arc: wood-first → the hill pushes back → burn → stone.

## ESTABLISHED ON THE PAGE — Ch 20 to the Coda

Relocated 2026-07-31 from OPEN QUESTIONS, where this canon had been filed under "NEW FACTS"
headings. It is settled fact, not an open question.

- **⚠️ BACK-HALF DECISIONS — LOCKED 2026-07-28 (author's fork answers for Ch 20–32):**
  • **PROLOGUE = A LETTER TO AN UNNAMED "YOU" (1B).** The prologue now reads as addressed ("You have
    asked me, more than once and in your patient way…"). **The addressee is SOREN — BLIND until the
    Book One coda**, which reveals it in ONE quiet clause (design at Ch 32 drafting; do not spend
    earlier). Never name him in the frame before that.
  • **RAILWAY CHOKE-HOLD = EMERGENT (2A).** Nobody planned it. Penworth bought elbow room because
    that is what Penworth does. Its value is discovered in Book Two. No character in Book One knows.
  • **TIMELINE (3).** Glasshouse finishes midwinter Yr2→3. Ch 20 thaw = spring Yr 3; Ch 21–29 run
    spring → early winter Yr 3; FIRE early winter Yr 3; letter solstice eve; needle solstice predawn.
    Book One spans just under three years.
  • **⚠️ CH 20 REWORKED (4C, author's words: "it's just from his hill to the village and it's not a
    road… No more than Emlyn could do on his own. He is cash poor."):** retitled **THE WAY DOWN**.
    A laid footpath, hill → village, built by Emlyn ALONE over spring evenings: waste stone from
    Edran's heap hauled a few at a time behind Snow, the boggy elbow asked for passage. No crew, no
    wages, no petition to anyone. Ch 28's council act becomes the village voting to WIDEN his way
    into a cart-road at its own charge (the road is the valley's answer, not his ask). Geography's
    end-state cart-road arrives THAT way.
  • **LIRA CH 21 (6B):** reader-superior but partial. We watch her write and deliberately OMIT (she
    drafts the well-incident line and copies the letter fresh without it: she protects the valley by
    how she reports it). Her debt to the office stays unexplained until Book Two (one object may
    appear: an old packet of letters under the ledger, unexplained). Emlyn's incoming Conclave
    letter appears only as a recognized SEAL in her mail bundle: the reader knows before he does,
    and POV stays clean.
  • **CH 24 (7, 8A):** the two-grandmothers question STAYS OPEN on the page. The third finding is
    rendered in dry instrument language; wonder suppressed, fear never named.
  • **CH 22 (9):** stays a small forge two-hander. "Four days?" = Tomas has kept the count from a
    remark Emlyn made months ago: the reading is set for the new moon, four days off (sequences
    directly into Ch 24).
  • **CH 23 (10):** ends on Jorin's doorway line; Emlyn gives NO on-page reaction.

- **CH 20–22 NEW FACTS (drafted 2026-07-28):** THE WAY (Ch 20): laid footpath, hill to lane's foot,
  Edran's waste flags, elbow seep re-routed by asking; Soren: "It likes being crossed better than
  being stood in"; Lira's jug + "I'll mention it to Cael"; glasshouse selling small (early salads
  local, potted stock via Kellard), deferred wages paid first. LIRA (Ch 21): TWO ledgers (tall
  inn book + small plain valley book; entry "The boy." from the well summer); quarterly office
  reports built around "Nothing unusual requires anyone's attention"; drafts-then-burns the
  well line; bootlace packet of old letters under the ledger incl. one under the office's PROPER
  seal (unexplained, Book Two); mail now TWICE weekly (Wenn the carrier, new minor name); a letter
  to EMLYN under the proper seal (tower and open book) sits in Thursday's bag — READER KNOWS FIRST;
  Emlyn has NOT yet received/read it on page. TOMAS (Ch 22): twenty housing sets commissioned IN
  WRITING against patent money (paper says marks; speech stays metal); Series lamp GIFTED (his
  wife's, seam turned away); "Even." closes three years of ledger; ⚠️ THE READING is set for the
  SPRING NEW MOON, four days after Ch 22 (Tomas kept the date from one winter remark) → Ch 24.

- **CH 23–24 NEW FACTS (drafted 2026-07-28):** Conclave letter OPENED Ch 23 (inquiry from his
  withdrawal year formally closed; "The office remains interested."; unanswered, filed with the
  licences). Storehouse rear-wall bearing survives Jorin's one question ("For later"). REN: first
  solo commission (quarry order, half-mark under), "Boy's ready." Ch 24 findings LOCKED: (1) hum
  incorporates Emlyn's signature, accuracy improving since the Study, accelerating since the
  glasshouse winter; (2) predawn pulse = GRAMMAR (ordered variation; he writes "salutation,
  sustained"); (3) directed component on a rising bearing through the cellar NE corner (the chest).
  Grandmother's full theory now COPIED INTO HIS NOTES (song is for something not yet here; oak
  holds and passes on). SECOND STONE lifted and cased; THIRD BLANK in the floor, NO term. The
  two-grandmothers question remains OPEN. Tomas's forge light burning before dawn on reading night
  (he kept the count) — the telling is Ch 26.

- **CH 25–26 NEW FACTS (drafted 2026-07-28):** REN canon: signature prints with a DIRECTION
  (branching, downward-flowing, ran past the sheet's edge; strong); cellar reads to him as "a room
  with a below to it" (said aloud at last); feet drift toward the NE corner unbidden; oath of
  silence sworn (scope: the shape of it, the paper, the fork, the corner; explicitly NOT kept from
  Jorin that something was felt; "not forever"). The FORK (first instrument he made in the valley,
  tuned to the hill's baseline) answers "sooner and cleaner" toward the corner. SOREN'S DRAWING
  (kept; on the doorstone under a pebble): hill + glasshouse + the way + storehouse FINISHED +
  A TOWER with a light in the top, caption "the hill's good place" — quiet seer note, never
  discussed. TOMAS now holds the TRUE SHAPE minus the corner/chest/bearing; "never once been alone
  with it either. Whatever it turns out to be, that part is finished." Hum-knowledge ledger update:
  Tomas = aware hill, learning-him, waiting, temper calm; NOT told: grammar detail, corner, chest.

- **CH 27–28 NEW FACTS (drafted 2026-07-28):** APPRENTICESHIP AGREED: five-year articles, Jorin's
  three conditions LOCKED (finishes what he builds; never out of wood and stone; chose it himself,
  asked plainly, parents present). Ren's mother appears (unnamed, one cough, feeds Emlyn). Ceremony
  deferred to storehouse completion (Ch 29). KEEPER PLANT: planted in the glasshouse's north-corner
  bed with the grandmother's trowel; by morning ALL leaves turned uphill on the cellar bearing;
  "I mark it."; the plant's history locked (charge accepted by the grandmother young, origin
  unlearned; 30 yrs unthriving in cellar dark; three leaves the week Emlyn took the hill). MONEY:
  Jorin's deferred wages PAID OUT ENTIRE; first clean surplus figure on the quarterly column; the
  glasshouse is proved (winter + summer). THE ROAD: council votes unpetitioned (one abstention:
  LIRA, conflict of interest) to widen the way into a cart-road at village charge, after harvest —
  the Ch 20 rework's payoff; nobody will say what the road is for. LIRA: a Series lamp now burns
  in the inn's front window (never bought, never asked; first one in that window in three years).

- **CH 29–30 NEW FACTS (drafted 2026-07-28):** LAB live (instruments moved down for good; hum
  NEARER there; rear wall "held like a promise"). APPRENTICESHIP FORMAL: old form done (loaf halves
  kept: Ren's with salt, Emlyn's half later saved FROM THE FIRE); Soren witnessed (his own sum
  "coming, walking up its own road" — Book 2 seed). REN'S FIRST LAMP burns unquenched on the lab
  bench (= Ch 32's final-image glow). THE FIRE: barn + cabin LOST (Essa's bed lost; blankets,
  drawing, article-loaf, books, strongbox, notes SAVED); cause NEVER settled (green-hay theory
  given to Penworth "because it asked the least of everyone"); Snow now stabled at Kellard's at a
  neighbor's rate; Study = winter quarters over the cellar; glasshouse/storehouse/way untouched;
  surplus re-spoken-for; Penworth: rebuild spring IN STONE ("stone and sorrow" line). Village
  gift-flood (Cael's hat via Soren). CECILY (new canon, minimal): Penworth's discreet inquiry
  agent; three dishonest correspondent hands since the patents; two named traced+warned off
  (finished); UNSIGNED hand untraceable, trained in Emlyn's PRIVATE notation (taught to one
  person only), letters STOPPED at inquiry's start; her counsel: "look at who had leisure in that
  house" (the three unguarded years pre-crating). Letter kept in the STICKING DRAWER (callipers +
  unread inventory pages). ⚠️ Do not resolve in Book One.

- **⚠️ BOOK ONE COMPLETE (2026-07-28). Ch 31–32 + Coda new canon:** ARIELLE'S MOTHER = **HESPER**
  (named; letter text on page is canon: crates under seal, spring summons, "her mother's spoons,"
  the garden forgiven). THE KEY = a QUESTION, never metal ("Are you ready to be answerable for
  what you keep?"). COMPASS CANON expanded: built alone over four winters beyond the published
  methods; needle answers "where is the way through"; found exactly TWO doors in half a year of
  travel, both known/charted/walled a century; hung slack ever after; given into Arielle's keeping,
  wrapped by her in the green copper-thread scarf ("instruments catch chills"); her hands last to
  hold it. THE TWIST ON PAGE: woke already working; needle turned once at the solstice's deepest
  pulse (the pulse arrived "as a word" built from his learned lines) and points STRAIGHT DOWN;
  "waiting for someone to notice the door." CHEST: opened; contents deliberately NOT inventoried
  on page (Book 2 latitude), air of the river house sealed in; "buried vs kept" distinction canon.
  CODA: prologue addressee REVEALED = SOREN ("Set the kettle on, Soren"), frame = the later
  journal begun at his asking; Soren already calls Emlyn "your master" in frame-time (Book 2+
  apprenticeship implied, never dated). Reader-superior threads left open on purpose: sticking
  drawer (Cecily + inventory pages + callipers), Lira's packet, the unsigned hand, Hesper's
  spring, the stone rebuild, the ~36 unlet acres, the wired gate.

## DRIFT FLAGS (reconcile by author decision — do not silently "fix")

1. **Lira — RESOLVED:** short but friendly (see session-locked decisions above). Ch 1 revised
   to trim her speeches to few, plain, warm words. Informant thread retained; arc re-aimed.
2. **Outline Ch-1 beats — RESOLVED in Ch 3:** the two wagons, the chest arriving and handled with
   more care than anything, the first night under canvas, and the hum surfacing all happened in
   Ch 3 ("Under Canvas"), moved from the outline's Ch 1. The chest now sits in the crown tent,
   apart, awaiting the (unbuilt) cellar. Still pending: the OTHER grief-objects (Arielle's mother's
   unopened letter, the dimensional callipers in a sticking drawer, the spellbook shelf-gap) need
   furniture/the Study to land on the page — assemble them once he has a desk and shelves.
3. **Cael's father's failed shelter — RESOLVED / PLANTED (Ch 2):** now on the page, told by
   Cael on the crown. No conflict with the grandmother material (grandmother = listener/hearer;
   father = failed builder). Payoff at the twist.
4. **⚠️ CHAPTER NUMBERS IN THE MIDDLE OF THIS FILE RUN ONE LOW (found 2026-08-02, NOT fixed).**
   The manuscript's own headings are authoritative and agree with the filenames: the well incident
   is **Chapter Fourteen** (`14-the-well-incident.md`), Tomas's confession is **Chapter Twelve**
   (`12-what-tomas-carried.md`), the Listener/Singer chapter is **Chapter Eleven**. Several entries
   here call them Ch 13, Ch 11 and "CH 10" respectively. The drift appears to run through the Ch
   10–15 region. Left as found per this section's rule; a sweep needs an author decision because
   the same numbers appear in `manuscript-log.md` recaps and in `outline.md`. Nothing in the
   manuscript is wrong — only the references to it.

---

## OPEN QUESTIONS / AUTHOR DECISIONS

- **✅ THE DESTINY MODEL — RESOLVED ON THE PAGE (2026-07-31).** **The hill waited an age, but for
  a QUESTION, not for a man.** Emlyn was never selected; he was the first in longer than the oak
  has stood to *ask* rather than push, and everything the hill can do with him it LEARNED from him
  after he arrived. Compatible with Ch 1's "no thread of fate." Evidence: Interlude I ("had not
  been asked in longer than the old one in the wood has stood"), Interlude II ("the thing it could
  not do a year ago because it had not yet been given the shape to do it with… has no name for
  him"), Interlude III ("all those learned lines"), and decisively Ch 24's grandmother ("what the
  song is for has not come yet… **something** that is not here… I will not live to see **what** it
  is waiting for"). No passage anywhere says the hill waited for Emlyn.
  **`*At last.*` stays exactly as written and must not be "disambiguated."** Standing alone, it
  lets a reader feel the pull of destiny while the text never grants it.
  **Standing Book Two rule:** the hill may keep learning and may keep waiting for what has not
  come; it may **never** be revealed to have waited for Emlyn personally. That would retire the
  thesis. *(This entry once recorded the opposite, that the book "implies both" — that reading is
  **retired**; it was asserted before the passages were read.)*
- **Ren vs. Wren** — RESOLVED: **Ren** (locked, used Ch 2).
- **Title** — open: *Ask for Passage* / *The Hill's Good Place* / *Foundations*.
- **The two grandmothers** (Brenna's and Cael's — one woman, sisters, or strangers) — deliberately
  **OPEN on the page**; Ch 24 closes it as "some questions keep better than they answer."
- **Ch 6's first lighting** is narrated rather than played; the author's call is "split the
  difference" (one played moment inside the narration). **Not yet executed.**
- **The ending enacts too little** — Book One closes on revelation with Emlyn's response deferred.
  See `modes/developmental.md`.
- **✅ THE FALLIBILITY INSTANCE — DELIVERED (2026-08-02).** The structural audit's standing demand
  (Emlyn substantively wrong, another person carrying part of the cost, not repaired by one good
  conversation) is now on the page across four chapters. **The error is not the silence about
  Soren**, which Ch 14 argues well and which stands. It is the second, unexamined half of the same
  decision: Emlyn banks Lira's silence as costless — his tally ends *"and no letter going
  anywhere"* — and never asks what a silence costs the person keeping it. Ch 20 he reads her
  service as thaw. Ch 21 shows the reader the price: her omissions now have a shape, she cannot
  stop without the stopping being its own signal, and there is no one to tell. Ch 28 he understands
  the SHAPE and not the mechanism, and finds it unrepayable — to thank them he would have to name
  what they are declining to name, and the naming would spend it. **Locks:** he must never learn of
  the reports, the office or the packet in Book One; Lira's own knowledge of the well stays partial
  (the valley's version has the wrong person, and Ch 21 keeps it that way).
