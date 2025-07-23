"use client";

import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center bg-white p-6 text-center">
      <div className="mb-6">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="60" fill="#F3F4F6" />
          <ellipse cx="60" cy="80" rx="28" ry="8" fill="#E5E7EB" />
          <circle cx="60" cy="54" r="28" fill="#fff" stroke="#41d596" strokeWidth="3" />
          <ellipse cx="50" cy="54" rx="4" ry="6" fill="#41d596" />
          <ellipse cx="70" cy="54" rx="4" ry="6" fill="#41d596" />
          <path d="M50 68 Q60 75 70 68" stroke="#41d596" strokeWidth="2" fill="none" />
        </svg>
      </div>
      <h1 className="text-action-green mb-2 text-5xl font-extrabold">404</h1>
      <h2 className="mb-3 text-xl font-semibold text-gray-800">페이지를 찾을 수 없습니다</h2>
      <p className="mb-8 text-gray-500">
        요청하신 페이지가 존재하지 않거나
        <br />
        삭제되었거나, 주소가 변경되었을 수 있습니다.
        <br />
        <span className="text-action-green font-medium">홈으로 돌아가서</span> 다시 시도해 주세요.
      </p>
      <Link href="/home">
        <Button variant="default">홈으로 돌아가기</Button>
      </Link>
    </div>
  );
}
