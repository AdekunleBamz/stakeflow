"use client";

import { ReactNode, forwardRef } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success" | "outline";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  rounded?: "default" | "full" | "none";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      onClick,
      disabled = false,
      variant = "primary",
      size = "md",
      className = "",
      type = "button",
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      rounded = "default",
    },
    ref
  ) => {
    const baseStyles =
      "font-semibold transition-all duration-200 inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900";

    const variants = {
      primary:
        "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl focus:ring-purple-500",
      secondary:
        "border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white bg-transparent focus:ring-gray-500",
      ghost:
        "text-gray-400 hover:text-white hover:bg-gray-800 focus:ring-gray-500",
      danger:
        "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white focus:ring-red-500",
      success:
        "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white focus:ring-green-500",
      outline:
        "border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 focus:ring-purple-500",
    };

    const sizes = {
      xs: "py-1 px-2 text-xs",
      sm: "py-2 px-4 text-sm",
      md: "py-3 px-6 text-base",
      lg: "py-4 px-8 text-lg",
      xl: "py-5 px-10 text-xl",
    };

    const roundedStyles = {
      default: "rounded-lg",
      full: "rounded-full",
      none: "rounded-none",
    };

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={isDisabled}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${roundedStyles[rounded]} ${
          isDisabled ? "opacity-50 cursor-not-allowed" : ""
        } ${fullWidth ? "w-full" : ""} ${className}`}
      >
        {loading ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

interface IconButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  label: string;
  loading?: boolean;
}

export function IconButton({
  icon,
  onClick,
  disabled = false,
  variant = "ghost",
  size = "md",
  className = "",
  label,
  loading = false,
}: IconButtonProps) {
  const sizes = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3",
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white",
    secondary:
      "border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white",
    ghost: "text-gray-400 hover:text-white hover:bg-gray-800",
    danger: "text-red-400 hover:text-red-300 hover:bg-red-500/10",
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      aria-label={label}
      className={`rounded-lg transition-all duration-200 ${variants[variant]} ${sizes[size]} ${
        isDisabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        icon
      )}
    </button>
  );
}

interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
  attached?: boolean;
}

export function ButtonGroup({ children, className = "", attached = false }: ButtonGroupProps) {
  return (
    <div
      className={`inline-flex ${attached ? "[&>*]:rounded-none [&>*:first-child]:rounded-l-lg [&>*:last-child]:rounded-r-lg" : "gap-2"} ${className}`}
    >
      {children}
    </div>
  );
}
