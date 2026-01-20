type APIKeyStatsProps = {
  totalKeys: number;
  activeKeys: number;
  requestsToday: string;
  rateLimit: string;
};

export function APIKeyStats({ totalKeys, activeKeys, requestsToday, rateLimit }: APIKeyStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Keys</p>
        <p className="mt-2 text-2xl font-semibold text-white">{totalKeys}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Active Keys</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{activeKeys}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Requests Today</p>
        <p className="mt-2 text-2xl font-semibold text-violet-400">{requestsToday}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Rate Limit</p>
        <p className="mt-2 text-2xl font-semibold text-white">{rateLimit}</p>
      </div>
    </div>
  );
}
