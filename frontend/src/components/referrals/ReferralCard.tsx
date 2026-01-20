type ReferralCardProps = {
  code: string;
  referrals: number;
  earned: string;
  tier: "bronze" | "silver" | "gold" | "platinum";
};

const tierStyles: Record<ReferralCardProps["tier"], { bg: string; text: string }> = {
  bronze: { bg: "bg-orange-500/20", text: "text-orange-400" },
  silver: { bg: "bg-slate-400/20", text: "text-slate-300" },
  gold: { bg: "bg-yellow-500/20", text: "text-yellow-400" },
  platinum: { bg: "bg-cyan-500/20", text: "text-cyan-400" },
};

export function ReferralCard({ code, referrals, earned, tier }: ReferralCardProps) {
  const style = tierStyles[tier];
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Your Referral Code</p>
          <p className="mt-1 font-mono text-2xl font-bold text-white">{code}</p>
        </div>
        <span className={`rounded-full px-4 py-1.5 text-sm font-semibold capitalize ${style.bg} ${style.text}`}>
          {tier}
        </span>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-slate-400">Total Referrals</p>
          <p className="mt-1 text-xl font-semibold text-white">{referrals}</p>
        </div>
        <div>
          <p className="text-sm text-slate-400">Total Earned</p>
          <p className="mt-1 text-xl font-semibold text-emerald-400">{earned}</p>
        </div>
      </div>
    </div>
  );
}
