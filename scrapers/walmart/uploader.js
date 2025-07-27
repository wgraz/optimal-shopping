// uploader.js
import { db } from '../../lib/firebase.js';
import {
  doc,
  setDoc,
  getDoc,
  Timestamp,
} from 'firebase/firestore';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const scrapeWalmart = require('../walmart/scraper.js');

// Sanitize a string to be a valid Firestore doc ID (no slashes, no special chars)
function sanitizeId(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '_')          // spaces to underscores
    .replace(/[^a-z0-9_]/g, '');  // remove anything not alphanumeric or underscore
}

async function uploadScrapedData(searchTerm, storeName, zipCode) {
  const storeId = sanitizeId(`${storeName}_${zipCode}`);

  let productResults;
  try {
    productResults = await scrapeWalmart(searchTerm, zipCode);
    if (!Array.isArray(productResults)) {
      throw new Error('Scraper did not return an array');
    }
  } catch (err) {
    console.error('Error during scraping:', err);
    return;
  }

  // 1. Ensure the store exists
  try {
    const storeRef = doc(db, 'stores', storeId);
    const storeSnap = await getDoc(storeRef);
    if (!storeSnap.exists()) {
      await setDoc(storeRef, {
        name: storeName,
        zipCode,
      });
      console.log(`✅ Created store: ${storeId}`);
    }
  } catch (err) {
    console.error(`Failed to create or get store ${storeId}:`, err);
  }

  for (const result of productResults) {
    try {
      const productName = result.name;
      if (!productName) {
        console.warn('Product missing name, skipping:', result);
        continue;
      }

      let productPrice = parseFloat(result.price.replace('$', ''));
      if (isNaN(productPrice)) {
        console.warn('Invalid price for product, skipping:', result);
        continue;
      }

      const productId = sanitizeId(productName);

      // 2. Ensure the product exists
      try {
        const productRef = doc(db, 'products', productId);
        const productSnap = await getDoc(productRef);
        if (!productSnap.exists()) {
          await setDoc(productRef, {
            name: productName,
            keywords: [productName.toLowerCase()],
          });
          console.log(`✅ Created product: ${productId}`);
        }
      } catch (err) {
        console.error(`Failed to create or get product ${productId}:`, err);
        continue;
      }

      // 3. Upload price info
      try {
        const priceId = sanitizeId(`${productId}_${storeId}`);
        const priceRef = doc(db, 'prices', priceId);
        await setDoc(priceRef, {
          price: productPrice,
          currency: 'USD',
          lastUpdated: Timestamp.now(),
          productId: productId,
          storeId: storeId,
          zipCode: zipCode,
        });
        console.log(`💰 Updated price: ${priceId} — $${productPrice}`);
      } catch (err) {
        console.error(`Failed to update price for ${productId}_${storeId}:`, err);
      }

    } catch (err) {
      console.error('Unexpected error processing product:', err);
    }
  }

  console.log('✅ Done uploading.');
}

// Define main function that calls uploadScrapedData
async function main() {
  await uploadScrapedData('milk', 'walmart', '11776');
}

main().catch(err => {
  console.error('Unexpected error in main:', err);
});
