import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import Container from '../../components/common/Container';
import PageHeader from '../../components/common/PageHeader';
import EmptyState from '../../components/common/EmptyState';

export default function Settings() {
  return (
    <div>
      <div className="bg-white">
        <Container>
          <PageHeader
            title="Settings"
            description="Platform configuration, API keys, and pipeline automation preferences."
          />
        </Container>
      </div>

      <Container className="mt-8">
        <EmptyState
          icon={SettingsIcon}
          title="Configuration options will be available here."
          description="System settings, automation thresholds, and external API configurations will be managed from this screen."
        />
      </Container>
    </div>
  );
}
