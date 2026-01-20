"use client";

import React from "react";

interface NotificationItemProps {
  type: "success" | "info" | "warning" | "error";
  title: string;
  message: string;
  time: string;
  read?: boolean;
  onRead?: () => void;
  onClick?: () => void;
}

export function NotificationItem({
  type,
  title,
  message,
  time,
  read = false,
  onRead,
  onClick,
}: NotificationItemProps) {
  const typeStyles = {
    success: {
      bg: "bg-green-500/10",
      icon: "text-green-400",
    },
    info: {
      bg: "bg-blue-500/10",
      icon: "text-blue-400",
    },
    warning: {
      bg: "bg-yellow-500/10",
      icon: "text-yellow-400",
    },
    error: {
      bg: "bg-red-500/10",
      icon: "text-red-400",
    },
  };

  const icons = {
    success: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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

  const style = typeStyles[type];

  return (
    <div
      className={`flex gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
        read ? "bg-gray-800/30" : style.bg
      } hover:bg-gray-800`}
      onClick={() => {
        if (onRead && !read) onRead();
        if (onClick) onClick();
      }}
    >
      <div className={`flex-shrink-0 ${style.icon}`}>{icons[type]}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4
            className={`text-sm font-medium ${
              read ? "text-gray-400" : "text-white"
            }`}
          >
            {title}
          </h4>
          {!read && (
            <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />
          )}
        </div>
        <p className="text-xs text-gray-500 mt-0.5 truncate">{message}</p>
        <p className="text-xs text-gray-600 mt-1">{time}</p>
      </div>
    </div>
  );
}

interface Notification {
  id: string;
  type: "success" | "info" | "warning" | "error";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationListProps {
  notifications: Notification[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  onClear: () => void;
  className?: string;
}

export function NotificationList({
  notifications,
  onMarkRead,
  onMarkAllRead,
  onClear,
  className = "",
}: NotificationListProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className={`bg-gray-900 border border-gray-700 rounded-xl ${className}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-white">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 text-xs bg-purple-500 text-white rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllRead}
              className="text-xs text-purple-400 hover:text-purple-300"
            >
              Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={onClear}
              className="text-xs text-gray-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">
            No notifications
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                type={notification.type}
                title={notification.title}
                message={notification.message}
                time={notification.time}
                read={notification.read}
                onRead={() => onMarkRead(notification.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
