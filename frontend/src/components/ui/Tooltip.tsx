"use client";

import React, { useState, useRef, useEffect } from "react";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  className?: string;
}

export function Tooltip({
  content,
  children,
  position = "top",
  delay = 200,
  className = "",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [actualPosition, setActualPosition] = useState(position);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      adjustPosition();
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const adjustPosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let newPosition = position;

    // Check if tooltip would overflow
    if (position === "top" && triggerRect.top < tooltipRect.height + 10) {
      newPosition = "bottom";
    } else if (
      position === "bottom" &&
      triggerRect.bottom + tooltipRect.height + 10 > viewportHeight
    ) {
      newPosition = "top";
    } else if (position === "left" && triggerRect.left < tooltipRect.width + 10) {
      newPosition = "right";
    } else if (
      position === "right" &&
      triggerRect.right + tooltipRect.width + 10 > viewportWidth
    ) {
      newPosition = "left";
    }

    setActualPosition(newPosition);
  };

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-gray-800",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-gray-800",
    left: "left-full top-1/2 -translate-y-1/2 border-l-gray-800",
    right: "right-full top-1/2 -translate-y-1/2 border-r-gray-800",
  };

  return (
    <div
      ref={triggerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 px-3 py-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg whitespace-nowrap ${positionClasses[actualPosition]}`}
          role="tooltip"
        >
          {content}
          <div
            className={`absolute w-0 h-0 border-4 border-transparent ${arrowClasses[actualPosition]}`}
          />
        </div>
      )}
    </div>
  );
}

interface InfoTooltipProps {
  content: string;
  className?: string;
}

export function InfoTooltip({ content, className = "" }: InfoTooltipProps) {
  return (
    <Tooltip content={content} className={className}>
      <div className="inline-flex items-center justify-center w-4 h-4 text-xs text-gray-400 border border-gray-600 rounded-full cursor-help hover:text-white hover:border-gray-400">
        ?
      </div>
    </Tooltip>
  );
}

interface HelpTextProps {
  text: string;
  tooltip?: string;
  className?: string;
}

export function HelpText({ text, tooltip, className = "" }: HelpTextProps) {
  if (tooltip) {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        <span className="text-sm text-gray-400">{text}</span>
        <InfoTooltip content={tooltip} />
      </div>
    );
  }

  return <span className={`text-sm text-gray-400 ${className}`}>{text}</span>;
}
