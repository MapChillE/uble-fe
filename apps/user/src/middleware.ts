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
