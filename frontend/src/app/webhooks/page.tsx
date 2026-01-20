import { WebhookRow, WebhookStats } from "@/components/webhooks";

const webhooks = [
  { name: "Discord Notifier", url: "https://discord.com/api/webhooks/...", events: ["stake.created", "reward.claimed"], lastTriggered: "5 mins ago", status: "active" as const },
  { name: "Slack Alerts", url: "https://hooks.slack.com/services/...", events: ["nft.minted", "stake.unstaked"], lastTriggered: "1 hour ago", status: "active" as const },
  { name: "Analytics Tracker", url: "https://analytics.example.com/webhook", events: ["transfer.completed"], lastTriggered: "3 hours ago", status: "paused" as const },
  { name: "Legacy Notifier", url: "https://old-service.example.com/hook", events: ["stake.created", "stake.unstaked", "reward.claimed"], lastTriggered: "2 days ago", status: "failing" as const },
];

export default function WebhooksPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">Webhooks</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Webhook endpoints</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Configure webhook endpoints to receive real-time event notifications.
          </p>
        </header>

        <WebhookStats
          totalWebhooks={4}
          activeWebhooks={2}
          deliveriesToday={1247}
          successRate="98.5%"
        />

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Webhooks</h2>
            <button className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold transition hover:bg-orange-500">
              Create Webhook
            </button>
          </div>
          {webhooks.map((w) => (
            <WebhookRow key={w.url} {...w} />
          ))}
        </section>
      </div>
    </div>
  );
}
