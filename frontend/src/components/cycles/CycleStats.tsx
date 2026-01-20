type CycleStatsProps = {
  currentCycle: number;
  daysRemaining: number;
  totalDistributed: string;
  avgParticipants: number;
};

export function CycleStats({ currentCycle, daysRemaining, totalDistributed, avgParticipants }: CycleStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Current Cycle</p>
        <p className="mt-2 text-2xl font-semibold text-white">#{currentCycle}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Days Left</p>
        <p className="mt-2 text-2xl font-semibold text-amber-400">{daysRemaining}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Distributed</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{totalDistributed}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Avg Participants</p>
        <p className="mt-2 text-2xl font-semibold text-white">{avgParticipants.toLocaleString()}</p>
      </div>
    </div>
  );
}
