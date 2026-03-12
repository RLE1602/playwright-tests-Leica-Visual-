const { argosScreenshot } = require('@argos-ci/playwright');

async function visualStep(page, name, stepFunc) {
  await stepFunc();
  await argosScreenshot(page, name);
}

module.exports = { visualStep };