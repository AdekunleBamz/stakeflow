"use client";

import React from "react";

interface CopyButtonProps {
  text: string;
  className?: string;
  size?: "sm" | "md";
  onCopy?: () => void;
}

export function CopyButton({
  text,
  className = "",
  size = "md",
  onCopy,
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (onCopy) onCopy();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const sizes = {
    sm: "p-1",
    md: "p-2",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`
        ${sizes[size]} rounded-md text-gray-400 hover:text-white
        hover:bg-gray-700 transition-colors ${className}
      `}
      title={copied ? "Copied!" : "Copy to clipboard"}
    >
      {copied ? (
        <svg
          className={`${iconSizes[size]} text-green-400`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          className={iconSizes[size]}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      )}
    </button>
  );
}

interface CopyTextProps {
  text: string;
  displayText?: string;
  className?: string;
  truncate?: boolean;
}

export function CopyText({
  text,
  displayText,
  className = "",
  truncate = false,
}: CopyTextProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span
        className={`font-mono text-sm text-gray-300 ${
          truncate ? "truncate max-w-[200px]" : ""
        }`}
        title={text}
      >
        {displayText || text}
      </span>
      <CopyButton text={text} size="sm" />
    </div>
  );
}

interface CodeBlockProps {
  code: string;
  language?: string;
  showCopy?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language,
  showCopy = true,
  className = "",
}: CodeBlockProps) {
  return (
    <div className={`relative group ${className}`}>
      {language && (
        <div className="absolute top-2 left-3 text-xs text-gray-500">
          {language}
        </div>
      )}
      {showCopy && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <CopyButton text={code} size="sm" />
        </div>
      )}
      <pre className="bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-x-auto">
        <code className="text-sm text-gray-300 font-mono">{code}</code>
      </pre>
    </div>
  );
}
