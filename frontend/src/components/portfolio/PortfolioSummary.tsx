'use client';

interface PortfolioSummaryProps {
  totalValue: number;
  stakedValue: number;
  pendingRewards: number;
  nftCount: number;
}

export function PortfolioSummary({
  totalValue,
  stakedValue,
  pendingRewards,
  nftCount,
}: PortfolioSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="p-5 rounded-2xl bg-gray-900/40 border border-gray-800">
        <p className="text-xs uppercase text-gray-500">Total Value</p>
        <p className="text-2xl font-semibold mt-2">{totalValue.toLocaleString()} STF</p>
      </div>
      <div className="p-5 rounded-2xl bg-gray-900/40 border border-gray-800">
        <p className="text-xs uppercase text-gray-500">Staked Value</p>
        <p className="text-2xl font-semibold mt-2">{stakedValue.toLocaleString()} STF</p>
      </div>
      <div className="p-5 rounded-2xl bg-gray-900/40 border border-gray-800">
        <p className="text-xs uppercase text-gray-500">Pending Rewards</p>
        <p className="text-2xl font-semibold mt-2">{pendingRewards.toLocaleString()} STF</p>
      </div>
      <div className="p-5 rounded-2xl bg-gray-900/40 border border-gray-800">
        <p className="text-xs uppercase text-gray-500">NFTs Owned</p>
        <p className="text-2xl font-semibold mt-2">{nftCount}</p>
      </div>
    </div>
  );
}
