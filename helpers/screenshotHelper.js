const fs = require('fs');
const path = require('path');

function wrapPageForScreenshots(page, folder) {
  let step = 1;

  if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

  const actions = ['goto', 'click', 'fill', 'check', 'uncheck', 'selectOption', 'hover', 'press'];

  const proxy = new Proxy(page, {
    get(target, prop) {
      const orig = target[prop];
      if (typeof orig === 'function' && actions.includes(prop)) {
        return async (...args) => {
          const result = await orig.apply(target, args);
          const fileName = `${step.toString().padStart(2,'0')}_${prop}.png`;
          await target.screenshot({ path: path.join(folder, fileName), fullPage: true });
          step++;
          return result;
        };
      }
      return orig;
    }
  });

  const origLocator = page.locator.bind(page);
  proxy.locator = (selector, options) => {
    const loc = origLocator(selector, options);
    return new Proxy(loc, {
      get(targetLoc, prop) {
        const origFunc = targetLoc[prop];
        if (typeof origFunc === 'function' && actions.includes(prop)) {
          return async (...args) => {
            const result = await origFunc.apply(targetLoc, args);
            const fileName = `${step.toString().padStart(2,'0')}_${prop}.png`;
            await page.screenshot({ path: path.join(folder, fileName), fullPage: true });
            step++;
            return result;
          };
        }
        return origFunc;
      }
    });
  };

  return proxy;
}

module.exports = { wrapPageForScreenshots };
