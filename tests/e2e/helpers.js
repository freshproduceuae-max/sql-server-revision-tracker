// Shared helpers for the headless coverage harness. All route-mocking goes
// through these so every spec intercepts the same way (per design doc:
// Credit Risk and Data Validation both fetch cross-origin GitHub-raw
// content; Business Analysis, quiz-bank.json, teacher-mcq.json and
// projects/index.json are same-origin and served for real by
// scripts/dev-server.js).

const GITHUB_RAW_PATTERN = /raw\.githubusercontent\.com/;

const CANNED_MODULE_MD = `# M01 — Commercial Lending Overview

This is canned, deterministic lesson content injected by the test harness
via page.route() so the test does not depend on GitHub's real availability.

## Section

Some body text so the render path has real markdown to process.
`;

const CANNED_DV_MD = `# G01-T01 — Completeness | NULL Check

Canned deterministic lesson content for the harness.

\`\`\`sql
SELECT * FROM Customers WHERE Email IS NULL;
\`\`\`
`;

/** Mock every GitHub-raw content fetch (Credit Risk + Data Validation) with
 * canned markdown, so lesson-loading assertions are deterministic. */
async function mockGithubRawSuccess(page) {
  await page.route(GITHUB_RAW_PATTERN, (route) => {
    const url = route.request().url();
    const body = /G\d\d-T\d\d/.test(url) ? CANNED_DV_MD : CANNED_MODULE_MD;
    route.fulfill({ status: 200, contentType: 'text/markdown; charset=utf-8', body });
  });
}

/** A controllable pending operation: the route handler `await`s
 * `deferred.promise` and only then calls `route.abort()`. Nothing about
 * this holds a Node timer -- but unlike a bare `new Promise(() => {})`,
 * this promise is guaranteed to be resolved exactly once, deterministically,
 * by `release()`, which every caller MUST invoke from `test.afterEach` (see
 * loading-error-states.spec.js). That guarantees the route handler always
 * runs to completion and the underlying request is always positively
 * aborted before the test ends and the browser context tears down --
 * closing the specific gap a permanently-unresolved Promise leaves open
 * (Codex's second-review finding: an unresolved Promise removes the timer
 * but can still leave an unresolved Playwright operation pending during
 * context/browser teardown, which is a plausible mechanism for a hang even
 * with the timer gone). */
function makeDeferred() {
  let release;
  const promise = new Promise((resolve) => {
    release = resolve;
  });
  return { promise, release };
}

/** Simulate a GitHub-raw fetch that stays pending until explicitly released,
 * so the loading spinner can be asserted before any content/error state
 * appears. Register the returned deferred with the test's `pending` array
 * (see loading-error-states.spec.js's afterEach) so it is guaranteed to be
 * released -- and the underlying route positively aborted -- before the
 * test ends, regardless of whether the test body itself reaches that point
 * (assertion failure, timeout, etc. all still hit afterEach). */
async function mockGithubRawDelay(page, pending) {
  const deferred = makeDeferred();
  pending.push(deferred);
  await page.route(GITHUB_RAW_PATTERN, async (route) => {
    await deferred.promise;
    await route.abort();
  });
}

/** Simulate a GitHub-raw fetch failure (network abort), so the app's error
 * state ("Content unavailable...") and retry button can be asserted. */
async function mockGithubRawFailure(page) {
  await page.route(GITHUB_RAW_PATTERN, (route) => route.abort('failed'));
}

/** Simulate a same-origin asset failing to load (404), for the
 * loading/error-states spec's same-origin coverage. `urlSuffix` matches the
 * end of the request URL, e.g. 'quiz-bank.json'. */
async function mockSameOriginFailure(page, urlSuffix) {
  await page.route(`**/${urlSuffix}`, (route) => route.fulfill({ status: 404, body: 'not found' }));
}

/** Simulate a same-origin asset hanging, for the loading-state assertion.
 * Same deterministic-release pattern as mockGithubRawDelay above -- see its
 * comment for why a bare never-resolving Promise isn't good enough. */
async function mockSameOriginDelay(page, urlSuffix, pending) {
  const deferred = makeDeferred();
  pending.push(deferred);
  await page.route(`**/${urlSuffix}`, async (route) => {
    await deferred.promise;
    await route.abort();
  });
}

/** Release every pending deferred route registered this test, aborting each
 * underlying request. MUST be called from test.afterEach -- Playwright runs
 * afterEach regardless of whether the test passed, failed, or timed out, so
 * this is what actually guarantees no pending route operation survives the
 * test, rather than relying on browser-context teardown to force it (the
 * exact assumption that was in question). */
async function releasePendingRoutes(pending) {
  for (const deferred of pending) deferred.release();
  pending.length = 0;
}

/** Seed crAcademy_v1 in localStorage before the app's first script runs, so
 * a fresh page load starts from a known completion state (used by the
 * checkpoints spec to pre-complete a checkpoint's covered lessons). */
async function seedProgress(page, { completed = {}, streak = 0, quizScores = {} } = {}) {
  await page.addInitScript(
    ([c, s, q]) => {
      window.localStorage.setItem(
        'crAcademy_v1',
        JSON.stringify({ completed: c, streak: s, lastDate: null, quizScores: q })
      );
    },
    [completed, streak, quizScores]
  );
}

async function readProgress(page) {
  return page.evaluate(() => JSON.parse(window.localStorage.getItem('crAcademy_v1') || '{}'));
}

module.exports = {
  mockGithubRawSuccess,
  mockGithubRawDelay,
  mockGithubRawFailure,
  mockSameOriginFailure,
  mockSameOriginDelay,
  releasePendingRoutes,
  seedProgress,
  readProgress,
};
