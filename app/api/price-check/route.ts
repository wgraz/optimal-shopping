import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, DocumentData } from "firebase/firestore";

export async function POST(req: NextRequest) {
  type RequestBody = {
    shoppingList: string[];
    zipCode: string;
  };

  const { shoppingList, zipCode } = (await req.json()) as RequestBody;
  const topN = Number(req.nextUrl.searchParams.get("topN") || "0");

  if (!shoppingList || !zipCode) {
    return NextResponse.json(
      {
        shoppingList: [],
        zipCode,
        message: "Missing shoppingList or zipCode",
      },
      { status: 400 }
    );
  }

  try {
    // 1. Get all stores in the zip code
    const storeQuery = query(collection(db, "stores"), where("zipCode", "==", zipCode));
    const storeSnapshot = await getDocs(storeQuery);
    const stores = storeSnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
    }));

    if (stores.length === 0) {
      return NextResponse.json({
        shoppingList,
        zipCode,
        message: `No stores found in zip code ${zipCode}`,
        prices: [],
      });
    }

    const storeIds = stores.map((store) => store.id);

    // 2. Get products matching shoppingList (case-insensitive)
    const productSnapshot = await getDocs(collection(db, "products"));
    const products = productSnapshot.docs
      .filter((doc) =>
        shoppingList.some(
          (item) => item.toLowerCase() === doc.data().name.toLowerCase()
        )
      )
      .map((doc) => ({ id: doc.id, name: doc.data().name }));

    const productNameMap: Record<string, string> = {};
    products.forEach((p) => (productNameMap[p.id] = p.name));

    // 3. Get all prices for stores in the zip code
    const priceSnapshot = await getDocs(collection(db, "prices"));
    let prices = priceSnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() } as DocumentData))
      .filter(
        (price) =>
          storeIds.includes(price.storeId) &&
          shoppingList.some(
            (item) =>
              item.toLowerCase() ===
                (productNameMap[price.productId]?.toLowerCase() || "") ||
              item.toLowerCase() === price.productId.toLowerCase()
          )
      );

    // 4. Add productName and storeName to each price
    prices = prices.map((price) => ({
      ...price,
      productName: productNameMap[price.productId] || price.productId,
      storeName: stores.find((store) => store.id === price.storeId)?.name || price.storeId,
    }));

    // 5. Filter top N cheapest prices per product
    if (topN > 0) {
      const grouped: Record<string, DocumentData[]> = {};

      for (const price of prices) {
        const pid = price.productId;
        if (!grouped[pid]) grouped[pid] = [];
        grouped[pid].push(price);
      }

      prices = Object.values(grouped).flatMap((group) =>
        group.sort((a, b) => a.price - b.price).slice(0, topN)
      );
    }

    return NextResponse.json({
      shoppingList,
      zipCode,
      topN,
      message: `Found ${prices.length} price(s) for ${shoppingList.length} product(s) in zip ${zipCode}`,
      prices,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to query prices" },
      { status: 500 }
    );
  }
}
