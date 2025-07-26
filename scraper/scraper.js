const { flushAllTraces } = require("next/dist/trace");
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true }); // Change to false to see the browser
  const page = await browser.newPage();

  // Go to Kroger on Instacart (example URL)
  await page.goto("https://www.instacart.com/store/kroger/storefront");

  // Wait for products to load (adjust selector if needed)
  await page.waitForSelector("[data-testid='product-card']");

  // Extract product info
  const products = await page.$$eval("[data-testid='product-card']", (cards) =>
    cards.map((card) => {
      const name = card.querySelector("[data-testid='product-name']")?.textContent.trim() || "";
      const price = card.querySelector("[data-testid='product-price']")?.textContent.trim() || "";
      return { name, price };
    })
  );

  console.log(products);

  await browser.close();
})();
