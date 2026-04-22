'use client';

import { deleteNotification } from '@/actions/notification';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNotificationStore } from '@/store/notification.store';
import { INotification } from '@/types/notification.type';
import { logError } from '@/utils/apiError';
import {
  Bell,
  Briefcase,
  Check,
  Clock,
  Heart,
  Mail,
  MessageCircle,
  Trash2,
  UserPlus,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useTransition } from 'react';

const TYPE_ICONS: Record<INotification['type'], LucideIcon> = {
  COMMENT: MessageCircle,
  REPLY: MessageCircle,
  LIKE: Heart,
  FOLLOW: UserPlus,
  MESSAGE: Mail,
  APPLICATION: Briefcase,
};

function getResourceHref(n: INotification): string | null {
  switch (n.resourceType) {
    case 'BLOG':
      return `/blogs/${n.resourceId}`;
    case 'QUESTION':
      return `/questions/${n.resourceId}`;
    case 'JOB':
    case 'APPLICATION':
      return `/jobs/${n.resourceId}`;
    default:
      return null;
  }
}

const Notification = ({ notification }: { notification: INotification }) => {
  const { markAsRead, removeNotification } = useNotificationStore();
  const [isDeletingNotification, startTransition] = useTransition();
  const Icon = TYPE_ICONS[notification.type] ?? Bell;
  const resourceHref = getResourceHref(notification);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  const handleDeleteNotification = async () => {
    removeNotification(notification._id);
    startTransition(async () => {
      try {
        await deleteNotification(notification._id);
      } catch (error) {
        logError(error, 'NotificationDelete');
      }
    });
  };

  return (
    <li
      className={cn(
        'group border-border bg-surface shadow-card relative flex flex-col gap-4 rounded-2xl border p-5 transition-all duration-200 sm:flex-row sm:items-start sm:justify-between',
        notification.isRead
          ? 'hover:border-border opacity-95'
          : 'ring-primary/20 border-primary/25 ring-1',
      )}
    >
      {!notification.isRead && (
        <span
          className="bg-primary absolute top-6 -left-1 h-2 w-2 rounded-full shadow-[0_0_8px_hsl(var(--color-primary))]"
          aria-hidden
        />
      )}

      <div className="flex min-w-0 gap-4">
        <div
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
            notification.isRead
              ? 'bg-muted/80 text-muted-foreground'
              : 'bg-primary/15 text-primary',
          )}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0 space-y-2">
          <p
            className={cn(
              'text-sm leading-snug sm:text-base',
              notification.isRead
                ? 'text-muted-foreground'
                : 'text-foreground font-medium',
            )}
          >
            {notification.message}
          </p>
          <div className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
            {notification.senderId?.name && (
              <span className="text-foreground/90 font-medium">
                {notification.senderId.name}
              </span>
            )}
            {notification.senderId?.name ? (
              <span className="text-on-surface-variant" aria-hidden>
                ·
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1 tabular-nums">
              <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {formatDate(notification.createdAt)}
            </span>
            {resourceHref ? (
              <>
                <span className="text-on-surface-variant" aria-hidden>
                  ·
                </span>
                <Button variant="link" className="h-auto p-0 text-xs" asChild>
                  <Link href={resourceHref}>View</Link>
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 self-end sm:self-center sm:opacity-0 sm:group-hover:opacity-100">
        {!notification.isRead && (
          <button
            type="button"
            onClick={() => markAsRead(notification._id)}
            className="text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-lg p-2 transition-colors"
            title="Mark as read"
          >
            <Check className="h-4 w-4" aria-hidden />
          </button>
        )}
        <button
          type="button"
          onClick={handleDeleteNotification}
          disabled={isDeletingNotification}
          className={cn(
            'text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-lg p-2 transition-colors',
            isDeletingNotification && 'cursor-not-allowed opacity-50',
          )}
          title="Delete notification"
        >
          <Trash2 className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </li>
  );
};

export default Notification;
