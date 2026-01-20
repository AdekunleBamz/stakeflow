'use client';

interface IntegrationCardProps {
  name: string;
  description: string;
  status: 'active' | 'beta' | 'planned';
}

export function IntegrationCard({ name, description, status }: IntegrationCardProps) {
  const statusStyles = {
    active: 'bg-green-500/20 text-green-300 border-green-500/30',
    beta: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    planned: 'bg-gray-700/30 text-gray-300 border-gray-600/40',
  };

  return (
    <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <span className={`text-xs px-2.5 py-1 rounded-full border ${statusStyles[status]}`}>
          {status}
        </span>
      </div>
      <p className="text-sm text-gray-400 mt-2">{description}</p>
    </div>
  );
}
