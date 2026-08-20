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

## Work queue — what is actually outstanding

<!-- HANDOFF-PROGRESS:START (machine-generated, see scripts/check-handoff-progress.js) -->

```json
{
  "completedThroughGroup": "G17",
  "completedLessons": 209,
  "completedQuestions": 627,
  "remainingGroups": [
    "G18",
    "G19"
  ],
  "remainingTechniques": 27,
  "remainingExercises": 15,
  "remainingItemsTotal": 42,
  "fullTrackTotalItems": 251,
  "_note": "27 remaining techniques + 15 remaining exercises = 42 remaining. This is NOT the same number as fullTrackTotalItems (251), which is the whole track's techniques+exercises, done or not.",
  "contentThroughPR": 53,
  "contentThroughPRCheckStatus": "verified",
  "sourcesTeacherMcqHash": "sha256:29136b0bebf91a26cb8017e392990e46b64daac1b64418713b4d14dd68ec67ea",
  "lastVerified": "2026-08-20T05:54:26.895Z"
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

**Teacher MCQ warm-ups — Data Validation.** G01–G17 complete once this PR
merges: 209 lessons, 627 questions. **G01–G16 (201 lessons, 603 questions)
are live in production; G17 (8 lessons, 24 questions) is in an open PR,
pending Codex review** — see below. This is the **final group of the
pre-authorized G15–G17 programme** — no G18 work follows automatically.
Remaining after G17 merges: G18–G19 (27 techniques across 2 groups) plus
the 15 worked exercises (`M01-E1` … `M10-E1`) — **42 items left**. The
full Data Validation track is 251 items total (236 techniques + 15
exercises); 42 remaining is not the same number as 251 total — don't
conflate them.

**The G06–G10 batch was built under a Codex-authors/Claude-reviews
role-swap trial**, documented in `docs/teacher-mcq-role-swap-experiment.md`.
**The owner authorized G11 as a reverse-arrangement pilot (Claude authors,
Codex reviews)**, then **pre-authorized the same arrangement as a
programme for G12–G14** (all three: PASS, 0 Codex findings each), and
**after reviewing that outcome, pre-authorized a second programme for
G15–G17** (10+6+8 = 24 lessons, 72 questions), one group per PR — all
three completed. **G17 is the last group in this second programme. The
owner's next decision — G18 onward — has not been made** and must not be
assumed.

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
- `G17-T01.md` (this PR): the data classification VALUES table
  misclassified a National Insurance number as a GDPR Article 9 "special
  category" — Article 9 covers health, biometric, racial/ethnic origin,
  etc., not government identifiers. Corrected to Article 4 (ordinary
  personal data, high fraud/identity-theft sensitivity).
- `G17-T05.md` (this PR): `CAST(ContractEnd AS DATE, 120)` is invalid
  T-SQL — the same CAST-vs-CONVERT confusion as G14-T01, where CAST does
  not take a format-style argument. Fixed to
  `CONVERT(VARCHAR, CAST(ContractEnd AS DATE), 120)`.

`contentThroughPR` in the progress block above tracks the latest merged PR
that changed Teacher MCQ content. The Teacher currently ships (production)
with: all three lesson tracks, a floating panel, a session reset, and an
MCQ-first warm-up covering **G01–G16 of Data Validation** as of the last
production deploy; check the progress block for what's merged vs. what's
still an open PR at any given moment.

| # | Item | Scope | Gated on |
|---|---|---|---|
| 1 | Teacher MCQs — rest of Data Validation | G18–G19 (27 techniques, 2 groups) + 15 worked exercises = 42 items remaining | Owner's decision on G18 onward, after reviewing the G15–G17 programme's outcome |
| 2 | Teacher MCQs — Credit Risk | 47 modules + 7 case studies | nothing |
| 3 | Teacher MCQs — Business Analysis | 42 lessons | nothing |
| 4 | Teacher Phase B — log live-chat overflow | Upstash Redis (free tier, Vercel Marketplace) | security scoping — see below |
| 5 | Teacher Phase C — mining job | Vercel Cron drafting candidate MCQs for review | Phase B |
| 6 | Enterprise Architecture track | 6 chapters × 3 lessons + quiz bank | nothing |

Items 2, 3 and 6 are **content only** — no infrastructure, no new data
surface, following patterns already shipped and reviewed. They are not
blocked by anything and can proceed immediately. Item 1 is also content-only
but is gated on the owner's explicit G11 workflow decision, not on any
technical dependency.

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

Content-only work (items 1–3, 6) is explicitly **not** gated on any of this.

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

---

## Working with Codex

Codex is the standing reviewer. `LESSONS-LEARNED.md` has a section on how to
brief it — the short version: hand over the evidence and reproduction alongside
the diff, state the constraints it cannot infer from code, and ask it to check
the *diagnosis* rather than the style. Its reviews found six real defects during
the build, several of which had passed every structural check.
