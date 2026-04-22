'use server';
import { INotificationResponse } from '@/types/notification.type';
import { del } from '@/utils/methods';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const deleteNotification = async (notificationId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: 'No access token found',
    };
  }

  try {
    const response = await del<INotificationResponse>(
      `/api/notifications/${notificationId}`,
      {
        isAuthenticated: true,
        token: cookieStore.get('accessToken')?.value || '',
      },
    );

    revalidatePath('/notifications');

    return {
      success: true,
      message: response.message || 'Notification deleted successfully',
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'There was an error deleting the comment.',
    };
  }
};
