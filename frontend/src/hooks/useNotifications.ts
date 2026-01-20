'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => string;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

export function useNotifications(): NotificationState {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const timeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    const timeout = timeoutsRef.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timeoutsRef.current.delete(id);
    }
  }, []);

  const addNotification = useCallback(
    (notification: Omit<Notification, 'id'>) => {
      const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newNotification: Notification = { ...notification, id };

      setNotifications((prev) => [...prev, newNotification]);

      const duration = notification.duration ?? 5000;
      if (duration > 0) {
        const timeout = setTimeout(() => removeNotification(id), duration);
        timeoutsRef.current.set(id, timeout);
      }

      return id;
    },
    [removeNotification]
  );

  const clearAll = useCallback(() => {
    timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    timeoutsRef.current.clear();
    setNotifications([]);
  }, []);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  return { notifications, addNotification, removeNotification, clearAll };
}

// useToast convenience functions
export function useToast() {
  const { notifications, addNotification, removeNotification, clearAll } = useNotifications();

  const toast = {
    success: (title: string, message?: string, duration?: number) =>
      addNotification({ type: 'success', title, message, duration }),
    error: (title: string, message?: string, duration?: number) =>
      addNotification({ type: 'error', title, message, duration }),
    warning: (title: string, message?: string, duration?: number) =>
      addNotification({ type: 'warning', title, message, duration }),
    info: (title: string, message?: string, duration?: number) =>
      addNotification({ type: 'info', title, message, duration }),
  };

  return { notifications, toast, removeNotification, clearAll };
}

// useConfirm hook for confirmation dialogs
interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'default';
}

interface ConfirmState {
  isOpen: boolean;
  options: ConfirmOptions | null;
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  handleConfirm: () => void;
  handleCancel: () => void;
}

export function useConfirm(): ConfirmState {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback((opts: ConfirmOptions): Promise<boolean> => {
    setOptions(opts);
    setIsOpen(true);
    return new Promise((resolve) => {
      resolveRef.current = resolve;
    });
  }, []);

  const handleConfirm = useCallback(() => {
    setIsOpen(false);
    setOptions(null);
    resolveRef.current?.(true);
    resolveRef.current = null;
  }, []);

  const handleCancel = useCallback(() => {
    setIsOpen(false);
    setOptions(null);
    resolveRef.current?.(false);
    resolveRef.current = null;
  }, []);

  return { isOpen, options, confirm, handleConfirm, handleCancel };
}

// useCountdown hook
export function useCountdown(targetDate: Date | number, onComplete?: () => void) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });

  useEffect(() => {
    const target = typeof targetDate === 'number' ? targetDate : targetDate.getTime();

    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = target - now;

      if (difference <= 0) {
        onComplete?.();
        return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        total: difference,
      };
    };

    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      if (newTimeLeft.total <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  return timeLeft;
}
