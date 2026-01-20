// Transaction type definitions for StakeFlow

export type TransactionType = 
  | 'mint'
  | 'stake'
  | 'unstake'
  | 'claim'
  | 'transfer'
  | 'approve'
  | 'revoke';

export type TransactionStatus = 
  | 'pending'
  | 'submitted'
  | 'confirmed'
  | 'failed'
  | 'cancelled';

export interface Transaction {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  hash?: string;
  blockHeight?: number;
  timestamp: string;
  from: string;
  to?: string;
  amount?: number;
  tokenIds?: number[];
  fee?: number;
  error?: string;
}

export interface TransactionRequest {
  type: TransactionType;
  contractAddress: string;
  functionName: string;
  functionArgs: unknown[];
  postConditions?: unknown[];
  onSuccess?: (tx: Transaction) => void;
  onError?: (error: Error) => void;
}

export interface TransactionReceipt {
  hash: string;
  status: 'success' | 'abort_by_response' | 'abort_by_post_condition';
  blockHeight: number;
  blockHash: string;
  burnBlockTime: number;
  burnBlockTimeIso: string;
  txIndex: number;
  fee: number;
  senderAddress: string;
  contractCall?: {
    contractId: string;
    functionName: string;
    functionArgs: unknown[];
  };
  events: TransactionEvent[];
}

export interface TransactionEvent {
  type: 'stx_transfer' | 'ft_transfer' | 'nft_transfer' | 'contract_log' | 'smart_contract';
  data: unknown;
}

export interface TransactionQueueItem {
  id: string;
  request: TransactionRequest;
  status: TransactionStatus;
  createdAt: number;
  submittedAt?: number;
  confirmedAt?: number;
  retries: number;
  maxRetries: number;
}

export interface TransactionHistoryFilter {
  types?: TransactionType[];
  status?: TransactionStatus[];
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface TransactionSummary {
  totalTransactions: number;
  totalVolume: number;
  totalFees: number;
  byType: Record<TransactionType, number>;
  byStatus: Record<TransactionStatus, number>;
}

export interface PendingTransaction {
  id: string;
  type: TransactionType;
  description: string;
  startedAt: number;
  estimatedConfirmation: number;
}

export interface TransactionNotification {
  id: string;
  transactionId: string;
  type: 'submitted' | 'confirmed' | 'failed';
  message: string;
  timestamp: number;
  read: boolean;
}
