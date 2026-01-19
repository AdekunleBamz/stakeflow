"use client";

import { useWallet } from "@/contexts/WalletContext";
import MintSection from "@/components/MintSection";
import StakingDashboard from "@/components/StakingDashboard";
import RewardsPanel from "@/components/RewardsPanel";

export default function Home() {
  const { isConnected } = useWallet();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold mb-4">
          <span className="gradient-text">StakeFlow</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Mint exclusive NFTs for just 0.001 STX, stake them, and earn STF tokens as rewards.
          The future of NFT staking on Stacks.
        </p>
      </section>

      {!isConnected ? (
        <div className="card max-w-md mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
          <p className="text-gray-400 mb-6">
            Connect your wallet to mint NFTs and start earning rewards.
          </p>
          <p className="text-sm text-gray-500">
            Supports Leather and Xverse wallets
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <MintSection />
            <StakingDashboard />
          </div>
          <div>
            <RewardsPanel />
          </div>
        </div>
      )}

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        <StatCard label="Mint Price" value="0.001 STX" />
        <StatCard label="Max Supply" value="10,000,000" />
        <StatCard label="Reward Rate" value="~14.4 STF/day" />
        <StatCard label="Unstake Fee" value="0.001 STX" />
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="card text-center">
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-2xl font-bold gradient-text">{value}</p>
    </div>
  );
}
