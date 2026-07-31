#!/usr/bin/env bash
# craft-check.sh — per-chapter STRUCTURE guard for The Tower of Ardenmoor.
#
# Usage:  tools/craft-check.sh manuscript/NN-slug.md [more files...]
#
# Companion to prose-lint.sh. That script guards the LINE (voice, tics, echoes);
# this one guards the CHAPTER'S SHAPE. Both run in post-flight.
#
# EVERYTHING HERE IS A WARN. There are no FAILs and there should not be: craft
# is judgment, and a FAIL that fires on a legitimate authorial choice only
# teaches the author to ignore the tool. Exit is always 0 unless a file is
# missing. A WARN means look, and anything kept is justified in the engine
# report, exactly as with prose-lint.
#
# The three checks, and why these thresholds:
#
#  1. SCENE DENSITY (words per paragraph). The strongest available mechanical
#     proxy for the book's diagnosed drift, summary standing in for scene.
#     Measured over the finished Book One: median 75 w/para. Scene-heavy
#     chapters run 37-50 (Ch 22, 23, 18, 16, 10). Summary-heavy chapters run
#     127-179 (Ch 8 at 179, Ch 6 at 170, Ch 7 at 156, Ch 3 at 141, Ch 30 at
#     127). Threshold 120 sits above every scene-heavy chapter and below every
#     summary-heavy one.
#
#  2. REJECTED — DO NOT REBUILD: past-habitual marker density as a summary
#     proxy ("would <verb>", "used to", "every morning"). It looks obvious and
#     it is INVERTED on exactly the two chapters it would need to separate.
#     Measured: Ch 7 (Wednesdays, the deliberately iterative ritual chapter,
#     163 w/para) scores 2.9/1k, while Ch 12 (What Tomas Carried, a two-hander
#     SCENE) scores 7.8/1k — five of its fourteen hits being subjunctive "would
#     have." The cause is that "would" is this narrator's hindsight verb, not a
#     summary marker, so the metric tracks retrospection rather than iteration.
#     A check that fires on the scene and passes the montage is worse than no
#     check: it teaches the drafter to distrust the tool. Words-per-paragraph
#     (check 1) is the clean signal; use it alone.
#
#  3. SIZE DRIFT (this chapter vs the median of the 3 preceding). RELATIVE, not
#     absolute. Session-lock #7 makes chapter length deliberately flexible and
#     tools/superseded.txt retires every old word target, so this deliberately
#     does NOT assert a floor. It flags sustained THINNING, which is what
#     actually went wrong in Book One's final movement (front half ~3,900 words,
#     back half ~1,800, every chapter passing its own review).
#
# Prologue and interludes are exempt from all three, matching prose-lint.
# See references/craft.md for the principles these measure.

set -u
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$DIR/../../../.." && pwd)"
MANIFEST="$ROOT/manuscript/manifest.json"
status=0

# prose lines only: drop blank lines, markdown headers, and scene-break rules.
prose_lines() {
  grep -v '^[[:space:]]*$' "$1" | grep -v '^#\{1,6\} ' | grep -v '^---[[:space:]]*$'
}

# median word count of the up-to-3 chapters preceding $1 in manifest order.
# Interludes and the prologue are skipped as neighbours (different instrument).
prev_median() {
  local base="$1" prev=() line b w
  [ -f "$MANIFEST" ] || { echo ""; return; }
  while IFS= read -r b; do
    case "$b" in
      "$base") break ;;
      00-prologue.md|*interlude*) continue ;;
    esac
    [ -f "$ROOT/manuscript/$b" ] && prev+=("$b")
  done < <(grep -o '"[^"]*\.md"' "$MANIFEST" | tr -d '"')
  local n=${#prev[@]}
  [ "$n" -ge 3 ] || { echo ""; return; }
  local ws=()
  for b in "${prev[@]: -3}"; do
    w=$(prose_lines "$ROOT/manuscript/$b" | wc -w | tr -d ' ')
    ws+=("$w")
  done
  printf '%s\n' "${ws[@]}" | sort -n | sed -n '2p'
}

for f in "$@"; do
  if [ ! -f "$f" ]; then
    echo "no such file: $f"; status=1; continue
  fi
  base="$(basename "$f")"
  case "$base" in *interlude*|*coda*) is_interlude=1 ;; *) is_interlude=0 ;; esac

  words=$(prose_lines "$f" | wc -w | tr -d ' ')
  echo "== craft: $base (${words}w) =="

  if [ "$base" = "00-prologue.md" ] || [ "$is_interlude" -eq 1 ]; then
    echo "  note  prologue/interlude — structural checks skipped by design"
    continue
  fi

  warned=0

  # ---- 1. SCENE DENSITY ----
  paras=$(prose_lines "$f" | wc -l | tr -d ' ')
  if [ "${paras:-0}" -gt 0 ]; then
    wpp=$(( words / paras ))
    if [ "$wpp" -gt 120 ]; then
      echo "  WARN  scene density: ${wpp} words/paragraph over ${paras} paragraphs (>120) — long blocks are the signature of summary standing in for scene; is a load-bearing beat being reported rather than played? (craft.md §2)"
      warned=1
    fi
  fi

  # ---- 2. (deliberately absent — see the REJECTED note in the header) ----

  # ---- 3. WALL PARAGRAPH ----
  # A single very long paragraph is essayistic drift even in a chapter whose
  # average is healthy. Measured over Book One, 400 words fires on exactly three
  # files (Ch 30 at 634, Ch 3 at 498, Ch 1 at 422) — all three independently
  # flagged by human reads — while Ch 8's 399-word working paragraph correctly
  # sits under it.
  maxp=$(prose_lines "$f" | awk '{n=NF; if(n>m)m=n} END{print m+0}')
  if [ "${maxp:-0}" -ge 400 ]; then
    echo "  WARN  wall paragraph: longest is ${maxp} words (>=400) — a block that size is an essay inside a chapter; look for the place it should break. (craft.md §2)"
    warned=1
  fi

  # ---- 4. SIZE DRIFT (relative; no absolute target — see header) ----
  med="$(prev_median "$base")"
  if [ -n "$med" ] && [ "$med" -gt 0 ]; then
    half=$(( med / 2 ))
    if [ "$words" -lt "$half" ]; then
      echo "  WARN  size drift: ${words}w against a ${med}w median for the 3 preceding chapters (under half) — not a floor, a TREND flag; sustained thinning is invisible chapter-by-chapter. (craft.md §9)"
      warned=1
    fi
  fi

  [ "$warned" -eq 0 ] && echo "  ok    structure clear"
done

exit $status
