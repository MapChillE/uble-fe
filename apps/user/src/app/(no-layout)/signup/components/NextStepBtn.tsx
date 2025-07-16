'use client'
import { TOTAL_STEPS } from '@/types/constants';
import { Button } from '@workspace/ui/components/button';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

interface NextStepBtnProps {
  currentStep: number;
  canProceed: () => boolean;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}
const NextStepBtn = ({ currentStep, canProceed, setCurrentStep }: NextStepBtnProps) => {
  const router = useRouter();
  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    } else {
      // completeOnboarding({
      //   grade: formData.grade,
      //   birthDate: formData.birthDate,
      //   gender: formData.gender,
      //   preferences: { interests: formData.interests },
      //   barcodeNumber: formData.barcodeNumber,
      // })
      // 여기서 비동기 처리 후 routing
      router.push("/home")
    }
  }

  return (
    <div className="p-5 pt-0">
      <Button
        onClick={handleNext}
        disabled={!canProceed()}
        className={`w-full h-12 text-sm font-semibold rounded-lg transition-all ${canProceed() ? "bg-[#41d596] hover:bg-[#14B470] text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
      >
        {currentStep === TOTAL_STEPS ? "시작하기" : "다음"}
      </Button>
    </div>
  );
};

export default NextStepBtn;