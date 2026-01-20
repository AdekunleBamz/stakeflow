type ProposalStatsProps = {
  totalProposals: number;
  activeProposals: number;
  executedProposals: number;
  avgParticipation: string;
};

export function ProposalStats({ totalProposals, activeProposals, executedProposals, avgParticipation }: ProposalStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total</p>
        <p className="mt-2 text-2xl font-semibold text-white">{totalProposals}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Active</p>
        <p className="mt-2 text-2xl font-semibold text-purple-400">{activeProposals}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Executed</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{executedProposals}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Participation</p>
        <p className="mt-2 text-2xl font-semibold text-white">{avgParticipation}</p>
      </div>
    </div>
  );
}
