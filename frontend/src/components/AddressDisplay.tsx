"use client";

import React, { useState, useEffect } from "react";
import { formatAddress } from "../lib/formatters";
import { CopyButton } from "./ui/CopyButton";

interface AddressDisplayProps {
  address: string;
  showFull?: boolean;
  showCopy?: boolean;
  showExplorer?: boolean;
  truncateChars?: number;
  className?: string;
}

export function AddressDisplay({
  address,
  showFull = false,
  showCopy = true,
  showExplorer = true,
  truncateChars = 4,
  className = "",
}: AddressDisplayProps) {
  const displayAddress = showFull
    ? address
    : formatAddress(address, truncateChars);

  const explorerUrl = `https://explorer.stacks.co/address/${address}?chain=mainnet`;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span
        className="font-mono text-sm text-gray-300"
        title={address}
      >
        {displayAddress}
      </span>
      {showCopy && <CopyButton text={address} size="sm" />}
      {showExplorer && (
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-purple-400 transition-colors"
          title="View on Explorer"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      )}
    </div>
  );
}

interface TransactionLinkProps {
  txId: string;
  showFull?: boolean;
  className?: string;
}

export function TransactionLink({
  txId,
  showFull = false,
  className = "",
}: TransactionLinkProps) {
  const displayTxId = showFull
    ? txId
    : `${txId.slice(0, 8)}...${txId.slice(-6)}`;

  const explorerUrl = `https://explorer.stacks.co/txid/${txId}?chain=mainnet`;

  return (
    <a
      href={explorerUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors ${className}`}
    >
      <span className="font-mono text-sm">{displayTxId}</span>
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  );
}

interface TransactionStatusProps {
  status: "pending" | "success" | "failed";
  txId: string;
  className?: string;
}

export function TransactionStatus({
  status,
  txId,
  className = "",
}: TransactionStatusProps) {
  const statusConfig = {
    pending: {
      bg: "bg-yellow-500/10",
      text: "text-yellow-400",
      icon: (
        <svg
          className="w-4 h-4 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ),
      label: "Pending",
    },
    success: {
      bg: "bg-green-500/10",
      text: "text-green-400",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      label: "Success",
    },
    failed: {
      bg: "bg-red-500/10",
      text: "text-red-400",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      label: "Failed",
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={`${config.bg} rounded-lg p-4 ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className={config.text}>{config.icon}</div>
        <div>
          <div className={`text-sm font-medium ${config.text}`}>
            {config.label}
          </div>
          <TransactionLink txId={txId} className="text-xs" />
        </div>
      </div>
    </div>
  );
}
