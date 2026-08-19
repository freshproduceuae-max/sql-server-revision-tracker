# Codex PR review workflow — Analyst Academy

**This is the authoritative, Git-tracked copy of this workflow.** It lives
here (not under `_audit/`) so it loads for every future session the same way
`CLAUDE.md` and `LESSONS-LEARNED.md` do. `_audit/codex-pr-reviews/PR-<n>/` is
**raw per-run evidence only** — never a second copy of the procedure. See
`_audit/codex-pr-reviews/README.md` for the pointer back here.

Standing procedure for using Codex as a fresh, independent, write-capable PR
reviewer. Applies to every PR reviewed this way, not just #46 (the pilot).

## 1. Isolation

- One temporary git worktree per review, checked out **detached at the PR's
  exact head SHA**. Never run Codex in Claude's active checkout, and never
  let both agents edit the same working directory.
- Path convention: `C:\Projects\Academy\_worktrees\pr-<number>-codex-review`.

## 2. Audit folder

`C:\Projects\Academy\_audit\codex-pr-reviews\PR-<number>\` holds **raw
per-run evidence only** — nothing in it is authoritative about the
*procedure*; that's this file. Preserved, never deleted:

**Neutral evidence, gathered by Claude via authenticated `gh` *before*
Codex is invoked** (unannotated — no Claude conclusions or suspected fixes
mixed in):

- `pr-metadata.json` — `gh pr view <n> --json number,title,body,baseRefName,baseRefOid,headRefName,headRefOid,author,state`
- `pr.diff` — `gh pr diff <n>` (or `git diff <base>..<head>`)
- `changed-files.txt` — `gh pr view <n> --json files` (path + additions/deletions/changeType only)
- `checks.json` — `gh pr checks <n> --json name,state,link,description` (or `gh pr view --json statusCheckRollup`)

**Produced by/around the Codex run:**

- `prompt.txt` — the exact blind prompt sent
- `output.txt` — Codex's final report (verdict, findings, tests, uncertainties)
- `before-head.txt` — worktree state (`git log -1`, `git status`, `git diff --stat` vs base) at the moment Codex starts
- `codex.patch` — `git diff <head-sha>` inside the worktree *after* the run (empty if Codex made no edits — that is a valid, expected outcome, not a failure to record)
- `tests.txt` — every command Codex actually ran and its real output, extracted from the run transcript
- `manifest.txt` — session/thread ID and **token counts reported separately** per §9 below

## 3. Fresh, independent Codex session

`codex exec --sandbox workspace-write -` (exec mode has no interactive
approval prompt to suppress — `--ask-for-approval` is not a valid flag for
`codex exec`). Keep the existing fixed model/reasoning configuration unless
explicitly authorized to change it. Never `codex exec resume` — every review
starts a new session, no accumulated context from prior reviews.

## 4. Blind, independent, minimally-scoped review

The prompt Codex receives contains **only**:

- repository instructions (`CLAUDE.md`, `LESSONS-LEARNED.md`)
- base and head SHAs
- the PR's stated intended scope (title/body, presented as an unverified
  claim to check, not a conclusion)
- the neutral evidence files from §2 (`pr-metadata.json`, `pr.diff`,
  `changed-files.txt`, `checks.json`)
- required validation commands

It never contains Claude's findings, suspected problems, proposed fixes, or
prior review reports.

**Scope discipline — start narrow, expand only on a concrete dependency.**
Point Codex at the PR diff, the changed files, repository instructions, and
the tests directly relevant to those files first. Only pull in additional
files (e.g. a config a changed file imports, a schema a changed file
validates against) when the diff itself creates a real dependency on them —
not as a precaution. This keeps the review fast and keeps token usage
tied to actual surface area rather than the whole repo.

## 5. What Codex may and must not do

May: inspect the full diff and repo files, run non-destructive tests, find
factual/technical/security/schema/regression/documentation problems, make
minimal directly-relevant fixes **inside its isolated worktree only**.

Must not commit, push, modify the original checkout, update the remote PR,
merge, deploy, start unrelated work, or edit files outside the authorized
PR scope. Teacher-MCQ/G11 content may be reviewed and minimally corrected
only when that content is explicitly within the PR being reviewed and the
owner has authorized the review. The no-G11 restriction applied
specifically to the PR #46 pilot.

## 6. Required final report

`Verdict` (`PASS` / `PASS_WITH_FIXES` / `BLOCK`) → `Findings` (severity order,
exact file/location, supporting evidence) → `Files changed` → `Tests executed
and results` → `Unresolved uncertainties` → token count and session ID.

## 7. Claude's independent review of any Codex edits

After the run, `git diff <head-sha>` inside the worktree becomes
`codex.patch`. **Claude reviews every edit against the repository source of
truth before accepting anything** — a change is never accepted merely
because Codex made it. If Codex proposed a real fix, present: Codex's
finding → Codex's proposed change → Claude's independent assessment →
validation results → exact files that would be updated. **Codex may edit
its isolated worktree; only Claude decides whether a patch reaches the
PR, and nothing reaches the PR without the user's explicit authorization.**

## 8. Disagreements

If Codex and Claude disagree on technical behavior, do not resolve by
majority vote. Verify with executable tests or primary vendor documentation
and record the evidence used.

## 9. Reporting token cost — five fields, never collapsed, never double-counted

Record and report **all five** of these fields separately, both in
`manifest.txt` and in any summary to the user. Never substitute one for
another and never present a subset as if it were the total:

- **total input tokens** — measures everything supplied to the model this
  turn/run, cached or not
- **cached-input tokens** — the reused portion of total input
- **new input = total input − cached input** — the uncached portion of
  total input
- **output tokens**
- **reasoning tokens** — call out explicitly whether the API/tool already
  includes reasoning tokens inside the output-token total for that specific
  tool. **Do not add reasoning tokens on top of output tokens unless you have
  confirmed they are reported as a disjoint figure** — double-counting
  inflates the apparent cost. For `codex exec --json`, `reasoning_output_tokens`
  is a breakdown *within* `output_tokens`, not additional to it.

**New input alone does not represent monetary cost, plan-limit consumption,
context-window use, or overall efficiency** — it is one of five figures, not
a summary of the run. Do not describe it as "the actual cost" or treat it as
the sole number worth comparing. Report all five fields separately every
time.

**Comparing runs:** only compare like-for-like — same model, same
configuration, same extraction method. A new-input figure from one run
compared against a total-input or "tokens used" figure from another is not a
valid comparison even if both numbers are token counts.

**Financial cost, if needed, is a separate calculation**, not a token count:
multiply cached-input tokens by the applicable cached-input rate,
new-input tokens by the applicable uncached-input rate, and output tokens by
the applicable output rate, then sum — and only when those rates are
actually known for the model/tier in use. Do not infer a dollar cost from
token counts alone.

Pilot run (PR #46): 284,952 total input tokens, of which 243,200 were
cached → 41,752 new input tokens, 4,429 output tokens (2,070 of which were
reasoning, already inside that 4,429 — not additional). No per-token
pricing was looked up for this run, so no dollar figure is stated.

**Comparability warning:** the ~41.7k new-input figure for PR #46 is **not
directly comparable** to the "tokens used" figures recorded for the G07–G10
Teacher-MCQ authoring runs (see `docs/teacher-mcq-role-swap-experiment.md`)
unless those older figures were extracted using this same five-field method
— total / cached / new / output / reasoning, with reasoning confirmed
disjoint-or-included. If the G07–G10 figures were recorded as a single
"tokens used" number from the CLI's summary line, that number's cache
composition and reasoning-token treatment are unknown, so a raw comparison
between it and PR #46's new-input figure would compare unlike things. Do not
draw a token-savings or token-cost conclusion across those runs without
re-deriving both sides via this same breakdown first.

## 10. Cleanup

After the review is fully processed (patch saved, Claude's independent
assessment done, user decision recorded), retry worktree cleanup only after
confirming: it is absent from `git worktree list`, its status/diff was
clean, and the deletion target is exactly the review worktree path for that
PR. If Windows still holds a file lock, leave the folder in place and
record it for later retry — never force-delete past a lock.

---

## Pilot run — PR #46

First run of this workflow. Findings (recorded at the time; this document's
later revision folds the lessons back into §2 and §4 above):

- Reviewed the checker-design fix for the self-referential `latestMergedPR`
  loop. Codex verdict: **PASS**, zero findings, zero files changed.
- Codex's `gh` was unauthenticated inside its isolated sandbox and could not
  independently query live PR data — Claude's already-authenticated `gh`
  session closed that gap with real data (PR #44's merge commit, PR #45's
  file list) rather than re-reasoning about it.
- Token usage (see §9 for the required breakdown): 284,952 total input
  (243,200 cached → ~41,752 new input), 4,429 output tokens (2,070 of which
  were reasoning, included within that 4,429).
- This first run predates §2's neutral-evidence-files step (`pr-metadata.json`
  etc.) and §4's narrow-scope-first framing — the prompt handed Codex the
  full repo context up front rather than PR diff + changed files first. That
  gap is exactly what §§2–4 correct for future reviews.
- Worktree cleanup: initial `git worktree remove --force` hit a Windows file
  lock. Left in place, confirmed clean via `git status`/`git diff` before
  retrying. Retried successfully after the PR merged (lock had cleared) —
  removed via plain `rm -rf` once `git worktree list` no longer listed it.
- PR #46 was squash-merged (`d7900c2`) and its branch deleted, per explicit
  authorization. No deploy, no G11 work.
