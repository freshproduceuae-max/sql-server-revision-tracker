# Analyst Academy — project instructions

Live: https://credit-risk-academy.vercel.app (the Vercel project is now named
`analyst-path`, but the live URL still says credit-risk — see HANDOFF "Known
gaps"). The app is **Analyst Academy** and covers **four tracks**: Credit Risk,
Data Validation, Business Analysis and Quiz Practice.

---

## How work gets done here — read this first

Standing operating procedure. Applies to every change.

**1. Work sequentially. No subagents, no workflows.** The front end is a single
`index.html`; two writers collide. Reading parallelises, writing does not. Use
extra capacity for review, never for parallel editing.

**2. Codex reviews every change after it is built.** Hand it the diff **plus the
evidence** — the failing input, the reproduction, what was measured before and
after. State the constraints it cannot infer from code (see "Rules this app
already follows") and point it at this file. Ask whether the *diagnosis* is
right, not whether the style is good; the costly errors here were wrong
diagnoses (entries 1, 10), never syntax.

**Also review before building** when the change is ambiguous, multi-step, or
touches routing, storage, deploys or content loading. Skip the pre-review for
obvious low-risk fixes — making it unconditional turns it into ritual that gets
skipped wholesale.

**3. Do not take Codex on faith.** Verify each finding against the code before
acting. It has been right about real bugs and wrong about details in the same
review.

**4. Check the contract at the boundary.** This is the single most common defect
class in this repo. For any change to routing, parsing, validation, storage or
rendering, verify the **real input shape, the real output, and the real
user-visible state**. Shallow guards are where the bugs live:

- `typeof x === 'object'` passes for arrays and `null`
- a bare key lookup passes for `constructor` and `__proto__`
- `a || !b && !c` does not group the way it reads
- no size limit means a hostile input parses until the tab dies
- an existence check is not a visibility check
- a link's text is not proof of where it points

**5. Verify your own claims before reporting.** Everything asserted must be
something checked *this session*:

- `200` ≠ worked — check content-type and size (entries 2, 3, 13)
- exit `0` ≠ worked — read the message (entry 18)
- a passing guard may have checked nothing; if it cannot find its inputs that is
  a failure, not a pass (entry 18)
- an element existing ≠ visible. Where meaning is carried by colour, shape or
  position, compute the contrast ratio and render in **both themes**. Text dumps
  and element counts are blind to visual bugs (entry 23)
- your own probe can false-negative — inspect the real output before concluding
  the code is broken (entry 21)

**6. Ask rather than improvise.** When a request admits materially different
implementations — different data models, different failure modes — sketch the
options and ask. Do not silently pick one.

**7. Branch and PR. Never commit to the default branch.** There is no `main`;
the default is `claude/confident-volta-l3e55f`.

**8. Show the plan before building it, and name the scope boundary out loud.**
Three testable behaviours, not a slogan: (a) the plan appears in the
conversation before the first change of a phase, (b) non-retrofittable
constraints are asked about before code is written, (c) every mid-phase
request gets an explicit "this phase" or "the queue." If a session cannot
point at all three, this rule was not followed. The owner's
own course material (`AI Course Content/Saqr Academy11–12.docx`) already
defines how a phase runs — use it rather than inventing a process per session:

- **A release is evidence, not a feeling.** Four separate gates, each answering
  one question and producing proof: **Safety** (secrets, auth boundaries, env
  vars), **Reliability** (build/lint/tests, core workflows still pass), **UX**
  (loading, error, empty, mobile), **Demo** (deployed, release notes, known
  limitations written down).
- **Before starting a phase, display the plan in the conversation** — not only
  in a file. Show what is in scope, what is explicitly out, and which gates
  apply. A plan the owner has not seen is not a plan they agreed to.
- **Run the intake first.** Where a phase has design constraints that cannot be
  retrofitted (a data model, a retention period, a failure mode), ask them
  before writing code, not after.
- **When a new request arrives mid-phase, check it against the shown plan and
  say which it is** — part of this phase, or a new one for the queue. Do not
  silently absorb it. "Ask for UX polish without scope creep" is the owner's
  own phrasing; absorbing every new point in arrival order is exactly the
  failure it names. See LESSONS-LEARNED entry 33 — this rule exists because a
  whole session ran as reactive absorption with no plan ever shown.

A portable copy lives in `AGENT-LESSONS.md` in the `Make an AI Support System`
repo; it is hand-maintained, so corrections here need making there too.

---

## Reporting status — approval board, not narrative

The owner reviews as a creative director, not a technical supervisor: they
approve or reject, they do not want the reasoning trail. When reporting
anything that needs a yes/no, use this shape, not prose:

- **A table or short list of what needs a decision** — one row per item, plain
  language, no file-path clutter unless the item *is* a file.
  For a merge/build decision specifically: **what's inside → pros → cons →
  recommendation**, each as one or two lines, not paragraphs.
- **One line each for what's moving and what's stuck.** No walkthrough of how
  it got there unless asked.
- Save the "why" and the mechanism for when they ask, not by default.

This was corrected explicitly mid-session: *"your writing is just like your
thinking from off top of your head... I'm not your supervisor like Codex. I'm
the creative director... a presentation or a shorter preview of everything we
need to approve concisely."*

---

## Layout

```
C:\Projects\Academy\
├─ sql-server-revision-tracker\    ← the deployed app (git repo, Vercel root)
│  ├─ index.html                   ← the entire app: one file, plain JS, no build
│  ├─ quiz-bank.json               ← generated — do not hand-edit
│  ├─ sources\                     ← quiz source data (rebuilds are self-contained)
│  ├─ scripts\                     ← build tooling (tracked in git)
│  ├─ HANDOFF.md                   ← read this first if you are new here
│  ├─ data-validation-lab\         ← lesson markdown, served from GitHub raw
│  └─ vercel.json
├─ _scratch\                       ← local scratchpad (untracked, see below)
└─ _archive\                       ← superseded work kept for reference
```

## Scratchpad

**Always use `C:\Projects\Academy\_scratch\` for working files, not the session
scratchpad.** The session one is wiped when the session ends; this one persists.
Anything needed to rebuild the app goes in `scripts/` and gets tracked in git
instead — see `_scratch/README.md` for the split.

## Lessons learned — read first, then append

**Read `LESSONS-LEARNED.md` before debugging anything in this project**, and
**append an entry whenever you solve something non-obvious.** It already records
root causes that are easy to re-misdiagnose (a "broken deploy" that was really a
wrong git branch; a markdown parser corrupting SQL).

Write each entry as: what it looked like → what actually caused it → the fix →
the rule to carry forward. Include the wrong first hypothesis — that is usually
the part that saves time later.

**Keep it true.** If something in that file turns out to be wrong, correct the
entry rather than adding a contradicting one. A stale lessons file is worse than
none; that already happened once with the deploy notes.

It also has a section on working with Codex — hand over the evidence and the
project constraints, not just the diff.

**These two docs exist twice, on purpose, and are guarded.** `CLAUDE.md` must sit
here at the working-directory root to load as project instructions, but git only
tracks files inside `sql-server-revision-tracker/`. So this copy is the one to
edit, and a copy lives in the repo for version control. After editing either doc:

```bash
node sql-server-revision-tracker/scripts/check-docs-sync.js --fix
```

Without `--fix` it just reports, and exits non-zero on drift. Two copies without
a guard is how the DV group ids went wrong — do not let these silently diverge.

## Checkpoint projects

Each track has milestone projects that consolidate the lessons before them:
**13 for Credit Risk** (one per course part) and **10 for Data Validation**
(thematic group pairs). Every module and every group is covered exactly once —
`scripts/build-projects.js` fails the build if coverage breaks.

A checkpoint unlocks only when all its covered lessons are complete, then can be
marked done for +50 XP. Timeline and brief are **full pages** (`#projects/<track>`,
`#project/<id>`), never dialogs.

To regenerate briefs and data:

```bash
node scripts/build-projects.js
```

Credit briefs follow one borrower (Meridian Fabrication Ltd) across the whole
course so later checkpoints build on earlier ones. DV briefs run against the six
dirty CSVs in `data-validation-lab/schemas/`.

**New static folders need a `builds` entry in `vercel.json`**, or the SPA
catch-all silently serves index.html instead — see LESSONS-LEARNED entry 13.

## Rebuilding the quiz bank

`quiz-bank.json` is generated. To regenerate it:

Sources are committed under `sources/`, so this works from a clean clone with no
files from outside the repo:

```bash
cd sql-server-revision-tracker
node scripts/build-quiz-bank.js sources/quizzes-sql-powerbi.json ../_scratch/out-sql.json
node scripts/build-quiz-bank.js sources/quizzes-ai-supercourse.json ../_scratch/out-ai.json all
node scripts/merge-quiz-banks.js quiz-bank.json ../_scratch/out-sql.json ../_scratch/out-ai.json
```

Output is deterministic — same inputs produce a byte-identical file. The merge
step refuses to write if any free-text question survived or an answer is missing
from its choices.

## Adding a track

Tracks are **data-driven for navigation**. `TRACKS` in `index.html` is the single
source of truth for routing, the nav tabs, the checkpoint routes, the active-tab
accent and the project-id → track mapping. Those five no longer need touching.

Be accurate about what that does and does not cover. A track that brings its own
content source still needs three explicit additions beyond the registry entry:

1. its hero/path body in `renderApp`
2. a branch in `contentUrl()` if lesson content lives somewhere new
3. a loader plus its trigger in `render()`, if the content is fetched

Those are genuine per-track dispatch, not leftover hardcoding — but "adding a
track is one registry entry" overstates it, and Codex was right to say so.

A track owns checkpoint projects only if it declares a `projPrefix`. Omit it (as
Quiz Practice and Business Analysis do) and no `#projects/<id>` route is
generated for that track.

Per-track hero/path bodies stay bespoke on purpose — they render genuinely
different shapes (modules, techniques, chapters, question banks).

## Business Analysis track

Content follows the BABOK v3 chapter and task structure — 10 chapters, 42
lessons. **Only the structure is taken from BABOK, which is factual published
information; all lesson text is original writing for this app.** The BABOK Guide
itself is IIBA copyright and this site is public, so never paste its text in.

`business-analysis/` is generated — do not hand-edit it:

```bash
node scripts/build-ba-lessons.js
```

Output is deterministic, and the script fails if `index.json` and the markdown on
disk disagree about any lesson id.

Unlike Credit Risk and DV, **BA content loads from this origin, not GitHub raw**
(`./business-analysis/…`). That is deliberate: cross-branch content URLs are what
caused LESSONS-LEARNED entry 1. The chapter list is fetched from
`business-analysis/index.json` at runtime rather than duplicated into
`index.html`, so the two cannot drift (entry 16).

`business-analysis/**` has a `builds` entry in `vercel.json`. Without it the SPA
catch-all serves `index.html` with a `200` and every lesson silently breaks —
entry 13.

## Rules this app already follows — don't regress them

- **No free-text questions.** There is no text-entry UI. `fill_in_the_blank` and
  `short_answer` are converted to multiple choice at build time.
- **Never markdown-parse quiz text.** Quiz strings go through `quizText()`, which
  escapes and then handles backticks only. Asterisks stay literal because
  `*args`, `**kwargs` and `COUNT(*)` appear in the content.
- **Code is lifted out of markdown before any other rule runs** (`mdToHtml`).
  Inlining it caused two bugs: blank lines split code blocks, and `*` inside SQL
  parsed as emphasis. The placeholder is written as a `\u0000` escape sequence,
  never a raw NUL byte — HTML parsers replace raw NUL inside `<script>`.

## Deploying

The Vercel MCP connector is often disconnected. The CLI works:

```bash
cd sql-server-revision-tracker
npx vercel --prod --yes
```

`.vercel/` is gitignored, so a fresh clone has no project link. Run
`node scripts/setup-vercel.js` to pin team `team_cxU0NZtjMsnBvJprrVzn43Xo` and
project `prj_LAGdEd02pyHEQbY8WWjKqAKVjx7t` — never run interactive `vercel link`
and let it guess.

After deploying, verify in a browser — not just that the build succeeded. Check a
lesson renders its content and a quiz question answers correctly.

## Teacher MCQ role-swap experiment (G06–G10)

Full method and results: `docs/teacher-mcq-role-swap-experiment.md`. Prompt
template: `docs/prompts/teacher-mcq-codex-authoring-template.md`. Standing
rules for the duration of this experiment:

- **Never delete a Codex prompt, output, or token-count record before
  archiving it and recording its measurements.** G06's drafting-run token
  count was lost this way — do not repeat it.
- Preserve the raw prompt and complete raw output for every group in
  `C:\Projects\Academy\_audit\teacher-mcq-role-swap\<GROUP_ID>\`
  (`prompt.txt`, `output.txt`) before any extraction or cleanup.
- Record the "tokens used" figure from the Codex output into the results
  table the moment the run finishes — before parsing the JSON out of it.
- Use the same Codex model, reasoning effort, and sandbox/approval
  configuration, and the same prompt template, for every group in the
  experiment. Start a fresh Codex session per group — never resume one
  accumulating session — and record its session id and exact invocation.
- Claude must independently review every drafted question against its
  source lesson file — Codex authoring a question is not itself evidence
  the question is correct.
- A verification pass is not independent evidence if it uses the same
  reasoning mode that produced the original claim. The G09 incident: Claude
  proposed a T-SQL fix, Codex "verified" it via reasoning alone, both were
  wrong — an authoritative external source (fetched documentation) is what
  actually caught the mistake, on a second pass. When verifying a technical
  claim that can be checked against a real specification, fetch the
  specification rather than reasoning from training data a second time.

## Definition of done — Teacher MCQ content groups

**PR review by Codex** (when used) follows `docs/codex-pr-review-workflow.md`
— fresh isolated worktree, blind independent review, Claude reviews any
Codex-proposed patch before it reaches the PR. That is the one authoritative
copy; `_audit/codex-pr-reviews/PR-<n>/` holds only raw per-run evidence, never
a second copy of the procedure.

A group is not complete merely because its questions build successfully.
Before calling a group done:

- The group's PR must update the machine-readable progress block in
  `HANDOFF.md` (between the `HANDOFF-PROGRESS:START`/`END` markers) and
  pass `node scripts/check-handoff-progress.js`.
- A cold session must run `node scripts/check-handoff-progress.js` before
  trusting `HANDOFF.md`'s stated progress — the prose above that block is
  not authoritative on its own; the checker is.
- Never silently carry forward a stale queue table. If the checker fails,
  fix `HANDOFF.md` (via `--fix` plus review of the diff) before doing
  anything else — including before starting a new group.
- **`contentThroughPR` tracks the latest merged PR that changed
  `sources/teacher-mcq.json` or `teacher-mcq.json` — not the latest merged
  PR in the repo.** Those are different numbers. A docs, process, or
  checker-maintenance PR (including a PR that fixes this very block) must
  never become `contentThroughPR`; the checker filters on file path
  specifically so it can't. Treating "newest merged PR" as the tracked value
  created a self-referential loop: fixing a stale PR number produces a new
  merged PR, which makes the fix stale again the moment it lands. Do not
  reintroduce that field. `sourcesTeacherMcqHash` (a sha256 of
  `sources/teacher-mcq.json`) is the more reliable signal of which content
  state was actually verified — prefer it over any PR number when the two
  seem to disagree.

