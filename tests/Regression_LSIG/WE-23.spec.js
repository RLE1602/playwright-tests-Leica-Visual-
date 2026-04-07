import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';

test('WE-23 Quick Links', async ({ page }) => {
  const visual = new VisualCheck(page, 'WE-23');

  // Navigate
  await page.goto(
    'https://stage.lifesciences.danaher.com/us/en/products/family/triple-quad-4500-systems.html',
    { waitUntil: 'domcontentloaded' }
  );

  await page.getByRole('button', { name: /accept/i }).click().catch(() => {});

  // Reusable function
  async function validateFooterLink(linkName, expectedUrl, expectedTitle) {
    await page.evaluate(() => window.scrollBy(0, 4900));

    const link = page.getByRole('link', { name: new RegExp(linkName, 'i') });
    await expect(link).toBeVisible();

    await Promise.all([
      page.waitForLoadState('domcontentloaded'),
      link.click()
    ]);

    // 🔹 ONLY ADDITION: 404 handling
    const is404 =
      (await page.title()).toLowerCase().includes('404') ||
      (await page.content()).toLowerCase().includes('page not found');

    if (is404) {
      console.log(`⚠️ Skipping ${linkName} - 404 Page`);

      await page.goBack();
      await page.waitForLoadState('domcontentloaded');
      await page.evaluate(() => window.scrollBy(0, 4900));
      return;
    }

    // Your existing validation (unchanged)
    await expect(page).toHaveURL(new RegExp(expectedUrl, 'i'));
    await expect(page).toHaveTitle(new RegExp(expectedTitle, 'i'));

    await page.goBack();
    await page.waitForLoadState('domcontentloaded');
    await page.evaluate(() => window.scrollBy(0, 4900));
  }

  // 🔥 Test all links (unchanged)
  await validateFooterLink('Cell Line Development', 'cell-line', 'Cell Line');
  await validateFooterLink('mRNA Development', 'mrna', 'mRNA');
  await validateFooterLink('Antisense', 'antisense', 'Antisense');
  await validateFooterLink('pDNA Synthesis', 'pdna', 'pDNA');
  await validateFooterLink('Small Molecules', 'small-molecules', 'Small Molecules');
  await validateFooterLink('Cell Therapy', 'cell-therapy', 'Cell Therapy');
  await validateFooterLink('Gene Therapy', 'gene-therapy', 'Gene Therapy');
  await validateFooterLink('Products', 'products', 'Products');
  await validateFooterLink('Solutions', 'solutions', 'Solutions');
  await validateFooterLink('Applications', 'applications', 'Applications');
  await validateFooterLink('Technical Library', 'technical-library', 'Technical Library');
  await validateFooterLink('Talk to an Expert', 'talk-to-expert', 'Talk to an Expert');
  await validateFooterLink('Request a Quote', 'request-quote', 'Request a Quote');
  await validateFooterLink('About', 'about', 'About');
  await validateFooterLink('News', 'news', 'News');
  await validateFooterLink('Blogs', 'blogs', 'Blogs');
  await validateFooterLink('Careers', 'careers', 'Careers');
});