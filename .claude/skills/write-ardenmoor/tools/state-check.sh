#!/usr/bin/env bash
# state-check.sh — freshness guard for the state documents.
#
# Usage:  tools/state-check.sh
#
# doc-audit.sh asks "does any doc still state a RETIRED rule as live?"
# This asks the other question: "does any doc still state a STALE FACT as live?"
#
# It exists because of a real, expensive failure. state/story-bible.md's STATUS
# block — the first thing the startup sequence reads as "what is currently TRUE"
# — claimed "Chapters drafted: Prologue + Chapters 1-8" and "Part I complete;
# Ch 8 opens Part II" while the manuscript stood finished at 37 files through
# 32b-coda.md. It was stale by 24 chapters. state/manuscript-log.md carried the
# same rot independently ("Drafted: ... Chapters 1-19", "~61,000 words").
#
# Nothing caught it. chapter-check.sh asserts per-chapter wiring and passes
# happily while the summary above it describes a different book; doc-audit only
# knows about retired RULES, not stale FACTS. A drafting session reading the
# bible would have believed Part I was the frontier.
#
# Checks (each emits one PASS/FAIL line):
#   1. manifest <-> disk agree in both directions.
#   2. every manifest chapter has a recap line in manuscript-log.md.
#   3. the "Chapters drafted:" bullet (bible) and "Drafted:" bullet (log) each
#      claim a chapter at least as high as the manifest's highest. This is the
#      check that would have caught the drift.
#
# Check 3 is deliberately a FLOOR, not an equality test. Claiming MORE than the
# manifest holds is a different defect (a chapter named but never written) and
# checks 1-2 already cover its consequences; a floor lets the bullet legitimately
# say "complete through the coda" without the tool parsing English.
#
# Parsing note: check 3 reads only the drafted-bullet, not the whole STATUS
# block, and ignores integers over 99. Both narrowings are load-bearing — the
# STATUS block elsewhere mentions "the Ch 19/30 bolster", and dates like
# 2026-07-11 would otherwise read as chapter 2026.
#
# Exit 0 if every check PASSes, 1 otherwise.

set -u
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$DIR/../../../.." && pwd)"
MANIFEST="$ROOT/manuscript/manifest.json"
MANDIR="$ROOT/manuscript"
LOG="$ROOT/state/manuscript-log.md"
BIBLE="$ROOT/state/story-bible.md"

status=0
pass() { printf '  PASS  %s\n' "$1"; }
fail() { printf '  FAIL  %s\n' "$1"; status=1; }

echo "== state check =="

for f in "$MANIFEST" "$LOG" "$BIBLE"; do
  [ -f "$f" ] || { echo "state-check: missing $f" >&2; exit 2; }
done

MF="$(grep -o '"[^"]*\.md"' "$MANIFEST" | tr -d '"')"
[ -n "$MF" ] || { echo "state-check: manifest lists no .md files" >&2; exit 2; }

# ---- 1. manifest <-> disk ----
gone=""; unlisted=""
for b in $MF; do
  [ -f "$MANDIR/$b" ] || gone="$gone $b"
done
for p in "$MANDIR"/*.md; do
  b="$(basename "$p")"
  printf '%s\n' "$MF" | grep -qxF "$b" || unlisted="$unlisted $b"
done
if [ -z "$gone" ] && [ -z "$unlisted" ]; then
  pass "manifest and disk agree ($(printf '%s\n' "$MF" | wc -l | tr -d ' ') files)"
else
  [ -n "$gone" ]     && fail "manifest lists file(s) not on disk:$gone"
  [ -n "$unlisted" ] && fail "file(s) on disk missing from manifest (invisible to reader.html):$unlisted"
fi

# ---- 2. every chapter has a recap line ----
# Mirrors chapter-check.sh check 4: match on the numeric prefix, not the slug.
# Suffixed numbers (25b, 32b) are matched verbatim; interludes may be logged
# either as [I<n>] or under their file prefix, and both conventions are in use.
norecap=""
for b in $MF; do
  pre="${b%%-*}"
  case "$b" in
    *interlude*)
      grep -qE "^\[(I[0-9]+|0*${pre})\]" "$LOG" || norecap="$norecap $b" ;;
    *)
      num="$(printf '%s' "$pre" | sed 's/^0*//')"; [ -n "$num" ] || num=0
      grep -qE "^\[0*${num}\]" "$LOG" || norecap="$norecap $b" ;;
  esac
done
if [ -z "$norecap" ]; then
  pass "manuscript-log.md has a recap line for every manifest chapter"
else
  fail "manuscript-log.md has NO recap line for:$norecap"
fi

# ---- 3. the drafted-bullets are current ----
maxch=0
for b in $MF; do
  n="$(printf '%s' "${b%%-*}" | tr -cd '0-9' | sed 's/^0*//')"
  [ -n "$n" ] || n=0
  [ "$n" -gt "$maxch" ] && maxch="$n"
done

# Highest chapter number claimed in a bullet: the bullet line plus its indented
# continuations. Only CHAPTER-SHAPED tokens count, and that narrowing is the
# whole correctness of this check. An earlier version took the largest integer
# under 100, which read "37 files" as chapter 37 and passed a bullet that in
# fact claimed Ch 8 — a guard that reports PASS for the wrong reason is worse
# than none. Two token forms are accepted, both drawn from the vocabulary these
# bullets actually use:
#   a manuscript filename   32b-coda.md      -> 32
#   a chapter reference     Ch 1-32, Chapter 8 -> 32, 8   (en/em dash or hyphen)
claimed() {
  awk -v pat="$2" '
    $0 ~ pat { inb = 1; print; next }
    inb && /^-[[:space:]]/ { inb = 0 }
    inb { print }
  ' "$1" \
  | sed 's/[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}//g; s/[*_`]//g' \
  | grep -oE '[0-9]{1,2}[a-z]?-[a-z][a-z0-9-]*\.md|(Chapters?|Ch)[[:space:]]*[0-9]{1,2}([[:space:]]*(–|—|-)[[:space:]]*[0-9]{1,2})?' \
  | grep -oE '[0-9]{1,2}' \
  | awk '{ if ($1 > m) m = $1 } END { print m + 0 }'
}

check_bullet() {
  local file="$1" pat="$2" label="$3" c
  if ! grep -qE "$pat" "$file"; then
    fail "$label: no bullet matching /$pat/ in $(basename "$file")"
    return
  fi
  c="$(claimed "$file" "$pat")"
  if [ "${c:-0}" -ge "$maxch" ]; then
    pass "$label claims through Ch $c (manifest high-water: $maxch)"
  else
    fail "$label is STALE: claims through Ch $c, manifest holds Ch $maxch — update $(basename "$file") before drafting against it"
  fi
}

check_bullet "$BIBLE" '^- Chapters drafted:' "story-bible STATUS"
check_bullet "$LOG"   '^- Drafted:'           "manuscript-log header"

if [ "$status" -eq 0 ]; then
  echo "  ok    state is current"
else
  echo "  !!    state is stale — the docs describe a different book than manuscript/ holds"
fi
exit "$status"
