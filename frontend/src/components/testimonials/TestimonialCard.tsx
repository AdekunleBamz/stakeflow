'use client';

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
}

export function TestimonialCard({ name, role, quote }: TestimonialCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800">
      <p className="text-sm text-gray-300">“{quote}”</p>
      <div className="mt-4">
        <p className="text-white font-semibold">{name}</p>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    </div>
  );
}
