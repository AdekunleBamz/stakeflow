'use client';

interface StatusPillProps {
  label: string;
  status: 'success' | 'warning' | 'danger' | 'info';
}

export function StatusPill({ label, status }: StatusPillProps) {
  const styles = {
    success: 'bg-green-500/20 text-green-300 border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    danger: 'bg-red-500/20 text-red-300 border-red-500/30',
    info: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs border ${styles[status]}`}>
      {label}
    </span>
  );
}
