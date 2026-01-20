type Highlight = {
  label: string;
  value: string;
  detail: string;
};

type ResearchHighlightsProps = {
  highlights: Highlight[];
};

export function ResearchHighlights({ highlights }: ResearchHighlightsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {highlights.map((highlight) => (
        <div
          key={highlight.label}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {highlight.label}
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{highlight.value}</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{highlight.detail}</p>
        </div>
      ))}
    </div>
  );
}
