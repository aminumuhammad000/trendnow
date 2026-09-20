import React from 'react';
import { Search } from 'lucide-react';
import Container from '../../components/common/Container';
import PageHeader from '../../components/common/PageHeader';
import EmptyState from '../../components/common/EmptyState';

export default function Research() {
  return (
    <div>
      <div className="bg-white">
        <Container>
          <PageHeader
            title="Research"
            description="In-depth research dossiers, source verification, and factual claims."
          />
        </Container>
      </div>

      <Container className="mt-8">
        <EmptyState
          icon={Search}
          title="No research dossiers generated yet."
          description="Research begins automatically when a detected trend is accepted for investigation."
        />
      </Container>
    </div>
  );
}
