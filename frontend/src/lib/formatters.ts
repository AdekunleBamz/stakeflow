/**
 * Utility functions for formatting values
 */

/**
 * Format a number with commas and optional decimals
 */
export function formatNumber(value: number, decimals: number = 0): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format STF token amount (6 decimals)
 */
export function formatSTF(microSTF: number): string {
  const stf = microSTF / 1_000_000;
  if (stf >= 1_000_000) {
    return `${(stf / 1_000_000).toFixed(2)}M STF`;
  }
  if (stf >= 1_000) {
    return `${(stf / 1_000).toFixed(2)}K STF`;
  }
  return `${stf.toFixed(2)} STF`;
}

/**
 * Format STX amount (6 decimals)
 */
export function formatSTX(microSTX: number): string {
  return `${(microSTX / 1_000_000).toFixed(6)} STX`;
}

/**
 * Format address for display (truncated)
 */
export function formatAddress(address: string, chars: number = 4): string {
  if (address.length <= chars * 2 + 3) return address;
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

/**
 * Format block height
 */
export function formatBlockHeight(height: number): string {
  return `#${formatNumber(height)}`;
}

/**
 * Format time remaining from blocks
 */
export function formatBlocksToTime(blocks: number): string {
  // Average Stacks block time is ~10 minutes
  const minutes = blocks * 10;
  
  if (minutes < 60) {
    return `~${minutes} minutes`;
  }
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `~${hours} hour${hours > 1 ? "s" : ""}`;
  }
  
  const days = Math.floor(hours / 24);
  return `~${days} day${days > 1 ? "s" : ""}`;
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) {
    return "just now";
  }
  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  }
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  }
  if (diffDays < 7) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  }
  
  return date.toLocaleDateString();
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format datetime for display
 */
export function formatDateTime(date: Date): string {
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
