type NetworkMetricProps = {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
};

const trendStyles: Record<NetworkMetricProps["trend"], { color: string; icon: string }> = {
  up: { color: "text-emerald-400", icon: "↑" },
  down: { color: "text-red-400", icon: "↓" },
  neutral: { color: "text-slate-400", icon: "→" },
};

export function NetworkMetric({ label, value, change, trend }: NetworkMetricProps) {
  const style = trendStyles[trend];
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      <p className={`mt-1 text-sm ${style.color}`}>
        {style.icon} {change}
      </p>
    </div>
  );
}
