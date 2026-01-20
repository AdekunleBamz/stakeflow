// UI configuration for StakeFlow
export const THEME = {
  colors: {
    primary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7e22ce',
      800: '#6b21a8',
      900: '#581c87',
    },
    secondary: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
    },
  },
  gradients: {
    primary: 'from-purple-600 to-indigo-600',
    secondary: 'from-purple-500 to-pink-500',
    success: 'from-green-500 to-emerald-500',
    warning: 'from-yellow-500 to-orange-500',
    danger: 'from-red-500 to-rose-500',
    dark: 'from-gray-900 to-gray-800',
  },
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const ANIMATIONS = {
  fadeIn: 'animate-fadeIn',
  slideUp: 'animate-slideUp',
  slideDown: 'animate-slideDown',
  pulse: 'animate-pulse',
  spin: 'animate-spin',
  bounce: 'animate-bounce',
} as const;

export const SPACING = {
  page: 'px-4 sm:px-6 lg:px-8',
  section: 'py-12 sm:py-16 lg:py-20',
  card: 'p-4 sm:p-6',
} as const;

export const SHADOWS = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  glow: 'shadow-[0_0_20px_rgba(168,85,247,0.3)]',
  glowStrong: 'shadow-[0_0_40px_rgba(168,85,247,0.5)]',
} as const;

export const BORDERS = {
  default: 'border border-gray-700',
  hover: 'hover:border-purple-500',
  focus: 'focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50',
  gradient: 'border border-transparent bg-gradient-to-r from-purple-500 to-indigo-500',
} as const;

export const TYPOGRAPHY = {
  heading1: 'text-4xl sm:text-5xl lg:text-6xl font-bold',
  heading2: 'text-3xl sm:text-4xl font-bold',
  heading3: 'text-2xl sm:text-3xl font-semibold',
  heading4: 'text-xl sm:text-2xl font-semibold',
  body: 'text-base text-gray-300',
  small: 'text-sm text-gray-400',
  tiny: 'text-xs text-gray-500',
} as const;

export const TRANSITIONS = {
  fast: 'transition-all duration-150',
  normal: 'transition-all duration-300',
  slow: 'transition-all duration-500',
} as const;

export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modal: 40,
  tooltip: 50,
  toast: 60,
} as const;
