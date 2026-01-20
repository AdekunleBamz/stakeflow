import { APIKeyRow, APIKeyStats } from "@/components/api-keys";

const apiKeys = [
  { name: "Production Key", keyPrefix: "stf_live_", permissions: ["read", "write", "transfer"], lastUsed: "2 mins ago", status: "active" as const },
  { name: "Development Key", keyPrefix: "stf_dev_", permissions: ["read", "write"], lastUsed: "1 hour ago", status: "active" as const },
  { name: "Read-Only Key", keyPrefix: "stf_ro_", permissions: ["read"], lastUsed: "3 days ago", status: "active" as const },
  { name: "Legacy Key v1", keyPrefix: "stf_v1_", permissions: ["read", "write"], lastUsed: "30 days ago", status: "expired" as const },
  { name: "Compromised Key", keyPrefix: "stf_old_", permissions: ["read", "write", "admin"], lastUsed: "Never", status: "revoked" as const },
];

export default function APIKeysPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">API Keys</p>
          <h1 className="text-4xl font-semibold md:text-5xl">API management</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Manage your API keys and monitor usage.
          </p>
        </header>

        <APIKeyStats
          totalKeys={5}
          activeKeys={3}
          requestsToday="12,458"
          rateLimit="1000/min"
        />

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your API Keys</h2>
            <button className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold transition hover:bg-violet-500">
              Create New Key
            </button>
          </div>
          {apiKeys.map((k) => (
            <APIKeyRow key={k.keyPrefix} {...k} />
          ))}
        </section>
      </div>
    </div>
  );
}
