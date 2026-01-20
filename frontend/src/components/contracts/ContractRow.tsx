type ContractRowProps = {
  name: string;
  address: string;
  type: "token" | "nft" | "staking" | "rewards";
  version: string;
  status: "active" | "deprecated" | "testing";
};

const statusStyles: Record<ContractRowProps["status"], { bg: string; text: string }> = {
  active: { bg: "bg-emerald-500/20", text: "text-emerald-400" },
  deprecated: { bg: "bg-slate-500/20", text: "text-slate-400" },
  testing: { bg: "bg-amber-500/20", text: "text-amber-400" },
};

const typeColors: Record<ContractRowProps["type"], string> = {
  token: "text-purple-400",
  nft: "text-blue-400",
  staking: "text-emerald-400",
  rewards: "text-amber-400",
};

export function ContractRow({ name, address, type, version, status }: ContractRowProps) {
  const statusStyle = statusStyles[status];
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-white">{name}</span>
            <span className={`text-xs font-semibold uppercase ${typeColors[type]}`}>{type}</span>
          </div>
          <p className="mt-1 font-mono text-xs text-slate-400">{address}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-300">v{version}</span>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyle.bg} ${statusStyle.text}`}>
          {status}
        </span>
      </div>
    </div>
  );
}
