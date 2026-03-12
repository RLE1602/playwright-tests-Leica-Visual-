// tests/Regression_LSIG/WE-03.spec.js
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const baseURL = 'https://stage.lifesciences.danaher.com/';

// ---------------- Helper: Accept cookies ----------------
async function acceptCookies(page) {
  const acceptBtn = page.getByRole('button', { name: /Accept/i });
  if (await acceptBtn.isVisible().catch(() => false)) {
    await page.click(acceptBtn);
  }
}

// ---------------- Helper: Navigate to OpCo ----------------
async function navigateToOpCoAndVerifyURL(page, name, urlPattern) {
  const opcoLink = page.getByRole('link', { name });
  await expect(opcoLink).toBeVisible();
  await expect(opcoLink).toBeEnabled();

  await Promise.all([
    page.waitForLoadState('domcontentloaded', { timeout: 30000 }),
    page.click(opcoLink)
  ]);

  await acceptCookies(page);
  await page.locator('h1').first().waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
  await expect(page).toHaveURL(urlPattern);
}

// ---------------- Proxy wrapper: Auto screenshot ----------------
function autoScreenshotPage(page, folder) {
  let step = 1;

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
    console.log(`✅ Screenshot folder created at: ${folder}`);
  }

  return new Proxy(page, {
    get(target, prop) {
      const orig = target[prop];
      if (typeof orig === 'function') {
        return async (...args) => {
          const result = await orig.apply(target, args);

          // Actions to capture automatically
          const actions = ['goto','click','fill','check','uncheck','selectOption','hover','press'];
          if (actions.includes(prop)) {
            const fileName = `${step.toString().padStart(2,'0')}_${prop}.png`;
            const filePath = path.join(folder, fileName);
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

// ---------------- Test ----------------
test('WE-03 Verify Each OpCo Link From Top Section', async ({ page }) => {
  // Use SCREENSHOT_DIR from workflow, fallback to local folder
  const screenshotFolder = process.env.SCREENSHOT_DIR || path.join(__dirname, '..', '..', 'screenshots', 'local_run');
  const autoPage = autoScreenshotPage(page, screenshotFolder);

  // Homepage step
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
    await navigateToOpCoAndVerifyURL(autoPage, name, urlPattern);

    // Return to homepage for next OpCo
    await autoPage.goto(baseURL);
    await acceptCookies(autoPage);
  }
});
