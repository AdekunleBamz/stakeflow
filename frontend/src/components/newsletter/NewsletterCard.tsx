'use client';

interface NewsletterCardProps {
  title: string;
  description: string;
  buttonLabel: string;
}

export function NewsletterCard({ title, description, buttonLabel }: NewsletterCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-400 mt-2">{description}</p>
      </div>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="you@example.com"
          className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm"
        />
        <button className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-sm">
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
