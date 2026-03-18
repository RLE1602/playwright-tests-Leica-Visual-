export async function checkBrokenImages(page, url) {
  // Navigate if URL is provided
  if (url) {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  // Collect all HTTP/HTTPS image src URLs
  const images = await page.$$eval('img', imgs =>
    imgs.map(img => img.src).filter(src => src && src.startsWith('http'))
  );

  // Check each image URL for broken status
  const broken = (await Promise.all(
    images.map(async src => {
      try {
        const res = await page.request.get(src); // Use page.request here
        return res.status() >= 400 ? src : null;
      } catch {
        return src;
      }
    })
  )).filter(Boolean);

  console.log('❌ Broken images:', broken);
}