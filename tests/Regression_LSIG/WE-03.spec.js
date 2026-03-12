// tests/Regression_LSIG/WE-03.spec.js
const { test, expect } = require('@playwright/test');
const path = require('path');
const { visualStep } = require('../../helpers/visualStep');

const baseURL = 'https://stage.lifesciences.danaher.com/';

// ---------------- Helper: Accept cookies ----------------
async function acceptCookies(page) {
  const acceptBtn = page.getByRole('button', { name: /Accept/i });
  if (await acceptBtn.isVisible().catch(() => false)) {
    await visualStep(page, 'Click Accept Cookies', async () => {
      await acceptBtn.click();
    });
  }
}

// ---------------- Helper: Navigate to OpCo ----------------
async function navigateToOpCoAndVerifyURL(page, name, urlPattern) {
  const opcoLink = page.getByRole('link', { name });

  await visualStep(page, `Check visibility of ${name} link`, async () => {
    await expect(opcoLink).toBeVisible();
  });

  await visualStep(page, `Check enabled state of ${name} link`, async () => {
    await expect(opcoLink).toBeEnabled();
  });

  await visualStep(page, `Click ${name} link`, async () => {
    await Promise.all([
      page.waitForLoadState('domcontentloaded', { timeout: 30000 }),
      opcoLink.click()
    ]);
  });

  await acceptCookies(page);

  await visualStep(page, `Wait for h1 to be visible on ${name} page`, async () => {
    await page.locator('h1').first().waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
  });

  await visualStep(page, `Verify URL pattern for ${name}`, async () => {
    await expect(page).toHaveURL(urlPattern);
  });
}

// ---------------- Test ----------------
test('WE-03 Verify Each OpCo Link From Top Section', async ({ page }) => {
  // Use SCREENSHOT_DIR from workflow (previews branch folder)
  const screenshotFolder = process.env.SCREENSHOT_DIR || path.join(__dirname, '..', '..', 'screenshots', 'local_run');

  // Homepage step
  await visualStep(page, 'Open Homepage', async () => {
    await page.goto(baseURL);
    await acceptCookies(page);
  }, screenshotFolder); // pass folder explicitly

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
    await visualStep(page, `Navigate to ${name}`, async () => {
      await navigateToOpCoAndVerifyURL(page, name, urlPattern);
    }, screenshotFolder);

    await visualStep(page, `Return to Homepage after ${name}`, async () => {
      await page.goto(baseURL);
      await acceptCookies(page);
    }, screenshotFolder);
  }
});
