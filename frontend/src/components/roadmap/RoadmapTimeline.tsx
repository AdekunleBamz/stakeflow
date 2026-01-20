'use client';

interface RoadmapItem {
  quarter: string;
  title: string;
  description: string;
  status: 'done' | 'in-progress' | 'planned';
}

const statusStyles = {
  done: 'bg-green-500/20 text-green-300 border-green-500/30',
  'in-progress': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  planned: 'bg-gray-700/30 text-gray-300 border-gray-600/40',
};

export function RoadmapTimeline({ items }: { items: RoadmapItem[] }) {
  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <div key={item.title} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-purple-400" />
            {index !== items.length - 1 && <div className="flex-1 w-px bg-gray-800 mt-2" />}
          </div>
          <div className="flex-1 p-5 rounded-2xl bg-gray-900/40 border border-gray-800">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wide text-gray-500">{item.quarter}</p>
              <span className={`text-xs px-2.5 py-1 rounded-full border ${statusStyles[item.status]}`}>
                {item.status.replace('-', ' ')}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white mt-2">{item.title}</h3>
            <p className="text-sm text-gray-400 mt-2">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
