// components/PriceResults.tsx
import React from "react";

type Price = {
  id: string;
  price: number;
  storeName: string;
  productName: string;
  lastUpdated: { seconds: number; nanoseconds: number };
  currency: string;
};

type Props = {
  prices: Price[];
};

export default function PriceResults({ prices }: Props) {
  const grouped = prices.reduce((acc, price) => {
    if (!acc[price.productName]) acc[price.productName] = [];
    acc[price.productName].push(price);
    return acc;
  }, {} as Record<string, Price[]>);

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([product, productPrices]) => (
        <div key={product} className="border p-4 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-2">{product}</h2>
          <ul>
            {productPrices.map((p) => (
              <li key={p.id} className="flex justify-between">
                <span>{p.storeName}</span>
                <span>
                  ${p.price.toFixed(2)} {p.currency}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
