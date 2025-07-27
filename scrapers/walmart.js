const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

async function scrapeWalmart(searchTerm) {
  const browser = await puppeteer.launch({
    headless: true,
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

    // Wait for the search input and type the term
    await page.waitForSelector('input[type="search"]', { timeout: 15000 });

    console.log(`Typing search term: ${searchTerm}`);
    await page.click('input[type="search"]', { clickCount: 3 }); // select existing text if any
    await page.type('input[type="search"]', searchTerm);
    await page.keyboard.press('Enter');

    // Wait for navigation and results container
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    await page.waitForSelector('[data-item-id]', { timeout: 15000 });

    // Scrape top 5 results
    // ... after waiting for results selector

const results = await page.evaluate(() => {
  const items = Array.from(document.querySelectorAll('[data-item-id]')).slice(0, 5);

  return items.map(item => {
    const name = item.querySelector('a span')?.textContent?.trim() || 'No name found';

    // Find any span inside the item that contains text starting with "current price $"
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

    console.log("Results:", results);

  } catch (err) {
    console.error('Scraping failed:', err);
  } finally {
    await browser.close();
  }
}

scrapeWalmart('milk');
