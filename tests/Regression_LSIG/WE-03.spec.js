// tests/Regression_LSIG/WE-03.spec.js
const { test, expect } = require('@playwright/test');
const path = require('path');
const { wrapPageForScreenshots } = require('../../helpers/screenshotHelper');

const baseURL = 'https://stage.lifesciences.danaher.com/';

// ---------------- Helper: Accept cookies ----------------
async function acceptCookies(page) {
  const acceptBtn = page.getByRole('button', { name: /Accept/i });
  if (await acceptBtn.isVisible().catch(() => false)) {
    await acceptBtn.click();
  }
}

// ---------------- Helper: Navigate to OpCo ----------------
async function navigateToOpCoAndVerifyURL(page, name, urlPattern) {
  const opcoLink = page.getByRole('link', { name });
  await expect(opcoLink).toBeVisible();
  await expect(opcoLink).toBeEnabled();

  await Promise.all([
    page.waitForLoadState('domcontentloaded', { timeout: 30000 }),
    opcoLink.click()
  ]);

  await acceptCookies(page);
  await page.locator('h1').first().waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
  await expect(page).toHaveURL(urlPattern);
}

// ---------------- Test ----------------
test('WE-03 Verify Each OpCo Link From Top Section', async ({ page }) => {
  // Use SCREENSHOT_DIR from workflow, fallback to local folder
  const screenshotFolder = process.env.SCREENSHOT_DIR || path.join(__dirname, '..', '..', 'screenshots', 'local_run');

  // Wrap page with screenshot proxy
  const autoPage = wrapPageForScreenshots(page, screenshotFolder);

  // Open homepage
  await autoPage.goto(baseURL);
  await acceptCookies(autoPage);

  // List of OpCos
  const opCos = [
    ['Abcam', /abcam\.com/],
    ['Beckman Coulter', /mybeckman/],
    ['Genedata', /genedata/],
    ['IDBS', /idbs/],
    ['Leica', /leica/],
    ['Molecular Devices', /moleculardevices/],
    ['Phenomenex', /phenomenex/],
    ['Sciex', /sciex/],
    ['Aldevron', /aldevron/],
    ['IDT', /idtdna/],
  ];

  for (const [name, urlPattern] of opCos) {
    // Navigate to OpCo and verify
    await navigateToOpCoAndVerifyURL(autoPage, name, urlPattern);

    // Return to homepage for next OpCo
    await autoPage.goto(baseURL);
    await acceptCookies(autoPage);
  }
});
