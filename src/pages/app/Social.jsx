import React from 'react';
import { Share2 } from 'lucide-react';
import Container from '../../components/common/Container';
import PageHeader from '../../components/common/PageHeader';
import EmptyState from '../../components/common/EmptyState';

export default function Social() {
  return (
    <div>
      <div className="bg-white">
        <Container>
          <PageHeader
            title="Social"
            description="Cross-platform social distribution channels, post schedules, and delivery logs."
          />
        </Container>
      </div>

      <Container className="mt-8">
        <EmptyState
          icon={Share2}
          title="No social posts scheduled yet."
          description="Cross-platform social updates will be managed and monitored here."
        />
      </Container>
    </div>
  );
}
