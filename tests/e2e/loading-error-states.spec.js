// Loading and error states, across ALL FOUR content-fetching tracks, not
// just the cross-origin path (Codex's design-review correction -- see
// _scratch/headless-harness-design.md). Proves the app shows a real loading
// spinner, then either real content or an exact, working error state --
// never a silent blank page, which is exactly the runtime-only bug class
// the source-level coverage audit cannot catch.
const { test, expect } = require('@playwright/test');
const {
  mockGithubRawDelay,
  mockGithubRawFailure,
  mockSameOriginFailure,
  mockSameOriginDelay,
} = require('./helpers');

test.describe('cross-origin (GitHub-raw) content -- Credit Risk / Data Validation', () => {
  test('shows a loading spinner while the fetch is pending', async ({ page }) => {
    await mockGithubRawDelay(page);
    await page.goto('/index.html#lesson/M01');
    await expect(page.locator('.loading .spinner')).toBeVisible();
  });

  test('shows the exact error state and a working retry on fetch failure', async ({ page }) => {
    await mockGithubRawFailure(page);
    await page.goto('/index.html#lesson/M01');
    await expect(page.getByText('Content unavailable — check your connection.')).toBeVisible();
    const retryBtn = page.getByRole('button', { name: 'Try again' });
    await expect(retryBtn).toBeVisible();

    // Retry must actually re-attempt the fetch, not just re-render the same
    // error -- prove it by letting the retry succeed.
    await page.unroute(/raw\.githubusercontent\.com/);
    await page.route(/raw\.githubusercontent\.com/, (route) =>
      route.fulfill({ status: 200, contentType: 'text/markdown', body: '# Recovered content' })
    );
    await retryBtn.click();
    await expect(page.locator('.md')).toBeVisible({ timeout: 10_000 });
  });
});

test.describe('same-origin content -- Quiz Practice, Business Analysis, checkpoints', () => {
  test('quiz-bank.json failure shows an error state with retry, not a blank page', async ({ page }) => {
    await mockSameOriginFailure(page, 'quiz-bank.json');
    await page.goto('/index.html#track/quiz');
    await expect(page.getByText('Quiz bank unavailable')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Try again' })).toBeVisible();
  });

  test('quiz-bank.json delay shows a loading spinner, not a blank page', async ({ page }) => {
    await mockSameOriginDelay(page, 'quiz-bank.json');
    await page.goto('/index.html#track/quiz');
    await expect(page.locator('.loading .spinner')).toBeVisible();
  });

  test('business-analysis/index.json failure shows an error state with retry', async ({ page }) => {
    await mockSameOriginFailure(page, 'business-analysis/index.json');
    await page.goto('/index.html#track/ba');
    await expect(page.getByText(/Business Analysis chapters unavailable/)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Try again' })).toBeVisible();
  });

  test('projects/index.json failure shows checkpoints-unavailable with retry', async ({ page }) => {
    await mockSameOriginFailure(page, 'projects/index.json');
    await page.goto('/index.html#projects/credit');
    await expect(page.getByText(/Checkpoints unavailable/)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Try again' })).toBeVisible();
  });
});
