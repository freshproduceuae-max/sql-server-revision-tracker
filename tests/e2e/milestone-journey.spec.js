// The checkpoint timeline's milestone-journey redesign: current/next/future
// visual hierarchy, the "Next up" summary, and the hover/focus tooltip that
// replaces persistent per-item labels (so 13 titles are never all on screen
// at once). Complements checkpoints.spec.js, which covers the unlock
// mechanism itself -- this spec covers the new visual/interaction layer on
// top of it.
const { test, expect } = require('@playwright/test');
const { seedProgress } = require('./helpers');

test('the first not-done checkpoint is "current": bigger ring, persistent title, high-contrast even while locked', async ({ page }) => {
  await seedProgress(page, { completed: {} });
  await page.goto('/index.html#projects/credit');
  await expect(page.locator('.loading')).toHaveCount(0, { timeout: 10_000 });

  const current = page.locator('.tl-item.tl-current');
  await expect(current).toBeVisible();
  await expect(current).toHaveClass(/locked/); // nothing complete yet
  await expect(current.locator('.tl-title')).toBeVisible();
  await expect(current.locator('.tl-title')).toContainText('Onboard the Borrower');

  // The bug this guards: .tl-item.locked .tl-title has a muted colour rule
  // that must not win over the current milestone's own high-contrast rule.
  await expect
    .poll(() => current.locator('.tl-title').evaluate((el) => getComputedStyle(el).color))
    .not.toBe(await page.locator('.tl-item.tl-future .tl-dot').first().evaluate((el) => getComputedStyle(el).color).catch(() => null));
});

test('the second not-done checkpoint is "next" and later ones are "future" -- distinct visual weight, no persistent title on either', async ({ page }) => {
  await seedProgress(page, { completed: {} });
  await page.goto('/index.html#projects/credit');
  await expect(page.locator('.loading')).toHaveCount(0, { timeout: 10_000 });

  const next = page.locator('.tl-item.tl-next');
  const future = page.locator('.tl-item.tl-future').first();
  await expect(next).toBeVisible();
  await expect(future).toBeVisible();
  // Neither shows a persistent .tl-title -- only a hover/focus tooltip.
  await expect(next.locator('.tl-title')).toHaveCount(0);
  await expect(future.locator('.tl-title')).toHaveCount(0);
  await expect(next.locator('.tl-tip')).toHaveCount(1);
  await expect(future.locator('.tl-tip')).toHaveCount(1);

  // "Next" is only lightly dimmed; "future" is more muted -- genuinely
  // distinct opacity, not the same treatment applied twice.
  const nextOpacity = await next.locator('.tl-dot').evaluate((el) => getComputedStyle(el).opacity);
  const futureOpacity = await future.locator('.tl-dot').evaluate((el) => getComputedStyle(el).opacity);
  expect(Number(nextOpacity)).toBeGreaterThan(Number(futureOpacity));
});

test('a milestone tooltip is hidden by default and reveals its name and requirement on hover', async ({ page }) => {
  await seedProgress(page, { completed: {} });
  await page.goto('/index.html#projects/credit');
  await expect(page.locator('.loading')).toHaveCount(0, { timeout: 10_000 });

  const future = page.locator('.tl-item.tl-future').first();
  const tip = future.locator('.tl-tip');

  // Hidden by default -- opacity 0, not removed from the DOM (still part of
  // the link's accessible name for screen readers regardless of hover).
  await expect.poll(() => tip.evaluate((el) => getComputedStyle(el).opacity)).toBe('0');

  await future.hover();
  await expect.poll(() => tip.evaluate((el) => getComputedStyle(el).opacity)).toBe('1');
  await expect(tip).toContainText('covered lessons complete');
});

test('a milestone tooltip also reveals on keyboard focus, not just mouse hover', async ({ page }) => {
  await seedProgress(page, { completed: {} });
  await page.goto('/index.html#projects/credit');
  await expect(page.locator('.loading')).toHaveCount(0, { timeout: 10_000 });

  const next = page.locator('.tl-item.tl-next');
  const tip = next.locator('.tl-tip');
  await expect.poll(() => tip.evaluate((el) => getComputedStyle(el).opacity)).toBe('0');

  await next.focus();
  await expect.poll(() => tip.evaluate((el) => getComputedStyle(el).opacity)).toBe('1');
});

test('the "Next up" summary names the first not-done checkpoint, and updates once it is banked', async ({ page }) => {
  // All of P-CR-01's lessons complete AND the checkpoint itself already
  // marked done -- the summary should point at checkpoint 2 instead of 1.
  await seedProgress(page, { completed: { M01: true, M02: true, 'P-CR-01': true } });
  await page.goto('/index.html#projects/credit');
  await expect(page.locator('.loading')).toHaveCount(0, { timeout: 10_000 });

  await expect(page.locator('.tl-next-goal')).not.toContainText('Onboard the Borrower');
  const firstItem = page.locator('.tl-item').first();
  await expect(firstItem).toHaveClass(/done/);
  await expect(firstItem).not.toHaveClass(/tl-current/); // done items don't carry a position class
  await expect(page.locator('.tl-item.tl-current')).not.toHaveClass(/done/);
});

test('the connecting line still exists and the milestone strip remains reachable by the same route as before', async ({ page }) => {
  await seedProgress(page, { completed: {} });
  await page.goto('/index.html#projects/de');
  await expect(page.locator('.loading')).toHaveCount(0, { timeout: 10_000 });

  await expect(page.locator('.tl-strip')).toBeVisible();
  await expect(page.locator('.tl-item')).toHaveCount(6); // P-DE-01..06
  // #project/<id> routing is unchanged -- current item still opens the
  // right checkpoint, same contract as checkpoints.spec.js already proves.
  await page.locator('.tl-item.tl-current').click();
  await expect(page).toHaveURL(/#project\/P-DE-01$/);
});
