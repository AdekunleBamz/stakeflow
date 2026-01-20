type VotingStatsProps = {
  totalProposals: number;
  activeVotes: number;
  participationRate: string;
  quorumThreshold: string;
};

export function VotingStats({ totalProposals, activeVotes, participationRate, quorumThreshold }: VotingStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Proposals</p>
        <p className="mt-2 text-2xl font-semibold text-white">{totalProposals}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Active Votes</p>
        <p className="mt-2 text-2xl font-semibold text-blue-400">{activeVotes}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Participation</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{participationRate}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Quorum</p>
        <p className="mt-2 text-2xl font-semibold text-amber-400">{quorumThreshold}</p>
      </div>
    </div>
  );
}
