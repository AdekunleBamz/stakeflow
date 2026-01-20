'use client';

interface SecurityBadgeProps {
  title: string;
  description: string;
  status: 'verified' | 'in-review' | 'planned';
}

export function SecurityBadge({ title, description, status }: SecurityBadgeProps) {
  const statusStyles = {
    verified: 'bg-green-500/20 text-green-300 border-green-500/30',
    'in-review': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    planned: 'bg-gray-700/30 text-gray-300 border-gray-600/40',
  };

  return (
    <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className={`text-xs px-2.5 py-1 rounded-full border ${statusStyles[status]}`}>
          {status.replace('-', ' ')}
        </span>
      </div>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}
