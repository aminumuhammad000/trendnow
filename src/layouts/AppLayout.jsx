import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import Topbar from '../components/navigation/Topbar';
import MobileMenu from '../components/navigation/MobileMenu';

/**
 * AppLayout: Main application layout for internal/authenticated tools.
 * Features a fixed desktop sidebar, responsive topbar, mobile drawer, and main content area.
 */
export default function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-neutral-50 overflow-x-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 z-40">
        <Sidebar />
      </div>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col lg:pl-64 min-w-0">
        <Topbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        <main className="flex-1 pb-16 min-w-0" id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
