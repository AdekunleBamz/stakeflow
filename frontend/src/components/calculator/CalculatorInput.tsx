type CalculatorInputProps = {
  amount: number;
  duration: number;
  hasNft: boolean;
  onAmountChange: (v: number) => void;
  onDurationChange: (v: number) => void;
  onNftToggle: () => void;
};

export function CalculatorInput({
  amount,
  duration,
  hasNft,
  onAmountChange,
  onDurationChange,
  onNftToggle,
}: CalculatorInputProps) {
  return (
    <div className="space-y-6 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
      <div>
        <label className="text-sm font-medium text-slate-300">Stake Amount (STX)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => onAmountChange(Number(e.target.value))}
          className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-300">Duration (months)</label>
        <input
          type="range"
          min={1}
          max={24}
          value={duration}
          onChange={(e) => onDurationChange(Number(e.target.value))}
          className="mt-2 w-full accent-purple-500"
        />
        <p className="mt-1 text-sm text-slate-400">{duration} month{duration > 1 ? "s" : ""}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onNftToggle}
          className={`h-6 w-11 rounded-full transition ${hasNft ? "bg-purple-500" : "bg-slate-700"}`}
        >
          <span className={`block h-5 w-5 rounded-full bg-white transition ${hasNft ? "translate-x-5" : "translate-x-0.5"}`} />
        </button>
        <span className="text-sm text-slate-300">NFT Boost (+20%)</span>
      </div>
    </div>
  );
}
