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
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

export function middleware(request: NextRequest) {
  const authCheck = request.cookies.get("authCheck");
  const authCheckValue = authCheck?.value;
  const { pathname } = request.nextUrl;

  // 쿠키가 없고 /가 아닌 경로에 있으면 /로 리다이렉트
  if (authCheckValue === undefined && pathname !== "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // 그 외의 경우는 그대로 진행
  return NextResponse.next();
}
