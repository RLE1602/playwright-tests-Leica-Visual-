import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';

test('WE-12 Verify Resources Menu Link for News', async ({ page }) => {
  const visual = new VisualCheck(page, 'WE-12');
  await page.goto('https://stage.lifesciences.danaher.com/', { waitUntil: 'domcontentloaded', timeout: 90000 });

  await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});
  await page.waitForTimeout(1000);
  // await page.evaluate(() => { document.body.style.overflow = 'auto'; document.documentElement.style.overflow = 'auto'; });
  // await page.evaluate(() => { window.scrollTo(0, 0);});

  await page.getByRole('link', { name: /resources/i }).scrollIntoViewIfNeeded();
  await page.getByRole('link', { name: /resources/i }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.getByRole('link', { name: /news/i }).click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('body')).toContainText(/news/i);
  await visual.check('News page');
  await page.waitForURL('**/news.html');
  await page.click('text=Automation');
  await page.click('text=Molecular Devices announces ValitaTiter');
  await expect(page.locator('body')).toContainText('Molecular Devices announces ValitaTiter IgG quantitation');
  await page.click('text=Back to news');
  await Promise.all([page.waitForLoadState('domcontentloaded'), page.locator('text=Next').last().click()]);
  await page.click('text=SCIEX Launches new Biopharma Characterization Products');
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('body')).toContainText('SCIEX Launches new Biopharma Characterization Products');
  await page.click('text=Back to news');
  await Promise.all([page.waitForLoadState('domcontentloaded'), page.locator('text=Next').last().click()]);
  await Promise.all([page.waitForLoadState('domcontentloaded'), page.locator('text=Next').last().click()]);
  await page.click('text=Landmark Bio opens advanced therapy manufacturing plant in MA');
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('body')).toContainText('Landmark Bio opens advanced therapy manufacturing plant in MA');
  await page.waitForLoadState('domcontentloaded');

});