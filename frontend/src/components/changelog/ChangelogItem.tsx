'use client';

interface ChangelogItemProps {
  version: string;
  date: string;
  changes: string[];
}

export function ChangelogItem({ version, date, changes }: ChangelogItemProps) {
  return (
    <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{version}</h3>
        <span className="text-xs text-gray-500">{date}</span>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-gray-400">
        {changes.map((change) => (
          <li key={change} className="flex items-start gap-2">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span>{change}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
