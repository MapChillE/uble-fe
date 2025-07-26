"use client";

import React, { Suspense } from "react";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { kakaoLogin } from "@/service/user";
import { apiHandler } from "@api/apiHandler";
import { toast } from "sonner";

function KakaoCallbackInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const login = async () => {
    const code = searchParams.get("code");
    if (code) {
      const { data } = await apiHandler(() => kakaoLogin(code));
      if (data) {
        data.role === "TMP_USER" ? router.replace("/signup") : router.replace("/map");
      } else {
        toast.error("오류가 발생했습니다. 잠시 후 다시 이용해 주세요.");

        router.replace("/");
      }
    }
  };

  useEffect(() => {
    login();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center">
      <>
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900" />
        <div>로그인 중입니다...</div>
      </>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>로그인 중입니다...</div>}>
      <KakaoCallbackInner />
    </Suspense>
  );
}
