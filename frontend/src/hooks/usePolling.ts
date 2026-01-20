"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchCurrentBlock } from "../lib/api";

interface UsePollingOptions<T> {
  fetcher: () => Promise<T>;
  interval: number;
  enabled?: boolean;
  onError?: (error: Error) => void;
}

export function usePolling<T>({
  fetcher,
  interval,
  enabled = true,
  onError,
}: UsePollingOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const result = await fetcher();
      setData(result);
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);
      if (onError) {
        onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [fetcher, onError]);

  useEffect(() => {
    if (!enabled) return;

    fetchData();

    const intervalId = setInterval(fetchData, interval);

    return () => clearInterval(intervalId);
  }, [fetchData, interval, enabled]);

  const refetch = useCallback(() => {
    setIsLoading(true);
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch };
}

interface UseBlockPollingOptions {
  interval?: number;
  enabled?: boolean;
}

export function useBlockPolling({
  interval = 30000,
  enabled = true,
}: UseBlockPollingOptions = {}) {
  return usePolling({
    fetcher: fetchCurrentBlock,
    interval,
    enabled,
  });
}

interface UseAutoRefreshOptions {
  interval: number;
  enabled?: boolean;
}

export function useAutoRefresh({
  interval,
  enabled = true,
}: UseAutoRefreshOptions) {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const intervalId = setInterval(() => {
      setRefreshKey((prev) => prev + 1);
    }, interval);

    return () => clearInterval(intervalId);
  }, [interval, enabled]);

  const refresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return { refreshKey, refresh };
}

interface UseDebounceOptions {
  delay: number;
}

export function useDebounce<T>(
  value: T,
  { delay }: UseDebounceOptions
): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const [lastRan, setLastRan] = useState(Date.now());

  useEffect(() => {
    const now = Date.now();
    if (now - lastRan >= limit) {
      setThrottledValue(value);
      setLastRan(now);
    } else {
      const timer = setTimeout(() => {
        setThrottledValue(value);
        setLastRan(Date.now());
      }, limit - (now - lastRan));

      return () => clearTimeout(timer);
    }
  }, [value, limit, lastRan]);

  return throttledValue;
}
