import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';
import { checkBrokenLinks } from '../../helpers/BrokenLinks';
import { checkBrokenImages } from '../../helpers/BrokenImages';

// // ✅ helper (reuse everywhere)
// async function handleCookies(page) {
//   const btn = page.getByRole('button', { name: 'Accept All Cookies' });
//   if (await btn.count() > 0) {
//     await btn.first().click();
//     await page.waitForSelector('#onetrust-consent-sdk', {
//       state: 'detached',
//       timeout: 10000
//     }).catch(() => {});
//   }
// }

test('WE-01 Verify that the "Frequently Viewed" or "Purchased Together" section is displayed correctly and functions as expected in Product Family', async ({ page }) => {
  const visual = new VisualCheck(page, 'WE-01');

  await page.goto('https://stage.lifesciences.danaher.com/us/en/products/family/atto-390.html', {waitUntil: 'domcontentloaded', timeout: 90000});

  await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});

  await visual.check('Frequently Viewed or Purchased Together section');

  await expect(page.locator('body')).toContainText('Leica Microsystems');
  await expect(page.locator('body')).toContainText('ATTO 390');
  await expect(page.locator('body')).toContainText('ATTO 390 is a novel fluorescent label with a coumarin structure'
  );

  await page.getByText('Related Products').scrollIntoViewIfNeeded();
  await page.getByText('Related Products').click();

  await expect(page.locator('body')).toContainText('Related Products');

  const products = ['ATTO 425', 'ATTO 594', 'ATTO 620', 'ATTO 610'];

  // ✅ PRODUCT 1

  await page.waitForLoadState('load');
  await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});
  let link = page.getByRole('link', { name: 'View Details' }).nth(0);
  await link.scrollIntoViewIfNeeded();
  await link.click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('body')).toContainText(products[0]);
  await checkBrokenLinks(page);
  await checkBrokenImages(page);
  await page.goBack();
  await page.waitForLoadState('domcontentloaded');
  await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});

  // ✅ PRODUCT 2
  
  await page.waitForLoadState('load');
  await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});
  await page.getByText('Related Products').scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, 1200));
  await page.waitForLoadState('domcontentloaded', { timeout: 120000 });
  link = page.getByRole('link', { name: 'View Details' }).nth(1);
  await link.click();
  await page.waitForLoadState('domcontentloaded', { timeout: 120000 });
  await expect(page.locator('body')).toContainText(products[1]);
  await checkBrokenLinks(page);
  await checkBrokenImages(page);
  await page.goBack();
  await page.waitForLoadState('domcontentloaded', { timeout: 120000 });
  await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});
  // ✅ PRODUCT 3
  
  await page.waitForLoadState('load');
  await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});
  await page.getByText('Related Products').scrollIntoViewIfNeeded();
  await page.waitForLoadState('load');
  await page.getByRole('link', { name: 'View Details' }).scrollIntoViewIfNeeded
  await page.waitForLoadState('load');
  link = page.getByRole('link', { name: 'View Details' }).nth(2);
  await link.click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('body')).toContainText(products[2]);
  await checkBrokenLinks(page);
  await checkBrokenImages(page);
  await page.goBack();
  await page.waitForLoadState('domcontentloaded');
  await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});

  // ✅ PRODUCT 4
  
  await page.waitForLoadState('load');
  await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});
  await page.getByText('Related Products').scrollIntoViewIfNeeded();
  await page.waitForLoadState('load');
  await page.getByRole('link', { name: 'View Details' }).scrollIntoViewIfNeeded
  await page.waitForLoadState('load');
  link = page.getByRole('link', { name: 'View Details' }).nth(3);
  await link.click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('body')).toContainText(products[3]);
  await checkBrokenLinks(page);
  await checkBrokenImages(page);
  await page.goBack();
  await page.waitForLoadState('domcontentloaded');
  await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});

  // ✅ VALIDATIONS

  await page.getByText('Related Products').scrollIntoViewIfNeeded();
  await expect(page.locator('body')).toContainText('ATTO 542');
  await expect(page.locator('body')).toContainText('ATTO 590');

  // ✅ FIXED PAGINATION

  const nextBtn = page.locator('text=Next').last();
  await nextBtn.scrollIntoViewIfNeeded();
  await expect(nextBtn).toBeVisible({ timeout: 90000 });
  await nextBtn.click();
  await page.waitForLoadState('domcontentloaded', { timeout: 90000 });
  await expect(page.locator('body')).toContainText('ATTO 565');
  await expect(page.locator('body')).toContainText('ATTO 495');

});