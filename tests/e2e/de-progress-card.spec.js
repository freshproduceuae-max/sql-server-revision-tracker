// Data Engineering hero progress card: proves the label and counts reflect
// WHOLE-TRACK progress (all 36 lessons across all 6 chapters), matching
// every other track's convention (DV's "Lab progress", BA/Credit Risk's
// "Course progress") -- not a single chapter's progress. This is a
// regression test for a real defect: the label used to hardcode "Chapter 1
// progress" (a leftover from when Chapter 1 was the whole track), even
// though the underlying count (`deFlat`, all 36 lessons) was always
// whole-track. Also proves the hero card stays whole-track-scoped after
// navigating between chapters, not accidentally re-scoped to whichever
// chapter's accordion is currently expanded.
const { test, expect } = require('@playwright/test');
const { mockGithubRawSuccess, seedProgress } = require('./helpers');

test.describe('Data Engineering progress card', () => {
  test.beforeEach(async ({ page }) => {
    await mockGithubRawSuccess(page);
  });

  test('hero label and count show whole-track progress, unaffected by which chapter is expanded', async ({ page }) => {
    // 6 of DE01's lessons complete, 2 of DE03's -- 8 of 36 total, spread
    // across two different chapters, so a per-chapter count (6/6 or 2/6)
    // would be visibly wrong against the expected whole-track 8/36.
    await seedProgress(page, {
      completed: {
        'DE01-T01': true, 'DE01-T02': true, 'DE01-T03': true,
        'DE01-T04': true, 'DE01-T05': true, 'DE01-T06': true,
        'DE03-T01': true, 'DE03-T02': true,
      },
    });
    await page.goto('/index.html#track/de');
    await expect(page.locator('.loading')).toHaveCount(0, { timeout: 10_000 });

    const progressLbl = page.locator('.progress-lbl');
    const progressCnt = page.locator('.progress-cnt');

    // The label must not claim to be scoped to one chapter.
    await expect(progressLbl).not.toHaveText(/Chapter \d+ progress/);
    await expect(progressLbl).toHaveText('Course progress');

    // The count must reflect all 36 lessons, not one chapter's 6.
    await expect(progressCnt).toHaveText('8 / 36');

    // Expand a DIFFERENT chapter's accordion (Chapter 4, none of whose
    // lessons are complete, and not the auto-expanded "current" chapter --
    // that's Chapter 2, since DE01 is fully done and DE03 only partially)
    // -- the hero card is outside the accordion and must not change when a
    // chapter is expanded/collapsed.
    await page.locator('.unit-bar').filter({ hasText: 'Chapter 4' }).click();
    await expect(page.locator('.unit-row.expanded').filter({ hasText: 'Chapter 4' })).toBeVisible();

    await expect(progressLbl).toHaveText('Course progress');
    await expect(progressCnt).toHaveText('8 / 36');

    // The expanded chapter's OWN accordion meta count is separately and
    // correctly per-chapter (0/6 for Chapter 4, which has no completions)
    // -- confirming per-chapter counts still exist where they belong (the
    // accordion bar), just not mislabeled onto the whole-track hero card.
    const chapter4Bar = page.locator('.unit-bar').filter({ hasText: 'Chapter 4' });
    await expect(chapter4Bar.locator('.unit-bar-meta')).toHaveText('0/6');
  });
});
