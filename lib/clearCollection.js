// clearFirebase.js
import { db } from '../lib/firebase.js';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

async function clearCollection(collectionName) {
  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);

  if (snapshot.empty) {
    console.log(`Collection '${collectionName}' is already empty.`);
    return;
  }

  const deletePromises = [];
  snapshot.forEach((docSnap) => {
    deletePromises.push(deleteDoc(doc(db, collectionName, docSnap.id)));
  });

  await Promise.all(deletePromises);
  console.log(`✅ Cleared all documents in collection '${collectionName}'.`);
}

// Example usage: clear the 'products' collection
async function main() {
  await clearCollection('products');
  await clearCollection('prices');
  await clearCollection('stores');
}

main().catch((err) => {
  console.error('Error clearing collection:', err);
});
