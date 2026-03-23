import { test, expect } from '@playwright/test';

test('WE-15 Search for a web page with its title', async ({ page }) => {


  const searchInput = page.locator('input[type="search"], input[placeholder*="Search" i]').first();

  // 🔹 1. Search: Nuvom™ Simplified Liquid Extraction
  await searchInput.fill('Nuvom Simplified Liquid Extraction Hope');
  await page.keyboard.press('Enter');

  await page.waitForLoadState('domcontentloaded');

  await expect(page.locator('body')).toContainText(/Search term/i);
  await expect(page.locator('body')).toContainText(/Nuvom/i);

  const nuvomLink = page.getByRole('link', { name: /Nuvom/i }).first();
  await expect(nuvomLink).toBeVisible();
  await nuvomLink.click();

  await expect(page).toHaveURL(/products/i);

  // 🔹 2. Search: Kintex® 5 µm Biphenyl 100 Å
  await searchInput.fill('Kintex 5 µm Biphenyl 100 Å');
  await page.keyboard.press('Enter');

  await page.waitForLoadState('domcontentloaded');

  await expect(page.locator('body')).toContainText(/Search term/i);
  await expect(page.locator('body')).toContainText(/Kintex/i);

  const kintexLink = page.getByRole('link', { name: /Kintex/i }).first();
  await kintexLink.click();

  await expect(page).toHaveURL(/products/i);

  // 🔹 3. Search: dm500 educational microscopes
  await searchInput.fill('dm500 educational microscopes with integrated wireless');
  await page.keyboard.press('Enter');

  await page.waitForLoadState('domcontentloaded');

  await expect(page.locator('body')).toContainText(/Search term/i);
  await expect(page.locator('body')).toContainText(/dm500/i);

  const dm500Link = page.getByRole('link', { name: /DM500/i }).first();
  await expect(dm500Link).toBeVisible();
  await dm500Link.click();

  await expect(page).toHaveURL(/products/i);

});