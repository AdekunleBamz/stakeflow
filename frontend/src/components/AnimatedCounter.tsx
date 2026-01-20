"use client";

import React, { useState, useEffect } from "react";
import { formatSTF, formatNumber } from "../lib/formatters";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  formatter?: (value: number) => string;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 1000,
  formatter = formatNumber,
  className = "",
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const startValue = displayValue;
    const difference = value - startValue;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = startValue + difference * easeProgress;
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <span className={className}>
      {formatter(Math.round(displayValue))}
    </span>
  );
}

interface AnimatedSTFCounterProps {
  value: number;
  duration?: number;
  className?: string;
}

export function AnimatedSTFCounter({
  value,
  duration = 1000,
  className = "",
}: AnimatedSTFCounterProps) {
  return (
    <AnimatedCounter
      value={value}
      duration={duration}
      formatter={formatSTF}
      className={className}
    />
  );
}

interface CountUpProps {
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: string;
  className?: string;
}

export function CountUp({
  start = 0,
  end,
  duration = 2000,
  delay = 0,
  prefix = "",
  suffix = "",
  decimals = 0,
  separator = ",",
  className = "",
}: CountUpProps) {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = performance.now();
    const startValue = start;
    const difference = end - startValue;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out expo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentValue = startValue + difference * easeProgress;
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [start, end, duration, hasStarted]);

  const formatValue = (value: number) => {
    const fixed = value.toFixed(decimals);
    const parts = fixed.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return parts.join(".");
  };

  return (
    <span className={className}>
      {prefix}
      {formatValue(count)}
      {suffix}
    </span>
  );
}

interface TickerProps {
  value: string;
  className?: string;
}

export function Ticker({ value, className = "" }: TickerProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value !== displayValue) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setDisplayValue(value);
        setIsAnimating(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [value, displayValue]);

  return (
    <span
      className={`inline-block transition-all duration-150 ${
        isAnimating ? "transform -translate-y-full opacity-0" : ""
      } ${className}`}
    >
      {displayValue}
    </span>
  );
}
