'use client';

import { useWallet } from '@/contexts/WalletContext';

function StatBox({ label, value, subtext }: { label: string; value: string; subtext?: string }) {
  return (
    <div className="bg-gray-800/50 rounded-xl p-4">
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
      {subtext && <p className="text-gray-500 text-xs mt-1">{subtext}</p>}
    </div>
  );
}

function AchievementBadge({ name, description, earned }: { name: string; description: string; earned: boolean }) {
  return (
    <div className={`rounded-xl p-4 ${earned ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-gray-800/30 opacity-50'}`}>
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${earned ? 'bg-purple-500' : 'bg-gray-700'}`}>
          {earned ? (
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          )}
        </div>
        <div>
          <h4 className="font-semibold text-white">{name}</h4>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ action, date, details }: { action: string; date: string; details: string }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-700 last:border-0">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <p className="text-white font-medium">{action}</p>
          <p className="text-gray-400 text-sm">{details}</p>
        </div>
      </div>
      <span className="text-gray-500 text-sm">{date}</span>
    </div>
  );
}

export default function ProfilePage() {
  const { isConnected, address } = useWallet();

  const shortenAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {isConnected && address ? (
          <>
            {/* Profile Header */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {address.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold text-white mb-2">
                    {shortenAddress(address)}
                  </h1>
                  <p className="text-gray-400">Member since January 2024</p>
                  <div className="flex gap-2 mt-3 justify-center md:justify-start">
                    <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                      Silver Tier
                    </span>
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                      Active Staker
                    </span>
                  </div>
                </div>
                <div className="md:ml-auto">
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatBox label="NFTs Owned" value="12" />
              <StatBox label="NFTs Staked" value="8" subtext="66.7% staked" />
              <StatBox label="Total Earned" value="15,420 STF" />
              <StatBox label="Staking Streak" value="45 days" />
            </div>

            {/* Achievements */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AchievementBadge name="First Mint" description="Mint your first NFT" earned={true} />
                <AchievementBadge name="Staking Pioneer" description="Stake your first NFT" earned={true} />
                <AchievementBadge name="Week Warrior" description="7-day staking streak" earned={true} />
                <AchievementBadge name="Month Master" description="30-day staking streak" earned={true} />
                <AchievementBadge name="Collector" description="Own 10+ NFTs" earned={true} />
                <AchievementBadge name="Whale" description="Stake 50+ NFTs" earned={false} />
              </div>
            </section>

            {/* Recent Activity */}
            <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
              <div>
                <ActivityItem action="Claimed Rewards" date="2 hours ago" details="+250 STF" />
                <ActivityItem action="Staked NFT" date="1 day ago" details="NFT #142" />
                <ActivityItem action="Minted NFT" date="3 days ago" details="NFT #142" />
                <ActivityItem action="Claimed Rewards" date="5 days ago" details="+1,200 STF" />
                <ActivityItem action="Unstaked NFT" date="1 week ago" details="NFT #089" />
              </div>
              <div className="mt-6 text-center">
                <button className="text-purple-400 hover:text-purple-300 font-medium">
                  View All Activity →
                </button>
              </div>
            </section>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h2>
            <p className="text-gray-400 mb-8">Connect your wallet to view your profile and activity</p>
          </div>
        )}
      </div>
    </div>
  );
}
