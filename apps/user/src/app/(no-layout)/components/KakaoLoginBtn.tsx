'use client'

import { apiHandler } from '@api/apiHandler';
import { kakaoLogin } from '@/service/user';

const KakaoLoginBtn = () => {
  const login = async () => {
    const kakaoUrl = process.env.NEXT_PUBLIC_KAKAO_URL + "&client_id=" + process.env.NEXT_PUBLIC_CLIENT_ID + "&redirect_uri=" + process.env.NEXT_PUBLIC_REDIRECT_URI;
    if (!kakaoUrl) {
      alert("에러");
      return;
    }
    window.location.href = kakaoUrl;
    // apiHandler(() => kakaoLogin());
    return;
  }

  return (
    <div className="flex justify-center">
      <button onClick={login}>
        <img src="kakao_login.png" alt="카카오 로그인" />
      </button>
    </div>
  );
};

export default KakaoLoginBtn;