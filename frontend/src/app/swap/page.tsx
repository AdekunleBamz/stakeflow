import { SwapPreview, SwapStats } from "@/components/swap";

export default function SwapPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-400">Swap</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Token swap</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Swap tokens instantly with the best rates across liquidity pools.
          </p>
        </header>

        <SwapStats
          totalSwaps="1.2M"
          volume24h="$485K"
          avgSlippage="0.12%"
          supportedPairs={12}
        />

        <section className="mx-auto w-full max-w-md space-y-4">
          <h2 className="text-xl font-semibold">Swap Preview</h2>
          <SwapPreview
            fromToken="STX"
            toToken="STF"
            fromAmount="1,000"
            toAmount="4,850"
            rate="1 STX = 4.85 STF"
            priceImpact="0.08%"
            fee="0.3%"
          />
          <button className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 py-4 text-lg font-semibold text-white transition hover:opacity-90">
            Connect Wallet to Swap
          </button>
        </section>
      </div>
    </div>
  );
}
