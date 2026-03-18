// BrokenLinks.js
export async function checkBrokenLinks(page, url) {
  // If a URL is provided, navigate to it
  if (url) {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  // Get all HTTP/HTTPS links on the page
  const links = await page.$$eval('a', as =>
    as.map(a => a.href).filter(h => h && h.startsWith('http'))
  );

  // Check each link
  const broken = (await Promise.all(
    links.map(async link => {
      try {
        const res = await page.request.get(link); // Use page.request
        return res.status() >= 400 ? link : null;
      } catch {
        return link;
      }
    })
  )).filter(Boolean);

  console.log('❌ Broken links:', broken);
}