/**
 * Validation utility functions
 */

import { MINT_PRICE, UNSTAKE_FEE } from "./constants";

/**
 * Validate Stacks address format
 */
export function isValidStacksAddress(address: string): boolean {
  // Stacks addresses start with SP (mainnet) or ST (testnet)
  const stacksAddressRegex = /^(SP|ST)[A-Z0-9]{38,40}$/;
  return stacksAddressRegex.test(address);
}

/**
 * Validate principal format (address.contract-name or just address)
 */
export function isValidPrincipal(principal: string): boolean {
  const parts = principal.split(".");
  if (parts.length === 1) {
    return isValidStacksAddress(parts[0]);
  }
  if (parts.length === 2) {
    return isValidStacksAddress(parts[0]) && isValidContractName(parts[1]);
  }
  return false;
}

/**
 * Validate contract name format
 */
export function isValidContractName(name: string): boolean {
  // Contract names must be alphanumeric with hyphens, 1-40 chars
  const contractNameRegex = /^[a-z][a-z0-9-]{0,39}$/;
  return contractNameRegex.test(name);
}

/**
 * Validate NFT token ID
 */
export function isValidTokenId(tokenId: number): boolean {
  return Number.isInteger(tokenId) && tokenId > 0 && tokenId <= 10000;
}

/**
 * Validate mint quantity
 */
export function isValidMintQuantity(quantity: number): boolean {
  return Number.isInteger(quantity) && quantity >= 1 && quantity <= 10;
}

/**
 * Check if user has sufficient STX for mint
 */
export function hasSufficientSTXForMint(
  balanceMicroSTX: number,
  quantity: number
): boolean {
  const totalCost = MINT_PRICE * quantity;
  const estimatedFee = 10000; // 0.01 STX for transaction fee
  return balanceMicroSTX >= totalCost + estimatedFee;
}

/**
 * Check if user has sufficient STX for unstake
 */
export function hasSufficientSTXForUnstake(balanceMicroSTX: number): boolean {
  const estimatedFee = 10000; // 0.01 STX for transaction fee
  return balanceMicroSTX >= UNSTAKE_FEE + estimatedFee;
}

/**
 * Validate staking duration
 */
export function isValidStakingDuration(blocks: number): boolean {
  // Minimum 1 block, maximum 52560 blocks (~1 year at 10 min/block)
  return Number.isInteger(blocks) && blocks >= 1 && blocks <= 52560;
}

/**
 * Check if NFT is stakeable
 */
export function isNFTStakeable(nft: {
  isStaked: boolean;
  tokenId: number;
}): boolean {
  return !nft.isStaked && isValidTokenId(nft.tokenId);
}

/**
 * Check if NFT is unstakeable
 */
export function isNFTUnstakeable(nft: {
  isStaked: boolean;
  stakingEndBlock?: number;
  currentBlock: number;
}): boolean {
  if (!nft.isStaked) return false;
  if (!nft.stakingEndBlock) return true;
  return nft.currentBlock >= nft.stakingEndBlock;
}

/**
 * Validate transaction hash format
 */
export function isValidTxHash(hash: string): boolean {
  const txHashRegex = /^0x[a-fA-F0-9]{64}$/;
  return txHashRegex.test(hash);
}

/**
 * Sanitize input string
 */
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "");
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
