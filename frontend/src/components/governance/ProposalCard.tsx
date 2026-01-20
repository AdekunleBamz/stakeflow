'use client';

interface ProposalCardProps {
  title: string;
  description: string;
  status: 'active' | 'passed' | 'failed' | 'draft';
  votes: string;
  endsIn: string;
}

export function ProposalCard({ title, description, status, votes, endsIn }: ProposalCardProps) {
  const statusStyles = {
    active: 'bg-green-500/20 text-green-300 border-green-500/30',
    passed: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    failed: 'bg-red-500/20 text-red-300 border-red-500/30',
    draft: 'bg-gray-700/30 text-gray-300 border-gray-600/40',
  };

  return (
    <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className={`text-xs px-2.5 py-1 rounded-full border ${statusStyles[status]}`}>
          {status}
        </span>
      </div>
      <p className="text-sm text-gray-400">{description}</p>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">Votes: {votes}</span>
        <span className="text-gray-300">Ends in {endsIn}</span>
      </div>
    </div>
  );
}
