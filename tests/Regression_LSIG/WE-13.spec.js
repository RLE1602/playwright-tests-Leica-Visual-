import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';

test('WE-13 Check wild search with *', async ({ page }) => {
  const visual = new VisualCheck(page, 'WE-13');

  await page.goto('https://stage.lifesciences.danaher.com/', { waitUntil: 'domcontentloaded',timeout: 90000 });

  await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});
  await page.waitForTimeout(1000);
  const searchInput = page.locator('//div[@class="hidden md:block w-full md:w-3/5 order-last md:order-none"]//input[@placeholder="Search"]');
  await expect(searchInput).toBeVisible();
  await searchInput.fill('*');
  await page.keyboard.press('Enter');
  await page.waitForLoadState('domcontentloaded', { timeout: 120000 });
  await page.evaluate(() => window.scrollBy(0, 150));
  await expect(page.locator('body')).toContainText(/We couldn.?t find anything for \*/i);

});