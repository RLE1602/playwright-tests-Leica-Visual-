import { test, expect } from '@playwright/test';

test('WE-17 Verify product family and product details flow', async ({ page }) => {

  // 1. Navigate
  await page.goto('https://stage.lifesciences.danaher.com/us/en/products.html', {
    waitUntil: 'domcontentloaded'
  });

  // 2. Accept Cookies
  await page.getByRole('button', { name: /accept/i }).click().catch(() => {});

  // 3. Click "See all product family in this line"
  const seeAllFamily = page.getByRole('link', { name: /see all product family/i });
  if (await seeAllFamily.isVisible()) {
    await seeAllFamily.click();
  }

  await page.waitForLoadState('networkidle');

  // 4. Scroll
  await page.evaluate(() => window.scrollBy(0, 700));

  // 5. Apply filter (Product tab)
  const filter = page.getByRole('button', { name: /filters for product/i });
  if (await filter.isVisible()) {
    await filter.click();
  }

  // 6. Search filter
  const filterSearch = page.locator('input[type="search"], input[placeholder*="search"]');
  if (await filterSearch.isVisible()) {
    await filterSearch.fill('test');
  }

  // 7. Click "View Details"
  await page.getByRole('link', { name: /view details/i }).first().click();

  await page.waitForLoadState('domcontentloaded');

  // 8. Go Back
  await page.goBack();
  await page.waitForLoadState('domcontentloaded');

  // 9. Click tag (useTag / svgTag)
  const tag = page.locator('[class*="tag"], svg');
  if (await tag.first().isVisible()) {
    await tag.first().click();
  }

  await page.waitForTimeout(5000);

  // 10. Click another View Details
  await page.getByRole('link', { name: /view details/i }).nth(1).click();

  await page.waitForLoadState('domcontentloaded');

  // 11. Go Back
  await page.goBack();
  await page.waitForLoadState('domcontentloaded');

  // 12. Navigate to another product family page
  await page.goto('https://stage.lifesciences.danaher.com/us/en/products/sk.html', {
    waitUntil: 'domcontentloaded'
  });

  // 13. Click "See all products in this family"
  const seeAllProducts = page.getByRole('link', { name: /see all products in this family/i });
  if (await seeAllProducts.isVisible()) {
    await seeAllProducts.click();
  }

  await expect(page).toHaveURL(/products/i);

  // 14. Navigate to another product page
  await page.goto('https://stage.lifesciences.danaher.com/us/en/products/bu.html', {
    waitUntil: 'domcontentloaded'
  });

  // 15. Verify product name
  await expect(page.getByText(/DM750 Educational Microscope/i)).toBeVisible();

  // 16. Scroll
  await page.evaluate(() => window.scrollBy(0, 200));

  // 17. Click "See all items in this bundle"
  const bundle = page.getByRole('link', { name: /see all items in this bundle/i });
  if (await bundle.isVisible()) {
    await bundle.click();
  }

  // 18. Verify bundle details
  await expect(page.getByText(/Product Parts List/i)).toBeVisible();
  await expect(page.getByText(/DM 750 BF 4 Obj Plan/i)).toBeVisible();
  await expect(page.getByText(/US power cord/i)).toBeVisible();

  // 19. Scroll to bottom
  await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));

});