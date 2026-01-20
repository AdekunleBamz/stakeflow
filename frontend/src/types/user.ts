// User type definitions for StakeFlow

export interface User {
  address: string;
  isConnected: boolean;
  connectedAt?: string;
}

export interface UserProfile {
  address: string;
  displayName?: string;
  avatar?: string;
  bio?: string;
  joinedAt: string;
  lastActive: string;
}

export interface UserStats {
  address: string;
  nftsOwned: number;
  nftsStaked: number;
  totalMinted: number;
  totalRewardsClaimed: number;
  pendingRewards: number;
  stakingTier: string;
  rank?: number;
}

export interface UserBalance {
  stx: number;
  stf: number;
  nfts: number;
}

export interface UserPreferences {
  theme: 'dark' | 'light' | 'system';
  compactView: boolean;
  showTestnets: boolean;
  autoRefresh: boolean;
  refreshInterval: number;
  notifications: boolean;
  emailNotifications: boolean;
  soundEffects: boolean;
  currency: 'USD' | 'EUR' | 'GBP' | 'BTC' | 'ETH';
}

export interface UserAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress?: number;
  target?: number;
}

export const ACHIEVEMENTS: UserAchievement[] = [
  {
    id: 'first-mint',
    name: 'First Mint',
    description: 'Mint your first StakeFlow NFT',
    icon: '🎉',
  },
  {
    id: 'collector',
    name: 'Collector',
    description: 'Own 5 or more NFTs',
    icon: '🏆',
    target: 5,
  },
  {
    id: 'hodler',
    name: 'Diamond Hands',
    description: 'Stake NFT for 30+ days',
    icon: '💎',
    target: 30,
  },
  {
    id: 'whale',
    name: 'Whale',
    description: 'Own 10 or more NFTs',
    icon: '🐋',
    target: 10,
  },
  {
    id: 'early-adopter',
    name: 'Early Adopter',
    description: 'Among first 100 users',
    icon: '🚀',
  },
  {
    id: 'reward-hunter',
    name: 'Reward Hunter',
    description: 'Claim 10,000+ STF rewards',
    icon: '💰',
    target: 10000,
  },
];

export interface UserActivity {
  id: string;
  type: 'mint' | 'stake' | 'unstake' | 'claim' | 'transfer';
  description: string;
  timestamp: string;
  amount?: number;
  tokenIds?: number[];
  transactionId?: string;
}

export interface LeaderboardEntry {
  rank: number;
  address: string;
  displayName?: string;
  avatar?: string;
  stakedNFTs: number;
  totalRewards: number;
  stakingDays: number;
}

export interface UserSession {
  address: string;
  connectedAt: number;
  expiresAt: number;
  provider: 'leather' | 'xverse' | 'okx' | 'other';
}
