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

if [ "$status" -eq 0 ]; then
  echo "  ok    delivery receipt clean"
else
  echo "  !!    delivery receipt has a FAIL — finish the state wiring before delivery"
fi
exit "$status"
