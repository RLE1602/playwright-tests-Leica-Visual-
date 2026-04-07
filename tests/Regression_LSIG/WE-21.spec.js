import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';

test('WE-21 Verify Quote Delete Item and Counter', async ({ page }) => {
  const visual = new VisualCheck(page, 'WE-21');

  // 1. Navigate
  await page.goto('https://stage.lifesciences.danaher.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 90000
  });

  await page.getByRole('button', { name: /accept/i }).click().catch(() => {});
  await page.getByRole('link', { name: 'Quote' }).click();
  await page.getByRole('button', { name: /accept/i }).click().catch(() => {});

  await page.getByRole('button', { name: /request a quote/i }).click();
  const quoteInput = page.locator('#quote');
  await quoteInput.waitFor({ state: 'visible' });
  await quoteInput.fill('Regression Testing');
  await page.getByRole('button', { name: /add and continue browsing/i }).click();
  const quoteCounter = page.locator('.quotecart');
  await expect(quoteCounter).toHaveText(/\d+/); 
  await page.evaluate(() => window.scrollBy(0, 0));
  await page.getByRole('button', { name: 'Products' }).click();
  await page.getByRole('link', { name: 'Centrifuges' }).click();
  await page.getByRole('link', { name: 'Analytical Ultracentrifuges ->' }).click();
  await page.getByRole('button', { name: 'Quote' }).click();
  await page.locator('textarea[name="quote"]').click();
  await page.locator('textarea[name="quote"]').fill('Reg Testing');
  await page.getByRole('button', { name: /^Add and complete request$/i }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.evaluate(() => window.scrollBy(0, 400));
  await page.getByRole('button', { name: /accept/i }).click().catch(() => {});
  await page.evaluate(() => window.scrollBy(0, 1000));
  const counter = page.locator('.quotecart');
  await expect(counter).toHaveText(/\d+/);
  await page.getByRole('heading', { name: /my quote cart/i }).scrollIntoViewIfNeeded();
  await visual.check('My quote cart page');
  await page.evaluate(() => window.scrollBy(0, -800));

let cartItems = page.locator('.quotecart li');
//FIRST DELETE
let firstItem = cartItems.first();
await firstItem.locator('button:has(svg)').last().click();
//await expect(cartItems).toHaveCount(1);
await expect(counter).toContainText(/1/i);
//SECOND DELETE
cartItems = page.locator('.quotecart li');
firstItem = cartItems.first();
//await firstItem.locator('//div[contains(@class, "quotecart")]//button[.//*[name()="svg"]]').click();
await firstItem.locator('button:visible').last().click();
await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
//await firstItem.locator('button:has(svg)').click();
//await expect(cartItems).toHaveCount(0);
await expect(page.getByText(/your online quote cart is currently empty/i)).toBeVisible();

});