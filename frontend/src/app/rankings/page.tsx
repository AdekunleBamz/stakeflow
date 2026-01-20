"use client";

import { useState } from "react";
import { RankCard, RankingFilters } from "@/components/rankings";

const users = [
  { rank: 1, address: "SP1234567890ABCDEFGHIJK", totalStaked: 250000, nftsOwned: 12, level: 45 },
  { rank: 2, address: "SP9876543210ZYXWVUTSRQP", totalStaked: 180000, nftsOwned: 8, level: 38 },
  { rank: 3, address: "SPABCDEFGHIJ1234567890", totalStaked: 125000, nftsOwned: 6, level: 32 },
  { rank: 4, address: "SP0000111122223333AAAA", totalStaked: 95000, nftsOwned: 5, level: 28, isCurrentUser: true },
];

export default function RankingsPage() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly" | "alltime">("weekly");
  const [category, setCategory] = useState<"staked" | "nfts" | "rewards" | "referrals">("staked");

  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">Rankings</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Global rankings</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            See how you compare against other stakers on the platform.
          </p>
        </header>

        <RankingFilters
          period={period}
          category={category}
          onPeriodChange={setPeriod}
          onCategoryChange={setCategory}
        />

        <section className="space-y-3">
          {users.map((u) => (
            <RankCard key={u.rank} {...u} />
          ))}
        </section>
      </div>
    </div>
  );
}
