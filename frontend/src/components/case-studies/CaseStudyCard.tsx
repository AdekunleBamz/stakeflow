'use client';

interface CaseStudyCardProps {
  title: string;
  summary: string;
  impact: string;
}

export function CaseStudyCard({ title, summary, impact }: CaseStudyCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-400 mt-2">{summary}</p>
      <p className="text-sm text-purple-400 mt-4">Impact: {impact}</p>
    </div>
  );
}
