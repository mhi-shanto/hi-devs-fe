'use client';

import { useNotificationStore } from '@/store/notification.store';
import { Bell, CheckCheck } from 'lucide-react';

const NotificationHeader = () => {
  const { notifications, unreadCount, markAllAsRead } = useNotificationStore();

  const unreadLabel =
    unreadCount === 0
      ? 'No unread notifications'
      : `${unreadCount} unread notification${unreadCount === 1 ? '' : 's'}`;

  return (
    <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex gap-4 sm:gap-5">
        <div className="gradient-primary shadow-glow flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
          <Bell
            className="text-primary-foreground h-6 w-6"
            strokeWidth={2}
            aria-hidden
          />
        </div>
        <div className="min-w-0">
          <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
            Activity
          </p>
          <h1 className="text-foreground mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Notifications
          </h1>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            {unreadLabel}
          </p>
        </div>
      </div>

      {notifications.length > 0 && (
        <button
          type="button"
          onClick={markAllAsRead}
          className="border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground flex shrink-0 items-center gap-2 self-start rounded-full border px-4 py-2 text-sm font-medium transition-colors active:scale-[0.98]"
        >
          <CheckCheck className="h-4 w-4 shrink-0" aria-hidden />
          <span>Mark all as read</span>
        </button>
      )}
    </header>
  );
};

export default NotificationHeader;
