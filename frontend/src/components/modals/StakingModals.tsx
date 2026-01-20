'use client';

import { useState } from 'react';
import { Modal } from './Modal';

interface StakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenId: number;
  onStake: (tokenId: number) => Promise<void>;
}

export function StakeModal({ isOpen, onClose, tokenId, onStake }: StakeModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStake = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await onStake(tokenId);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to stake NFT');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Stake NFT" size="sm">
      <div className="text-center">
        <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
          <span className="text-4xl font-bold text-white">#{tokenId}</span>
        </div>

        <h3 className="text-lg font-semibold text-white mb-2">Stake NFT #{tokenId}</h3>
        <p className="text-gray-400 text-sm mb-6">
          Staking your NFT will lock it in the contract and start earning STF rewards.
          You can unstake at any time.
        </p>

        <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Base Reward Rate</span>
            <span className="text-white">10 STF / block</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Your Multiplier</span>
            <span className="text-purple-400">1.5x</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleStake}
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-lg transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <svg className="w-5 h-5 animate-spin mx-auto" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              'Stake NFT'
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}

interface UnstakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenId: number;
  pendingRewards: number;
  onUnstake: (tokenId: number) => Promise<void>;
}

export function UnstakeModal({ isOpen, onClose, tokenId, pendingRewards, onUnstake }: UnstakeModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUnstake = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await onUnstake(tokenId);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unstake NFT');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Unstake NFT" size="sm">
      <div className="text-center">
        <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
          <span className="text-4xl font-bold text-white">#{tokenId}</span>
        </div>

        <h3 className="text-lg font-semibold text-white mb-2">Unstake NFT #{tokenId}</h3>
        <p className="text-gray-400 text-sm mb-6">
          Unstaking will return the NFT to your wallet and claim any pending rewards.
        </p>

        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6">
          <p className="text-gray-400 text-sm">Pending Rewards</p>
          <p className="text-2xl font-bold text-green-400">{pendingRewards.toLocaleString()} STF</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleUnstake}
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <svg className="w-5 h-5 animate-spin mx-auto" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              'Unstake & Claim'
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
