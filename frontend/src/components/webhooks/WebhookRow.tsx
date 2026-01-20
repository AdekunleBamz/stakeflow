type WebhookRowProps = {
  name: string;
  url: string;
  events: string[];
  lastTriggered: string;
  status: "active" | "paused" | "failing";
};

const statusStyles = {
  active: { bg: "bg-emerald-500/20", text: "text-emerald-400" },
  paused: { bg: "bg-amber-500/20", text: "text-amber-400" },
  failing: { bg: "bg-red-500/20", text: "text-red-400" },
};

export function WebhookRow({ name, url, events, lastTriggered, status }: WebhookRowProps) {
  const style = statusStyles[status];
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20 text-orange-400">
          🔗
        </div>
        <div>
          <p className="font-medium text-white">{name}</p>
          <p className="mt-0.5 font-mono text-xs text-slate-400">{url}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-wrap gap-1">
          {events.slice(0, 2).map((e) => (
            <span key={e} className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-300">{e}</span>
          ))}
          {events.length > 2 && (
            <span className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-400">+{events.length - 2}</span>
          )}
        </div>
        <span className="text-xs text-slate-500">{lastTriggered}</span>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${style.bg} ${style.text}`}>
          {status}
        </span>
      </div>
    </div>
  );
}
