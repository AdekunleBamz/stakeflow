'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{question}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400">{answer}</p>
      </CardContent>
    </Card>
  );
}
