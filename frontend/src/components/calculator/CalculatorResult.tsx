type CalculatorResultProps = {
  totalRewards: number;
  apr: number;
  monthlyRewards: number;
  nftBonus: number;
};

export function CalculatorResult({ totalRewards, apr, monthlyRewards, nftBonus }: CalculatorResultProps) {
  return (
    <div className="space-y-4 rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-slate-900/60 p-6">
      <h3 className="text-lg font-semibold text-white">Projected Earnings</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-slate-400">Total Rewards</p>
          <p className="text-2xl font-bold text-emerald-400">{totalRewards.toLocaleString()} FLOW</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Effective APR</p>
          <p className="text-2xl font-bold text-white">{apr}%</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Monthly</p>
          <p className="text-xl font-semibold text-slate-200">{monthlyRewards.toLocaleString()} FLOW</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">NFT Bonus</p>
          <p className="text-xl font-semibold text-purple-400">+{nftBonus.toLocaleString()} FLOW</p>
        </div>
      </div>
      <p className="text-xs text-slate-500">
        * Projections are estimates based on current rates. Actual rewards may vary.
      </p>
    </div>
  );
}
