"use client";

import React from "react";

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  className?: string;
}

export function LoadingOverlay({
  isVisible,
  message = "Loading...",
  className = "",
}: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm ${className}`}
    >
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-purple-500/30" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin" />
        </div>
        <p className="text-white font-medium">{message}</p>
      </div>
    </div>
  );
}

interface PageLoaderProps {
  className?: string;
}

export function PageLoader({ className = "" }: PageLoaderProps) {
  return (
    <div
      className={`flex items-center justify-center min-h-[400px] ${className}`}
    >
      <div className="flex flex-col items-center">
        <div className="relative w-12 h-12 mb-3">
          <div className="absolute inset-0 rounded-full border-4 border-purple-500/30" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin" />
        </div>
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    </div>
  );
}

interface SkeletonLoaderProps {
  type: "card" | "list" | "grid" | "text";
  count?: number;
  className?: string;
}

export function SkeletonLoader({
  type,
  count = 1,
  className = "",
}: SkeletonLoaderProps) {
  const items = Array.from({ length: count }, (_, i) => i);

  const renderSkeleton = () => {
    switch (type) {
      case "card":
        return (
          <div className="bg-gray-800 rounded-xl p-4 animate-pulse">
            <div className="w-full aspect-square bg-gray-700 rounded-lg mb-4" />
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-700 rounded w-1/2" />
          </div>
        );
      case "list":
        return (
          <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg animate-pulse">
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex-shrink-0" />
            <div className="flex-1">
              <div className="h-4 bg-gray-700 rounded w-1/3 mb-2" />
              <div className="h-3 bg-gray-700 rounded w-1/2" />
            </div>
            <div className="w-20 h-8 bg-gray-700 rounded" />
          </div>
        );
      case "grid":
        return (
          <div className="bg-gray-800 rounded-lg p-3 animate-pulse">
            <div className="w-full aspect-square bg-gray-700 rounded-lg mb-2" />
            <div className="h-3 bg-gray-700 rounded w-1/2 mx-auto" />
          </div>
        );
      case "text":
        return (
          <div className="space-y-2 animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-full" />
            <div className="h-4 bg-gray-700 rounded w-5/6" />
            <div className="h-4 bg-gray-700 rounded w-4/6" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={className}>
      {type === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((i) => (
            <React.Fragment key={i}>{renderSkeleton()}</React.Fragment>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((i) => (
            <React.Fragment key={i}>{renderSkeleton()}</React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

interface PulseDotsProps {
  className?: string;
}

export function PulseDots({ className = "" }: PulseDotsProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-75" />
      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-150" />
    </div>
  );
}
