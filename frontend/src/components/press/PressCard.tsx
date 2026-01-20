'use client';

interface PressCardProps {
  outlet: string;
  title: string;
  date: string;
  href: string;
}

export function PressCard({ outlet, title, date, href }: PressCardProps) {
  return (
    <a
      href={href}
      className="block p-6 rounded-2xl bg-gray-900/40 border border-gray-800 hover:border-purple-500/40 hover:bg-gray-900/60 transition"
    >
      <p className="text-xs uppercase tracking-wide text-gray-500">{outlet}</p>
      <h3 className="text-lg font-semibold text-white mt-2">{title}</h3>
      <p className="text-sm text-gray-400 mt-2">{date}</p>
    </a>
  );
}
