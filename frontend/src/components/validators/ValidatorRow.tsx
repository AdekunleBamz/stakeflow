type ValidatorRowProps = {
  name: string;
  uptime: string;
  stake: string;
  rewards: string;
  status: "active" | "inactive" | "jailed";
};

const statusColors: Record<ValidatorRowProps["status"], string> = {
  active: "bg-emerald-500",
  inactive: "bg-slate-500",
  jailed: "bg-red-500",
};

export function ValidatorRow({ name, uptime, stake, rewards, status }: ValidatorRowProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex items-center gap-3">
        <span className={`h-2 w-2 rounded-full ${statusColors[status]}`} />
        <span className="font-medium text-white">{name}</span>
      </div>
      <div className="flex gap-6 text-sm text-slate-300">
        <span>{uptime} uptime</span>
        <span>{stake} staked</span>
        <span>{rewards} rewards</span>
      </div>
    </div>
  );
}
