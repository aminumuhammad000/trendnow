import React from 'react';

/**
 * Reusable PageHeader component for consistent page titles and hierarchy.
 */
export default function PageHeader({ title, description, action }) {
  return (
    <header className="border-b border-neutral-200 bg-white py-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-neutral-500 max-w-3xl">
              {description}
            </p>
          )}
        </div>
        {action && (
          <div className="mt-4 sm:mt-0 flex items-center gap-3">
            {action}
          </div>
        )}
      </div>
    </header>
  );
}
