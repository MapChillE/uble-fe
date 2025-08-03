import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sw.js (service worker)
     * - manifest.json (PWA manifest)
     * - workbox-*.js (PWA workbox files)
     * - kakaocallback (카카오 로그인 콜백)
     */
    "/((?!api/|_next/|favicon.ico|sw.js|manifest.json|workbox-|kakaocallback).*)",
  ],
};

export function middleware(request: NextRequest) {
  const authCheck = request.cookies.get("authCheck");
  const authCheckValue = authCheck?.value;
  const { pathname } = request.nextUrl;
  // 이미 /map에 있는데 쿠키가 있음 → 그대로
  if (authCheckValue === "true" && pathname === "/map") {
    return NextResponse.next();
  }

  // 이미 / 에 있는데 쿠키가 없음 → 그대로
  if (authCheckValue === undefined && pathname === "/") {
    return NextResponse.next();
  }

  // 쿠키가 있으면 /map으로 이동
  if (authCheckValue === "true") {
    const url = request.nextUrl.clone();
    url.pathname = "/map";
    return NextResponse.redirect(url);
  }

  // 쿠키가 없으면 /로 이동 (signup 등 모든 경로에서)
  const url = request.nextUrl.clone();
  url.pathname = "/";
  return NextResponse.redirect(url);
}
