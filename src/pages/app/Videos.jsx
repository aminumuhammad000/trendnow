import React from 'react';
import { Video } from 'lucide-react';
import Container from '../../components/common/Container';
import PageHeader from '../../components/common/PageHeader';
import EmptyState from '../../components/common/EmptyState';

export default function Videos() {
  return (
    <div>
      <div className="bg-white">
        <Container>
          <PageHeader
            title="Videos"
            description="Video scripts, rendered media assets, and published video content."
          />
        </Container>
      </div>

      <Container className="mt-8">
        <EmptyState
          icon={Video}
          title="No videos created yet."
          description="Generated video content and automated render jobs will appear here."
        />
      </Container>
    </div>
  );
}
