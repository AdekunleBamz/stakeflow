'use client';

import { useWallet } from '@/contexts/WalletContext';

interface RewardTier {
  name: string;
  minStaked: number;
  multiplier: number;
  color: string;
}

const rewardTiers: RewardTier[] = [
  { name: 'Bronze', minStaked: 1, multiplier: 1.0, color: 'from-amber-700 to-amber-500' },
  { name: 'Silver', minStaked: 5, multiplier: 1.25, color: 'from-gray-400 to-gray-300' },
  { name: 'Gold', minStaked: 10, multiplier: 1.5, color: 'from-yellow-500 to-yellow-300' },
  { name: 'Platinum', minStaked: 25, multiplier: 2.0, color: 'from-purple-500 to-purple-300' },
  { name: 'Diamond', minStaked: 50, multiplier: 3.0, color: 'from-blue-400 to-cyan-300' },
];

function TierCard({ tier, isActive }: { tier: RewardTier; isActive: boolean }) {
  return (
    <div className={`relative rounded-xl overflow-hidden ${isActive ? 'ring-2 ring-purple-500' : ''}`}>
      <div className={`bg-gradient-to-br ${tier.color} p-6`}>
        <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
        <p className="text-white/80 text-sm">Min {tier.minStaked} NFTs staked</p>
        <div className="mt-4">
          <span className="text-3xl font-bold text-white">{tier.multiplier}x</span>
          <span className="text-white/70 text-sm ml-2">multiplier</span>
        </div>
        {isActive && (
          <div className="absolute top-2 right-2 bg-white/20 rounded-full px-3 py-1 text-xs text-white font-medium">
            Current
          </div>
        )}
      </div>
    </div>
  );
}

function RewardHistoryItem({ date, amount, type }: { date: string; amount: string; type: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0">
      <div>
        <p className="text-white font-medium">{type}</p>
        <p className="text-gray-400 text-sm">{date}</p>
      </div>
      <span className="text-green-400 font-semibold">+{amount} STF</span>
    </div>
  );
}

export default function RewardsPage() {
  const { isConnected } = useWallet();

  const userStakedCount = 3; // Would come from context/API
  const currentTier = rewardTiers.find(t => userStakedCount >= t.minStaked) || rewardTiers[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Rewards Center</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Earn STF tokens by staking your NFTs. The more you stake, the higher your reward tier!
          </p>
        </div>

        {isConnected ? (
          <>
            {/* Current Rewards Summary */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Pending Rewards</p>
                  <p className="text-3xl font-bold text-white">1,250.00 STF</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Total Earned</p>
                  <p className="text-3xl font-bold text-green-400">15,420.00 STF</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Current Tier</p>
                  <p className="text-3xl font-bold text-purple-400">{currentTier.name}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Multiplier</p>
                  <p className="text-3xl font-bold text-yellow-400">{currentTier.multiplier}x</p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-all">
                  Claim All Rewards
                </button>
              </div>
            </div>

            {/* Reward Tiers */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Reward Tiers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {rewardTiers.map((tier) => (
                  <TierCard
                    key={tier.name}
                    tier={tier}
                    isActive={tier.name === currentTier.name}
                  />
                ))}
              </div>
            </section>

            {/* Reward History */}
            <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Reward History</h2>
              <div className="space-y-2">
                <RewardHistoryItem date="Jan 15, 2024" amount="250.00" type="Daily Staking Reward" />
                <RewardHistoryItem date="Jan 14, 2024" amount="250.00" type="Daily Staking Reward" />
                <RewardHistoryItem date="Jan 13, 2024" amount="500.00" type="Streak Bonus" />
                <RewardHistoryItem date="Jan 13, 2024" amount="250.00" type="Daily Staking Reward" />
              </div>
              <div className="mt-6 text-center">
                <button className="text-purple-400 hover:text-purple-300 font-medium">
                  View Full History →
                </button>
              </div>
            </section>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Connect to View Rewards</h2>
            <p className="text-gray-400 mb-8">Connect your wallet to view and claim your staking rewards</p>
          </div>
        )}

        {/* How It Works */}
        <section className="mt-12 bg-gray-800/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">How Rewards Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-400">1</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Stake NFTs</h3>
              <p className="text-gray-400 text-sm">Stake your StakeFlow NFTs to start earning rewards</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-400">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Earn STF</h3>
              <p className="text-gray-400 text-sm">Accumulate STF tokens based on your staking tier</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-400">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Claim Anytime</h3>
              <p className="text-gray-400 text-sm">Claim your pending rewards whenever you want</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
