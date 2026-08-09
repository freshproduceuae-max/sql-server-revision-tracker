# Analyst Academy — project instructions

Live: https://credit-risk-academy.vercel.app (project name still says credit-risk;
the app is now **Analyst Academy** and covers three tracks).

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

Tracks are **data-driven**. `TRACKS` in `index.html` is the single source of
truth — routing, the nav tabs, the checkpoint routes, the active-tab accent and
the project-id → track mapping are all derived from it. Adding a track is one
registry entry plus its hero/path body in `renderApp`, not edits in five places.

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

