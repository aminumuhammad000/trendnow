import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft, Calendar, Tag } from 'lucide-react';
import Container from '../../components/common/Container';
import EmptyState from '../../components/common/EmptyState';
import { getPublishedArticleBySlug } from '../../services/articleService';

export default function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadArticle() {
      setLoading(true);
      const { data } = await getPublishedArticleBySlug(slug);
      if (isMounted) {
        setArticle(data);
        setLoading(false);
      }
    }
    loadArticle();
    return () => {
      isMounted = false;
    };
  }, [slug]);

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
            <div className="h-8 w-1/3 bg-neutral-100 rounded animate-pulse" />
            <div className="h-12 w-3/4 bg-neutral-100 rounded animate-pulse" />
            <div className="h-48 w-full bg-neutral-100 rounded animate-pulse" />
          </div>
        ) : article ? (
          <article className="prose prose-neutral max-w-none">
            {article.category && (
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                {article.category}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 font-serif">
              {article.title}
            </h1>
            {article.published_at && (
              <p className="text-xs text-neutral-500 mt-2 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={article.published_at}>
                  {new Date(article.published_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
              </p>
            )}
            {article.excerpt && (
              <p className="mt-4 text-lg text-neutral-600 leading-relaxed font-serif italic border-l-2 border-neutral-300 pl-4">
                {article.excerpt}
              </p>
            )}
            <div className="mt-8 text-base text-neutral-800 leading-relaxed whitespace-pre-line">
              {article.content}
            </div>
          </article>
        ) : (
          <EmptyState
            icon={FileQuestion}
            title="Article not found or not yet published."
            description={`No published article exists matching "${slug}". Articles must be fully verified and published before public availability.`}
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
