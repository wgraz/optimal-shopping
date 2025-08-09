"use client";
import { useState } from "react";

const dropdownClass = "border border-gray-300 rounded px-2 py-1 text-sm";

export default function Filters() {
  return (
    <div className="flex flex-wrap gap-4">
      {/* Online/In Person */}
      <div>
        <label className="block text-sm font-medium mb-1">Shopping Mode</label>
        <select className={dropdownClass}>
          <option>Online</option>
          <option>In Person</option>
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium mb-1">Price</label>
        <select className={dropdownClass}>
          <option>Low to High</option>
          <option>High to Low</option>
        </select>
      </div>

      {/* Brand Prestige */}
      <div>
        <label className="block text-sm font-medium mb-1">Brand Prestige</label>
        <select className={dropdownClass}>
          <option>Any</option>
          <option>Premium</option>
          <option>Budget</option>
        </select>
      </div>

      {/* Dietary Restrictions */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Dietary Restrictions
        </label>
        <select className={dropdownClass}>
          <option>None</option>
          <option>Vegan</option>
          <option>Gluten-Free</option>
        </select>
      </div>

      {/* Ethical Restrictions */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Ethical Restrictions
        </label>
        <select className={dropdownClass}>
          <option>None</option>
          <option>Fair Trade</option>
          <option>Cruelty-Free</option>
        </select>
      </div>

      {/* Store Memberships */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Store Memberships
        </label>
        <select className={dropdownClass}>
          <option>None</option>
          <option>Costco</option>
          <option>Sam’s Club</option>
        </select>
      </div>

      {/* Max Stores to Visit */}
      <div>
        <label className="block text-sm font-medium mb-1">Max Stores</label>
        <select className={dropdownClass}>
          <option>1</option>
          <option>2</option>
          <option>3+</option>
        </select>
      </div>
    </div>
  );
}
