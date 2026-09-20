import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Home, LayoutDashboard } from 'lucide-react';
import Container from '../components/common/Container';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center py-16">
      <Container className="max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 mb-6">
          <HelpCircle className="h-8 w-8" aria-hidden="true" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          404 Error
        </span>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            <span>Go to Home</span>
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
            <span>Go to Dashboard</span>
          </Link>
        </div>
      </Container>
    </div>
  );
}
