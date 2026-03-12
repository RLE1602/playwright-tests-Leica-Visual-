const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

try {
  const jsonFile = path.join(process.cwd(), 'test-results.json');
  const previewsRoot = path.join(process.cwd(), 'previews');

  // 🔹 🔥 UPDATE THESE 3 VALUES
  const repoOwner = "RLE1602";
  const repoName = "playwright-tests";
  const commitHash = process.env.GITHUB_SHA;

  if (!fs.existsSync(jsonFile)) {
    console.warn('⚠ test-results.json not found. Excel will be empty.');
  }

  const data = fs.existsSync(jsonFile)
    ? JSON.parse(fs.readFileSync(jsonFile, 'utf-8'))
    : { suites: [] };

  const rows = [];

  // 🔥 Browser-aware screenshot finder
  function findLatestFailedScreenshot(specTitle, browser) {
    if (!fs.existsSync(previewsRoot)) return [];

    let screenshots = [];

    const walk = (dir) => {
      fs.readdirSync(dir).forEach((file) => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          walk(fullPath);
        } else if (
          file.includes(specTitle) &&
          file.includes(browser) &&
          (/^test-failed-\d+\.png$/.test(file) || /^test-finished-\d+\.png$/.test(file))
        ) {
          screenshots.push({
            fullPath,
            time: stat.mtimeMs
          });
        }
      });
    };

    walk(previewsRoot);

    if (screenshots.length === 0) return [];
    screenshots.sort((a, b) => b.time - a.time);
    return [screenshots[0].fullPath];
  }

  // 🔥 Generate rows
  data.suites?.forEach((suite) => {
    suite.specs?.forEach((spec) => {
      spec.tests?.forEach((test) => {

        const result = test.results?.[test.results.length - 1] || {};
        const failureLocation = result.error?.location;

        const testTitle = spec?.title ?? test?.title ?? 'Unknown_Test';
        const specTitle = spec.title || testTitle;

        const durationMin = result.duration
          ? (result.duration / 60000).toFixed(2)
          : '0.00';

        const previews = result.status === 'failed'
          ? findLatestFailedScreenshot(specTitle, test.projectName)
          : [];

        const mediaFullPath = previews.length ? previews[0] : '-';

        // 🔥 Determine Severity
        let severity = '-';
        if (result.status === 'failed' && result.error?.message) {
          const msg = result.error.message.toLowerCase();

          if (/404|not\s+found|page\s+could\s+not\s+be\s+found/i.test(msg)) {
            severity = 'High';
          } else if (/click|navigation|goto|load|redirect|timeout/i.test(msg)) {
            severity = 'Critical';
          } else if (/expect|match|assert|mismatch|validation/i.test(msg)) {
            severity = 'Medium';
          }
        }

        rows.push({
          Suite: "Regression_LSIG",
          Release: "43",
          Category: "LSIG-eCom",
          'Scenario Name': specTitle,
          'Step Number': failureLocation?.line ?? '-',
          Status: result.status || 'unknown',
          'Failed Step Description': result.error?.message || '-',
          'Duration (min)': durationMin,
          Retry: result.retry || 0,
          Browser: test.projectName || 'unknown',
          'Media Link': mediaFullPath,
          Severity: severity,
          'Execution Date': result.startTime
            ? new Date(result.startTime).toISOString().split('T')[0]
            : '-',
        });

      });
    });
  });

  // 🔥 Create workbook
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(rows, {
    header: [
      'Suite',
      'Release',
      'Category',
      'Scenario Name',
      'Step Number',
      'Status',
      'Failed Step Description',
      'Duration (min)',
      'Retry',
      'Browser',
      'Media Link',
      'Severity',
      'Execution Date'
    ]
  });

  // 🔥 Convert Media Links to GitHub RAW clickable links
  rows.forEach((row, index) => {
    if (row['Status'] === 'failed' && row['Media Link'] !== '-') {

      const cellAddress = `L${index + 2}`; // Correct column for Media Link

      const relativeRepoPath = path.relative(process.cwd(), row['Media Link']).replace(/\\/g, "/");

      const githubRawUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/${commitHash}/${relativeRepoPath}`;

      worksheet[cellAddress] = {
        t: 's',
        v: 'View Screenshot',
        l: { Target: githubRawUrl }
      };
    }
  });

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Test Report');

  const excelFile = path.join(process.cwd(), 'Playwright_Test_Report.xlsx');
  XLSX.writeFile(workbook, excelFile);

  console.log(`✅ Excel report generated: ${excelFile}`);

} catch (err) {
  console.error('❌ Excel generation failed:', err);
  console.log('⚠ Continuing workflow despite Excel failure');
}
