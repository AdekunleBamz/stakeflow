"use client";

import { ReactNode } from "react";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "purple" | "pink" | "cyan";
type BadgeSize = "xs" | "sm" | "md" | "lg";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: "default" | "full";
  outline?: boolean;
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  icon?: ReactNode;
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "sm",
  rounded = "default",
  outline = false,
  dot = false,
  removable = false,
  onRemove,
  icon,
  className = "",
}: BadgeProps) {
  const variants = {
    default: outline
      ? "border-gray-600 text-gray-300"
      : "bg-gray-700 text-gray-300",
    success: outline
      ? "border-green-500 text-green-400"
      : "bg-green-500/20 text-green-400",
    warning: outline
      ? "border-yellow-500 text-yellow-400"
      : "bg-yellow-500/20 text-yellow-400",
    error: outline
      ? "border-red-500 text-red-400"
      : "bg-red-500/20 text-red-400",
    info: outline
      ? "border-blue-500 text-blue-400"
      : "bg-blue-500/20 text-blue-400",
    purple: outline
      ? "border-purple-500 text-purple-400"
      : "bg-purple-500/20 text-purple-400",
    pink: outline
      ? "border-pink-500 text-pink-400"
      : "bg-pink-500/20 text-pink-400",
    cyan: outline
      ? "border-cyan-500 text-cyan-400"
      : "bg-cyan-500/20 text-cyan-400",
  };

  const dotColors = {
    default: "bg-gray-400",
    success: "bg-green-400",
    warning: "bg-yellow-400",
    error: "bg-red-400",
    info: "bg-blue-400",
    purple: "bg-purple-400",
    pink: "bg-pink-400",
    cyan: "bg-cyan-400",
  };

  const sizes = {
    xs: "text-xs px-1.5 py-0.5",
    sm: "text-xs px-2 py-1",
    md: "text-sm px-2.5 py-1",
    lg: "text-sm px-3 py-1.5",
  };

  const roundedStyles = {
    default: "rounded-md",
    full: "rounded-full",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium ${sizes[size]} ${roundedStyles[rounded]} ${variants[variant]} ${
        outline ? "border bg-transparent" : ""
      } ${className}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />
      )}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {removable && (
        <button
          onClick={onRemove}
          className="ml-0.5 -mr-1 p-0.5 hover:bg-white/10 rounded transition-colors"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
}

interface StatusBadgeProps {
  status: "online" | "offline" | "away" | "busy" | "pending";
  showLabel?: boolean;
  size?: "sm" | "md";
}

export function StatusBadge({ status, showLabel = true, size = "sm" }: StatusBadgeProps) {
  const statusConfig = {
    online: { color: "bg-green-500", label: "Online", pulse: true },
    offline: { color: "bg-gray-500", label: "Offline", pulse: false },
    away: { color: "bg-yellow-500", label: "Away", pulse: false },
    busy: { color: "bg-red-500", label: "Busy", pulse: false },
    pending: { color: "bg-blue-500", label: "Pending", pulse: true },
  };

  const config = statusConfig[status];
  const dotSize = size === "sm" ? "w-2 h-2" : "w-2.5 h-2.5";

  return (
    <span className="inline-flex items-center gap-2">
      <span className="relative flex">
        <span className={`${dotSize} rounded-full ${config.color}`} />
        {config.pulse && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full ${config.color} opacity-75 animate-ping`}
          />
        )}
      </span>
      {showLabel && (
        <span className={`text-gray-300 ${size === "sm" ? "text-xs" : "text-sm"}`}>
          {config.label}
        </span>
      )}
    </span>
  );
}

interface CounterBadgeProps {
  count: number;
  max?: number;
  variant?: "default" | "primary" | "danger";
  size?: "sm" | "md" | "lg";
}

export function CounterBadge({
  count,
  max = 99,
  variant = "primary",
  size = "sm",
}: CounterBadgeProps) {
  const displayCount = count > max ? `${max}+` : count;

  const variants = {
    default: "bg-gray-700 text-gray-300",
    primary: "bg-purple-500 text-white",
    danger: "bg-red-500 text-white",
  };

  const sizes = {
    sm: "min-w-[18px] h-[18px] text-xs",
    md: "min-w-[22px] h-[22px] text-xs",
    lg: "min-w-[26px] h-[26px] text-sm",
  };

  if (count === 0) return null;

  return (
    <span
      className={`inline-flex items-center justify-center font-semibold rounded-full ${variants[variant]} ${sizes[size]} px-1`}
    >
      {displayCount}
    </span>
  );
}

interface TagProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  removable?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  active?: boolean;
}

export function Tag({
  children,
  variant = "default",
  size = "sm",
  removable = false,
  onRemove,
  onClick,
  active = false,
}: TagProps) {
  const variants = {
    default: active ? "bg-gray-600 border-gray-500" : "bg-gray-800 border-gray-700 hover:border-gray-600",
    success: active ? "bg-green-500/30 border-green-500" : "bg-green-500/10 border-green-500/30 hover:border-green-500/50",
    warning: active ? "bg-yellow-500/30 border-yellow-500" : "bg-yellow-500/10 border-yellow-500/30 hover:border-yellow-500/50",
    error: active ? "bg-red-500/30 border-red-500" : "bg-red-500/10 border-red-500/30 hover:border-red-500/50",
    info: active ? "bg-blue-500/30 border-blue-500" : "bg-blue-500/10 border-blue-500/30 hover:border-blue-500/50",
    purple: active ? "bg-purple-500/30 border-purple-500" : "bg-purple-500/10 border-purple-500/30 hover:border-purple-500/50",
    pink: active ? "bg-pink-500/30 border-pink-500" : "bg-pink-500/10 border-pink-500/30 hover:border-pink-500/50",
    cyan: active ? "bg-cyan-500/30 border-cyan-500" : "bg-cyan-500/10 border-cyan-500/30 hover:border-cyan-500/50",
  };

  const sizes = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
  };

  const Component = onClick ? "button" : "span";

  return (
    <Component
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 border rounded-lg transition-colors ${sizes[size]} ${variants[variant]} ${
        onClick ? "cursor-pointer" : ""
      } text-gray-300`}
    >
      {children}
      {removable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="ml-0.5 -mr-1 p-0.5 hover:bg-white/10 rounded transition-colors"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </Component>
  );
}
