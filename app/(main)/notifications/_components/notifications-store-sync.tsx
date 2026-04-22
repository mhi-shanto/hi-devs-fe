'use client';

import { useNotificationStore } from '@/store/notification.store';
import { INotification } from '@/types/notification.type';
import { useEffect } from 'react';

/**
 * Keeps the global notification store aligned with server-fetched data on this page
 * (unread count + mark-all visibility in the header).
 */
export function NotificationsStoreSync({
  notifications,
}: {
  notifications: INotification[];
}) {
  const setNotifications = useNotificationStore(s => s.setNotifications);

  useEffect(() => {
    setNotifications(notifications);
  }, [notifications, setNotifications]);

  return null;
}
