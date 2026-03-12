import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

// Define folder for screenshots
const screenshotFolder = path.join(process.cwd(), '..', '..', 'screenshots', 'WE-04');

// Create folder if it doesn't exist
if (!fs.existsSync(screenshotFolder)) {
  fs.mkdirSync(screenshotFolder, { recursive: true });
}

test('WE-04 Verify Empty Quote Cart Page with screenshots', async ({ page }) => {
  await page.goto('https://stage.lifesciences.danaher.com/');
  await page.screenshot({ path: path.join(screenshotFolder, '01_homepage.png') });

  await page.getByRole('button', { name: 'Accept All Cookies' }).click();
  await page.screenshot({ path: path.join(screenshotFolder, '02_cookies_accepted.png') });

  await page.getByRole('link', { name: 'Quote' }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.screenshot({ path: path.join(screenshotFolder, '03_quote_page.png') });

  await expect(page).toHaveURL('https://stage.lifesciences.danaher.com/us/en/quote-cart.html');
  await expect(page).toHaveTitle('Quote Cart | Danaher Life Sciences');
  await page.screenshot({ path: path.join(screenshotFolder, '04_quote_cart_verified.png') });

  await expect(page.getByRole('heading', { name: 'Your online quote cart is currently empty' })).toBeVisible();
  await page.screenshot({ path: path.join(screenshotFolder, '05_empty_cart.png') });

  await expect(page.locator('fulllayout')).toContainText('Continue browsing our site');
  await page.screenshot({ path: path.join(screenshotFolder, '06_continue_browsing_text.png') });

  await page.getByRole('link', { name: 'Continue browsing our site' }).click();  
  await page.screenshot({ path: path.join(screenshotFolder, '07_back_to_home.png') });

  await expect(page).toHaveURL('https://stage.lifesciences.danaher.com/');
  await page.close();
});
