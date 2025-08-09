"use client"; // make sure this is a client component

import { useState } from "react";

export default function ShoppingList() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState<string[]>([]);

  // Handle adding item on Enter key
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && input.trim() !== "") {
      e.preventDefault();

      // Avoid duplicates
      if (!items.includes(input.trim())) {
        setItems([...items, input.trim()]);
      }

      setInput("");
    }
  }

  // Remove item by index
  function removeItem(index: number) {
    setItems(items.filter((_, i) => i !== index));
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-6">
      <h3 className="text-xl font-semibold mb-2">🛒 Shopping List</h3>
      <p className="text-gray-600 mb-4 text-sm">
        Type items in the box below and press Enter to add to your list. Click the “×” to remove an item.
      </p>

      {/* Input box */}
      <input
        type="text"
        placeholder="Add item..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      {/* Items list */}
      <div className="flex flex-wrap gap-2 mt-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
          >
            <span>{item}</span>
            <button
              onClick={() => removeItem(index)}
              className="ml-2 text-green-600 hover:text-green-900 font-bold"
              aria-label={`Remove ${item}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
