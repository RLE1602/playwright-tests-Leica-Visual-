import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';


test('WE-20 Verify Submit Quote Functionality From Quote Cart', async ({ page }) => {
  const visual = new VisualCheck(page, 'WE-20');

  await page.goto('https://stage.lifesciences.danaher.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 90000
  });

  // Accept cookies
  await page.getByRole('button', { name: /accept/i }).click().catch(() => {});

  // 🔹 Quote
  await page.getByRole('link', { name: /^quote$/i }).click();

  // 🔹 Request a Quote
  await page.getByRole('button', { name: /^request a quote$/i }).click();

  // 🔹 Input field (textarea / input near Add button)
  const quoteInput = page.locator('textarea, input').filter({
    has: page.locator('xpath=ancestor::div[.//button[contains(.,"Add")]]')
  }).first();

  await expect(quoteInput).toBeVisible();
  await quoteInput.fill('Test 1');

  await page.getByRole('button', { name: /^add$/i }).click();

  // 🔹 Verify item added (more stable than body)
  await expect(
    page.locator('[class*="cart"], [class*="quote"]')
  ).toContainText(/test 1/i);

  // 🔹 Products navigation
  await page.getByRole('link', { name: /^products$/i }).click();

  // 🔹 Select product (first visible card)
  const productCard = page.locator('[class*="card"]').first();
  await expect(productCard).toBeVisible();
  await productCard.click();

  // 🔹 View Product button
  await page.getByRole('button', { name: /view product/i }).click();

  // 🔹 Request Quote again
  await page.getByRole('button', { name: /request (a )?quote/i }).click();

  // 🔹 Quote input again
  await expect(quoteInput).toBeVisible();
  await quoteInput.fill('Test 2');

  await page.getByRole('button', { name: /^add$/i }).click();

  // 🔹 Headings validation
  await visual.check('Empty quote page');

  await expect(
    page.getByRole('heading', { name: /request a quote/i })
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: /my quote cart/i })
  ).toBeVisible();

  // 🔹 FORM (HIGHLY STABLE – LABEL BASED)

  await page.getByLabel(/first name/i).fill('harish');
  await page.getByLabel(/last name/i).fill('kumar');
  await page.getByLabel(/email/i).fill('rahul.sharma@example.com');

  await page.getByLabel(/phone/i).fill('1234567890');
  await page.getByLabel(/company/i).fill('test_company');

  // 🔹 Country dropdown
  await page.getByLabel(/country/i).selectOption({ label: 'Germany' });

  // 🔹 Address
  await page.getByLabel(/address/i).fill('Friedrichstraße Berlin Germany');

  await page.getByLabel(/city/i).fill('Berlin');
  await page.getByLabel(/zip|postal/i).fill('10012');

  // 🔹 Checkbox
  await page.getByRole('checkbox').check();

  // 🔹 Submit
  await page.getByRole('button', { name: /submit quote/i }).click();

  // 🔹 Success validation (STRICT + STABLE)
  await expect(
    page.getByRole('heading', { name: /thank you/i })
  ).toBeVisible();

  await expect(
    page.getByText(/your quote request has been/i)
  ).toBeVisible();

});