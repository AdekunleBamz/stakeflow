"use client";

import { ReactNode, useState, useRef, useEffect } from "react";

type TooltipPosition = "top" | "bottom" | "left" | "right";
type TooltipTrigger = "hover" | "click" | "focus";

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  position?: TooltipPosition;
  trigger?: TooltipTrigger;
  delay?: number;
  maxWidth?: number;
  disabled?: boolean;
  arrow?: boolean;
  className?: string;
  contentClassName?: string;
}

export function Tooltip({
  children,
  content,
  position = "top",
  trigger = "hover",
  delay = 200,
  maxWidth = 250,
  disabled = false,
  arrow = true,
  className = "",
  contentClassName = "",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const gap = 8;

    let top = 0;
    let left = 0;

    switch (position) {
      case "top":
        top = triggerRect.top - tooltipRect.height - gap;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case "bottom":
        top = triggerRect.bottom + gap;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case "left":
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left - tooltipRect.width - gap;
        break;
      case "right":
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + gap;
        break;
    }

    // Clamp to viewport
    left = Math.max(8, Math.min(left, window.innerWidth - tooltipRect.width - 8));
    top = Math.max(8, Math.min(top, window.innerHeight - tooltipRect.height - 8));

    setCoords({ top, left });
  };

  const show = () => {
    if (disabled) return;
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
      window.addEventListener("scroll", calculatePosition, true);
      window.addEventListener("resize", calculatePosition);
    }
    return () => {
      window.removeEventListener("scroll", calculatePosition, true);
      window.removeEventListener("resize", calculatePosition);
    };
  }, [isVisible]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const triggerProps = {
    hover: {
      onMouseEnter: show,
      onMouseLeave: hide,
    },
    click: {
      onClick: () => (isVisible ? hide() : show()),
    },
    focus: {
      onFocus: show,
      onBlur: hide,
    },
  };

  const arrowPositions = {
    top: "bottom-[-4px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-800",
    bottom: "top-[-4px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-800",
    left: "right-[-4px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-800",
    right: "left-[-4px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-800",
  };

  return (
    <>
      <div
        ref={triggerRef}
        className={`inline-block ${className}`}
        {...triggerProps[trigger]}
      >
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          role="tooltip"
          style={{
            position: "fixed",
            top: coords.top,
            left: coords.left,
            maxWidth,
            zIndex: 9999,
          }}
          className={`px-3 py-2 text-sm text-white bg-gray-800 border border-gray-700 rounded-lg shadow-xl animate-in fade-in zoom-in-95 duration-150 ${contentClassName}`}
        >
          {content}
          {arrow && (
            <div
              className={`absolute w-0 h-0 border-4 ${arrowPositions[position]}`}
            />
          )}
        </div>
      )}
    </>
  );
}

interface InfoTooltipProps {
  content: ReactNode;
  position?: TooltipPosition;
  iconSize?: "sm" | "md" | "lg";
}

export function InfoTooltip({ content, position = "top", iconSize = "md" }: InfoTooltipProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <Tooltip content={content} position={position}>
      <svg
        className={`${sizes[iconSize]} text-gray-400 hover:text-gray-300 cursor-help transition-colors`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </Tooltip>
  );
}

interface PopoverProps {
  children: ReactNode;
  content: ReactNode;
  position?: TooltipPosition;
  trigger?: "click" | "hover";
  className?: string;
}

export function Popover({
  children,
  content,
  position = "bottom",
  trigger = "click",
  className = "",
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const triggerProps =
    trigger === "click"
      ? { onClick: () => setIsOpen(!isOpen) }
      : { onMouseEnter: () => setIsOpen(true), onMouseLeave: () => setIsOpen(false) };

  const positionStyles = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div ref={popoverRef} className={`relative inline-block ${className}`}>
      <div {...triggerProps}>{children}</div>
      {isOpen && (
        <div
          className={`absolute ${positionStyles[position]} z-50 min-w-[200px] bg-gray-900 border border-gray-800 rounded-xl shadow-2xl animate-in fade-in zoom-in-95 duration-150`}
        >
          {content}
        </div>
      )}
    </div>
  );
}

interface HoverCardProps {
  children: ReactNode;
  content: ReactNode;
  side?: "top" | "bottom";
  className?: string;
}

export function HoverCard({ children, content, side = "bottom", className = "" }: HoverCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const show = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(true), 300);
  };

  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(false);
  };

  const positionStyles = {
    top: "bottom-full left-0 mb-2",
    bottom: "top-full left-0 mt-2",
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {children}
      {isOpen && (
        <div
          className={`absolute ${positionStyles[side]} z-50 w-64 p-4 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200`}
        >
          {content}
        </div>
      )}
    </div>
  );
}
