import { EarningRow, EarningSummary } from "@/components/earnings";

const earnings = [
  { source: "NFT #1042 Staking", amount: "245 STF", type: "stake" as const, date: "Jan 19, 2026" },
  { source: "Referral Bonus", amount: "500 STF", type: "referral" as const, date: "Jan 18, 2026" },
  { source: "Early Adopter Bonus", amount: "1,000 STF", type: "bonus" as const, date: "Jan 15, 2026" },
  { source: "Community Airdrop", amount: "750 STF", type: "airdrop" as const, date: "Jan 10, 2026" },
  { source: "NFT #892 Staking", amount: "180 STF", type: "stake" as const, date: "Jan 8, 2026" },
];

export default function EarningsPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Earnings</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Your earnings</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Track all your earnings from staking rewards, referrals, bonuses, and airdrops.
          </p>
        </header>

        <EarningSummary
          totalEarnings="24,850 STF"
          thisMonth="2,675 STF"
          stakingRewards="18,420 STF"
          otherRewards="6,430 STF"
        />

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Recent Earnings</h2>
          {earnings.map((e, i) => (
            <EarningRow key={i} {...e} />
          ))}
        </section>
      </div>
    </div>
  );
}
