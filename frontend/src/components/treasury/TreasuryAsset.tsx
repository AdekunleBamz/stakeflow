type TreasuryAssetProps = {
  asset: string;
  symbol: string;
  balance: string;
  usdValue: string;
  allocation: number;
};

export function TreasuryAsset({ asset, symbol, balance, usdValue, allocation }: TreasuryAssetProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-sm font-bold text-white">
          {symbol.slice(0, 2)}
        </div>
        <div>
          <p className="font-medium text-white">{asset}</p>
          <p className="text-sm text-slate-400">{symbol}</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="font-medium text-white">{balance}</p>
          <p className="text-sm text-slate-400">{usdValue}</p>
        </div>
        <div className="w-20">
          <div className="h-2 overflow-hidden rounded-full bg-slate-700">
            <div className="h-full bg-purple-500" style={{ width: `${allocation}%` }} />
          </div>
          <p className="mt-1 text-right text-xs text-slate-400">{allocation}%</p>
        </div>
      </div>
    </div>
  );
}
