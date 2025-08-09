"use client";

export default function WhitelistBlacklist() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">🤍 Whitelist Stores</h2>
        <p className="text-sm text-gray-600 mb-1">
          Only shop from these stores:
        </p>
        <textarea
          placeholder="e.g., Trader Joe's, Whole Foods"
          className="w-75 p-2 border border-gray-300 rounded resize-none text-sm"
          rows={3}
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold">🖤 Blacklist Stores</h2>
        <p className="text-sm text-gray-600 mb-1">
          Avoid shopping from these stores:
        </p>
        <textarea
          placeholder="e.g., Walmart, Target"
          className="w-75 p-2 border border-gray-300 rounded resize-none text-sm"
          rows={3}
        />
      </div>
    </div>
  );
}
