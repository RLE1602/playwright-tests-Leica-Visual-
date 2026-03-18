import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';

test('WE-04 Verify Empty Quote Cart Page', async ({ page }) => {
  const visual = new VisualCheck(page, 'WE-04');

  await page.goto('https://stage.lifesciences.danaher.com/', { waitUntil: 'networkidle' });

  async function acceptCookies() {
    const acceptBtn = page.getByRole('button', { name: /Accept/i });
    if (await acceptBtn.isVisible().catch(() => false)) {
      await acceptBtn.click();
    }
  }

  await page.getByRole('link', { name: 'Quote' }).click();
  await page.waitForLoadState('networkidle');

  // Assertions
  await expect(page).toHaveURL('https://stage.lifesciences.danaher.com/us/en/quote-cart.html');
  await expect(page).toHaveTitle('Quote Cart | Danaher Life Sciences');

  // Single visual check for the whole page
  await visual.check('quote_cart_page_full');
});