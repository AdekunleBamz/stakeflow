type BoostStatsProps = {
  activeBoosts: number;
  totalMultiplier: string;
  bonusRewards: string;
  availableBoosts: number;
};

export function BoostStats({ activeBoosts, totalMultiplier, bonusRewards, availableBoosts }: BoostStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Active Boosts</p>
        <p className="mt-2 text-2xl font-semibold text-cyan-400">{activeBoosts}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Multiplier</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{totalMultiplier}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Bonus Rewards</p>
        <p className="mt-2 text-2xl font-semibold text-white">{bonusRewards}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Available</p>
        <p className="mt-2 text-2xl font-semibold text-amber-400">{availableBoosts}</p>
      </div>
    </div>
  );
}
