# Teacher MCQ reverse pilot — G11 (Claude authors, Codex reviews)

## Why this exists as a separate document

`docs/teacher-mcq-role-swap-experiment.md` records the completed G06–G10
trial (Codex authors, Claude reviews) and is kept historically intact per
the owner's explicit instruction — it is not touched by this pilot except
for a brief cross-link added after this report is complete. This document
records the **reverse** arrangement, piloted on G11 only. The owner stopped
the decision at G11 — this pilot does not commit G12 onward to either
arrangement.

## What was decided (owner's exact framing)

- Claude authors the G11 content once, performing normal verification while
  authoring (checking each question against its source lesson file as it's
  written) — **no duplicated exhaustive self-review pass** after the fact.
- Content is committed and an **open, held PR** is created before Codex
  reviews it, so Codex works from an exact PR head SHA with neutral
  evidence in an isolated worktree — following
  `docs/codex-pr-review-workflow.md`, extended here to content review
  (Codex may propose minimal corrections in its isolated worktree; Claude
  independently verifies every one before it reaches the PR).
- Codex may edit only its isolated worktree. Nothing merges, deploys, or
  starts G12 without the owner's explicit instruction.
- Historical token comparisons against G01–G10 must be labelled
  **directional, not equivalent** — see the token section below.

## Scope

G11 — Profiling, 10 techniques (`G11-T01`…`G11-T10`), 10 lessons, 30
questions (3 per lesson, matching the schema every other group uses). Sized
to match G10's group for rough comparability, per the owner's explicit
choice over a smaller 3–4 lesson sample.

## Method

1. Claude read all 10 source lesson files in
   `data-validation-lab/methods/G11_Profiling/` in full.
2. Claude drafted 3 questions per lesson directly from each lesson's
   Explanation and Live Scenario sections — each question anchored to a
   specific stated fact (a formula, a named trap, a documented limitation),
   not paraphrased from memory. Verification happened during drafting:
   each question was checked against its source paragraph as it was
   written.
3. Draft saved to `_scratch/g11-teacher-mcq-draft.json`, merged into
   `sources/teacher-mcq.json`, rebuilt into `teacher-mcq.json` via
   `node scripts/build-teacher-mcq.js` — passed schema validation on the
   first run (10 lessons, 30 questions, 4 choices each, no free text).
4. `HANDOFF.md`'s progress block regenerated via
   `node scripts/check-handoff-progress.js --fix`, confirmed clean on a
   second run without `--fix`. `contentThroughPR` correctly stayed at
   **44** (this PR is not yet merged).
5. Content committed on `content/g11-profiling-claude-authored-reverse-pilot`,
   PR opened and **held** — not merged.
6. Codex review pending (this section updates once that review runs) —
   fresh isolated worktree at the PR's exact head SHA, blind prompt (source
   lesson files + drafted JSON only, no Claude conclusions), per
   `docs/codex-pr-review-workflow.md`.
7. Claude independently reviews any Codex-proposed correction against the
   source lesson files before it's applied — a correction is never accepted
   merely because Codex made it.

## Token reporting — five fields, directional comparison only

Per `docs/codex-pr-review-workflow.md` §9: total input, cached input, new
input (= total − cached), output, and reasoning tokens are reported
separately, never collapsed into one "cost" figure.

**Claude-authoring token usage for G11 is not separately instrumented the
way `codex exec --json` instruments Codex runs** — Claude's authoring
happens as part of this normal session, not as a standalone measured
subprocess call, so there is no equivalent five-field breakdown to report
for the authoring step itself. This is recorded here as a known gap, not
elided.

**Codex's review-run token figures** will be recorded in this section once
the review runs, using the same five-field method as the PR-review
workflow's `manifest.txt`.

**Comparability warning — read before drawing any conclusion:**
G01–G10's "tokens used" figures in `docs/teacher-mcq-role-swap-experiment.md`
were captured from each `codex exec` run's own summary output, not
uniformly via the five-field total/cached/new/output/reasoning breakdown
this project now uses (that breakdown was only formalized after PR #46/#47).
G06's figure was lost entirely. **Do not compare G11's token figures
against G06–G10's without first confirming what each older figure actually
measured** — a raw number-to-number comparison across different extraction
methods would compare unlike things, exactly the mistake
`docs/codex-pr-review-workflow.md` §9 warns against for PR reviews. Any
claim of token savings or token cost from this pilot must be qualified as
directional only, not proven, unless the older figures are re-derived
using this same method.

## Per-lesson / per-question figures

| Lesson | Questions | Status |
|---|---|---|
| G11-T01 Column Completeness Profile | 3 | Drafted, unreviewed |
| G11-T02 Value Distribution Analysis | 3 | Drafted, unreviewed |
| G11-T03 Numeric Column Statistics | 3 | Drafted, unreviewed |
| G11-T04 Cardinality and Uniqueness Check | 3 | Drafted, unreviewed |
| G11-T05 Pattern Frequency Analysis | 3 | Drafted, unreviewed |
| G11-T06 Temporal Profile | 3 | Drafted, unreviewed |
| G11-T07 Cross-Column Correlation Profile | 3 | Drafted, unreviewed |
| G11-T08 Data Density and Sparsity Profile | 3 | Drafted, unreviewed |
| G11-T09 Outlier and Anomaly Profile | 3 | Drafted, unreviewed |
| G11-T10 Schema Change and Drift Detection | 3 | Drafted, unreviewed |
| **Total** | **30** | Codex review pending |

This table updates once Codex's review and Claude's independent
verification are complete.

## Audit trail

`_audit/teacher-mcq-role-swap/G11-reverse-pilot/` — Codex review prompt,
output, token breakdown, session id, before/after state, same preservation
discipline as G06–G10 and the PR-review pilot (PR #46), before any cleanup.

## Result (pending)

Verdict, findings, and the owner's merge decision go here once the Codex
review and Claude's independent verification are complete.
