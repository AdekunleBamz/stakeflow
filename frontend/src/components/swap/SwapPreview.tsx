type SwapPreviewProps = {
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  rate: string;
  priceImpact: string;
  fee: string;
};

export function SwapPreview({ fromToken, toToken, fromAmount, toAmount, rate, priceImpact, fee }: SwapPreviewProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="flex items-center justify-between">
        <div className="text-center">
          <p className="text-xs text-slate-400">From</p>
          <p className="mt-1 text-2xl font-semibold text-white">{fromAmount}</p>
          <p className="text-sm text-slate-400">{fromToken}</p>
        </div>
        <div className="text-3xl text-slate-500">→</div>
        <div className="text-center">
          <p className="text-xs text-slate-400">To</p>
          <p className="mt-1 text-2xl font-semibold text-emerald-400">{toAmount}</p>
          <p className="text-sm text-slate-400">{toToken}</p>
        </div>
      </div>
      <div className="mt-6 space-y-2 border-t border-slate-700 pt-4 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-400">Rate</span>
          <span className="text-white">{rate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Price Impact</span>
          <span className="text-amber-400">{priceImpact}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Fee</span>
          <span className="text-white">{fee}</span>
        </div>
      </div>
    </div>
  );
}
