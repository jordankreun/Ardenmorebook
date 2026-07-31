#!/usr/bin/env bash
# span-check.sh — CROSS-CHAPTER guard for The Tower of Ardenmoor.
#
# Usage:  tools/span-check.sh manuscript/2*.md
#         tools/span-check.sh manuscript/20-*.md manuscript/21-*.md ...
#
# WHY THIS EXISTS. state/engine-reports.md records, in capitals, the engine's
# single most valuable process finding:
#
#     "a per-chapter pass CANNOT see restructuring damage, because every
#      chapter passes in isolation."
#
# A flow pass over eight chapters once found twelve defects that every
# per-chapter pass had shipped clean. prose-lint.sh and craft-check.sh cannot
# fix this by construction: they judge one file. This script judges a RUN.
#
# It caught, retroactively, both of Book One's diagnosed span failures:
#   - the Part IV dialogue collapse (13-31% across Parts I-III, 0-2% in Ch 20-32)
#   - the eight-chapter hill-thread blackout (Ch 16-23)
#
# Run it at every part boundary, before delivering three or more chapters, and
# after ANY renumber or restructure. Everything is a WARN; exit is 0 unless a
# file is missing. See references/craft.md §9.

set -u
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$DIR/../../../.." && pwd)"
LEDGER="$ROOT/state/thread-ledger.md"
status=0

prose_lines() {
  grep -v '^[[:space:]]*$' "$1" | grep -v '^#\{1,6\} ' | grep -v '^---[[:space:]]*$'
}

[ "$#" -ge 2 ] || { echo "usage: $0 manuscript/NN-slug.md manuscript/NN-slug.md [...]  (2+ files)" >&2; exit 2; }

names=(); words=(); dlg=(); dens=(); closes=()

for f in "$@"; do
  if [ ! -f "$f" ]; then echo "no such file: $f" >&2; status=1; continue; fi
  base="$(basename "$f")"
  case "$base" in 00-prologue.md|*interlude*|*coda*) continue ;; esac

  w=$(prose_lines "$f" | wc -w | tr -d ' ')
  p=$(prose_lines "$f" | wc -l | tr -d ' ')
  [ "${p:-0}" -gt 0 ] || continue
  q=$(prose_lines "$f" | grep -c '"' | tr -d ' ')
  share=$(( 100 * q / p ))
  density=$(( w / p ))
  # closing move: last prose line, reduced to a coarse shape signature
  last="$(prose_lines "$f" | tail -1)"
  sig="other"
  case "$last" in
    *dusk*|*evening*|*"last light"*|*"failing light"*|*"dark came"*) sig="dusk" ;;
  esac
  case "$last" in *lamp*|*amber*|*lumen*|*lantern*) sig="${sig}+lamp" ;; esac
  case "$last" in *'"'*) sig="dialogue" ;; esac

  names+=("$base"); words+=("$w"); dlg+=("$share"); dens+=("$density"); closes+=("$sig")
done

n=${#names[@]}
[ "$n" -ge 2 ] || { echo "span-check: fewer than 2 measurable chapters in span" >&2; exit "$status"; }

echo "== span: ${n} chapters, ${names[0]} .. ${names[$((n-1))]} =="
printf '  %-32s %7s %7s %8s  %s\n' "chapter" "words" "dlg%" "w/para" "close"
tot=0
for i in $(seq 0 $((n-1))); do
  printf '  %-32s %7s %6s%% %8s  %s\n' "${names[$i]}" "${words[$i]}" "${dlg[$i]}" "${dens[$i]}" "${closes[$i]}"
  tot=$(( tot + words[i] ))
done
echo "  span total: ${tot}w, mean $(( tot / n ))w"
echo

warned=0

# ---- 1. DIALOGUE RUN (consecutive chapters under the 15% floor) ----
run=0; best=0; beststart=0
for i in $(seq 0 $((n-1))); do
  if [ "${dlg[$i]}" -lt 15 ]; then
    [ "$run" -eq 0 ] && start=$i
    run=$(( run + 1 ))
    if [ "$run" -gt "$best" ]; then best=$run; beststart=$start; fi
  else
    run=0
  fi
done
if [ "$best" -ge 3 ]; then
  echo "  WARN  dialogue run: ${best} consecutive chapters under the 15% floor, from ${names[$beststart]} — a single quiet chapter is a choice; a RUN is a drift the per-chapter check cannot see. (craft.md §9)"
  warned=1
fi

# ---- 2. SCENE-DENSITY RUN (consecutive summary-heavy chapters) ----
run=0; best=0; beststart=0
for i in $(seq 0 $((n-1))); do
  if [ "${dens[$i]}" -gt 120 ]; then
    [ "$run" -eq 0 ] && start=$i
    run=$(( run + 1 ))
    if [ "$run" -gt "$best" ]; then best=$run; beststart=$start; fi
  else
    run=0
  fi
done
if [ "$best" -ge 2 ]; then
  echo "  WARN  summary run: ${best} consecutive chapters over 120 w/paragraph, from ${names[$beststart]} — consecutive summary-heavy chapters compound; the reader feels narrated at. (craft.md §2)"
  warned=1
fi

# ---- 3. SUSTAINED THINNING (first third vs last third of the span) ----
if [ "$n" -ge 6 ]; then
  third=$(( n / 3 ))
  a=0; b=0
  for i in $(seq 0 $((third-1))); do a=$(( a + words[i] )); done
  for i in $(seq $((n-third)) $((n-1))); do b=$(( b + words[i] )); done
  amean=$(( a / third )); bmean=$(( b / third ))
  if [ "$amean" -gt 0 ] && [ "$bmean" -lt $(( amean * 2 / 3 )) ]; then
    echo "  WARN  sustained thinning: span opens at ~${amean}w/chapter and closes at ~${bmean}w/chapter (down over a third) — chapters getting shorter across a span reads as acceleration where this register wants lingering. (craft.md §9)"
    warned=1
  fi
fi

# ---- 4. CADENCE DEPRECIATION (repeated closing shape) ----
run=1; prev=""; best=1; bestsig=""
for i in $(seq 0 $((n-1))); do
  s="${closes[$i]}"
  if [ "$s" = "$prev" ] && [ "$s" != "other" ]; then
    run=$(( run + 1 ))
    if [ "$run" -gt "$best" ]; then best=$run; bestsig=$s; fi
  else
    run=1
  fi
  prev="$s"
done
if [ "$best" -ge 3 ]; then
  echo "  WARN  cadence: ${best} consecutive chapters closing on the same shape (${bestsig}) — the cozy close is the register's birthright, but a third in a row depreciates it; vary time of day, who is present, or whether anyone speaks. (craft.md §9, style-guide dial 3)"
  warned=1
fi

# ---- 5. THREAD SILENCE (optional; needs the ledger) ----
if [ -f "$LEDGER" ]; then
  while IFS='|' read -r thread planted watered state target; do
    case "$thread" in \#*|""|*"---"*|*"thread "*) continue ;; esac
    st="$(echo "${state:-}" | tr -d ' ')"
    [ "$st" = "OPEN" ] || continue
    key="$(echo "$thread" | tr -d ' ' | cut -c1-14)"
    hit=0
    for f in "$@"; do
      [ -f "$f" ] || continue
      if grep -qiF "$(echo "$thread" | sed 's/^ *//;s/ *$//' | cut -d' ' -f1-2)" "$f" 2>/dev/null; then hit=1; break; fi
    done
    if [ "$hit" -eq 0 ]; then
      echo "  note  thread untouched across this span: $(echo "$thread" | sed 's/^ *//;s/ *$//') (OPEN since ${planted// /}) — fine if resting; a long silence is how a setup becomes an orphan. (craft.md §6)"
    fi
  done < "$LEDGER"
fi

[ "$warned" -eq 0 ] && echo "  ok    span reads varied"
exit $status
