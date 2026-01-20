type LabFocusProps = {
  title: string;
  detail: string;
};

export function LabFocus({ title, detail }: LabFocusProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h4 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h4>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{detail}</p>
    </div>
  );
}
