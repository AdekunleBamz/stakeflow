"use client";

import React from "react";

interface AvatarProps {
  address?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

// Generate a deterministic color based on address
function addressToColor(address: string): string {
  const colors = [
    "from-purple-500 to-indigo-600",
    "from-blue-500 to-cyan-600",
    "from-green-500 to-emerald-600",
    "from-yellow-500 to-orange-600",
    "from-red-500 to-pink-600",
    "from-pink-500 to-rose-600",
    "from-indigo-500 to-violet-600",
    "from-teal-500 to-green-600",
  ];
  
  let hash = 0;
  for (let i = 0; i < address.length; i++) {
    hash = address.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
}

export function Avatar({ address, size = "md", className = "" }: AvatarProps) {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
  };

  const initials = address ? address.slice(0, 2).toUpperCase() : "??";
  const gradient = address ? addressToColor(address) : "from-gray-500 to-gray-600";

  return (
    <div
      className={`${sizes[size]} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center font-bold text-white ${className}`}
    >
      {initials}
    </div>
  );
}
