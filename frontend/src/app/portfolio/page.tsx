'use client';

import { NFTList, NFTStack } from '@/components/nft';
import { TokenDisplay } from '@/components/common';

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-gray-900/40 border border-gray-800">
            <p className="text-xs uppercase text-gray-500">Wallet Balance</p>
            <TokenDisplay symbol="STF" amount={12500} size="lg" />
          </div>
          <div className="p-5 rounded-2xl bg-gray-900/40 border border-gray-800">
            <p className="text-xs uppercase text-gray-500">Staked NFTs</p>
            <p className="text-2xl font-semibold mt-2">{mockNFTs.filter((nft) => nft.isStaked).length}</p>
          </div>
          <div className="p-5 rounded-2xl bg-gray-900/40 border border-gray-800">
            <p className="text-xs uppercase text-gray-500">Pending Rewards</p>
            <p className="text-2xl font-semibold mt-2">184 STF</p>
          </div>
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
