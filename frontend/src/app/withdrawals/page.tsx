import { WithdrawalRow, WithdrawalStats } from "@/components/withdrawals";

const withdrawals = [
  { amount: "15,000 STX", validator: "Stakeflow Prime", requestedAt: "Jan 18", availableAt: "Jan 25", status: "pending" as const },
  { amount: "8,500 STX", validator: "Clarity Staking", requestedAt: "Jan 15", availableAt: "Jan 22", status: "ready" as const },
  { amount: "12,000 STX", validator: "Bitcoin Layer", requestedAt: "Jan 10", availableAt: "Jan 17", status: "completed" as const },
  { amount: "5,000 STX", validator: "Hiro Validator", requestedAt: "Jan 5", availableAt: "Jan 12", status: "completed" as const },
];

export default function WithdrawalsPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Withdrawals</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Withdrawal requests</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Track your pending unstaking requests and claim funds when the cooldown period ends.
          </p>
        </header>

        <WithdrawalStats
          pendingAmount="15,000 STX"
          readyAmount="8,500 STX"
          completedThisMonth="17,000 STX"
          averageWaitTime="7 days"
        />

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Recent Withdrawals</h2>
          {withdrawals.map((w, i) => (
            <WithdrawalRow key={i} {...w} />
          ))}
        </section>
      </div>
    </div>
  );
}
