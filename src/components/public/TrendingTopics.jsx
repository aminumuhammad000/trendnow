import React, { useState, useEffect } from 'react';
import { TrendingUp, RefreshCw, Hash } from 'lucide-react';
import Container from '../common/Container';
import EmptyState from '../common/EmptyState';
import { getRecentTrends } from '../../services/trendService';

export default function TrendingTopics() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadTrends() {
      setLoading(true);
      const { data } = await getRecentTrends({ limit: 8 });
      if (isMounted) {
        setTrends(data || []);
        setLoading(false);
      }
    }
    loadTrends();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="trending" className="border-b border-neutral-200 bg-neutral-50 py-12">
      <Container>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-neutral-800" aria-hidden="true" />
            <h2 className="text-xl font-bold tracking-tight text-neutral-900">
              Trending Topics
            </h2>
          </div>
          <span className="text-xs text-neutral-500">Live monitoring cycle</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-10 text-neutral-400">
            <RefreshCw className="h-5 w-5 animate-spin mr-2" />
            <span className="text-sm">Checking trend signals...</span>
          </div>
        ) : trends.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trends.map((trend) => (
              <div
                key={trend.id}
                className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm"
              >
                <div className="rounded-md bg-neutral-100 p-2 text-neutral-600">
                  <Hash className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900">{trend.topic}</h3>
                  {trend.category && (
                    <span className="mt-1 inline-block text-xs font-medium text-neutral-500">
                      {trend.category}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={TrendingUp}
            title="No trends detected yet."
            description="Automated signal collection is running. Emerging topics will be populated here once detected and validated."
            className="py-12 bg-white"
          />
        )}
      </Container>
    </section>
  );
}
