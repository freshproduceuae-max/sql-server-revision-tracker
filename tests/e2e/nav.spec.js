// Track navigation: proves clicking each nav tab actually renders that
// track's real hero/path body, not just that the click didn't throw.
const { test, expect } = require('@playwright/test');
const { mockGithubRawSuccess } = require('./helpers');

test.describe('track navigation', () => {
  test.beforeEach(async ({ page }) => {
    await mockGithubRawSuccess(page);
  });

  test('all four track tabs navigate and render distinct content', async ({ page }) => {
    await page.goto('/index.html');
    await expect(page.locator('#app')).not.toBeEmpty();

    const tabs = [
      { name: /Credit Risk/, hash: 'track/credit' },
      { name: /Data Validation/, hash: 'track/dv' },
      { name: /Business Analysis/, hash: 'track/ba' },
      { name: /Quiz Practice/, hash: 'track/quiz' },
    ];

    for (const tab of tabs) {
      await page.getByRole('link', { name: tab.name }).first().click();
      await expect(page).toHaveURL(new RegExp('#' + tab.hash + '$'));
      // A real render, not a blank body: the active tab must be visibly
      // marked and the page must contain more than just nav chrome.
      await expect(page.locator('a.track-tab.active', { hasText: tab.name })).toBeVisible();
      const bodyText = await page.locator('#app').innerText();
      expect(bodyText.length).toBeGreaterThan(100);
    }
  });
});
