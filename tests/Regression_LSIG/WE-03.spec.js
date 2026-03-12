// tests/opco-links.spec.js
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const baseURL = 'https://stage.lifesciences.danaher.com/';

// ---------------- Helper: Accept cookies ----------------
async function acceptCookies(page) {
  const acceptBtn = page.getByRole('button', { name: /Accept/i });
  if (await acceptBtn.isVisible().catch(() => false)) {
    await acceptBtn.click();
  }
}

// ---------------- Helper: Navigate to OpCo ----------------
async function navigateToOpCoAndVerifyURL(page, name, urlPattern) {
  const opcoLink = page.getByRole('link', { name });
  await expect(opcoLink).toBeVisible();
  await expect(opcoLink).toBeEnabled();

  await Promise.all([
    page.waitForLoadState('domcontentloaded', { timeout: 30000 }),
    opcoLink.click()
  ]);

  await acceptCookies(page);
  await page.locator('h1').first().waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
  await expect(page).toHaveURL(urlPattern);
}

// ---------------- Helper: Auto screenshot wrapper ----------------
function autoScreenshotPage(page, runFolder) {
  let step = 1;

  // Ensure the folder exists
  if (!fs.existsSync(runFolder)) {
    fs.mkdirSync(runFolder, { recursive: true });
  }

  return new Proxy(page, {
    get(target, prop) {
      const orig = target[prop];
      if (typeof orig === 'function') {
        return async (...args) => {
          const result = await orig.apply(target, args);

          // Actions to capture screenshots for
          const actions = ['goto','click','fill','check','uncheck','selectOption','hover','press'];
          if (actions.includes(prop)) {
            const fileName = `${step.toString().padStart(2,'0')}_${prop}.png`;
            const filePath = path.join(runFolder, fileName);
            await target.screenshot({ path: filePath, fullPage: true });
            console.log(`Screenshot saved: ${filePath}`);
            step += 1;
          }

          return result;
        };
      }
      return orig;
    }
  });
}

// ---------------- Playwright Test ----------------
test('WE-03 Verify Each OpCo Link From Top Section', async ({ page }) => {
  // Create a unique folder for this test run using timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const runFolder = path.join(process.cwd(), 'screenshots', `run_${timestamp}`);

  // Wrap page with auto-screenshot proxy
  const autoPage = autoScreenshotPage(page, runFolder);

  // Open homepage
  await autoPage.goto(baseURL);
  await acceptCookies(autoPage);

  const opCos = [
    ['Abcam', /abcam\.com/],
    ['Beckman Coulter', /mybeckman/],
    ['Genedata', /genedata/],
    ['IDBS', /idbs/],
    ['Leica', /leica/],
    ['Molecular Devices', /moleculardevices/],
    ['Phenomenex', /phenomenex/],
    ['Sciex', /sciex/],
    ['Aldevron', /aldevron/],
    ['IDT', /idtdna/],
  ];

  for (const [name, urlPattern] of opCos) {
    // Navigate to OpCo page and verify
    await navigateToOpCoAndVerifyURL(autoPage, name, urlPattern);

    // Return to homepage for next OpCo
    await autoPage.goto(baseURL);
    await acceptCookies(autoPage);
  }
});
