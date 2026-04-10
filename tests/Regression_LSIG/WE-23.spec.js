import { test } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';

test('Footer Links Navigation', async ({ page }) => {
    const visual = new VisualCheck(page, 'WE-24');

  await page.goto('https://stage.lifesciences.danaher.com/');
  await page.getByRole('button', { name: /accept/i }).click().catch(() => {});

  // Always scroll to footer
  async function scrollToFooter() {
    await page.locator('footer').scrollIntoViewIfNeeded();
  }

  // Click + go back
  async function clickAndBack(linkName) {
    await scrollToFooter();

    const link = page.locator('footer').getByRole('link', {
      name: new RegExp(linkName, 'i')
    });

    await link.scrollIntoViewIfNeeded();
    await link.first().click();

    await page.goBack({ waitUntil: 'domcontentloaded' }).catch(() => {});
  }

  // All footer links
  await visual.check('Footer Links Navigation');

  await clickAndBack('Cell Line Development');
  await clickAndBack('mRNA Development');
  await clickAndBack('Antisense');
  await clickAndBack('pDNA Synthesis');
  await clickAndBack('Small Molecules');
  await clickAndBack('Cell Therapy');
  await clickAndBack('Gene Therapy');
  await clickAndBack('Products');
  await clickAndBack('Solutions');
  await clickAndBack('Applications');
  await clickAndBack('Technical Library');
  await clickAndBack('Talk to an Expert');
  await clickAndBack('Request a Quote');
  await clickAndBack('About');
  await clickAndBack('News');
  await clickAndBack('Blog');
  await clickAndBack('Careers');
});