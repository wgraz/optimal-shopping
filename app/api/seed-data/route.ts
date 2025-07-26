import { NextResponse } from "next/server";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET() {
  try {
    // Stores in ZIP 11776
    await setDoc(doc(db, "stores", "walmart_11776"), {
      name: "Walmart",
      zipCode: "11776",
    });
    await setDoc(doc(db, "stores", "target_11776"), {
      name: "Target",
      zipCode: "11776",
    });

    // Stores in ZIP 43210
    await setDoc(doc(db, "stores", "kroger_43210"), {
      name: "Kroger",
      zipCode: "43210",
    });

    // Products
    await setDoc(doc(db, "products", "milk"), {
      name: "Milk",
      keywords: ["milk", "dairy", "2%", "organic"],
    });
    await setDoc(doc(db, "products", "bread"), {
      name: "Bread",
      keywords: ["bread", "bakery", "whole wheat", "loaf"],
    });
    await setDoc(doc(db, "products", "eggs"), {
      name: "Eggs",
      keywords: ["eggs", "organic", "dozen", "dairy"],
    });
    await setDoc(doc(db, "products", "cheese"), {
      name: "Cheese",
      keywords: ["cheese", "dairy", "cheddar", "organic"],
    });
    await setDoc(doc(db, "products", "butter"), {
      name: "Butter",
      keywords: ["butter", "dairy", "salted", "organic"],
    });

    // Prices — shared and unique, with price differences for comparison

    // ZIP 11776 — Walmart vs Target (shared some products)
    await setDoc(doc(db, "prices", "milk_walmart_11776"), {
      productId: "milk",
      storeId: "walmart_11776",
      price: 3.49,
      currency: "USD",
      lastUpdated: new Date(),
      zipCode: "11776",
    });
    await setDoc(doc(db, "prices", "milk_target_11776"), {
      productId: "milk",
      storeId: "target_11776",
      price: 3.79, // a bit more expensive
      currency: "USD",
      lastUpdated: new Date(),
      zipCode: "11776",
    });

    await setDoc(doc(db, "prices", "bread_walmart_11776"), {
      productId: "bread",
      storeId: "walmart_11776",
      price: 2.49,
      currency: "USD",
      lastUpdated: new Date(),
      zipCode: "11776",
    });
    await setDoc(doc(db, "prices", "bread_target_11776"), {
      productId: "bread",
      storeId: "target_11776",
      price: 2.29, // cheaper at Target here
      currency: "USD",
      lastUpdated: new Date(),
      zipCode: "11776",
    });

    await setDoc(doc(db, "prices", "eggs_walmart_11776"), {
      productId: "eggs",
      storeId: "walmart_11776",
      price: 2.99,
      currency: "USD",
      lastUpdated: new Date(),
      zipCode: "11776",
    });
    // Eggs only at Walmart in 11776 — good to test missing product in a store

    await setDoc(doc(db, "prices", "cheese_target_11776"), {
      productId: "cheese",
      storeId: "target_11776",
      price: 4.99,
      currency: "USD",
      lastUpdated: new Date(),
      zipCode: "11776",
    });

    // ZIP 43210 — Kroger only
    await setDoc(doc(db, "prices", "milk_kroger_43210"), {
      productId: "milk",
      storeId: "kroger_43210",
      price: 3.19,
      currency: "USD",
      lastUpdated: new Date(),
      zipCode: "43210",
    });
    await setDoc(doc(db, "prices", "bread_kroger_43210"), {
      productId: "bread",
      storeId: "kroger_43210",
      price: 2.79,
      currency: "USD",
      lastUpdated: new Date(),
      zipCode: "43210",
    });
    await setDoc(doc(db, "prices", "butter_kroger_43210"), {
      productId: "butter",
      storeId: "kroger_43210",
      price: 3.59,
      currency: "USD",
      lastUpdated: new Date(),
      zipCode: "43210",
    });

    return NextResponse.json({ message: "Seeded shared product data for price comparison" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to seed data" },
      { status: 500 }
    );
  }
}
