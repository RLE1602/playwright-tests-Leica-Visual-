import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';


test('WE-20 Verify Submit Quote Functionality From Quote Cart', async ({ page }) => {
  const visual = new VisualCheck(page, 'WE-20');

  await page.goto('https://stage.lifesciences.danaher.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 90000
  });
  await page.getByRole('button', { name: /accept/i }).click().catch(() => {});
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Quote' }).click();
  await page.getByRole('button', { name: /^request a quote$/i }).click();
  const quoteInput = page.locator('//textarea[@id="quote"]').first();
  await quoteInput.fill('Test');
  await page.getByRole('button', { name: /^Add and continue browsing$/i }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.getByRole('link', { name: /products/i }).scrollIntoViewIfNeeded();
  await page.getByRole('link', { name: /products/i }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.getByRole('link', { name: /Assay Kits/i }).click();
  await page.evaluate(() => window.scrollBy(0, 400));
    // await page.getByRole('link', { name: /View details/i }).first().click();
    // await page.waitForLoadState('domcontentloaded');
    // await page.goBack({ waitUntil: 'domcontentloaded' });
  await page.evaluate(() => window.scrollBy(0, 1200));
  const product = page.locator('div').filter({hasText: 'Complex I Enzyme Activity Microplate Assay Kit'}).first();
  await expect(product).toBeVisible();
  await product.getByRole('button', { name: /^quote$/i }).nth(0).click();
  const quoteInput1 = page.locator('(//textarea[@name="quote"])[1]');
  await quoteInput1.fill('Testing');
  await page.getByRole('button', { name: /^Add and complete request$/i }).click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page.getByRole('heading', { name: /request a quote/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /my quote cart/i })).toBeVisible();
  await visual.check('My quote cart page');
  await page.getByLabel(/first name/i).fill('mitali');
  await page.getByLabel(/last name/i).fill('himane');
  await page.evaluate(() => window.scrollBy(0, 400));
  await page.getByLabel(/email address/i).first().fill('mithali.himane@dhlscontractors.com');
  await page.getByLabel(/phone/i).fill('238-732-8788');
  await page.getByLabel(/company/i).fill('test_company');
  await page.getByLabel(/country/i).selectOption({ label: 'Germany' });
  const addressInput = page.locator( '#Address_Line_1, #Address').first();
  await addressInput.scrollIntoViewIfNeeded();
  await addressInput.fill('Friedrichstraße Berlin Germany');
  await page.waitForLoadState('domcontentloaded');
  await addressInput.press('ArrowDown');
  await addressInput.press('Enter');
  //await page.getByLabel(/city/i).scrollIntoViewIfNeeded();
  //await page.getByLabel(/city/i).fill('Berlin');
  //await page.getByLabel(/zip|postal/i).scrollIntoViewIfNeeded();
  //await page.getByLabel(/zip|postal/i).fill('10012');
  await page.locator('#Email_Opt_In').check();
  await page.getByRole('button', { name: /submit quote request/i }).click();
  //await expect(page.getByRole('heading', { name: /thank you/i })).toBeVisible();
  //await expect(page.getByText(/your quote request has been/i)).toBeVisible();
  
});