# GOLDEN FIXTURE — Prologue + Chapter One, moderate revision

The author's own approved moderate revision, and the source it was made from. This is the
calibration authority for `modes/revise-moderate.md`. Do not edit these files to make a metric
come out; they are the evidence, not the target.

Applied to the manuscript 2026-07-31. `source-*` is the text as it stood immediately before
(commit `51d9afa`); `approved-*` is what shipped. `moderate-revision-style.docx` is the author's
operational style reference, and it governs where this note and it disagree.

## MEASURED

Counting method: prose lines only, blank lines and `#`-headers excluded. Same method as
`tools/state-check.sh`.

| | source | approved | delta |
|---|---|---|---|
| Prologue | 601 | 492 | **−18.1%** |
| Chapter One | 5,455 | 4,731 | **−13.3%** |
| **total** | **6,056** | **5,223** | **−13.8%** |

The style doc's stated band is 11–16%. This pair lands inside it.

## THE RECONCILIATION THAT MATTERS

This fixture says 11–16%. The 60 author-approved tracked changes in `feedback/revisions.json`
say **−4.4% aggregate, median ratio 0.991, 51% within ±3%**. Both are the author's own approved
work, and they are not in conflict — they are **different units of work**:

- A **paragraph-level edit** (the tracked changes) is substitution. The author swaps wording and
  keeps length. Expect roughly neutral; a 14% cut applied to one paragraph is over-cutting.
- A **whole-chapter pass** (this fixture) is compression. The savings come from removing
  duplicated interpretation *across* a chapter, which only becomes visible at chapter scale.

`revise-moderate` therefore carries **two scoped expectations, not one band**. Applying the
chapter-scale number to a paragraph is the specific error this note exists to prevent.

## WHAT THE REVISION DID

Preserved without exception: scene order, every scene, dialogue substance, Cael's whole
negotiation, the two-houses backstory, the railway/scarcity exposition, the village morning, the
letter, the closing line at the foot of the hill.

Compressed: second explanations after an image had landed; repeated conclusions about Emlyn being
tired or alone; sentence tails restating their own landing point; doubled analogies; "the way…",
"which is to say", "the whole of it" clusters.

Three worked examples are in the style doc §9, including one deliberate **non**-example: the
"not-asking was the first true gift" passage was left untouched, because reflection that adds
meaning the gesture does not contain is not a compression target.

## THE ONE DEVELOPMENTAL ADDITION — DO NOT GENERALIZE

The revision added a beat that is not in the source (`approved-01-chapter-one.md`, the paragraph
beginning "The boards gave a small complaint"): the floorboards creak and the basin water moves
once, unexplained, and Emlyn dismisses it as an old building in the cold.

The style doc flags this itself: *"That was a developmental choice, not a normal feature of the
revision style. Moderate revision must not generalize from it."* A moderate revision that invents
a beat like this is **out of contract** and should FAIL its own check.

Two consequences were handled when this shipped, and both must survive future edits:

1. **Session-lock #5** said Chapter One ends "with the hum entirely unmet by Emlyn." The lock's
   letter survives — he meets nothing he *recognises*, and the text supplies a mundane
   explanation — but the reader now has a first-night anomaly the lock did not anticipate. The
   lock was amended rather than left to disagree silently with the page.
2. It is a **live blind seed** and is logged in the bible's PENDING PAYOFFS and in
   `state/thread-ledger.md`. An unlogged seed is an orphaned setup.
