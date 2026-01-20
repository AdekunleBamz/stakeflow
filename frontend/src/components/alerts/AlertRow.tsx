type AlertRowProps = {
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  timestamp: string;
  read: boolean;
};

const typeStyles: Record<AlertRowProps["type"], { bg: string; border: string; icon: string }> = {
  info: { bg: "bg-blue-500/10", border: "border-blue-500/30", icon: "ℹ️" },
  warning: { bg: "bg-amber-500/10", border: "border-amber-500/30", icon: "⚠️" },
  error: { bg: "bg-red-500/10", border: "border-red-500/30", icon: "🚨" },
  success: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", icon: "✅" },
};

export function AlertRow({ title, message, type, timestamp, read }: AlertRowProps) {
  const style = typeStyles[type];
  return (
    <div className={`rounded-xl border p-4 ${style.bg} ${style.border} ${read ? "opacity-60" : ""}`}>
      <div className="flex items-start gap-3">
        <span className="text-lg">{style.icon}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-white">{title}</h4>
            <span className="text-xs text-slate-400">{timestamp}</span>
          </div>
          <p className="mt-1 text-sm text-slate-300">{message}</p>
        </div>
      </div>
    </div>
  );
}
