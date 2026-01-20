type TopicCardProps = {
  title: string;
  summary: string;
  tag: string;
};

export function TopicCard({ title, summary, tag }: TopicCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">{tag}</p>
      <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{summary}</p>
    </article>
  );
}
