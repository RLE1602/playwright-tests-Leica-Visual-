import { test, expect } from '@playwright/test';

test('WE-18 Verify Process Steps for Work Flow Solutions', async ({ page }) => {

  await page.goto('https://stage.lifesciences.danaher.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 90000
  });

  // Accept cookies
  await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});

  // Step 3: Click Solutions
  await page.getByRole('link', { name: /solutions/i }).click();

  // Step 4: Click Oligonucleotide Therapy
  await page.getByRole('link', { name: /oligonucleotide/i }).click();

  // Step 5: Click Antisense Oligonucleotide Development
  await page.getByRole('link', { name: /antisense/i }).click();

  // Step 6: Wait
  await page.waitForTimeout(10000);

  // Step 7: Scroll
  await page.mouse.wheel(0, 700);

  // Step 8: Verify heading
  await expect(page.getByText(/antisense oligonucleotide/i)).toBeVisible();

  // Step 9: Wait
  await page.waitForTimeout(5000);

  // Step 10: Click Process Step 1
  await page.getByText(/process step 1/i).click();

  // Step 11: Wait
  await page.waitForTimeout(3000);

  // Step 12: Select radio button
  await page.getByLabel(/all leverage/i).click();

  // Step 13: Scroll
  await page.mouse.wheel(0, 300);

  // Step 14: Scroll
  await page.mouse.wheel(0, 200);

  // Step 15: Click option
  await page.getByText(/increase workflow reproducibility/i).click();

  // Step 16: Select radio
  await page.getByLabel(/laboratory automation/i).click();

  // Step 17: Click option
  await page.getByText(/gain critical insights/i).click();

  // Step 18: Select radio
  await page.getByLabel(/analytical tools/i).click();

  // Step 19: Click option
  await page.getByText(/enterprise level workflow/i).click();

  // Step 20: Select radio
  await page.getByLabel(/digital solutions/i).click();

  // Step 21: Scroll
  await page.mouse.wheel(0, 1000);

  // Step 22: Scroll
  await page.mouse.wheel(0, 800);

});