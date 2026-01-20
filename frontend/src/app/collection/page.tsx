import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Collection | StakeFlow",
  description: "View and manage your StakeFlow NFT collection",
};

export default function CollectionPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Collection</h1>
          <p className="text-gray-400">
            View and manage all your StakeFlow NFTs in one place
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <FilterButton label="All" active />
            <FilterButton label="Staked" />
            <FilterButton label="Unstaked" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Sort by:</span>
            <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm">
              <option>Token ID</option>
              <option>Recently Acquired</option>
              <option>Staking Duration</option>
              <option>Pending Rewards</option>
            </select>
          </div>
        </div>

        <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-8">
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Connect Wallet to View Collection
            </h3>
            <p className="text-gray-400 mb-4 max-w-sm mx-auto">
              Connect your Stacks wallet to view and manage your NFT collection
            </p>
            <button className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors">
              Connect Wallet
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 mb-1">Total NFTs</h3>
            <div className="text-3xl font-bold text-white">0</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 mb-1">Currently Staked</h3>
            <div className="text-3xl font-bold text-green-400">0</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 mb-1">Pending Rewards</h3>
            <div className="text-3xl font-bold text-purple-400">0 STF</div>
          </div>
        </div>
      </div>
    </main>
  );
}

function FilterButton({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? "bg-purple-600 text-white"
          : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
      }`}
    >
      {label}
    </button>
  );
}
