"use client";

import { ReactNode, useState } from "react";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type AvatarStatus = "online" | "offline" | "away" | "busy" | "none";

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: ReactNode;
  size?: AvatarSize;
  status?: AvatarStatus;
  bordered?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Avatar({
  src,
  alt = "Avatar",
  fallback,
  size = "md",
  status = "none",
  bordered = false,
  className = "",
  onClick,
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  const sizeStyles = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg",
    "2xl": "w-24 h-24 text-xl",
  };

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-500",
    away: "bg-yellow-500",
    busy: "bg-red-500",
    none: "hidden",
  };

  const statusSizes = {
    xs: "w-1.5 h-1.5",
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
    lg: "w-3 h-3",
    xl: "w-4 h-4",
    "2xl": "w-5 h-5",
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div
      onClick={onClick}
      className={`relative inline-block ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      <div
        className={`relative overflow-hidden rounded-full flex items-center justify-center bg-gray-700 text-gray-300 font-medium transition-all ${
          sizeStyles[size]
        } ${bordered ? "ring-2 ring-gray-900 border-2 border-white/10" : ""}`}
      >
        {!src || hasError ? (
          fallback || (alt ? getInitials(alt) : "?")
        ) : (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={() => setHasError(true)}
          />
        )}
      </div>
      {status !== "none" && (
        <span
          className={`absolute bottom-0 right-0 block rounded-full ring-2 ring-gray-900 ${statusColors[status]} ${statusSizes[size]}`}
        />
      )}
    </div>
  );
}

interface AvatarGroupProps {
  children: ReactNode;
  size?: AvatarSize;
  limit?: number;
  className?: string;
  borderColor?: string;
}

export function AvatarGroup({
  children,
  size = "md",
  limit,
  className = "",
}: AvatarGroupProps) {
  const childrenArray = Array.isArray(children) ? children : [children];
  const count = childrenArray.length;
  const showLimit = limit ? Math.min(limit, count) : count;
  const excess = count - showLimit;

  const spacing = {
    xs: "-space-x-1.5",
    sm: "-space-x-2",
    md: "-space-x-3",
    lg: "-space-x-3",
    xl: "-space-x-4",
    "2xl": "-space-x-5",
  };

  const excessSizeStyles = {
    xs: "w-6 h-6 text-[10px]",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-xs",
    lg: "w-12 h-12 text-sm",
    xl: "w-16 h-16 text-base",
    "2xl": "w-24 h-24 text-lg",
  };

  return (
    <div className={`flex items-center ${spacing[size]} ${className}`}>
      {childrenArray.slice(0, showLimit).map((child, index) => (
        <div key={index} className="relative ring-2 ring-gray-900 rounded-full z-10 transition-transform hover:-translate-y-1 hover:z-20">
          {child}
        </div>
      ))}
      {excess > 0 && (
        <div
          className={`relative z-0 flex items-center justify-center rounded-full bg-gray-800 ring-2 ring-gray-900 text-gray-400 font-medium ${excessSizeStyles[size]}`}
        >
          +{excess}
        </div>
      )}
    </div>
  );
}
