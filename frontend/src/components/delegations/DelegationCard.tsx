type DelegationCardProps = {
  validator: string;
  amount: string;
  rewards: string;
  duration: string;
  apy: string;
};

export function DelegationCard({ validator, amount, rewards, duration, apy }: DelegationCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">{validator}</h3>
        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
          {apy} APY
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-slate-400">Delegated</p>
          <p className="font-medium text-white">{amount}</p>
        </div>
        <div>
          <p className="text-slate-400">Earned</p>
          <p className="font-medium text-emerald-400">{rewards}</p>
        </div>
        <div>
          <p className="text-slate-400">Duration</p>
          <p className="font-medium text-white">{duration}</p>
        </div>
      </div>
    </div>
  );
}
