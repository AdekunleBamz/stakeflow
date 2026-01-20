type PoolCardProps = {
  name: string;
  tvl: string;
  apy: string;
  participants: number;
  minStake: string;
};

export function PoolCard({ name, tvl, apy, participants, minStake }: PoolCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
          {apy} APY
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-slate-400">TVL</p>
          <p className="font-medium text-white">{tvl}</p>
        </div>
        <div>
          <p className="text-slate-400">Stakers</p>
          <p className="font-medium text-white">{participants.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-slate-400">Min Stake</p>
          <p className="font-medium text-white">{minStake}</p>
        </div>
      </div>
    </div>
  );
}
