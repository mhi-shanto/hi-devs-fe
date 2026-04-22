import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  isAuthRoute,
  isProtectedRoute,
  isExcludedRoute,
  DEFAULT_LOGIN_REDIRECT,
} from '@/constants/routes';
import { refreshAuthTokens } from './actions/token.actions';

function accessTokenIsValid(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
  } catch (error) {
    console.error('Error validating access token:', error);
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const isAuthenticated = !!accessToken;

  if (isExcludedRoute(pathname)) {
    return NextResponse.next();
  }

  if (isAuthenticated && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url));
  }

  if (!isProtectedRoute(pathname)) {
    return NextResponse.next();
  }

  if (accessToken && accessTokenIsValid(accessToken)) {
    return NextResponse.next();
  }

  if (!accessToken && !refreshToken) {
    console.warn('⚠️ No access token found, redirecting to login');
    return NextResponse.redirect(
      new URL(
        `/signin?callbackUrl=${encodeURIComponent(pathname)}`,
        request.url,
      ),
    );
  }

  const newTokens = await refreshAuthTokens(refreshToken!);
  if (!newTokens) {
    console.warn('⚠️ Failed to refresh token, redirecting to login');
    return NextResponse.redirect(
      new URL(
        `/signin?callbackUrl=${encodeURIComponent(pathname)}`,
        request.url,
      ),
    );
  }
  const response = NextResponse.next();

  response.cookies.set('accessToken', newTokens.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 60, // 30 minutes
  });

  response.cookies.set('refreshToken', newTokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  console.log('✅ Tokens refreshed and set in cookies');
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
