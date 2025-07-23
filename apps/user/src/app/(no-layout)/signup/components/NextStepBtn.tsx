"use client";
import { setUserInfo } from "@/service/user";
import { TOTAL_STEPS } from "@/types/constants";
import { InfoForm } from "@/types/profile";
import { apiHandler } from "@api/apiHandler";
import { Button } from "@workspace/ui/components/button";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface NextStepBtnProps {
  currentStep: number;
  canProceed: () => boolean;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  info: InfoForm;
}
const NextStepBtn = ({ currentStep, canProceed, setCurrentStep, info }: NextStepBtnProps) => {
  const router = useRouter();

  const storeUserInfo = async () => {
    const { data } = await apiHandler(() => setUserInfo(info));
    const result = data?.statusCode;
    return result === 0 ? true : false;
  };

  const handleNext = async () => {
    // 바코드 번호가 1~15자리면 진행 불가
    if (info.barcode && info.barcode.length > 0 && info.barcode.length <= 15) {
      alert("바코드 번호는 16자리 입니다.");
      return;
    }
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      const storeResult = await storeUserInfo();
      if (storeResult) {
        router.push("/home");
      } else alert("정보 저장을 실패했습니다.");
    }
  };

  return (
    <div className="p-5 pt-0">
      <Button
        onClick={handleNext}
        disabled={!canProceed()}
        className={`h-12 w-full rounded-lg text-sm font-semibold transition-all ${
          canProceed()
            ? "bg-action-green text-white hover:bg-[#14B470]"
            : "cursor-not-allowed bg-gray-200 text-gray-400"
        }`}
      >
        {currentStep === TOTAL_STEPS ? "시작하기" : "다음"}
      </Button>
    </div>
  );
};

export default NextStepBtn;
