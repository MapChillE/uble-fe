"use client";

import { toast } from "sonner";

const KakaoLoginBtn = () => {
  const login = () => {
    const kakaoUrl =
      process.env.NEXT_PUBLIC_KAKAO_URL +
      "&client_id=" +
      process.env.NEXT_PUBLIC_CLIENT_ID +
      "&redirect_uri=" +
      process.env.NEXT_PUBLIC_REDIRECT_URI;
    if (!kakaoUrl) {
      toast.error("오류가 발생했습니다. 잠시 후 다시 이용해 주세요.");

      return;
    }
    window.location.href = kakaoUrl;
    return;
  };

  return (
    <div className="flex justify-center">
      <button onClick={login}>
        <img src="kakao_login.png" alt="카카오 로그인" />
      </button>
    </div>
  );
};

export default KakaoLoginBtn;
