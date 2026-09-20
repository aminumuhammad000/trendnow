import React, { useState } from 'react';
import { Tag, ArrowRight } from 'lucide-react';
import Container from '../common/Container';

const CATEGORIES = [
  { name: 'Technology', slug: 'technology', description: 'AI, software, hardware, and digital breakthroughs' },
  { name: 'Business', slug: 'business', description: 'Markets, industry trends, and economic movements' },
  { name: 'Science', slug: 'science', description: 'Discoveries, climate research, and exploration' },
  { name: 'World', slug: 'world', description: 'Global developments and international relations' },
  { name: 'Africa', slug: 'africa', description: 'Continental innovations, enterprise, and affairs' },
  { name: 'Nigeria', slug: 'nigeria', description: 'Regional trends, economy, policy, and society' },
  { name: 'Entertainment', slug: 'entertainment', description: 'Film, music, culture, and digital media' },
  { name: 'Sports', slug: 'sports', description: 'Athletics, tournaments, and performance analytics' },
];

export default function Categories({ onSelectCategory, selectedCategory }) {
  return (
    <section id="categories" className="py-16 border-b border-neutral-200 bg-white">
      <Container>
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Topic Coverage
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-serif">
            Explore by Category
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Trend monitoring tracks conversations across diverse sectors and geographical regions.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 sm:gap-4">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory?.toLowerCase() === cat.slug.toLowerCase();
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => onSelectCategory && onSelectCategory(isSelected ? null : cat.slug)}
                className={`group flex flex-col justify-between rounded-lg border p-4 text-left transition-all ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                    : 'border-neutral-200 bg-white text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold tracking-tight">{cat.name}</span>
                    <Tag
                      className={`h-3.5 w-3.5 ${
                        isSelected ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-700'
                      }`}
                    />
                  </div>
                  <p
                    className={`mt-2 text-xs leading-relaxed ${
                      isSelected ? 'text-neutral-300' : 'text-neutral-500'
                    }`}
                  >
                    {cat.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
