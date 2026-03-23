import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';

test('WE-18 Verify Process Steps for Work Flow Solutions', async ({ page }) => {
  const visual = new VisualCheck(page, 'WE-18');

  await page.goto('https://stage.lifesciences.danaher.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 90000
  });

  // Accept cookies
  await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});
  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: 'Solutions', exact: true }).scrollIntoViewIfNeeded();
  await page.getByRole('link', { name: 'Solutions', exact: true }).click();
  await page.waitForLoadState('load');

  await page.getByText('Oligonucleotide Therapy', { exact: true }).click();
  await page.waitForLoadState('domcontentloaded');

  // ✅ FIXED (without changing flow)
  const antisenseLink = page
    .getByRole('link', { name: /Antisense Oligonucleotide Development and Manufacturing/i })
    .first();

  if (await antisenseLink.isVisible().catch(() => false)) {
    await antisenseLink.click();
  } else {
    await page
      .getByText(/Antisense Oligonucleotide Development and Manufacturing/i)
      .first()
      .click();
  }

  await page.waitForLoadState('domcontentloaded');

  await expect(
    page.locator('h1', {
      hasText: /Antisense Oligonucleotide Development and Manufacturing/i
    })
  ).toBeVisible();

  await page.waitForLoadState('domcontentloaded');
  await visual.check('Solutions page');

  await page.getByText(/process step/i).first().click();
  await page.waitForLoadState('domcontentloaded');

  await page.evaluate(() => window.scrollBy(0, 700));

  await expect(page.locator('body')).toContainText(/increase workflow reproducibility/i);

  await page.getByText(/laboratory automation/i).first().click();
  await page.waitForLoadState('domcontentloaded');

  await expect(page.locator('body')).toContainText(/gain critical insights/i);

  await page.getByText(/analytical tools/i).first().click();
  await page.waitForLoadState('domcontentloaded');

  await expect(page.locator('body')).toContainText(/enterprise-level workflow/i);
  await page.getByText(/digital solutions/i).first().click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('body')).toContainText(/leverage an extensive portfolio and accelerate Antisense/i);
  await page.locator('//h2[@id="all"]').click();
  await page.waitForLoadState('domcontentloaded');

  await page.evaluate(() => window.scrollBy(0, 800));
  await page.evaluate(() => window.scrollBy(0, 1000));
});