'use client';

interface SupportCardProps {
  title: string;
  description: string;
  cta: string;
  href: string;
}

export function SupportCard({ title, description, cta, href }: SupportCardProps) {
  return (
    <a
      href={href}
      className="block p-6 rounded-2xl bg-gray-900/40 border border-gray-800 hover:border-purple-500/40 hover:bg-gray-900/60 transition"
    >
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-400 mt-2">{description}</p>
      <p className="text-sm text-purple-400 mt-4">{cta} →</p>
    </a>
  );
}
