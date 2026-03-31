import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';

test('WE-22 Verify Legal Links in Footer Section', async ({ page }) => {
  const visual = new VisualCheck(page, 'WE-22');

  await page.goto('https://stage.lifesciences.danaher.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 90000
  });
  await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});
  const footer = page.locator('footer');
  await footer.scrollIntoViewIfNeeded();
  await expect(footer).toBeVisible();
  const cookiePolicy = footer.getByRole('link', { name: /cookie policy/i });
  await expect(cookiePolicy).toBeVisible();
  await cookiePolicy.click({ force: true });
  await expect(page).toHaveURL(/cookie/i);
  await page.goBack();
  await footer.scrollIntoViewIfNeeded();
  const dnsLink = footer.getByText('Do Not Sell or Share My Data', { exact: true });
  await expect(dnsLink).toBeVisible({ timeout: 10000 });
  await dnsLink.click({ force: true });
  await expect(page).toHaveURL(/ccpa|privacy/i);
  await page.goBack();
  await footer.scrollIntoViewIfNeeded();
  const privacyPolicy = footer.getByRole('link', { name: /privacy policy/i });
  //await expect(privacyPolicy).toBeVisible();
  await privacyPolicy.click({ force: true });
  await expect(page).toHaveURL(/privacy/i);
  await page.goBack();
  await footer.scrollIntoViewIfNeeded();
  const terms = footer.getByRole('link', { name: /terms of use/i });
  //await expect(terms).toBeVisible();
  await terms.click({ force: true });
  await expect(page).toHaveURL(/terms/i);
  await page.goBack();
  await footer.scrollIntoViewIfNeeded();
  const cookieSettings = footer.getByText(/cookie settings/i);
  if (await cookieSettings.isVisible()) {
    await cookieSettings.click({ force: true });
    const confirmBtn = page.getByRole('button', { name: /confirm/i });
    if (await confirmBtn.isVisible()) {
      await confirmBtn.click();
    }
  }
  await page.evaluate(() => window.scrollBy(0, 4950));
  await visual.check('Footer Legal Links');
});