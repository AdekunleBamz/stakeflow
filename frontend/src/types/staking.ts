// Staking type definitions for StakeFlow

export interface StakingInfo {
  tokenId: number;
  owner: string;
  stakedAt: number;
  lastClaimBlock: number;
  accumulatedRewards: number;
}

export interface StakingStats {
  totalNFTsStaked: number;
  totalRewardsDistributed: number;
  rewardsPerBlock: number;
  currentAPY: number;
  uniqueStakers: number;
}

export interface UserStakingStats {
  address: string;
  stakedNFTs: number[];
  totalStaked: number;
  pendingRewards: number;
  claimedRewards: number;
  stakingTier: StakingTier;
  multiplier: number;
}

export interface StakingTier {
  name: string;
  minStaked: number;
  multiplier: number;
  color: string;
  icon: string;
}

export const STAKING_TIERS: StakingTier[] = [
  { name: 'Bronze', minStaked: 0, multiplier: 1.0, color: 'amber', icon: '🥉' },
  { name: 'Silver', minStaked: 3, multiplier: 1.1, color: 'gray', icon: '🥈' },
  { name: 'Gold', minStaked: 5, multiplier: 1.25, color: 'yellow', icon: '🥇' },
  { name: 'Platinum', minStaked: 10, multiplier: 1.5, color: 'cyan', icon: '💎' },
  { name: 'Diamond', minStaked: 25, multiplier: 2.0, color: 'purple', icon: '👑' },
];

export interface StakeRequest {
  tokenIds: number[];
  owner: string;
}

export interface UnstakeRequest {
  tokenIds: number[];
  owner: string;
  claimRewards: boolean;
}

export interface ClaimRequest {
  tokenIds: number[];
  owner: string;
}

export interface StakeResult {
  success: boolean;
  transactionId?: string;
  stakedTokens?: number[];
  error?: string;
}

export interface UnstakeResult {
  success: boolean;
  transactionId?: string;
  unstakedTokens?: number[];
  rewardsClaimed?: number;
  penaltyApplied?: number;
  error?: string;
}

export interface ClaimResult {
  success: boolean;
  transactionId?: string;
  amountClaimed: number;
  error?: string;
}

export interface StakingPeriod {
  startBlock: number;
  endBlock?: number;
  duration: number;
  rewards: number;
}

export interface StakingHistory {
  tokenId: number;
  periods: StakingPeriod[];
  totalRewards: number;
}

export interface RewardsCalculation {
  baseRewards: number;
  multiplier: number;
  bonusRewards: number;
  totalRewards: number;
  penalty?: number;
  netRewards: number;
}

export interface StakingConfig {
  minStakeDuration: number;
  rewardsPerBlock: number;
  earlyUnstakePenalty: number;
  maxNFTsPerStake: number;
  claimCooldown: number;
}
