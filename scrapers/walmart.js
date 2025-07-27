const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1280, height: 800 },
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
  );

  try {
    console.log("Navigating to Walmart...");
    await page.goto('https://www.walmart.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    // Wait for the real selector
    await page.waitForSelector('input[type="search"]', { timeout: 15000 });

    const searchTerm = 'milk';

    console.log(`Typing search term: ${searchTerm}`);
    await page.type('input[type="search"]', searchTerm);
    await page.keyboard.press('Enter');

    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

    // Wait for results to load
    await page.waitForSelector('[data-item-id]', { timeout: 15000 });

    const results = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('[data-item-id]')).slice(0, 5);
      return items.map(item => {
        const name = item.querySelector('a span')?.textContent?.trim();
        const price = item.querySelector('span[class*="price"]')?.textContent?.trim();
        return { name, price };
      });
    });

    console.log("Results:", results);
  } catch (err) {
    console.error('Scraping failed:', err);
  } finally {
    await browser.close();
  }
})();
