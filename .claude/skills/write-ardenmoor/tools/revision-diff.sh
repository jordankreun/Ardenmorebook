#!/usr/bin/env bash
# revision-diff.sh — compare a REVISION against its SOURCE.
#
# Usage:  tools/revision-diff.sh <source> <candidate> [light|moderate|developmental]
#         (mode defaults to "moderate", the router's default for unspecified prose work)
#
# THE GAP THIS CLOSES. Every other tool in this engine takes one file. prose-lint guards the
# line, craft-check the chapter's shape, span-check a run of chapters, chapter-check and
# state-check the plumbing — and not one of them can see what a revision DID, because none of
# them has the source to compare against. So modes/revise-moderate.md's whole contract (preserve
# scene order, preserve dialogue substance, invent nothing, keep compression scoped) was enforced
# by prose alone. This is the mechanical half.
#
# WHAT IT CANNOT DO. It cannot detect semantic repetition, which is the book's primary diagnosed
# flaw ("duplicated interpretation"). Saying a thing in an image and again in a conclusion is
# invisible to any lexical test — the two sentences share no words. That stays a judgment call and
# belongs to the mode's ordered workflow, not here. Do not add a fake proxy for it: a check that
# fires on legitimate reflection would teach the drafter to ignore the tool.
#
# SEVERITY, matched to the mode contract:
#   FAIL — the candidate broke a preservation rule: invented a named entity, dropped dialogue,
#          or lost a registered coinage. Exit 1.
#   WARN — look: compression outside the scope band, paragraph count changed.
# WARNs never affect the exit code.
#
# MODE AWARENESS. developmental is ALLOWED to restructure and invent, so its preservation FAILs
# are downgraded to notes. light expects near-zero change. moderate is the strict middle.

set -u
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REGISTRY="$DIR/phrase-registry.txt"

if [ "$#" -lt 2 ]; then
  echo "usage: $0 <source> <candidate> [light|moderate|developmental]" >&2
  exit 2
fi
SRC="$1"; CAND="$2"; MODE="${3:-moderate}"
for f in "$SRC" "$CAND"; do
  [ -f "$f" ] || { echo "revision-diff: no such file: $f" >&2; exit 2; }
done
case "$MODE" in light|moderate|developmental) ;; *) echo "revision-diff: unknown mode: $MODE" >&2; exit 2 ;; esac

status=0
warned=0
pass() { printf '  PASS  %s\n' "$1"; }
warn() { printf '  WARN  %s\n' "$1"; warned=1; }
note() { printf '  note  %s\n' "$1"; }
fail() {
  if [ "$MODE" = "developmental" ]; then
    printf '  note  %s  [allowed in developmental]\n' "$1"
  else
    printf '  FAIL  %s\n' "$1"; status=1
  fi
}

# prose lines only — same method as state-check.sh and craft-check.sh, so word counts here are
# comparable with every other figure the engine reports.
prose() { grep -v '^[[:space:]]*$' "$1" | grep -v '^#\{1,6\} ' | grep -v '^---[[:space:]]*$'; }

# Proper-noun candidates, EXCLUDING sentence-initial position. That exclusion is load-bearing:
# tested against the golden fixture, the naive form reports 7 false positives (An, Before, Here,
# Many, New, Of, One) and this form reports zero. A token counts only when it follows a word
# character and a space, i.e. mid-sentence, where a capital really does mean a name.
propers() {
  prose "$1" | sed 's/^/ /' \
    | grep -oE '[^.!?"“”] +[A-Z][a-zA-Z]+' \
    | grep -oE '[A-Z][a-zA-Z]+' | sort -u
}

sw=$(prose "$SRC"  | wc -w | tr -d ' ')
cw=$(prose "$CAND" | wc -w | tr -d ' ')
sp=$(prose "$SRC"  | wc -l | tr -d ' ')
cp=$(prose "$CAND" | wc -l | tr -d ' ')

echo "== revision-diff: $(basename "$SRC") -> $(basename "$CAND")  [$MODE] =="

# ---- 1. COMPRESSION, against the scope band for this mode ----
# Bands are measured, not asserted. modes/revise-moderate.md carries the evidence: 60 approved
# tracked changes put a PARAGRAPH edit at a median ratio of 0.991, and the golden fixture puts a
# whole-CHAPTER pass at -13.8%. This tool cannot tell which unit it was handed, so it reports the
# number and flags only what is out of range for ANY legitimate scope.
if [ "$sw" -gt 0 ]; then
  d=$(( (cw - sw) * 1000 / sw ))            # tenths of a percent
  sign=""; [ "$d" -ge 0 ] && sign="+"
  printf '  info  %s words -> %s words (%s%s.%s%%)\n' "$sw" "$cw" "$sign" "$((d/10))" "$(( (d<0?-d:d) % 10 ))"
  case "$MODE" in
    light)
      [ "$d" -lt -50 ] && warn "compression ${d}‰: revise-light should barely move the word count; is this actually a moderate revision?" ;;
    moderate)
      if [ "$d" -lt -200 ]; then
        warn "compression $(( -d/10 )).$(( (-d)%10 ))% exceeds the chapter-scale band (11-16%) — over-cutting, or was this a developmental pass?"
      elif [ "$d" -gt 30 ]; then
        warn "the candidate GREW by $((d/10)).$((d%10))% — moderate revision removes friction; growth suggests invention"
      fi ;;
  esac
fi

# ---- 2. PARAGRAPH / SCENE STRUCTURE ----
if [ "$sp" -ne "$cp" ]; then
  if [ "$MODE" = "developmental" ]; then
    note "paragraphs $sp -> $cp (restructuring is this mode's job)"
  else
    dir="removed"; [ "$cp" -gt "$sp" ] && dir="added"
    warn "paragraph count $sp -> $cp ($(( cp>sp ? cp-sp : sp-cp )) $dir) — moderate and light revision preserve scene architecture; a paragraph added or removed is a structural change, justify it or you are in the wrong mode"
  fi
else
  pass "paragraph count unchanged ($sp)"
fi

ss=$(prose "$SRC"  | grep -c '^---' || true)
cs=$(prose "$CAND" | grep -c '^---' || true)
[ "${ss:-0}" -ne "${cs:-0}" ] && fail "scene-break count changed ($ss -> $cs) — scene order and count are preserved outside developmental"

# ---- 3. DIALOGUE PRESERVED ----
# "Do not add dialogue merely to increase pace" and "preserve dialogue substance" are both in the
# author's own style reference. Removal is the failure that matters: a revision may not quietly
# narrate away a spoken exchange.
sq=$(prose "$SRC"  | grep -c '"' || true)
cq=$(prose "$CAND" | grep -c '"' || true)
if [ "${cq:-0}" -lt "${sq:-0}" ]; then
  fail "dialogue paragraphs $sq -> $cq — $(( sq - cq )) exchange(s) lost; dialogue substance is preserved, not summarised"
elif [ "${cq:-0}" -gt "${sq:-0}" ]; then
  if [ "$MODE" = "developmental" ]; then
    note "dialogue paragraphs $sq -> $cq (added; allowed here)"
  else
    fail "dialogue paragraphs $sq -> $cq — $(( cq - sq )) added; revision modes may not invent speech"
  fi
else
  pass "dialogue paragraphs unchanged ($sq)"
fi

# ---- 4. INVENTED NAMED ENTITIES ----
new_names=$(comm -13 <(propers "$SRC") <(propers "$CAND") | tr '\n' ' ' | sed 's/ *$//')
if [ -n "$new_names" ]; then
  fail "named entities in the candidate but not the source: $new_names — no new people, places or things"
else
  pass "no invented named entities"
fi

# ---- 5. REGISTERED COINAGES ----
# The registry lists one-use phrases with their home file. A revision that rewrites the paragraph
# holding a coinage silently staleness the row, and prose-lint cannot see it: the phrase is simply
# gone, and absence is not something a per-file lint tests for. This already happened once, in the
# author's approved Ch 1 revision, and was caught by hand.
if [ -f "$REGISTRY" ]; then
  lost=""
  base="$(basename "$CAND")"
  while IFS='|' read -r home phrase; do
    case "$home" in ''|'#'*) continue;; esac
    [ -n "$phrase" ] || continue
    if grep -qiF "$phrase" "$SRC" 2>/dev/null && ! grep -qiF "$phrase" "$CAND" 2>/dev/null; then
      lost="${lost}
      \"$phrase\" (registered to $home)"
    fi
  done < "$REGISTRY"
  if [ -n "$lost" ]; then
    fail "registered coinage(s) removed by this revision — update tools/phrase-registry.txt to the new wording, or restore:${lost}"
  else
    pass "registered coinages intact"
  fi
fi

echo
if [ "$status" -eq 0 ]; then
  if [ "$warned" -eq 1 ]; then
    echo "  ok    preservation clean; review the WARN(s) and justify anything kept in the engine report"
  else
    echo "  ok    preservation clean"
  fi
else
  echo "  !!    this revision broke a preservation rule — fix it, or say plainly that the mode was wrong"
fi
exit "$status"
