import { test, expect } from '@playwright/test';

test('WE-04 Verify Empty Quote Cart Page with screenshots', async ({ page }) => {
  await page.goto('https://stage.lifesciences.danaher.com/');
  await page.screenshot({ path: '01_homepage.png' });

  await page.getByRole('button', { name: 'Accept All Cookies' }).click();
  await page.screenshot({ path: '02_cookies_accepted.png' });

  await page.getByRole('link', { name: 'Quote' }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.screenshot({ path: '03_quote_page.png' });

  await expect(page).toHaveURL('https://stage.lifesciences.danaher.com/us/en/quote-cart.html');
  await expect(page).toHaveTitle('Quote Cart | Danaher Life Sciences');
  await page.screenshot({ path: '04_quote_cart_verified.png' });

  await expect(page.getByRole('heading', { name: 'Your online quote cart is currently empty' })).toBeVisible();
  await page.screenshot({ path: '05_empty_cart.png' });

  // Example of commented-out request for quote steps, you can also add screenshots there if you enable them
  // await page.getByRole('button', { name: 'Request a Quote' }).click();
  // await page.screenshot({ path: '06_request_quote.png' });

  await expect(page.locator('fulllayout')).toContainText('Continue browsing our site');
  await page.screenshot({ path: '07_continue_browsing_text.png' });

  await page.getByRole('link', { name: 'Continue browsing our site' }).click();  
  await page.screenshot({ path: '08_back_to_home.png' });

  await expect(page).toHaveURL('https://stage.lifesciences.danaher.com/');
  await page.close();
});
