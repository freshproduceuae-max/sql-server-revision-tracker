// Quiz Practice: proves the full session lifecycle, not just the first
// question's feedback -- select an answer, check it, see feedback, advance,
// reach a completion summary. quiz-bank.json is same-origin, served for
// real. Handles both question shapes the app supports (multiple_choice via
// .quiz-choice, and matching_pairs via .mp-btn) since a real quiz bank can
// mix both and the harness should not assume away the type it doesn't test.
const { test, expect } = require('@playwright/test');

async function answerOneQuestion(page) {
  const mpGrid = page.locator('.mp-grid');
  if (await mpGrid.isVisible().catch(() => false)) {
    // Matching-pairs: pair terms with definitions in order, one click each
    // side per pair. Correctness doesn't matter for this harness -- it only
    // proves the interaction flow completes, not the content's accuracy.
    const termsCol = mpGrid.locator('div').nth(0).locator('.mp-btn');
    const pairCount = await termsCol.count();
    for (let i = 0; i < pairCount; i++) {
      await mpGrid.locator('.mp-btn:not([disabled])').first().click(); // next unpaired term
      await mpGrid.locator('.mp-btn:not([disabled])').first().click(); // its definition
    }
  } else {
    await page.locator('.quiz-choice').first().click();
  }
  const checkBtn = page.locator('.quiz-btn', { hasText: 'Check' });
  await expect(checkBtn).toBeEnabled();
  await checkBtn.click();

  const feedback = page.locator('.quiz-fb');
  await expect(feedback).toBeVisible();
  await expect(feedback).toHaveClass(/good|bad/);

  const nextBtn = page.locator('.quiz-btn.next');
  await expect(nextBtn).toBeVisible();
  await nextBtn.click();
}

test('Quiz Practice: answer, advance and finish a session', async ({ page }) => {
  await page.goto('/index.html#quiz/0/0');
  await expect(page.locator('.loading')).toHaveCount(0, { timeout: 10_000 });

  // Cap the loop so a bug that makes "done" never trigger fails the test
  // instead of hanging forever.
  for (let i = 0; i < 50; i++) {
    const finalScore = page.locator('.quiz-final-score');
    if (await finalScore.isVisible().catch(() => false)) break;
    await answerOneQuestion(page);
  }

  const finalScore = page.locator('.quiz-final-score');
  await expect(finalScore).toBeVisible();
  const scoreText = await finalScore.innerText();
  expect(scoreText).toMatch(/%$/);

  await expect(page.getByRole('button', { name: 'Retry' })).toBeVisible();
  await page.getByRole('button', { name: 'Done' }).click();
  // "Done" navigates via the #quizbank/<qi> deep-link shortcut, which the
  // app immediately rewrites to #track/quiz via history.replaceState
  // in-place (index.html:2056-2064, deliberate -- see its own comment: using
  // location.hash= there would re-fire hashchange and re-enter render()
  // recursively). The visible end state is the bank-landing accordion with
  // that bank pre-expanded, not a URL that stays on #quizbank/0.
  await expect(page).toHaveURL(/#track\/quiz$/);
  await expect(page.getByText(/12 lessons/).first()).toBeVisible();
});
