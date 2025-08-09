"use client";
import Image from "next/image";

export default function Navbar({
  userName = "Will",
  location = "Columbus, OH 43210",
}) {
  return (
    <nav className="w-full bg-white shadow-md py-3 px-6 flex items-center justify-between space-x-4">
      {/* Left section */}
      <div className="flex items-center space-x-6">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/optimal_shopping_logos/long.png"
            alt="Optimal Shopping"
            width={150}
            height={100}
          />
        </div>

        {/* Location */}
        <div className="text-sm text-gray-600 hidden sm:block">
          📍 {location}
        </div>

        {/* Search bar */}
        <div className="hidden md:flex">
          <input
            type="text"
            placeholder="Search for items..."
            className="border border-gray-300 rounded-md px-3 py-1 text-sm w-136 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        {/* Language Selector */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <Image src="/flags/us.svg" alt="English" width={40} height={40} />
          <span className="text-sm">EN</span>
        </div>

        {/* Account */}
        <div className="flex items-center space-x-1">
          <span className="text-gray-500 text-sm hidden sm:inline">👤</span>
          <span className="text-sm font-medium">Hey, {userName}</span>
        </div>
      </div>
    </nav>
  );
}
