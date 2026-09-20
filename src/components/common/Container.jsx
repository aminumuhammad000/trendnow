import React from 'react';

/**
 * Reusable Container component for consistent horizontal padding and max-widths.
 */
export default function Container({ children, className = '', fluid = false }) {
  return (
    <div
      className={`w-full px-4 sm:px-6 lg:px-8 mx-auto ${
        fluid ? 'max-w-full' : 'max-w-7xl'
      } ${className}`}
    >
      {children}
    </div>
  );
}
