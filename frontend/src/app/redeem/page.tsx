import { RedeemItem, RedeemBalance } from "@/components/redeem";

const items = [
  { id: "1", name: "Premium NFT", cost: "5,000 pts", category: "NFTs", available: true, description: "Exclusive StakeFlow NFT with bonus perks" },
  { id: "2", name: "1,000 STF Tokens", cost: "2,500 pts", category: "Tokens", available: true, description: "Direct token reward" },
  { id: "3", name: "Discord Role", cost: "1,000 pts", category: "Perks", available: true, description: "Exclusive community role" },
  { id: "4", name: "Merch Pack", cost: "10,000 pts", category: "Physical", available: false, description: "Limited edition merchandise" },
];

export default function RedeemPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">Redeem</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Rewards store</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Spend your earned points on exclusive rewards and perks.
          </p>
        </header>

        <RedeemBalance
          pointsBalance="8,450 pts"
          itemsRedeemed={3}
          totalSpent="4,500 pts"
          pointsExpiring="500 pts"
        />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Available Rewards</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((i) => (
              <RedeemItem key={i.id} {...i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
