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

  // The mobile breakpoint (index.html's .teacher-panel media-query override,
  // `left:12px;right:12px;width:auto;max-width:none`) must actually be in
  // effect, not just "the panel looks wide enough". A raw width threshold
  // does NOT reliably distinguish this: the desktop rule is `width:380px`
  // capped by `max-width:calc(100vw - 32px)`, which at the iPhone 13's
  // 390px viewport clamps to 358px -- only 8px narrower than the mobile
  // rule's actual ~366px, so a ">300" (or even ">340") threshold would
  // pass under EITHER rule and prove nothing (found by Codex's independent
  // PR review). The one property whose exact computed value can only come
  // from the mobile rule is `max-width`: the desktop rule's `calc(...)`
  // always resolves to a specific pixel value, never the literal string
  // "none" -- only the mobile override sets that literally. Checking the
  // real applied CSS this way is unambiguous in a way geometry isn't.
  //
  // getComputedStyle is read via expect.poll() rather than a one-shot
  // page.evaluate(), because this app re-renders by replacing #app's
  // innerHTML on every state change (e.g. the MCQ finishing its own load),
  // so a single read can race a render and transiently see a detached node
  // under real parallel-worker CPU contention.
  await expect
    .poll(
      () => panel.evaluate((el) => getComputedStyle(el).maxWidth).catch(() => null),
      { timeout: 10_000 }
    )
    .toBe('none');

  // Interactability check, kept separate from the CSS-correctness check
  // above: the panel must also actually fit on screen, not just carry the
  // right CSS property.
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
