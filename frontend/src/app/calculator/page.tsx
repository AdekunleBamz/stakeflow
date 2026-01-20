"use client";

import { useState } from "react";
import { CalculatorInput, CalculatorResult } from "@/components/calculator";

export default function CalculatorPage() {
  const [amount, setAmount] = useState(10000);
  const [duration, setDuration] = useState(6);
  const [hasNft, setHasNft] = useState(false);

  const baseApr = 8.5;
  const effectiveApr = hasNft ? baseApr * 1.2 : baseApr;
  const monthlyRewards = Math.round((amount * (effectiveApr / 100)) / 12);
  const totalRewards = monthlyRewards * duration;
  const nftBonus = hasNft ? Math.round(totalRewards * 0.2 / 1.2) : 0;

  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4">
        <header className="space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">Calculator</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Rewards calculator</h1>
          <p className="text-lg text-slate-300">
            Estimate your staking rewards based on amount and duration.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <CalculatorInput
            amount={amount}
            duration={duration}
            hasNft={hasNft}
            onAmountChange={setAmount}
            onDurationChange={setDuration}
            onNftToggle={() => setHasNft(!hasNft)}
          />
          <CalculatorResult
            totalRewards={totalRewards}
            apr={effectiveApr}
            monthlyRewards={monthlyRewards}
            nftBonus={nftBonus}
          />
        </div>
      </div>
    </div>
  );
}
