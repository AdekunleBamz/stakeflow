type SandboxEditorProps = {
  code: string;
  language: string;
  onRun: () => void;
  isRunning: boolean;
};

export function SandboxEditor({ code, language, onRun, isRunning }: SandboxEditorProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="rounded bg-slate-700 px-2 py-1 text-xs font-medium text-slate-300">{language}</span>
          <span className="text-sm text-slate-400">Clarity Sandbox</span>
        </div>
        <button
          onClick={onRun}
          disabled={isRunning}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:opacity-50"
        >
          {isRunning ? "Running..." : "Run Code"}
        </button>
      </div>
      <div className="mt-4 rounded-lg bg-slate-950 p-4 font-mono text-sm">
        <pre className="whitespace-pre-wrap text-slate-300">{code}</pre>
      </div>
    </div>
  );
}
