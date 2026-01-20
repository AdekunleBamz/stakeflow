"use client";

import React from "react";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = "md",
  className = "",
}: ToggleProps) {
  const sizes = {
    sm: {
      track: "w-8 h-4",
      thumb: "w-3 h-3",
      translate: "translate-x-4",
    },
    md: {
      track: "w-11 h-6",
      thumb: "w-5 h-5",
      translate: "translate-x-5",
    },
    lg: {
      track: "w-14 h-7",
      thumb: "w-6 h-6",
      translate: "translate-x-7",
    },
  };

  const sizeConfig = sizes[size];

  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={handleClick}
        disabled={disabled}
        className={`
          relative inline-flex flex-shrink-0 cursor-pointer rounded-full
          transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900
          ${sizeConfig.track}
          ${checked ? "bg-purple-600" : "bg-gray-600"}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <span
          className={`
            pointer-events-none inline-block rounded-full bg-white shadow-lg
            transform transition-transform duration-200 ease-in-out
            ${sizeConfig.thumb}
            ${checked ? sizeConfig.translate : "translate-x-0.5"}
            ${size === "sm" ? "mt-0.5" : "mt-0.5"}
          `}
        />
      </button>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span
              className={`text-sm font-medium ${
                disabled ? "text-gray-500" : "text-white"
              }`}
            >
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-gray-500">{description}</span>
          )}
        </div>
      )}
    </div>
  );
}

interface SwitchGroupProps {
  options: Array<{
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  }>;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export function SwitchGroup({
  options,
  value,
  onChange,
  label,
  className = "",
}: SwitchGroupProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-3">
          {label}
        </label>
      )}
      <div className="space-y-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => !option.disabled && onChange(option.value)}
            disabled={option.disabled}
            className={`
              w-full px-4 py-3 text-left rounded-lg border transition-all
              ${
                value === option.value
                  ? "bg-purple-500/20 border-purple-500"
                  : "bg-gray-800 border-gray-700 hover:border-gray-600"
              }
              ${option.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                <div
                  className={`text-sm font-medium ${
                    value === option.value ? "text-purple-300" : "text-white"
                  }`}
                >
                  {option.label}
                </div>
                {option.description && (
                  <div className="text-xs text-gray-500 mt-0.5">
                    {option.description}
                  </div>
                )}
              </div>
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  value === option.value
                    ? "border-purple-500"
                    : "border-gray-600"
                }`}
              >
                {value === option.value && (
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
