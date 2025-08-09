import React from "react";

interface ProductCardProps {
  image: string;
  name: string;
  store: string;
  price: string;
  onViewDeal?: () => void;
}

export default function ProductCard({
  image,
  name,
  store,
  price,
  onViewDeal,
}: ProductCardProps) {
  const storeColors: Record<string, string> = {
    walmart: "text-blue-600",
    target: "text-red-500",
    costco: "text-red-600",
    kroger: "text-blue-500",
  };

  const storeColorClass = storeColors[store.toLowerCase()] || "text-gray-600";

  return (
    <div className="border border-gray-200 rounded-2xl shadow-sm bg-white flex flex-col hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <img src={image} alt={name} className="h-44 w-full object-cover" />
      <div className="flex flex-col flex-1 p-4">
        <p className="text-base md:text-lg font-semibold leading-tight">
          {name}
        </p>
        <p className={`text-sm mt-1 font-medium ${storeColorClass}`}>{store}</p>
        <p className="mt-2 text-green-600 font-bold text-lg">{price}</p>
        <button
          onClick={onViewDeal}
          className="mt-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200"
        >
          View Deal
        </button>
      </div>
    </div>
  );
}
