'use client';

import { useState, useEffect } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export function LoadingSpinner({ size = 'md', color = 'purple' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div
      className={`${sizeClasses[size]} border-2 border-${color}-500/30 border-t-${color}-500 rounded-full animate-spin`}
    />
  );
}

interface LoadingDotsProps {
  color?: string;
}

export function LoadingDots({ color = 'purple' }: LoadingDotsProps) {
  return (
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`w-2 h-2 bg-${color}-500 rounded-full animate-bounce`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );
}

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className = '', variant = 'rectangular', width, height }: SkeletonProps) {
  const baseClasses = 'bg-gray-700 animate-pulse';
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} style={style} />;
}

interface SkeletonCardProps {
  lines?: number;
}

export function SkeletonCard({ lines = 3 }: SkeletonCardProps) {
  return (
    <div className="p-6 bg-gray-800/50 rounded-2xl space-y-4">
      <Skeleton height={48} width={48} variant="circular" />
      <Skeleton height={24} width="60%" />
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} height={16} width={`${100 - i * 15}%`} />
      ))}
    </div>
  );
}

export function SkeletonNFTCard() {
  return (
    <div className="p-4 bg-gray-800/50 rounded-xl space-y-3">
      <Skeleton height={180} className="w-full" />
      <Skeleton height={20} width="40%" />
      <div className="flex justify-between">
        <Skeleton height={16} width="30%" />
        <Skeleton height={16} width="20%" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      <div className="flex gap-4 p-4 bg-gray-800/30 rounded-t-lg">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} height={16} className="flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 p-4 bg-gray-800/50">
          {[1, 2, 3, 4].map((j) => (
            <Skeleton key={j} height={16} className="flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

interface ProgressiveLoadProps {
  isLoading: boolean;
  children: React.ReactNode;
  skeleton?: React.ReactNode;
  delay?: number;
}

export function ProgressiveLoad({ isLoading, children, skeleton, delay = 200 }: ProgressiveLoadProps) {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setShowLoading(true), delay);
      return () => clearTimeout(timer);
    }
    setShowLoading(false);
  }, [isLoading, delay]);

  if (isLoading && showLoading) {
    return <>{skeleton || <LoadingSpinner />}</>;
  }

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
}

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

export function LoadingOverlay({ isVisible, message = 'Loading...' }: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-white font-medium">{message}</p>
      </div>
    </div>
  );
}

interface PulseIndicatorProps {
  isActive?: boolean;
  color?: 'green' | 'yellow' | 'red' | 'purple';
}

export function PulseIndicator({ isActive = true, color = 'green' }: PulseIndicatorProps) {
  const colorClasses = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
  };

  return (
    <span className="relative flex h-3 w-3">
      {isActive && (
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colorClasses[color]} opacity-75`} />
      )}
      <span className={`relative inline-flex rounded-full h-3 w-3 ${colorClasses[color]}`} />
    </span>
  );
}
