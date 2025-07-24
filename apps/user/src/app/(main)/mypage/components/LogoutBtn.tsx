"use client";
import { logout } from "@/service/user";
import { apiHandler } from "@api/apiHandler";
import { Button } from "@workspace/ui/components/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

const LogoutBtn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    setIsLoading(true);
    const { data } = await apiHandler(() => logout());
    const result = data?.statusCode;
    if (result === 0) {
      window.localStorage.removeItem("accessToken");
      router.push("/");
    } else {
      toast.error("오류가 발생했습니다. 잠시 후 다시 사용해 주세요.");

      setIsLoading(false);
    }
  }, []);

  return (
    <Button
      variant="filter_unselect"
      onClick={handleLogout}
      // disabled={isLoading}
      className="h-14 w-full justify-start px-4 text-red-600 hover:bg-red-50 hover:text-red-700"
    >
      <div className="flex items-center space-x-3">
        <LogOut className="h-5 w-5" />
        <span className="font-medium">{isLoading ? "로그아웃 중..." : "로그아웃"}</span>
      </div>
    </Button>
  );
};

export default LogoutBtn;
