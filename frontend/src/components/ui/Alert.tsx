"use client";

import React from "react";

interface AlertProps {
  type: "info" | "success" | "warning" | "error";
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
}

export function Alert({
  type,
  title,
  children,
  onDismiss,
  className = "",
}: AlertProps) {
  const styles = {
    info: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/50",
      icon: "text-blue-400",
      title: "text-blue-300",
    },
    success: {
      bg: "bg-green-500/10",
      border: "border-green-500/50",
      icon: "text-green-400",
      title: "text-green-300",
    },
    warning: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/50",
      icon: "text-yellow-400",
      title: "text-yellow-300",
    },
    error: {
      bg: "bg-red-500/10",
      border: "border-red-500/50",
      icon: "text-red-400",
      title: "text-red-300",
    },
  };

  const icons = {
    info: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    success: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  const style = styles[type];

  return (
    <div
      className={`${style.bg} ${style.border} border rounded-lg p-4 ${className}`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 ${style.icon}`}>{icons[type]}</div>
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className={`text-sm font-medium ${style.title} mb-1`}>
              {title}
            </h3>
          )}
          <div className="text-sm text-gray-300">{children}</div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

interface BannerProps {
  type: "info" | "success" | "warning" | "error";
  children: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
  className?: string;
}

export function Banner({
  type,
  children,
  action,
  onDismiss,
  className = "",
}: BannerProps) {
  const bgColors = {
    info: "bg-blue-600",
    success: "bg-green-600",
    warning: "bg-yellow-600",
    error: "bg-red-600",
  };

  return (
    <div
      className={`${bgColors[type]} px-4 py-3 ${className}`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-white text-sm">
          {children}
        </div>
        <div className="flex items-center gap-3">
          {action && (
            <button
              onClick={action.onClick}
              className="text-sm font-medium text-white hover:text-gray-100 underline underline-offset-2"
            >
              {action.label}
            </button>
          )}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
