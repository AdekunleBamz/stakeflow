'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';

interface NFTPageProps {
  params: Promise<{ id: string }>;
}

// Mock NFT data - in real app would fetch from API/blockchain
const mockNFTs: Record<string, {
  id: number;
  name: string;
  description: string;
  image: string;
  attributes: { trait_type: string; value: string }[];
  owner: string;
  isStaked: boolean;
  stakedAt?: number;
  rewardsEarned: number;
}> = {
  '1': {
    id: 1,
    name: 'StakeFlow Genesis #1',
    description: 'The first StakeFlow NFT. A legendary piece of the collection.',
    image: '/nft-placeholder.png',
    attributes: [
      { trait_type: 'Rarity', value: 'Legendary' },
      { trait_type: 'Background', value: 'Cosmic Purple' },
      { trait_type: 'Pattern', value: 'Flow Lines' },
      { trait_type: 'Effect', value: 'Glow' },
    ],
    owner: 'SP3FGQ8...BZTP4D',
    isStaked: true,
    stakedAt: 1704067200,
    rewardsEarned: 2450,
  },
  '142': {
    id: 142,
    name: 'StakeFlow Genesis #142',
    description: 'A unique piece from the StakeFlow Genesis collection.',
    image: '/nft-placeholder.png',
    attributes: [
      { trait_type: 'Rarity', value: 'Rare' },
      { trait_type: 'Background', value: 'Deep Ocean' },
      { trait_type: 'Pattern', value: 'Waves' },
      { trait_type: 'Effect', value: 'Shimmer' },
    ],
    owner: 'SP3FGQ8...BZTP4D',
    isStaked: false,
    rewardsEarned: 0,
  },
};

function AttributeCard({ trait_type, value }: { trait_type: string; value: string }) {
  return (
    <div className="bg-gray-800/50 rounded-xl p-4 text-center">
      <p className="text-gray-400 text-xs uppercase mb-1">{trait_type}</p>
      <p className="text-white font-semibold">{value}</p>
    </div>
  );
}

export default function NFTDetailPage({ params }: NFTPageProps) {
  const resolvedParams = use(params);
  const nft = mockNFTs[resolvedParams.id];

  if (!nft) {
    notFound();
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const daysSinceStaked = nft.stakedAt
    ? Math.floor((Date.now() / 1000 - nft.stakedAt) / 86400)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* NFT Image */}
          <div>
            <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <div className="text-center">
                <span className="text-8xl font-bold text-purple-400/50">#{nft.id}</span>
              </div>
              {nft.isStaked && (
                <div className="absolute top-4 right-4 bg-purple-500 text-white px-4 py-2 rounded-full font-medium">
                  Staked
                </div>
              )}
            </div>
          </div>

          {/* NFT Details */}
          <div>
            <div className="mb-6">
              <span className="text-purple-400 font-medium">StakeFlow Collection</span>
              <h1 className="text-4xl font-bold text-white mt-2">{nft.name}</h1>
            </div>

            <p className="text-gray-400 mb-8">{nft.description}</p>

            {/* Owner Info */}
            <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
              <p className="text-gray-400 text-sm mb-1">Owned by</p>
              <p className="text-white font-mono">{nft.owner}</p>
            </div>

            {/* Staking Status */}
            {nft.isStaked ? (
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Staking Info</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Staked Since</p>
                    <p className="text-white font-medium">{formatDate(nft.stakedAt!)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Days Staked</p>
                    <p className="text-white font-medium">{daysSinceStaked} days</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Rewards Earned</p>
                    <p className="text-green-400 font-medium">{nft.rewardsEarned.toLocaleString()} STF</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Daily Rate</p>
                    <p className="text-yellow-400 font-medium">25 STF/day</p>
                  </div>
                </div>
                <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors">
                  Unstake NFT
                </button>
              </div>
            ) : (
              <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Not Staked</h3>
                <p className="text-gray-400 mb-4">Stake this NFT to start earning STF rewards</p>
                <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all">
                  Stake NFT
                </button>
              </div>
            )}

            {/* Attributes */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Attributes</h3>
              <div className="grid grid-cols-2 gap-4">
                {nft.attributes.map((attr) => (
                  <AttributeCard key={attr.trait_type} {...attr} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Activity History */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Activity History</h2>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Event</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">From</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">To</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700/50">
                  <td className="py-4 px-6 text-purple-400">Staked</td>
                  <td className="py-4 px-6 text-white font-mono text-sm">SP3FGQ8...BZTP4D</td>
                  <td className="py-4 px-6 text-white font-mono text-sm">Staking Contract</td>
                  <td className="py-4 px-6 text-gray-400">Jan 1, 2024</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-4 px-6 text-green-400">Minted</td>
                  <td className="py-4 px-6 text-gray-400">-</td>
                  <td className="py-4 px-6 text-white font-mono text-sm">SP3FGQ8...BZTP4D</td>
                  <td className="py-4 px-6 text-gray-400">Dec 15, 2023</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
