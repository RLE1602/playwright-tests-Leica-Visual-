import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck';

test('WE-14 Verify Product Search for OpCos', async ({ page }) => {
  const visual = new VisualCheck(page, 'WE-14');

  await page.goto('https://stage.lifesciences.danaher.com/', { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});
  await page.waitForTimeout(1000);
  // Common locators
  const searchInput = page.locator('//div[@class="hidden md:block w-full md:w-3/5 order-last md:order-none"]//input[@placeholder="Search"]').first();
  await page.waitForLoadState('domcontentloaded', { timeout: 30000 });
  await searchInput.fill('cell vial instrument');
  await page.keyboard.press('Enter');
//   const searchButton = page.locator('//span[@class="w-4 h-4 searchbox-icon"]//*[name()="svg"]');
//   await searchButton.click();
  await page.waitForLoadState('domcontentloaded', { timeout: 30000 });
  await visual.check('Search page');

  const cvCell = page.locator('text=Beckman Coulter Life Sciences').first();
  await cvCell.scrollIntoViewIfNeeded();
  await cvCell.click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('body')).toContainText(/Beckman Coulter Life Sciences/i);

  await searchInput.fill('Leica DMi8 M Metallographic Microscope');
  await page.keyboard.press('Enter');
  await page.waitForLoadState('domcontentloaded');

  const metallographic = page.locator('text=DMi8 S').first();
  await metallographic.scrollIntoViewIfNeeded();
  await metallographic.click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('body')).toContainText(/Leica Microsystems/i);
  await visual.check('Product search page');

  await searchInput.fill('SpectraMax M2 Multi Mode Microplate Reader');
  await page.keyboard.press('Enter');
  await page.waitForLoadState('domcontentloaded');
  const multimode = page.locator('text=SpectraMax® Mini Multi-Mode Microplate Reader').first();
  await multimode.scrollIntoViewIfNeeded();
  await multimode.click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('body')).toContainText(/Molecular Devices/i);
  await visual.check('Product search page');

});