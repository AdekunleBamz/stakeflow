import { ClaimRow, ClaimSummary } from "@/components/claims";

const claims = [
  { nftId: 1042, rewardAmount: "245 STF", lastClaimed: "Jan 12", nextClaim: "Jan 19", status: "claimable" as const },
  { nftId: 892, rewardAmount: "180 STF", lastClaimed: "Jan 15", nextClaim: "Jan 22", status: "pending" as const },
  { nftId: 1156, rewardAmount: "320 STF", lastClaimed: "Jan 18", nextClaim: "Jan 25", status: "claimed" as const },
  { nftId: 743, rewardAmount: "95 STF", lastClaimed: "Jan 10", nextClaim: "Jan 17", status: "claimable" as const },
];

export default function ClaimsPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Claims</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Reward claims</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            View claimable rewards for your staked NFTs and track your claim history.
          </p>
        </header>

        <ClaimSummary
          totalClaimable="340 STF"
          totalClaimed="12,450 STF"
          pendingRewards="180 STF"
          nextClaimIn="4 days"
        />

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Your NFT Claims</h2>
          {claims.map((c) => (
            <ClaimRow key={c.nftId} {...c} />
          ))}
        </section>
      </div>
    </div>
  );
}
