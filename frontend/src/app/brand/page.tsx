'use client';

import { BrandAsset } from '@/components/brand';

const assets = [
  {
    title: 'StakeFlow Logo',
    description: 'Primary logo for light and dark backgrounds.',
    format: 'SVG, PNG',
  },
  {
    title: 'App Icon',
    description: 'Square icon for wallet integrations and mobile.',
    format: 'PNG',
  },
  {
    title: 'Brand Guidelines',
    description: 'Color palette, typography, and usage guidelines.',
    format: 'PDF',
  },
];

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Brand Assets</h1>
          <p className="text-gray-400 mt-2">Download logos and brand guidelines.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {assets.map((asset) => (
            <BrandAsset key={asset.title} {...asset} />
          ))}
        </div>
      </div>
    </div>
  );
}
