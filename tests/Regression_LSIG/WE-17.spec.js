import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';


test('WE-17 WE-17 Verify See all product Family in this line link from Product Tab(Product tab and Product part list tab)', async ({ page }) => {
      const visual = new VisualCheck(page, 'WE-17');


  await page.goto('https://stage.lifesciences.danaher.com/us/en/products/family/atto-647n.html', {
    waitUntil: 'domcontentloaded'
  });
  await page.getByRole('button', { name: /accept/i }).click().catch(() => {});
  // const seeAllFamily = page.getByRole('link', { name: /see all product family/i });
  // if (await seeAllFamily.isVisible()) {
  //   await seeAllFamily.click();
  // }
    
  await visual.check('See all product family link from Product Tab');

  await page.waitForLoadState('domcontentloaded');
  await page.evaluate(() => window.scrollBy(0, 700));
  // await page.getByRole('link', { name: /view details/i }).first().click();
  // await page.waitForLoadState('domcontentloaded');
  // await page.goBack();
  // await page.waitForLoadState('domcontentloaded');
  // await page.waitForTimeout(5000);
  // await page.getByRole('link', { name: /view details/i }).nth(1).click();
  // await page.waitForLoadState('domcontentloaded');

  await page.goto('https://stage.lifesciences.danaher.com/us/en/products/sku/ag0-9201.html', {
    waitUntil: 'domcontentloaded'});
  await page.getByRole('button', { name: /accept/i }).click().catch(() => {});
  // const seeAllProducts = page.getByRole('link', { name: /see all products in this family/i });
  // if (await seeAllProducts.isVisible()) {
  //   await seeAllProducts.click();
  // }
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(/products/i);


  await page.goto('https://stage.lifesciences.danaher.com/us/en/products/bundles/dm750-educational-microscope.html#specification', {
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