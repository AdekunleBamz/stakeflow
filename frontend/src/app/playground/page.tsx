import { PlaygroundSnippet, PlaygroundStats } from "@/components/playground";

const snippets = [
  { id: "1", title: "Basic Token Transfer", description: "Simple STX transfer between two principals", language: "Clarity", author: "alice.btc", likes: 42 },
  { id: "2", title: "NFT Mint Function", description: "Mint a new SIP-009 compliant NFT", language: "Clarity", author: "bob.stx", likes: 38 },
  { id: "3", title: "Staking Deposit", description: "Deposit tokens into staking contract", language: "Clarity", author: "charlie.id", likes: 56 },
  { id: "4", title: "Reward Calculation", description: "Calculate staking rewards with APY", language: "Clarity", author: "dave.btc", likes: 29 },
];

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-400">Playground</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Code playground</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Explore and share community code snippets for Clarity development.
          </p>
        </header>

        <PlaygroundStats
          totalSnippets={248}
          activeUsers={89}
          executions="12.5K"
          savedTemplates={32}
        />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Popular Snippets</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {snippets.map((s) => (
              <PlaygroundSnippet key={s.id} {...s} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
