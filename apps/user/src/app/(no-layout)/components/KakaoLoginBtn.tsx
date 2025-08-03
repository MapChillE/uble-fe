"use client";

import Image from "next/image";
import { toast } from "sonner";

const KakaoLoginBtn = () => {
  const login = () => {
    const kakaoBase = process.env.NEXT_PUBLIC_KAKAO_URL;
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
    const redirect = process.env.NEXT_PUBLIC_REDIRECT_URI;
    if (!kakaoBase || !clientId || !redirect) {
      toast.error("오류가 발생했습니다. 잠시 후 다시 이용해 주세요.");
      return;
    }
    const kakaoUrl = `${kakaoBase}&client_id=${clientId}&redirect_uri=${redirect}`;
    window.location.href = kakaoUrl;
    return;
  };

  return (
    <div className="flex justify-center">
      <button onClick={login}>
        <Image src="/assets/kakao_login_button.png" alt="카카오 로그인" width={300} height={100} />
      </button>
    </div>
  );
};

export default KakaoLoginBtn;
