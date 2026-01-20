'use client';

interface RewardLineItem {
  label: string;
  value: number;
  description?: string;
}

interface RewardBreakdownProps {
  items: RewardLineItem[];
  total: number;
}

export function RewardBreakdown({ items, total }: RewardBreakdownProps) {
  return (
    <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-4">
      <h3 className="text-lg font-semibold">Reward Breakdown</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-medium">{item.label}</p>
              {item.description && <p className="text-xs text-gray-500">{item.description}</p>}
            </div>
            <p className="text-sm text-gray-300">{item.value.toLocaleString()} STF</p>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
        <span className="text-gray-400 text-sm">Total</span>
        <span className="text-lg font-semibold text-green-400">{total.toLocaleString()} STF</span>
      </div>
    </div>
  );
}
