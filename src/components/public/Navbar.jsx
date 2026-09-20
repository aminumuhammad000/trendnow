import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, LayoutDashboard } from 'lucide-react';
import Container from '../common/Container';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { name: 'Trending', href: '#trending' },
    { name: 'Latest', href: '#latest' },
    { name: 'Categories', href: '#categories' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Trust & Verification', href: '#trust' },
  ];

  return (
    <nav
      aria-label="Public Site Navigation"
      className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur"
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 font-bold text-neutral-900 focus-visible:rounded"
            aria-label="TrendzNow Homepage"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white text-sm font-bold tracking-tight">
              T
            </div>
            <span className="text-xl font-bold tracking-tight">TrendzNow</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Actions: Search & Console */}
          <div className="flex items-center gap-3">
            {/* Search Toggle */}
            <div className="relative">
              {searchOpen ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchQuery.trim()) {
                      // Handled gracefully without fake navigation
                    }
                  }}
                  className="flex items-center"
                >
                  <label htmlFor="public-search" className="sr-only">
                    Search stories and trends
                  </label>
                  <input
                    id="public-search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search topics..."
                    autoFocus
                    className="w-40 sm:w-56 rounded-md border border-neutral-300 py-1.5 pl-3 pr-8 text-xs text-neutral-900 placeholder-neutral-400 focus:border-neutral-900 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="absolute right-2 text-neutral-400 hover:text-neutral-700"
                    aria-label="Close search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="rounded-md p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-900"
                  aria-label="Open search input"
                >
                  <Search className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Console Link */}
            <Link
              to="/dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-neutral-800 transition-colors focus-visible:ring-2 focus-visible:ring-neutral-900"
            >
              <LayoutDashboard className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Console</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-md p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-900 md:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="border-t border-neutral-200 py-4 md:hidden">
            <div className="flex flex-col space-y-3 px-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 border-t border-neutral-100">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Internal Console</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}
