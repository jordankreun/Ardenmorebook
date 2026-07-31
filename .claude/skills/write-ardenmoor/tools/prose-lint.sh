#!/usr/bin/env bash
# prose-lint.sh — mechanical voice guard for The Tower of Ardenmoor.
#
# Usage:  tools/prose-lint.sh manuscript/NN-slug.md [more files...]
#
# Run on every chapter BEFORE delivery (mandatory post-flight step in SKILL.md).
# Findings:
#   FAIL — hard rule broken (em dashes, memoir-frame phrases in a chapter,
#          registry-phrase reuse). Exit code 1. Fix the prose, always.
#   WARN — a review signal: a tic over its THRESHOLD, a review-list hit, an
#          adjacent-chapter echo, or a low dialogue share. Not an automatic
#          error; every WARN gets reviewed, and anything kept is justified in
#          the engine report.
#
# TIC THRESHOLDS ARE A BACKSTOP, NOT THE AIM. The feedback engine defines a
# three-level gradient (P5 "Ration the signature tics"): the voice doc's
# write-time AIM (low), the rubric's revision RATION (the ceiling), and the
# lint's THRESHOLD here (deliberately looser than both, so the lint fires on
# real drift, not on a vetted line at healthy density). A WARN means look, not
# "you broke a rule." Do NOT assume these numbers equal the ration.
#
# The registry (tools/phrase-registry.txt) lists distinctive one-use phrases
# with their home file ("NN-slug.md|phrase"). A phrase appearing OUTSIDE its
# home file is a FAIL. Add each new chapter's 3–5 best coinages to it.
#
# The vouch ledger (tools/vouched.txt) records deliberate cross-chapter echoes
# (motifs, callbacks) so the adjacent-echo check stops re-flagging them every
# run. Format: earlier-file|later-file|phrase|dated reason. Only the exact
# ordered file-pair is suppressed, and the suppression is printed, so a NEW
# echo (a different phrase) still fires.

set -u
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REGISTRY="$DIR/phrase-registry.txt"
VOUCHED="$DIR/vouched.txt"
status=0

count() { grep -oi "$1" "$2" 2>/dev/null | wc -l | tr -d ' '; }

# prose lines only: drop blank lines, markdown headers, and scene-break rules.
prose_lines() { grep -vE '^\s*$|^#{1,6} |^---\s*$' "$1"; }

shingles() { # sorted-unique 5-word shingles (lowercased, letters+apostrophes; prose only)
  prose_lines "$1" | tr '[:upper:]' '[:lower:]' | tr -cs "a-z'" ' ' | \
  awk '{for(i=1;i<=NF;i++)w[++n]=$i} END{for(i=1;i+4<=n;i++)print w[i],w[i+1],w[i+2],w[i+3],w[i+4]}' | \
  sort -u
}

# merge 5-word shingles that overlap by 4 words into maximal runs, so one
# repeated phrase counts once instead of as 2-3 overlapping windows.
merge_runs() {
  awk '
    { n++; t[n]=$0; f4[n]=$1" "$2" "$3" "$4; l4[n]=$2" "$3" "$4" "$5; byfirst[$1" "$2" "$3" "$4]=n }
    END{
      for(i=1;i<=n;i++){ if(l4[i] in byfirst){ j=byfirst[l4[i]]; haspred[j]=1 } }
      for(i=1;i<=n;i++){
        if(haspred[i]||seen[i]) continue
        cur=i; run=t[i]; seen[i]=1
        while(l4[cur] in byfirst){ j=byfirst[l4[cur]]; if(seen[j])break; split(t[j],w," "); run=run" "w[5]; seen[j]=1; cur=j }
        print run
      }
      for(i=1;i<=n;i++) if(!seen[i]) print t[i]   # cycles: emit as-is
    }'
}

prev_in_manifest() { # print the path of the manifest entry before this file
  local f="$1" dir base m prev cur
  dir=$(dirname "$f"); base=$(basename "$f"); m="$dir/manifest.json"
  [ -f "$m" ] || return 0
  prev=""
  while read -r cur; do
    if [ "$cur" = "$base" ]; then [ -n "$prev" ] && echo "$dir/$prev"; return 0; fi
    prev="$cur"
  done < <(grep -o '"[^"]*\.md"' "$m" | tr -d '"')
}

budget_check() { # file label pattern threshold
  local f="$1" label="$2" pat="$3" budget="$4" n
  n=$(count "$pat" "$f")
  if [ "$n" -gt "$budget" ]; then
    echo "  WARN  $label: $n (threshold $budget) — review each; keep only vetted/dialogue instances"
    warned=1
  fi
}

for f in "$@"; do
  [ -f "$f" ] || { echo "no such file: $f"; status=1; continue; }
  base=$(basename "$f")
  words=$(wc -w < "$f" | tr -d ' ')
  echo "== $base (${words}w) =="
  warned=0
  is_interlude=0; case "$base" in *interlude*) is_interlude=1;; esac

  # ---- HARD RULES ----
  n=$(grep -o '—\|–\| -- ' "$f" | wc -l | tr -d ' ')
  if [ "$n" -gt 0 ]; then echo "  FAIL  em/en dashes: $n (house rule: zero)"; status=1; fi

  # Memoir/ancient-chronicler frame phrases: banned in chapters and interludes.
  if [ "$base" != "00-prologue.md" ]; then
    for p in 'this account' 'set this down' 'setting this down' 'the tellers' \
             'shook kingdoms' 'in a long life' 'half myth' 'everyone I knew is gone' \
             'longer than most kingdoms' 'an honest accounting' \
             'this chapter' 'next chapter' 'these pages' 'this book' 'in a book'; do
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

  # ---- DIALOGUE-SHARE METER (WARN below a floor; craft dial #1) ----
  # Share = prose paragraphs (one per line here) containing a straight double
  # quote, over all prose paragraphs. A FLOOR, not a target: a low share flags
  # a montage-compressed chapter (the book's diagnosed drift); a still, interior
  # chapter that clears the floor is fine. Prologue + interludes are exempt.
  if [ "$base" != "00-prologue.md" ] && [ "$is_interlude" -eq 0 ]; then
    read tot q < <(prose_lines "$f" | awk 'BEGIN{t=0;q=0} {t++; if(index($0,"\"")>0)q++} END{print t" "q}')
    if [ "${tot:-0}" -gt 0 ]; then
      share=$(( 100 * q / tot ))
      if [ "$share" -lt 15 ]; then
        echo "  WARN  dialogue share: ${share}% of ${tot} paragraphs ($q with speech) — below ~15% floor; is a load-bearing beat narrated that wants voices? (craft dial #1; vouch a deliberately interior chapter)"
        warned=1
      fi
    fi
  fi

  # ---- SEED-TELEGRAPH REVIEW LIST (WARN, threshold 0) ----
  # Feedback-engine P1 "Setups are invisible": how a planted seed gets flagged
  # to the reader. Ordinary Mancour hindsight is LEGAL as general texture; the
  # bare "I would learn / I would come to" forms are texture, so they are NOT
  # listed — only the realization-tail forms that actually telegraph. Every hit
  # is reviewed: on or near a planted seed, replant blind. (Chapters only.)
  if [ "$base" != "00-prologue.md" ]; then
    for p in 'I would learn later' 'I would not learn' \
             'I would come to \(regret\|rue\|fear\|understand\|dread\)' \
             'I did not see it coming' 'I did not see coming' \
             'I have the key now' 'that comes later' 'but that comes later' \
             'not for the last time' 'little did' \
             'only later \(did\|would\|i \|, when\)' \
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

  # ---- ACTION+APHORISM WELD REVIEW LIST (WARN, threshold 0) ----
  for p in ', and I have never' ', and I have always' ', and I have come to' \
           ', and I have learned' ', and a man does' ', and a man has to' \
           ', and a man cannot' ', and a man ought' ', and it is the nearest' \
           ', and it is the only'; do
    n=$(count "$p" "$f")
    if [ "$n" -gt 0 ]; then
      echo "  WARN  aphorism-weld \"$p\": $n — review: split so the reflection starts its own sentence (unless a deliberate climax/triad)"
      warned=1
    fi
  done

  # ---- ADJACENT-CHAPTER ECHO (WARN) ----
  # Any 5-word run shared with the previous chapter (manifest order) carrying a
  # substantial word (7+ letters). Overlapping windows are merged into maximal
  # runs so one repeat counts once; deliberate motifs vouched in tools/vouched.txt
  # are suppressed but printed, so a NEW echo still fires.
  prevf=$(prev_in_manifest "$f")
  if [ -n "${prevf:-}" ] && [ -f "$prevf" ]; then
    prevbase=$(basename "$prevf")
    raw=$(comm -12 <(shingles "$f") <(shingles "$prevf") | \
          awk '{for(i=1;i<=NF;i++) if(length($i)>=7){print;next}}')
    if [ -n "$raw" ]; then
      runs=$(printf '%s\n' "$raw" | merge_runs)
      kept=""; vn=0; vreasons=""
      while IFS= read -r run; do
        [ -z "$run" ] && continue
        vmatch=""
        if [ -f "$VOUCHED" ]; then
          rl=$(printf '%s' "$run" | tr '[:upper:]' '[:lower:]')
          while IFS='|' read -r ea la ph re; do
            case "$ea" in ''|'#'*) continue;; esac
            [ "$ea" = "$prevbase" ] && [ "$la" = "$base" ] || continue
            pl=$(printf '%s' "$ph" | tr '[:upper:]' '[:lower:]')
            case "$rl" in *"$pl"*) vmatch="$re"; break;; esac
            case "$pl" in *"$rl"*) vmatch="$re"; break;; esac
          done < "$VOUCHED"
        fi
        if [ -n "$vmatch" ]; then vn=$((vn+1)); vreasons="${vreasons}\n          vouched: \"$run\" — $vmatch"
        else kept="${kept}${run}\n"; fi
      done < <(printf '%s\n' "$runs")
      keptn=$(printf '%b' "$kept" | grep -c . || true)
      if [ "${keptn:-0}" -gt 0 ]; then
        echo "  WARN  adjacent-chapter echoes vs $prevbase: $keptn — vary, or vouch in tools/vouched.txt (callbacks ok)"
        printf '%b' "$kept" | sed '/^$/d; s/^/          "/; s/$/"/' | head -8
        warned=1
      fi
      [ "$vn" -gt 0 ] && printf '  VOUCHED (%d) deliberate echo(es) vs %s:%b\n' "$vn" "$prevbase" "$vreasons"
    fi
  fi

  # ---- TIC THRESHOLDS (WARN; backstop, looser than the ration on purpose) ----
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
  budget_check "$f" '"had had" (stacked perfects)' 'had had\|that that' 0

  [ "$warned" -eq 0 ] && echo "  ok    all checks clear"
done

exit $status
