// Checkpoint-card UI: the prominent, clickable checkpoint entry point added
// to the Credit Risk / Data Validation / Data Engineering track heroes (the
// only tracks with projPrefix), plus the collapsed-by-default framework
// block shown on every track hero. Complements checkpoints.spec.js, which
// covers the unlock mechanism itself via the #projects/<track> timeline --
// this spec covers the new hero-level card and disclosure widget.
const { test, expect, devices } = require('@playwright/test');
const { seedProgress } = require('./helpers');

test('framework details block is collapsed by default and expands on click', async ({ page }) => {
  await seedProgress(page, { completed: {} });
  await page.goto('/index.html#track/credit');
  await expect(page.locator('.loading')).toHaveCount(0, { timeout: 10_000 });

  const details = page.locator('details.framework');
  await expect(details).toBeVisible();
  await expect(details).not.toHaveAttribute('open', '');
  await expect(details.locator('.chips')).not.toBeVisible();

  await details.locator('summary').click();
  await expect(details).toHaveAttribute('open', '');
  await expect(details.locator('.chips')).toBeVisible();
});

test('locked checkpoint card shows on the track hero with required progress, before any lesson is done', async ({ page }) => {
  await seedProgress(page, { completed: {} });
  await page.goto('/index.html#track/credit');
  await expect(page.locator('.loading')).toHaveCount(0, { timeout: 10_000 });

  const card = page.locator('.checkpoint-card');
  await expect(card).toBeVisible();
  await expect(card).toHaveClass(/locked/);
  await expect(card).toContainText('locked');
  // P-CR-01 covers M01, M02 -- 0 of 2 complete.
  await expect(card).toContainText('0 / 2');
});

test('unlocked checkpoint card is clickable and opens the correct checkpoint', async ({ page }) => {
  await seedProgress(page, { completed: { M01: true, M02: true } });
  await page.goto('/index.html#track/credit');
  await expect(page.locator('.loading')).toHaveCount(0, { timeout: 10_000 });

  const card = page.locator('.checkpoint-card');
  await expect(card).toBeVisible();
  await expect(card).toHaveClass(/open/);
  await expect(card).not.toHaveClass(/locked/);

  await card.click();
  await expect(page).toHaveURL(/#project\/P-CR-01$/);
  await expect(page.getByRole('button', { name: /Mark checkpoint done/ })).toBeVisible({ timeout: 20_000 });
});

// Codex's independent review of this PR flagged that the tests above only
// exercised Credit Risk directly, even though Data Validation and Data
// Engineering are equally in scope (all three have projPrefix). These two
// close that gap explicitly, one per remaining checkpoint-bearing track.
test('Data Validation track hero also shows a locked checkpoint card', async ({ page }) => {
  await seedProgress(page, { completed: {} });
  await page.goto('/index.html#track/dv');
  await expect(page.locator('.loading')).toHaveCount(0, { timeout: 10_000 });

  const card = page.locator('.checkpoint-card');
  await expect(card).toBeVisible();
  await expect(card).toHaveClass(/locked/);
  // P-DV-01 covers 22 techniques (G01+G02) -- 0 complete.
  await expect(card).toContainText('0 / 22');
});

test('Data Engineering track hero shows an unlocked checkpoint card that opens the correct checkpoint', async ({ page }) => {
  await seedProgress(page, {
    completed: {
      'DE01-T01': true, 'DE01-T02': true, 'DE01-T03': true,
      'DE01-T04': true, 'DE01-T05': true, 'DE01-T06': true,
    },
  });
  await page.goto('/index.html#track/de');
  await expect(page.locator('.loading')).toHaveCount(0, { timeout: 10_000 });

  const card = page.locator('.checkpoint-card');
  await expect(card).toBeVisible();
  await expect(card).toHaveClass(/open/);
  await expect(card).not.toHaveClass(/locked/);

  await card.click();
  await expect(page).toHaveURL(/#project\/P-DE-01$/);
  await expect(page.getByRole('button', { name: /Mark checkpoint done/ })).toBeVisible({ timeout: 20_000 });
});

// The framework/chips disclosure was applied to all five track heroes, not
// just Credit Risk and BA -- spot-check the remaining three explicitly
// rather than trusting that one consistent code path covers them.
for (const [track, route] of [['dv', '#track/dv'], ['de', '#track/de'], ['quiz', '#track/quiz']]) {
  test(`framework details block is collapsed by default on the ${track} track hero`, async ({ page }) => {
    await seedProgress(page, { completed: {} });
    await page.goto(`/index.html${route}`);
    await expect(page.locator('.loading')).toHaveCount(0, { timeout: 10_000 });

    const details = page.locator('details.framework');
    await expect(details).toBeVisible();
    await expect(details).not.toHaveAttribute('open', '');
    await expect(details.locator('.chips')).not.toBeVisible();
  });
}

for (const track of ['ba', 'quiz']) {
  test(`a track with no checkpoints (${track}) never shows a checkpoint card`, async ({ page }) => {
    await seedProgress(page, { completed: {} });
    await page.goto(`/index.html#track/${track}`);
    await expect(page.locator('.loading')).toHaveCount(0, { timeout: 10_000 });

    await expect(page.locator('.checkpoint-card')).toHaveCount(0);
    // Still has its own collapsed framework block, following the same
    // disclosure pattern as the checkpoint-bearing tracks.
    const details = page.locator('details.framework');
    await expect(details).toBeVisible();
    await expect(details).not.toHaveAttribute('open', '');
  });
}

test('mobile: checkpoint card is visible and tappable at phone width', async ({ browser }) => {
  const context = await browser.newContext({ ...devices['iPhone 13'] });
  const page = await context.newPage();
  await seedProgress(page, { completed: { M01: true, M02: true } });
  await page.goto('/index.html#track/credit');
  await expect(page.locator('.loading')).toHaveCount(0, { timeout: 10_000 });

  const card = page.locator('.checkpoint-card');
  await expect(card).toBeVisible();
  await expect
    .poll(() => card.boundingBox().then((b) => b?.width ?? null), { timeout: 10_000 })
    .toBeGreaterThan(200);

  await card.click();
  await expect(page).toHaveURL(/#project\/P-CR-01$/);

  await context.close();
});
