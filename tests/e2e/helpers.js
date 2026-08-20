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

/** Simulate a GitHub-raw fetch that never resolves within the test, so the
 * loading spinner can be asserted before any content/error state appears.
 *
 * Deliberately never calls route.fulfill()/route.abort() at all, rather
 * than waiting out a real setTimeout first: a `setTimeout` registers a
 * Node timer/handle that keeps that test worker's process alive until it
 * fires, and Playwright's route callback runs inside the worker process,
 * not the browser -- a 60s real timer here can leave the test run hanging
 * or leak a process if the worker isn't force-killed on teardown (found by
 * Codex's independent PR review: `npx playwright test` failed to exit and
 * left a node.exe process running). A route handler that returns a
 * never-resolving Promise with no timer behind it holds no such handle --
 * the page's own fetch just sits pending until the browser context closes
 * at test end, which is all this test actually needs. */
async function mockGithubRawDelay(page) {
  await page.route(GITHUB_RAW_PATTERN, () => new Promise(() => {}));
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
 * Same no-timer reasoning as mockGithubRawDelay above -- see its comment. */
async function mockSameOriginDelay(page, urlSuffix) {
  await page.route(`**/${urlSuffix}`, () => new Promise(() => {}));
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
  seedProgress,
  readProgress,
};
