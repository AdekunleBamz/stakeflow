// NFT type definitions for StakeFlow

export interface NFT {
  tokenId: number;
  owner: string;
  isStaked: boolean;
  stakedAt?: number;
  lastClaimBlock?: number;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: NFTAttribute[];
  external_url?: string;
}

export interface NFTAttribute {
  trait_type: string;
  value: string | number;
  display_type?: 'number' | 'date' | 'boost_percentage' | 'boost_number';
}

export interface NFTWithMetadata extends NFT {
  metadata?: NFTMetadata;
}

export interface NFTDisplayInfo {
  tokenId: number;
  name: string;
  image: string;
  isStaked: boolean;
  stakedDuration?: number;
  pendingRewards?: number;
  rarity?: NFTRarity;
}

export type NFTRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface NFTCollection {
  name: string;
  symbol: string;
  contractAddress: string;
  totalSupply: number;
  maxSupply: number;
  mintPrice: number;
  perWalletLimit: number;
}

export interface NFTMintEvent {
  tokenId: number;
  recipient: string;
  transactionId: string;
  blockHeight: number;
  timestamp: string;
}

export interface NFTTransferEvent {
  tokenId: number;
  from: string;
  to: string;
  transactionId: string;
  blockHeight: number;
  timestamp: string;
}

export interface NFTStakeEvent {
  tokenId: number;
  owner: string;
  stakedAt: number;
  transactionId: string;
}

export interface NFTUnstakeEvent {
  tokenId: number;
  owner: string;
  unstakedAt: number;
  rewardsClaimed: number;
  transactionId: string;
}

export interface NFTFilter {
  search?: string;
  staked?: boolean | null;
  rarity?: NFTRarity[];
  sortBy?: 'id' | 'rewards' | 'staked-date';
  sortOrder?: 'asc' | 'desc';
}

export interface NFTBatchOperation {
  type: 'stake' | 'unstake' | 'claim';
  tokenIds: number[];
  status: 'pending' | 'processing' | 'completed' | 'failed';
  transactionId?: string;
  error?: string;
}
