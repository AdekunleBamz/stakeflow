'use client';

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
}

export function PricingCard({ title, price, description, features }: PricingCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-3xl font-semibold text-purple-400 mt-2">{price}</p>
        <p className="text-sm text-gray-400 mt-2">{description}</p>
      </div>
      <ul className="space-y-2 text-sm text-gray-400">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
