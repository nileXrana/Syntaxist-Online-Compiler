import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname
  const pathname = request.nextUrl.pathname;
  
  // Don't redirect if already on the mobile-not-supported page
  if (pathname === '/mobile-not-supported') {
    return NextResponse.next();
  }
  
  // Get user agent
  const userAgent = request.headers.get('user-agent') || '';
  
  // Detect mobile devices
  const isMobile = /android|webos|iphone|ipod|blackberry|iemobile|opera mini|mobile/i.test(userAgent);
  
  // Redirect mobile users to the not-supported page
  if (isMobile) {
    return NextResponse.redirect(new URL('/mobile-not-supported', request.url));
  }
  
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt, sitemap.xml (SEO files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)',
  ],
};
