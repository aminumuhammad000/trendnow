import React from 'react';
import { BarChart3 } from 'lucide-react';
import Container from '../../components/common/Container';
import PageHeader from '../../components/common/PageHeader';
import EmptyState from '../../components/common/EmptyState';

export default function Analytics() {
  return (
    <div>
      <div className="bg-white">
        <Container>
          <PageHeader
            title="Analytics"
            description="Performance metrics, audience engagement, and trend selection feedback loops."
          />
        </Container>
      </div>

      <Container className="mt-8">
        <EmptyState
          icon={BarChart3}
          title="No analytics data recorded yet."
          description="Performance metrics and trend feedback data will populate after content is published."
        />
      </Container>
    </div>
  );
}
