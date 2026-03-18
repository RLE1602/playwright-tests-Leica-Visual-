import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';


test('WE-05 Verify Talk to an Expert Widget', async ({ page }) => {

  const visual = new VisualCheck(page, 'WE-05');

  // 1. Navigate
  await page.goto('https://stage.lifesciences.danaher.com/');

  // 2. Accept cookies (if visible)
  await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});

  // 3. Click "Talk to an Expert"
  await page.getByRole('button', { name: /talk to an expert/i }).click();

  // 4. Accept cookies again (if popup appears)
  await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});

  // 5. Verify text
  await expect(page.getByText('Speak to one of our world-leading life sciences experts'))
    .toBeVisible();
  await visual.check('Talk to an Expert Widget');

  // 6. Fill form fields
  await page.getByLabel(/first name/i).fill('mitali');
  await page.getByLabel(/last name/i).fill('himane');
  await page.getByLabel(/email/i).fill('mithali.himane@dhlscontractors.com');
  await page.getByLabel(/phone/i).fill('238-732-8788');
  await page.getByLabel(/company/i).fill('Test_company');
  await page.getByLabel(/zip|postal/i).fill('60612');

  // 7. Select Job Level
  await page.getByRole('combobox').nth(0).click();
  await page.getByRole('option', { name: /vice president/i }).click();

  // 8. Select Country
  await page.getByRole('combobox').nth(1).click();
  await page.getByRole('option', { name: /united states/i }).click();

  // 9. Enter comments
  await page.getByLabel(/comments|opco_comments/i).fill('Regression testing');

});