'use client'
import { logout } from '@/service/user';
import { apiHandler } from '@api/apiHandler';
import { Button } from '@workspace/ui/components/button';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

const LogoutBtn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    setIsLoading(true);
    const { data } = await apiHandler(() => logout());
    const result = data?.statusCode;
    if (result === 0) {
      router.push("/");
    }
    else {
      alert("로그아웃 실패");
      setIsLoading(false);
    }
  }, [])

  return (
    <Button
      variant="filter_unselect"
      onClick={handleLogout}
      // disabled={isLoading}
      className="w-full justify-start h-14 px-4 text-red-600 hover:text-red-700 hover:bg-red-50"
    >
      <div className="flex items-center space-x-3">
        <LogOut className="h-5 w-5" />
        <span className="font-medium">{isLoading ? "로그아웃 중..." : "로그아웃"}</span>
      </div>
    </Button>
  );
};

export default LogoutBtn;