// Lesson loading + completion, one representative lesson per content-loading
// path: Credit Risk (M01, GitHub-raw mocked), Data Validation (G01-T01,
// GitHub-raw mocked), Business Analysis (same-origin, served for real).
// Asserts real content renders (not spinner, not error), "Mark complete"
// flips state, and localStorage actually persists the completion -- not
// just the DOM, since the DOM and storage can disagree if the save path is
// broken but the render path isn't (CLAUDE.md rule 5: verify the real
// user-visible state, not just that a click didn't throw).
const { test, expect } = require('@playwright/test');
const { mockGithubRawSuccess, readProgress } = require('./helpers');

const CASES = [
  { id: 'M01', label: 'Credit Risk lesson', mocked: true },
  { id: 'G01-T01', label: 'Data Validation lesson', mocked: true },
];

for (const c of CASES) {
  test(`${c.label} (${c.id}): loads real content and completion persists`, async ({ page }) => {
    await mockGithubRawSuccess(page);
    await page.goto(`/index.html#lesson/${c.id}`);

    await expect(page.locator('.loading')).toHaveCount(0, { timeout: 10_000 });
    await expect(page.locator('.md')).toBeVisible();
    const mdText = await page.locator('.md').innerText();
    expect(mdText.length).toBeGreaterThan(20);
    await expect(page.getByText('Content unavailable')).toHaveCount(0);

    const markBtn = page.getByRole('button', { name: /Mark complete/ });
    await expect(markBtn).toBeVisible();
    await markBtn.click();
    await expect(page.getByRole('button', { name: /Completed/ })).toBeVisible();

    const progress = await readProgress(page);
    expect(progress.completed && progress.completed[c.id]).toBeTruthy();
  });
}

test('Business Analysis lesson: same-origin content loads and completes', async ({ page }) => {
  // Business Analysis is genuinely same-origin (./business-analysis/), so no
  // route mocking is needed -- the dev server serves the real committed
  // markdown, proving the actual production content path end to end.
  await page.goto('/index.html#track/ba');
  await expect(page.locator('.loading')).toHaveCount(0, { timeout: 10_000 });

  const firstLessonLink = page.locator('a[href^="#lesson/BA"]').first();
  await expect(firstLessonLink).toBeVisible();
  const lessonId = (await firstLessonLink.getAttribute('href')).replace('#lesson/', '');
  await firstLessonLink.click();

  await expect(page.locator('.loading')).toHaveCount(0, { timeout: 10_000 });
  await expect(page.locator('.md')).toBeVisible();
  await expect(page.getByText('Content unavailable')).toHaveCount(0);

  const markBtn = page.getByRole('button', { name: /Mark complete/ });
  await markBtn.click();
  await expect(page.getByRole('button', { name: /Completed/ })).toBeVisible();

  const progress = await readProgress(page);
  expect(progress.completed && progress.completed[lessonId]).toBeTruthy();
});
