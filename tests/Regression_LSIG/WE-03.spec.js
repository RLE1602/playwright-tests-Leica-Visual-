import { test, expect } from '@playwright/test';
import { VisualCheck } from '../../helpers/VisualCheck.js';

const baseURL = 'https://stage.lifesciences.danaher.com/';

async function acceptCookies(page) {
  await page.getByRole('button', { name: /accept|agree/i })
    .first()
    .click()
    .catch(() => {});
}

test('WE-03 Validate all OpCo links and titles', async ({ page, context }) => {

  test.setTimeout(300000); // 5 min max safety

  const visual = new VisualCheck(page, 'WE-03');

  await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
  await acceptCookies(page);
  await page.waitForTimeout(1000);


  const opcos = [
    { name: 'abcam', title: /abcam/i },
    { name: 'beckman coulter', title: /beckman/i },
    { name: 'genedata', title: /genedata/i },
    { name: 'idbs', title: /idbs/i },
    { name: 'leica', title: /leica/i },
    { name: 'molecular devices', title: /molecular/i },
    { name: 'phenomenex', title: /phenomenex/i },
    { name: 'sciex', title: /sciex/i },
    { name: 'aldevron', title: /aldevron/i },
    { name: 'idt', title: /idt/i }
  ];

  // 🔹 Extract URLs first
  const opcoData = [];

  for (const opco of opcos) {
    const link = page.getByRole('link', { name: new RegExp(opco.name, 'i') }).first();

    await expect(link).toBeVisible();

    const href = await link.getAttribute('href');

    if (href) {
      opcoData.push({
        name: opco.name,
        title: opco.title,
        url: href.startsWith('http') ? href : `${baseURL}${href}`
      });
    }
  }

  // 🔹 Validate each OpCo
  for (const opco of opcoData) {

    console.log(`➡️ Checking: ${opco.name}`);

    const newPage = await context.newPage();
    const opcoVisual = new VisualCheck(newPage, `WE-03-${opco.name}`); // ✅ per OpCo

    try {
      await newPage.goto(opco.url, {
        waitUntil: 'commit',
        timeout: 60000
      });

      await acceptCookies(newPage);

      // Title validation
      await expect.soft(newPage).toHaveTitle(opco.title);

      // Visual check per OpCo page
      await opcoVisual.check(`OpCo - ${opco.name}`);

    } catch (err) {
      console.log(`❌ Failed: ${opco.name}`);
    } finally {
      await newPage.close();
    }
  }

});