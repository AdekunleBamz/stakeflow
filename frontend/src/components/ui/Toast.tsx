"use client";

import { ReactNode, useEffect, useState, createContext, useContext, useCallback } from "react";

type ToastVariant = "success" | "error" | "warning" | "info" | "loading";
type ToastPosition = "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center";

interface Toast {
  id: string;
  title?: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => string;
  removeToast: (id: string) => void;
  success: (message: string, title?: string) => string;
  error: (message: string, title?: string) => string;
  warning: (message: string, title?: string) => string;
  info: (message: string, title?: string) => string;
  loading: (message: string, title?: string) => string;
  update: (id: string, toast: Partial<Omit<Toast, "id">>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

interface ToastProviderProps {
  children: ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
}

export function ToastProvider({
  children,
  position = "top-right",
  maxToasts = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newToast = { ...toast, id };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        if (updated.length > maxToasts) {
          return updated.slice(-maxToasts);
        }
        return updated;
      });

      if (toast.variant !== "loading" && toast.duration !== 0) {
        setTimeout(() => {
          removeToast(id);
        }, toast.duration || 5000);
      }

      return id;
    },
    [maxToasts, removeToast]
  );

  const update = useCallback((id: string, updates: Partial<Omit<Toast, "id">>) => {
    setToasts((prev) =>
      prev.map((toast) => (toast.id === id ? { ...toast, ...updates } : toast))
    );
    if (updates.variant !== "loading") {
      setTimeout(() => {
        removeToast(id);
      }, updates.duration || 5000);
    }
  }, [removeToast]);

  const success = useCallback(
    (message: string, title?: string) => addToast({ message, title, variant: "success" }),
    [addToast]
  );

  const error = useCallback(
    (message: string, title?: string) => addToast({ message, title, variant: "error" }),
    [addToast]
  );

  const warning = useCallback(
    (message: string, title?: string) => addToast({ message, title, variant: "warning" }),
    [addToast]
  );

  const info = useCallback(
    (message: string, title?: string) => addToast({ message, title, variant: "info" }),
    [addToast]
  );

  const loading = useCallback(
    (message: string, title?: string) => addToast({ message, title, variant: "loading", duration: 0 }),
    [addToast]
  );

  const positionStyles: Record<ToastPosition, string> = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  };

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, success, error, warning, info, loading, update }}
    >
      {children}
      <div className={`fixed ${positionStyles[position]} z-50 flex flex-col gap-3 pointer-events-none`}>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

function ToastItem({ toast, onClose }: ToastItemProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const variantStyles: Record<ToastVariant, { bg: string; icon: ReactNode; border: string }> = {
    success: {
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      icon: (
        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    error: {
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      icon: (
        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
    },
    warning: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      icon: (
        <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    info: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      icon: (
        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    loading: {
      bg: "bg-purple-500/10",
      border: "border-purple-500/30",
      icon: (
        <svg className="w-5 h-5 text-purple-400 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ),
    },
  };

  const styles = variantStyles[toast.variant];

  return (
    <div
      className={`pointer-events-auto w-80 ${styles.bg} backdrop-blur-sm border ${styles.border} rounded-lg shadow-lg transition-all duration-300 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
      }`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">{styles.icon}</div>
          <div className="flex-1 min-w-0">
            {toast.title && (
              <p className="text-sm font-medium text-white">{toast.title}</p>
            )}
            <p className={`text-sm text-gray-300 ${toast.title ? "mt-1" : ""}`}>
              {toast.message}
            </p>
            {toast.action && (
              <button
                onClick={toast.action.onClick}
                className="mt-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
              >
                {toast.action.label}
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// Simple toast function for standalone use
interface ToastOptions {
  title?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function toast(message: string, variant: ToastVariant = "info", options?: ToastOptions) {
  const event = new CustomEvent("toast", {
    detail: { message, variant, ...options },
  });
  window.dispatchEvent(event);
}

toast.success = (message: string, options?: ToastOptions) => toast(message, "success", options);
toast.error = (message: string, options?: ToastOptions) => toast(message, "error", options);
toast.warning = (message: string, options?: ToastOptions) => toast(message, "warning", options);
toast.info = (message: string, options?: ToastOptions) => toast(message, "info", options);
toast.loading = (message: string, options?: ToastOptions) => toast(message, "loading", options);
