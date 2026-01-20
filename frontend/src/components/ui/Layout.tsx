"use client";

import React from "react";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function Divider({
  orientation = "horizontal",
  className = "",
}: DividerProps) {
  if (orientation === "vertical") {
    return <div className={`w-px h-full bg-gray-700 ${className}`} />;
  }
  return <div className={`w-full h-px bg-gray-700 ${className}`} />;
}

interface DividerWithTextProps {
  children: React.ReactNode;
  className?: string;
}

export function DividerWithText({
  children,
  className = "",
}: DividerWithTextProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex-1 h-px bg-gray-700" />
      <span className="text-sm text-gray-500">{children}</span>
      <div className="flex-1 h-px bg-gray-700" />
    </div>
  );
}

interface SpacerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

export function Spacer({ size = "md", className = "" }: SpacerProps) {
  const sizes = {
    xs: "h-2",
    sm: "h-4",
    md: "h-6",
    lg: "h-8",
    xl: "h-12",
    "2xl": "h-16",
  };

  return <div className={`${sizes[size]} ${className}`} />;
}

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  className?: string;
}

export function Container({
  children,
  maxWidth = "xl",
  className = "",
}: ContainerProps) {
  const maxWidths = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-7xl",
    "2xl": "max-w-screen-2xl",
    full: "max-w-full",
  };

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${maxWidths[maxWidth]} ${className}`}>
      {children}
    </div>
  );
}

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export function Section({
  children,
  title,
  description,
  className = "",
}: SectionProps) {
  return (
    <section className={`py-8 ${className}`}>
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h2 className="text-2xl font-bold text-white">{title}</h2>
          )}
          {description && (
            <p className="mt-1 text-gray-400">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 6;
  gap?: "sm" | "md" | "lg";
  className?: string;
}

export function Grid({
  children,
  cols = 3,
  gap = "md",
  className = "",
}: GridProps) {
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  };

  const gapClasses = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  };

  return (
    <div
      className={`grid ${colClasses[cols]} ${gapClasses[gap]} ${className}`}
    >
      {children}
    </div>
  );
}

interface FlexProps {
  children: React.ReactNode;
  direction?: "row" | "col";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  gap?: "sm" | "md" | "lg";
  wrap?: boolean;
  className?: string;
}

export function Flex({
  children,
  direction = "row",
  align = "center",
  justify = "start",
  gap = "md",
  wrap = false,
  className = "",
}: FlexProps) {
  const directions = {
    row: "flex-row",
    col: "flex-col",
  };

  const aligns = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  };

  const justifies = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
  };

  const gaps = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  };

  return (
    <div
      className={`flex ${directions[direction]} ${aligns[align]} ${justifies[justify]} ${gaps[gap]} ${wrap ? "flex-wrap" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
