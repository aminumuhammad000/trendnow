import React from 'react';
import { ArrowDown, Compass, ShieldCheck } from 'lucide-react';
import Container from '../common/Container';

export default function Hero() {
  return (
    <section className="relative border-b border-neutral-200 bg-white py-16 sm:py-24">
      <Container>
        <div className="max-w-3xl">
          {/* Subtle category badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-600 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" aria-hidden="true" />
            <span>AI-Assisted Trend Intelligence & Editorial Journalism</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl font-serif">
            Know what is trending. Understand why. Read the story.
          </h1>

          <p className="mt-6 text-lg text-neutral-600 leading-relaxed max-w-2xl">
            TrendzNow discovers emerging conversations across the web, researches the factual context behind them, and transforms verified trends into clear, informative stories.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#trending"
              className="inline-flex items-center gap-2 rounded-md bg-neutral-900 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-neutral-800 transition-colors focus-visible:ring-2 focus-visible:ring-neutral-900"
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
              <span>Explore Trending</span>
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors focus-visible:ring-2 focus-visible:ring-neutral-900"
            >
              <span>How It Works</span>
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          {/* Editorial Philosophy Highlights */}
          <div className="mt-12 grid grid-cols-1 gap-4 pt-8 border-t border-neutral-100 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Signal Detection</p>
              <p className="mt-1 text-sm font-medium text-neutral-800">Multi-source topic aggregation</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Verification</p>
              <p className="mt-1 text-sm font-medium text-neutral-800">Evidence-backed claim review</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Editorial</p>
              <p className="mt-1 text-sm font-medium text-neutral-800">Structured stories & videos</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
