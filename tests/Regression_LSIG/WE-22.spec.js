import { test, expect } from '@playwright/test';

test('WE-22 Verify Legal Links in Footer Section', async ({ page }) => {

  // 1. Navigate
  await page.goto('https://stage.lifesciences.danaher.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 90000
  });
  await page.getByRole('button', { name: /accept/i }).click().catch(() => {});

  // Scroll to footer
  await page.locator('footer').scrollIntoViewIfNeeded();

  // 3. Verify Legal section
  await expect(page.getByText(/legal/i)).toBeVisible();

  // 4. Click Cookie Policy
  await page.getByRole('link', { name: /cookie policy/i }).click();

  // 5. Verify URL
  await expect(page).toHaveURL(/\/legal\/cookie/i);

  // 6. Verify page heading
  await expect(page.getByRole('heading', { name: /cookie policy/i })).toBeVisible();

  // 7. Go back
  await page.goBack();

  // Scroll again to footer (IMPORTANT)
  await page.locator('footer').scrollIntoViewIfNeeded();

  // 9. Click Do Not Sell or Share My Data
  await page.getByRole('link', { name: /do not sell or share my data/i }).click();

  // 10. Verify URL
  await expect(page).toHaveURL(/ccpa/i);

  // 11. Verify title
  await expect(page).toHaveTitle(/california consumer rights notice/i);

  // 12. Go back
  await page.goBack();

  // Scroll again
  await page.locator('footer').scrollIntoViewIfNeeded();

  // 13. Click Privacy Policy
  await page.getByRole('link', { name: /privacy policy/i }).click();

  // 14. Verify URL
  await expect(page).toHaveURL(/privacy/i);

  // 15. Verify title
  await expect(page).toHaveTitle(/privacy policy/i);

  // 16. Go back
  await page.goBack();

  // Scroll again
  await page.locator('footer').scrollIntoViewIfNeeded();

  // 17. Click Terms of Use
  await page.getByRole('link', { name: /terms of use/i }).click();

  // 18. Verify URL
  await expect(page).toHaveURL(/terms/i);

  // 19. Verify title
  await expect(page).toHaveTitle(/terms of use/i);

  // 20. Go back
  await page.goBack();

  // 21. Accept cookies (if visible again)
  await page.getByRole('button', { name: /accept/i }).click().catch(() => {});

  // 22. Click Cookie Settings
  await page.getByRole('button', { name: /cookie settings/i }).click();
  await page.waitForLoadState('domcontentloaded');
  // 24. Verify homepage URL
  await expect(page).toHaveURL(/lifesciences\.danaher\.com/);

  // 25. Verify title
  await expect(page).toHaveTitle(/danaher life sciences/i);

  // 26. Click Confirm My Choices
  await page.getByRole('button', { name: /confirm my choices/i }).click();

  // 27. Wait
  await page.waitForLoadState('domcontentloaded');

  // Final scroll (optional)
  await page.locator('footer').scrollIntoViewIfNeeded();
});