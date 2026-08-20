// Checkpoints: seeds localStorage so a checkpoint's covered lessons are
// already complete, then proves the unlock gate and the "mark done" action
// actually work at runtime -- not just that the source-level coverage audit
// (scripts/build-projects.js) considers the ids valid. That script can pass
// while the render path silently breaks (HANDOFF.md "Known gaps" -- the
// coverage audit reasons over source, not runtime); this spec is the
// runtime half of that gap.
const { test, expect } = require('@playwright/test');
const { seedProgress } = require('./helpers');

// P-CR-01 covers M01, M02 (projects/index.json) -- Credit Risk's first
// checkpoint, chosen as the representative case since project briefs are
// same-origin (projects/**), no route-mocking needed.
test('Credit Risk checkpoint unlocks when its covered lessons are complete', async ({ page }) => {
  await seedProgress(page, { completed: { M01: true, M02: true } });
  await page.goto('/index.html#projects/credit');
  await expect(page.locator('.loading')).toHaveCount(0, { timeout: 10_000 });

  const firstItem = page.locator('.tl-item').first();
  await expect(firstItem).toBeVisible();
  await expect(firstItem).not.toHaveClass(/locked/);

  await firstItem.click();
  await expect(page).toHaveURL(/#project\/P-CR-01$/);

  // Wait directly for the actionable element rather than the absence of
  // `.loading` -- the project page does two sequential same-origin fetches
  // (projects/index.json, then the brief markdown), and under real parallel
  // test-worker CPU contention that pair can legitimately take longer than
  // 10s even though the app itself isn't slow; the button appearing is the
  // actual thing this test cares about, and Playwright's auto-retry on
  // getByRole already handles waiting for it correctly, so this is more
  // robust than a global, unscoped `.loading` count check.
  const markDoneBtn = page.getByRole('button', { name: /Mark checkpoint done/ });
  await expect(markDoneBtn).toBeVisible({ timeout: 20_000 });
  await markDoneBtn.click();

  await expect(page.getByText('Milestone banked')).toBeVisible();
  await expect(page.getByRole('button', { name: /Mark as not done/ })).toBeVisible();
});

test('A checkpoint whose lessons are NOT complete renders locked, not clickable-as-open', async ({ page }) => {
  await seedProgress(page, { completed: {} });
  await page.goto('/index.html#projects/credit');
  await expect(page.locator('.loading')).toHaveCount(0, { timeout: 10_000 });

  const firstItem = page.locator('.tl-item').first();
  await expect(firstItem).toBeVisible();
  await expect(firstItem).toHaveClass(/locked/);
});

// P-DE-01 covers all 6 DE01 lessons (projects/index.json) -- Data
// Engineering's Phase 1 checkpoint, same same-origin/no-mocking case as
// Credit Risk's P-CR-01 above. Proves the new track's checkpoint mechanism
// (added this phase, reusing the existing projPrefix/coverage machinery)
// actually works at runtime, not just that build-projects.js's coverage
// audit considers DE01-T01..T06 valid.
test('Data Engineering checkpoint unlocks when Chapter 1 is complete', async ({ page }) => {
  await seedProgress(page, {
    completed: {
      'DE01-T01': true, 'DE01-T02': true, 'DE01-T03': true,
      'DE01-T04': true, 'DE01-T05': true, 'DE01-T06': true,
    },
  });
  await page.goto('/index.html#projects/de');
  await expect(page.locator('.loading')).toHaveCount(0, { timeout: 10_000 });

  const firstItem = page.locator('.tl-item').first();
  await expect(firstItem).toBeVisible();
  await expect(firstItem).not.toHaveClass(/locked/);

  await firstItem.click();
  await expect(page).toHaveURL(/#project\/P-DE-01$/);

  const markDoneBtn = page.getByRole('button', { name: /Mark checkpoint done/ });
  await expect(markDoneBtn).toBeVisible({ timeout: 20_000 });
  await markDoneBtn.click();

  await expect(page.getByText('Milestone banked')).toBeVisible();
  await expect(page.getByRole('button', { name: /Mark as not done/ })).toBeVisible();
});

test('Data Engineering checkpoint renders locked when Chapter 1 is incomplete', async ({ page }) => {
  await seedProgress(page, { completed: { 'DE01-T01': true } }); // only 1 of 6
  await page.goto('/index.html#projects/de');
  await expect(page.locator('.loading')).toHaveCount(0, { timeout: 10_000 });

  const firstItem = page.locator('.tl-item').first();
  await expect(firstItem).toBeVisible();
  await expect(firstItem).toHaveClass(/locked/);
});
