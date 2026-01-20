'use client';

import { useState, useEffect, useCallback } from 'react';

interface Transaction {
  id: string;
  type: 'mint' | 'stake' | 'unstake' | 'claim' | 'transfer';
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: string;
  amount?: number;
  tokenIds?: number[];
  hash?: string;
}

export function useTransactionHistory(address?: string, limit = 20) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    if (!address) {
      setTransactions([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Simulated transactions
      const types: Transaction['type'][] = ['mint', 'stake', 'unstake', 'claim', 'transfer'];
      const statuses: Transaction['status'][] = ['pending', 'confirmed', 'failed'];

      const mockTx: Transaction[] = Array.from({ length: limit }, (_, i) => ({
        id: `tx-${i}`,
        type: types[Math.floor(Math.random() * types.length)],
        status: i === 0 ? 'pending' : statuses[Math.floor(Math.random() * 2) + 1],
        timestamp: new Date(Date.now() - i * 3600000).toISOString(),
        amount: Math.floor(Math.random() * 10000),
        tokenIds: [Math.floor(Math.random() * 100)],
        hash: `0x${Math.random().toString(16).slice(2, 18)}`,
      }));

      setTransactions(mockTx);
    } catch {
      setError('Failed to fetch transactions');
    } finally {
      setIsLoading(false);
    }
  }, [address, limit]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { transactions, isLoading, error, refetch: fetchTransactions };
}

interface PendingTransaction {
  id: string;
  type: string;
  startedAt: number;
  description: string;
}

export function usePendingTransactions() {
  const [pending, setPending] = useState<PendingTransaction[]>([]);

  const addPending = useCallback((tx: Omit<PendingTransaction, 'id' | 'startedAt'>) => {
    const newTx: PendingTransaction = {
      ...tx,
      id: `pending-${Date.now()}`,
      startedAt: Date.now(),
    };
    setPending((prev) => [...prev, newTx]);
    return newTx.id;
  }, []);

  const removePending = useCallback((id: string) => {
    setPending((prev) => prev.filter((tx) => tx.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setPending([]);
  }, []);

  return { pending, addPending, removePending, clearAll };
}

export function useTransactionStatus(txHash?: string) {
  const [status, setStatus] = useState<'pending' | 'confirmed' | 'failed' | null>(null);
  const [confirmations, setConfirmations] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!txHash) {
      setStatus(null);
      return;
    }

    setIsLoading(true);
    setStatus('pending');

    // Simulate status checking
    const interval = setInterval(() => {
      setConfirmations((prev) => {
        const next = prev + 1;
        if (next >= 3) {
          clearInterval(interval);
          setStatus('confirmed');
          setIsLoading(false);
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [txHash]);

  return { status, confirmations, isLoading };
}

interface TransactionReceipt {
  hash: string;
  status: 'success' | 'failure';
  blockHeight: number;
  timestamp: string;
  fee: number;
}

export function useTransactionReceipt(txHash?: string) {
  const [receipt, setReceipt] = useState<TransactionReceipt | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!txHash) {
      setReceipt(null);
      return;
    }

    const fetchReceipt = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Simulate fetching receipt
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setReceipt({
          hash: txHash,
          status: 'success',
          blockHeight: Math.floor(Math.random() * 100000) + 100000,
          timestamp: new Date().toISOString(),
          fee: Math.floor(Math.random() * 1000),
        });
      } catch {
        setError('Failed to fetch transaction receipt');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReceipt();
  }, [txHash]);

  return { receipt, isLoading, error };
}

export function useTransactionToast() {
  const [toasts, setToasts] = useState<
    { id: string; type: 'success' | 'error' | 'pending'; message: string }[]
  >([]);

  const showSuccess = useCallback((message: string) => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, type: 'success', message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const showError = useCallback((message: string) => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, type: 'error', message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const showPending = useCallback((message: string) => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, type: 'pending', message }]);
    return id;
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, showSuccess, showError, showPending, dismiss };
}
