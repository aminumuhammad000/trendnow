import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import Container from '../../components/common/Container';
import PageHeader from '../../components/common/PageHeader';
import EmptyState from '../../components/common/EmptyState';

export default function Dashboard() {
  return (
    <div>
      <div className="bg-white">
        <Container>
          <PageHeader
            title="Dashboard"
            description="Overview of trend detection, research verification, and content publishing pipeline."
          />
        </Container>
      </div>

      <Container className="mt-8">
        <EmptyState
          icon={LayoutDashboard}
          title="No active pipeline data"
          description="Trending topics, research tasks, and content generation jobs will appear here once monitoring begins."
        />
      </Container>
    </div>
  );
}
