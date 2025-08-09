"use client";

import { useState } from "react";

export default function ShoppingList() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState<string[]>([]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && input.trim() !== "") {
      e.preventDefault();
      if (!items.includes(input.trim())) {
        setItems([...items, input.trim()]);
      }
      setInput("");
    }
  }

  function removeItem(index: number) {
    setItems(items.filter((_, i) => i !== index));
  }

  return (
    <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 w-full max-w-3xl mx-auto">
      <h3 className="text-lg font-semibold mb-1">🛒 Shopping List</h3>
      <p className="text-gray-600 mb-4 text-sm">
        Type items below and press <span className="font-medium">Enter</span> to
        add them. Click the “×” to remove.
      </p>

      {/* Input */}
      <input
        type="text"
        placeholder="Add item..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
      />

      {/* Item Chips */}
      <div className="flex flex-wrap gap-2 mt-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center bg-green-50 text-green-800 border border-green-200 px-3 py-1 rounded-full text-sm shadow-sm"
          >
            <span>{item}</span>
            <button
              onClick={() => removeItem(index)}
              className="ml-2 text-green-600 hover:text-green-900 font-bold leading-none"
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
