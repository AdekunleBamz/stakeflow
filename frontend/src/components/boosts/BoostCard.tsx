type BoostCardProps = {
  name: string;
  description: string;
  multiplier: string;
  duration: string;
  active: boolean;
  expiresAt?: string;
};

export function BoostCard({ name, description, multiplier, duration, active, expiresAt }: BoostCardProps) {
  return (
    <div className={`rounded-xl border p-5 ${active ? "border-cyan-500/30 bg-cyan-500/10" : "border-slate-800 bg-slate-900/60"}`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${active ? "bg-cyan-500/20 text-cyan-400" : "bg-slate-700 text-slate-400"}`}>
          {active ? "Active" : "Inactive"}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-slate-400">Multiplier</p>
          <p className="font-semibold text-emerald-400">{multiplier}</p>
        </div>
        <div>
          <p className="text-slate-400">Duration</p>
          <p className="font-medium text-white">{duration}</p>
        </div>
      </div>
      {active && expiresAt && (
        <p className="mt-3 text-xs text-amber-400">Expires: {expiresAt}</p>
      )}
    </div>
  );
}
