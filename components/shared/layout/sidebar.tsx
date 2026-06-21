'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  PlayCircle,
  User,
  FileText,
  Calendar,
  Wrench,
  Users,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  section?: string;
}

const entrepreneurNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, section: 'Overview' },
  { label: 'Training Library', href: '/training', icon: PlayCircle, section: 'Learn' },
  { label: 'My Profile', href: '/profile', icon: User, section: 'My Work' },
  { label: 'Deliverables', href: '/deliverables', icon: FileText, section: 'My Work' },
  { label: 'Schedule', href: '/schedule', icon: Calendar, section: 'My Work' },
  { label: 'Entrepreneur Tools', href: '/tools', icon: Wrench, section: 'Resources' },
  { label: 'Entrepreneur Tracker', href: '/tracker', icon: Users, section: 'Resources' },
];

interface SidebarProps {
  userType: 'entrepreneur' | 'admin';
  userName: string;
  userRole: string;
  userInitials: string;
}

export function Sidebar({ userType, userName, userRole, userInitials }: SidebarProps) {
  const pathname = usePathname();

  const navItems = entrepreneurNavItems;

  let currentSection = '';

  return (
    <aside className="w-[210px] flex-shrink-0 bg-app-primary border-r border-app-tertiary flex flex-col h-screen">
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
            <div className="text-[14px] font-semibold text-app-primary">BID Hub</div>
            <div className="text-[9px] text-app-tertiary tracking-wide font-mono-bid">Entrepreneur Platform</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-2 py-2.5 flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const showSection = item.section && item.section !== currentSection;
          if (item.section && item.section !== currentSection) {
            currentSection = item.section;
          }
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));

          return (
            <div key={item.href}>
              {showSection && (
                <div className="text-[9px] font-medium text-app-tertiary tracking-wider uppercase px-2 py-2 pt-3">
                  {item.section}
                </div>
              )}
              <Link
                href={item.href}
                className={cn(
                  'nav-item',
                  isActive && 'active'
                )}
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
            {userInitials}
          </div>
          <div>
            <div className="text-[11px] font-medium text-app-primary">{userName}</div>
            <div className="text-[9px] text-app-tertiary">{userRole}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
