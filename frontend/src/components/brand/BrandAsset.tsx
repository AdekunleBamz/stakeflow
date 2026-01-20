'use client';

interface BrandAssetProps {
  title: string;
  description: string;
  format: string;
}

export function BrandAsset({ title, description, format }: BrandAssetProps) {
  return (
    <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-400 mt-2">{description}</p>
      <p className="text-xs text-gray-500 mt-4">Format: {format}</p>
    </div>
  );
}
