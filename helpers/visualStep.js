const fs = require('fs');
const path = require('path');

/**
 * Wrap a step with automatic screenshot
 * @param {import('@playwright/test').Page} page
 * @param {string} stepName - descriptive name of the step
 * @param {function} stepFn - async function to run
 * @param {string} folder - folder to save screenshots
 */
async function visualStep(page, stepName, stepFn, folder) {
  if (folder && !fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  console.log(`➡️ Step: ${stepName}`);
  await stepFn();

  if (folder) {
    const fileName = stepName
      .replace(/\s+/g, '_')           // replace spaces with underscores
      .replace(/[^a-zA-Z0-9_-]/g, ''); // remove special characters
    const filePath = path.join(folder, `${fileName}.png`);
    await page.screenshot({ path: filePath });
  }
}

module.exports = { visualStep };