"use client";

import { useState, KeyboardEvent } from "react";

interface Product {
  image: string;
  name: string;
  store: string;
  price: string;
}

interface ProductModalProps {
  product: Product;
  similarDeals: Product[];
  onClose: () => void;
}

export default function ProductModal({
  product,
  similarDeals,
  onClose,
}: ProductModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<string[]>([]);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      e.preventDefault();
      if (!filters.includes(searchTerm.trim())) {
        setFilters([...filters, searchTerm.trim()]);
      }
      setSearchTerm("");
    }
  }

  function removeFilter(index: number) {
    setFilters(filters.filter((_, i) => i !== index));
  }

  return (
    <div
      className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-lg shadow-lg w-[90vw] max-w-6xl max-h-[90vh] overflow-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className="flex justify-start p-4 border-b border-gray-200">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-600 hover:text-gray-900 text-3xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content panels */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left side: Large product details */}
          <div className="w-1/2 p-6 flex flex-col overflow-auto">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg mb-6"
            />
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-lg font-semibold text-green-600 mb-1">
              {product.price}
            </p>
            <p className="text-gray-600 font-medium mb-6">
              Available at: <span className="capitalize">{product.store}</span>
            </p>
          </div>

          {/* Right side: Filters input + chips + similar deals */}
          <div className="w-1/2 border-l border-gray-200 p-6 flex flex-col overflow-auto">
            <input
              type="text"
              placeholder="Add filter and press Enter"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border border-gray-300 rounded-md px-4 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              aria-label="Add filter"
            />

            {/* Filter chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              {filters.map((filter, index) => (
                <div
                  key={index}
                  className="bg-green-200 text-green-800 px-3 py-1 rounded-full flex items-center space-x-2 text-sm select-none"
                >
                  <span>{filter}</span>
                  <button
                    onClick={() => removeFilter(index)}
                    aria-label={`Remove filter ${filter}`}
                    className="hover:text-green-900 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Similar deals list (unfiltered for now) */}
            <div className="flex-1 overflow-y-auto space-y-4">
              {similarDeals.map((deal) => (
                <div
                  key={deal.name + deal.store}
                  className="flex items-center space-x-4 border border-gray-200 rounded-lg p-3 cursor-default"
                >
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-semibold">{deal.name}</p>
                    <p className="text-sm text-gray-600 capitalize">
                      {deal.store}
                    </p>
                    <p className="text-green-600 font-bold">{deal.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
