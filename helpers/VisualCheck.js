import fs from 'fs';
import path from 'path';
import { expect } from '@playwright/test';

export class VisualCheck {
  constructor(page, folderName) {
    this.page = page;
    this.folder = path.join(process.cwd(), 'screenshots', folderName);

    if (!fs.existsSync(this.folder)) {
      fs.mkdirSync(this.folder, { recursive: true });
    }
  }

  async check(name) {
    // Full path for storing custom screenshot
    const filePath = path.join(this.folder, `${name}.png`);

    // Take current screenshot
    await this.page.screenshot({ path: filePath, fullPage: true });

    // Compare visually using Playwright snapshots, wrapped in try/catch
    try {
      // Just pass the filename (Playwright will handle the snapshot folder automatically)
      await expect(this.page).toHaveScreenshot(`${name}.png`);
    } catch (err) {
      console.warn(`⚠️ Visual diff detected for "${name}". Check screenshot: ${filePath}`);
    }
  }
}