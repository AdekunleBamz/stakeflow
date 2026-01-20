'use client';

interface EventCardProps {
  title: string;
  date: string;
  location: string;
}

export function EventCard({ title, date, location }: EventCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-400 mt-2">{date}</p>
      <p className="text-sm text-gray-500 mt-2">{location}</p>
    </div>
  );
}
