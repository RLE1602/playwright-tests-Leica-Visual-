import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';

const BASE_URL = 'https://stage.lifescience.danaher.com/';

// Utility: Accept Cookies
async function acceptCookies(page) {
  const acceptBtn = page.getByRole('button', { name: /accept all cookies/i });
  if (await acceptBtn.isVisible().catch(() => false)) {
    await acceptBtn.click();
  }
}

// Utility: Scroll to Footer
async function scrollToFooter(page) {
  await page.locator('footer').scrollIntoViewIfNeeded();
}

// Utility: Validate Link
async function validateFooterLink(page, linkName, expectedUrlPart, expectedTitle) {
  await scrollToFooter(page);

  const link = page.getByRole('link', { name: new RegExp(linkName, 'i') });

  await expect(link).toBeVisible();

  await Promise.all([
    page.waitForLoadState('domcontentloaded'),
    link.click()
  ]);
  await visual.check('Quick Link');

  // URL validation
  await expect(page).toHaveURL(new RegExp(expectedUrlPart, 'i'));

  // Title validation (soft match)
  await expect(page).toHaveTitle(new RegExp(expectedTitle, 'i'));

  // Go back
  await page.goBack();
  await page.waitForLoadState('domcontentloaded');
}

test.describe('WE-23 Verify Footer Quick Links', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await acceptCookies(page);
  });

  test('Validate all footer quick links', async ({ page }) => {
  const visual = new VisualCheck(page, 'WE-23');

    // Cell Line Development
    await validateFooterLink(
      page,
      'Cell Line Development',
      'cell-line',
      'Cell Line'
    );

    // mRNA Development
    await validateFooterLink(
      page,
      'mRNA Development',
      'mrna',
      'mRNA'
    );

    // Antisense Oligonucleotide
    await validateFooterLink(
      page,
      'Antisense',
      'antisense',
      'Antisense'
    );

    // pDNA Synthesis
    await validateFooterLink(
      page,
      'pDNA',
      'pdna',
      'pDNA'
    );

    // Small Molecules
    await validateFooterLink(
      page,
      'Small Molecules',
      'small-molecule',
      'Small Molecule'
    );

    // Cell Therapy
    await validateFooterLink(
      page,
      'Cell Therapy',
      'cell-therapy',
      'Cell Therapy'
    );

    // Gene Therapy
    await validateFooterLink(
      page,
      'Gene Therapy',
      'gene-therapy',
      'Gene Therapy'
    );

    // Products
    await validateFooterLink(
      page,
      'Products',
      'products',
      'Products'
    );

    // Solutions
    await validateFooterLink(
      page,
      'Solutions',
      'solutions',
      'Solutions'
    );

    // Applications
    await validateFooterLink(
      page,
      'Applications',
      'applications',
      'Applications'
    );

    // Technical Library
    await validateFooterLink(
      page,
      'Technical Library',
      'library',
      'Library'
    );

    // Talk to an Expert
    await validateFooterLink(
      page,
      'Talk to an Expert',
      'expert',
      'Expert'
    );

    // Request a Quote
    await validateFooterLink(
      page,
      'Request a Quote',
      'quote',
      'Quote'
    );

    // About
    await validateFooterLink(
      page,
      'About',
      'about',
      'About'
    );

    // News
    await validateFooterLink(
      page,
      'News',
      'news',
      'News'
    );

    // Blogs
    await validateFooterLink(
      page,
      'Blog',
      'blog',
      'Blog'
    );

    // Careers
    await validateFooterLink(
      page,
      'Careers',
      'careers',
      'Careers'
    );

  });

});