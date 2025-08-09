"use client";

import React, { useState } from "react";

type Price = {
  id: string;
  productId: string;
  productName: string;
  storeId: string;
  storeName: string;
  price: number;
  currency: string;
};

type Results = {
  message: string;
  shoppingList: string[];
  zipCode: string;
  prices: Price[];
};

export default function Home() {
  const [shoppingList, setShoppingList] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [results, setResults] = useState<Results | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const items = shoppingList
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    try {
      const response = await fetch("/api/price-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shoppingList: items, zipCode }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to fetch prices");
      }

      const data = await response.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred");
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  // Group prices by productId
  const groupedPrices = results?.prices.reduce((acc, price) => {
    if (!acc[price.productId]) acc[price.productId] = [];
    acc[price.productId].push(price);
    return acc;
  }, {} as Record<string, Price[]>);

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Optimal Shopping</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Shopping List (one item per line):
          <textarea
            rows={6}
            className="w-full border border-gray-300 rounded p-2 text-black bg-white"
            value={shoppingList}
            onChange={(e) => setShoppingList(e.target.value)}
            placeholder={"e.g.\nMilk\nBread\nEggs"}
            required
          />
        </label>

        <label className="block">
          Zip Code:
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2 text-black bg-white"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="e.g. 43210"
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Finding Prices..." : "Find Cheapest Prices"}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-red-600 font-semibold">Error: {error}</p>
      )}

      {results && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Results</h2>
          <p className="mb-4">{results.message}</p>

          {groupedPrices &&
            Object.entries(groupedPrices).map(([productId, prices]) => (
              <div key={productId} className="mb-6">
                <h3 className="font-bold text-lg">{prices[0].productName}</h3>
                <ul className="list-disc pl-5 mt-1">
                  {prices.map((price) => (
                    <li key={price.id}>
                      <span className="font-semibold">{price.storeName}</span>:
                      ${price.price.toFixed(2)} {price.currency}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          <p className="mt-4 text-gray-600">Zip Code: {results.zipCode}</p>
        </section>
      )}
    </main>
  );
}
