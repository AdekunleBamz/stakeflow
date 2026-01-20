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
