import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staking | StakeFlow",
  description: "Stake your StakeFlow NFTs and earn STF rewards",
};

export default function StakingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Staking Dashboard</h1>
          <p className="text-gray-400">
            Stake your NFTs to earn STF token rewards
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <StatCard label="Total Staked" value="0" icon="📥" />
          <StatCard label="Pending Rewards" value="0 STF" icon="💰" />
          <StatCard label="Total Claimed" value="0 STF" icon="✨" />
          <StatCard label="Daily Rate" value="1 STF/10 blocks" icon="⏰" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Your Staked NFTs</h2>
                <button className="text-sm text-purple-400 hover:text-purple-300">
                  Unstake All
                </button>
              </div>
              
              <div className="text-center py-12 text-gray-500">
                <div className="text-4xl mb-4">📭</div>
                <p>No NFTs currently staked</p>
                <p className="text-sm mt-2">Stake your NFTs to start earning rewards</p>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Available to Stake</h2>
                <button className="text-sm text-purple-400 hover:text-purple-300">
                  Stake All
                </button>
              </div>
              
              <div className="text-center py-12 text-gray-500">
                <div className="text-4xl mb-4">🎨</div>
                <p>No NFTs available</p>
                <p className="text-sm mt-2">Mint an NFT to start staking</p>
                <button className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                  Go to Mint
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Rewards Summary</h2>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Available to Claim</div>
                  <div className="text-3xl font-bold text-purple-400">0 STF</div>
                </div>
                <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors" disabled>
                  Claim All Rewards
                </button>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Staking Info</h2>
              <div className="space-y-3 text-sm">
                <InfoRow label="Reward Rate" value="1 STF / 10 blocks" />
                <InfoRow label="Unstake Fee" value="0.001 STX" />
                <InfoRow label="Claim Fee" value="Free" />
                <InfoRow label="Min Stake Time" value="None" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-xl border border-purple-500/30 p-6">
              <h2 className="text-lg font-semibold text-white mb-2">💡 Pro Tip</h2>
              <p className="text-sm text-gray-300">
                Stake multiple NFTs to maximize your earning potential. 
                Rewards accumulate automatically based on block height.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-400">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}
