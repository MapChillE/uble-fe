"use client";
import { useState } from "react";
import useConfirmModalStore from "@/store/useConfirmModalStore";
import { cancelPartnership } from "@/service/user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiHandler } from "@api/apiHandler";
import useUserStore from "@/store/useUserStore";

const WithdrawBtn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { open } = useConfirmModalStore();
  const router = useRouter();
  const { clearUser } = useUserStore();

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await apiHandler(() => cancelPartnership());

      if (error) {
        toast.error("회원탈퇴 중 오류가 발생했습니다.");
        return;
      }

      if (data?.statusCode === 0) {
        // localStorage에서 accessToken 삭제
        localStorage.removeItem("accessToken");

        // 사용자 정보 정리
        clearUser();

        // 브라우저 히스토리 스택 삭제하고 홈으로 이동
        window.history.replaceState(null, "", window.location.pathname);
        router.replace("/");

        toast.success("회원탈퇴가 완료되었습니다.");
      } else {
        toast.error("회원탈퇴 중 오류가 발생했습니다.");
      }
    } catch (error) {
      toast.error("회원탈퇴 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdrawClick = () => {
    open({
      message:
        "정말로 회원탈퇴를 하시겠습니까?\n탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.",
      confirmText: "탈퇴하기",
      cancelText: "취소",
      onConfirm: handleDeleteAccount,
    });
  };

  return (
    <button
      onClick={handleWithdrawClick}
      disabled={isLoading}
      className="text-xs text-gray-400 transition-colors hover:text-gray-500"
    >
      {isLoading ? "탈퇴 처리 중..." : "회원탈퇴"}
    </button>
  );
};

export default WithdrawBtn;
