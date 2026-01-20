type PendingActionProps = {
  type: "claim" | "unstake" | "withdraw" | "vote";
  description: string;
  amount: string;
  availableAt: string;
  urgency: "low" | "medium" | "high";
};

const typeIcons: Record<PendingActionProps["type"], string> = {
  claim: "🎁",
  unstake: "📤",
  withdraw: "💸",
  vote: "🗳️",
};

const urgencyStyles: Record<PendingActionProps["urgency"], string> = {
  low: "border-slate-700",
  medium: "border-amber-500/50",
  high: "border-red-500/50",
};

export function PendingAction({ type, description, amount, availableAt, urgency }: PendingActionProps) {
  return (
    <div className={`rounded-xl border bg-slate-900/60 p-4 ${urgencyStyles[urgency]}`}>
      <div className="flex items-center gap-4">
        <div className="text-2xl">{typeIcons[type]}</div>
        <div className="flex-1">
          <p className="font-medium text-white">{description}</p>
          <p className="text-sm text-slate-400">{availableAt}</p>
        </div>
        <p className="font-semibold text-emerald-400">{amount}</p>
      </div>
    </div>
  );
}
