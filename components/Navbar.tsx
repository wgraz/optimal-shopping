"use client";
import Image from "next/image";

export default function Navbar({
  userName = "Will",
  location = "Columbus, OH 43210",
}) {
  return (
    <nav className="w-full bg-white shadow-lg py-4 px-8 flex items-center justify-between">
      {/* Left section */}
      <div className="flex items-center space-x-8">
        {/* Logo */}
        <div className="flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-200">
          <Image
            src="/optimal_shopping_logos/long.png"
            alt="Optimal Shopping"
            width={160}
            height={110}
            priority
          />
        </div>

        {/* Location */}
        <div className="hidden sm:flex items-center text-gray-600 text-sm space-x-2 select-none">
          <span className="text-xl">📍</span>
          <span className="font-medium">{location}</span>
        </div>

        {/* Search bar */}
        <div className="hidden md:block">
          <input
            type="search"
            aria-label="Search for items"
            placeholder="Search for items..."
            className="w-72 rounded-md border border-gray-300 px-4 py-2 text-sm placeholder-gray-400
              shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400
              transition duration-200"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-6">
        {/* Language Selector */}
        <button
          type="button"
          aria-label="Select language"
          className="flex items-center space-x-2 rounded-md hover:bg-gray-100 px-3 py-1 transition"
        >
          <Image
            src="/flags/us.svg"
            alt="English"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="text-sm font-semibold text-gray-700">EN</span>
        </button>

        {/* Account */}
        <div className="flex items-center space-x-2 select-none">
          <span className="text-gray-400 text-lg">👤</span>
          <span className="text-sm font-semibold text-gray-800">
            Hey, {userName}
          </span>
        </div>
      </div>
    </nav>
  );
}
