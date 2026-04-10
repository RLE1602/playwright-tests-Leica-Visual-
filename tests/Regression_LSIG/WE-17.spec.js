import { test, expect } from '@playwright/test';

test('WE-17 Verify product family and product details flow', async ({ page }) => {

  await page.goto('https://stage.lifesciences.danaher.com/us/en/products.html', {
    waitUntil: 'domcontentloaded'
  });
  await page.getByRole('button', { name: /accept/i }).click().catch(() => {});
  const seeAllFamily = page.getByRole('link', { name: /see all product family/i });
  if (await seeAllFamily.isVisible()) {
    await seeAllFamily.click();
  }
  await page.waitForLoadState('domcontentloaded');
  await page.evaluate(() => window.scrollBy(0, 700));
  await page.getByRole('link', { name: /view details/i }).first().click();
  await page.waitForLoadState('domcontentloaded');
  await page.goBack();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(5000);
  await page.getByRole('link', { name: /view details/i }).nth(1).click();
  await page.waitForLoadState('domcontentloaded');

  await page.goto('https://stage.lifesciences.danaher.com/us/en/products/sk.html', {
    waitUntil: 'domcontentloaded'});
  await page.getByRole('button', { name: /accept/i }).click().catch(() => {});
  const seeAllProducts = page.getByRole('link', { name: /see all products in this family/i });
  if (await seeAllProducts.isVisible()) {
    await seeAllProducts.click();
  }
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(/products/i);


  await page.goto('https://stage.lifesciences.danaher.com/us/en/products/bu.html', {
    waitUntil: 'domcontentloaded'
  });

  await page.getByRole('button', { name: /accept/i }).click().catch(() => {});
  await expect(page.getByText(/DM750 Educational Microscope/i)).toBeVisible();

  // 16. Scroll
  await page.evaluate(() => window.scrollBy(0, 200));

  const bundle = page.getByRole('link', { name: /see all items in this bundle/i });
  if (await bundle.isVisible()) {
    await bundle.click();
  }

  await expect(page.getByText(/Product Parts List/i)).toBeVisible();
  await expect(page.getByText(/DM 750 BF 4 Obj Plan/i)).toBeVisible();
  await expect(page.getByText(/US power cord/i)).toBeVisible();
  await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));

});