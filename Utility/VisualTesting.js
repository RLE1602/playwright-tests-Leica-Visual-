import path from 'path';
import fs from 'fs';

export class VisualTesting {

  #page;
  #screenshotFolder;

  constructor(page, folderName) {
    this.#page = page;
    this.#screenshotFolder = path.join(process.cwd(), '..', '..', 'screenshots', folderName);

    if (!fs.existsSync(this.#screenshotFolder)) {
      fs.mkdirSync(this.#screenshotFolder, { recursive: true });
    }
  }

  /**
   * Run an action and capture a screenshot after it
   * @param {string} name - Screenshot name
   * @param {Function} fn - Action function to execute (async)
   */
  async action(name, fn) {
    // Run the action
    await fn();

    // Optional: wait a little for dynamic content (adjust as needed)
    await this.#page.waitForTimeout(500); // 0.5s delay

    // Take a screenshot
    const filePath = path.join(this.#screenshotFolder, `${name}.png`);
    await this.#page.screenshot({
      path: filePath,
      fullPage: true
    });
  }
}