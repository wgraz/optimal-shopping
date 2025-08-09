"use client";
import { useState } from "react";

export default function Filters() {
  const dropdownClass =
    "border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition";

  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-4 flex flex-wrap gap-6">
      {/* Shopping Mode */}
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-gray-600 mb-1">
          Shopping Mode
        </label>
        <select className={dropdownClass}>
          <option>Online</option>
          <option>In Person</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-gray-600 mb-1">
          Price
        </label>
        <select className={dropdownClass}>
          <option>Low to High</option>
          <option>High to Low</option>
        </select>
      </div>

      {/* Brand Prestige */}
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-gray-600 mb-1">
          Brand Prestige
        </label>
        <select className={dropdownClass}>
          <option>Any</option>
          <option>Premium</option>
          <option>Budget</option>
        </select>
      </div>

      {/* Dietary Restrictions */}
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-gray-600 mb-1">
          Dietary Restrictions
        </label>
        <select className={dropdownClass}>
          <option>None</option>
          <option>Vegan</option>
          <option>Gluten-Free</option>
        </select>
      </div>

      {/* Ethical Restrictions */}
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-gray-600 mb-1">
          Ethical Restrictions
        </label>
        <select className={dropdownClass}>
          <option>None</option>
          <option>Fair Trade</option>
          <option>Cruelty-Free</option>
        </select>
      </div>

      {/* Store Memberships */}
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-gray-600 mb-1">
          Store Memberships
        </label>
        <select className={dropdownClass}>
          <option>None</option>
          <option>Costco</option>
          <option>Sam’s Club</option>
        </select>
      </div>

      {/* Max Stores */}
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-gray-600 mb-1">
          Max Stores
        </label>
        <select className={dropdownClass}>
          <option>1</option>
          <option>2</option>
          <option>3+</option>
        </select>
      </div>
    </div>
  );
}
