import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import AppLayout from './layouts/AppLayout';
import PublicLayout from './layouts/PublicLayout';

// Public Pages
import Home from './pages/public/Home';
import ArticleDetail from './pages/public/ArticleDetail';
import VideoDetail from './pages/public/VideoDetail';

// App Pages
import Dashboard from './pages/app/Dashboard';
import Trends from './pages/app/Trends';
import Research from './pages/app/Research';
import Articles from './pages/app/Articles';
import Videos from './pages/app/Videos';
import Social from './pages/app/Social';
import Analytics from './pages/app/Analytics';
import Settings from './pages/app/Settings';

// Fallback Page
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/article/:slug" element={<ArticleDetail />} />
        <Route path="/video/:id" element={<VideoDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Internal Application Routes */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trends" element={<Trends />} />
        <Route path="/research" element={<Research />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/social" element={<Social />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
