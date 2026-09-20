import React from 'react';
import { TrendingUp } from 'lucide-react';
import Container from '../../components/common/Container';
import PageHeader from '../../components/common/PageHeader';
import EmptyState from '../../components/common/EmptyState';

export default function Trends() {
  return (
    <div>
      <div className="bg-white">
        <Container>
          <PageHeader
            title="Trends"
            description="Real-time trend signals detected across monitored platforms and social feeds."
          />
        </Container>
      </div>

      <Container className="mt-8">
        <EmptyState
          icon={TrendingUp}
          title="No trends detected yet."
          description="Automated trend monitoring has not identified new signals in the current cycle."
        />
      </Container>
    </div>
  );
}
