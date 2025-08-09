"use client";

export default function WhitelistBlacklist() {
  return (
    <div className="space-y-6">
      {/* Whitelist */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
        <h2 className="text-lg font-bold flex items-center gap-2">
          🤍 <span className="text-gray-800">Whitelist Stores</span>
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Only shop from these stores:
        </p>
        <textarea
          placeholder="e.g., Trader Joe's, Whole Foods"
          className="mt-3 w-full p-3 border border-gray-300 rounded-lg resize-none text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          rows={3}
        />
      </div>

      {/* Blacklist */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
        <h2 className="text-lg font-bold flex items-center gap-2">
          🖤 <span className="text-gray-800">Blacklist Stores</span>
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Avoid shopping from these stores:
        </p>
        <textarea
          placeholder="e.g., Walmart, Target"
          className="mt-3 w-full p-3 border border-gray-300 rounded-lg resize-none text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          rows={3}
        />
      </div>
    </div>
  );
}
