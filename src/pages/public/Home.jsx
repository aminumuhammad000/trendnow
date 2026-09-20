import React, { useState, useEffect } from 'react';
import { Newspaper, RefreshCw } from 'lucide-react';
import Container from '../../components/common/Container';
import EmptyState from '../../components/common/EmptyState';
import Hero from '../../components/public/Hero';
import TrendingTopics from '../../components/public/TrendingTopics';
import FeaturedStory from '../../components/public/FeaturedStory';
import StoryCard from '../../components/public/StoryCard';
import HowItWorks from '../../components/public/HowItWorks';
import TrustSection from '../../components/public/TrustSection';
import VideoSection from '../../components/public/VideoSection';
import Categories from '../../components/public/Categories';
import { getLatestArticles, getArticlesByCategory } from '../../services/articleService';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadStories() {
      setLoading(true);
      const res = selectedCategory
        ? await getArticlesByCategory(selectedCategory, { limit: 6 })
        : await getLatestArticles({ limit: 6 });

      if (isMounted) {
        setArticles(res.data || []);
        setLoading(false);
      }
    }

    loadStories();
    return () => {
      isMounted = false;
    };
  }, [selectedCategory]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Live Trends Section */}
      <TrendingTopics />

      {/* Featured Story Section */}
      <FeaturedStory />

      {/* Latest Stories Section */}
      <section id="latest" className="py-16 border-b border-neutral-200 bg-white">
        <Container>
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                {selectedCategory ? `Filtered: ${selectedCategory}` : 'Recent Publications'}
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-serif">
                {selectedCategory ? `${selectedCategory.toUpperCase()} Stories` : 'Latest Verified Stories'}
              </h2>
            </div>
            {selectedCategory && (
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className="text-xs font-medium text-neutral-600 hover:text-neutral-900 underline"
              >
                Clear filter (view all)
              </button>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-56 rounded-lg bg-neutral-100 animate-pulse" />
              ))}
            </div>
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <StoryCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Newspaper}
              title={selectedCategory ? `No published stories in ${selectedCategory} yet.` : "No published stories yet."}
              description="Our automated pipeline investigates emerging trends before publishing verified articles. Once stories are published, they will appear here."
              className="py-12"
            />
          )}
        </Container>
      </section>

      {/* How TrendzNow Works */}
      <HowItWorks />

      {/* Trust & Verification Section */}
      <TrustSection />

      {/* Video Section */}
      <VideoSection />

      {/* Categories Section */}
      <Categories
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />
    </div>
  );
}
