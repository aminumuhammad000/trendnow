import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';

/**
 * PublicLayout: Clean layout for public-facing readers and viewers.
 * Kept completely decoupled from the internal AppLayout.
 */
export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white overflow-x-hidden">
      {/* Public Header / Navigation */}
      <Navbar />

      {/* Public Page Content */}
      <main className="flex-1" id="public-main-content">
        <Outlet />
      </main>

      {/* Public Footer */}
      <Footer />
    </div>
  );
}
