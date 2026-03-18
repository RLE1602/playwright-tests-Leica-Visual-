import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';
import { checkBrokenLinks } from '../../helpers/BrokenLinks';
import { checkBrokenImages } from '../../helpers/BrokenImages';

test('WE-12 Verify Resources Menu Link for News', async ({ page }) => {

    const visual = new VisualCheck(page, 'WE-12');

  // Navigate to base URL first if needed
  await page.goto('https://stage.lifesciences.danaher.com/us/en');

  // Click on Resources Button2
  await page.click('text=Resources');

  // Click on News1
  await page.click('text=News');

  // Wait for News page to load
  await page.waitForURL('**/news.html');

  // Find all broken links (basic check: ensure links are visible)
  const links = await page.locator('a').all();
  for (const link of links) {
    const href = await link.getAttribute('href');
    expect(href).not.toBeNull();
  }

  await visual.check('News page');

  // Click on Automation
  await page.click('text=Automation');

  // Click on “Molecular Devices announces ValitaTiter..”
  await page.click('text=Molecular Devices announces ValitaTiter');

  // Verify page content
  await expect(page.locator('body')).toContainText(
    'Molecular Devices announces ValitaTiter IgG quantitation'
  );

  // Click Back to news
  await page.click('text=Back to news');

  // Click on “SCIEX and Evosep Expand Access to Sta...”
  await page.click('text=SCIEX and Evosep Expand Access');

  // Go back
  await page.click('text=Back to news');

  // Click on SCIEX3
  await page.click('text=SCIEX');

  // Verify final page content
  await expect(page.locator('body')).toContainText(
    'Software Launches for SCIEX OS Ecosystem To Help Scient'
  );
});