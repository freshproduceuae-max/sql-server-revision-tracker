# Teacher MCQ — Codex authoring prompt template

Reusable prompt for the Codex-authors / Claude-reviews role-swap experiment
(see `docs/teacher-mcq-role-swap-experiment.md`). Fill in the placeholders,
save the filled prompt into the group's audit folder as `prompt.txt` before
sending it to Codex — never send an unsaved prompt.

## Invocation

```bash
cd sql-server-revision-tracker
nohup codex exec --sandbox read-only "$(cat <path-to-filled-prompt>)" < /dev/null > <path-to-output>.txt 2>&1 & disown
```

Model, reasoning effort, and sandbox mode must stay identical across every
group in the experiment (see CLAUDE.md). As of G06–G07 this was:
`model: gpt-5.4-mini`, `reasoning effort: low`, `sandbox: read-only`,
`approval: never` — these are printed at the top of every `codex exec`
output; confirm they match before treating a run as comparable.

## Template

```
You are drafting MCQ warm-up content for "The Teacher" AI tutor feature in Analyst Academy, a SQL Server data-quality learning app. Read all {{LESSON_COUNT}} source lesson files below fully, then author 3 multiple-choice questions per lesson ({{QUESTION_COUNT}} questions total) testing understanding of each lesson's actual technical content — not generic SQL trivia, but the specific reasoning, gotchas, and explanations that lesson's markdown teaches.

Source lesson files (read each fully):
{{SOURCE_FILE_PATHS}}
(one absolute path per line, e.g.
C:\Projects\Academy\sql-server-revision-tracker\data-validation-lab\methods\{{GROUP_FOLDER}}\{{GROUP_ID}}-T01.md
... through {{GROUP_ID}}-T{{LESSON_COUNT}}.md)

REQUIRED OUTPUT SCHEMA — you must output ONE valid JSON object as your final answer, with this exact shape (no markdown fencing, no commentary before or after — just the raw JSON object as your last output):

{
  "{{GROUP_ID}}-T01": {
    "open": "1-2 sentence warm, sequential warm-up intro for this lesson, referencing prior lessons/groups by name where genuinely applicable",
    "questions": [
      {
        "q": "question text testing a specific, non-obvious point from the lesson's Explanation or Solution Query",
        "choices": ["correct answer text", "wrong distractor 1", "wrong distractor 2", "wrong distractor 3"],
        "correct": 0,
        "right": "affirming feedback shown when the user picks the correct answer — specific, not generic praise",
        "wrong": "feedback shown when the user picks ANY wrong answer — explains why the correct answer is right, referencing the lesson's actual logic"
      },
      { ... 2 more questions, same shape ... }
    ],
    "close": "1-2 sentence wrap-up, may reference what comes next"
  },
  "{{GROUP_ID}}-T02": { ... },
  ... all {{LESSON_COUNT}} lessons ...
}

CONSTRAINTS (violating these has caused rejected content before):
- Every "correct" index must actually point to the technically correct choice — verify against the lesson's own Solution Query and Explanation, not general SQL knowledge that might contradict this specific lesson's framing.
- The 3 wrong choices must be genuinely wrong (factually incorrect or nonsensical), not just "less good" phrasings of a correct idea.
- Never write markdown emphasis (**bold**, *italic*) inside any string value — this app's renderer treats asterisks as literal text, and injecting markdown syntax breaks nothing but is against house style.
- Do not invent SQL behavior not demonstrated in the lesson's own Solution Query/Explanation. If a lesson states something as a stated simplification, do not treat it as an error to catch in the MCQ.
- "wrong" feedback text must not assert anything the source lesson doesn't actually support.
- IMPORTANT: before writing any question, check whether the lesson's own Live Scenario paragraph is internally consistent with its Solution Query/Explanation/Expected Output. If you notice ANY internal contradiction within a lesson file (a fact stated one way in the scenario and the opposite way in the code/explanation), do not silently pick one side — instead, add a top-level key "_flagged_inconsistencies" to your output JSON object (an array of strings, one per lesson with an issue, e.g. "{{GROUP_ID}}-T05: scenario says X but Solution Query says Y") so it can be reviewed separately. Base your actual MCQ content on the Solution Query and Explanation sections (the technical ground truth), not the narrative scenario, when they conflict.

Output the complete JSON object as your final message with no other content around it.
```

## Placeholders

| Placeholder | Meaning | G06 example | G07 example |
|---|---|---|---|
| `{{GROUP_ID}}` | Lesson id prefix | `G06` | `G07` |
| `{{GROUP_FOLDER}}` | Source folder name | `G06_Consistency` | `G07_Business_Rules` |
| `{{LESSON_COUNT}}` | Lessons in the group | `16` | `16` |
| `{{QUESTION_COUNT}}` | `LESSON_COUNT × 3` | `48` | `48` |
| `{{SOURCE_FILE_PATHS}}` | Full absolute path list | — | — |

## Post-run checklist

1. Save the filled prompt and full raw `codex exec` output to
   `_audit/teacher-mcq-role-swap/<GROUP_ID>/` (`prompt.txt`, `output.txt`) —
   before any extraction or cleanup.
2. Record the "tokens used" figure from the output into the results table
   in `docs/teacher-mcq-role-swap-experiment.md`.
3. Note the `session id` and exact invocation command in the same table —
   each group must be a fresh Codex session, not a resumed one.
4. Extract the JSON, validate schema (question/choice counts, no markdown
   emphasis), then review every question against its source lesson file
   before merging anything.
