"use client";

import { SandboxEditor, SandboxResult } from "@/components/sandbox";

const sampleCode = `(define-public (greet (name (string-ascii 50)))
  (ok (concat "Hello, " name))
)

(greet "StakeFlow")`;

export default function SandboxPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-400">Sandbox</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Clarity sandbox</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Test and experiment with Clarity smart contracts in a safe environment.
          </p>
        </header>

        <SandboxEditor
          code={sampleCode}
          language="Clarity"
          onRun={() => {}}
          isRunning={false}
        />

        <SandboxResult
          output='(ok "Hello, StakeFlow")'
          success={true}
          gasUsed="1,245"
          executionTime="0.042s"
        />
      </div>
    </div>
  );
}
