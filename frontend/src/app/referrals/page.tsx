import { ReferralCard, ReferralRow } from "@/components/referrals";

const referrals = [
  { wallet: "SP3K8...X4FZ", joinedAt: "Jan 15, 2026", staked: "15,000 STX", reward: "150 STF" },
  { wallet: "SP1QR...7HJK", joinedAt: "Jan 12, 2026", staked: "8,500 STX", reward: "85 STF" },
  { wallet: "SP2MN...9PLM", joinedAt: "Jan 8, 2026", staked: "22,000 STX", reward: "220 STF" },
  { wallet: "SP4WX...3ABC", joinedAt: "Dec 28, 2025", staked: "5,000 STX", reward: "50 STF" },
];

export default function ReferralsPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Referrals</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Referral program</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Share your code and earn 1% of your referrals staking rewards forever.
          </p>
        </header>

        <ReferralCard
          code="STAKE-XK42"
          referrals={24}
          earned="2,450 STF"
          tier="gold"
        />

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Your Referrals</h2>
          {referrals.map((r) => (
            <ReferralRow key={r.wallet} {...r} />
          ))}
        </section>
      </div>
    </div>
  );
}
