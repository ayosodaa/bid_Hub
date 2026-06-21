'use client';

import { Search, Bell, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TopbarProps {
  title: string;
  showBookMeeting?: boolean;
  notificationCount?: number;
  onBookMeeting?: () => void;
}

export function Topbar({ title, showBookMeeting = true, notificationCount = 0, onBookMeeting }: TopbarProps) {
  return (
    <div className="bg-app-primary border-b border-app-tertiary px-5 h-[50px] flex items-center gap-3 flex-shrink-0">
      <div className="text-[13px] font-medium flex-1 text-app-primary">{title}</div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-app-secondary border border-app-tertiary rounded-lg px-2.5 py-1.5 w-[180px]">
        <Search className="w-3 h-3 text-app-tertiary" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent border-none outline-none text-[11px] w-full text-app-primary placeholder:text-app-tertiary"
        />
      </div>

      {/* Notifications */}
      <Button
        variant="outline"
        size="sm"
        className={cn(
          'h-7 px-3 text-[11px] gap-1.5 border border-app-tertiary bg-transparent',
          notificationCount > 0 && 'text-app-primary'
        )}
      >
        <Bell className="w-3 h-3" />
        {notificationCount > 0 && notificationCount}
      </Button>

      {/* Book Meeting */}
      {showBookMeeting && (
        <Button
          size="sm"
          className="h-7 px-3 text-[11px] bg-bid hover:bg-bid-dark text-white"
          onClick={onBookMeeting}
        >
          <Plus className="w-3 h-3 mr-0.5" />
          Book Meeting
        </Button>
      )}
    </div>
  );
}
