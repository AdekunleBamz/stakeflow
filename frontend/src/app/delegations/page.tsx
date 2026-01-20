import { DelegationCard, DelegationSummary } from "@/components/delegations";

const delegations = [
  { validator: "Stakeflow Prime", amount: "125,000 STX", rewards: "6,420 STF", duration: "14 months", apy: "8.2%" },
  { validator: "Clarity Staking", amount: "75,000 STX", rewards: "3,890 STF", duration: "9 months", apy: "7.8%" },
  { validator: "Bitcoin Layer", amount: "50,000 STX", rewards: "2,150 STF", duration: "6 months", apy: "7.5%" },
  { validator: "Hiro Validator", amount: "25,000 STX", rewards: "1,080 STF", duration: "4 months", apy: "7.2%" },
];

export default function DelegationsPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Delegations</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Your delegations</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Track your active delegations, earned rewards, and APY performance across validators.
          </p>
        </header>

        <DelegationSummary
          totalDelegated="275,000 STX"
          totalRewards="13,540 STF"
          activeDelegations={4}
          averageApy="7.68%"
        />

        <section className="grid gap-4 md:grid-cols-2">
          {delegations.map((d) => (
            <DelegationCard key={d.validator} {...d} />
          ))}
        </section>
      </div>
    </div>
  );
}
