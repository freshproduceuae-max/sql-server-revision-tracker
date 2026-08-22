# Handoff — Analyst Academy

Everything a new person or agent needs to take this over. Read this first, then
`CLAUDE.md` for the working rules and `LESSONS-LEARNED.md` before debugging
anything.

Live: **https://credit-risk-academy.vercel.app**

---

## What this is

A Duolingo-style learning app with five tracks:

| Track | Content | Where the content lives |
|---|---|---|
| 💼 Credit Risk | 47 modules + 7 case studies | GitHub raw, **separate branch** (see below) |
| 🧪 Data Validation | 236 techniques / 19 groups + 15 exercises | `data-validation-lab/` in this repo |
| 📐 Business Analysis | 42 lessons / 10 chapters | `business-analysis/` in this repo (**generated**) |
| ⚙️ Data Engineering | **All 6 chapters, 36 of 36 approved lessons** | `data-engineering/` in this repo (**generated**) — see "Data Engineering track" below |
| 🎯 Quiz Practice | 2,079 questions, 11 banks | `quiz-bank.json` (generated) |

Tracks are **data-driven**: `TRACKS` in `index.html` drives routing, the nav tabs,
the checkpoint routes and the tab accent. Adding a track is a registry entry plus
its hero/path body — and, if it brings its own content source, a `contentUrl()`
branch and a loader. See `CLAUDE.md` for the full checklist.

Plus **24 checkpoint projects** (13 credit, 10 data validation, 1 data
engineering so far) that unlock only when the lessons they consolidate are
marked complete.

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
| `node scripts/check-handoff-progress.js` | HANDOFF.md's stated progress (completed group, lesson/question counts, remaining scope) disagrees with `sources/teacher-mcq.json`, the built `teacher-mcq.json`, or the real file inventory under `data-validation-lab/methods/` |

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

**This project auto-deploys to production on every push to the default
branch (`claude/confident-volta-l3e55f`) via Vercel's GitHub integration —
confirmed via GitHub's Deployments API (`vercel[bot]` as creator,
`environment: "Production"`, each deployment created 12–16 seconds after
its triggering commit, for every one of the Data Engineering track's six
chapter-merge commits, `b741852` through `290fd62`).** No manual `vercel
deploy`/`vercel --prod` command causes this — the CLI commands below are
a *separate*, optional way to trigger a deployment manually; they are not
the only way production gets updated, and disabling or avoiding them does
**not** prevent a squash-merge to the default branch from deploying.
**"Do not deploy" instructions in this repo's history, before this note
was added, were followed correctly as "do not run a manual deploy
command" — they did not, and could not have, prevented the automatic
deployment that happened anyway on each merge.** Any future "hold before
deploying" instruction must be understood as "hold before merging to the
default branch," not "hold before running a deploy command," unless this
auto-deploy behavior is first disabled (a separate, explicitly authorized
change to the Vercel project's git integration settings — not done as
part of this note).

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
- ~~**The coverage audit reasons over source, not runtime.**~~ **Closed by
  PR #58.** A real, browser-driven Playwright harness now exists
  (`tests/e2e/`) and exercises track navigation, lesson loading, completion,
  Teacher MCQs, Quiz Practice, checkpoints, loading/error states across all
  four content-fetching paths, and mobile viewport — not source-structure
  inspection. See "Headless coverage harness" below for the full design and
  review history. `scripts/build-projects.js`'s source-only id-coverage
  check still exists and still has the limitation described above in
  isolation, but the runtime half of that gap is now covered by the harness.
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

## Work queue — what is actually outstanding

<!-- HANDOFF-PROGRESS:START (machine-generated, see scripts/check-handoff-progress.js) -->

```json
{
  "completedThroughGroup": "G19",
  "completedLessons": 236,
  "completedQuestions": 708,
  "remainingGroups": [],
  "remainingTechniques": 0,
  "remainingExercises": 15,
  "remainingItemsTotal": 15,
  "fullTrackTotalItems": 251,
  "_note": "0 remaining techniques + 15 remaining exercises = 15 remaining. This is NOT the same number as fullTrackTotalItems (251), which is the whole track's techniques+exercises, done or not.",
  "contentThroughPR": 68,
  "contentThroughPRCheckStatus": "verified",
  "sourcesTeacherMcqHash": "sha256:86acdcf8d9e4d84b86f5fbb04f5fda9d1b8c5914ff55cebdaab62b041522e092",
  "lastVerified": "2026-08-22T14:43:46.087Z"
}
```

<!-- HANDOFF-PROGRESS:END -->


**Do not trust the prose below at face value.** Before relying on it, run
`node scripts/check-handoff-progress.js` — it derives the real state from
`sources/teacher-mcq.json`, the built `teacher-mcq.json`, and the actual
`data-validation-lab/methods/` file inventory, and fails loudly if this
document has drifted. This exact section went stale for six merged PRs
(#31 → #44) before anyone caught it — see
`docs/teacher-mcq-role-swap-experiment.md` for the incident and the fix.

**Teacher MCQ warm-ups — Data Validation.** G01–G19 are complete and **live
in production**: 236 lessons, 708 questions — **all Data Validation
techniques (G01–G19) done.** This completed the final pre-authorized
programme (G18–G19) — the owner authorized G18–G19 as the last techniques
programme after reviewing the G12–G14 and G15–G17 outcomes. **The only
remaining Data Validation item is the 15 worked exercises
(`M01-E1` … `M10-E1`), which are not authorized under this or any prior
programme — a separate owner decision, explicitly not yet made. No work on
the worked exercises has started.** The full Data Validation track is 251
items total (236 techniques + 15 exercises); with G01–G19 done, 15
remaining exercises is the entire gap left, not 34.

**This Data Validation techniques content programme is now closed.** The
Business Analysis / Enterprise Architecture agent pack referenced below
(see "Enterprise Architecture track — how this came up") **remains a valid,
reviewed plan and G19's finding reinforces its requirement for blind Codex
review on freshly authored content** — but it is **explicitly parked**.
Do not start Business Analysis content, Enterprise Architecture, the 15
worked exercises, or any other content programme without a new, explicit
owner authorization for that specific programme.

**The G06–G10 batch was built under a Codex-authors/Claude-reviews
role-swap trial**, documented in `docs/teacher-mcq-role-swap-experiment.md`.
**The owner authorized G11 as a reverse-arrangement pilot (Claude authors,
Codex reviews)**, then **pre-authorized programmes for G12–G14 and
G15–G17** (both fully completed: 6/6 PRs PASS, 0 Codex findings each), and
**after reviewing that outcome, pre-authorized a third and final
techniques programme for G18–G19**, one group per PR — now complete:

- **G18 (PR #55): `PASS`, zero Codex findings.**
- **G19 (PR #56): `PASS_WITH_FIXES`.** Codex's blind review caught one
  defect in freshly authored MCQ content — the first Codex finding against
  content from the *current* authoring pass rather than a pre-existing
  source-lesson bug in this reverse-pilot series (G12–G18 inclusive all had
  zero such findings). See the dedicated entry below and
  `LESSONS-LEARNED.md` entry 34 for the full account, including the
  original claim and the correction.

**Pre-existing source-lesson defects found and fixed during these
programmes, all recorded as content defects Claude discovered — not
Claude-authoring or Codex-review errors** (Codex independently validated
each fix, it did not find any of them):
- `G12-T02.md` (PR #49): a CASE branch compared a value to 3x itself
  (always false). Fixed using established repo precedent
  (`AVG(x) OVER () * N`).
- `G13-T06.md` Step 3 (PR #50): nested-set validation used consecutive-
  integer lft/rgt pairs that can never demonstrate real containment by
  construction, plus a dead CTE referencing an undefined column. Rewritten
  to derive genuine lft/rgt values and validate real containment.
- `G14-T01.md` Step 1 (PR #51): `CAST(expr, 1)` is invalid T-SQL syntax —
  would have failed to compile. Fixed to `CAST(expr AS VARCHAR)`.
- `G15-T05.md` (PR #52): the Explanation prose claimed Step 1 used FULL
  OUTER JOIN to catch both missing and unexpected values, but Step 1
  actually uses LEFT JOIN, which only catches missing values one
  direction. Corrected the prose.
- `G16-T04.md` (PR #53): a code comment claimed `FLOOR()` "truncates
  toward zero," which is wrong — FLOOR always rounds toward negative
  infinity. Corrected the comment's wording; the SQL itself was already
  correct.
- `G17-T01.md` (PR #54): the data classification VALUES table
  misclassified a National Insurance number as a GDPR Article 9 "special
  category" — Article 9 covers health, biometric, racial/ethnic origin,
  etc., not government identifiers. Corrected to Article 4 (ordinary
  personal data, high fraud/identity-theft sensitivity).
- `G17-T05.md` (PR #54): `CAST(ContractEnd AS DATE, 120)` is invalid
  T-SQL — the same CAST-vs-CONVERT confusion as G14-T01. Fixed to
  `CONVERT(VARCHAR, CAST(ContractEnd AS DATE), 120)`.
- `G18-T07.md` (PR #55): the SyncPct formula in Step 5 divided
  MatchedCount by `(TotalInSystem1 + System2Only)` — a denominator that
  didn't match the lesson's own documented Expected Output (which showed
  100.0% in a case the buggy formula would have computed as 83.3%).
  Corrected the denominator to `TotalInSystem1` alone, which reproduces
  the documented output exactly.
- G19 (PR #56): no source-lesson defects found across all 19 files
  (`G19-T01.md`–`G19-T19.md`) read before authoring.

**G19 also produced a defect of a different kind — not a pre-existing
source-lesson bug, but an error in freshly authored MCQ content, the first
of this kind in the G12–G19 reverse-pilot run:**
- `sources/teacher-mcq.json`, lesson `G19-T01`, question 2 (PR #56): Claude's
  original question asked why `DATALENGTH()` "can help" detect a
  non-breaking space (`CHAR(160)`) where `LEN()` cannot. That's false —
  `CHAR(160)` is an ordinary 2-byte NVARCHAR character and does not affect
  the `DATALENGTH`/`LEN` ratio. The source lesson's actual claim (`LEN vs
  DATALENGTH for Unicode detection` section of `G19-T01.md`) is that
  `DATALENGTH > 2 * LEN` is a proxy for characters needing *more* than 2
  bytes — supplementary Unicode, BOM markers — a different claim entirely.
  **Codex's blind review independently found this**; Claude independently
  verified it against the source lesson before rewriting the question to
  test the documented `DATALENGTH > 2*LEN` proxy accurately. Full evidence
  preserved in `_audit/teacher-mcq-role-swap/G19-reverse-pilot/`
  (`prompt.txt`, `last-message.txt`, `manifest.txt`, `codex.patch`). See
  `LESSONS-LEARNED.md` entry 34 for the full write-up.

**Token telemetry gap for the G19 Codex review — recorded as missing, not
estimated:** the G19 review ran through the MCP `codex` tool rather than
the `codex exec --json` CLI pattern used for G12–G18, and the MCP tool's
result did not surface the five-field token breakdown (total input, cached
input, output, reasoning) that the CLI invocation gave for every prior
group. This is a genuine gap in that one figure for G19, not a number that
should be inferred or approximated from other groups' figures.

`contentThroughPR` in the progress block above tracks the latest merged PR
that changed Teacher MCQ content. The Teacher currently ships (production)
with: all three lesson tracks, a floating panel, a session reset, and an
MCQ-first warm-up covering **G01–G19 of Data Validation — all Data
Validation techniques, complete** — as of the last production deploy;
check the progress block for the exact verified state at any given moment.

| # | Item | Scope | Gated on |
|---|---|---|---|
| 1 | Teacher MCQs — rest of Data Validation | 15 worked exercises remaining (all G01–G19 techniques complete and live) | **Parked.** Owner's separate decision — not yet authorized. No work started. |
| 2 | Teacher MCQs — Credit Risk | 47 modules + 7 case studies | nothing technical — **parked**, not authorized to start |
| 3 | Teacher MCQs — Business Analysis | 42 lessons | nothing technical — **parked**, not authorized to start |
| 4 | Teacher Phase B — log live-chat overflow | Upstash Redis (free tier, Vercel Marketplace) | security scoping — see below |
| 5 | Teacher Phase C — mining job | Vercel Cron drafting candidate MCQs for review | Phase B |
| 6 | Enterprise Architecture track | 6 chapters × 3 lessons + quiz bank | nothing technical — **parked**, plan remains valid, not authorized to start. **One unauthorized generation attempt was made and rejected — see "Enterprise Architecture — rejected unauthorized run" below.** |
| 7 | Data Engineering track — final MCQ-set acceptance review, deployment | Batch 1 (Chapters 1-3, 18 lessons, 70 questions) and Batch 2 (Chapters 4-6, 18 lessons, 69 questions) both built — 36/36 DE lessons now have Teacher MCQs, 272 total lesson entries (236 DV + 36 DE) in `sources/teacher-mcq.json` — see "Data Engineering Teacher MCQs" below. The final MCQ-set acceptance review **not authorized.** The 36-lesson track's own lesson/UI acceptance is already complete and is not reopened by this item. | The final MCQ-set acceptance review needs its own separate authorization, per the owner's stated pattern. **Production deployment is not a separate action to authorize here — see "Deploying" above: every merge to the default branch already auto-deploys to production via Vercel's git integration, with no manual deploy command run.** |

**Items 1, 2, 3 and 6 are explicitly parked as of the G18–G19 programme
close.** None of them are blocked by a technical dependency — each is
content-only content following patterns already shipped and reviewed, and
each could start immediately on authorization — but none should be started
without a new, explicit owner decision naming that specific programme.
The next authorized programme is product/infrastructure work, not more
content; see the executive proposal delivered alongside this update.


### Which phase each item belongs to

Use the owner's own release structure from `AI Course Content/Saqr
Academy11–12.docx` rather than inventing one — see `CLAUDE.md` rule 8. Its four
gates are **Safety** (secrets, auth boundaries, env vars), **Reliability**
(build/lint/tests, core workflows still pass), **UX** (loading, error, empty,
mobile), **Demo** (deployed, release notes, known limitations written down).
Its governing line: *a release is evidence, not a feeling.*

Against that structure, this app has already done the equivalent of Session 1
(shipped and live) and Session 3 (branch/PR/review discipline, enforced). What
is left splits into three genuinely different phases:

| Phase | Items | Nature | Gates that apply |
|---|---|---|---|
| **1 · Content** | 1, 2, 3, 6 | Authoring against a shipped pattern | Reliability; UX for item 6 (new track = new nav surface) |
| **2 · Datastore** | 4 (Phase B) | First server-side persistence this app has ever had | **Safety** primarily, then all four |
| **3 · Automation** | 5 (Phase C) | Scheduled job over Phase 2's data | All four; gated on Phase 2 existing |

Phase 1 does not touch Phase 2's questions and must not be blocked behind them.

### Intake questions for Phase 2 — answer before writing code

These are design constraints, not retrofits. Recorded in full with context in
the security repo's scoping note (path below); listed here so they are not lost:

1. **What exactly gets logged** — full conversation text, or a minimised
   subset? Students can type anything into a free-text box, including things
   about themselves the app never asked for.
2. **Retention period?** Indefinite is a decision, not a default, and it needs
   a deletion mechanism.
3. **Anything linkable to a person?** Including whatever Upstash logs at its
   own layer, which is not under this app's control.
4. **Rate limiting.** `api/tutor.js` is public and unauthenticated with none
   today (`x-app-tag` is explicitly not authentication). Adding a *write* path
   changes that gap's severity — fix before or after?
5. **The new secret** (Redis credential) — same handling as
   `ANTHROPIC_API_KEY`, server-side only, never in client JS?
6. **Failure behaviour.** A slow or sleeping free-tier Redis must never block
   or degrade the student's reply; a failed write should be silently skipped.

### The security framework, and what it does and does not gate

The owner maintains a formal security assessment framework at
`C:\Projects\Security for AI\System Implementation Security` — a 725-item
evidence-driven Go/No-Go register (NIST SP 800-53/800-61/800-218/800-204D,
OWASP ASVS 5.0, SOC operations, incident response, supplier due diligence).

**It applies to Phase B only, not to the whole app and not to content work.**
That scoping decision, its reasoning, the open questions that must be answered
before Phase B code is written, and the applicability estimate are recorded in:

```text
C:\Projects\Security for AI\System Implementation Security\Scratchpad\analyst-academy-phase-b-scope.md
```

Read that file before touching Phase B. The short version: Phase B is the first
time this app persists user-typed content server-side, which makes it the first
real new data surface — so it gets a scoped formal assessment (scope →
applicability → implementation → evidence → decision, per that repo's
`AI-USAGE-GUIDE.md`), done **before** the code is written, not after. A rough
estimate suggests only ~35–50 of the 725 items are even plausibly applicable to
a no-login, no-PII, single-serverless-function app — but that estimate is a
planning input, not an assessment result, and each criterion still needs a real
documented rationale.

Content-only work (items 1–3, 6, 7) is explicitly **not** gated on any of this.

### Data Engineering track — all 6 chapters built, 36/36 lessons

Same origin story pattern as Enterprise Architecture: the owner pasted a
real job posting (GSSTech Group, "Sr. Data Engineer - PySpark, Python &
Cloudera (CDP)", Dubai, banking/transaction-banking domain) and asked
whether the app already covered it. It did not — a gap-check found only
one incidental mention of "PySpark"/"Cloudera" anywhere in the repo, in
the SQL/Power BI quiz bank, no real coverage.

**Full curriculum: `docs/data-engineering-curriculum-proposal.md`** — 36
lessons / 6 chapters / 6 checkpoints, independently reviewed by Codex
(`PASS_WITH_FIXES`, all findings applied and marked inline), approved by
the owner as the final target. **All 6 chapters now built and merged:
Chapter 1 (6 lessons, `P-DE-01`), Chapter 2 (6 lessons, `P-DE-02`),
Chapter 3 (6 lessons, `P-DE-03`), Chapter 4 (6 lessons, `P-DE-04`),
Chapter 5 (6 lessons, `P-DE-05`) and Chapter 6 (6 lessons, `P-DE-06`) —
each its own separate, explicit authorization, per the owner's stated
chapter-by-chapter approach.** This completes the 36-lesson AUTHORING
phase only, per the owner's explicit instruction closing Chapter 6 —
**it does not itself authorize Teacher MCQs for this track or final
whole-track acceptance,** each of which needs its own separate
authorization before any further content work happens — see the work
queue table above (item 7). **Production deployment is a distinct case:
see "Deploying" above — every one of the six chapters' merges already
auto-deployed to production via Vercel's git integration, confirmed
against GitHub's Deployments API. No "authorize deployment" step exists
to withhold; each merge already updated the live site.**

**Chapter 6 — Production Engineering: Orchestration, CI/CD, Containers,
ML Data, Operations.** Multi-stage Spark orchestration (an Airflow DAG's
per-task tracked state, independent re-runnability and explicit
dependency declaration, explicitly distinguished from Spark's own,
unchanged execution engine — orchestration is not execution), CI/CD for
data pipelines (a data-contract row-count validation stage added
specifically because "unit tests + build + deploy all green" verifies
deployment mechanics, not data correctness — a silently-wrong join that
drops rows passes all three original checks and needs a distinct,
measured data-level gate to catch), containerizing DE workloads (four
independently-fixed container-security findings — unpinned dependencies,
a baked-in secret, root execution, no vulnerability scanning — each its
own control, none subsuming the others), Kubernetes for data platforms
(Docker packaging, Kubernetes pod scheduling, and Spark's own
driver/executor execution treated as three distinct layers, with an
explicit caveat that Spark-on-Kubernetes tooling specifics have moved
quickly and should be verified against the actual cluster's current
versions rather than assumed universal), preparing datasets for machine
learning (a point-in-time-correctness fix for a leaky "last 30 days
relative to today" feature — explicitly scoped to reproducible feature
preparation, feature lineage and leakage prevention, not model-building
technique, per the chapter's guardrail), and pipeline resilience/
recovery/on-call support (a written runbook's retry policy, backfill
decision tree, Iceberg-snapshot-based rollback plan, and incident-
communication plan, explicitly built by reusing Chapter 1/3/5's own
already-established mechanisms rather than inventing new ones). Grounded
against fetched, current documentation: Airflow's idempotency/backfill/
retry semantics, and Spark-on-Kubernetes' driver-creates-executor-pods
architecture (noting the newer official Spark Kubernetes Operator and
YuniKorn scheduler as 2026-current developments the lesson flags rather
than assumes as the only current tooling). Checkpoint `P-DE-06` is one
transaction-banking-adjacent scenario (finalizing the settlement
pipeline followed since Chapter 3 for production) exercising all six
Chapter 6 skills together, doubling as the chapter's practical exercise,
reusing the exact same `loadDeChaptersFromApp()`/`deLessonIds()`/
`renderDe()` infrastructure every prior chapter already built — no new
build tooling was needed for Chapter 6, only additive data (one more
`DE_CHAPTERS` entry, one more checkpoint definition in
`build-projects.js`'s `DE` array, now complete at 6/6).

**Chapter 5 — Data Quality, Governance, Security, Observability and Spark
Optimization.** Data quality gates at Spark scale (quarantine-plus-
threshold enforcement, built explicitly on Data Validation's existing
completeness-check detection logic from G01 rather than re-deriving it —
the lesson brief states directly which DV group's logic it reuses and
what a distributed pipeline needs beyond it: an enforcement point, a
quarantine destination, a measured-threshold fail/continue decision),
data governance and lineage on CDP (Apache Atlas and Apache Ranger
treated as two distinct components — Atlas for lineage/classification
captured from real pipeline execution via a Spark hook, Ranger for
tag-driven access-policy enforcement — rather than one undifferentiated
"SDX governance" feature), security (authentication via Kerberos,
authorization via Ranger, encryption at rest, encryption in transit, and
column masking treated as five separately verified controls, specifically
correcting a "Kerberos, so it's secure" category error), pipeline
observability (an SLA-risk alert, driven by stage-duration baselines and
projected completion time, explicitly distinguished from a crash-only
alert that structurally cannot detect a late-but-successful run),
debugging failed Spark jobs (Spark UI task-duration-distribution evidence
used to distinguish skew, insufficient parallelism, and genuinely larger
data volume as three different causes with three different fixes, versus
a blind restart that cannot fix any of them), and cost/performance
optimization (a measured predicate-pushdown and shuffle-volume diagnosis,
using the physical query plan and Spark UI shuffle metrics, distinguishing
a compute-capacity problem from an unnecessary-data-volume problem rather
than assuming "add executors" is always the right lever). Every claim in
this chapter is tied to a specific, checkable piece of evidence (a Spark
UI metric, a physical-plan entry, a measured defect-rate percentage, a
named control) rather than a bare "optimized"/"secure"/"governed" adjective
— per the owner's explicit guardrail for this chapter. Grounded against
fetched, current documentation: Spark UI's Stages/Tasks views and
task-duration-distribution skew diagnosis; Cloudera SDX's Ranger
(authorization, including tag-driven policies keyed to Atlas
classifications) and Atlas (lineage, metadata, classification) as
distinct components, plus TLS-by-default among SDX cluster-internal
services. Checkpoint `P-DE-05` is one transaction-banking-adjacent
scenario (a settlement pipeline with all six of the chapter's problems
occurring together) exercising all six Chapter 5 skills, doubling as the
chapter's practical exercise, reusing the exact same
`loadDeChaptersFromApp()`/`deLessonIds()`/`renderDe()` infrastructure
Chapters 1–4 already built — no new build tooling was needed for Chapter 5,
only additive data (one more `DE_CHAPTERS` entry, one more checkpoint
definition in `build-projects.js`'s `DE` array).

**Chapter 4 — Hadoop Ecosystem and Cloudera Data Platform.** HDFS vs.
Apache Ozone (diagnosed by which specific resource — NameNode metadata
memory, scaling with file count not byte volume — a workload actually
strains, not a blanket "move everything to the newer store" framing),
Hive vs. Impala (engine choice driven by each engine's real execution
model — Hive's job-oriented batch model vs. Impala's always-on MPP
daemons — not a "one engine is simpler to operate" default), YARN
capacity-scheduler queue design (guaranteed floors via matched
capacity/maximum-capacity, explicit preemption, as the actual enforcement
mechanism a single undifferentiated queue cannot provide), CDP
architecture (explicitly distinguishing CDP Private Cloud Base's
Cloudera-Manager-centric classic operations, still a real, current model
many enterprise estates run, from CDP Private Cloud's OpenShift/Kubernetes-based containerized
services — deliberately correcting an overstated "CDP is Kubernetes-
native" framing rather than presenting either model as having replaced
the other), Apache Iceberg on CDP (HMS partition-tracking pressure
diagnosed as an Iceberg-HiveCatalog-integration artifact, not an
inherent Hive cost, plus snapshot-based time travel needing no separate
backup table), and Kafka (partition key-skew diagnosed as the cause of
lopsided consumer lag — not a topic-wide load-balancing failure — and
replay via a second consumer group's independently-tracked offsets,
touching nothing in the live group's state). Grounded against fetched,
current documentation: Cloudera's selection of Red Hat OpenShift as CDP
Private Cloud's container platform, Apache Ozone's architecture as a
distributed key-value/object store versus HDFS's single-NameNode-
namespace model, Iceberg's HiveCatalog default and its effect on HMS
partition-metadata pressure in Cloudera Data Warehouse, and YARN's
capacity-scheduler queue/preemption mechanism versus Kubernetes-style
per-pod resource requests/limits. Checkpoint `P-DE-04` is one
transaction-banking-adjacent scenario (a mixed HDFS/Ozone, YARN and Kafka
estate showing four simultaneous, unrelated-looking symptoms) exercising
all six Chapter 4 skills together, doubling as the chapter's practical
exercise, reusing the exact same `loadDeChaptersFromApp()`/
`deLessonIds()`/`renderDe()` infrastructure Chapters 1–3 already built —
no new build tooling was needed for Chapter 4, only additive data (one
more `DE_CHAPTERS` entry, one more checkpoint definition in
`build-projects.js`'s `DE` array).

**Chapter 3 — Enterprise ETL/ELT, Ingestion and Data Modelling.** Batch
vs. streaming ingestion pattern selection (driven by real event cadence
and consumer latency requirements, not a platform-wide default),
idempotent/re-runnable pipeline design (MERGE-on-natural-key and
`replaceWhere` partition overwrite as two distinct idempotent-write
patterns, chosen against what happens if a job runs twice for the same
input), schema evolution and contract management (Avro `aliases` for safe
renames, Iceberg's column-ID-based tracking for metadata-only schema
changes), Slowly Changing Dimensions at scale (a distributed SCD2 MERGE
that explicitly enforces the same non-overlapping/gapless/exactly-one-
current-row invariants Data Validation G14 validates for, addressing two
failure modes — out-of-order same-batch concurrent changes, and unpruned
MERGE scan cost — that a single-node implementation never has to contend
with), data lake vs. warehouse vs. lakehouse (Iceberg's snapshot-based
atomic-commit mechanism explained concretely, not as a generic "ACID for
lakes" claim, plus an explicit statement of when a traditional warehouse
is still the better choice), and metadata-driven ingestion frameworks
(a config-driven design that onboards a new source as a reviewed config
entry rather than a hand-copied script, closing the specific inconsistency
the chapter's own scenario opens with — four hand-copied scripts already
disagreeing on missing-source handling). Grounded against fetched, current
documentation: Apache Iceberg's schema-evolution guarantees (column-ID
tracking, add/drop/rename as independent, side-effect-free metadata
operations) and Spark Structured Streaming's exactly-once semantics
(replayable sources plus idempotent sinks plus checkpointing, jointly —
not any one of the three alone). Checkpoint `P-DE-03` is one transaction-
banking scenario (an idempotent SCD2 customer pipeline) exercising all six
Chapter 3 skills together, doubling as the chapter's practical exercise,
reusing the exact same `loadDeChaptersFromApp()`/`deLessonIds()`/
`renderDe()` infrastructure Chapters 1–2 already built — no new build
tooling was needed for Chapter 3, only additive data (one more
`DE_CHAPTERS` entry, one more checkpoint definition in `build-projects.js`'s
`DE` array).

**Chapter 2 — PySpark and Distributed Data Processing.** Lazy evaluation
and the transformation/action split, DataFrames/Spark SQL and explicit
schema enforcement, partitioning/shuffle/data skew (salting and AQE's
built-in skew-join handling), join strategies (broadcast vs sort-merge),
Structured Streaming fundamentals (watermarking, event vs processing time),
and performance tuning (caching, `StorageLevel`, serialization,
executor-sizing reasoning). Grounded against fetched, current Spark
4.x/PySpark 4.2.0 documented behavior, not assumed from training data —
specifically: AQE default-enabled since Spark 3.2 with automatic
skew-join splitting and `coalescePartitions`, `autoBroadcastJoinThreshold`
default 10 MiB, Kryo serializer **not** Spark's default (requires class
registration), and DataFrame `.cache()`'s `MEMORY_AND_DISK` default being
distinct from an RDD's `.cache()` `MEMORY_ONLY` default — a real,
documented difference the lesson states explicitly rather than treating
the two APIs as identical. Checkpoint `P-DE-02` is one transaction-banking
scenario exercising all six Chapter 2 skills together, doubling as the
chapter's practical exercise, reusing the exact same
`loadDeChaptersFromApp()`/`deLessonIds()`/`renderDe()` infrastructure
Chapter 1 already built — no new build tooling was needed for Chapter 2,
only additive data (one more `DE_CHAPTERS` entry, one more checkpoint
definition in `build-projects.js`'s `DE` array).

**What Phase 1 (Chapter 1) shipped the actual infrastructure:**

**What Phase 1 actually shipped:**
- `sources/data-engineering.json` — Chapter 1 source (only DE01 populated;
  adding DE02–DE06 later is additive to this file, not a schema change)
- `scripts/build-de-lessons.js` — clone of `build-ba-lessons.js`'s
  validate-in-memory-before-writing discipline, adapted for lessons that
  carry a solution code block (Python/PySpark/SQL) and expected output,
  matching Data Validation's rigor rather than BA's prose-only shape
- `DE_CHAPTERS` in `index.html` — a compiled-in chapter/lesson registry,
  **not** a runtime-fetched `index.json` like BA. Deliberate: this track
  owns checkpoints (`projPrefix:'P-DE-'`), and Data Validation already
  proves that combination (static chapter list + checkpoints) works, while
  BA's dynamic-index pattern exists specifically for a track with no
  checkpoints. Content markdown is still same-origin (`./data-engineering/`),
  not GitHub raw — this is a brand-new track with no legacy cross-branch
  content to match, and same-origin avoids LESSONS-LEARNED entry 1's class
  of bug entirely.
- `scripts/build-projects.js` extended with a `loadDeChaptersFromApp()`
  loader (mirrors `loadDvGroupsFromApp()`) and one checkpoint, `P-DE-01`,
  covering all 6 DE01 lessons in a single transaction-banking scenario that
  exercises every Chapter 1 skill together. Coverage-audit failure mode is
  identical to DV/Credit: every chapter must be covered by exactly one
  checkpoint, checked against the app's real id space, not a hand-maintained
  copy of it.
- `vercel.json` — `data-engineering/**` builds entry (without it the SPA
  catch-all would silently serve `index.html` for every lesson — entry 13).
- Headless coverage harness (`tests/e2e/`) extended: the 5th tab in
  `nav.spec.js`, a same-origin lesson-load-and-complete case in
  `lesson-loading.spec.js` (including a check that the Solution Code
  fence actually rendered as `<pre><code>`, not raw ```` ```python ```` text),
  and two checkpoint-unlock cases in `checkpoints.spec.js` (locked when
  incomplete, unlocks and mark-done works when all 6 lessons are complete).

**Explicit, load-bearing scope honesty (per owner instruction):** completing
all 6 chapters is the full 36-lesson curriculum's LESSON CONTENT for a
foundation, the technical core of distributed processing, enterprise
ingestion/pipeline-design discipline, Hadoop-ecosystem/CDP platform
literacy, quality/governance/security/observability/cost-optimization
discipline, and production-orchestration/CI-CD/containerization/ML-data-
prep/resilience discipline — **it is still not, by itself, equivalent to
job-readiness for the senior PySpark/Cloudera role this curriculum was
scoped from, and completing it does not itself constitute final
whole-track acceptance.** The track's own hero copy and Chapter 1's final
lesson both state the job-readiness caveat directly. Separately, per the
owner's explicit instruction closing Chapter 6: finishing the 36-lesson
authoring phase does not authorize Teacher MCQs for this track and does
not constitute final whole-track acceptance — each remains its own
required, separate authorization, tracked in the work queue table above
(item 7). **Production deployment is not part of that list of things to
separately authorize: see "Deploying" above — every chapter merge already
auto-deployed to production via Vercel's git integration (confirmed
against GitHub's Deployments API for all six chapter-merge commits), with
no manual deploy command ever run.**

**Data Engineering-specific note not covered by the Chapter 1 harness
bullet above:** Chapters 2 through 6's lessons use the identical
same-origin lesson-loading code path Chapter 1's harness test already
exercises (`contentUrl()` → `loadLesson()`, unchanged since Phase 1), so
no new harness spec cases were added for any of them specifically. The
existing 18-test suite (including DE01-T01's lesson-loading case) was
re-run against the actual Chapter 6 build and passed — see PR history for
this chapter's Codex review record rather than treating this note as that
verification itself.

### Data Engineering Teacher MCQs — Batches 1 and 2 built (all 36 lessons)

18 lessons (DE01-T01 through DE03-T06), 70 questions (3-5 per lesson,
scaled to complexity), merged into `sources/teacher-mcq.json` alongside
the existing 236 Data Validation lessons — 254 lessons / 778 questions
total in that file now. Every question tests reasoning, debugging,
architecture trade-offs, operational consequences or a specific
misconception the source lesson calls out — not wording recall — and
every correct answer and distractor is grounded in that lesson's actual
`explanation`/`scenario` text in `sources/data-engineering.json`,
independently blind-Codex-reviewed against those source lessons.

**No new integration code was needed.** The Teacher panel
(`renderTeacherPanel()`, `teacherMcqEntry()`) already looks up
`S.teacherMcq.lessons[lessonId]` generically for whatever lesson is open —
it was built this way for Data Validation and never assumed a specific
track, so Data Engineering's MCQs work through the exact same code path
with zero `index.html` changes. This is additive content only.

**A real, narrow pre-existing bug surfaced and was fixed as part of this
batch:** `scripts/check-handoff-progress.js`'s `completedLessons` counted
every id in `teacher-mcq.json` with no track filter, which happened to
equal "every DV technique with an MCQ" only because the file had never
held a second track's ids before. Adding DE01-DE03's 18 ids broke that
coincidence and the script's own internal arithmetic self-check correctly
failed loudly. Fixed by scoping `completedLessons`/`completedQuestions` to
`G\d{2}-T\d{2}`-matching ids specifically, since this progress block
tracks Data Validation's G01-G19 rollout, not the union of every track's
Teacher MCQ content sharing the same file. See LESSONS-LEARNED entry 35.

### Batch 2 (Chapters 4-6) built

18 lessons (DE04-T01 through DE06-T06), 69 questions (3-5 per lesson,
scaled to complexity, extra scrutiny given to CDP deployment models,
YARN, Iceberg, Kafka, Ranger/Atlas, Spark optimization, orchestration,
CI/CD, containers, Kubernetes, ML-data leakage and operational recovery
per the owner's specific authorization). Same grounding discipline as
Batch 1: every correct answer, distractor and feedback statement is
grounded in that lesson's actual `explanation`/`scenario` text, and
independently blind-Codex-reviewed against those source lessons. No
accepted lesson content was altered to fit a question — see "Residual
risks" in the Batch 2 PR if a lesson defect was ever suspected during
authoring (none was).

**With Batch 2 merged, `sources/teacher-mcq.json` now contains 272 lesson
entries (236 Data Validation + 36 Data Engineering, all 6 chapters) and
847 questions (708 DV + 139 DE), per the built file's own count — not an
estimate.** No DV content was reopened or modified merging this batch;
the diff to `sources/teacher-mcq.json` is purely additive (verified via
`git diff` showing zero changed lines inside any `G\d{2}-T\d{2}` entry).

**Not authorized, not built:** the final acceptance review for the
complete Data Engineering Teacher MCQ set — see the work queue table
above (item 7). **This is a review of the 36-lesson track's Teacher MCQ
content specifically, not a second lesson-track acceptance** — the
36-lesson track's own lesson/UI acceptance is already complete (see "all
6 chapters built, 36/36 lessons" above) and is not reopened by this.
Full-file schema/regression validation (build script, id-set checks,
Playwright suite) will still run across the whole file at that point, but
accepted Data Validation MCQ content is not reopened for substantive
review — only Data Engineering's content (now complete, all 36 lessons)
needs to be covered by that eventual review.

### Enterprise Architecture track — how this came up

The owner pasted a real job posting — "Enterprise Architect · AI & Digital
Platforms" (Michael Page, UAE) — and asked whether any course content already
covers it. Answer at the time: partial overlap only, via the existing AI
Supercourse quiz bank (LLM/RAG/Agentic/MCP/A2A) and the Business Analysis
track's requirements-traceability lessons; nothing in the app covers multi-cloud
strategy, enterprise architecture governance, MLOps at scale, or
microservices/event-driven design as disciplines. `CURRICULUM.md` (a personal,
non-deployed doc) has an Azure-only data-engineering module, which doesn't
close the gap either.

Separately in the same session, the owner pointed at a real folder — now at
`C:\Projects\Security for AI\System Implementation Security` (originally
`Wisdom for AI\…`; both paths hold the same package) — containing a
50-item enterprise Go/No-Go security-control register (built from NIST
SP 800-53/800-61/800-218/800-204D and OWASP ASVS 5.0). That folder is a
**personal security-assessment framework, not course source material** — do
not lift its specific controls or wording into lesson content. Its only
relevance here is that it independently confirmed the "governance register /
architecture decision gates" *concept* that Chapter 1 below teaches generically.

### Decision made (owner approved this exact shape — do not re-litigate)

Build a new track, **Enterprise Architecture** (registry id `ea`), matching the
Business Analysis pattern for lesson pages (full pages, generated from a JSON
source, original writing) **plus** a Saqr-Academy-style quiz bank merged into
Quiz Practice. Not a quiz-only course — the owner explicitly chose "full lesson
pages + quizzes" over "quiz-bank only" when asked.

**6 chapters × 3 lessons = 18 lessons**, one quiz set per chapter (~5–6
questions each, Saqr Academy shape):

1. **Governance & Target-State Design** — architecture decision records, review
   boards, standards/guardrails registers
2. **Multi-Cloud & Hybrid Platform Strategy** — AWS/Azure/GCP decision
   framework, IaaS/PaaS/SaaS tradeoffs, multi-region design
3. **APIs, Microservices & Event-Driven Architecture** — service boundaries,
   sync vs async, event streaming, API gateway patterns
4. **AI/ML & Data Platform Architecture at Scale** — MLOps (model lifecycle,
   CI/CD for ML, drift monitoring, feature stores), AI gateway governance —
   builds on top of the existing AI Supercourse content, does not repeat it
5. **DevOps & Release Governance at Enterprise Scale** — CI/CD pipeline
   governance across many teams, environment strategy, deployment gates
6. **Executive Influence & Architecture Communication** — stakeholder mapping,
   translating tradeoffs into business language, leading review boards,
   guiding teams without direct authority (this chapter exists because the
   owner explicitly asked "any gaps like leadership course or mastery in
   communication" when scoping — it is not optional, it was asked for by name)

Each lesson uses the same field shape as Business Analysis lessons:
`title, scenario, question, approach[], outputs[], tools[], pitfall, interview`
— see `sources/business-analysis.json` for the exact shape and
`scripts/build-ba-lessons.js` for how it renders. All lesson prose is original;
nothing is copied from the security-register folder above or any other source.

### Mechanical build checklist (per the "Adding a track" section of `CLAUDE.md`)

Not started — do these in order:

1. **Pre-review the plan with Codex before writing content** — this touches
   routing and content loading, which `CLAUDE.md` rule 2 requires a pre-build
   review for. Not yet done.
2. `sources/enterprise-architecture.json` — 6 chapters × 3 lessons, same shape
   as `sources/business-analysis.json`
3. `scripts/build-ea-lessons.js` — clone of `scripts/build-ba-lessons.js`,
   `EA(\d\d)-T(\d\d)` id pattern, output to `enterprise-architecture/`
4. `sources/quizzes-enterprise-architecture.json` — Saqr Academy shape
   (`quiz_name` + `lessons[]`, each a themed question set), then run it through
   `scripts/build-quiz-bank.js` and `scripts/merge-quiz-banks.js` per the
   "Rebuilding the quiz bank" section above
5. `TRACKS` registry entry in `index.html` (id `ea`, no `projPrefix` — keeping
   this track simple, no checkpoint projects, matching the owner's "simple and
   proper" framing)
6. Hero/path body for `ea` in `renderApp`
7. `contentUrl()` branch for `ea` → `./enterprise-architecture/…` (same-origin,
   like BA — never cross-branch, that is entry 1)
8. A loader + its trigger in `render()`
9. `vercel.json` — add a `builds` entry for `enterprise-architecture/**`, or the
   SPA catch-all serves `index.html` for every lesson silently (entry 13)
10. Build, verify a lesson renders and a quiz question answers correctly in a
    real browser (not just that the build script exits 0 — entry 18), then
    Codex review with the diff **and** that verification evidence, then
    branch + PR per rule 7 — never commit straight to
    `claude/confident-volta-l3e55f`.

### Enterprise Architecture — rejected unauthorized run

On 2026-08-20, the owner independently ran a Codex content-generation agent
pack against this repo, concurrently with an in-progress Claude session,
without stopping to authorize it through the plan above first. The owner
then independently reviewed that run's output and issued a verdict:
**REJECT / QUARANTINE.**

- **The generated EA Teacher MCQ batch — 54 questions across the planned 18
  lessons — was rejected outright** for systemic assessment defects. It is
  quarantined, not merged, not built on, and **not approved for reuse or
  integration in any form.**
- **The 18-lesson EA draft source (`sources/enterprise-architecture.json`)
  is retained only as unreviewed evidence** of what that run produced — not
  as a starting point, not pre-approved content. Any future EA work
  authorized under the plan above starts from a fresh review, not from this
  draft.
- Business Analysis content was not touched by that run — nothing to
  reject or retain there.
- EA track integration (registry entry, hero body, `contentUrl()` branch,
  loader, `vercel.json` builds entry — steps 5–9 above) was never reached;
  still entirely not started.
- **The underlying EA plan itself — the "Decision made" section above — is
  unaffected and remains valid and parked.** The rejection is about this one
  unauthorized run's output quality, not about the plan.

Full evidence — the raw prompt, the complete generation log, byte-verified
copies of every file the run produced, and the disposition of each — is
preserved at
`C:\Projects\Academy\_quarantine\ea-concurrent-run-20260820T074354Z\`
(`MANIFEST.md` there is the authoritative record; this section summarizes
it). **Do not read that content back into any future EA work without an
explicit fresh review** — quarantined means quarantined, not "on hold for
later."

---

## Headless coverage harness

**Merged and live** as of PR #58 (`3bd7a35` on `claude/confident-volta-l3e55f`).
Closes the runtime half of the coverage-audit gap referenced in "Known
gaps" above: `scripts/build-projects.js` only ever reasoned over source, and
could pass while the app's actual rendering logic silently broke without any
id changing. This harness exercises the real, rendered app in a real
browser instead.

**What it covers:** track navigation, lesson loading and completion (one
representative lesson each for Credit Risk, Data Validation, and Business
Analysis — not every lesson, equivalent runtime coverage), Teacher MCQ
warm-ups, the full Quiz Practice session lifecycle, checkpoints (unlock gate
+ mark-done), loading and error states across all four content-fetching
paths (cross-origin GitHub-raw for Credit Risk/Data Validation, same-origin
for Quiz Practice/Business Analysis/checkpoints — not just the cross-origin
case), and mobile viewport (iPhone 13, real WebKit).

**Tooling:** `@playwright/test` — the first npm dependency this repo has
ever had, owner-approved after a design consultation with Codex. Test files
live under `tests/e2e/`. `scripts/dev-server.js` is a ~60-line
dependency-free static file server used only by the harness (real HTTP,
since the app fetches JSON/markdown at runtime and browsers block that over
`file://`); not used in production, Vercel serves the app there.

**Execution model — sequential by default, on purpose.** `playwright.config.js`
defaults to `workers=1`, `fullyParallel=false`. Given the machine-instability
incident this harness's own development ran into, and that all 15 tests
finish in roughly 15–35 seconds run serially anyway, there is negligible
time benefit to parallelising the everyday local run. Parallel execution
exists only as an explicit opt-in (`STRESS=1 npx playwright test`) for
deliberately stress-testing stability under real concurrent load — **it is
not the default and is not wired into any CI path.** It has a known,
disclosed, non-blocking limitation: under `STRESS=1`, one run out of several
observed a resource-contention timeout flake (4 tests timed out waiting on
load states under heavy parallel CPU load; passed cleanly on retry and in
every other stress run). Do not describe `STRESS=1` as fully stable — it
isn't, and it doesn't need to be for the sequential default to be trustworthy.

**Server lifecycle — direct spawn, not Playwright's built-in `webServer`
config.** `tests/e2e/global-setup.js` spawns `scripts/dev-server.js`
directly (`shell: false`, no intermediary shell process) and hands its exact
PID to `tests/e2e/global-teardown.js`, which kills that PID directly
(`process.kill(pid)` — an unconditional `TerminateProcess` on Windows, no
process-tree walk needed). This replaced Playwright's built-in `webServer`
config after an independent review reproduced the shell-spawned dev-server
process surviving past the test runner's own exit — root cause: `webServer`
spawns its command string through a shell, so the PID Playwright tracked for
its own teardown was the shell's PID, not the actual `node.exe` running
underneath it, and Windows does not automatically kill a child when its
parent shell is killed.

**Route mocking — deterministic release, not a permanent hang.**
`tests/e2e/helpers.js`'s "pending forever" mocks (for asserting loading
spinners) use a controllable deferred promise (`makeDeferred`), explicitly
resolved by `test.afterEach` (`releasePendingRoutes`) — which Playwright
guarantees runs regardless of whether the test passed, failed, or timed out.
An earlier version used a bare never-resolving `Promise` instead; that
removed the dangling-timer risk it was fixing but could still leave an
unresolved Playwright route operation pending during browser/context
teardown, which a second independent review reproduced as a hang. The
current version has no permanent timer and no permanently-unresolved
operation — every pending route is guaranteed to complete before its test
ends.

**Security/correctness fixes from review:** `scripts/dev-server.js`'s path
boundary check originally used `resolved.startsWith(root)`, a raw
string-prefix comparison that would incorrectly admit a sibling directory
sharing a string prefix with the repo root (e.g. `<root>2`); fixed to
require the next character be a path separator, or exact equality. Also
wrapped `decodeURIComponent` in try/catch — a malformed `%`-escape was
throwing uncaught inside the request handler, which would have crashed the
whole server, not just failed one request. `tests/e2e/mobile.spec.js`'s
original mobile-breakpoint assertion (`width > 300`) couldn't actually
distinguish the mobile CSS rule from the desktop rule clamped by
`max-width` (both produce a width comfortably over 300px at the iPhone 13's
390px viewport); replaced with a direct
`getComputedStyle(panel).maxWidth === 'none'` check, which can only be true
under the mobile media query.

**Review history — three independent Codex review rounds, two real
process-lifecycle root causes found across them:**
1. **Design review** (before implementation): approved with two corrections
   (loading/error-states spec needed same-origin coverage, not just
   cross-origin; no `data-testid` additions to `index.html` in this phase).
2. **Round 1** (`BLOCK`): found the path-boundary bug, the
   `decodeURIComponent` crash risk, and the mobile-assertion weakness — all
   three fixed and confirmed resolved in round 2.
3. **Round 2** (`BLOCK`): reproduced a real hang + leaked process 3/3 times
   against the never-resolving-Promise route fix, even after the underlying
   timer was removed — correctly diagnosed by the owner as a different
   mechanism (unresolved operation during context teardown, not a dangling
   timer). Fixed with the deterministic-release pattern above.
4. **Round 3** (fresh session, prior thread expired): reproduced a *second*,
   previously-undiagnosed leak — the shell-spawned `webServer` dev-server
   process itself, unrelated to route handling — using an objective
   process-tree verification tool (`scripts/verify-clean-shutdown.js`,
   committed to the repo) rather than impression. Root-caused and fixed with
   the direct-spawn `global-setup`/`global-teardown` lifecycle. **Final
   verdict: `PASS`**, independently confirmed via 6 process-lifecycle runs
   (3 sequential, 3 stress) with zero attributable leaked processes and zero
   bound-timeout violations, plus the disclosed stress-mode flake recorded
   as a known non-blocking limitation rather than papered over.

Unlike the Teacher MCQ content programme, this PR's review rounds were not
saved to a dedicated `_audit/` folder — the PR #58 commit history and this
section are the record. If a future infrastructure PR follows the same
multi-round Codex review pattern, save its raw prompts and output the same
way `_audit/teacher-mcq-role-swap/<GROUP_ID>/` does for content, rather than
relying on commit messages alone.

---

## Working with Codex

Codex is the standing reviewer. `LESSONS-LEARNED.md` has a section on how to
brief it — the short version: hand over the evidence and reproduction alongside
the diff, state the constraints it cannot infer from code, and ask it to check
the *diagnosis* rather than the style. Its reviews found six real defects during
the build, several of which had passed every structural check.
