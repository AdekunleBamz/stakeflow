type TimelineItem = {
  title: string;
  detail: string;
  date: string;
};

type InsightTimelineProps = {
  items: TimelineItem[];
};

export function InsightTimeline({ items }: InsightTimelineProps) {
  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <div key={item.title} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="h-3 w-3 rounded-full bg-emerald-400" />
            {index < items.length - 1 && <div className="mt-2 h-full w-px bg-slate-700" />}
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {item.date}
            </p>
            <h4 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
