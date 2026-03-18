import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';
import { checkBrokenLinks } from '../../helpers/BrokenLinks';
import { checkBrokenImages } from '../../helpers/BrokenImages';

test('WE-11 Verify Resources Menu Links for Blog', async ({ page }) => {
    const visual = new VisualCheck(page, 'WE-11');
  

  await page.goto('https://stage.lifesciences.danaher.com/', { waitUntil: 'domcontentloaded' , timeout: 90000 });
  await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});
  await page.waitForLoadState('domcontentloaded', { timeout: 120000 });
  await page.getByRole('link', { name: /resources/i }).click();
  await page.getByRole('link', { name: /blog/i }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});
  await expect(page.locator('body')).toContainText('Blog');
  await checkBrokenLinks(page);
  await checkBrokenImages(page);
  
  await visual.check('Blog page');

  // // 🔹 Cell Line Development
  // await page.getByText('Cell Line Development').first().click();
  // await page.waitForLoadState('domcontentloaded');
  // await expect(page.locator('body')).toContainText('Cell Line Development');

  // await page.getByText('View All Topics').first().click();

  // await page.getByText('Monoclonal Antibodies').click();
  // await page.waitForLoadState('domcontentloaded');
  // await expect(page.locator('body')).toContainText('Monoclonal Antibodies');

  // await page.getByText('View All Topics').first().click();

  // await page.getByText('Streamlining Time-Intensive Processes').first().click();
  // await page.waitForLoadState('domcontentloaded');

  // await page.getByRole('heading', { name: /Streamlining Time-Intensive/i }).click();

  // await page.getByText('Back to blog').click();
  // await page.waitForLoadState('domcontentloaded');

  // // 🔹 Going from Bench to Bedside
  // await page.getByText('Going from Bench to Bedside').first().click();
  // await page.waitForLoadState('domcontentloaded');

  // await page.getByRole('heading', { name: /Going from Bench to Bedside/i }).click();

  // await page.getByText('Back to blog').click();
  // await page.waitForLoadState('domcontentloaded');

  // // 🔹 Breaking the Bottlenecks
  // await page.getByText('Breaking the Bottlenecks').first().click();
  // await page.waitForLoadState('domcontentloaded');

  // await page.getByRole('heading', { name: /Breaking the Bottlenecks/i }).click();
  await page.getByText('View All Topics').first().click();

  await page.getByText('Data Solutions').click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('body')).toContainText('Data Solutions');

  await page.getByText('View All Topics').first().click();

  await page.getByText('AI Takes On Drug Discovery').first().click();
  await page.waitForLoadState('domcontentloaded');

  await page.getByRole('heading', { name: /AI Takes On Drug Discovery/i }).click();

  await page.getByText('Back to blog').click();
  await page.waitForLoadState('domcontentloaded');

  await Promise.all([page.waitForLoadState('domcontentloaded'), page.locator('text=Next').last().click()]);

  await page.getByText('mRNA Vaccines: The Story So Far… and the Path Ahead').first().click();
  await page.waitForLoadState('domcontentloaded');

  await page.getByRole('heading', { name: /mRNA Vaccines: The Story So Far… and the Path Ahead/i }).click();

  await page.getByText('Back to blog').click();
  await page.waitForLoadState('domcontentloaded');

  await page.getByText('The Role of CoAs in Supplier Oversight').first().click();
  await page.waitForLoadState('domcontentloaded');

  await page.getByRole('heading', { name: /The Role of CoAs in Supplier Oversight/i }).click();

});