import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';

test('Verify Filters, Navigation, and Search Flow', async ({ page }) => {
  const visual = new VisualCheck(page, 'WE-25');

  await page.goto('https://stage.lifesciences.danaher.com/', {waitUntil: 'domcontentloaded'});
 await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});
  await page.waitForTimeout(1000);
  const searchInput = page.locator('//div[@class="hidden md:block w-full md:w-3/5 order-last md:order-none"]//input[@placeholder="Search"]');
  await expect(searchInput).toBeVisible();
  await searchInput.fill('Phenex™ Syringe Filters');
  await page.keyboard.press('Enter');
  await page.waitForLoadState('domcontentloaded');
  await page.evaluate(() => window.scrollBy(0, 150));
  await page.getByRole('link', { name: /phenex.*syringe filters/i }).nth(0).click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL('https://stage.lifesciences.danaher.com/us/en/products/family/phenex-syringe-filters.html');
  await visual.check('Product breadcrumb');
  await expect(page).toHaveURL(/products/i);
  await page.locator('//a[normalize-space()="Phenex Syringe Filters"]').click();
  await page.waitForLoadState('domcontentloaded');
  await page.locator('//a[@href="/us/en/products.html"]').click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(/products\.html/i);
  await page.locator('//*[name()="path" and contains(@d,"M12 5.432l")]').click();
  await page.waitForLoadState('domcontentloaded');

  // 9. Search for product
  await searchInput.click();
  await searchInput.fill('00G-4486-AN');
  await page.keyboard.press('Enter');
  await page.waitForLoadState('domcontentloaded');
  await page.getByRole('link', { name: /Aeris 3.6 µm WIDEPORE C4 200 Å, LC Column 250 x 2.1 mm, Ea/i }).nth(0).click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL('https:\/\/stage.lifesciences.danaher.com\/us\/en\/products\/sku\/00g-4486-an-phenomenex.html');
  await page.locator('//a[@href="/us/en/products.html"]').click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(/products\.html/i);
  await page.locator('//*[name()="path" and contains(@d,"M12 5.432l")]').click();
  await page.waitForLoadState('domcontentloaded');
  // 9. Search for product
  await searchInput.fill('emspira-3-digital-microscopes-for-inspection');
  await page.keyboard.press('Enter');
});