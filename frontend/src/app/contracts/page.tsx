import { ContractRow, ContractStats } from "@/components/contracts";

const contracts = [
  { name: "stakeflow-token", address: "SP2X...stakeflow-token", type: "token" as const, version: "1.0.0", status: "active" as const },
  { name: "stakeflow-nft", address: "SP2X...stakeflow-nft", type: "nft" as const, version: "2.1.0", status: "active" as const },
  { name: "stakeflow-staking-v3", address: "SP2X...stakeflow-staking-v3", type: "staking" as const, version: "3.0.0", status: "active" as const },
  { name: "stakeflow-rewards-v3", address: "SP2X...stakeflow-rewards-v3", type: "rewards" as const, version: "3.0.0", status: "active" as const },
  { name: "stakeflow-staking-v2", address: "SP2X...stakeflow-staking-v2", type: "staking" as const, version: "2.0.0", status: "deprecated" as const },
  { name: "stakeflow-unstake-v4", address: "SP2X...stakeflow-unstake-v4", type: "staking" as const, version: "4.0.0-beta", status: "testing" as const },
];

export default function ContractsPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Contracts</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Smart contracts</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            View all deployed Stakeflow smart contracts, versions, and deployment status.
          </p>
        </header>

        <ContractStats
          totalContracts={12}
          activeContracts={8}
          totalTransactions="1.2M"
          lastDeployment="Jan 15"
        />

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Contract Registry</h2>
          {contracts.map((c) => (
            <ContractRow key={c.name} {...c} />
          ))}
        </section>
      </div>
    </div>
  );
}
