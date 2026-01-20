type LockedPositionProps = {
  id: string;
  amount: string;
  lockDate: string;
  unlockDate: string;
  daysRemaining: number;
  bonusAPY: string;
};

export function LockedPosition({ id, amount, lockDate, unlockDate, daysRemaining, bonusAPY }: LockedPositionProps) {
  const progress = Math.max(0, 100 - (daysRemaining / 90) * 100);
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-400">Position #{id}</p>
          <p className="mt-1 text-xl font-semibold text-white">{amount}</p>
        </div>
        <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-400">
          +{bonusAPY} APY
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-slate-400">Locked</p>
          <p className="text-white">{lockDate}</p>
        </div>
        <div>
          <p className="text-slate-400">Unlocks</p>
          <p className="text-white">{unlockDate}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-xs text-slate-400">
          <span>{daysRemaining} days remaining</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-700">
          <div className="h-full bg-purple-500" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
