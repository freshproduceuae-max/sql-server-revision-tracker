# Teacher MCQ role-swap experiment (G06–G10)

## Purpose

For Groups 1–5 of the Data Validation Teacher MCQ content, Claude authored
every question and Codex reviewed the diff for factual accuracy. Starting
with Group 6, the owner asked to swap roles for five groups (G06–G10) as a
trial: **Codex authors, Claude reviews** — to see whether the swap holds up
on quality and what it costs in tokens/time on each side.

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
| G08 Reconciliation | 15 | 45 | 48,807 | 0 (nothing to fix) | not recorded | 0 (0 Codex retries; 1 JSON syntax defect — trailing commas — repaired programmatically during extraction, not a Codex re-run) | 0 | 0 confirmed — Codex self-flagged 3 lessons (T03, T04, T06) via `_flagged_inconsistencies`, all verified as false positives (standard narrative-scenario-vs-schema-table mapping used throughout the course, not real contradictions) | not recorded (before/after snapshot not supplied for this group) | [#42](https://github.com/freshproduceuae-max/sql-server-revision-tracker/pull/42) (open, pending merge) | Pending |
| G09 Timeliness | 11 | 33 | — | — | — | — | — | — | — | — | — |
| G10 Data Type/Storage | 10 | 30 | — | — | — | — | — | — | — | — | — |

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

## Audit trail location

Raw prompts and complete outputs live in
`C:\Projects\Academy\_audit\teacher-mcq-role-swap\<GROUP_ID>\` — `prompt.txt`
and `output.txt` per group. G06's files were not preserved (deleted before
this rule existed); G07 onward are archived there.

## Read so far

One clean group (G07, zero corrections) is not strong evidence either way —
the risk flagged before starting was that a model's blind spot as *author*
is exactly what it can't self-catch as *reviewer*, and Claude is now
reviewing instead of Codex, so this trial can't fully test that concern
either. G06 did surface one real issue, but it was in the hand-authored
source lesson content (predating this experiment), not in anything Codex
drafted — Codex's MCQs correctly worked around it. Continuing through G10
per the owner's instruction unless a group surfaces a genuine quality
problem.
