type WebhookStatsProps = {
  totalWebhooks: number;
  activeWebhooks: number;
  deliveriesToday: number;
  successRate: string;
};

export function WebhookStats({ totalWebhooks, activeWebhooks, deliveriesToday, successRate }: WebhookStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Webhooks</p>
        <p className="mt-2 text-2xl font-semibold text-white">{totalWebhooks}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Active</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{activeWebhooks}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Deliveries Today</p>
        <p className="mt-2 text-2xl font-semibold text-orange-400">{deliveriesToday.toLocaleString()}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Success Rate</p>
        <p className="mt-2 text-2xl font-semibold text-white">{successRate}</p>
      </div>
    </div>
  );
}
