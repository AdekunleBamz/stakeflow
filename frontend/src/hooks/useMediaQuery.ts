"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseMediaQueryOptions {
  defaultValue?: boolean;
}

export function useMediaQuery(
  query: string,
  { defaultValue = false }: UseMediaQueryOptions = {}
): boolean {
  const [matches, setMatches] = useState(defaultValue);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 768px)");
}

export function useIsTablet(): boolean {
  return useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
}

export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1025px)");
}

export function usePrefersDarkMode(): boolean {
  return useMediaQuery("(prefers-color-scheme: dark)");
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}

interface ScrollPosition {
  x: number;
  y: number;
}

export function useScrollPosition(): ScrollPosition {
  const [position, setPosition] = useState<ScrollPosition>({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setPosition({
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return position;
}

export function useScrollLock(lock: boolean = true): void {
  useEffect(() => {
    if (!lock) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [lock]);
}

export function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: () => void
): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
}

export function useKeyPress(targetKey: string): boolean {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const downHandler = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        setKeyPressed(true);
      }
    };

    const upHandler = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKey]);

  return keyPressed;
}

export function useEscapeKey(handler: () => void): void {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handler();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [handler]);
}
