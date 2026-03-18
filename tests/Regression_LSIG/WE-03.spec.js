const { test, expect } = require('@playwright/test');
const { VisualCheck } = require('../../helpers/VisualCheck.js');

const baseURL = 'https://stage.lifesciences.danaher.com/';

test('WE-03 Verify Each OpCo Link From Top Section', async ({ page }) => {
  // Initialize VisualCheck helper for this test
  const visual = new VisualCheck(page, 'WE-03');

  // ---------------- Helper: Accept cookies ----------------
  async function acceptCookies() {
    const acceptBtn = page.getByRole('button', { name: /Accept/i });
    if (await acceptBtn.isVisible().catch(() => false)) {
      await acceptBtn.click();
    }
  }

  // ---------------- Helper: Navigate to OpCo ----------------
  async function navigateToOpCoAndVerifyURL(name, urlPattern) {
    const opcoLink = page.getByRole('link', { name });

    await expect(opcoLink).toBeVisible();
    await expect(opcoLink).toBeEnabled();

    await Promise.all([
      page.waitForLoadState('domcontentloaded', { timeout: 30000 }),
      opcoLink.click(),
    ]);

    await acceptCookies();

    await page.locator('h1').first().waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});

    await expect(page).toHaveURL(urlPattern);
  }

  // ---------------- Test Steps ----------------
  await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
  await acceptCookies({waitUntil: 'networkidle'});

  // Take single full-page visual check after homepage load
  await visual.check('Each_opco_full');

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
    await navigateToOpCoAndVerifyURL(name, urlPattern);

    // Return to homepage between OpCos
    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
    await acceptCookies();
  }
});