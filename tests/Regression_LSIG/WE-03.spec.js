const { test, expect } = require('@playwright/test');
const { visualStep } = require('../../helpers/visualStep'); // adjust path
const baseURL = 'https://stage.lifesciences.danaher.com/';

// Accept cookies if visible
async function acceptCookies(page) {
  const acceptBtn = page.getByRole('button', { name: /Accept/i });
  if (await acceptBtn.isVisible().catch(() => false)) {
    await acceptBtn.click();
  }
}

// Navigate to OpCo and verify page loaded + URL
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

// Test
test('WE-03 Verify Each OpCo Link From Top Section', async ({ page }) => {
  // Homepage step
  await visualStep(page, 'Homepage', async () => {
    await page.goto(baseURL);
    await acceptCookies(page);
  });

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
    await visualStep(page, `Navigate ${name}`, async () => {
      await navigateToOpCoAndVerifyURL(page, name, urlPattern);
    });

    // Return to homepage between OpCos
    await visualStep(page, `Homepage after ${name}`, async () => {
      await page.goto(baseURL);
      await acceptCookies(page);
    });
  }
});