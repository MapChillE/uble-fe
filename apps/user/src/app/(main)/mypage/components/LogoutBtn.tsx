"use client";
import { logout } from "@/service/user";
import useUserStore from "@/store/useUserStore";
import { apiHandler } from "@api/apiHandler";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

const LogoutBtn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { clearUser } = useUserStore();

  const handleLogout = useCallback(async () => {
    setIsLoading(true);
    const { data } = await apiHandler(() => logout());
    const result = data?.statusCode;
    if (result === 0) {
      window.localStorage.removeItem("accessToken");
      clearUser();
      router.push("/");
    } else {
      toast.error("오류가 발생했습니다. 잠시 후 다시 사용해 주세요.");
      setIsLoading(false);
    }
  }, []);

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="text-xs text-gray-400 transition-colors hover:text-gray-500"
    >
      {isLoading ? "로그아웃 중..." : "로그아웃"}
    </button>
  );
};

export default LogoutBtn;
