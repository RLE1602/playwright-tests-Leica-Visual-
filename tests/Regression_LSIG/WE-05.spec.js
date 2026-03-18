import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';

test('WE-05 Verify Talk to an Expert Widget', async ({ page }) => {

  const visual = new VisualCheck(page, 'WE-05');

  // 1. Navigate
  await page.goto('https://stage.lifesciences.danaher.com/', { waitUntil: 'domcontentloaded', timeout: 90000 });

  await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});
  await page.waitForLoadState('domcontentloaded');
  const [page1] = await Promise.all([
    page.getByRole('link', { name: 'Discover how we can help ->' }).click()
  ]);
  await page1.waitForLoadState('domcontentloaded');
  await page1.getByRole('button', { name: /accept/i }).first().click().catch(() => {});
  await visual.check('Talk to an Expert Widget');
  await expect(
    page1.getByText('Speak to one of our world-leading life sciences experts')
  ).toBeVisible();
  await page1.getByRole('textbox', { name: 'First_Name' }).fill('Mitali');
  await page1.getByRole('textbox', { name: 'Last_Name' }).fill('Himane');
  await page1.getByRole('textbox', { name: 'Email_Address' }).fill('mitali@yopmail.com');
  await page1.getByRole('textbox', { name: 'Company_Name' }).fill('DHLS');
  await page1.getByRole('textbox', { name: 'Postal_Code' }).fill('10001');
  await page1.locator('label').filter({ hasText: 'Select' }).first().click();
  await page1.getByText('Vice President', { exact: true }).click();
  await page1.locator('label').filter({ hasText: 'Select' }).click();
  await page1.getByText('United States').click();
  await page1.getByRole('textbox', { name: 'OpCo_Comments' }).fill('Not submitting the form');
  await page1.getByRole('checkbox', { name: 'Email_Opt_In' }).check();
  await page1.getByRole('checkbox', { name: 'SMS_Opt_In' }).check();
  await page1.getByRole('checkbox', { name: 'Phone_Opt_In' }).check();

});