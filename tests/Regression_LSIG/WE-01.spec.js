import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';
import { checkBrokenLinks } from '../../helpers/BrokenLinks';
import { checkBrokenImages } from '../../helpers/BrokenImages';

test('WE-01 Verify Related Products section works correctly', async ({ page }) => {
  const visual = new VisualCheck(page, 'WE-01');

  const baseURL = 'https://stage.lifesciences.danaher.com/us/en/products/family/atto-390.html';

  // 🔹 Reusable safe click helper
  const safeClick = async (locator) => {
    await locator.waitFor({ state: 'visible', timeout: 15000 });
    await locator.scrollIntoViewIfNeeded();
    await locator.click();
  };

  // 🔹 Open page
  const openBasePage = async () => {
    await page.goto(baseURL, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});
  };

  // 🔹 Navigate to Related Products tab
  const openRelatedProducts = async () => {
    const tab = page.getByRole('tab', { name: 'Related Products' });
    await safeClick(tab);
    await expect(page.locator('body')).toContainText('Related Products');
  };

  // 🔹 Start test
  await openBasePage();

  await visual.check('Frequently Viewed or Purchased Together section');

  await expect(page.locator('body')).toContainText('Leica Microsystems');
  await expect(page.locator('body')).toContainText('ATTO 390');
  await expect(page.locator('body')).toContainText(
    'ATTO 390 is a novel fluorescent label with a coumarin structure'
  );

  await openRelatedProducts();

  const products = ['ATTO 425', 'ATTO 594', 'ATTO 620', 'ATTO 610'];

  // 🔁 Loop through products (clean + stable)
  for (let i = 0; i < 4; i++) {
    console.log(`Testing product ${i + 1}`);

    const link = page.getByRole('link', { name: 'View Details' }).nth(i);

    await safeClick(link);

    await page.waitForLoadState('domcontentloaded');
    await visual.check('Frequently Viewed or Purchased Together section');

    await expect(page.locator('body')).toContainText(products[i]);

    // ⚠️ These are heavy — keep but now stable
    await checkBrokenLinks(page);
    await checkBrokenImages(page);

    // 🔁 Always go fresh instead of goBack (prevents crashes)
    await openBasePage();
    await openRelatedProducts();
  }

  // ✅ Final validations
  await expect(page.locator('body')).toContainText('ATTO 542');
  await expect(page.locator('body')).toContainText('ATTO 590');

  // ✅ Pagination
  const nextBtn = page.locator('text=Next').last();

  await safeClick(nextBtn);

  await page.waitForLoadState('domcontentloaded');
  await visual.check('Frequently Viewed or Purchased Together section');

  await expect(page.locator('body')).toContainText('ATTO 565');
  await expect(page.locator('body')).toContainText('ATTO 495');
});