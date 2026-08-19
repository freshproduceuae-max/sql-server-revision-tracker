# Teacher MCQ role-swap experiment (G06–G10)

## Purpose

For Groups 1–5 of the Data Validation Teacher MCQ content, Claude authored
every question and Codex reviewed the diff for factual accuracy. Starting
with Group 6, the owner asked to swap roles for five groups (G06–G10) as a
trial: **Codex authors, Claude reviews** — to see whether the swap holds up
on quality and what it costs in tokens/time on each side.

**Scope note:** as of G10, this covers G01–G10 only — 152 lessons, 456
questions. Data Validation as a whole spans **G01–G19 plus 15 worked
exercises** — 236 techniques + 15 exercises = **251 items total** (per
`HANDOFF.md`). G11–G19 (84 techniques) plus the 15 worked exercises are
not started — **99 items remaining**. Do not conflate the two numbers:
99 is what's left; 251 is the whole track, done or not. "Completes the
5-group role-swap trial" and "completes all of Data Validation" are not
the same claim — only the former is true at this point.

## Method

For each group:

1. Claude reads the group's source lesson files (`data-validation-lab/methods/<GROUP_FOLDER>/`).
2. Claude fills in `docs/prompts/teacher-mcq-codex-authoring-template.md`
   with the group's specifics and saves it as `prompt.txt` in a fresh
   `_audit/teacher-mcq-role-swap/<GROUP_ID>/` folder.
3. Claude launches a **fresh** `codex exec --sandbox read-only` run (no
   resumed session) with that prompt, in the background, and saves the
   complete raw output as `output.txt` in the same folder — before any
   extraction, parsing, or cleanup.
4. Claude records the run's token count, session id, and invocation from
   the output into the results table below.
5. Claude extracts the JSON, runs a mechanical schema/style check (question
   counts, choice counts, no markdown emphasis), then manually reviews
   every question against its source lesson file for factual accuracy —
   the same rigor previously applied when reviewing Codex's after-the-fact
   review of Claude-authored content.
6. Any factual or schema corrections are made directly and counted.
7. Claude merges into `sources/teacher-mcq.json`, rebuilds
   `teacher-mcq.json`, verifies locally, commits, opens a PR, and — after
   the owner's approval — merges and deploys.
8. Claude records its own visible context/plan-usage change for the group
   where available.

## Standing rule

Every group must use the **same Codex model, reasoning effort, and
sandbox/approval configuration**, and the **same prompt template**
(only the placeholders differ) — see `CLAUDE.md` and the template file
for the enforced settings. A fresh Codex session per group keeps each
run an independent, reproducible data point rather than an accumulating
conversation.

## Results

| Group | Lessons | Questions | Codex drafting tokens | Additional review-fix tokens | Runtime | Retries | Claude corrections | Inconsistencies found | Claude context/plan usage | PR | Deploy |
|---|---|---|---|---|---|---|---|---|---|---|---|
| G06 Consistency | 16 | 48 | **lost/unknown** — output file deleted before the token count was recorded; not recoverable | 18,705 (G06-T10 Live Scenario self-contradiction fix, verified post-merge) | not recorded | 0 | 0 MCQ corrections; 1 source-lesson fix (G06-T10 narrative, unrelated to the MCQs) | 1 — G06-T10 Live Scenario contradicted its own Solution Query/Explanation (GB vs UK); MCQs already followed the correct code-based framing and needed no change | not recorded | [#40](https://github.com/freshproduceuae-max/sql-server-revision-tracker/pull/40) (merged) | Live (verified: 100 lessons / 300 questions in production) |
| G07 Business Rules | 16 | 48 | 43,676 | 0 (nothing to fix) | not recorded | 0 | 0 | 0 (Codex self-checked via `_flagged_inconsistencies`; reported none) | Context 424.2k → 506.5k (+82.3k); 5-hour usage 43% → 46% (+3 pts) | [#41](https://github.com/freshproduceuae-max/sql-server-revision-tracker/pull/41) (open, pending merge) | Pending |
| G08 Reconciliation | 15 | 45 | 43,580 | 0 (nothing to fix) | not recorded | 0 (0 Codex retries; 1 JSON syntax defect — trailing commas — repaired programmatically during extraction, not a Codex re-run) | 0 | 0 confirmed — Codex self-flagged 3 lessons (T03, T04, T06) via `_flagged_inconsistencies`, all verified as false positives (standard narrative-scenario-vs-schema-table mapping used throughout the course, not real contradictions) | not recorded (before/after snapshot not supplied for this group) | [#42](https://github.com/freshproduceuae-max/sql-server-revision-tracker/pull/42) (open, pending merge) | Pending |
| G09 Timeliness | 11 | 33 | 51,177 | 0 (nothing to fix) | not recorded | 0 | 0 | 0 — Codex reported no `_flagged_inconsistencies` this time | not recorded | [#43](https://github.com/freshproduceuae-max/sql-server-revision-tracker/pull/43) (open, pending merge) | Pending |
| G10 Data Type/Storage | 10 | 30 | 39,811 | 0 (nothing to fix) | not recorded | 0 | 0 schema fix (extraneous `questions_meta` key on every lesson, stripped programmatically — not a factual error) | 0 — Codex reported no `_flagged_inconsistencies` | not recorded (owner capturing independently as a clean boundary before this group) | [#44](https://github.com/freshproduceuae-max/sql-server-revision-tracker/pull/44) (open, pending merge) | Pending |

**Lesson learned after G06:** the drafting run's token count was lost
because the raw Codex output file was deleted (as part of routine `_scratch`
cleanup) before its "tokens used" line was read and recorded. This is why
CLAUDE.md now has a standing rule against deleting any Codex prompt/output
before its measurements are archived — see below.

## Session/run identifiers

| Group | Session id | Model | Reasoning effort | Sandbox | Invocation |
|---|---|---|---|---|---|
| G06 | not recorded (output deleted before capture) | gpt-5.4-mini (inferred from G07, same config) | low (inferred) | read-only (inferred) | `codex exec --sandbox read-only "$(cat ...)"` (exact prompt file not preserved) |
| G07 | `01a01a99-012a-73a0-bb11-be629eeb3a6c` | gpt-5.4-mini | low | read-only | `codex exec --sandbox read-only "$(cat _audit/teacher-mcq-role-swap/G07/prompt.txt)" < /dev/null > _audit/teacher-mcq-role-swap/G07/output.txt 2>&1` |
| G08 | `01a01abc-3d40-7dc0-947f-274f7d1fc86c` | gpt-5.4-mini | low | read-only | `codex exec --sandbox read-only "$(cat _audit/teacher-mcq-role-swap/G08/prompt.txt)" < /dev/null > _audit/teacher-mcq-role-swap/G08/output.txt 2>&1` |
| G09 | `01a01b08-70b0-7263-a180-b520ec15f571` | gpt-5.4-mini | low | read-only | `codex exec --sandbox read-only "$(cat _audit/teacher-mcq-role-swap/G09/prompt.txt)" < /dev/null > _audit/teacher-mcq-role-swap/G09/output.txt 2>&1` |
| G10 | `01a01b1d-e0c0-7b02-bc01-469ac2482619` | gpt-5.4-mini | low | read-only | `codex exec --sandbox read-only "$(cat _audit/teacher-mcq-role-swap/G10/prompt.txt)" < /dev/null > _audit/teacher-mcq-role-swap/G10/output.txt 2>&1` — note: startup emitted a benign `codex_models_manager` timeout warning to stderr before the run proper began; config header and completion were otherwise normal |

## Prompt template changelog

The standing rule requires the same prompt template across every group.
G09's prompt deviated from G06–G08's in two places, both additive
clarifications rather than a change of task:

1. Added an explicit "no trailing commas, verify parseable JSON" line —
   G08's output had a trailing-comma defect that needed a manual fix, so
   this was added to reduce (not guarantee against) recurrence.
2. Narrowed the `_flagged_inconsistencies` criteria to explicitly exclude
   the standard scenario-illustrates-a-real-world-concept-but-implements-
   against-the-actual-schema pattern, after G08 self-flagged 3 lessons
   (T03, T04, T06) that turned out to be false positives of exactly this
   kind.

Both changes are recorded here rather than silently applied, since they
break strict template identity with G06–G08. `docs/prompts/teacher-mcq-
codex-authoring-template.md` reflects the current (G09-onward) version;
this changelog is the record of what differed for earlier groups.

## Audit trail location

Raw prompts and complete outputs live in
`C:\Projects\Academy\_audit\teacher-mcq-role-swap\<GROUP_ID>\` — `prompt.txt`
and `output.txt` per group. G06's files were not preserved (deleted before
this rule existed); G07 onward are archived there.

## The G09 source-fix incident — a shared miss, not a Claude reporting error

While reviewing G09, a real pre-existing bug was found in `G09-T09.md`'s
Step 2 query: `ORDER BY DaysSinceLastEvent DESC NULLS LAST` — `NULLS LAST`
is Oracle/PostgreSQL syntax, invalid in T-SQL. The first fix replaced it
with `ORDER BY CASE WHEN DaysSinceLastEvent IS NULL THEN 1 ELSE 0 END,
DaysSinceLastEvent DESC`. **Claude proposed this fix, and Codex, asked to
independently verify it, confirmed it as valid T-SQL — both were wrong.**
SQL Server does not permit a SELECT-list alias to be used inside a larger
expression (like a `CASE`) in `ORDER BY`; only a bare alias reference is
documented-valid. Neither Claude's initial reasoning nor Codex's
verification pass caught this. The owner raised the question that surfaced
it. A second Codex verification pass — this time fetching Microsoft's live
`ORDER BY` documentation rather than reasoning from training data alone —
confirmed the correct, simpler fix: `ORDER BY DaysSinceLastEvent DESC`
(SQL Server treats NULL as the lowest sort value, so `DESC` already sorts
NULLs last with no extra logic needed).

This matters for how much to trust "Codex verified it" as a review
mechanism going forward: a verification pass using the same reasoning mode
that produced the original error is not independent evidence. Fetching an
authoritative external source (documentation, in this case) is what
actually caught the mistake — plain model reasoning, from either model,
did not.

## Conclusion (after G06–G10)

**Content quality: passed.** Across 204 Codex-drafted questions (G06–G10),
zero required a factual correction. Two mechanical defects were found and
fixed programmatically, not through content review: a trailing-comma JSON
syntax error (G08) and an extraneous `questions_meta` key (G10) — neither
was a factual/content error. Two pre-existing defects were found in the
underlying source lesson markdown (predating this experiment, unrelated to
Codex's authoring): G06-T10's self-contradicting Live Scenario, and
G09-T09's invalid `NULLS LAST` syntax — both fixed separately from the MCQ
content itself.

**Token savings: not demonstrated.** Claude's own context grew by
approximately **445.5k tokens** across the five-group trial — observed
context cost per lesson worked out to roughly **6.55k tokens/lesson**
(445.5k ÷ 68 lessons), noticeably higher than the earlier upper estimate of
**~3.93k tokens/lesson** used when weighing whether the swap would save
Claude-side tokens. Shifting authoring to Codex did not reduce Claude's
review burden by the margin assumed going in — independently verifying
every question against source, plus catching schema defects and source
bugs, cost real context regardless of who drafted the content.

**The risk this trial was meant to test — whether a model's blind spot as
*author* is invisible to it as *reviewer* — was not resolved.** No group
surfaced a genuine Codex authoring error for Claude-as-reviewer to catch or
miss. The one clear near-miss (G09's `NULLS LAST` fix) tested the opposite
pairing: Codex reviewing Claude's proposed fix, and both getting it wrong
under the same failure mode (reasoning from training data instead of
checking a source of truth).

**The G11 authoring/review-arrangement decision remains open.** This
document records what happened in G06–G10; it does not recommend continuing
or discontinuing the role-swap. That choice is the owner's, to be made
explicitly before G11 starts — see `HANDOFF.md`'s work queue.
