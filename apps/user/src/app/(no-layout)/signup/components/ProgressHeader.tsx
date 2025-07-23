"use client";
import { TOTAL_STEPS } from "@/types/constants";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, Fragment, SetStateAction } from "react";

interface ProgressHeaderProps {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}
const ProgressHeader = ({ currentStep, setCurrentStep }: ProgressHeaderProps) => {
  const router = useRouter();
  const handleBack = () => {
    if (currentStep > 1 && currentStep <= TOTAL_STEPS) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  return (
    <Fragment>
      <div className="flex h-14 items-center justify-between p-4">
        {currentStep > 1 ? (
          <button onClick={handleBack} className="p-1">
            <ChevronLeft className="h-5 w-5" />
          </button>
        ) : (
          <div className="h-7 w-7" />
        )}
        <div className="h-7 w-7" />
      </div>

      {/* 진행 상태 바 */}
      <div className="px-4 pb-4">
        <div className="h-1 w-full rounded-full bg-gray-200">
          <div
            className="bg-action-green h-1 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProgressHeader;
