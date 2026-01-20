type FilterProps = {
  filters: string[];
};

export function ReportFilters({ filters }: FilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <span
          key={filter}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
        >
          {filter}
        </span>
      ))}
    </div>
  );
}
