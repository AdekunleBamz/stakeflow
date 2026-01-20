import React from 'react';
import { TierBenefit, TierProgress } from "@/components/tiers";

const tiers = [
  { tier: "Bronze", benefits: ["5% base APY", "Weekly rewards", "Basic support"], stakingRequirement: "100 STX", nftRequired: false, color: "bg-amber-600" },
  { tier: "Silver", benefits: ["8% base APY", "Priority rewards", "Discord role", "Early access"], stakingRequirement: "5,000 STX", nftRequired: false, color: "bg-slate-400" },
  { tier: "Gold", benefits: ["12% base APY", "Governance voting", "Exclusive airdrops", "1v1 support"], stakingRequirement: "25,000 STX", nftRequired: true, color: "bg-yellow-500" },
  { tier: "Platinum", benefits: ["15% base APY", "All perks", "Revenue share", "Advisory access"], stakingRequirement: "100,000 STX", nftRequired: true, color: "bg-purple-400" },
];

export default function TiersPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">Tiers</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Membership tiers</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Unlock exclusive benefits by reaching higher staking tiers.
          </p>
        </header>

        <TierProgress
          currentTier="Silver"
          nextTier="Gold"
          progress={68}
          amountNeeded="8,000 STX"
        />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">All Tiers</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {tiers.map((t) => (
              <TierBenefit key={t.tier} {...t} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
