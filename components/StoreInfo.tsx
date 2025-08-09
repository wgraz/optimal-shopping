"use client";
export default function StoreInfo() {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold">🏪 Store Info</h2>
      <p className="text-sm text-gray-600">
        This week's optimal store is <strong>Walmart #11776</strong> based on
        your preferences and pricing in your area.
      </p>
      <ul className="list-disc ml-5 mt-2 text-sm text-gray-700">
        <li>Location: 123 Main St, YourTown</li>
        <li>Open: 8:00 AM – 10:00 PM</li>
        <li>Supports Online Orders</li>
        <li>In-store Pickup Available</li>
      </ul>
    </div>
  );
}
