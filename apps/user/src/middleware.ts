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
    "/mypage/statistics",
    "/partnerships",
    "/signup",
  ],
};

export function middleware(request: NextRequest) {
  const authCheck = request.cookies.get("authCheck");
  const tmpCheck = request.cookies.get("TmpCheck");
  const authCheckValue: string | undefined = authCheck?.value;
  const tmpCheckValue: string | undefined = tmpCheck?.value;
  const { pathname } = request.nextUrl;

  // ✅ 1. tmpCheck가 true인 경우 (회원가입 진행 중인 사용자)
  if (tmpCheckValue === "true") {
    // 이미 signup 페이지에 있으면 통과
    if (pathname === "/signup") {
      return NextResponse.next();
    }
    // 다른 페이지에 있으면 signup으로 이동
    const url = request.nextUrl.clone();
    url.pathname = "/signup";
    return NextResponse.redirect(url);
  }

  // ✅ 2. authCheck가 true인 경우 (로그인된 사용자)
  if (authCheckValue === "true") {
    // 루트 페이지에 있으면 map으로 이동
    if (pathname === "/") {
      const url = request.nextUrl.clone();
      url.pathname = "/map";
      return NextResponse.redirect(url);
    }
    // 다른 서비스 페이지에 있으면 통과
    return NextResponse.next();
  }

  // ✅ 3. 인증되지 않은 사용자
  // 루트 페이지에 있으면 통과 (로그인 페이지)
  if (pathname === "/") {
    return NextResponse.next();
  }

  // ✅ 4. 인증되지 않은 사용자가 서비스 페이지에 접근하려고 하면 루트로 이동
  const url = request.nextUrl.clone();
  url.pathname = "/";
  return NextResponse.redirect(url);
}
