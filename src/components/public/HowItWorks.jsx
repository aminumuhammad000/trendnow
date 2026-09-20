import React from 'react';
import { Compass, FileSearch, ShieldCheck, Send } from 'lucide-react';
import Container from '../common/Container';

const steps = [
  {
    step: '01',
    name: 'Discover',
    icon: Compass,
    description: 'Detect emerging topics, search spikes, and viral discussions across multiple web platforms in real time.',
  },
  {
    step: '02',
    name: 'Research',
    icon: FileSearch,
    description: 'Investigate the root causes of the trend, gather authoritative sources, and construct an evidence dossier.',
  },
  {
    step: '03',
    name: 'Verify',
    icon: ShieldCheck,
    description: 'Separate confirmed factual information from unverified claims and highlight uncertainties transparently.',
  },
  {
    step: '04',
    name: 'Publish',
    icon: Send,
    description: 'Transform verified findings into structured editorial articles, videos, and multi-platform distribution updates.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 border-b border-neutral-200 bg-neutral-50">
      <Container>
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Pipeline Architecture
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl font-serif">
            How TrendzNow Works
          </h2>
          <p className="mt-3 text-base text-neutral-600">
            From initial conversational spike to verified editorial publication, every story follows a structured pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative rounded-lg border border-neutral-200 bg-white p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-neutral-400 font-mono">
                      {item.step}
                    </span>
                    <div className="rounded-md bg-neutral-100 p-2 text-neutral-800">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">{item.name}</h3>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
