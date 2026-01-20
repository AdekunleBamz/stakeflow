"use client";

import React, { useState } from "react";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = [],
  className = "",
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (id: string) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter((item) => item !== id));
    } else {
      if (allowMultiple) {
        setOpenItems([...openItems, id]);
      } else {
        setOpenItems([id]);
      }
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item) => (
        <AccordionSection
          key={item.id}
          title={item.title}
          isOpen={openItems.includes(item.id)}
          onToggle={() => !item.disabled && toggleItem(item.id)}
          disabled={item.disabled}
        >
          {item.content}
        </AccordionSection>
      ))}
    </div>
  );
}

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export function AccordionSection({
  title,
  children,
  isOpen,
  onToggle,
  disabled = false,
}: AccordionSectionProps) {
  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        className={`
          w-full px-4 py-3 text-left flex items-center justify-between
          bg-gray-800/50 hover:bg-gray-800 transition-colors
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <span className="text-sm font-medium text-white">{title}</span>
        <svg
          className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="p-4 text-sm text-gray-300 bg-gray-900/50">
          {children}
        </div>
      </div>
    </div>
  );
}

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function Collapsible({
  title,
  children,
  defaultOpen = false,
  className = "",
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
      >
        <svg
          className={`w-4 h-4 transform transition-transform duration-200 ${
            isOpen ? "rotate-90" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        <span>{title}</span>
      </button>
      {isOpen && <div className="mt-2 ml-6">{children}</div>}
    </div>
  );
}
