#!/usr/bin/env bash
# prose-lint.sh — mechanical voice guard for The Tower of Ardenmoor.
#
# Usage:  tools/prose-lint.sh manuscript/NN-slug.md [more files...]
#
# Run on every chapter BEFORE delivery (mandatory post-flight step in every mode; see modes/).
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
  # EM DASH — permitted deliberately (author decision 2026-07-31, reversing the
  # old zero-tolerance rule). Two-tier, because "deliberate" is a real constraint
  # and not a synonym for "unlimited":
  #   WARN on every occurrence, so each one is SEEN and justified in the engine
  #        report. That visibility is the whole content of "deliberate."
  #   FAIL above 2.0 per 1,000 words, which is the density at which the mark
  #        stops reading as a choice and starts reading as the machine tic the
  #        original ban existed to prevent.
  # NOT RETROACTIVE. All 37 manuscript files were written under the ban and hold
  # zero em dashes; this reversal permits the author's future use, it does not
  # license inserting dashes into finished prose.
  em=$(grep -o '—' "$f" | wc -l | tr -d ' ')
  if [ "$em" -gt 0 ] && [ "${words:-0}" -gt 0 ]; then
    r=$(( em * 10000 / words ))          # tenths of an occurrence per 1,000 words
    if [ "$r" -ge 20 ]; then
      echo "  FAIL  em dashes: $em ($((r/10)).$((r%10)) per 1,000 words, ceiling 2.0) — at that density the mark is a tic, not a choice; re-punctuate most of them"
      status=1
    else
      echo "  WARN  em dashes: $em ($((r/10)).$((r%10)) per 1,000 words) — permitted since 2026-07-31, but each is a deliberate choice: justify it in the engine report or re-punctuate"
      warned=1
    fi
  fi

  # EN DASH and hyphen-built dashes stay banned outright. The author's reversal
  # named the em dash only; ' -- ' in particular is nearly always a typo for one.
  n=$(grep -o '–\| -- ' "$f" | wc -l | tr -d ' ')
  if [ "$n" -gt 0 ]; then echo "  FAIL  en dashes / ' -- ': $n (house rule: zero; the em-dash reversal did not extend to these)"; status=1; fi

  # MEALS (corrected 2026-08-09): LUNCH is the midday meal, supper the evening one, and
  # dinner is a formal/company meal in the evening. This check previously banned "lunch"
  # outright, which had the rule exactly backwards. It now catches the actual error --
  # dinner presented as the midday meal -- and is silent across all 37 chapters.
  n=$(grep -oiE 'midday dinner|dinner at midday|dinner at noon|noon dinner' "$f" | wc -l | tr -d ' ')
  if [ "$n" -gt 0 ]; then echo "  FAIL  dinner as the midday meal: $n (LUNCH is midday here; dinner is a formal evening meal — see the style guide's MEALS entry)"; status=1; fi

  # STRUCTURED RELIGION (author, 2026-08-09: "Sunday can be a family day. Just don't make
  # it religious", then "Spiritual okay structured religion no"). The line is the
  # INSTITUTION, not the feeling. This pattern therefore catches only things that require
  # an organisation to exist -- clergy, congregation, service, sabbath, scripture, rite.
  #
  # It deliberately does NOT catch the spiritual register, which is load-bearing here and
  # was briefly and wrongly banned by the first version of this check: private prayer,
  # reverence, awe, wordless attention, folk belief. Ch 5's "the nearest thing I know to
  # prayer that a man can do with his body and no words" is the MODEL of what the book
  # wants, not a violation, so "pray", "prayer" and "worship" are all absent below.
  # Also not matched: "quiet as a church" / "truer than a church" (buildings, in simile),
  # "holy relic" (dismissive, of what the tales claim about lumens), "churchyard" (a
  # burial ground), "parish" (the CIVIL unit, 27 uses), "God help me" (idiom).
  #
  # A deliberate budget-0 tripwire: it is supposed to stay silent, and it is silent across
  # all 37 chapters. Its value is deterrence, not catch rate.
  n=$(grep -oiE "\b(sabbath|church service|(go|goes|going|went) to church|at church|congregation|clergy|clergyman|priest|priests|parson|vicar|sermon|scripture|catechism|liturgy|holy day|lord's day|high altar|say mass|said mass|tithe|tithes|ordained|devout)\b" "$f" | wc -l | tr -d ' ')
  if [ "$n" -gt 0 ]; then echo "  FAIL  structured religion: $n (spiritual is welcome here; an INSTITUTION is not — no clergy, congregation, service, sabbath or rite. \"Parish\" is the civil unit — see the story bible's SETTING & POLITY)"; status=1; fi

  # "BECK" IS RETIRED (author, 2026-08-12: "Don't use term beck. Call it a stream,
  # river, Brooke, etc."). The village watercourse is THE STREAM -- 146 instances were
  # converted across 27 chapters, state/geography.md and the golden reference samples.
  #
  # It is a Northern English dialect word, and it was the single most-repeated piece of
  # regional diction in the book, so it will come back the moment anything drafts from an
  # old sample unless a check stops it. (?!on) keeps "beckon" legal.
  #
  # THE WATERCOURSE IS THE RIVER (author, 2026-08-12, second ruling: "Let's make it a
  # river where appropriate and not stream"). It was briefly "the stream" earlier the
  # same day, on my argument that one village mill and walk-over ford stones made "river"
  # too big. The author overruled that and he is right that it costs nothing: stepping
  # stones across an English river are ordinary, and two lines read BETTER at the larger
  # scale -- the rent book's "River locked in the shallows, black down the middle", and
  # Cael's "the dry summer when the river went to a trickle". One name throughout, 151
  # instances; "where appropriate" turned out to be everywhere, because every use in the
  # book refers to the same single watercourse and there is no second, smaller water.
  # Extended the same day to the whole CLASS, on the author's follow-up ("Same with
  # bracken and Other similar obscure terms"), because fixing the one word he named and
  # waiting for the next is the mistake this repo has already logged once: a correction
  # is not applied until the CLASS of the error is fixed.
  #
  #   beck    -> RIVER       bracken -> ferns
  #   byre    -> cow shed    kist    -> trunk        bothy -> hut
  #
  # NOT retired, and deliberately so -- rural craft vocabulary is this book's texture,
  # and stripping it would flatten the valley into anywhere:
  #   hurdle   Cael's craft, load-bearing across three generations, tied to the coppice
  #            thread ("hazel cut properly comes again and is hurdles in seven years"),
  #            and there is no one-word plain equivalent for a woven panel.
  #   stook    the scene TEACHES it in its own next sentence ("There is nothing to
  #            stooking. You take up...") -- a word the text defines is not an obstacle.
  #   purlin, coping, lintel, quoin  a builder's book is allowed a builder's words.
  #   gorse, scree, tussock, sloe, hazel  ordinary countryside nouns, not dialect.
  n=$(grep -oiE '\b(beck|becks|bracken|byre|byres|kist|kists|bothy|bothies)\b' "$f" | grep -viE '^beckon' | wc -l | tr -d ' ')
  if [ "$n" -gt 0 ]; then echo "  FAIL  retired obscure/dialect word: $n (beck→river, bracken→ferns, byre→cow shed, kist→trunk, bothy→hut — author rulings 2026-08-12)"; status=1; fi

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
  # Added 2026-07-31 from the author's revision-skill brief, and kept only because the
  # author's OWN approved Prologue+Ch 1 revision cut 2 of its 3 instances. 26 of 37 chapters
  # use it; median 2, max 5. A budget of 3 fires on ~14% of chapters, under the noise ceiling.
  budget_check "$f" '"the whole of it"' 'the whole of it' 3
  # GENERALISATION — Emlyn converting his experience into what "a man" does. The single most
  # distinctive habit of this narrator, and until 2026-07-31 the engine had doctrine about it
  # (the author's revision brief §6.2) and no measure.
  # The pattern is deliberately NOT a raw "a man" count. Raw, it is 286 across the book, median 9
  # per chapter, and no threshold separates signal from noise: it conflates "a man came up the
  # road" (a noun) with "a man does not argue with weather" (the aphorism). Requiring a
  # generalising verb or modal after it isolates the aphorism: 63 across the book, median 2, and
  # a budget of 3 fires on 9% of chapters where the raw count could not get under 28%.
  # Keep it PERSONAL where it is decorative: "I mistook this" over "a man mistakes this".
  budget_check "$f" '"a man does/has/never…" (generalisation)' \
    'a man \(does\|do\|has\|have\|had\|will\|would\|must\|cannot\|can\|ought\|never\|always\|is\|was\|knows\|learns\|takes\|gets\|wants\|needs\|sees\|finds\|makes\|goes\|comes\|lives\|dies\)\b' 3
  budget_check "$f" '"which by then"' 'which by then' 1
  budget_check "$f" '"of course"' 'of course' 2
  budget_check "$f" '"particular" (adj)' 'particular' 6
  budget_check "$f" '"plain/plainly"' 'plain\b\|plainly' 8
  budget_check "$f" '"had had" (stacked perfects)' 'had had\|that that' 0

  [ "$warned" -eq 0 ] && echo "  ok    all checks clear"
done

exit $status
