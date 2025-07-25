"use client";

import { useRouter } from "next/navigation";
import { ChevronRight, Gift } from "lucide-react";

const BenefitListBtn = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/mypage/history")}
      className="flex w-full items-center justify-between p-4 transition-colors hover:bg-gray-50"
    >
      <div className="flex items-center space-x-3">
        <Gift className="h-5 w-5 text-gray-600" />
        <span className="font-medium text-gray-900">혜택 사용 내역</span>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </button>
  );
};

export default BenefitListBtn;
