"use client";

import React from "react";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "rectangular" | "circular";
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className = "",
  variant = "text",
  width,
  height,
}: SkeletonProps) {
  const variants = {
    text: "h-4 rounded",
    rectangular: "rounded-lg",
    circular: "rounded-full",
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === "number" ? `${width}px` : width;
  if (height) style.height = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={`animate-pulse bg-gray-700 ${variants[variant]} ${className}`}
      style={style}
    />
  );
}

export function NFTCardSkeleton() {
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
      <Skeleton variant="rectangular" className="w-full aspect-square mb-3" />
      <Skeleton className="w-3/4 mb-2" />
      <Skeleton className="w-1/2" />
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <Skeleton className="w-1/2 mb-2" />
          <Skeleton className="w-3/4 h-8" />
        </div>
      ))}
    </div>
  );
}

export function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
  return (
    <tr className="border-b border-gray-800">
      {[...Array(columns)].map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className="w-full" />
        </td>
      ))}
    </tr>
  );
}
