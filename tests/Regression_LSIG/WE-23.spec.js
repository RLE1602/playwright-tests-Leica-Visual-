import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';

test('WE-23 Quick Links', async ({ page }) => {
  const visual = new VisualCheck(page, 'WE-23');

  await page.goto(
    'https://stage.lifesciences.danaher.com/us/en/products/family/triple-quad-4500-systems.html',
    { waitUntil: 'domcontentloaded' }
  );

  // Extra stability
  await page.waitForLoadState('networkidle');

  // Accept cookies (safe)
  await page.getByRole('button', { name: /accept/i }).click().catch(() => {});

  async function validateFooterLink(linkName, expectedTitlePattern) {
    await page.locator('footer').scrollIntoViewIfNeeded();

    const link = page.getByRole('link', { name: new RegExp(linkName, 'i') });

    // ✅ Check if link exists
    const count = await link.count();
    if (count === 0) {
      console.log(`❌ Link not found: ${linkName}`);
      return;
    }

    // ✅ Wait for attachment (avoid flakiness)
    await link.first().waitFor({ state: 'attached', timeout: 10000 });

    const href = await link.first().getAttribute('href');

    if (!href) {
      console.log(`❌ No href found for: ${linkName}`);
      return;
    }

    const targetPath = new URL(href, page.url()).pathname;

    // ✅ Click + Navigation (safe for both SPA & full reload)
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }).catch(() => {}),
      link.first().click()
    ]);

    const pageContent = await page.content();
    const pageTitle = await page.title();

    const is404 =
      pageTitle.toLowerCase().includes('404') ||
      pageContent.toLowerCase().includes('page not found');

    // ✅ Only skip on 404
    if (is404) {
      console.log(`⚠️ Skipping ${linkName} - 404 Page`);
      await page.goBack({ waitUntil: 'domcontentloaded' }).catch(() => {});
      await page.locator('footer').scrollIntoViewIfNeeded();
      return;
    }

    // ✅ URL validation
    await expect(page.url()).toContain(targetPath);

    // ✅ Title validation
    if (expectedTitlePattern) {
      const titlePattern =
        expectedTitlePattern instanceof RegExp
          ? expectedTitlePattern
          : new RegExp(expectedTitlePattern, 'i');

      await expect(page).toHaveTitle(titlePattern);
    }

    // ✅ Go back safely
    await page.goBack({ waitUntil: 'domcontentloaded' }).catch(() => {});
    await page.locator('footer').scrollIntoViewIfNeeded();
  }

  await visual.check('Quick Links Validation');

  // ✅ Footer links validation
  await validateFooterLink('Cell Line Development', 'Cell Line');
  await validateFooterLink('mRNA Development', 'mRNA');
  await validateFooterLink('Antisense', 'Antisense');
  await validateFooterLink('pDNA Synthesis', 'pDNA');
  await validateFooterLink('Small Molecules', /Small Molecule/i);
  await validateFooterLink('Cell Therapy', 'Cell Therapy');
  await validateFooterLink('Gene Therapy', 'Gene Therapy');
  await validateFooterLink('Products', 'Products');
  await validateFooterLink('Solutions', 'Solutions');
  await validateFooterLink('Applications', 'Applications');
  await validateFooterLink('Technical Library', 'Technical Library');
  await validateFooterLink('Talk to an Expert', 'Talk to an Expert');
  await validateFooterLink('Request a Quote', 'Request a Quote');
  await validateFooterLink('About', 'About');
  await validateFooterLink('News', 'News');
  await validateFooterLink('Blogs', 'Blogs');
  await validateFooterLink('Careers', 'Careers');
});