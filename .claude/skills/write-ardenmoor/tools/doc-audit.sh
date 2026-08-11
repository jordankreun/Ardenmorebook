#!/usr/bin/env bash
# doc-audit.sh — the skill's self-consistency guard.
#
# Greps every LIVE rulebook and state doc for formulations of rules that have
# been superseded (tools/superseded.txt). A hit means an old rule survived a
# revision and is still being stated as current somewhere — exactly the drift
# that once left a retired "hard floor" alive inside SKILL.md while the lock
# list above it said the opposite.
#
# Run it: after ANY change to the session-locks, canon, or reference docs.
# Exclusions: the manuscript log (a historical record), engine-changelog lines,
# and any line that itself marks the rule as retired/superseded.
#
# Exit 1 on findings (fix the doc, or — if the line is a legitimate historical
# mention — reword it to say so, e.g. "the retired hard floor").

set -u
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$DIR/../../../.." && pwd)"
LIST="$DIR/superseded.txt"
[ -f "$LIST" ] || { echo "no superseded.txt"; exit 0; }

FILES="$DIR/../SKILL.md $DIR/../references/outline.md $DIR/../references/voice.md \
       $DIR/../references/voice.md $DIR/../references/continuity-checklist.md \
       $DIR/../references/feedback-engine.md $ROOT/state/story-bible.md $ROOT/state/geography.md \
       $DIR/../references/storycraft.md $DIR/../references/storycraft.md $DIR/../references/exemplars.md \
       $DIR/../references/economy.md $DIR/../references/editorial-read.md \
       $DIR/../references/session-locks.md $DIR/../references/engine-changelog.md \
       $ROOT/state/thread-ledger.md"
# The mode files (added 2026-07-31 when SKILL.md became a router). Globbed rather than listed so
# a new mode is audited the day it is written; an unaudited mode file is exactly where a retired
# rule would survive, since the modes are what actually get read now.
for m in "$DIR"/../modes/*.md; do [ -f "$m" ] && FILES="$FILES $m"; done

status=0
while IFS= read -r pat; do
  case "$pat" in ''|'#'*) continue;; esac
  for f in $FILES; do
    [ -f "$f" ] || continue
    hits=$(grep -ni "$pat" "$f" 2>/dev/null | grep -vi "retired\|supersed\|CHANGELOG\|no longer\|was \"\|old \"\|(was\|formerly")
    if [ -n "$hits" ]; then
      [ $status -eq 0 ] && echo "DOC-AUDIT FINDINGS (retired rules still stated as live):"
      echo "  [$pat] in $(basename "$f"):"
      printf '%s\n' "$hits" | sed 's/^/    /' | head -4
      status=1
    fi
  done
done < "$LIST"

# STRUCTURAL GUARDS on storycraft.md. Inherited from craft.md when that file was
# retired into this one (2026-07-31); the reasoning transfers unchanged, because
# it was never about which file held the rules. Every craft-shaped rule in this
# engine had once decayed into an author-sourced taste rule, and two assertions
# keep the curriculum from becoming a second feedback-engine.md:
#   (a) it stays small enough to justify its seat in the drafting read;
#   (b) it carries NO "*Source:*" tag — that tag is the taste-ledger signature.
#       Taste belongs in feedback-engine.md, sourced to the note that produced it;
#       storycraft.md must stay TRANSFERABLE craft that would hold for another book.
# Ceiling raised 520 -> 680 on the merge: the file absorbed 921 words of craft.md
# (the OVERRULED table, the diction domains, the authority of the specific) and now
# stands at 600 lines. 680 leaves room to revise without licensing another doubling.
CURRIC="$DIR/../references/storycraft.md"
if [ -f "$CURRIC" ]; then
  cl=$(wc -l < "$CURRIC" | tr -d ' ')
  if [ "$cl" -gt 680 ]; then
    echo "  storycraft.md is ${cl} lines (>680) — it is read in full when drafting; move depth into references/exemplars.md"
    status=1
  fi
  # Only a real annotation counts: the tag at the start of a line. A prose mention
  # in backticks (a doc explaining what the tag IS) must not fire.
  if grep -qE '^[[:space:]]*[*]Source:[*]' "$CURRIC"; then
    echo "  storycraft.md contains a *Source:* tag — the curriculum must stay transferable craft; put the author note in feedback-engine.md instead"
    status=1
  fi
fi

[ $status -eq 0 ] && echo "doc-audit: clean — no retired rule survives as live text."
exit $status
