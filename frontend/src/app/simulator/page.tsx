import { SimulatorInput, SimulatorOutput } from "@/components/simulator";

export default function SimulatorPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">Simulator</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Rewards simulator</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Calculate potential staking rewards based on your investment parameters.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Parameters</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <SimulatorInput label="Stake Amount" value="10000" unit="STX" min={100} max={100000} />
            <SimulatorInput label="Lock Period" value="90" unit="days" min={7} max={365} />
            <SimulatorInput label="NFT Tier Bonus" value="15" unit="%" min={0} max={50} />
            <SimulatorInput label="Base APY" value="12" unit="%" min={5} max={25} />
          </div>
        </section>

        <SimulatorOutput
          dailyRewards="4.11 STX"
          monthlyRewards="123.28 STX"
          yearlyRewards="1,500 STX"
          effectiveAPY="15.0%"
        />
      </div>
    </div>
  );
}
