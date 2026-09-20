import React from 'react';
import { Newspaper } from 'lucide-react';
import Container from '../../components/common/Container';
import EmptyState from '../../components/common/EmptyState';

export default function Home() {
  return (
    <div className="py-12">
      <Container>
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Emerging Stories & Trends
          </h1>
          <p className="mt-2 text-base text-neutral-600 max-w-2xl">
            Real-time coverage and deep dives generated from emerging signals across the web.
          </p>
        </div>

        <EmptyState
          icon={Newspaper}
          title="No published stories yet."
          description="Stories will appear here once content generation and editorial verification are published."
          className="py-16"
        />
      </Container>
    </div>
  );
}
