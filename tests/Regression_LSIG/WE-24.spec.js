import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';

test('UI Banner / Carousel Validation', async ({ page }) => {
  const visual = new VisualCheck(page, 'WE-24');

  await page.goto(
    'https://stage.lifesciences.danaher.com/us/en/products/family/triple-quad-4500-systems.html',
    { waitUntil: 'domcontentloaded' }
  );

  await page.getByRole('button', { name: /accept/i }).click().catch(() => {});
  await visual.check('UI Banner / Carousel Validation');

  await expect(
    page.getByText(/Triple Quad.*4500.*LC-MS\/MS System/i)
  ).toBeVisible();

  const [sciexPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: /to learn more visit sciex/i }).click()
  ]);

  await sciexPage.waitForLoadState('domcontentloaded');
  await expect(sciexPage).toHaveURL(/sciex\.com\/products\/.*triple-quad-4500/i);
  await sciexPage.close();
  await page.bringToFront();

  await page.goto(
    'https://stage.lifesciences.danaher.com/us/en/products/bundles/dm750-educational-microscope-with-eyepiece-pointer.html#specification',
    { waitUntil: 'domcontentloaded' }
  );

  await page.getByRole('button', { name: /accept/i }).click().catch(() => {});

  await expect(
    page.getByText(/DM750 Educational Microscope with Eyepiece Pointer/i).first()
  ).toBeVisible();

  const [leicaPage1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: /to learn more visit Leica Microsystems/i }).click()
  ]);

  await leicaPage1.waitForLoadState('domcontentloaded');
  await expect(leicaPage1).toHaveURL(/dm750-educational-microscope/i);

  await leicaPage1.close();
  await page.bringToFront();

  await page.goto(
    'https://stage.lifesciences.danaher.com/us/en/products/sku/ad-520-105-leica.html',
    { waitUntil: 'domcontentloaded' }
  );

  await page.getByRole('button', { name: /accept/i }).click().catch(() => {});

  await expect(
    page.getByText(/404 ERROR/i)
  ).toBeVisible();

  // const [leicaPage2] = await Promise.all([
  //   page.waitForEvent('popup'),
  //   page.getByRole('link', { name: /to learn more visit Leica Microsystems/i }).click()
  // ]);

  // await leicaPage2.waitForLoadState('domcontentloaded');
  // await expect(leicaPage2).toHaveURL(/ad-520-105-leica/i);

  // await leicaPage2.close();
  // await page.bringToFront();
});