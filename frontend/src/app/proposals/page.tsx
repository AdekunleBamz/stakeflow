import { ProposalCard, ProposalStats } from "@/components/proposals";

const proposals = [
  { id: 15, title: "Add multi-sig treasury management", author: "alice.btc", createdAt: "Jan 18, 2026", discussionCount: 42, status: "voting" as const },
  { id: 14, title: "Implement fee redistribution mechanism", author: "bob.stx", createdAt: "Jan 15, 2026", discussionCount: 28, status: "discussion" as const },
  { id: 13, title: "Upgrade staking contract to v3", author: "charlie.id", createdAt: "Jan 10, 2026", discussionCount: 65, status: "executed" as const },
  { id: 12, title: "Launch community grants program", author: "alice.btc", createdAt: "Jan 5, 2026", discussionCount: 89, status: "executed" as const },
];

export default function ProposalsPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">Proposals</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Governance proposals</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            View and discuss protocol improvement proposals from the community.
          </p>
        </header>

        <ProposalStats
          totalProposals={15}
          activeProposals={2}
          executedProposals={10}
          avgParticipation="72.5%"
        />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">All Proposals</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {proposals.map((p) => (
              <ProposalCard key={p.id} {...p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
