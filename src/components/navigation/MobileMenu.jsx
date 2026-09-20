import React, { useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X, ExternalLink } from 'lucide-react';
import { APP_NAV_ITEMS } from './navItems';

/**
 * Accessible MobileMenu drawer for tablet/mobile viewports.
 */
export default function MobileMenu({ isOpen, onClose }) {
  const closeButtonRef = useRef(null);

  // Close on Escape key press and manage focus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      // Auto focus the close button for accessibility
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 flex w-full max-w-xs flex-col bg-white shadow-xl">
        {/* Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-neutral-200 px-6">
          <Link
            to="/dashboard"
            onClick={onClose}
            className="flex items-center gap-2.5 font-semibold text-neutral-900"
            aria-label="TrendzNow Dashboard"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white text-sm font-bold">
              T
            </div>
            <span className="text-lg tracking-tight">TrendzNow</span>
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-900"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Navigation links */}
        <nav aria-label="Mobile Main" className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {APP_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-md px-3 py-2.5 text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-neutral-900 text-white'
                          : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          className={`h-5 w-5 shrink-0 transition-colors ${
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

        {/* Footer */}
        <div className="border-t border-neutral-200 p-4">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
