import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Bell, User } from 'lucide-react';
import { APP_NAV_ITEMS } from './navItems';

/**
 * Topbar component for page context, notifications placeholder, and user controls.
 */
export default function Topbar({ onOpenMobileMenu }) {
  const location = useLocation();

  // Determine current page context title
  const currentItem = APP_NAV_ITEMS.find((item) => item.path === location.pathname);
  const pageTitle = currentItem ? currentItem.name : 'Application';

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-neutral-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      {/* Left side: Mobile menu toggle & page context */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="rounded-md p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-900 lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Current Page Context */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-neutral-400 hidden sm:inline">
            TrendzNow
          </span>
          <span className="text-neutral-300 hidden sm:inline" aria-hidden="true">
            /
          </span>
          <span className="text-sm font-semibold text-neutral-900">
            {pageTitle}
          </span>
        </div>
      </div>

      {/* Right side: Action placeholders */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notifications placeholder */}
        <button
          type="button"
          className="relative rounded-full p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-900"
          aria-label="Notifications (No new notifications)"
          title="Notifications"
        >
          <Bell className="h-5 w-5" aria-hidden="true" />
          <span
            className="absolute top-2 right-2 h-2 w-2 rounded-full bg-neutral-300"
            aria-hidden="true"
          />
        </button>

        <div className="h-5 w-px bg-neutral-200" aria-hidden="true" />

        {/* User / Account Controls placeholder */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-full p-1 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-neutral-900"
          aria-label="User profile settings"
          title="Account Controls"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-neutral-700 font-medium text-xs">
            <User className="h-4 w-4" aria-hidden="true" />
          </div>
          <span className="hidden md:inline-block pr-1 text-xs text-neutral-600">
            Account
          </span>
        </button>
      </div>
    </header>
  );
}
