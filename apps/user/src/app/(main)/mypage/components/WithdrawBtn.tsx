"use client";
import { useState } from "react";

const WithdrawBtn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <button
      // onClick={handleDeleteAccount}
      disabled={isLoading}
      className="text-xs text-gray-400 transition-colors hover:text-gray-500"
    >
      {isLoading ? "탈퇴 처리 중..." : "회원탈퇴"}
    </button>
  );
};

export default WithdrawBtn;
