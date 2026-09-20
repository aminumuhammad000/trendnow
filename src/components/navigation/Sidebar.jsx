import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { APP_NAV_ITEMS } from './navItems';

/**
 * Reusable desktop Sidebar component.
 */
export default function Sidebar({ className = '' }) {
  return (
    <aside
      aria-label="Sidebar Navigation"
      className={`flex h-full w-64 flex-col border-r border-neutral-200 bg-white ${className}`}
    >
      {/* Brand / Logo */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-neutral-200 px-6">
        <Link
          to="/dashboard"
          className="flex items-center gap-2.5 font-semibold text-neutral-900 focus-visible:rounded"
          aria-label="TrendzNow Dashboard Home"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white text-sm font-bold">
            T
          </div>
          <span className="text-lg tracking-tight">TrendzNow</span>
        </Link>
        <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase text-neutral-500">
          Admin
        </span>
      </div>

      {/* Navigation List */}
      <nav aria-label="Main" className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {APP_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-neutral-900 text-white'
                        : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`h-4 w-4 shrink-0 transition-colors ${
                          isActive ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-700'
                        }`}
                        aria-hidden="true"
                      />
                      <span>{item.name}</span>
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer / Public site link */}
      <div className="border-t border-neutral-200 p-4">
        <Link
          to="/"
          className="flex items-center justify-between rounded-md px-3 py-2 text-xs font-medium text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>View Public Site</span>
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
