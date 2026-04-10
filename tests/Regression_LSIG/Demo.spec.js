import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://stage.lifesciences.danaher.com/');
  await page.waitForLoadState('domcontentloaded');
  await page.getByRole('button', { name: /accept/i }).click().catch(() => {});
  await page.waitForLoadState('domcontentloaded');
  await page.locator('//p[normalize-space()="Solutions"]').scrollIntoViewIfNeeded();

  await page.getByRole('link', { name: 'Cell Line Development' }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.goBack();
  await page.waitForLoadState('domcontentloaded');
  await page.locator('//p[normalize-space()="Solutions"]').scrollIntoViewIfNeeded();

  await page.getByRole('link', { name: 'mRNA Development' }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.goBack();
  await page.waitForLoadState('domcontentloaded');
  await page.locator('//p[normalize-space()="Solutions"]').scrollIntoViewIfNeeded();

  await page.getByRole('link', { name: 'Antisense Oligonucleotide' }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.goBack();
  await page.waitForLoadState('domcontentloaded');
  await page.locator('//p[normalize-space()="Solutions"]').scrollIntoViewIfNeeded();

  await page.getByRole('link', { name: 'pDNA Synthesis' }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.goBack();
  await page.waitForLoadState('domcontentloaded');
  await page.locator('//p[normalize-space()="Solutions"]').scrollIntoViewIfNeeded();

  await page.getByRole('link', { name: 'Small Molecules' }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.goBack();
  await page.waitForLoadState('domcontentloaded');
  await page.locator('//p[normalize-space()="Solutions"]').scrollIntoViewIfNeeded();

  await page.getByRole('link', { name: 'Cell Therapy' }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.goBack();
  await page.waitForLoadState('domcontentloaded');
  await page.locator('//p[normalize-space()="Solutions"]').scrollIntoViewIfNeeded();

  await page.getByRole('link', { name: 'Gene Therapy' }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.goBack();
  await page.waitForLoadState('domcontentloaded');
  await page.locator('//p[normalize-space()="Solutions"]').scrollIntoViewIfNeeded();

  await page.getByRole('link', { name: 'Products', exact: true }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.goBack();
  await page.waitForLoadState('domcontentloaded');
  await page.locator('//p[normalize-space()="Solutions"]').scrollIntoViewIfNeeded(); 

  await page.getByRole('link', { name: 'Solutions', exact: true }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.goBack();
  await page.waitForLoadState('domcontentloaded');
  await page.locator('//p[normalize-space()="Solutions"]').scrollIntoViewIfNeeded();

  await page.getByRole('link', { name: 'Applications' }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.goBack();
  await page.waitForLoadState('domcontentloaded');
  await page.locator('//p[normalize-space()="Solutions"]').scrollIntoViewIfNeeded();

  await page.getByRole('link', { name: 'Technical Library' }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.goBack();
  await page.waitForLoadState('domcontentloaded');
  await page.locator('//p[normalize-space()="Solutions"]').scrollIntoViewIfNeeded();

  await page.getByRole('contentinfo').locator('a').filter({ hasText: /^Talk to an Expert$/ }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.goBack();
  await page.waitForLoadState('domcontentloaded');
  await page.locator('//p[normalize-space()="Solutions"]').scrollIntoViewIfNeeded();

  await page.getByRole('link', { name: 'Request a Quote' }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.goBack();
  await page.waitForLoadState('domcontentloaded');
  await page.locator('//p[normalize-space()="Solutions"]').scrollIntoViewIfNeeded();

  await page.goto('https://stage.lifesciences.danaher.com/');
  await page.waitForLoadState('domcontentloaded');
  await page.goBack();
  await page.waitForLoadState('domcontentloaded');
  await page.locator('//p[normalize-space()="Solutions"]').scrollIntoViewIfNeeded();

  await page.getByRole('link', { name: 'About' }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.goBack();
  await page.waitForLoadState('domcontentloaded');
  await page.locator('//p[normalize-space()="Solutions"]').scrollIntoViewIfNeeded();

  await page.getByRole('link', { name: 'News' }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.goBack();
  await page.waitForLoadState('domcontentloaded');
  await page.locator('//p[normalize-space()="Solutions"]').scrollIntoViewIfNeeded();

  await page.getByRole('link', { name: 'Blog' }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.goBack();
  await page.waitForLoadState('domcontentloaded');
  await page.locator('//p[normalize-space()="Solutions"]').scrollIntoViewIfNeeded();

  await page.getByRole('link', { name: 'Careers' }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.goBack();
  await page.waitForLoadState('domcontentloaded');
  await page.locator('//p[normalize-space()="Solutions"]').scrollIntoViewIfNeeded();

});