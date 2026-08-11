# Lessons Learned — Analyst Academy

Running log of problems solved and what generalises from them. **Append an entry
whenever you fix something non-obvious**, especially when the first hypothesis was
wrong — the wrong turn is usually the valuable part.

Format for each entry: what it looked like → what actually caused it → the fix →
the rule to carry forward.

## Maintaining this file

**Adding to it means revising it too, not only appending.** An append-only log
decays: entries quietly stop describing how the code actually works, and a reader
cannot tell which are current. When later work bears on an existing entry, update
that entry in place with a **"Since this was written"** note saying what changed —
whether the lesson was applied, extended, narrowed, or superseded by a better
answer. If an entry turns out to be wrong, correct it rather than adding a
contradicting one; a stale lessons file is worse than none, which already happened
once with the deploy notes before entry 10 fixed them.

**Cross-reference.** Several entries here are the same failure wearing different
clothes, and that is the most useful thing about them:

- **1, 2, 3, 13** — something returned `200` and looked fine while being wrong.
  Wrong branch, SPA fallback, missing `builds` entry.
- **12, 16, 18** — drift between two representations of the same thing, or a
  guard validating the wrong source.
- **1, 6, 21** — confidently reporting a state that was never true: content
  "unavailable" that existed, a lesson "not found" that had not loaded yet, a
  task "still running" that had already stopped.
- **14, 15, 16, 18** — a fix that was incomplete, or that introduced a worse bug
  than the one it closed.
- **19, 20** — the limits of what git protects. Untracked paths have no undo
  (19); a working tree shared with another session is mutable state nobody owns
  (20); a squash merge makes a fully-shipped branch look unmerged forever (19,
  extended). All are cases where "it's in git" was assumed and was not true.
- **20, 22** — shared mutable state with more than one writer. A working tree
  shared by two sessions (20) and a single `index.html` that only one agent may
  edit at a time (22) are the same constraint at different scales. This is the
  family to check first as more work runs concurrently.

## A portable copy lives outside this repo

On 2026-08-10 the generalisable rules here were distilled into
`C:\Projects\Make an AI Support System\AGENT-LESSONS.md`, and linked from that
repo's root README and its idea-launchpad, teaching-lessons, operating-model and
Small Business Websites templates, so future projects start from what already
went wrong here.

**That copy is hand-written, not generated, so the two can drift.** This file
stays the detailed record — 22 entries with the full symptom, wrong first
hypothesis, root cause and fix. That one is the portable summary. If you correct
something here that appears there, correct it in both. Note also that the other
repo has **no git remote**, so its history exists on one disk only.

When you add an entry, say which family it belongs to. When you can't place it,
that is worth noticing — it may be a genuinely new class of problem.

Entries 19 and 20 were written independently by two sessions working in the same
repo at the same time, and arrived at the same blind spot from opposite ends —
one deleting untracked files, one moving a shared HEAD. That convergence is the
strongest signal in this file about where the next failure will come from.

---

## 1. "Vercel is broken" — it was a git branch that didn't exist

**Looked like:** Every lesson showed "Content unavailable". Multiple sessions
assumed the deployment was at fault and kept redeploying.

**Actually was:** All 54 lesson URLs pointed at the `main` branch of the content
repo. That repo has no `main` branch — the content lives on
`claude/credit-risk-academy`. Every fetch was a 404. The deployment was fine the
whole time.

**Fix:** One `curl` against a content URL revealed the 404 in seconds; corrected
the branch in all URLs.

**Rule:** Before blaming the platform, `curl` the exact URL the app requests. A
platform is guilty far less often than a wrong path. Reproduce the failure at the
smallest possible layer first.

**Since this was written — the root cause is now designed out, not just fixed.**
The deeper problem was never the wrong branch name; it was that content lived on
a *different commit* from the app that referenced it, so the two could drift with
nothing to catch it. Credit Risk and DV both still fetch from GitHub raw on
`claude/credit-risk-academy`, **but they are not equally exposed — see the
correction below.** The Business Analysis
track deliberately does not: its markdown ships in this repo and loads from this
origin (`./business-analysis/…`), so app and content move together and a wrong
path fails at build time rather than silently at runtime.

**Standing rule for new content:** serve it from the same commit as the app. Only
use a cross-branch raw URL when there is a reason that outweighs this entry, and
write the reason down.

**Correction — only ONE track actually depends on that branch.** This entry
lumped Credit Risk and DV together; an audit checked and they are different
cases:

| Track | Fetched from | Files in this repo | Real exposure |
|---|---|---|---|
| Credit Risk | content branch | **none** — 54 URLs, no local copy | genuinely load-bearing |
| Data Validation | content branch | **251 tracked files** under `data-validation-lab/methods/` | fetches its own in-repo files over the network |

`git ls-files data-validation-lab/methods` returns 251 files, including exactly
the paths `DV_BASE` requests. So DV is not exposed to cross-commit drift at all —
the content is right here, on the same commit, merely reached the long way round.
`HANDOFF.md` already described DV as living "in this repo", so this file and that
one disagreed, and this one was wrong.

**What that changes:** the standing rule reads as *one track to migrate*, not
"never touch this branch". DV can be repointed to `./data-validation-lab/methods/`
with a `builds` entry for it in `vercel.json` (entry 13), which would remove a
network hop and a branch dependency for 251 files. **Credit Risk cannot** — it has
no local copy, so `claude/credit-risk-academy` must never be deleted or merged
away until that content is brought into the repo.

See also entries 16 and 20 on drift between representations.

---

## 2. HTTP 200 does not mean it worked

**Looked like:** Four archived files all returned `200` — seemingly still exposed
on the live site.

**Actually was:** All four returned exactly 77,109 bytes — the size of
`index.html`. The SPA catch-all route was serving the app shell for every unknown
path. Nothing was exposed.

**Rule:** Check response *size and content-type*, not just status. Identical byte
counts across unrelated URLs is the tell for a catch-all fallback.

---

## 3. A SPA catch-all swallows real files

**Looked like:** `fetch('./quiz-bank.json')` returned HTML instead of JSON.

**Actually was:** `vercel.json` routed `/(.*)` → `/index.html` with nothing before
it, so genuine files never got served.

**Fix:** Put `{ "handle": "filesystem" }` before the catch-all so real files win,
and add the file to `builds`.

**Rule:** Any SPA rewrite needs a filesystem handler ahead of it. After changing
routing, verify the asset returns its real content-type.

---

## 4. Markdown parser: pull code out before anything else runs

**Looked like:** In a lesson, SQL after a blank line collapsed onto one run-on
line while the code above it rendered fine.

**Actually was:** The parser built `<pre>` blocks early, then kept applying every
other rule to the whole document — including inside that code. Two failures from
one flaw:
- The paragraph splitter cut code blocks at blank lines; the second half no longer
  started with `<pre>`, so it became a paragraph and its newlines were flattened.
- The italic rule matched asterisks inside SQL: `COUNT(*) * 100.0` rendered as
  `COUNT(<em>) </em> 100.0`.

**Scale:** 69 of 70 lesson files containing code were affected; 22 also had
corrupted asterisks. Nobody had noticed the second bug at all.

**Fix:** Lift fenced and inline code into placeholders before any other rule, and
restore them last.

**Rule:** In a regex markdown parser, code must be extracted first. Otherwise
every later rule is a potential corruptor — headings from `#` comments, lists from
`-` lines, emphasis from `*`.

**Known limitation (Codex review, corrected scope).** The fix removes corruption
*inside* code, but the list and paragraph passes still run around it. A fence
nested inside a list item, or an unclosed fence, would still render wrong — the
paragraph pass only preserves a chunk that is *exactly* a placeholder. Measured:
**0 occurrences across 282 files** (276 local + 6 credit lessons), so this is
latent, not live. `scripts/lint-markdown.js` now fails on either pattern so it
stays that way. Do not claim the parser "handles all code" — it handles the cases
this content actually contains.

**Since this was written — the number is stale and the guarantee was overstated.**

The Business Analysis track added 42 lesson files, so the linter now scans **318
local files** (`data-validation-lab projects business-analysis`), still with 0
occurrences. The old figure survived in two places at once — this entry and the
header comment of `lint-markdown.js` itself — which is the same two-copies drift
as entry 16, in documentation rather than code.

**The larger correction: the linter does not cover Credit Risk at all.** It walks
local directories with `fs.readdirSync`, and the 54 Credit Risk lesson files are
not in this repo — they are fetched at runtime from the content branch (entry 1).
So the guard protects the in-repo content only, and just **6 of the 54** credit
files were ever spot-checked. A fence nested inside a list committed to that
branch would ship unlinted and render wrong, with nothing to catch it.

**Rule:** when you write "a guard now prevents this", state exactly what it walks.
A linter that cannot reach half the content is a real guard over a partial
surface, not a guarantee — and the sentence that omits the boundary is the one a
future reader will rely on.

---

## 5. Never write a raw NUL byte into HTML

**Looked like:** Placeholder sentinels worked locally; risk of breaking in the
browser.

**Actually was:** HTML parsers replace raw `U+0000` inside `<script>` with
`U+FFFD`. It happened to still work because both sides were replaced
consistently — fragile luck, not design.

**Rule:** Write sentinels as `\u0000` escape sequences in source, never as literal
NUL bytes. Verify with a byte-level dump; editors and file readers display NUL as
a space and hide the problem.

---

## 6. Re-entrant render froze the browser

**Looked like:** The page hung; browser tooling timed out repeatedly.

**Actually was:** `render()` called `loadLesson()`, which called `render()` again
with no guard — an unbounded loop spawning duplicate fetches.

**Fix:** Guard on loading/error flags before kicking off a load, and add an
explicit error state with a retry action instead of silently re-trying forever.

**Rule:** Any render that can trigger a fetch needs a guard for in-flight *and*
failed states. A missing failure state becomes an infinite loop.

**Since this was written — applied again, and it exposed a second failure
mode the original entry missed.** `loadBaIndex()` follows the pattern
(`!S.baIndex && !S.baLoading && !S.baError`), which is the fifth loader to do so
after lessons, the quiz bank, the project index and project briefs. That the
pattern was already established in four places and still was not applied to the
render side is the point, not a detail. But the guard alone is not sufficient: a deep
link to `#lesson/BA07-T03` on a cold load arrives *before* the chapter index
exists, so the lookup fails and the page renders "Lesson not found" for content
that is present and fine.

That is the same false negative as entry 1 — the app confidently reporting
missing content that was never missing — reached by a different route. The fix is
a third state: not loaded yet is distinct from loaded and absent.

**Extended rule:** a fetch-triggering render needs *three* states, not two —
in-flight, failed, and **not-yet-attempted**. Any lookup against data that loads
asynchronously must distinguish "not there" from "not here yet", or it will lie
about missing content on every deep link.

**And then I broke that rule, in the same session, two files away.** Codex review
caught it before merge. Having written the three-state rule above for the *lesson
deep link*, I wrote the *track page* with two states:

```
if(S.baLoading){ spinner }
if(!S.baIndex){ error }
```

`render()` starts the fetch only *after* `renderApp()` returns, so on a cold load
`baLoading` is still `false` and `baIndex` is still `null` — which lands on the
error branch. The page flashed "chapters unavailable — check your connection"
before the spinner, on a perfectly healthy load. Exactly the false negative this
entry is about, in the code written to obey this entry.

**Why the rule did not save me:** I applied it where I had just been bitten (the
deep link) and not where the same asynchrony existed (the page). The ordering
detail is the trap — `!loading && !data` reads like "failed" and is actually
"nothing has started yet".

**Sharpened rule:** test the *failure branch's condition*, not just its message.
`if(!data)` as an error case is wrong whenever the load is kicked off after
render. Make failed depend on an explicit error flag and nothing else — `if(!data)
{ if(error) show error; show spinner }` — so pending can never be misread as
broken. Grep for `!S.` conditions that render an error and check each one.

**Meta-lesson:** a rule written in this file is not a rule applied in the code.
The gap between the two is the most likely place for the next bug, because
writing it up creates the feeling of having handled it.

**Then the audit found three more, all pre-existing.** Grepping `if(!S.` error
branches as the sharpened rule prescribes turned up the identical two-state
defect in code written long before this session:

| Where | Cold-load symptom |
|---|---|
| `renderQuizSession` | `#quiz/0/0` deep link showed "Quiz bank unavailable" |
| `renderProjTimeline` | `#projects/credit` deep link showed "Checkpoints unavailable" |
| quiz track body | `#track/quiz` flashed "unavailable — check your connection" |

Every one of them told a user with a perfectly good connection to check their
connection. All three now test the error flag explicitly and fall back to
pending. Verified in both directions: five cold paths render a spinner and never
the error, and four genuine failures still render the error with a retry.

**And the sweep still missed a fourth — the grep was too narrow.** An audit of
this very entry found `renderProjectPage` carrying the same defect in a form the
prescribed search could not see:

```
if(S.projLoading||!S.projIndex&&!S.projError) return spinner;   // && binds tighter
if(!p) return "Checkpoint not found";
```

When the index fetch genuinely **failed**, the first condition was false, so it
fell through to *"Checkpoint not found"* — no error text, no retry — and
`render()` will not re-fetch while `projError` is set. The page was permanently
wrong about a checkpoint that exists.

Two reasons the sweep missed it. The false negative is worded **"not found"**,
not "unavailable", so a grep for the error wording skipped it. And the bug lived
in **operator precedence** inside a condition that *looked* three-state, rather
than in a missing branch. Fixed by parenthesising the pending test and adding the
real error branch between pending and not-found.

**Sharpened again:** search for the *symptom class*, not the wording — any branch
reachable after a failed load that tells the user something is missing,
including "not found", "no results", "none yet" and an empty list. And read the
precedence of any `||`/`&&` condition that claims to separate pending from
failed; `a || !b && !c` does not mean what it looks like.

**What this says about the rule:** it was worth more as a *grep* than as a
sentence. The bug is invisible when reading a single branch — `if(!data) show
error` looks obviously correct — and obvious the moment you ask "what is true
before the fetch starts?". When you write a rule here, write the search that
finds its violations, then run it across the whole file rather than only the code
you happen to be touching.

---

## 7. Silent drops hide data-shape variance

**Looked like:** A conversion reported success, but `matching_pairs` fell from 18
to 3.

**Actually was:** The source used two different shapes — `{terms, definitions}`
and a flat `{term: definition}` map. Only the first was handled; 15 were dropped.
It was visible only because the script printed a `dropped` counter.

**Rule:** Always count and print what you skip, then drive it to zero or explain
each one. Never let a transform silently discard input. Assume real-world data has
more than one shape until you've checked.

---

## 8. Schema-valid output can still be low quality

**Looked like:** Free-text questions converted to multiple choice, all
structurally valid.

**Actually was:** Distractors were pulled from the whole quiz, so a prose question
("Power BI connects to various ___") offered `AVERAGEX` — eliminable without any
knowledge. Valid, but worthless as a question.

**Fix:** Bucket answers by shape (prose / word / code) and prefer same-lesson
distractors before quiz-wide ones.

**Rule:** For generated content, validate *usefulness* by eyeballing real samples,
not just structure. Schema checks cannot see a pointless question.

---

## 9. Escaping protected content that parsing would have ruined

**Observation:** Quiz text is escaped rather than markdown-parsed. That is what
keeps `*args`, `**kwargs` and `COUNT(*)` intact across 73 answer choices — the
same asterisks that were corrupting lesson pages.

**Rule:** Do not markdown-parse strings that legitimately contain code punctuation.
If light formatting is wanted, handle backticks only and leave `*` alone.

---

## 10. Deploying: the target matters more than the tool

**Looked like:** Deploys to Vercel failed across several sessions while
`index.html` worked fine locally. All the friction was environmental — `gh` and
`vercel` installed but not picked up on `PATH`, terminals needing a reopen before
a `PATH` change registered, inconsistent Node/npm state on Windows, and no
certainty about which team or project the CLI would actually target. None of it
was a bug in the app; the *delivery mechanism* was failing, not the content.

**First hypothesis — wrong: "the CLI is the point of failure."** A deploy through
the Vercel MCP connector then succeeded, passing file content straight from the
conversation with explicit team and project IDs, `framework: null` and
`target: production` — no PATH, no CLI install, no git remote auth. The
conclusion drawn at the time was that MCP sidesteps local fragility, so the CLI
should be avoided.

**Actually was:** ambiguity about the *deploy target*, not the tool. What made
that call work was supplying the exact org and project IDs — not the transport.
The CLI is just as reliable once the target is pinned, and the MCP connector has
since been disconnected most of the time.

**Fix:** Confirm `npx vercel whoami` is authenticated **first**, pin the target by
writing `.vercel/project.json` with the known org/project IDs rather than running
interactive `vercel link` (`scripts/setup-vercel.js` does this), and use
`--prod --yes` so nothing waits on a prompt. Don't wait on the MCP connector —
treat it as the optional path, not the required one.

**Also corrected:** the production alias `credit-risk-academy.vercel.app` no
longer needs manual promotion — a `--prod` deploy of the pinned project aliases
it automatically.

**Rule:** Verify auth and target before deploying; ambiguity about *where* it
deploys costs more time than the deploy itself. And when swapping tools appears
to fix something, check what actually changed — it is often a parameter you
supplied, not the tool you supplied it through.

---

## 11. Check dependencies before archiving or deleting

**Practice that paid off:** Before archiving `quiz-app/`, checked that no app file
referenced it, that it wasn't publicly served, whether git tracked it, and whether
it was still the source for a generated file (it was — so it had to stay
findable, not be deleted).

**Rule:** Before moving or removing anything: grep for references, check whether
it's a build input, check git, and prefer a reversible move over a delete.

---

## 12. Make builds deterministic so they can be verified

**Practice:** The quiz build uses a seeded PRNG, so identical inputs produce a
byte-identical file. That made it possible to prove the extracted scripts were
correct by rebuilding and diffing against the live artefact.

**Rule:** Avoid `Math.random()`/`Date.now()` in build scripts. Determinism turns
"I think this still works" into a diff.

**Since this was written — three build scripts now hold to this, and it paid off
twice in one session.** `build-projects.js`, the quiz build and
`build-ba-lessons.js` are all deterministic. Two checks that were only possible
because of it:

- Rebuilding `quiz-bank.json` from `sources/` produced a **byte-identical** file
  to the committed one, which proved in seconds that a repo audit had not
  disturbed the generated artefacts. Without determinism that is an afternoon of
  eyeballing diffs.
- Running `build-ba-lessons.js` twice produced identical output across all 42
  lessons, confirming the generator has no hidden ordering or timestamp
  dependency before it was ever committed.

**The rule has a corollary worth stating:** determinism is only useful if you
actually run the rebuild-and-diff. It is cheap, it is fast, and it is the only
thing that distinguishes "the generated files are current" from "the generated
files were current when someone last looked". Do it before claiming a build is
clean. Related: entry 16 on single sources of truth, and entry 18 on guards that
only work in one environment.

---

## Working with Codex

Codex is the standing reviewer/validator for this project. To make that useful:

- **Hand over the diff plus the evidence**, not just the diff: the failing input,
  the reproduction, and what was measured before and after (e.g. "69 of 70 files
  affected → 0"). Review quality tracks the context given.
- **State the constraints it cannot infer** from code alone — for this app: no
  free-text questions, never markdown-parse quiz strings, code must be extracted
  before markdown rules. Those are in `CLAUDE.md`; point at it.
- **Ask it to check the claim, not the code style.** The valuable question is
  "does this actually fix the root cause and is the diagnosis right", since the
  costliest errors here were wrong diagnoses (entries 1 and 10), not bad syntax.
- **Feed corrections back here.** If review shows a lesson in this file is wrong,
  update the entry — a stale lessons file is worse than none, which is exactly
  what happened with the deploy doc before entry 10 corrected it.

---

## 13. The lessons file caught a bug I was about to ship

**Looked like:** Checkpoint project files deployed fine — `index.json`, the briefs
and the CSV all returned `200`.

**Actually was:** All four returned exactly 87,835 bytes of `text/html` — the SPA
fallback again. `vercel.json` lists files under `builds`, and I had added the new
`projects/` folder without adding it there, so nothing under it was ever a build
output. Entries 2 and 3 in this file describe this precisely.

**Fix:** Add `projects/**` and `data-validation-lab/schemas/**` to `builds`.
After redeploy: `application/json` 6,795b, `text/markdown` 2,269b, `text/csv`
3,137b — distinct sizes and correct types.

**Rule:** On Vercel, adding a *new folder* of static assets needs a `builds`
entry, not just a route. And the check that catches it is always the same: compare
sizes and content-types across several URLs. This is now the third time identical
byte counts revealed a fallback — treat it as the first thing to check after any
deploy that adds assets.

**Since this was written — the first time this entry prevented the bug instead of
explaining it.** Adding the Business Analysis track created a fourth static
folder. `business-analysis/**` went into `builds` in the same commit as the
folder, because this entry said to, so there was no broken deploy to diagnose.
That is the return on writing these up.

Two refinements learned from doing it:

- **The `builds` entry is only half of it.** `.vercelignore` can also exclude a
  folder, and an ignored folder fails exactly the same way — SPA fallback, `200`,
  wrong content-type. Check both when adding assets.
- **A `404` on a path that does not exist is not evidence of this bug.** While
  auditing the live site I probed `projects/portfolio.csv` and
  `projects/projects.json`, got HTML back, and briefly took it for a fallback
  failure. Neither file exists — the fallback was behaving correctly. Probe
  filenames you have confirmed on disk, or you will diagnose a bug that is not
  there. This is entry 21's rule in another costume: check the observation before
  trusting the conclusion.

Adding a track is now a documented checklist in `CLAUDE.md` with this step on it.
Entries 2, 3 and this one are the same defect at three different moments; read
them as one lesson.

---

## 14. Codex review: a no-op that hid an unfinished intention

**Codex found:** In `build-quiz-bank.js`, the line meant to reframe converted
`short_answer` prompts was `q.question_text.replace(/^(Explain|Describe|…)/i, (m) => m)`
concatenated with a ternary returning `''` either way — a complete no-op. The code
*looked* like it reframed the prompt; it changed nothing.

**Why it mattered:** those questions became multiple choice, but their text still
said "Provide an example" — an instruction you cannot follow by clicking one of
four options. 104 questions asked for something the format could not accept.

**Fix:** a real `reframeShortAnswer()` — strip write-only instructions, append
"Which statement best answers this?" on its own line (renders correctly thanks to
the `pre-wrap` added for multi-line questions). Verified: 104/104 now free of
write-only instructions.

**Also from that review — and I was initially too quick to dismiss it.** Codex
argued the whole `short_answer` → MC conversion is semantically lossy, since the
correct option is built from the explanation rather than the original answer. My
keyword-overlap audit (`_scratch/audit-shortanswer.js`) said 51/104 "drifted", and
I judged that a measurement artifact — originals often store a literal code
snippet as the expected answer, which prose never reproduces verbatim.

The artifact was real, **but the objection was also real**, and reading the items
(`_scratch/inspect-converted.js`) proved it: *"what is the difference between `=`
and `==`"* had the correct option *"A single = assigns a value to a variable"* —
answering one half of a two-part question. Same for break/continue. Taking only
the first sentence silently halved every contrast question. Fixed by taking at
least two sentences when the prompt asks for a comparison.

**Standing caveat:** this conversion is a *construct change* — a free-response
item becomes recognition of a summary statement. It is acceptable for this bank
because the options were sampled and check out, not because the transform is
inherently equivalent. Any new source needs the same manual sample.

**Rules:**
- A transformation that "looks applied" but is an identity operation is worse than
  no transformation: it hides an unfinished intention behind plausible code.
- When a reviewer's objection is directional, test it before accepting *or*
  dismissing it. Here the objection was partly right, and the measurement built to
  check it was itself misleading — inspect the worst cases, never just the ratio.
- Codex confirmed no id collisions and no XP double-counting across the shared
  `S.completed` map; those were the things I most suspected, and they were fine.
  Suspicion is not evidence in either direction.

---

## 15. My fix for one bug introduced a worse one: match vs split

**Looked like:** After fixing contrast questions (entry 14), a correct answer read
`' checks. Choose a list when order and duplicates matter.` — starting mid-word
with stray punctuation.

**Actually was:** My sentence splitter used `clean.match(/[^.!?]+[.!?]+(?:\s|$)/g)`.
The explanation contained `fast 'is this in here?' checks.` — the `?` sits inside
quotes, so `[.!?]+` matched it but the required `(?:\s|$)` failed against the
closing `'`. The regex could not extend past `?` (it is excluded from the negated
class), so that match position failed entirely and the engine resumed *after* it.
**Everything before the quoted question mark was silently discarded.**

**Fix:** split, never match — `clean.split(/(?<=[.!?])\s+(?=[A-Z(])/)`. A split
cannot lose characters; a match-based extractor keeps only what fits the pattern
and drops the rest without complaint.

**Also added a guard:** `merge-quiz-banks.js` now refuses to write if any option
starts with closing punctuation followed by a space. First version was too strict
and flagged 15 legitimate answers (`` `break` exits… ``, `"BankID-0042"`,
`'lost in the middle'`) — the distinguishing signal is punctuation followed by a
*space*, not punctuation itself.

**Rules:**
- Prefer `split` over `match` when segmenting text you must not lose. If you use
  `match`, assert that the pieces rejoin to the original.
- After fixing a generator, re-read real output. The regression here passed every
  structural check — it was only visible by looking at the words.
- A validator that fires on 15 legitimate cases teaches you to ignore validators.
  Tighten it until it fires only on the real defect.

---

## 16. Two sources of truth, one of them disposable

**Codex found:** `build-projects.js` validated checkpoint coverage against
`_scratch/dv-groups.json`, while the running app builds technique ids from the
`DV_GROUPS` constant baked into `index.html`. Two sources of truth. The coverage
audit could pass while the app checked completion against different ids — leaving
a checkpoint permanently locked with nothing to explain why.

**Worse than that:** `_scratch/` is documented in its own README as *"safe to
delete at any time; nothing depends on it."* A build step depended on it. The
convention and the code contradicted each other, and the convention was the one
written down for future sessions to trust.

**Fix:** the build now parses `DV_GROUPS` straight out of `index.html`, so the app
is the single source of truth, and throws a named error if the constant moves or
malforms. Added a second check that every id in every `covers` array exists in the
id space the app can actually mark complete — 283 references, all validated.
Proved it works by injecting drift (renaming G01→G99 in the app only): the build
fails with exit 1. Output is byte-identical to before the change, so the fix
altered nothing but where the data comes from.

**Rules:**
- Generated artefacts must read from the same source the runtime reads, or the
  validation proves nothing.
- If a directory is documented as disposable, nothing may depend on it — and the
  check for that is grepping your build scripts for its path, not remembering.
- Test a guard by breaking the thing it guards. An unexercised guard is a guess.

**Follow-up (same review):** Codex then spotted the identical bug one level down —
`appCreditIds` still hardcoded `M01..M47` and `CS01..CS07`. Fixing the DV source of
truth while hand-maintaining the credit one is not a fix, it is the same defect at
smaller scale. Both id spaces are now parsed from `UNIT_DEFS`/`DV_GROUPS` in
`index.html`, and the counts printed by the build are derived rather than literal.
Drift test: renaming `M47`→`M48` in the app now fails the build with
`P-CR-13 waits on unknown id "M47"`.

**The generalised diagnosis** (Codex's wording, sharper than mine): the failure
cluster is *unverified claims plus drift between build-time and runtime
representations*. It appeared in the markdown parser, the quiz conversion, and the
checkpoint generator. The costly cases were never "no check existed" — a check
existed and was validating the wrong thing, or the right thing against the wrong
source.

**Since this was written — there is a better answer than the one recorded here.**
The fix above keeps two representations and reconciles them by parsing
`index.html` at build time. That works, but it is a *guard against* drift, not an
absence of drift: the id space still exists twice, and the parser is now a
dependency that will break if the constants are ever reformatted.

The Business Analysis track avoids the problem instead of policing it. Its
chapter and lesson list exists once, in `business-analysis/index.json`, generated
alongside the markdown. `index.html` contains no BA ids at all — the app fetches
the index at runtime and builds its id space from it. There is nothing to drift,
so there is nothing to validate.

**Refined rule, superseding the first bullet above for new content:** prefer one
representation, fetched, over two representations reconciled by a parser. Reach
for build-time validation only when a single source genuinely is not possible —
as with `UNIT_DEFS` and `DV_GROUPS`, which are already baked into the app and
cannot be extracted without a larger change.

`build-ba-lessons.js` still guards the invariant that remains: that `index.json`
and the markdown on disk agree on every id, since a lesson in one but not the
other is an unreachable page or a dead link, and both fail silently. That is the
right shape for a guard — it checks a relationship that cannot be designed away,
rather than compensating for a duplication that could have been.


---

## 17. Knowledge that only exists on one disk

**Noticed while opening the PR:** `CLAUDE.md` and `LESSONS-LEARNED.md` sat one
directory above the git repo, so neither was under version control. Sixteen
entries of hard-won debugging — including the corrections Codex forced — existed
only on a single machine, with no remote copy.

**The constraint that caused it:** `CLAUDE.md` has to live at the working-directory
root to be loaded as project instructions, and git only tracks files inside the
repo below it. The two requirements genuinely conflict.

**Fix:** keep the working copy where it loads, add a versioned copy inside the
repo, and guard the pair with `scripts/check-docs-sync.js` — reports on drift,
`--fix` repairs it, exits non-zero either way when they differ. Tested by editing
the working copy alone and confirming it failed, then that `--fix` restored sync.

**Why a guard rather than accepting two copies:** duplicated state without a check
is precisely how the DV group ids drifted (entry 16). Duplication forced by a real
constraint is acceptable; *unguarded* duplication is not.

**Rules:**
- Ask early where a valuable file actually lives. Documentation about how to work
  on a project is often written outside the project and therefore never backed up.
- When two copies are genuinely unavoidable, make divergence fail loudly rather
  than trusting discipline to keep them aligned.


---

## 18. A guard that only works on the machine that wrote it

**Found by:** actually cloning the repo into a temp directory and following
`HANDOFF.md` as a new agent would, rather than assuming the handoff worked.

**What broke:** `check-docs-sync.js` exited non-zero on a clean clone with
"0 drifted, 2 missing". It compares the working copies of `CLAUDE.md` and
`LESSONS-LEARNED.md` — which live one directory *above* the repo — against the
tracked copies. In a clone those working copies do not exist, so the guard
treated a perfectly correct state as a failure. A new agent's first act would
have been debugging a false alarm.

**Fix:** a missing working copy above the repo is now normal (the tracked file is
authoritative there); only a copy that exists *and* disagrees fails.

**Second bug, caused while fixing the first:** removing the `missing` counter left
a `${missing}` reference in the failure message, so the drift path would have
thrown a ReferenceError instead of printing its message. The drift test still
"passed" because a crash also exits non-zero — the exit code was right for the
wrong reason.

**Rules:**
- Test a handoff by performing it. Clone into a fresh directory and follow your
  own instructions; assumptions about what a clone contains are usually wrong.
- Guards must pass in every environment they will run in, not just the one that
  authored them. A guard that cries wolf on a clean checkout gets deleted.
- An exit code alone does not prove a failure path works. Check the *message* —
  a crash and a clean failure are indistinguishable by exit status.

**Since this was written — the same guard failed the same way again, twice more,
and the second one could have destroyed work.** Codex found both.

**Failure A — a false all-clear in a worktree.** The script hardcoded
`ROOT = REPO/..`, which only holds for the main checkout. Run it from a linked
worktree at `_worktrees/track-registry` and `REPO/..` is the worktrees folder,
which contains no docs — so it printed *"tracked copy is authoritative"* and
exited 0 without comparing anything. Entry 18 fixed this guard crying wolf on a
clean clone and, in doing so, taught it to stay silent when it had not looked.
That is the worse failure: a guard that cries wolf gets investigated, a guard
that says all-clear gets trusted. It now asks git for the main worktree instead
of assuming directory layout.

**Failure B — `--fix` could silently revert the newer edit.** `--fix` syncs
root → repo on the assumption that the root copy is the hand-edited one. That
assumption breaks the moment you edit the tracked copy on a branch, which is
exactly what happens when a feature branch changes `CLAUDE.md`. Running `--fix`
out of habit would have overwritten this session's edits with a three-day-old
root copy, silently, with a success message. `--fix` now compares mtimes and
refuses when the repo copy is newer, pointing at a new `--from-repo` flag.

**I also got the direction wrong when reporting it**, telling the user `--fix`
would clobber the *root* copy. It writes root → repo; the hazard is the opposite
way round. Reading the four lines of the script would have settled it.

**Rules:**
- A guard's "pass" must mean *it checked and found nothing*, never *it could not
  find anything to check*. If it cannot locate its inputs, that is a failure, not
  a pass.
- Do not infer environment layout from relative paths when a tool can tell you.
  `git worktree list --porcelain` knows where the main checkout is; `REPO/..` is
  a guess that happens to be right in one configuration.
- Any `--fix` that picks a winner between two copies must justify the choice, and
  refuse when the evidence points the other way. A destructive default with a
  success message is the worst combination available.
- Before describing what a command does to a user, read it. See entry 21 —
  checking the observation is cheaper than the correction.


---

## 19. Git's safety net stops at the repo boundary

**Looked like:** A cleanup pass removing redundant files across the whole project
felt safe because "git can undo it."

**Actually was:** git tracks only files inside `sql-server-revision-tracker/`.
`_scratch/` and `_archive/` sit *above* the repo and are untracked, so `git
checkout`, `git reset --hard` and a rollback tag do nothing for them. Deleting
there is permanent. Half the deletion targets were in exactly that blind spot.

**Fix:** Before deleting anything, split the targets by what actually protects
them, then give the unprotected half its own net — here a verified zip outside the
project (file count in the archive checked against file count on disk, 41 = 41)
plus a tag on the last known-good commit for the tracked half.

**Rule:** "It's in git" is a claim about a *path*, not a project. Run
`git ls-files <path>` before trusting it — an untracked path has no undo. And
verify a backup by reading it back, not by the fact the command exited 0
(entry 2: HTTP 200 does not mean it worked).

**Since this was written — the same blind spot has a third form: squash merges
break "is this branch merged?".** After squash-merging this very branch, the
routine cleanup check said it was *not* merged:

```bash
git merge-base --is-ancestor <branch-tip> origin/<default>   # false
git branch --merged origin/<default>                          # branch absent
```

Both are correct and both are misleading. A squash merge replays the *content*
as one new commit; the original commits never become ancestors. So the branch
looks unmerged forever, while every line of it has already shipped.

The trap runs both ways. Trust the check and you keep dead branches indefinitely.
Distrust it and delete the branch, and you drop the last ref to those commits —
they become unreachable and are eventually garbage collected. The content
survives in the squashed commit either way, but the original authorship and
history do not.

**Rules:**
- After a squash merge, verify by *content*, not ancestry: check the actual files
  or lines landed at HEAD. `--is-ancestor` answers a different question than the
  one you are asking.
- Do not delete a squash-merged branch on the strength of "the content is in" if
  you care about preserving whose commit it was. Here the branch is deliberately
  kept, because it holds another session's only real commit.
- This belongs with entries 19 and 20: three different ways of assuming git is
  protecting something it is not.

---

## 20. Two agents, one working tree

**Looked like:** the working tree was clean and level with origin at the start of
the session — verified. An hour later, `git checkout -b feature/...` reported
success, and `git status` immediately showed seven uncommitted changes to files
I had never touched, including a staged deletion.

**First hypothesis, wrong:** that the changes were somehow leftovers, and that
creating a branch was a safe local act with nothing to undo. Both wrong, and the
second one is the dangerous one.

**Actually was:** a second agent was working in the same directory. `git checkout -b`
moved HEAD off *its* branch (`chore/remove-redundancies`) and carried its
uncommitted work onto mine. Separate agent sessions are not separate
workspaces — the working tree and HEAD are one piece of shared mutable state.
Had I committed, its half-finished work would have landed in my PR. Had it run
`git status` in that window, it would have seen a branch it never created.

**Fix:** `git reflog` showed the real sequence and named the branch I had moved
it off — information `git status` cannot recover after the fact. Checked back to
that branch, deleted the stray one, confirmed all seven changes intact. Then
`git worktree add` for a second checkout with its own directory and its own
HEAD, sharing history but nothing mutable.

**Rules:**
- Before any branch operation, run `git status` and check it matches what you
  expect. "It was clean when I started" is not a current fact.
- If another agent might be active, use `git worktree add` rather than
  `checkout -b`. Worktrees are what isolation actually looks like.
- `git reflog` is the recovery tool when HEAD has been moved unexpectedly. It
  records the branch you came *from*; nothing else does.
- Restoring shared state you disturbed comes before continuing your own task,
  even when your change is unrelated and your task is approved.

**Family:** this one does not fit the existing clusters, which is why it is worth
flagging. Every earlier entry is about a *representation* being wrong — a wrong
path, a stale copy, two sources disagreeing. This is the first about **shared
mutable state with a second writer you cannot see**. Expect more of this class as
more agents run concurrently, and note that the usual defences do not help:
determinism, guards and validation all assume you are the only one writing.

**Open risk this leaves.** The other agent's work still exists only as
uncommitted changes in the main working tree, on a branch with zero commits. That
is one stray `git checkout` from being lost, and nothing in the repo protects it.
Uncommitted work is not backed up by anything — see entry 19 on git's safety net
stopping at the repo boundary, which is the same blind spot from the other
direction.

---

## 21. A stale screenshot is not evidence of a live mismatch

**Looked like:** a scheduled task the user wanted gone. The MCP tool reported it
deleted and its list empty; a screenshot of the Routines UI showed it still
Active with a daily 9 AM schedule. The two views also disagreed *before*
deletion — MCP said `enabled: false, "Manual only"`, the UI said Active, daily.

**First hypothesis, wrong:** two separate stores, with the MCP view not
authoritative. I reported that as an unresolved discrepancy and wrote it into
the session handoff as a warning for the next agent to chase.

**Actually was:** one store. The task had run earlier that afternoon, seen that
the PR it was nagging about was merged, and disabled itself per its own
instructions — it just failed to complete the deletion. The screenshot predated
that self-disable by hours. Nothing disagreed; one observation was simply older
than the other.

**Fix:** re-checked current state, then went back and corrected the handoff
entry rather than leaving the alarming version in place.

**Rules:**
- Every observation carries a timestamp, including ones handed to you. Before
  concluding two systems disagree, establish that both readings are *current*.
- A screenshot is a claim about the past, not the present.
- When you record a suspected problem in a handoff and it later resolves, go
  back and correct the entry. An inherited false warning costs the next reader
  real time — the same failure mode this file's own deploy notes had before
  entry 10 corrected them.

**Family: confidently reporting a state that was never true** — with entries 1
and 6. Entry 1 said content was unavailable when it existed. Entry 6's extension
says a lesson is "not found" when it merely has not loaded. This one said a task
was running when it had already stopped. In all three the system was not broken;
the *observation* was, and the confident wording of the error is what sent
everyone looking in the wrong place.

**The cheap general defence:** before reporting that something is missing, wrong
or inconsistent, ask what would be true if the observation were simply out of
date — and spend the ten seconds it costs to re-check. That single question would
have prevented all three.

---

## 22. Match the parallelism to the shape of the work, not to the budget

**Looked like:** more compute was authorised mid-project, with an instruction to
be exhaustive and stop optimising for cost. The obvious reading is "throw many
agents at everything" — fan out on every task, because fanning out is now free.

**Why that is wrong:** parallelism is not a budget decision, it is a *shape*
decision. Work splits cleanly only where the parts are genuinely independent.
This app is **one file**. Two agents editing `index.html` collide exactly the way
two sessions sharing one working tree collide — see entry 20, which is the same
failure at a different scale. A file is a shared working tree in miniature, and
throwing more writers at it makes the collision more likely, not the work faster.

**What was actually done:**

| Work | Shape | Treatment |
|---|---|---|
| Design exploration, code audit, review | independent, read-only | **fan out** — rival designs scored against each other, adversarial sweeps |
| Editing `index.html` | one file, shared mutable state | **strictly sequential**, done by one writer |

Read-only analysis parallelises perfectly because nothing is being mutated.
Implementation does not. The rule that falls out: **fan out on reading, stay
serial on writing.**

**The second half — do not improvise through ambiguity.** The request was "a page
with this chronology of courses and quizzes so I can select them as a package."
That admits several genuinely different products: committed curriculum data, user
composed packages, or a pure derived view with no new state. Those are not
variations of one design; they have different data models and different failure
modes. The improvising move is to pick the one you thought of first and build it,
then discover at review that it answered a different question.

The user's framing for this, and it is the better one: **ask without shame.**
Asking costs a moment; building the wrong thing costs the build, the review, and
the rebuild. Where the ambiguity is real, either ask outright or generate the
rival designs and have them judged — do not silently collapse the ambiguity by
guessing and call it decisiveness.

**Rules:**
- Decide fan-out by asking "are these parts independent?", never by "how much
  compute do I have?". A large budget spent on serial work is just a slower way
  to collide.
- Anything with one writer and shared mutable state — a single file, a working
  tree, a deployment target — stays sequential regardless of budget.
- More resource should raise *depth* first (more adversarial review, more rival
  designs, more verification) and *breadth* only where the work truly splits.
- When a request is ambiguous, ask, or explore rivals and judge them. Improvising
  a single interpretation is the expensive option that feels like the cheap one.
- Extra capacity is best spent on **checking**, because verification is
  embarrassingly parallel and this file is mostly a record of unverified claims.
