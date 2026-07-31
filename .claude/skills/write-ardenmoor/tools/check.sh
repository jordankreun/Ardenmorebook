#!/usr/bin/env bash
# check.sh — the single entry point for every mechanical check.
#
# Usage:
#   tools/check.sh chapter manuscript/NN-slug.md   line + shape + wiring for one chapter
#   tools/check.sh span    manuscript/2*.md        cross-chapter damage over a run
#   tools/check.sh docs                            retired rules + state freshness
#
# WHY THIS EXISTS. The engine grew to eight scripts, each correct and each needing to be
# remembered. A drafter who forgets span-check does not get a warning; they get a clean run and a
# false sense of coverage. One command per situation is harder to half-run.
#
# The underlying scripts are unchanged and may still be called directly when you want one of
# them in isolation. This only sequences them and adds the mechanical checklist items that used
# to be human boxes in continuity-checklist.md (see MIGRATED below).
#
# Exit code: 0 unless an underlying script FAILs. WARNs never affect it. Anything kept over a
# WARN is justified in the engine report, exactly as before.

set -u
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$DIR/../../../.." && pwd)"
status=0
run() { "$@" || status=1; }

case "${1:-}" in
  chapter)
    f="${2:-}"
    [ -n "$f" ] && [ -f "$f" ] || { echo "usage: $0 chapter manuscript/NN-slug.md" >&2; exit 2; }
    base="$(basename "$f")"
    run "$DIR/prose-lint.sh"  "$f"
    run "$DIR/craft-check.sh" "$f"
    run "$DIR/chapter-check.sh" "$f"

    # ---- MIGRATED from continuity-checklist.md (mechanical items only) ----
    echo "== migrated checklist items: $base =="
    # closing shape: an image or a single line of dialogue, never a question to the reader
    last="$(grep -v '^[[:space:]]*$' "$f" | grep -v '^#' | tail -1)"
    case "$last" in
      *\?) echo "  WARN  closes on a question — chapters end on an image or a line of dialogue (Ch 28 excepted)" ;;
      *)   echo "  PASS  closing line is not a question" ;;
    esac
    # thread-ledger touched: does any OPEN thread name appear in this chapter?
    LED="$ROOT/state/thread-ledger.md"
    if [ -f "$LED" ]; then
      hits=0
      while IFS='|' read -r name planted watered st note; do
        case "$st" in *OPEN*) ;; *) continue;; esac
        n="$(echo "$name" | sed 's/^ *//;s/ *$//')"; [ -n "$n" ] || continue
        key="$(echo "$n" | awk '{print $NF}')"
        grep -qiF "$key" "$f" && hits=$((hits+1))
      done < <(grep -E '^\s{2,}\S.*\|' "$LED")
      echo "  note  OPEN threads with a keyword present in this chapter: $hits (0 is legitimate if all are resting — say so in the report)"
    fi
    ;;
  span)
    shift
    [ "$#" -ge 2 ] || { echo "usage: $0 span manuscript/2*.md  (2+ files)" >&2; exit 2; }
    run "$DIR/span-check.sh" "$@"
    ;;
  docs)
    run "$DIR/doc-audit.sh"
    run "$DIR/state-check.sh"
    ;;
  *)
    echo "usage: $0 {chapter <file>|span <files...>|docs}" >&2; exit 2 ;;
esac

echo
[ "$status" -eq 0 ] && echo "  ok    check.sh ${1}: no FAIL" || echo "  !!    check.sh ${1}: a FAIL above must be fixed"
exit "$status"
