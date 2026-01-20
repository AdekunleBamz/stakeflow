type ProposalCardProps = {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  discussionCount: number;
  status: "draft" | "discussion" | "voting" | "executed" | "cancelled";
};

const statusStyles: Record<ProposalCardProps["status"], { bg: string; text: string }> = {
  draft: { bg: "bg-slate-500/20", text: "text-slate-400" },
  discussion: { bg: "bg-blue-500/20", text: "text-blue-400" },
  voting: { bg: "bg-purple-500/20", text: "text-purple-400" },
  executed: { bg: "bg-emerald-500/20", text: "text-emerald-400" },
  cancelled: { bg: "bg-red-500/20", text: "text-red-400" },
};

export function ProposalCard({ id, title, author, createdAt, discussionCount, status }: ProposalCardProps) {
  const style = statusStyles[status];
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-400">SIP-{id}</p>
          <h3 className="mt-1 text-lg font-semibold text-white">{title}</h3>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${style.bg} ${style.text}`}>
          {status}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
        <span>By {author}</span>
        <span>{discussionCount} comments</span>
      </div>
      <p className="mt-2 text-xs text-slate-500">{createdAt}</p>
    </div>
  );
}
