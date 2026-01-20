'use client';

interface ResourceCardProps {
  title: string;
  description: string;
  href: string;
  type: string;
}

export function ResourceCard({ title, description, href, type }: ResourceCardProps) {
  return (
    <a
      href={href}
      className="block p-6 rounded-2xl bg-gray-900/40 border border-gray-800 hover:border-purple-500/40 hover:bg-gray-900/60 transition"
    >
      <p className="text-xs uppercase tracking-wide text-gray-500">{type}</p>
      <h3 className="text-lg font-semibold text-white mt-2">{title}</h3>
      <p className="text-sm text-gray-400 mt-2">{description}</p>
    </a>
  );
}
