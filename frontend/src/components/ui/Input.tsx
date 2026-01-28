"use client";

import { forwardRef, InputHTMLAttributes, ReactNode, useState } from "react";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  leftAddon?: string;
  rightAddon?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "filled" | "flushed";
  isRequired?: boolean;
  showCharCount?: boolean;
  maxLength?: number;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      leftAddon,
      rightAddon,
      size = "md",
      variant = "default",
      className = "",
      isRequired = false,
      showCharCount = false,
      maxLength,
      disabled,
      id,
      value,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = useState(String(value || "").length);
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const sizeStyles = {
      sm: "py-2 px-3 text-sm",
      md: "py-3 px-4 text-base",
      lg: "py-4 px-5 text-lg",
    };

    const variantStyles = {
      default:
        "bg-gray-800/50 border border-gray-700 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500",
      filled:
        "bg-gray-800 border-2 border-transparent rounded-lg focus:border-purple-500 focus:bg-gray-800/80",
      flushed:
        "bg-transparent border-b-2 border-gray-700 rounded-none focus:border-purple-500 px-0",
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCharCount(e.target.value.length);
      props.onChange?.(e);
    };

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            {label}
            {isRequired && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <div className="relative flex">
          {leftAddon && (
            <span className="inline-flex items-center px-4 text-sm text-gray-400 bg-gray-800 border border-r-0 border-gray-700 rounded-l-lg">
              {leftAddon}
            </span>
          )}
          <div className="relative flex-1">
            {leftIcon && (
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                {leftIcon}
              </span>
            )}
            <input
              ref={ref}
              id={inputId}
              disabled={disabled}
              maxLength={maxLength}
              value={value}
              {...props}
              onChange={handleChange}
              className={`w-full text-white placeholder-gray-500 transition-all duration-200 focus:outline-none ${sizeStyles[size]} ${variantStyles[variant]} ${
                leftIcon ? "pl-10" : ""
              } ${rightIcon ? "pr-10" : ""} ${
                leftAddon ? "rounded-l-none" : ""
              } ${rightAddon ? "rounded-r-none" : ""} ${
                error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
              } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            {rightIcon && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {rightIcon}
              </span>
            )}
          </div>
          {rightAddon && (
            <span className="inline-flex items-center px-4 text-sm text-gray-400 bg-gray-800 border border-l-0 border-gray-700 rounded-r-lg">
              {rightAddon}
            </span>
          )}
        </div>
        <div className="flex justify-between mt-1">
          {(error || hint) && (
            <p className={`text-sm ${error ? "text-red-400" : "text-gray-500"}`}>
              {error || hint}
            </p>
          )}
          {showCharCount && maxLength && (
            <p className={`text-sm ${charCount > maxLength ? "text-red-400" : "text-gray-500"}`}>
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  isRequired?: boolean;
  showCharCount?: boolean;
  autoResize?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      className = "",
      isRequired = false,
      showCharCount = false,
      maxLength,
      autoResize = false,
      disabled,
      id,
      value,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = useState(String(value || "").length);
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      if (autoResize) {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
      }
      props.onChange?.(e);
    };

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            {label}
            {isRequired && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          {...props}
          onChange={handleChange}
          className={`w-full py-3 px-4 text-white placeholder-gray-500 bg-gray-800/50 border border-gray-700 rounded-lg transition-all duration-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none ${
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        />
        <div className="flex justify-between mt-1">
          {(error || hint) && (
            <p className={`text-sm ${error ? "text-red-400" : "text-gray-500"}`}>
              {error || hint}
            </p>
          )}
          {showCharCount && maxLength && (
            <p className={`text-sm ${charCount > maxLength ? "text-red-400" : "text-gray-500"}`}>
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

interface SearchInputProps extends Omit<InputProps, "leftIcon"> {
  onSearch?: (value: string) => void;
  onClear?: () => void;
}

export function SearchInput({
  onSearch,
  onClear,
  placeholder = "Search...",
  ...props
}: SearchInputProps) {
  const [value, setValue] = useState("");

  const handleClear = () => {
    setValue("");
    onClear?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch?.(value);
    }
  };

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      leftIcon={
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      }
      rightIcon={
        value ? (
          <button onClick={handleClear} className="hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ) : null
      }
    />
  );
}
