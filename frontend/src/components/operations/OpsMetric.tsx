type OpsMetricProps = {
  label: string;
  value: string;
  detail: string;
};

export function OpsMetric({ label, value, detail }: OpsMetricProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{detail}</p>
    </div>
  );
}
