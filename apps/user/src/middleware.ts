import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    "/",
    "/favorites",
    "/home",
    "/map",
    "/mypage",
    "/mypage/history",
    "/partnerships",
    "/signup",
  ],
};

export function middleware(request: NextRequest) {
  const authCheck = request.cookies.get("authCheck");
  const authCheckValue: string | undefined = authCheck?.value;
  const { pathname } = request.nextUrl;
  // ✅ 1. 쿠키가 있고 / 에 있으면 → /map 으로 이동
  if (authCheckValue === "true" && pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/map";
    return NextResponse.redirect(url);
  }

  // ✅ 2. 쿠키가 있고 서비스 경로에 있으면 → 통과
  if (authCheckValue === "true") {
    return NextResponse.next();
  }

  // ✅ 3. 쿠키가 없고 / 에 있으면 → 통과
  if (!authCheck && pathname === "/") {
    return NextResponse.next();
  }

  // ✅ 4. 쿠키가 없고 서비스 경로에 있으면 → / 로 이동
  const url = request.nextUrl.clone();
  url.pathname = "/";
  return NextResponse.redirect(url);
}
