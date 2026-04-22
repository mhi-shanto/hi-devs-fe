import env from './env';

/* eslint-disable @typescript-eslint/no-explicit-any */
let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;

const FE_URL = env.deployUrl || 'http://localhost:3000';
export const refreshToken = async (): Promise<any> => {
  if (isRefreshing) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = fetch(`${FE_URL}/api/token`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async response => {
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to refresh token');
      }
      return response.json();
    })
    .then(data => {
      return data.token;
    })
    .catch(error => {
      console.error('❌ Token refresh failed:', error);
      throw error;
    })
    .finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });

  return refreshPromise;
};
