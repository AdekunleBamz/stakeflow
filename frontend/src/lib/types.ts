/**
 * Core type definitions for StakeFlow application
 */

export interface NFTAsset {
  id: number;
  isStaked: boolean;
  stakedAt?: number;
  stakedBlock?: number;
  pendingRewards?: number;
}

export interface StakingInfo {
  tokenId: number;
  owner: string;
  stakedAt: number;
  lastClaim: number;
}

export interface UserStats {
  totalNFTs: number;
  stakedNFTs: number;
  unstakedNFTs: number;
  totalRewardsEarned: number;
  pendingRewards: number;
  stfBalance: number;
}

export interface TransactionResult {
  txId: string;
  status: 'pending' | 'success' | 'failed';
  timestamp: number;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  stxBalance: number;
  stfBalance: number;
}

export interface ContractAddresses {
  TOKEN: string;
  NFT: string;
  STAKING: string;
  REWARDS: string;
  UNSTAKE: string;
}

export type NetworkType = 'mainnet' | 'testnet' | 'devnet';

export interface AppConfig {
  network: NetworkType;
  contracts: ContractAddresses;
  apiBase: string;
}
