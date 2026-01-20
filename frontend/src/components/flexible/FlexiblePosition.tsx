type FlexiblePositionProps = {
  id: string;
  amount: string;
  stakedSince: string;
  currentAPY: string;
  earnedRewards: string;
};

export function FlexiblePosition({ id, amount, stakedSince, currentAPY, earnedRewards }: FlexiblePositionProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-400">Position #{id}</p>
          <p className="mt-1 text-xl font-semibold text-white">{amount}</p>
        </div>
        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
          {currentAPY} APY
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-slate-400">Staked Since</p>
          <p className="text-white">{stakedSince}</p>
        </div>
        <div>
          <p className="text-slate-400">Earned</p>
          <p className="text-emerald-400">{earnedRewards}</p>
        </div>
      </div>
      <button className="mt-4 w-full rounded-lg border border-slate-700 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
        Withdraw Anytime
      </button>
    </div>
  );
}
