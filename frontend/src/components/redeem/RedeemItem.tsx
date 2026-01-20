type RedeemItemProps = {
  id: string;
  name: string;
  cost: string;
  category: string;
  available: boolean;
  description: string;
};

export function RedeemItem({ id, name, cost, category, available, description }: RedeemItemProps) {
  return (
    <div className={`rounded-xl border p-5 ${available ? "border-slate-800 bg-slate-900/60" : "border-slate-800/50 bg-slate-900/30 opacity-60"}`}>
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs text-slate-400">{category}</span>
          <h3 className="mt-1 text-lg font-semibold text-white">{name}</h3>
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="font-semibold text-amber-400">{cost}</p>
        <button
          disabled={!available}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${available ? "bg-emerald-600 text-white hover:bg-emerald-500" : "bg-slate-700 text-slate-400 cursor-not-allowed"}`}
        >
          {available ? "Redeem" : "Unavailable"}
        </button>
      </div>
    </div>
  );
}
