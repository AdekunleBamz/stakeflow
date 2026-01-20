/**
 * Type definitions for StakeFlow frontend
 */

export interface NFTAsset {
  id: number;
  isStaked: boolean;
  stakedAt?: number;
  pendingRewards?: number;
}

export interface StakingInfo {
  nftId: number;
  stakedAt: number;
  lastClaimBlock: number;
  owner: string;
}

export interface UserStats {
  totalNFTs: number;
  stakedNFTs: number;
  unstakedNFTs: number;
  totalRewardsEarned: number;
  pendingRewards: number;
}

export interface ContractInfo {
  address: string;
  name: string;
}

export interface TransactionResult {
  txId: string;
  status: 'pending' | 'success' | 'failed';
}

export interface MintEvent {
  tokenId: number;
  recipient: string;
  txId: string;
}

export interface StakeEvent {
  nftId: number;
  staker: string;
  stakedAt: number;
  txId: string;
}

export interface RewardClaim {
  amount: number;
  claimedAt: number;
  txId: string;
}

// Re-export from individual type files
export * from './nft';
export * from './staking';
export * from './transaction';
export * from './user';
export * from './api';

// Common utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type AsyncState<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

// Network types
export type NetworkType = 'mainnet' | 'testnet' | 'devnet';

// Wallet types
export type WalletProvider = 'leather' | 'xverse' | 'okx' | 'other';

// UI types
export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ModalType = 'stake' | 'unstake' | 'claim' | 'mint' | 'transfer' | 'confirm' | 'settings';
export type SortDirection = 'asc' | 'desc';
