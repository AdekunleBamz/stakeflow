'use client';

interface ActivityItem {
  id: string;
  type: 'mint' | 'stake' | 'unstake' | 'claim' | 'transfer';
  title: string;
  description: string;
  timestamp: string;
  amount?: number;
  tokenIds?: number[];
}

interface ActivityFeedProps {
  items: ActivityItem[];
}

const typeStyles: Record<ActivityItem['type'], { color: string; icon: string }> = {
  mint: { color: 'text-purple-400', icon: '✨' },
  stake: { color: 'text-green-400', icon: '🔒' },
  unstake: { color: 'text-yellow-400', icon: '🔓' },
  claim: { color: 'text-blue-400', icon: '💸' },
  transfer: { color: 'text-pink-400', icon: '🔁' },
};

export function ActivityFeed({ items }: ActivityFeedProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">No recent activity.</div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-start gap-4 p-4 rounded-2xl bg-gray-900/40 border border-gray-800"
        >
          <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-lg">
            {typeStyles[item.type].icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-medium">{item.title}</h4>
              <span className="text-xs text-gray-500">{item.timestamp}</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">{item.description}</p>
            {item.amount !== undefined && (
              <p className={`text-sm mt-2 ${typeStyles[item.type].color}`}>
                {item.amount.toLocaleString()} STF
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
