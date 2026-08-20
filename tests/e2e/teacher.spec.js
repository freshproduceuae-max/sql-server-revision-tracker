// Teacher MCQs: open the panel on a lesson, answer the warm-up question,
// assert real correct/incorrect feedback text renders -- not just that
// "something changed" in the DOM.
const { test, expect } = require('@playwright/test');
const { mockGithubRawSuccess } = require('./helpers');

test('Teacher panel: warm-up MCQ answers with real feedback', async ({ page }) => {
  await mockGithubRawSuccess(page);
  await page.goto('/index.html#lesson/G01-T01');
  await expect(page.locator('.loading')).toHaveCount(0, { timeout: 10_000 });

  await page.getByRole('button', { name: /Ask the Teacher/ }).click();
  const panel = page.locator('.teacher-panel');
  await expect(panel).toBeVisible();

  const scroll = page.locator('#teacher-scroll');
  await expect(scroll.locator('.loading')).toHaveCount(0, { timeout: 10_000 });

  const firstChoice = scroll.locator('.quiz-choice').first();
  await expect(firstChoice).toBeVisible();
  await firstChoice.click();

  // Answering must produce a real feedback block, coloured correct/incorrect,
  // with explanation text -- not merely disabled buttons.
  const feedback = scroll.locator('.quiz-fb');
  await expect(feedback).toBeVisible();
  await expect(feedback).toHaveClass(/good|bad/);
  const explainText = await feedback.locator('.quiz-fb-explain').innerText();
  expect(explainText.length).toBeGreaterThan(5);

  await expect(scroll.getByRole('button', { name: /Next question|See how you did/ })).toBeVisible();

  // The close button's visible text is the "✕" glyph, not the word "Close"
  // (that's only its title/tooltip) -- so this anchors on the title
  // attribute rather than an accessible name that doesn't actually exist.
  await panel.locator('.teacher-close[title="Close"]').click();
  await expect(panel).toHaveCount(0);
});
