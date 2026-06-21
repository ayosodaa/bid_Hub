'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  UserCog,
  FolderKanban,
  ArrowRightLeft,
  PlayCircle,
  FileText,
  BarChart3,
  Search,
  Download,
  Settings,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  section?: string;
}

const adminNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, section: 'Overview' },
  { label: 'Entrepreneurs', href: '/admin/entrepreneurs', icon: Users, section: 'People' },
  { label: 'Trainers', href: '/admin/trainers', icon: UserCog, section: 'People' },
  { label: 'Programs', href: '/admin/programs', icon: FolderKanban, section: 'Programs' },
  { label: 'Assignments', href: '/admin/assignments', icon: ArrowRightLeft, section: 'Programs' },
  { label: 'Content Library', href: '/admin/content', icon: PlayCircle, section: 'Content' },
  { label: 'Stages & Sectors', href: '/admin/settings', icon: Settings, section: 'Settings' },
  { label: 'Generate Docs', href: '/admin/documents', icon: FileText, section: 'Documents' },
  { label: 'Reporting', href: '/admin/reporting', icon: BarChart3, section: 'Analytics' },
];

const pageTitles: Record<string, string> = {
  '/admin': 'Admin Dashboard',
  '/admin/entrepreneurs': 'Entrepreneurs',
  '/admin/trainers': 'Trainers',
  '/admin/programs': 'Programs',
  '/admin/assignments': 'Assignments',
  '/admin/content': 'Content Library',
  '/admin/settings': 'Stages & Sectors',
  '/admin/documents': 'Generate Documents',
  '/admin/reporting': 'Reporting & Analytics',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  let currentSection = '';

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Admin Sidebar */}
      <aside className="w-[226px] flex-shrink-0 bg-app-primary border-r border-app-tertiary flex flex-col h-screen">
        {/* Logo */}
        <div className="px-4 py-4 border-b border-app-tertiary">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-bid rounded-lg flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 14L9 4L15 14" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="4" r="1.8" fill="#fff"/>
              </svg>
            </div>
            <div>
              <div className="text-[14px] font-semibold text-app-primary">BID Admin</div>
              <div className="text-[9px] text-app-tertiary font-mono-bid">Management Console</div>
              <span className="inline-block bg-bid text-white text-[9px] px-2 py-0.5 rounded-full font-medium mt-1">
                Admin
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-2 py-2.5 flex-1 overflow-y-auto">
          {adminNavItems.map((item) => {
            const showSection = item.section && item.section !== currentSection;
            if (item.section) {
              currentSection = item.section;
            }
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            return (
              <div key={item.href}>
                {showSection && (
                  <div className="text-[9px] font-medium text-app-tertiary tracking-wider uppercase px-2 py-2 pt-3">
                    {item.section}
                  </div>
                )}
                <Link
                  href={item.href}
                  className={cn('nav-item', isActive && 'active')}
                >
                  <item.icon className="w-3.5 h-3.5 flex-shrink-0" />
                  {item.label}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="px-3.5 py-3 border-t border-app-tertiary">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-bid text-white flex items-center justify-center text-[10px] font-semibold flex-shrink-0">
              AD
            </div>
            <div>
              <div className="text-[11px] font-medium text-app-primary">Ama Darko</div>
              <div className="text-[9px] text-app-tertiary">Programme Lead</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        {/* Topbar */}
        <div className="bg-app-primary border-b border-app-tertiary px-5 h-[50px] flex items-center gap-3 flex-shrink-0">
          <div className="text-[13px] font-medium flex-1 text-app-primary">
            {pageTitles[pathname] || 'Admin Dashboard'}
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 bg-app-secondary border border-app-tertiary rounded-lg px-2.5 py-1.5 w-[180px]">
            <Search className="w-3 h-3 text-app-tertiary" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-[11px] w-full text-app-primary placeholder:text-app-tertiary"
            />
          </div>

          {/* Page-specific actions rendered by children */}
        </div>

        {/* Page Content */}
        <main className="p-5 flex-1 overflow-y-auto bg-background-secondary">
          {children}
        </main>
      </div>
    </div>
  );
}
