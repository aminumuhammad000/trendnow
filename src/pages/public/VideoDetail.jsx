import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { VideoOff, ArrowLeft } from 'lucide-react';
import Container from '../../components/common/Container';
import EmptyState from '../../components/common/EmptyState';

export default function VideoDetail() {
  const { id } = useParams();

  return (
    <div className="py-12">
      <Container>
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to stories</span>
          </Link>
        </div>

        <EmptyState
          icon={VideoOff}
          title="Video not found or not yet published."
          description={`No published video exists with ID "${id}". Video content must be rendered and published before being accessible.`}
          action={
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
            >
              Explore all stories
            </Link>
          }
          className="py-16"
        />
      </Container>
    </div>
  );
}
