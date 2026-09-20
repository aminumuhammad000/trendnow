import React from 'react';
import { ShieldCheck, BookOpen, Clock, AlertCircle } from 'lucide-react';
import Container from '../common/Container';

const trustPrinciples = [
  {
    title: 'Source Attribution',
    icon: BookOpen,
    description:
      'Every fact, quote, and statistic links directly to primary sources and reputable publications. We do not present unverified assertions as fact.',
  },
  {
    title: 'Evidence-Based Verification',
    icon: ShieldCheck,
    description:
      'AI models accelerate discovery and document synthesis, but every claim is cross-checked against independent source records before publication.',
  },
  {
    title: 'Transparent Uncertainty',
    icon: AlertCircle,
    description:
      'When facts remain unconfirmed or conflicting accounts exist, we explicitly state the uncertainty rather than fabricating conclusions.',
  },
  {
    title: 'Timestamped Revisions',
    icon: Clock,
    description:
      'Fast-moving stories evolve. Every story displays clear publication and revision timestamps to ensure reader transparency.',
  },
];

export default function TrustSection() {
  return (
    <section id="trust" className="py-16 border-b border-neutral-200 bg-white">
      <Container>
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Editorial Integrity
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl font-serif">
            Built on Evidence, Not Assumptions
          </h2>
          <p className="mt-3 text-base text-neutral-600">
            AI assists our research and production pipeline, but truth is grounded in verifiable evidence. Here is how we maintain trust with every story.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {trustPrinciples.map((principle) => {
            const Icon = principle.icon;
            return (
              <div
                key={principle.title}
                className="rounded-lg border border-neutral-200 bg-neutral-50/50 p-6"
              >
                <div className="rounded-md bg-white border border-neutral-200 p-2.5 w-fit text-neutral-800 mb-4 shadow-2xs">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold text-neutral-900">{principle.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
