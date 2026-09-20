import React from 'react';
import { FileText } from 'lucide-react';
import Container from '../../components/common/Container';
import PageHeader from '../../components/common/PageHeader';
import EmptyState from '../../components/common/EmptyState';

export default function Articles() {
  return (
    <div>
      <div className="bg-white">
        <Container>
          <PageHeader
            title="Articles"
            description="Generated, drafted, and published articles across distribution channels."
          />
        </Container>
      </div>

      <Container className="mt-8">
        <EmptyState
          icon={FileText}
          title="No articles published yet."
          description="Drafted articles ready for review or distribution will be listed here."
        />
      </Container>
    </div>
  );
}
