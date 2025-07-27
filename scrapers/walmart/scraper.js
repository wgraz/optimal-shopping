// walmartScraper.js
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
}

async function scrapeWalmart(searchTerm, zip) {
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: './walmart-user-data',
    args: ['--start-maximized'],
  });
  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
  );

  try {
    const searchUrl = `https://www.walmart.com/search?q=${encodeURIComponent(searchTerm)}`;
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded' });

    console.log(`Please manually set the store for ZIP code: ${zip}`);
    console.log('Press ENTER in the terminal after selecting the correct store...');

    await new Promise((resolve) => process.stdin.once('data', resolve));

    console.log('Scrolling to load more products...');
    await autoScroll(page);

    const results = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('[data-item-id]'));
      return items.map(item => {
        const name = item.querySelector('a span')?.textContent?.trim() || 'No name found';

        let price = 'No price found';
        const spans = item.querySelectorAll('span');
        for (const span of spans) {
          if (span.textContent && span.textContent.toLowerCase().startsWith('current price $')) {
            const match = span.textContent.match(/\$\d+(\.\d{2})?/);
            if (match) {
              price = match[0];
              break;
            }
          }
        }

        return { name, price };
      });
    });

    await browser.close();
    return results;
  } catch (err) {
    console.error('Scraping failed:', err);
    await browser.close();
    return null;
  }
}

// Only export, don't call
module.exports = scrapeWalmart;
