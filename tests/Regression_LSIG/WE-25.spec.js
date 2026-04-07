import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';

test('Verify Filters, Navigation, and Search Flow', async ({ page }) => {
  const visual = new VisualCheck(page, 'WE-25');

  await page.goto('https://stage.lifesciences.danaher.com/', {waitUntil: 'domcontentloaded'});
  await page.getByRole('button', { name: /accept/i }).click().catch(() => {});

  // 2. Press Enter / initial interaction (if needed)
  await page.keyboard.press('Enter');

  // 3. Click on "Phenex 5µm Syringe Filters"
  await page.getByRole('link', { name: /phenex.*syringe filters/i }).click();

  await page.waitForTimeout(10000);

  // 4. Verify URL contains products
  await visual.check('Product breadcrumb');

  await expect(page).toHaveURL(/products/i);

  // 5. Click on "Phenex Syringe Filters"
  await page.getByRole('link', { name: /phenex syringe filters/i }).click();

  await page.waitForTimeout(5000);

  // 6. Click on "Products (10)"
  await page.getByRole('link', { name: /products\s*10/i }).click();

  await page.waitForTimeout(10000);

  // 7. Verify products page URL
  await expect(page).toHaveURL(/products\.html/i);

  // 8. Click on Home
  await page.getByRole('link', { name: /home/i }).click();

  await page.waitForTimeout(5000);

  // 9. Search for product
  const searchBox = page.locator('input[type="search"], input[placeholder*="search"]');
  await searchBox.fill('OBG 4485 A');
  await page.keyboard.press('Enter');

  await page.waitForTimeout(10000);

  // 10. Click on suggested product
  await page.getByRole('link', { name: /aeris.*widpore c4 200 a/i }).click();

});