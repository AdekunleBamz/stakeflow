type CycleCardProps = {
  cycleNumber: number;
  startDate: string;
  endDate: string;
  rewardsPool: string;
  participants: number;
  status: "active" | "completed" | "upcoming";
};

const statusStyles: Record<CycleCardProps["status"], { bg: string; text: string }> = {
  active: { bg: "bg-emerald-500/20", text: "text-emerald-400" },
  completed: { bg: "bg-slate-500/20", text: "text-slate-400" },
  upcoming: { bg: "bg-blue-500/20", text: "text-blue-400" },
};

export function CycleCard({ cycleNumber, startDate, endDate, rewardsPool, participants, status }: CycleCardProps) {
  const style = statusStyles[status];
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Cycle #{cycleNumber}</h3>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${style.bg} ${style.text}`}>
          {status}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-slate-400">Start</p>
          <p className="font-medium text-white">{startDate}</p>
        </div>
        <div>
          <p className="text-slate-400">End</p>
          <p className="font-medium text-white">{endDate}</p>
        </div>
        <div>
          <p className="text-slate-400">Rewards Pool</p>
          <p className="font-medium text-emerald-400">{rewardsPool}</p>
        </div>
        <div>
          <p className="text-slate-400">Participants</p>
          <p className="font-medium text-white">{participants.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
