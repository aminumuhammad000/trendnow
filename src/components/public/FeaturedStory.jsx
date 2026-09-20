import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, ArrowRight, Calendar } from 'lucide-react';
import Container from '../common/Container';
import EmptyState from '../common/EmptyState';
import { getFeaturedArticles } from '../../services/articleService';

export default function FeaturedStory() {
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadFeatured() {
      setLoading(true);
      const { data } = await getFeaturedArticles({ limit: 1 });
      if (isMounted) {
        setFeatured(data && data.length > 0 ? data[0] : null);
        setLoading(false);
      }
    }
    loadFeatured() ;
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-12 border-b border-neutral-200 bg-white">
      <Container>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Featured Editorial
          </h2>
          <span className="text-xs text-neutral-400">Curated Story</span>
        </div>

        {loading ? (
          <div className="h-64 rounded-lg bg-neutral-100 animate-pulse" />
        ) : featured ? (
          <article className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-8 sm:p-12 lg:flex lg:gap-12 lg:items-center">
            <div className="lg:max-w-2xl">
              {featured.category && (
                <span className="inline-block rounded bg-neutral-200 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-4">
                  {featured.category}
                </span>
              )}
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 font-serif">
                <Link to={`/article/${featured.slug}`} className="hover:underline">
                  {featured.title}
                </Link>
              </h3>
              {featured.excerpt && (
                <p className="mt-4 text-base text-neutral-600 leading-relaxed">
                  {featured.excerpt}
                </p>
              )}
              <div className="mt-6 flex items-center gap-4 text-xs text-neutral-500">
                {featured.published_at && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                    <time dateTime={featured.published_at}>
                      {new Date(featured.published_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                  </span>
                )}
                <Link
                  to={`/article/${featured.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors"
                >
                  <span>Read full analysis</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
        ) : (
          <EmptyState
            icon={Newspaper}
            title="No featured stories published yet."
            description="Our editorial pipeline publishes in-depth coverage once trend research and factual verification are complete."
            className="py-12"
          />
        )}
      </Container>
    </section>
  );
}
