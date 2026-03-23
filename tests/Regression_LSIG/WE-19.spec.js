import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';

test('WE-19 Verify RFQ Popup Information', async ({ page }) => {
  const visual = new VisualCheck(page, 'WE-19');

  // 🔹 Step 1: Navigate
  await page.goto('https://stage.lifesciences.danaher.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 90000
  });

  await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});
  await page.waitForTimeout(1000);
  await page.waitForLoadState('domcontentloaded');
  await page.getByRole('button', { name: /Quote/i }).first().click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page.getByText(/your online quote cart is currently empty/i)).toBeVisible();
  await visual.check('Empty quote page');

  await page.evaluate(() => window.scrollBy(0, 300));
  const continueBrowsing = page.getByText(/continue browsing our site/i);
  await expect(continueBrowsing).toBeVisible();

  const requestQuoteBtn = page.getByRole('button', { name: /request a quote/i });
  await expect(requestQuoteBtn).toBeVisible();
  await requestQuoteBtn.click();

  await expect(page.getByText(/request for quote/i)).toBeVisible();
  await expect(page.getByText(/describe your problem or desired solution/i)).toBeVisible();
  await expect(page.getByText(/quote tip/i)).toBeVisible();
  await expect(page.getByText(/be as detailed as possible/i)).toBeVisible();

  await expect(page.getByRole('heading', { name: /request for quote/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /quote tip/i })).toBeVisible();
  await expect(page.getByText(/be as detailed as possible/i)).toBeVisible();

  const closeBtn = page.locator('button[aria-label="close"], button:has-text("close")').first();
  if (await closeBtn.isVisible().catch(() => false)) {
    await closeBtn.click();
  }
  await continueBrowsing.click();

});