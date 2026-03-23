import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';
import fs from 'fs';
import path from 'path';

test('WE-16 Search and View Documents', async ({ page }) => {

  const visual = new VisualCheck(page, 'WE-16');

  await page.goto('https://stage.lifesciences.danaher.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 90000
  });

  await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});
  await page.waitForTimeout(1000);

  const searchInput = page.locator('//input[@placeholder="Search"]').first();

  // ✅ Validate PDF viewer
  async function validatePDF() {
    const pdfViewer = page.locator('iframe, embed, object');
    await expect(pdfViewer.first()).toBeVisible({ timeout: 10000 });
  }

  // ✅ NEW: Download + verify PDF
async function downloadAndVerify(fileName) {
    
    const iframe = page.locator('iframe[title="PDF Embed API"]');
    await iframe.waitFor({ state: 'visible' });

    let pdfUrl = await iframe.getAttribute('src');
    console.log('Raw iframe src:', pdfUrl);

    if (!pdfUrl) throw new Error('PDF URL not found');

    // Extract actual file if wrapped
    if (pdfUrl.includes('file=')) {
      const params = new URL(pdfUrl).searchParams;
      pdfUrl = params.get('file') || pdfUrl;
    }

    console.log('Final PDF URL:', pdfUrl);

    const response = await page.request.get(pdfUrl);
    const buffer = await response.body();

    // ✅ Create downloads folder if missing
    const dir = path.join(process.cwd(), 'downloads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, `${fileName}.pdf`);
    fs.writeFileSync(filePath, buffer);

    console.log('✅ File saved at:', filePath);

    // ✅ VALIDATIONS
    expect(buffer.length).toBeGreaterThan(1000); // file not empty
    expect(fs.existsSync(filePath)).toBeTruthy(); // file exists
  }

  // 🔹 1st Search
  await searchInput.fill('Clarity BioSolutions For Synthetic DNA/RNA');
  await page.keyboard.press('Enter');
  await page.waitForLoadState('domcontentloaded');

  let viewBtn = page.getByRole('button', { name: /view/i }).first();
  await viewBtn.click();

  await validatePDF();
  await downloadAndVerify('Clarity_DNA_RNA');

  await visual.check('PDF 1');

  // 🔹 2nd Search
  await page.goto('https://stage.lifesciences.danaher.com/');
  await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});

  await searchInput.fill('Zebron ZB-DHA-PONA Brochure');
  await page.keyboard.press('Enter');
  await page.waitForLoadState('domcontentloaded');

  viewBtn = page.getByRole('button', { name: /view/i }).first();
  await viewBtn.click();

  await validatePDF();
  await downloadAndVerify('Zebron_Brochure');

  await visual.check('PDF 2');

  // 🔹 3rd Search
  await page.goto('https://stage.lifesciences.danaher.com/');
  await page.getByRole('button', { name: /accept/i }).first().click().catch(() => {});

  await searchInput.fill('SpectraMax QuickDrop Micro Volume Spectrophotometer | Molecular Devices');
  await page.keyboard.press('Enter');
  await page.waitForLoadState('domcontentloaded');

  viewBtn = page.getByRole('button', { name: /view/i }).first();
  await viewBtn.click();

  await validatePDF();
  await downloadAndVerify('SpectraMax');

  await visual.check('PDF 3');

});