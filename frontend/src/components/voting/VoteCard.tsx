type VoteCardProps = {
  proposalId: number;
  title: string;
  yesVotes: number;
  noVotes: number;
  endDate: string;
  status: "active" | "passed" | "rejected" | "pending";
};

const statusStyles: Record<VoteCardProps["status"], { bg: string; text: string }> = {
  active: { bg: "bg-blue-500/20", text: "text-blue-400" },
  passed: { bg: "bg-emerald-500/20", text: "text-emerald-400" },
  rejected: { bg: "bg-red-500/20", text: "text-red-400" },
  pending: { bg: "bg-amber-500/20", text: "text-amber-400" },
};

export function VoteCard({ proposalId, title, yesVotes, noVotes, endDate, status }: VoteCardProps) {
  const style = statusStyles[status];
  const total = yesVotes + noVotes;
  const yesPercent = total > 0 ? Math.round((yesVotes / total) * 100) : 0;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-400">Proposal #{proposalId}</p>
          <h3 className="mt-1 text-lg font-semibold text-white">{title}</h3>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${style.bg} ${style.text}`}>
          {status}
        </span>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-sm text-slate-400">
          <span>Yes: {yesPercent}%</span>
          <span>No: {100 - yesPercent}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-700">
          <div className="h-full bg-emerald-500" style={{ width: `${yesPercent}%` }} />
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-500">Ends: {endDate}</p>
    </div>
  );
}
