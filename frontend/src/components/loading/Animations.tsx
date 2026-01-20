'use client';

import { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 1000,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const startValue = useRef(0);
  const startTime = useRef<number>(0);

  useEffect(() => {
    startValue.current = displayValue;
    startTime.current = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue.current + (value - startValue.current) * eased;
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <span className={className}>
      {prefix}
      {displayValue.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FadeIn({ children, delay = 0, duration = 300, className = '' }: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}

interface StaggerChildrenProps {
  children: React.ReactNode[];
  stagger?: number;
  className?: string;
}

export function StaggerChildren({ children, stagger = 50, className = '' }: StaggerChildrenProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <FadeIn key={index} delay={index * stagger}>
          {child}
        </FadeIn>
      ))}
    </div>
  );
}

interface SlideInProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
}

export function SlideIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 300,
  className = '',
}: SlideInProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const transforms = {
    left: 'translateX(-20px)',
    right: 'translateX(20px)',
    up: 'translateY(20px)',
    down: 'translateY(-20px)',
  };

  return (
    <div
      className={`transition-all ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0)' : transforms[direction],
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}

interface PulseOnChangeProps {
  children: React.ReactNode;
  trigger: unknown;
  className?: string;
}

export function PulseOnChange({ children, trigger, className = '' }: PulseOnChangeProps) {
  const [isPulsing, setIsPulsing] = useState(false);
  const prevTrigger = useRef(trigger);

  useEffect(() => {
    if (prevTrigger.current !== trigger) {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 300);
      prevTrigger.current = trigger;
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <div
      className={`transition-transform ${className}`}
      style={{
        transform: isPulsing ? 'scale(1.05)' : 'scale(1)',
      }}
    >
      {children}
    </div>
  );
}

interface GlowProps {
  children: React.ReactNode;
  color?: string;
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export function Glow({ children, color = 'purple', intensity = 'medium', className = '' }: GlowProps) {
  const intensityValues = {
    low: '0 0 10px',
    medium: '0 0 20px',
    high: '0 0 30px',
  };

  const colorValues: Record<string, string> = {
    purple: 'rgb(168, 85, 247)',
    green: 'rgb(34, 197, 94)',
    blue: 'rgb(59, 130, 246)',
    yellow: 'rgb(234, 179, 8)',
  };

  return (
    <div
      className={className}
      style={{
        boxShadow: `${intensityValues[intensity]} ${colorValues[color] || color}`,
      }}
    >
      {children}
    </div>
  );
}

interface ShimmerProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

export function Shimmer({ className = '', width, height }: ShimmerProps) {
  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={`relative overflow-hidden bg-gray-800 rounded-lg ${className}`}
      style={style}
    >
      <div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"
        style={{
          animation: 'shimmer 2s infinite',
        }}
      />
    </div>
  );
}
