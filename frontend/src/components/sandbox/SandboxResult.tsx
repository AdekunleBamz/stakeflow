type SandboxResultProps = {
  output: string;
  success: boolean;
  gasUsed: string;
  executionTime: string;
};

export function SandboxResult({ output, success, gasUsed, executionTime }: SandboxResultProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Execution Result</h3>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${success ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
          {success ? "Success" : "Error"}
        </span>
      </div>
      <div className="mt-4 rounded-lg bg-slate-950 p-4 font-mono text-sm">
        <pre className={`whitespace-pre-wrap ${success ? "text-emerald-400" : "text-red-400"}`}>
          {output}
        </pre>
      </div>
      <div className="mt-4 flex gap-6 text-sm text-slate-400">
        <span>Gas: <span className="text-white">{gasUsed}</span></span>
        <span>Time: <span className="text-white">{executionTime}</span></span>
      </div>
    </div>
  );
}
