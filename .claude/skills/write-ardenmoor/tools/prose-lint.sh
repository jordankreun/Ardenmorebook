#!/usr/bin/env bash
# prose-lint.sh — mechanical voice guard for The Tower of Ardenmoor.
#
# Usage:  tools/prose-lint.sh manuscript/NN-slug.md [more files...]
#
# Run on every chapter BEFORE delivery (mandatory post-flight step in SKILL.md).
# Two kinds of finding:
#   FAIL — hard rule broken (em dashes, memoir-frame phrases in a chapter,
#          registry-phrase reuse). Exit code 1. Fix the prose, always.
#   WARN — a signature tic is over its per-chapter budget. Not an automatic
#          error: dialogue instances and individually vetted keepers may stay,
#          but every instance above budget must be REVIEWED, and anything kept
#          must be justified in the engine report. (Budgets come from the
#          feedback engine's "Ration the signature tics" rule.)
#
# The registry (tools/phrase-registry.txt) lists distinctive one-use phrases
# with their home file ("NN-slug.md|phrase"). A phrase appearing OUTSIDE its
# home file is a FAIL: the book's best lines lose their power when repeated.
# After drafting a chapter, ADD its 3–5 most distinctive coinages to the
# registry so the guard grows with the book.

set -u
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REGISTRY="$DIR/phrase-registry.txt"
status=0

count() { grep -oi "$1" "$2" 2>/dev/null | wc -l | tr -d ' '; }

budget_check() { # file label pattern budget
  local f="$1" label="$2" pat="$3" budget="$4" n
  n=$(count "$pat" "$f")
  if [ "$n" -gt "$budget" ]; then
    echo "  WARN  $label: $n (budget $budget) — review each; keep only vetted/dialogue instances"
    warned=1
  fi
}

for f in "$@"; do
  [ -f "$f" ] || { echo "no such file: $f"; status=1; continue; }
  base=$(basename "$f")
  words=$(wc -w < "$f" | tr -d ' ')
  echo "== $base (${words}w) =="
  warned=0

  # ---- HARD RULES ----
  n=$(grep -o '—\|–\| -- ' "$f" | wc -l | tr -d ' ')
  if [ "$n" -gt 0 ]; then echo "  FAIL  em/en dashes: $n (house rule: zero)"; status=1; fi

  # Memoir/ancient-chronicler frame phrases: banned in chapters and interludes.
  # (The Prologue is the one journal-framed piece and is exempt.)
  if [ "$base" != "00-prologue.md" ]; then
    for p in 'this account' 'the tellers' 'shook kingdoms' 'in a long life' \
             'half myth' 'everyone I knew is gone' 'longer than most kingdoms' \
             'an honest accounting'; do
      n=$(count "$p" "$f")
      if [ "$n" -gt 0 ]; then echo "  FAIL  memoir-frame phrase \"$p\": $n (chapters stay immediate)"; status=1; fi
    done
  fi

  # Registry: a distinctive phrase reused outside its home file.
  if [ -f "$REGISTRY" ]; then
    while IFS='|' read -r home phrase; do
      case "$home" in ''|'#'*) continue;; esac
      [ "$base" = "$home" ] && continue
      n=$(grep -oiF "$phrase" "$f" | wc -l | tr -d ' ')
      if [ "$n" -gt 0 ]; then
        echo "  FAIL  registry phrase reused: \"$phrase\" (home: $home)"; status=1
      fi
    done < "$REGISTRY"
  fi

  # ---- SEED-TELEGRAPH REVIEW LIST (WARN, budget 0) ----
  # Feedback-engine P1 "Setups are invisible": these phrases are how a planted
  # seed gets flagged to the reader. Ordinary Mancour hindsight is legal as
  # general texture, so a hit is not an automatic error — but EVERY hit must be
  # reviewed: if it sits on or near a planted seed, replant the seed blind.
  # (Chapters only; the Prologue is the one retrospective piece and is exempt.)
  if [ "$base" != "00-prologue.md" ]; then
    for p in 'I would learn' 'I would not learn' 'I would come to' \
             'I did not see it coming' 'I did not see coming' \
             'I have the key now' 'that comes later' 'but that comes later' \
             'not for the last time' 'little did' 'only later' \
             'I had better own' 'I mention \(him\|her\|it\|them\) now' \
             'I told myself\(.\)\{0,40\}believed' 'turned on \(him\|her\|it\) later' \
             'would \(turn out\|prove\) to matter' 'I thought nothing of it'; do
      n=$(count "$p" "$f")
      if [ "$n" -gt 0 ]; then
        echo "  WARN  seed-telegraph \"$p\": $n — review: fine as texture, NEVER on a planted seed (replant blind)"
        warned=1
      fi
    done
  fi

  # ---- TIC BUDGETS (WARN) ----
  budget_check "$f" '", which is/was…" tails' ', which \(is\|was\|were\|would\|had\|meant\|from\)' 7
  budget_check "$f" '"a good/great deal/many"' 'a good deal\|a great deal\|a great many' 6
  budget_check "$f" '"the way you/a…" similes' 'the way \(you\|a \|an \|most\|his\|her\|it\)' 8
  budget_check "$f" '"I will not pretend/tell you"' 'I will not pretend\|I will not tell you\|I will not make more' 1
  budget_check "$f" '"in the end"' 'in the end' 2
  budget_check "$f" '"which is to say"' 'which is to say' 2
  budget_check "$f" '"which by then"' 'which by then' 1
  budget_check "$f" '"of course"' 'of course' 2
  budget_check "$f" '"particular" (adj)' 'particular' 6
  budget_check "$f" '"plain/plainly"' 'plain\b\|plainly' 8

  [ "$warned" -eq 0 ] && echo "  ok    all tic budgets met"
done

exit $status
