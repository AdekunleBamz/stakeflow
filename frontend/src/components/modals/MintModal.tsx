'use client';

import { useState } from 'react';
import { Modal } from './Modal';

interface MintModalProps {
  isOpen: boolean;
  onClose: () => void;
  mintPrice: number;
  maxQuantity?: number;
  onMint: (quantity: number) => Promise<void>;
}

export function MintModal({
  isOpen,
  onClose,
  mintPrice,
  maxQuantity = 10,
  onMint,
}: MintModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPrice = quantity * mintPrice;

  const handleMint = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await onMint(quantity);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mint NFT');
    } finally {
      setIsLoading(false);
    }
  };

  const adjustQuantity = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(maxQuantity, prev + delta)));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mint NFT" size="md">
      <div>
        {/* Preview */}
        <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl p-8 mb-6 text-center">
          <div className="w-40 h-40 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
            <svg className="w-20 h-20 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white">StakeFlow NFT</h3>
          <p className="text-gray-400 text-sm">Unique generative artwork</p>
        </div>

        {/* Quantity Selector */}
        <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Quantity</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => adjustQuantity(-1)}
                disabled={quantity <= 1}
                className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -
              </button>
              <span className="text-2xl font-bold text-white w-12 text-center">{quantity}</span>
              <button
                onClick={() => adjustQuantity(1)}
                disabled={quantity >= maxQuantity}
                className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Price per NFT</span>
            <span className="text-white">{mintPrice} STX</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total</span>
            <span className="text-xl font-bold text-white">{totalPrice} STX</span>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 mb-6">
          <h4 className="text-white font-medium mb-2">What you get:</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Unique generative NFT artwork
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Staking eligibility for STF rewards
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Community access and perks
            </li>
          </ul>
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
            onClick={handleMint}
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Minting...
              </span>
            ) : (
              `Mint for ${totalPrice} STX`
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
