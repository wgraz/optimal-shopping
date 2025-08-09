"use client";

export default function StoreInfo() {
  // Example: could be dynamic later
  const storeName = "Walmart #11776";
  const storeBrand = storeName.split(" ")[0].toLowerCase();

  // Brand color mapping
  const storeColors: Record<string, string> = {
    walmart: "text-blue-600",
    target: "text-red-500",
    costco: "text-red-600",
    kroger: "text-blue-500",
  };

  const brandColorClass = storeColors[storeBrand] || "text-gray-800";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 mb-4">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        🏪 <span className="text-gray-800">Store Info</span>
      </h2>

      <p className="text-sm text-gray-600 mt-1">
        This week's optimal store is{" "}
        <strong className={`${brandColorClass}`}>{storeName}</strong> based on
        your preferences and pricing in your area.
      </p>

      <div className="mt-4 space-y-2 text-sm text-gray-700">
        <div>
          <span className="font-medium">📍 Location:</span> 123 Main St,
          YourTown
        </div>
        <div>
          <span className="font-medium">⏰ Open:</span> 8:00 AM – 10:00 PM
        </div>
        <div>🛒 Supports Online Orders</div>
        <div>📦 In-store Pickup Available</div>
      </div>
    </div>
  );
}
