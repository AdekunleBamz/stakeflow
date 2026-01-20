"use client";

import { useState, useCallback, useRef } from "react";
import { openContractCall } from "@stacks/connect";
import type { ContractCallOptions } from "@stacks/connect";

type TransactionStatus = "idle" | "pending" | "success" | "error";

interface UseTransactionOptions {
  onSuccess?: (txId: string) => void;
  onError?: (error: Error) => void;
  onCancel?: () => void;
}

interface UseTransactionResult {
  status: TransactionStatus;
  txId: string | null;
  error: Error | null;
  execute: (options: ContractCallOptions) => Promise<void>;
  reset: () => void;
}

export function useTransaction({
  onSuccess,
  onError,
  onCancel,
}: UseTransactionOptions = {}): UseTransactionResult {
  const [status, setStatus] = useState<TransactionStatus>("idle");
  const [txId, setTxId] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const pendingRef = useRef(false);

  const execute = useCallback(
    async (options: ContractCallOptions) => {
      if (pendingRef.current) return;
      
      pendingRef.current = true;
      setStatus("pending");
      setTxId(null);
      setError(null);

      try {
        await openContractCall({
          ...options,
          onFinish: (data) => {
            pendingRef.current = false;
            setStatus("success");
            setTxId(data.txId);
            if (onSuccess) {
              onSuccess(data.txId);
            }
          },
          onCancel: () => {
            pendingRef.current = false;
            setStatus("idle");
            if (onCancel) {
              onCancel();
            }
          },
        });
      } catch (err) {
        pendingRef.current = false;
        const error = err instanceof Error ? err : new Error("Transaction failed");
        setStatus("error");
        setError(error);
        if (onError) {
          onError(error);
        }
      }
    },
    [onSuccess, onError, onCancel]
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setTxId(null);
    setError(null);
  }, []);

  return {
    status,
    txId,
    error,
    execute,
    reset,
  };
}

interface UseTransactionQueueOptions {
  onAllComplete?: () => void;
  onError?: (error: Error, index: number) => void;
}

interface QueuedTransaction {
  options: ContractCallOptions;
  status: TransactionStatus;
  txId?: string;
  error?: Error;
}

export function useTransactionQueue({
  onAllComplete,
  onError,
}: UseTransactionQueueOptions = {}) {
  const [queue, setQueue] = useState<QueuedTransaction[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);

  const addToQueue = useCallback((options: ContractCallOptions) => {
    setQueue((prev) => [
      ...prev,
      { options, status: "idle" as TransactionStatus },
    ]);
  }, []);

  const processQueue = useCallback(async () => {
    if (isProcessing || queue.length === 0) return;

    setIsProcessing(true);

    for (let i = 0; i < queue.length; i++) {
      setCurrentIndex(i);

      setQueue((prev) =>
        prev.map((tx, idx) =>
          idx === i ? { ...tx, status: "pending" as TransactionStatus } : tx
        )
      );

      try {
        await new Promise<void>((resolve, reject) => {
          openContractCall({
            ...queue[i].options,
            onFinish: (data) => {
              setQueue((prev) =>
                prev.map((tx, idx) =>
                  idx === i
                    ? { ...tx, status: "success" as TransactionStatus, txId: data.txId }
                    : tx
                )
              );
              resolve();
            },
            onCancel: () => {
              reject(new Error("Transaction cancelled"));
            },
          });
        });
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Transaction failed");
        setQueue((prev) =>
          prev.map((tx, idx) =>
            idx === i ? { ...tx, status: "error" as TransactionStatus, error } : tx
          )
        );
        if (onError) {
          onError(error, i);
        }
        break;
      }
    }

    setIsProcessing(false);
    setCurrentIndex(-1);

    if (onAllComplete) {
      onAllComplete();
    }
  }, [queue, isProcessing, onAllComplete, onError]);

  const clearQueue = useCallback(() => {
    setQueue([]);
    setCurrentIndex(-1);
    setIsProcessing(false);
  }, []);

  return {
    queue,
    currentIndex,
    isProcessing,
    addToQueue,
    processQueue,
    clearQueue,
    progress: queue.length > 0 ? (currentIndex + 1) / queue.length : 0,
  };
}
