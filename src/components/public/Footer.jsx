import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../common/Container';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white py-12 text-sm text-neutral-600">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 font-bold text-neutral-900 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-neutral-900 text-white text-xs font-bold">
                T
              </div>
              <span className="text-lg font-bold tracking-tight">TrendzNow</span>
            </Link>
            <p className="max-w-md text-xs text-neutral-500 leading-relaxed">
              TrendzNow is an AI-powered trend-to-content media platform. We discover what people are currently talking about, research the underlying story, verify information with primary sources, and publish clear, evidence-backed articles and videos.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#trending" className="hover:text-neutral-900 transition-colors">
                  Trending Topics
                </a>
              </li>
              <li>
                <a href="#latest" className="hover:text-neutral-900 transition-colors">
                  Latest Stories
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-neutral-900 transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-neutral-900 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#trust" className="hover:text-neutral-900 transition-colors">
                  Trust & Verification
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/dashboard" className="hover:text-neutral-900 transition-colors">
                  Internal Dashboard
                </Link>
              </li>
              <li>
                <Link to="/supabase-test" className="hover:text-neutral-900 transition-colors">
                  System Diagnostics
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <p>&copy; {new Date().getFullYear()} TrendzNow. All rights reserved.</p>
          <p>Evidence-grounded trend journalism.</p>
        </div>
      </Container>
    </footer>
  );
}
