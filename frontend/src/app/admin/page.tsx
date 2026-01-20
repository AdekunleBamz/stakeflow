export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">
            Manage StakeFlow platform settings and operations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Contract Status</h3>
            <div className="space-y-3">
              <StatusItem label="NFT Contract" status="active" />
              <StatusItem label="Staking Contract" status="active" />
              <StatusItem label="Rewards Contract" status="active" />
              <StatusItem label="Unstake Contract" status="active" />
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Platform Metrics</h3>
            <div className="space-y-3">
              <MetricItem label="Total Minted" value="1,234" />
              <MetricItem label="Total Staked" value="892" />
              <MetricItem label="Active Users" value="156" />
              <MetricItem label="Total Rewards" value="12.5M STF" />
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Treasury</h3>
            <div className="space-y-3">
              <MetricItem label="STX Balance" value="5,000 STX" />
              <MetricItem label="STF Balance" value="100M STF" />
              <MetricItem label="Reward Pool" value="50M STF" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Admin Actions</h3>
            <div className="space-y-3">
              <ActionButton label="Fund Reward Pool" description="Add STF tokens to the reward pool" />
              <ActionButton label="Update Mint Price" description="Modify the NFT mint price" />
              <ActionButton label="Pause Contracts" description="Emergency pause all contracts" />
              <ActionButton label="Update Metadata" description="Update NFT collection metadata" />
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <ActivityItem 
                type="mint"
                address="SP5K2R...X9TJT"
                time="2 min ago"
              />
              <ActivityItem 
                type="stake"
                address="SP3FBR...KVPBS"
                time="5 min ago"
              />
              <ActivityItem 
                type="claim"
                address="SP2XDB...NS3RG"
                time="12 min ago"
              />
              <ActivityItem 
                type="unstake"
                address="SP1HTB...W9R4C"
                time="24 min ago"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatusItem({ label, status }: { label: string; status: "active" | "paused" | "error" }) {
  const colors = {
    active: "bg-green-500",
    paused: "bg-yellow-500",
    error: "bg-red-500",
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-400 text-sm">{label}</span>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${colors[status]}`} />
        <span className="text-sm text-white capitalize">{status}</span>
      </div>
    </div>
  );
}

function MetricItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}

function ActionButton({ label, description }: { label: string; description: string }) {
  return (
    <button className="w-full p-3 text-left bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors group">
      <div className="text-white font-medium group-hover:text-purple-300">{label}</div>
      <div className="text-xs text-gray-500">{description}</div>
    </button>
  );
}

function ActivityItem({ 
  type, 
  address, 
  time 
}: { 
  type: "mint" | "stake" | "unstake" | "claim"; 
  address: string; 
  time: string;
}) {
  const icons = {
    mint: "🎨",
    stake: "📥",
    unstake: "📤",
    claim: "💰",
  };

  return (
    <div className="flex items-center gap-3 text-sm">
      <span>{icons[type]}</span>
      <div className="flex-1">
        <span className="text-gray-400 capitalize">{type}</span>
        <span className="text-gray-600 mx-1">by</span>
        <span className="text-purple-400 font-mono">{address}</span>
      </div>
      <span className="text-gray-600 text-xs">{time}</span>
    </div>
  );
}
