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

FILES="$DIR/../SKILL.md $DIR/../references/outline.md $DIR/../references/style-guide.md \
       $DIR/../references/voice-rothfuss-mancour.md $DIR/../references/continuity-checklist.md \
       $DIR/../references/feedback-engine.md $ROOT/state/story-bible.md $ROOT/state/geography.md"

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

[ $status -eq 0 ] && echo "doc-audit: clean — no retired rule survives as live text."
exit $status
