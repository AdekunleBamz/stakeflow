import { PendingAction, PendingSummary } from "@/components/pending";

const actions = [
  { type: "claim" as const, description: "NFT staking rewards ready", amount: "1,250 STF", availableAt: "Ready now", urgency: "high" as const },
  { type: "unstake" as const, description: "Unstaking request completing", amount: "5,000 STX", availableAt: "In 2 days", urgency: "low" as const },
  { type: "vote" as const, description: "Governance vote ending soon", amount: "—", availableAt: "Expires in 12h", urgency: "high" as const },
  { type: "withdraw" as const, description: "Pending withdrawal approval", amount: "2,500 STX", availableAt: "In 5 days", urgency: "medium" as const },
];

export default function PendingPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">Pending</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Pending actions</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            View and manage your pending transactions, claims, and governance actions.
          </p>
        </header>

        <PendingSummary
          totalPending={4}
          claimableValue="1,250 STF"
          expiringSoon={2}
          actionRequired={2}
        />

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">All Pending Actions</h2>
          {actions.map((a, i) => (
            <PendingAction key={i} {...a} />
          ))}
        </section>
      </div>
    </div>
  );
}
