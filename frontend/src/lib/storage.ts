/**
 * Storage utilities for local persistence
 */

const STORAGE_PREFIX = "stakeflow_";

/**
 * Storage keys
 */
export const StorageKeys = {
  WALLET_ADDRESS: `${STORAGE_PREFIX}wallet_address`,
  THEME: `${STORAGE_PREFIX}theme`,
  LAST_CONNECTED: `${STORAGE_PREFIX}last_connected`,
  FAVORITE_NFTS: `${STORAGE_PREFIX}favorite_nfts`,
  NOTIFICATION_PREFERENCES: `${STORAGE_PREFIX}notification_prefs`,
  TRANSACTION_HISTORY: `${STORAGE_PREFIX}tx_history`,
  DISMISSED_ALERTS: `${STORAGE_PREFIX}dismissed_alerts`,
} as const;

/**
 * Check if localStorage is available
 */
function isLocalStorageAvailable(): boolean {
  try {
    const testKey = "__storage_test__";
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get item from localStorage
 */
export function getStorageItem<T>(key: string, defaultValue: T): T {
  if (!isLocalStorageAvailable()) {
    return defaultValue;
  }
  
  try {
    const item = window.localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item) as T;
  } catch {
    return defaultValue;
  }
}

/**
 * Set item in localStorage
 */
export function setStorageItem<T>(key: string, value: T): boolean {
  if (!isLocalStorageAvailable()) {
    return false;
  }
  
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Remove item from localStorage
 */
export function removeStorageItem(key: string): boolean {
  if (!isLocalStorageAvailable()) {
    return false;
  }
  
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

/**
 * Clear all stakeflow items from localStorage
 */
export function clearAllStorageItems(): boolean {
  if (!isLocalStorageAvailable()) {
    return false;
  }
  
  try {
    Object.values(StorageKeys).forEach((key) => {
      window.localStorage.removeItem(key);
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Get wallet address from storage
 */
export function getStoredWalletAddress(): string | null {
  return getStorageItem<string | null>(StorageKeys.WALLET_ADDRESS, null);
}

/**
 * Save wallet address to storage
 */
export function saveWalletAddress(address: string): boolean {
  setStorageItem(StorageKeys.LAST_CONNECTED, Date.now());
  return setStorageItem(StorageKeys.WALLET_ADDRESS, address);
}

/**
 * Clear wallet address from storage
 */
export function clearWalletAddress(): boolean {
  return removeStorageItem(StorageKeys.WALLET_ADDRESS);
}

/**
 * Get favorite NFT token IDs
 */
export function getFavoriteNFTs(): number[] {
  return getStorageItem<number[]>(StorageKeys.FAVORITE_NFTS, []);
}

/**
 * Add NFT to favorites
 */
export function addFavoriteNFT(tokenId: number): boolean {
  const favorites = getFavoriteNFTs();
  if (!favorites.includes(tokenId)) {
    favorites.push(tokenId);
    return setStorageItem(StorageKeys.FAVORITE_NFTS, favorites);
  }
  return true;
}

/**
 * Remove NFT from favorites
 */
export function removeFavoriteNFT(tokenId: number): boolean {
  const favorites = getFavoriteNFTs();
  const index = favorites.indexOf(tokenId);
  if (index > -1) {
    favorites.splice(index, 1);
    return setStorageItem(StorageKeys.FAVORITE_NFTS, favorites);
  }
  return true;
}

/**
 * Toggle NFT favorite status
 */
export function toggleFavoriteNFT(tokenId: number): boolean {
  const favorites = getFavoriteNFTs();
  if (favorites.includes(tokenId)) {
    return removeFavoriteNFT(tokenId);
  }
  return addFavoriteNFT(tokenId);
}

/**
 * Check if NFT is favorited
 */
export function isNFTFavorited(tokenId: number): boolean {
  return getFavoriteNFTs().includes(tokenId);
}

/**
 * Get theme preference
 */
export function getThemePreference(): "dark" | "light" | "system" {
  return getStorageItem<"dark" | "light" | "system">(StorageKeys.THEME, "dark");
}

/**
 * Set theme preference
 */
export function setThemePreference(theme: "dark" | "light" | "system"): boolean {
  return setStorageItem(StorageKeys.THEME, theme);
}

/**
 * Transaction history entry
 */
interface TransactionHistoryEntry {
  txId: string;
  type: "mint" | "stake" | "unstake" | "claim" | "transfer";
  timestamp: number;
  tokenId?: number;
  amount?: number;
}

/**
 * Get transaction history
 */
export function getTransactionHistory(): TransactionHistoryEntry[] {
  return getStorageItem<TransactionHistoryEntry[]>(
    StorageKeys.TRANSACTION_HISTORY,
    []
  );
}

/**
 * Add transaction to history
 */
export function addTransactionToHistory(
  entry: Omit<TransactionHistoryEntry, "timestamp">
): boolean {
  const history = getTransactionHistory();
  history.unshift({
    ...entry,
    timestamp: Date.now(),
  });
  // Keep only last 50 transactions
  const trimmedHistory = history.slice(0, 50);
  return setStorageItem(StorageKeys.TRANSACTION_HISTORY, trimmedHistory);
}

/**
 * Clear transaction history
 */
export function clearTransactionHistory(): boolean {
  return removeStorageItem(StorageKeys.TRANSACTION_HISTORY);
}
