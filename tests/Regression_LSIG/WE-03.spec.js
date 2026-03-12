const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const baseURL = 'https://stage.lifesciences.danaher.com/';

async function acceptCookies(page) {
  const acceptBtn = page.getByRole('button', { name: /Accept/i });
  if (await acceptBtn.isVisible().catch(() => false)) {
    await acceptBtn.click();
  }
}

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

// Proxy wrapper for auto screenshots
function autoScreenshotPage(page, runFolder) {
  let step = 1;

  if (!fs.existsSync(runFolder)) {
    fs.mkdirSync(runFolder, { recursive: true });
    console.log(`Created screenshot folder: ${runFolder}`);
  }

  return new Proxy(page, {
    get(target, prop) {
      const orig = target[prop];
      if (typeof orig === 'function') {
        return async (...args) => {
          const result = await orig.apply(target, args);
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

test('WE-03 Verify Each OpCo Link From Top Section', async ({ page }) => {
  // Create unique folder in project root
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const runFolder = path.join(process.cwd(), 'screenshots', `run_${timestamp}`);

  const autoPage = autoScreenshotPage(page, runFolder);

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
    await autoPage.goto(baseURL);
    await acceptCookies(autoPage);
  }
});
