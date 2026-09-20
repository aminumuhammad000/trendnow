import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';

export default function StoryCard({ article }) {
  if (!article) return null;

  const formattedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <article className="group flex flex-col justify-between rounded-lg border border-neutral-200 bg-white p-6 shadow-sm hover:border-neutral-300 transition-colors">
      <div>
        {article.category && (
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
            {article.category}
          </span>
        )}
        <h3 className="text-lg font-bold tracking-tight text-neutral-900 group-hover:text-neutral-700 transition-colors">
          <Link to={`/article/${article.slug}`}>
            {article.title}
          </Link>
        </h3>
        {article.excerpt && (
          <p className="mt-2 text-sm text-neutral-600 line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4 text-xs text-neutral-500">
        {formattedDate && (
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            <time dateTime={article.published_at}>{formattedDate}</time>
          </span>
        )}
        <Link
          to={`/article/${article.slug}`}
          className="inline-flex items-center gap-1 font-medium text-neutral-900 hover:underline"
          aria-label={`Read story: ${article.title}`}
        >
          <span>Read story</span>
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
