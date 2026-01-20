import { VoteCard, VotingStats } from "@/components/voting";

const proposals = [
  { proposalId: 12, title: "Increase staking rewards APY to 15%", yesVotes: 8500, noVotes: 1200, endDate: "Jan 25, 2026", status: "active" as const },
  { proposalId: 11, title: "Add new NFT tier: Legendary", yesVotes: 7200, noVotes: 800, endDate: "Jan 18, 2026", status: "passed" as const },
  { proposalId: 10, title: "Reduce unstaking period to 3 days", yesVotes: 3100, noVotes: 6400, endDate: "Jan 12, 2026", status: "rejected" as const },
  { proposalId: 9, title: "Launch referral bonus program", yesVotes: 9100, noVotes: 450, endDate: "Jan 5, 2026", status: "passed" as const },
];

export default function VotingPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">Voting</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Governance voting</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Participate in protocol governance by voting on community proposals.
          </p>
        </header>

        <VotingStats
          totalProposals={12}
          activeVotes={1}
          participationRate="68.5%"
          quorumThreshold="10,000 STF"
        />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">All Proposals</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {proposals.map((p) => (
              <VoteCard key={p.proposalId} {...p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
