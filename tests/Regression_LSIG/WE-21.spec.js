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
  await expect(page.locator('[class*="quote"]')).toContainText(/1/i);
  eval('window.scrollBy(0, 800)');
  await page.getByRole('link', { name: /products/i }).click();
  await page.getByText(/centrifuges/i).first().click();
  await page.waitForLoadState('domcontentloaded');
  await page.getByText(/centrifuge/i).nth(1).click();
  eval('window.scrollBy(0, 800)');
  await page.getByText(/Ana_ultra/i).first().click();
  await page.waitForLoadState('domcontentloaded');
  await page.getByRole('link', { name: /quote/i }).click();
  await page.getByRole('button', { name: /request a quote/i }).click();
  const quoteInput2 = page.locator('#quote');
  await quoteInput2.waitFor({ state: 'visible' });
  await quoteInput2.fill('Regression Testing');
  await page.getByRole('button', { name: /add and complete request/i }).click();
  await page.mouse.wheel(0, 400);
  await page.getByRole('button', { name: /accept/i }).click().catch(() => {});
  await page.mouse.wheel(0, 1000);
  const counter = page.locator('[class*="quote"]');
  await expect(counter).toContainText(/2|3/i);
  await page.getByRole('heading', { name: /my quote cart/i }).scrollIntoViewIfNeeded();
  await visual.check('My quote cart page');

  await page.mouse.wheel(0, -800);
  const deleteBtn = page.locator('button:has-text("Remove"), button:has-text("Delete"), [aria-label*="remove"]').first();
  await deleteBtn.click();
  await expect(counter).toContainText(/1|2/i);
  await page.mouse.wheel(0, 200);
  await deleteBtn.click();
  await expect(page.getByText(/your online quote cart is currently empty/i)).toBeVisible();
});