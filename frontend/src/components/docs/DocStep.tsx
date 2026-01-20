'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

interface DocStepProps {
  title: string;
  description: string;
  bullets: string[];
}

export function DocStep({ title, description, bullets }: DocStepProps) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400 mb-4">{description}</p>
        <ul className="list-disc list-inside text-gray-400 space-y-2">
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
