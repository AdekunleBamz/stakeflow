type PlaygroundStatsProps = {
  totalSnippets: number;
  activeUsers: number;
  executions: string;
  savedTemplates: number;
};

export function PlaygroundStats({ totalSnippets, activeUsers, executions, savedTemplates }: PlaygroundStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Snippets</p>
        <p className="mt-2 text-2xl font-semibold text-white">{totalSnippets}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Active Users</p>
        <p className="mt-2 text-2xl font-semibold text-indigo-400">{activeUsers}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Executions</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{executions}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Templates</p>
        <p className="mt-2 text-2xl font-semibold text-white">{savedTemplates}</p>
      </div>
    </div>
  );
}
