import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';

test('WE-05 Verify Talk to an Expert Widget', async ({ page }) => {

  const visual = new VisualCheck(page, 'WE-05');

  // 1. Navigate
  await page.goto('https://stage.lifesciences.danaher.com/', { waitUntil: 'domcontentloaded', timeout: 90000 });

  await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});
  await page.waitForTimeout(1000);
  await page.waitForLoadState('domcontentloaded');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.locator('//span[normalize-space()="Talk to an Expert"]').click();
  await page.waitForLoadState('domcontentloaded');
  await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});
  await visual.check('Talk to an Expert Widget');
  await expect(
    page.getByText('Speak to one of our world-leading life sciences experts')
  ).toBeVisible();
  await page.getByRole('textbox', { name: 'First_Name' }).fill('Mitali');
  await page.getByRole('textbox', { name: 'Last_Name' }).fill('Himane');
  await page.getByRole('textbox', { name: 'Email_Address' }).fill('mitali@yopmail.com');
  await page.getByRole('textbox', { name: 'Company_Name' }).fill('DHLS');
  await page.getByRole('textbox', { name: 'Postal_Code' }).fill('10001');
  await page.locator('label').filter({ hasText: 'Select' }).first().click();
  await page.getByText('Vice President', { exact: true }).click();
  await page.locator('label').filter({ hasText: 'Select' }).click();
  await page.getByText('United States').click();
  await page.getByRole('textbox', { name: 'OpCo_Comments' }).fill('Not submitting the form');
  await page.getByRole('checkbox', { name: 'Email_Opt_In' }).check();
  await page.getByRole('checkbox', { name: 'SMS_Opt_In' }).check();
  await page.getByRole('checkbox', { name: 'Phone_Opt_In' }).check();
});