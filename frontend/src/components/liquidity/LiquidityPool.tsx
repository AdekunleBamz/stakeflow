type LiquidityPoolProps = {
  pair: string;
  tvl: string;
  apr: string;
  volume24h: string;
  myShare: string;
};

export function LiquidityPool({ pair, tvl, apr, volume24h, myShare }: LiquidityPoolProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{pair}</h3>
        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
          {apr} APR
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-slate-400">TVL</p>
          <p className="font-medium text-white">{tvl}</p>
        </div>
        <div>
          <p className="text-slate-400">24h Volume</p>
          <p className="font-medium text-white">{volume24h}</p>
        </div>
        <div>
          <p className="text-slate-400">My Share</p>
          <p className="font-medium text-cyan-400">{myShare}</p>
        </div>
      </div>
    </div>
  );
}
