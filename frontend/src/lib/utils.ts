/**
 * Utility functions for StakeFlow frontend
 */

/**
 * Formats a number with thousand separators
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

/**
 * Truncates a Stacks address for display
 */
export function truncateAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

/**
 * Formats microSTX to STX with decimal places
 */
export function formatSTX(microStx: number, decimals = 6): string {
  return (microStx / 1_000_000).toFixed(decimals);
}

/**
 * Formats micro tokens to readable format
 */
export function formatTokens(amount: number, decimals = 6): string {
  const value = amount / 1_000_000;
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: decimals,
  });
}

/**
 * Calculates time difference from block height
 */
export function blocksToTime(blocks: number): string {
  const seconds = blocks * 10; // ~10 seconds per block on Stacks
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  return `${minutes}m`;
}
