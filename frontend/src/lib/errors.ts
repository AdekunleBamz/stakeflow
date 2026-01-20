/**
 * Error handling utilities
 */

/**
 * Custom error types
 */
export class StakeflowError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "StakeflowError";
  }
}

export class WalletError extends StakeflowError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, "WALLET_ERROR", details);
    this.name = "WalletError";
  }
}

export class ContractError extends StakeflowError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, "CONTRACT_ERROR", details);
    this.name = "ContractError";
  }
}

export class NetworkError extends StakeflowError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, "NETWORK_ERROR", details);
    this.name = "NetworkError";
  }
}

export class ValidationError extends StakeflowError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, "VALIDATION_ERROR", details);
    this.name = "ValidationError";
  }
}

/**
 * Error codes and messages
 */
export const ErrorMessages = {
  // Wallet errors
  WALLET_NOT_CONNECTED: "Please connect your wallet to continue",
  WALLET_CONNECTION_FAILED: "Failed to connect wallet",
  WALLET_DISCONNECTED: "Wallet disconnected unexpectedly",
  WALLET_REJECTED: "Transaction was rejected by the user",
  
  // Contract errors
  CONTRACT_CALL_FAILED: "Contract call failed",
  INSUFFICIENT_FUNDS: "Insufficient funds for this transaction",
  NFT_NOT_OWNED: "You do not own this NFT",
  NFT_ALREADY_STAKED: "This NFT is already staked",
  NFT_NOT_STAKED: "This NFT is not staked",
  STAKING_LOCKED: "Staking is currently locked for this NFT",
  NO_REWARDS_AVAILABLE: "No rewards available to claim",
  
  // Network errors
  NETWORK_UNAVAILABLE: "Network is currently unavailable",
  API_ERROR: "Failed to fetch data from API",
  TIMEOUT: "Request timed out",
  
  // Validation errors
  INVALID_TOKEN_ID: "Invalid NFT token ID",
  INVALID_ADDRESS: "Invalid Stacks address",
  INVALID_AMOUNT: "Invalid amount",
  MINT_LIMIT_EXCEEDED: "Mint limit exceeded",
} as const;

/**
 * Parse error from unknown source
 */
export function parseError(error: unknown): StakeflowError {
  if (error instanceof StakeflowError) {
    return error;
  }
  
  if (error instanceof Error) {
    // Check for common error patterns
    const message = error.message.toLowerCase();
    
    if (message.includes("user rejected") || message.includes("cancelled")) {
      return new WalletError(ErrorMessages.WALLET_REJECTED);
    }
    
    if (message.includes("insufficient") || message.includes("not enough")) {
      return new ContractError(ErrorMessages.INSUFFICIENT_FUNDS);
    }
    
    if (message.includes("network") || message.includes("fetch")) {
      return new NetworkError(ErrorMessages.NETWORK_UNAVAILABLE);
    }
    
    return new StakeflowError(error.message, "UNKNOWN_ERROR");
  }
  
  if (typeof error === "string") {
    return new StakeflowError(error, "UNKNOWN_ERROR");
  }
  
  return new StakeflowError("An unexpected error occurred", "UNKNOWN_ERROR");
}

/**
 * Get user-friendly error message
 */
export function getErrorMessage(error: unknown): string {
  const parsed = parseError(error);
  return parsed.message;
}

/**
 * Check if error is a user cancellation
 */
export function isUserCancellation(error: unknown): boolean {
  const parsed = parseError(error);
  return (
    parsed.code === "WALLET_ERROR" &&
    parsed.message === ErrorMessages.WALLET_REJECTED
  );
}

/**
 * Check if error is recoverable
 */
export function isRecoverableError(error: unknown): boolean {
  const parsed = parseError(error);
  return (
    parsed.code === "NETWORK_ERROR" ||
    parsed.code === "WALLET_ERROR"
  );
}

/**
 * Log error with context
 */
export function logError(
  error: unknown,
  context?: Record<string, unknown>
): void {
  const parsed = parseError(error);
  console.error(`[${parsed.code}] ${parsed.message}`, {
    ...parsed.details,
    ...context,
    stack: parsed.stack,
  });
}

/**
 * Create error handler with toast notification
 */
export function createErrorHandler(
  showToast: (message: string, type: "error" | "success" | "info") => void
) {
  return (error: unknown, context?: string) => {
    const message = getErrorMessage(error);
    const prefix = context ? `${context}: ` : "";
    
    if (!isUserCancellation(error)) {
      showToast(`${prefix}${message}`, "error");
      logError(error, { context });
    }
  };
}
