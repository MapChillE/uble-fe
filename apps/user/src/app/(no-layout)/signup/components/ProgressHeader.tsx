'use client'
import { TOTAL_STEPS } from '@/types/constants';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Dispatch, Fragment, SetStateAction } from 'react';

interface ProgressHeaderProps {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}
const ProgressHeader = ({ currentStep, setCurrentStep }: ProgressHeaderProps) => {
  const router = useRouter();
  const handleBack = () => {
    if (currentStep > 1 && currentStep <= TOTAL_STEPS) {
      setCurrentStep(currentStep - 1)
    } else {
      router.back()
    }
  }

  return (
    <Fragment>
      <div className="flex items-center justify-between p-4 h-14">
        {currentStep > 1 ? (
          <button onClick={handleBack} className="p-1">
            <ChevronLeft className="w-5 h-5" />
          </button>
        ) : (
          <div className="w-7 h-7" />
        )}
        <div className="w-7 h-7" />
      </div>

      {/* 진행 상태 바 */}
      <div className="px-4 pb-4">
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div
            className="bg-[#41d596] h-1 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProgressHeader;