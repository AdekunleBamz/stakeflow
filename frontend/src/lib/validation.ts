// Validation utilities for StakeFlow

export function isValidStacksAddress(address: string): boolean {
  if (!address) return false;
  // Stacks addresses start with SP (mainnet) or ST (testnet)
  const pattern = /^S[PT][A-Z0-9]{38,39}$/;
  return pattern.test(address);
}

export function isValidContractAddress(address: string): boolean {
  if (!address) return false;
  const parts = address.split('.');
  if (parts.length !== 2) return false;
  return isValidStacksAddress(parts[0]) && /^[a-z][a-z0-9-]*$/.test(parts[1]);
}

export function isValidTxHash(hash: string): boolean {
  if (!hash) return false;
  const pattern = /^0x[a-fA-F0-9]{64}$/;
  return pattern.test(hash);
}

export function isValidTokenId(id: number | string): boolean {
  const num = typeof id === 'string' ? parseInt(id, 10) : id;
  return Number.isInteger(num) && num > 0 && num <= 10000;
}

export function isValidAmount(amount: number | string): boolean {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return !isNaN(num) && num > 0 && isFinite(num);
}

export function isValidEmail(email: string): boolean {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function validateMintQuantity(
  quantity: number,
  maxPerWallet: number,
  currentOwned: number
): { valid: boolean; error?: string } {
  if (!Number.isInteger(quantity) || quantity < 1) {
    return { valid: false, error: 'Quantity must be at least 1' };
  }
  if (quantity > maxPerWallet) {
    return { valid: false, error: `Maximum ${maxPerWallet} per transaction` };
  }
  if (currentOwned + quantity > maxPerWallet) {
    return {
      valid: false,
      error: `You can only own ${maxPerWallet} NFTs. Currently own: ${currentOwned}`,
    };
  }
  return { valid: true };
}

export function validateStakeSelection(
  tokenIds: number[],
  ownedIds: number[],
  alreadyStaked: number[]
): { valid: boolean; error?: string; invalidIds?: number[] } {
  if (tokenIds.length === 0) {
    return { valid: false, error: 'Please select at least one NFT' };
  }

  const notOwned = tokenIds.filter((id) => !ownedIds.includes(id));
  if (notOwned.length > 0) {
    return {
      valid: false,
      error: 'You do not own some selected NFTs',
      invalidIds: notOwned,
    };
  }

  const alreadyStakedSelected = tokenIds.filter((id) => alreadyStaked.includes(id));
  if (alreadyStakedSelected.length > 0) {
    return {
      valid: false,
      error: 'Some selected NFTs are already staked',
      invalidIds: alreadyStakedSelected,
    };
  }

  return { valid: true };
}

export function validateUnstakeSelection(
  tokenIds: number[],
  stakedIds: number[]
): { valid: boolean; error?: string; invalidIds?: number[] } {
  if (tokenIds.length === 0) {
    return { valid: false, error: 'Please select at least one NFT' };
  }

  const notStaked = tokenIds.filter((id) => !stakedIds.includes(id));
  if (notStaked.length > 0) {
    return {
      valid: false,
      error: 'Some selected NFTs are not staked',
      invalidIds: notStaked,
    };
  }

  return { valid: true };
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
