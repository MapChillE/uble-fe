'use client'
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { kakaoLogin } from '@/service/user';
import { apiHandler } from '@api/apiHandler';

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const login = async () => {
    const code = searchParams.get('code');
    if (code) {
      const { data } = await apiHandler(() => kakaoLogin(code));
      console.log(data);
      if (data) {
        data.role === "TMP_USER" ? router.push("/signup") : router.push("/map");
      }
      else {
        alert("로그인 실패");
        router.push("/");
      }
    }
  }

  useEffect(() => {
    login();
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4" />
        <div>로그인 중입니다...</div>
      </>
    </div>
  );
};

export default Page;