import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';

async function acceptCookies(page) {
  const acceptBtn = page.getByRole('button', { name: /accept/i });

  if (await acceptBtn.isVisible().catch(() => false)) {
    await acceptBtn.click();
  }
}

test('WE-04 Verify Empty Quote Cart Page', async ({ page }) => {

  const visual = new VisualCheck(page, 'WE-04');

  await page.goto('https://stage.lifesciences.danaher.com/', {
    waitUntil: 'domcontentloaded'
  });

  await acceptCookies(page); // ✅ before click
  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: 'Quote' }).click();
  await page.waitForLoadState('domcontentloaded');

  await acceptCookies(page); // ✅ after navigation
  await page.waitForTimeout(1000);

  // Assertions
  await expect(page).toHaveURL(/quote-cart/);
  await expect(page).toHaveTitle(/Quote Cart/i);

  // Visual check
  await visual.check('quote_cart_page_full');
});