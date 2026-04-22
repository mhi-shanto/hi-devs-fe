import {
  INotification,
  INotificationsResponse,
} from '@/types/notification.type';
import NotificationHeader from './_components/notification-header';
import NotificationContainer from './_components/notification-container';
import { NotificationEmptyState } from './_components/notification-empty-state';
import { NotificationErrorState } from './_components/notification-error-state';
import { NotificationsLayout } from './_components/notifications-layout';
import { NotificationsStoreSync } from './_components/notifications-store-sync';
import { get } from '@/utils/methods';
import { cookies } from 'next/headers';

const NotificationsPage = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || null;
  let notifications: INotification[] = [];
  let error: unknown = null;

  try {
    const res = await get<INotificationsResponse>('/api/notifications', {
      isAuthenticated: true,
      token: accessToken!,
    });
    notifications = res.notifications || [];
  } catch (err) {
    error = err;
  }

  if (error) {
    return (
      <NotificationsLayout>
        <NotificationHeader />
        <NotificationErrorState />
      </NotificationsLayout>
    );
  }

  return (
    <NotificationsLayout>
      <NotificationsStoreSync notifications={notifications} />
      <NotificationHeader />

      {notifications.length === 0 ? (
        <NotificationEmptyState />
      ) : (
        <div className="space-y-4">
          <NotificationContainer notifications={notifications} />
        </div>
      )}
    </NotificationsLayout>
  );
};

export default NotificationsPage;
