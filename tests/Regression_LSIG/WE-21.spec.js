import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';

test('WE-21 Verify Quote Delete Item and Counter', async ({ page }) => {

  // 1. Navigate
  await page.goto('https://stage.lifesciences.danaher.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 90000
  });

  await page.getByRole('button', { name: /accept/i }).click().catch(() => {});
  await page.getByRole('link', { name: 'Quote' }).click();
  await page.getByRole('button', { name: /request a quote/i }).click();
  const quoteInput = page.locator('#quote');
  await quoteInput.waitFor({ state: 'visible' });
  await quoteInput.fill('Regression Testing');
  await page.getByRole('button', { name: /add and continue browsing/i }).click();
  const quoteCounter = page.locator('.quotecart');
  await expect(quoteCounter).toHaveText(/\d+/); 
  await page.evaluate(() => window.scrollBy(0, 0));
  await page.getByRole('link', { name: /products/i }).click();
  await page.getByAltText(/centrifuges/i).scrollIntoViewIfNeeded();
  await page.getByText(/centrifuges/i).first().click();
  await page.waitForLoadState('domcontentloaded');
  await page.getByText(/centrifuge/i).nth(1).click();
  await page.evaluate(() => window.scrollBy(0, 800));
  await page.getByText(/Ana_ultra/i).first().click();
  await page.waitForLoadState('domcontentloaded');
 await product.getByRole('button', { name: /^quote$/i }).nth(0).click();
  const quoteInput1 = page.locator('(//textarea[@name="quote"])[1]');
  await quoteInput1.fill('Reg Testing');
  await page.getByRole('button', { name: /^Add and complete request$/i }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.evaluate(() => window.scrollBy(0, 400));
  await page.getByRole('button', { name: /accept/i }).click().catch(() => {});
  await page.evaluate(() => window.scrollBy(0, 1000));
  const counter = page.locator('[class*="quote"]');
  await expect(counter).toContainText(/2|3/i);
  await page.getByRole('heading', { name: /my quote cart/i }).scrollIntoViewIfNeeded();
  await visual.check('My quote cart page');

  await page.evaluate(() => window.scrollBy(0, -800));
  const deleteBtn = page.locator('button:has-text("Remove"), button:has-text("Delete"), [aria-label*="remove"]').first();
  await deleteBtn.click();
  await expect(counter).toContainText(/1|2/i);
  await page.evaluate(() => window.scrollBy(0, 200));
  await deleteBtn.click();
  await expect(page.getByText(/your online quote cart is currently empty/i)).toBeVisible();
});