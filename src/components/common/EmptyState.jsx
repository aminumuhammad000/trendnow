import React from 'react';

/**
 * Reusable EmptyState component for honest empty states across the application.
 */
export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = '',
}) {
  return (
    <div
      role="region"
      aria-label={title}
      className={`flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-white p-8 text-center sm:p-12 ${className}`}
    >
      {Icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 mb-4">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
      )}
      <h3 className="text-base font-medium text-neutral-900">
        {title}
      </h3>
      {description && (
        <p className="mt-1.5 text-sm text-neutral-500 max-w-sm">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
