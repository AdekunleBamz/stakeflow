'use client';

import { useState } from 'react';

interface Transaction {
  id: string;
  type: 'mint' | 'stake' | 'unstake' | 'claim' | 'transfer';
  tokenId?: number;
  amount?: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: Date;
  txHash: string;
}

const typeLabels: Record<Transaction['type'], string> = {
  mint: 'Mint NFT',
  stake: 'Stake NFT',
  unstake: 'Unstake NFT',
  claim: 'Claim Rewards',
  transfer: 'Transfer',
};

const typeIcons: Record<Transaction['type'], string> = {
  mint: '🎨',
  stake: '🔒',
  unstake: '🔓',
  claim: '💰',
  transfer: '↔️',
};

const statusColors: Record<Transaction['status'], string> = {
  pending: 'bg-yellow-500/20 text-yellow-400',
  confirmed: 'bg-green-500/20 text-green-400',
  failed: 'bg-red-500/20 text-red-400',
};

function TransactionRow({ tx }: { tx: Transaction }) {
  const [expanded, setExpanded] = useState(false);

  const shortenHash = (hash: string) => `${hash.slice(0, 8)}...${hash.slice(-6)}`;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="border-b border-gray-700 last:border-0">
      <div
        className="flex items-center justify-between py-4 px-4 hover:bg-gray-800/50 cursor-pointer transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <span className="text-2xl">{typeIcons[tx.type]}</span>
          <div>
            <p className="text-white font-medium">{typeLabels[tx.type]}</p>
            <p className="text-gray-400 text-sm">{formatDate(tx.timestamp)}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {tx.tokenId && (
            <span className="text-gray-400 text-sm">NFT #{tx.tokenId}</span>
          )}
          {tx.amount && (
            <span className="text-white font-medium">{tx.amount}</span>
          )}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[tx.status]}`}>
            {tx.status}
          </span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {expanded && (
        <div className="px-4 pb-4 bg-gray-800/30">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Transaction Hash</span>
              <a
                href={`https://explorer.stacks.co/txid/${tx.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-purple-400 hover:text-purple-300 font-mono"
              >
                {shortenHash(tx.txHash)}
              </a>
            </div>
            <div>
              <span className="text-gray-400">Transaction ID</span>
              <p className="text-white font-mono">{tx.id}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface TransactionHistoryProps {
  transactions: Transaction[];
  title?: string;
  maxItems?: number;
  showViewAll?: boolean;
}

export function TransactionHistory({
  transactions,
  title = 'Transaction History',
  maxItems,
  showViewAll = false,
}: TransactionHistoryProps) {
  const displayTx = maxItems ? transactions.slice(0, maxItems) : transactions;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className="text-gray-400 text-sm">{transactions.length} transactions</span>
      </div>
      <div className="divide-y divide-gray-700">
        {displayTx.length > 0 ? (
          displayTx.map((tx) => <TransactionRow key={tx.id} tx={tx} />)
        ) : (
          <div className="py-12 text-center">
            <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-500">No transactions yet</p>
          </div>
        )}
      </div>
      {showViewAll && transactions.length > (maxItems || 0) && (
        <div className="px-6 py-4 border-t border-gray-700 text-center">
          <button className="text-purple-400 hover:text-purple-300 font-medium">
            View All Transactions →
          </button>
        </div>
      )}
    </div>
  );
}

export type { Transaction };
