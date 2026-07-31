#!/usr/bin/env bash
# chapter-check.sh — end-of-drafting DELIVERY RECEIPT for a finished chapter.
#
# Usage:  tools/chapter-check.sh manuscript/NN-slug.md
#
# Runs the prose lint, then makes a few OBJECTIVE EXISTENCE ASSERTIONS about the
# state updates a new chapter must have — the mechanical, un-gameable half of the
# post-flight. It answers one question only: "did the drafter actually wire this
# chapter into the book's plumbing, or forget a step?" It does NOT judge prose,
# canon, or whether the bible was updated well (a human/editor pass owns that).
#
# Checks (existence only; each emits one PASS/FAIL line):
#   1. prose-lint passes (no FAIL; WARNs are allowed and reviewed elsewhere).
#   2. the file is listed in manuscript/manifest.json
#      — REAL silent-failure consequence: a chapter missing here is invisible to
#        reader.html, which loads chapters from the manifest.
#   3. an "NN-slug.md|" row exists in tools/phrase-registry.txt (coinages logged).
#   4. a recap line exists in state/manuscript-log.md (the "[NN] …" ledger entry,
#      or an "Interlude" line for an interlude file).
#   5. a "caused-by:" line exists for this chapter in state/engine-reports.md —
#      the MOMENTUM-causality declaration (references/craft.md §5). Prologue,
#      interludes and the coda are exempt: they are frame instruments.
#
# Deliberately NOT checked (rejected in the engine roadmap, Tier 3): a
# front-matter-keys check (the POV/season header spec is a dead letter across the
# existing files), any "bible/geography modified or N/A" self-assertion (trivially
# gamed, so worthless as a guard), and a tracked git pre-commit hook (it can't
# tell a new-chapter commit from this repo's constant revision commits, so it only
# trains `git commit --no-verify`). This script is run by hand at end of drafting.
#
# Exit code: 0 if every check PASSes, 1 otherwise.

set -u
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO="$(cd "$DIR/../../../.." && pwd)"
REGISTRY="$DIR/phrase-registry.txt"
MANIFEST="$REPO/manuscript/manifest.json"
LOG="$REPO/state/manuscript-log.md"
REPORTS="$REPO/state/engine-reports.md"

if [ "$#" -ne 1 ]; then
  echo "usage: $0 manuscript/NN-slug.md" >&2
  exit 2
fi
FILE="$1"
BASE="$(basename "$FILE")"
if [ ! -f "$FILE" ]; then
  echo "chapter-check: no such file: $FILE" >&2
  exit 2
fi

status=0
pass() { printf '  PASS  %s\n' "$1"; }
fail() { printf '  FAIL  %s\n' "$1"; status=1; }

echo "== delivery receipt: $BASE =="

# 1. prose lint (FAIL only; WARNs are reviewed, not blocking here)
if "$DIR/prose-lint.sh" "$FILE" >/tmp/cc-lint.$$ 2>&1; then
  pass "prose-lint: no FAIL"
else
  fail "prose-lint: FAIL (run tools/prose-lint.sh $FILE and fix)"
fi
grep -qE '  WARN ' /tmp/cc-lint.$$ 2>/dev/null && \
  printf '  note  prose-lint emitted WARN(s) — review them in the engine report (not blocking).\n'
rm -f /tmp/cc-lint.$$

# 2. listed in the manifest (reader.html loads from here)
if grep -qF "\"$BASE\"" "$MANIFEST" 2>/dev/null; then
  pass "manifest.json lists the file (reader.html will load it)"
else
  fail "manifest.json is MISSING \"$BASE\" — chapter is invisible to reader.html"
fi

# 3. a coinage row in the phrase registry
if grep -qE "^${BASE}\|" "$REGISTRY" 2>/dev/null; then
  pass "phrase-registry.txt has an $BASE| row"
else
  fail "phrase-registry.txt has NO $BASE| row — log this chapter's coinages"
fi

# 4. a recap line in the manuscript log
NN="${BASE%%-*}"                      # leading field, e.g. 11 or 07b
if printf '%s' "$BASE" | grep -qi 'interlude'; then
  if grep -qi 'interlude' "$LOG" 2>/dev/null; then
    pass "manuscript-log.md has an Interlude recap line"
  else
    fail "manuscript-log.md has NO Interlude recap line"
  fi
else
  NUM="$(printf '%s' "$NN" | sed 's/^0*//')"   # strip leading zeros: 07 -> 7
  if grep -qE "\[0*${NUM}\]" "$LOG" 2>/dev/null; then
    pass "manuscript-log.md has a [$NUM] recap line"
  else
    fail "manuscript-log.md has NO [$NUM] recap line"
  fi
fi

# 5. a declared causal parent in the engine report
# MOMENTUM-CAUSALITY (references/craft.md §5). The engine has always tested
# causality as CONTINUITY ("does this contradict an earlier reason?"). It has
# never tested it as MOMENTUM ("does this chapter exist BECAUSE of a named prior
# event, or merely after it?"). Four of Book One's chapters opened on a calendar
# entry — the season arrived and nothing caused the chapter — and in every case
# the cause was already on the page a chapter or two earlier and simply was not
# claimed at the door.
#
# This is an EXISTENCE assertion, deliberately, not an inference. A regex
# classifier for opening-move type was prototyped and agreed with hand
# classification on only 22 of 37 files; a FAIL built on that would be noise.
# What is checkable, and what actually does the work, is that the drafter WROTE
# THE LINE. A chapter with no honest answer to "this happens because of ___" is
# exactly the chapter that needs one.
case "$BASE" in
  00-prologue.md|*interlude*|*coda*)
    pass "caused-by: not required (frame piece)" ;;
  *)
NUM5="$(printf '%s' "${BASE%%-*}" | sed 's/^0*//')"
    if awk -v n="$NUM5" '
         $0 ~ ("^## \\[0*" n "\\]") { found=1; next }
         found && /^## / { found=0 }
         found && tolower($0) ~ /^[[:space:]]*caused-by:[[:space:]]*[^[:space:]]/ { print "yes"; exit }
       ' "$REPORTS" 2>/dev/null | grep -q yes; then
      pass "engine-reports.md declares a caused-by: for $BASE"
    else
      fail "engine-reports.md has NO caused-by: line for $BASE — name the prior event this chapter happens because of (craft.md §5)"
    fi
    ;;
esac

if [ "$status" -eq 0 ]; then
  echo "  ok    delivery receipt clean"
else
  echo "  !!    delivery receipt has a FAIL — finish the state wiring before delivery"
fi
exit "$status"
