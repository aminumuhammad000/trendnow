import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Video, Play, Calendar } from 'lucide-react';
import Container from '../common/Container';
import EmptyState from '../common/EmptyState';
import { getPublishedVideos } from '../../services/videoService';

export default function VideoSection() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadVideos() {
      setLoading(true);
      const { data } = await getPublishedVideos({ limit: 4 });
      if (isMounted) {
        setVideos(data || []);
        setLoading(false);
      }
    }
    loadVideos();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="videos" className="py-16 border-b border-neutral-200 bg-neutral-50">
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Media Briefings
            </span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl font-serif">
              Video Explanations
            </h2>
          </div>
          <span className="text-xs text-neutral-400">Rendered from verified dossiers</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 rounded-lg bg-neutral-200 animate-pulse" />
            ))}
          </div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {videos.map((vid) => (
              <div
                key={vid.id}
                className="group rounded-lg border border-neutral-200 bg-white overflow-hidden shadow-sm hover:border-neutral-300 transition-colors"
              >
                <div className="relative aspect-video bg-neutral-900 flex items-center justify-center text-white">
                  {vid.thumbnail_url ? (
                    <img
                      src={vid.thumbnail_url}
                      alt={vid.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-neutral-400">
                      <Play className="h-8 w-8" />
                    </div>
                  )}
                  {vid.duration_seconds && (
                    <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-mono text-white">
                      {Math.floor(vid.duration_seconds / 60)}:
                      {(vid.duration_seconds % 60).toString().padStart(2, '0')}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-neutral-900 line-clamp-2">
                    <Link to={`/video/${vid.id}`} className="hover:underline">
                      {vid.title}
                    </Link>
                  </h3>
                  {vid.published_at && (
                    <p className="mt-2 text-xs text-neutral-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(vid.published_at).toLocaleDateString()}</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Video}
            title="No published videos yet."
            description="Automated video generation produces visual briefings once articles reach publication status."
            className="py-12 bg-white"
          />
        )}
      </Container>
    </section>
  );
}
