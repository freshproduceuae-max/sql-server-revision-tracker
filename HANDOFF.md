# Handoff — Analyst Academy

Everything a new person or agent needs to take this over. Read this first, then
`CLAUDE.md` for the working rules and `LESSONS-LEARNED.md` before debugging
anything.

Live: **https://credit-risk-academy.vercel.app**

---

## What this is

A Duolingo-style learning app with four tracks:

| Track | Content | Where the content lives |
|---|---|---|
| 💼 Credit Risk | 47 modules + 7 case studies | GitHub raw, **separate branch** (see below) |
| 🧪 Data Validation | 236 techniques / 19 groups + 15 exercises | `data-validation-lab/` in this repo |
| 📐 Business Analysis | 42 lessons / 10 chapters | `business-analysis/` in this repo (**generated**) |
| 🎯 Quiz Practice | 2,079 questions, 11 banks | `quiz-bank.json` (generated) |

Tracks are **data-driven**: `TRACKS` in `index.html` drives routing, the nav tabs,
the checkpoint routes and the tab accent. Adding a track is a registry entry plus
its hero/path body — and, if it brings its own content source, a `contentUrl()`
branch and a loader. See `CLAUDE.md` for the full checklist.

Plus **23 checkpoint projects** (13 credit, 10 data validation) that unlock only
when the lessons they consolidate are marked complete.

The entire app is **one file** — `index.html`. Plain JavaScript, no framework, no
build step, no bundler. Open it and read it; that is the whole front end.

---

## Setup

```bash
git clone https://github.com/freshproduceuae-max/sql-server-revision-tracker.git
cd sql-server-revision-tracker
node scripts/setup-vercel.js     # pins the Vercel project (.vercel/ is gitignored)
npx vercel whoami                # must succeed before any deploy
```

No `npm install` — there are no dependencies. Node is used only for the build
scripts, and they use nothing outside the standard library.

To run locally you need a real HTTP server, not `file://`. The app fetches
`quiz-bank.json` and lesson markdown, and browsers block those over `file://`:

```bash
npx serve .        # or any static server
```

---

## Three things that surprise people

**1. There is no `main` branch.** The default branch is
`claude/confident-volta-l3e55f`. Branch from it and PR back into it.

**2. Credit Risk lesson content is on a *different branch*** —
`claude/credit-risk-academy` — and is fetched at runtime from GitHub raw URLs.
It is not in your working tree. A wrong branch name in those URLs is what once
made every lesson show "Content unavailable" for multiple sessions; the
deployment was never at fault. See `LESSONS-LEARNED.md` entry 1.

**3. `vercel.json` needs a `builds` entry for every static folder.** The SPA
catch-all sends unmatched paths to `index.html`, so a missing entry means your
new asset silently returns the app's HTML with a `200`. Always check
content-type and size after adding assets, not just the status code.

---

## Regenerating what is generated

`quiz-bank.json`, everything under `projects/`, and everything under
`business-analysis/` are **build outputs — never hand-edit them.** Sources are
committed under `sources/`, so the repo can rebuild itself with no external files.

```bash
# Quiz bank (2,079 questions across 11 banks)
node scripts/build-quiz-bank.js sources/quizzes-sql-powerbi.json  ../_scratch/o1.json
node scripts/build-quiz-bank.js sources/quizzes-ai-supercourse.json ../_scratch/o2.json all
node scripts/merge-quiz-banks.js quiz-bank.json ../_scratch/o1.json ../_scratch/o2.json

# Checkpoint projects (briefs + synthetic portfolio CSV)
node scripts/build-projects.js

# Business Analysis lessons (42 lessons + index.json)
node scripts/build-ba-lessons.js
```

**Business Analysis content loads from this origin, not GitHub raw.** That is
deliberate — cross-branch content URLs caused entry 1 in `LESSONS-LEARNED.md`.
Its chapter list is fetched from the generated `business-analysis/index.json` at
runtime rather than duplicated into `index.html`, so the two cannot drift. Only
the BABOK chapter *structure* is used, which is factual published information;
all lesson prose is original, because the BABOK Guide is IIBA copyright and this
site is public.

Builds are **deterministic** — same inputs give a byte-identical file. That is
deliberate: it means you can verify a change by rebuilding and diffing against
what is already committed. If the output differs unexpectedly, something real
changed.

Write intermediate output to `../_scratch/` (untracked). Anything the build
genuinely needs belongs in the repo instead.

---

## The guards, and why they exist

Run these before committing. Each one exists because the thing it checks already
went wrong once.

| Command | Fails when |
|---|---|
| `node scripts/lint-markdown.js data-validation-lab projects business-analysis` | a fence is indented inside a list, or left unclosed |
| `node scripts/check-docs-sync.js` | `CLAUDE.md`/`LESSONS-LEARNED.md` drift from their versioned copies |
| `node scripts/build-projects.js` | checkpoint coverage breaks, or a checkpoint waits on an id the app cannot complete |
| `node scripts/build-ba-lessons.js` | `business-analysis/index.json` and the markdown on disk disagree about any lesson id |
| `node scripts/merge-quiz-banks.js …` | a free-text question survives, an answer is missing from its choices, or an option looks truncated |

`check-docs-sync.js` is safe to run from any worktree — it locates the live docs
via git rather than assuming the repo's parent directory. `--fix` makes the root
copy win; `--from-repo` makes the tracked copy win. It **refuses** `--fix` when
the tracked copy is the newer of the two, so editing `CLAUDE.md` on a branch
cannot be silently reverted by someone running `--fix` out of habit.

`build-projects.js` parses the module and technique id spaces **out of
`index.html`**, so it validates against ids the app can really mark complete.
Do not reintroduce a second copy of that data — that drift is
`LESSONS-LEARNED.md` entry 16.

---

## Rules not to regress

- **No free-text questions.** There is no text-entry UI; `fill_in_the_blank` and
  `short_answer` are converted to multiple choice at build time.
- **Never markdown-parse quiz text.** It goes through `quizText()`, which escapes
  then handles backticks only. Asterisks stay literal — `*args`, `**kwargs` and
  `COUNT(*)` appear in the content.
- **Code is lifted out of markdown before any other rule runs** (`mdToHtml`).
  Inlining it caused blank lines to split code blocks and `*` in SQL to parse as
  emphasis. The placeholder is a `\u0000` **escape sequence**, never a raw NUL —
  HTML parsers replace raw NUL inside `<script>`.
- **No dialogs for content.** Lessons, quizzes and projects are full pages via
  hash routing. A modal reader previously caused an infinite render loop.
- **Any render that triggers a fetch needs loading *and* error guards**, or it
  self-loops (entry 6).

---

## Deploying

```bash
npx vercel --prod --yes   # production; aliases credit-risk-academy.vercel.app
npx vercel --yes          # preview; SSO-protected, sign in to Vercel to view
```

The Vercel MCP connector drops out often — the CLI is the reliable path. Confirm
`npx vercel whoami` first and never run interactive `vercel link`; use
`scripts/setup-vercel.js`.

**Verify in a browser after deploying, not just that the build succeeded.** Open
a lesson and check its content renders, and answer one quiz question.

---

## Rolling back

**Know which half you are in before you delete anything.** Git covers only what
lives inside this repo. `_scratch/` and `_archive/` are above it and untracked —
no tag, reset or checkout will bring them back.

```bash
git ls-files <path>        # empty output = untracked = no undo. Back it up first.
```

Tracked files — restore from the rollback tag:

```bash
git restore --source=pre-cleanup-2026-08-07 -- <path>   # one file back
git reset --hard pre-cleanup-2026-08-07                 # whole repo back
```

Untracked areas — restore from the backup taken before the cleanup:

```bash
# C:\Projects\Academy-backup\untracked-2026-08-07.zip  (41 files: _scratch + _archive)
```

Before any destructive pass: tag the last known-good commit, zip anything
untracked to a location **outside** the project, and verify the zip by reading it
back (count files in the archive against files on disk). See LESSONS-LEARNED
entry 19.

---

## Known gaps

- **Business Analysis has no checkpoint projects.** Credit Risk has 13 and Data
  Validation 10; BA has none, because it declares no `projPrefix`. The Study Plan
  works around this by blocking BA on BABOK chapters instead. Giving BA its own
  checkpoints is agreed future work — it needs briefs written against the 10
  chapters and a `projPrefix` added to its registry entry, after which
  `build-projects.js` will enforce coverage for it like the other two tracks.
- **Progress is browser-local.** Completion state lives in `localStorage` under
  `crAcademy_v1`. Nothing syncs across devices, and clearing site data wipes it.
  This is the largest open item.
- **The coverage audit reasons over source, not runtime.** It cannot catch the
  app's rendering logic changing so that ids become uncompletable without the
  ids themselves changing. Closing that properly needs a headless harness this
  single-file app does not have.
- **The Vercel project is now named `analyst-path`, but the live URL is still
  `credit-risk-academy.vercel.app`.** Renaming the project did not move the
  `.vercel.app` domain: the old one is registered as the project's *production
  domain* in project settings, which is what exempts it from Deployment
  Protection. `analyst-path.vercel.app` exists and is aliased to the current
  production deployment, but returns a `302` to Vercel SSO because it is only an
  alias, not the production domain.

  **To finish the switch** (dashboard only — the CLI does not expose it):
  Project → Settings → Domains → add `analyst-path.vercel.app` and set it as the
  production domain, then remove `credit-risk-academy.vercel.app`.

  **Before doing that, export your progress from `#backup` on the old URL and
  re-import it on the new one.** `localStorage` is per-origin, so a domain change
  reads as zero completed lessons and a zero streak until you restore.

---

## Working with Codex

Codex is the standing reviewer. `LESSONS-LEARNED.md` has a section on how to
brief it — the short version: hand over the evidence and reproduction alongside
the diff, state the constraints it cannot infer from code, and ask it to check
the *diagnosis* rather than the style. Its reviews found six real defects during
the build, several of which had passed every structural check.
