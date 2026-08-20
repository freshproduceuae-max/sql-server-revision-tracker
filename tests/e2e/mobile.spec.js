// Mobile viewport: re-runs a representative subset (nav, lesson load,
// Teacher panel) under Playwright's iPhone 13 device emulation
// (playwright.config.js 'mobile' project), asserting the mobile CSS
// breakpoint actually takes effect AND that the panel is genuinely
// interactable at that viewport -- not merely rendered with different CSS
// (Codex design-review correction).
const { test, expect, devices } = require('@playwright/test');
const { mockGithubRawSuccess } = require('./helpers');

test.use({ ...devices['iPhone 13'] });

test('mobile: navigation, lesson load and Teacher panel are usable at phone width', async ({ page }) => {
  await mockGithubRawSuccess(page);
  await page.goto('/index.html');
  await expect(page.locator('#app')).not.toBeEmpty();

  await page.getByRole('link', { name: /Data Validation/ }).first().click();
  await expect(page).toHaveURL(/#track\/dv$/);

  await page.goto('/index.html#lesson/G01-T01');
  await expect(page.locator('.loading')).toHaveCount(0, { timeout: 10_000 });
  await expect(page.locator('.md')).toBeVisible();

  await page.getByRole('button', { name: /Ask the Teacher/ }).click();
  const panel = page.locator('.teacher-panel');
  await expect(panel).toBeVisible();

  // The mobile breakpoint (index.html's .teacher-panel media-query override)
  // must actually be in effect: the panel should span (near) full width,
  // not sit at its 380px desktop width, at a 390px-wide iPhone 13 viewport.
  //
  // boundingBox() is a one-shot call with no auto-retry, unlike Playwright's
  // expect() assertions -- this app re-renders by replacing #app's innerHTML
  // on every state change (e.g. the MCQ finishing its own load), so a single
  // boundingBox() call can race a render and transiently see a detached
  // node (null) under real parallel-worker CPU contention. expect.poll()
  // retries the read until it succeeds or times out, which toBeVisible()
  // just above does not protect against for a *subsequent* unrelated call.
  await expect
    .poll(() => panel.boundingBox().then((b) => b?.width ?? null), { timeout: 10_000 })
    .toBeGreaterThan(300);

  // And it must be genuinely usable, not just visually resized: the warm-up
  // MCQ inside it should be tappable.
  const scroll = page.locator('#teacher-scroll');
  await expect(scroll.locator('.loading')).toHaveCount(0, { timeout: 10_000 });
  const firstChoice = scroll.locator('.quiz-choice').first();
  await expect(firstChoice).toBeVisible();
  await firstChoice.click();
  await expect(scroll.locator('.quiz-fb')).toBeVisible();
});
