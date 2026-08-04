# Lessons Learned — Analyst Academy

Running log of problems solved and what generalises from them. **Append an entry
whenever you fix something non-obvious**, especially when the first hypothesis was
wrong — the wrong turn is usually the valuable part.

Format for each entry: what it looked like → what actually caused it → the fix →
the rule to carry forward.

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

## 10. Deploying: MCP first, CLI as a real fallback

**Supersedes the older claim that the CLI is the problem.** Both paths are valid;
the failure mode is *guessing the target*, not the tool.

- The Vercel MCP connector drops out regularly (it was dead for most of this
  session). Don't wait on it.
- The CLI works when you: confirm `npx vercel whoami` is authenticated **first**,
  pin the target by writing `.vercel/project.json` with the known org/project IDs
  rather than running interactive `vercel link`, and use `--prod --yes` so nothing
  waits on a prompt.

**Resolved from the earlier doc:** the production alias
`credit-risk-academy.vercel.app` no longer needs manual promotion — a `--prod`
deploy of the pinned project aliases it automatically.

**Rule:** Verify auth and target before deploying; ambiguity about *where* it
deploys causes more lost time than the deploy itself.

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
