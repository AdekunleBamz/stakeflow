import React from 'react';

type LabProjectCardProps = {
  title: string;
  summary: string;
  stage: string;
  lead: string;
};

export function LabProjectCard({ title, summary, stage, lead }: LabProjectCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        <span>{stage}</span>
        <span>{lead}</span>
      </div>
      <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{summary}</p>
    </article>
  );
}
