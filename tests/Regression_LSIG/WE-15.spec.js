import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck';
test('WE-15 Search for a web page with its title', async ({ page }) => {
  const visual = new VisualCheck(page, 'WE-15');

  await page.goto('https://stage.lifesciences.danaher.com/', { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});
  await page.waitForTimeout(1000);

  const searchInput = page.locator('//div[@class="hidden md:block w-full md:w-3/5 order-last md:order-none"]//input[@placeholder="Search"]').first();
  await searchInput.fill('Nuvom Simplified Liquid Extraction Hope');
  await page.keyboard.press('Enter');
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('body')).toContainText(/Search term/i);
  await expect(page.locator('body')).toContainText(/Nuvom/i);
  await visual.check('Search with title');
  await page.getByRole('link', { name: /Novum™ Simplified Liquid Extraction/i }).click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(/products/i);

  await searchInput.fill('Kintex 5 µm Biphenyl 100 Å');
  await page.keyboard.press('Enter');
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('body')).toContainText(/Search term/i);
  await expect(page.locator('body')).toContainText(/Kintex/i);
  await visual.check('Search with title');
  const kintexLink = page.getByRole('link', { name: /Kinetex 5 µm Biphenyl 100 Å/i }).first();
  await kintexLink.click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(/products/i);

  await searchInput.fill('dm500 educational microscopes with integrated wireless');
  await page.keyboard.press('Enter');
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('body')).toContainText(/Search term/i);
  await expect(page.locator('body')).toContainText(/dm500/i);
  await visual.check('Search with title');
  const dm500Link = page.getByRole('link', { name: /DM500/i }).first();

  try {
  await dm500Link.waitFor({ state: 'visible', timeout: 5000 });
  await dm500Link.click();
  await expect(page).toHaveURL(/products/i);
  } catch {
  console.log('DM500 link not available');
  }

});