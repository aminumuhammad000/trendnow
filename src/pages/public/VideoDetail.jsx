import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { VideoOff, ArrowLeft, Calendar, Play } from 'lucide-react';
import Container from '../../components/common/Container';
import EmptyState from '../../components/common/EmptyState';
import { getPublishedVideoById } from '../../services/videoService';

export default function VideoDetail() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadVideo() {
      setLoading(true);
      const { data } = await getPublishedVideoById(id);
      if (isMounted) {
        setVideo(data);
        setLoading(false);
      }
    }
    loadVideo();
    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div className="py-12">
      <Container className="max-w-4xl">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to stories</span>
          </Link>
        </div>

        {loading ? (
          <div className="space-y-4 py-8">
            <div className="aspect-video bg-neutral-100 rounded-lg animate-pulse" />
            <div className="h-8 w-1/2 bg-neutral-100 rounded animate-pulse" />
          </div>
        ) : video ? (
          <div>
            <div className="relative aspect-video rounded-xl bg-black overflow-hidden shadow-sm flex items-center justify-center text-white mb-6">
              {video.video_url ? (
                <video
                  src={video.video_url}
                  poster={video.thumbnail_url}
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-neutral-400">
                  <Play className="h-12 w-12" />
                  <span className="text-sm">Video player placeholder</span>
                </div>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-serif">
              {video.title}
            </h1>

            {video.published_at && (
              <p className="mt-2 text-xs text-neutral-500 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={video.published_at}>
                  {new Date(video.published_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
              </p>
            )}

            {video.description && (
              <p className="mt-4 text-base text-neutral-600 leading-relaxed">
                {video.description}
              </p>
            )}
          </div>
        ) : (
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
        )}
      </Container>
    </div>
  );
}
