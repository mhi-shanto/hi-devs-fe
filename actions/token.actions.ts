'use server';

import env from '@/utils/env';
import { cookies } from 'next/headers';

export interface TokenData {
  accessToken: string;
  refreshToken: string;
}

const COOKIE_OPTIONS = {
  maxAge: 7 * 24 * 60 * 60, // 7 days
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  sameSite: 'lax' as const,
};

export const setAuthTokens = async (tokens: TokenData) => {
  try {
    const cookieStore = await cookies();
    cookieStore.set('accessToken', tokens.accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 15 * 60, // 15 minutes
    });
    cookieStore.set('refreshToken', tokens.refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return { success: true };
  } catch (error) {
    console.error('Error setting auth tokens:', error);
    return { success: false, error: 'Failed to set auth tokens' };
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken');
    return token?.value || null;
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};

export const getRefreshToken = async (): Promise<string | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('refreshToken');
    return token?.value || null;
  } catch (error) {
    console.error('Error getting refresh token:', error);
    return null;
  }
};

export const clearAuthTokens = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    cookieStore.delete('userRole');
    return { success: true };
  } catch (error) {
    console.error('Error clearing auth tokens:', error);
    return { success: false, error: 'Failed to clear auth tokens' };
  }
};

export async function refreshAuthTokens(
  refreshToken: string,
): Promise<{ accessToken: string; refreshToken: string } | null> {
  try {
    const response = await fetch(`${env.apiBaseUrl}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      console.error('❌ Failed to refresh tokens:', response.status);
      return null;
    }

    const data = await response.json();

    const accessToken = data.data?.access?.token;
    const newRefreshToken = data.data?.refresh?.token;
    if (!accessToken || !newRefreshToken) {
      console.error('❌ Invalid token response structure');
      return null;
    }

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  } catch (error) {
    console.error('❌ Error refreshing tokens:', error);
    return null;
  }
}
