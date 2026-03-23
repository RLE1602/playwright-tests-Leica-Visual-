import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';
import { checkBrokenLinks } from'../../helpers/BrokenLinks';
import { checkBrokenImages } from'../../helpers/BrokenImages';

test('WE-02 Verify that the "Buy" feature if available is functional for each product in the PDP family, sku and  Bundle Product in hero section', async ({ page }) => {
  
const visual = new VisualCheck(page, 'WE-02');
  
await page.goto('https://stage.lifesciences.danaher.com/us/en/products/family/atto-390.html', { waitUntil: 'domcontentloaded' , timeout: 90000 });

await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});
await page.waitForTimeout(1000);

  // Take single full-page visual check after homepage load
await visual.check('Buy feature in hero section');

await expect(page.locator('body')).toContainText('ATTO 390');
await page.evaluate(() => window.scrollBy(0, 500));
await page.locator('//span[@class="inherit text-base font-medium leading-snug"]').click(); //Buy Now
// await page.getByRole('button', { name: /Buy Now/i }).click();
await page.waitForLoadState('domcontentloaded');
await expect(page).toHaveURL(/.*atto-390/);

const [newPage] = await Promise.all([
  page.waitForEvent('popup')
]);
await newPage.close();
await page.bringToFront();

// await page.goto('https://stage.lifesciences.danaher.com/us/en/products/sku/ad-520-105-leica.html#specification', { waitUntil: 'domcontentloaded' , timeout: 90000 });
// await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});

// await visual.check('Buy feature in hero section');

// await expect(page.getByText(/ATTO 520 azide/i)).toBeVisible();// await expect(page.getByRole('button', { name: 'Buy Now' })).toBeVisible();
// await page.getByRole('button', { name: 'Buy Now' }).click();
// await page.waitForLoadState('networkidle');
// await expect(page).toHaveURL(/.*\atto-520-105*/);
//await page.close();
await page.goto('https://stage.lifesciences.danaher.com/us/en/products/bundles/ivesta-3-stereo-microscopes-for-inspection.html#specification', { waitUntil: 'domcontentloaded' , timeout: 90000 });
await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});
await visual.check('Buy feature in hero section');
await expect(page.getByText('Ivesta 3 Stereo Microscope for Inspection')).toBeVisible();

// 1. Navigate
console.log("Buy and quote feature in product tab");

await page.goto('https://stage.lifesciences.danaher.com/us/en/products/family/zebron-gc-columns.html', { waitUntil: 'domcontentloaded' , timeout: 90000 });
await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});
await page.locator('span.icon-Rectangle').click();
await page.waitForLoadState('domcontentloaded');
await page.evaluate(() => window.scrollBy(0, 700));
  await page.locator('#AG0-9201').click();
  await page.locator('#AG0-9201').fill('3');
  await page.locator('#AG0-9201').press('Enter');
  await page.locator('#AG0-9201').click();
  await page.getByRole('button', { name: 'Buy' }).first().click();
  await page.locator('#closeMiniCart > .h-12 > path').click();
  await page.getByRole('button', { name: 'Quote' }).nth(1).click();
  await page.locator('textarea[name="quote"]').click();
  await page.locator('textarea[name="quote"]').fill('Testing');
  await page.getByRole('button', { name: 'Add and continue browsing' }).click();
  await page.locator('[id="7JM-G001-17"]').click();
  await page.locator('[id="7JM-G001-17"]').fill('2');
  await page.locator('[id="7JM-G001-17"]').press('Enter');
  await page.getByRole('button', { name: 'Buy' }).nth(1).click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.getByRole('button', { name: 'Quote' }).nth(2).click();
  await page.locator('textarea[name="quote"]').click();
  await page.locator('textarea[name="quote"]').fill('Testing1');
  await page.getByRole('button', { name: 'Add and continue browsing' }).click();

  await page.goto('https://stage.lifesciences.danaher.com/us/en/products/family/visoria-p.html', { waitUntil: 'domcontentloaded' , timeout: 90000 });
  await page.locator('.icon.icon-Rectangle > svg').click();
  await page.locator('#visoria-p-flexacam-c5-transparent-samples-only').click();
  await page.locator('#visoria-p-flexacam-c5-transparent-samples-only').fill('2');
  await page.locator('#visoria-p-flexacam-c5-transparent-samples-only').press('Enter');
  await page.getByRole('button', { name: 'Buy' }).nth(1).click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.getByRole('button', { name: 'Quote' }).nth(1).click();
  await page.locator('textarea[name="quote"]').click();
  await page.locator('textarea[name="quote"]').fill('Testing2');
  await page.getByRole('button', { name: 'Add and continue browsing' }).click();
  await page.getByRole('button', { name: 'Buy' }).nth(2).click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.getByRole('button', { name: 'Quote' }).nth(3).click();
  await page.locator('textarea[name="quote"]').click();
  await page.locator('textarea[name="quote"]').fill('Testing4');
  await page.getByRole('button', { name: 'Add and continue browsing' }).click();
  await page.getByRole('link', { name: 'Cart' }).click();
  await page.waitForLoadState('domcontentloaded');



});