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
  await page.getByRole('button', { name: /^Add and continue browsing Button1$/i }).click();
  await expect(page.locator('[class*="cart"], [class*="quote"]')).toContainText(/test/i);
  await page.getByRole('link', { name: /^products$/i }).click();
  const productCard = page.locator('[class*="card"]').first();
  await expect(productCard).toBeVisible();
  await productCard.click();
  await page.getByRole('button', { name: /view product/i }).click();
  await page.getByRole('button', { name: /request (a )?quote/i }).click();
  await expect(quoteInput).toBeVisible();
  await quoteInput.fill('Test 2');
  await page.getByRole('button', { name: /^add$/i }).click();
  await visual.check('Empty quote page');

  await expect(page.getByRole('heading', { name: /request a quote/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /my quote cart/i })).toBeVisible();

  await page.getByLabel(/first name/i).fill('mitali');
  await page.getByLabel(/last name/i).fill('himane');
  await page.getByLabel(/email/i).fill('mithali.himane@dhlscontractors.com');
  await page.getByLabel(/phone/i).fill('238-732-8788');
  await page.getByLabel(/company/i).fill('test_company');
  await page.getByLabel(/country/i).selectOption({ label: 'Germany' });
  await page.getByLabel(/address/i).fill('Friedrichstraße Berlin Germany');
  await page.getByLabel(/city/i).fill('Berlin');
  await page.getByLabel(/zip|postal/i).fill('10012');
  await page.getByRole('checkbox').check();

  await page.getByRole('button', { name: /submit quote/i }).click();
  await expect(page.getByRole('heading', { name: /thank you/i })).toBeVisible();
  await expect(page.getByText(/your quote request has been/i)).toBeVisible();

});