import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';

test('UI Banner / Carousel Validation', async ({ page }) => {
  const visual = new VisualCheck(page, 'WE-24');

  // 1. Navigate
  await page.goto('YOUR_URL_HERE', {
    waitUntil: 'domcontentloaded'
  });

  // 2. Verify banner/hero section visible
  const banner = page.locator('section, .banner, .hero').first();
  await expect(banner).toBeVisible();

  // 3. Verify text content is present
  const textContent = page.locator('h1, h2, p').first();
  await expect(textContent).toBeVisible();

  // 4. Verify carousel indicators (dots)
  const dots = page.locator('[class*="dot"], [class*="indicator"], .slick-dots li');

  if (await dots.count() > 0) {

    const totalDots = await dots.count();
    console.log('Total slides:', totalDots);

    for (let i = 0; i < totalDots; i++) {
      const currentDot = dots.nth(i);

      await currentDot.scrollIntoViewIfNeeded();
      await currentDot.click();

      // Wait for slide transition
      await page.waitForTimeout(1000);

      // Validate active state (common pattern)
      await expect(currentDot).toHaveClass(/active|current|selected/i);
    }
  }

  // 5. Optional: Auto-slide validation
  const firstSlide = banner.locator('text=*').first().textContent();

  await page.waitForTimeout(3000);

  const secondSlide = banner.locator('text=*').first().textContent();

  if (firstSlide && secondSlide) {
    expect(firstSlide).not.toEqual(secondSlide);
  }

  // 6. Visual check (if you are using your helper)
  await visual.check('Banner UI');

});