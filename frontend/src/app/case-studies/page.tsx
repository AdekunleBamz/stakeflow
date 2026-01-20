'use client';

import { CaseStudyCard } from '@/components/case-studies';

const studies = [
  {
    title: 'Collector DAO',
    summary: 'Automated staking across 250 NFTs with batch operations.',
    impact: '+18% rewards efficiency',
  },
  {
    title: 'Studio Labs',
    summary: 'Improved retention with tiered reward strategy and analytics.',
    impact: '+24% staking duration',
  },
  {
    title: 'Community Guild',
    summary: 'Optimized claim cycles and treasury planning.',
    impact: '+12% reward yield',
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Case Studies</h1>
          <p className="text-gray-400 mt-2">How teams use StakeFlow to maximize rewards.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {studies.map((study) => (
            <CaseStudyCard key={study.title} {...study} />
          ))}
        </div>
      </div>
    </div>
  );
}
