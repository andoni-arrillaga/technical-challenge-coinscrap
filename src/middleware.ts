import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export default function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (url.pathname === '/') {
    url.pathname = `/${routing.defaultLocale}`;
    return NextResponse.redirect(url);
  }

  return createMiddleware(routing)(req);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
