"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  variant?: "default" | "gradient" | "outline" | "elevated" | "glass";
  glow?: boolean;
  animate?: boolean;
}

export function Card({
  children,
  className = "",
  padding = "md",
  hover = false,
  variant = "default",
  glow = false,
  animate = false,
}: CardProps) {
  const paddingSizes = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const variants = {
    default: "bg-gray-900/50 backdrop-blur-sm border border-gray-800",
    gradient: "bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-sm border border-gray-700",
    outline: "bg-transparent border-2 border-gray-700 hover:border-purple-500/50",
    elevated: "bg-gray-900/70 backdrop-blur-md border border-gray-800 shadow-xl shadow-purple-500/5",
    glass: "bg-white/5 backdrop-blur-lg border border-white/10",
  };

  const hoverStyles = hover
    ? "hover:border-gray-700 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer hover:-translate-y-1"
    : "";

  const glowStyles = glow
    ? "ring-1 ring-purple-500/20 shadow-lg shadow-purple-500/10"
    : "";

  const animateStyles = animate
    ? "animate-pulse"
    : "";

  return (
    <div
      className={`rounded-xl ${paddingSizes[padding]} ${variants[variant]} ${hoverStyles} ${glowStyles} ${animateStyles} ${className}`}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}

export function CardHeader({ children, className = "", action }: CardHeaderProps) {
  return (
    <div className={`mb-4 flex items-center justify-between ${className}`}>
      <div>{children}</div>
      {action && <div>{action}</div>}
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
  subtitle?: string;
}

export function CardTitle({ children, className = "", subtitle }: CardTitleProps) {
  return (
    <div>
      <h3 className={`text-xl font-semibold text-white ${className}`}>
        {children}
      </h3>
      {subtitle && (
        <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
      )}
    </div>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={className}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right" | "between";
}

export function CardFooter({ children, className = "", align = "left" }: CardFooterProps) {
  const alignStyles = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
    between: "justify-between",
  };

  return (
    <div className={`mt-4 pt-4 border-t border-gray-800 flex items-center ${alignStyles[align]} ${className}`}>
      {children}
    </div>
  );
}

interface CardBadgeProps {
  children: ReactNode;
  variant?: "success" | "warning" | "error" | "info";
}

export function CardBadge({ children, variant = "info" }: CardBadgeProps) {
  const variants = {
    success: "bg-green-500/20 text-green-400 border-green-500/30",
    warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    error: "bg-red-500/20 text-red-400 border-red-500/30",
    info: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full border ${variants[variant]}`}>
      {children}
    </span>
  );
}
