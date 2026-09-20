import {
  LayoutDashboard,
  TrendingUp,
  Search,
  FileText,
  Video,
  Share2,
  BarChart3,
  Settings,
} from 'lucide-react';

export const APP_NAV_ITEMS = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Trends',
    path: '/trends',
    icon: TrendingUp,
  },
  {
    name: 'Research',
    path: '/research',
    icon: Search,
  },
  {
    name: 'Articles',
    path: '/articles',
    icon: FileText,
  },
  {
    name: 'Videos',
    path: '/videos',
    icon: Video,
  },
  {
    name: 'Social',
    path: '/social',
    icon: Share2,
  },
  {
    name: 'Analytics',
    path: '/analytics',
    icon: BarChart3,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: Settings,
  },
];
