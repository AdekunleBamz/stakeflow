import { ValidatorRow, ValidatorStats } from "@/components/validators";

const validators = [
  { name: "Stakeflow Prime", uptime: "99.98%", stake: "2.4M STX", rewards: "12.4K STF", status: "active" as const },
  { name: "Clarity Staking", uptime: "99.87%", stake: "1.8M STX", rewards: "9.2K STF", status: "active" as const },
  { name: "Bitcoin Layer", uptime: "99.92%", stake: "1.5M STX", rewards: "7.8K STF", status: "active" as const },
  { name: "Hiro Validator", uptime: "99.76%", stake: "1.2M STX", rewards: "6.1K STF", status: "active" as const },
  { name: "Stack City", uptime: "98.45%", stake: "890K STX", rewards: "4.5K STF", status: "inactive" as const },
  { name: "DeFi Node", uptime: "0%", stake: "650K STX", rewards: "0 STF", status: "jailed" as const },
];

export default function ValidatorsPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Validators</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Network validators</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Monitor validator performance, uptime, and staking distribution across the network.
          </p>
        </header>

        <ValidatorStats
          totalValidators={142}
          activeValidators={138}
          totalStaked="48.2M STX"
          averageUptime="99.4%"
        />

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Top Validators</h2>
          {validators.map((v) => (
            <ValidatorRow key={v.name} {...v} />
          ))}
        </section>
      </div>
    </div>
  );
}
