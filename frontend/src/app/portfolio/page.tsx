'use client';

import { NFTList, NFTStack } from '@/components/nft';
import { TokenDisplay } from '@/components/common';
import { PortfolioSummary } from '@/components/portfolio/PortfolioSummary';

const mockNFTs = [
  { tokenId: 101, rewards: 120, isStaked: true },
  { tokenId: 102, rewards: 0, isStaked: false },
  { tokenId: 103, rewards: 64, isStaked: true },
  { tokenId: 104, rewards: 0, isStaked: false },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Portfolio</h1>
          <p className="text-gray-400 mt-2">Overview of your holdings and staked NFTs.</p>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-gray-900/40 border border-gray-800">
            <p className="text-xs uppercase text-gray-500">Wallet Balance</p>
            <TokenDisplay symbol="STF" amount={12500} size="lg" />
          </div>
          <PortfolioSummary
            totalValue={24500}
            stakedValue={18200}
            pendingRewards={184}
            nftCount={mockNFTs.length}
          />
        </div>

        <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Your NFTs</h2>
            <NFTStack tokenIds={mockNFTs.map((nft) => nft.tokenId)} />
          </div>
          <NFTList nfts={mockNFTs} />
        </div>
      </div>
    </div>
  );
}
