'use client';

import { TestimonialCard } from '@/components/testimonials';

const testimonials = [
  {
    name: 'Maya P.',
    role: 'NFT Collector',
    quote: 'StakeFlow rewards are clear and consistent. Love the analytics view.',
  },
  {
    name: 'Jon K.',
    role: 'Community Lead',
    quote: 'The batch staking flow saves time and fees. Huge upgrade.',
  },
  {
    name: 'Ada R.',
    role: 'DeFi Enthusiast',
    quote: 'Clean UX and reliable payouts keep me staking long term.',
  },
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Testimonials</h1>
          <p className="text-gray-400 mt-2">What the community is saying.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
}
