import React from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { LayoutDashboard, Compass } from 'lucide-react';
import Container from '../components/common/Container';

/**
 * PublicLayout: Clean layout for public-facing readers and viewers.
 * Kept completely decoupled from the internal AppLayout.
 */
export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white overflow-x-hidden">
      {/* Public Header */}
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <Container>
          <div className="flex h-16 items-center justify-between">
            {/* Brand */}
            <Link
              to="/"
              className="flex items-center gap-2.5 font-semibold text-neutral-900 focus-visible:rounded"
              aria-label="TrendzNow Public Home"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white text-sm font-bold">
                T
              </div>
              <span className="text-xl tracking-tight font-bold">TrendzNow</span>
            </Link>

            {/* Public Navigation & Portal Link */}
            <nav aria-label="Public Navigation" className="flex items-center gap-4 sm:gap-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'
                  }`
                }
              >
                Discover
              </NavLink>

              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-neutral-800 transition-colors focus-visible:ring-2 focus-visible:ring-neutral-900"
              >
                <LayoutDashboard className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Console</span>
              </Link>
            </nav>
          </div>
        </Container>
      </header>

      {/* Public Page Content */}
      <main className="flex-1" id="public-main-content">
        <Outlet />
      </main>

      {/* Public Footer */}
      <footer className="border-t border-neutral-200 bg-neutral-50 py-8 text-xs text-neutral-500">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded bg-neutral-900 text-white text-[10px] font-bold">
                T
              </div>
              <span className="font-semibold text-neutral-800">TrendzNow</span>
              <span>— AI-Powered Trend-to-Content Media Platform</span>
            </div>
            <div>
              <p>&copy; {new Date().getFullYear()} TrendzNow. All rights reserved.</p>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
