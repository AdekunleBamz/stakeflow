type AlertStatsProps = {
  total: number;
  unread: number;
  warnings: number;
  errors: number;
};

export function AlertStats({ total, unread, warnings, errors }: AlertStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Alerts</p>
        <p className="mt-2 text-2xl font-semibold text-white">{total}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Unread</p>
        <p className="mt-2 text-2xl font-semibold text-blue-400">{unread}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Warnings</p>
        <p className="mt-2 text-2xl font-semibold text-amber-400">{warnings}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Errors</p>
        <p className="mt-2 text-2xl font-semibold text-red-400">{errors}</p>
      </div>
    </div>
  );
}
