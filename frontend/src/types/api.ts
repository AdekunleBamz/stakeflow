// API response type definitions for StakeFlow

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ApiMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ApiMeta {
  timestamp: string;
  requestId: string;
  rateLimit?: {
    limit: number;
    remaining: number;
    reset: number;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface StacksAccountResponse {
  stx: {
    balance: string;
    total_sent: string;
    total_received: string;
    locked: string;
  };
  fungible_tokens: Record<string, { balance: string }>;
  non_fungible_tokens: Record<string, { count: string }>;
}

export interface StacksTransactionResponse {
  tx_id: string;
  tx_type: string;
  tx_status: 'success' | 'pending' | 'abort_by_response' | 'abort_by_post_condition';
  block_height: number;
  block_hash: string;
  burn_block_time: number;
  burn_block_time_iso: string;
  fee_rate: string;
  sender_address: string;
  contract_call?: {
    contract_id: string;
    function_name: string;
    function_args: Array<{ repr: string; type: string }>;
  };
}

export interface StacksInfoResponse {
  peer_version: number;
  pox_consensus: string;
  burn_block_height: number;
  stable_burn_block_height: number;
  server_version: string;
  network_id: number;
  parent_network_id: number;
  stacks_tip_height: number;
  stacks_tip: string;
  stacks_tip_consensus_hash: string;
}

export interface ContractReadResponse {
  okay: boolean;
  result: string;
}

export interface NFTHoldingResponse {
  asset_identifier: string;
  value: {
    hex: string;
    repr: string;
  };
  block_height: number;
  tx_id: string;
}

export interface TokenMetadataResponse {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

export interface LeaderboardResponse {
  entries: Array<{
    rank: number;
    address: string;
    stakedNFTs: number;
    totalRewards: number;
  }>;
  userRank?: number;
  totalParticipants: number;
}

export interface StatsResponse {
  totalNFTsMinted: number;
  totalNFTsStaked: number;
  totalRewardsDistributed: number;
  uniqueHolders: number;
  uniqueStakers: number;
  currentAPY: number;
  floorPrice?: number;
}
