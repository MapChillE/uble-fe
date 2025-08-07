"use client";
import { useState } from "react";
import SelectMembership from "./SelectMembership";
import SelectGender from "./SelectGender";
import InputBirth from "./InputBirth";
import SelectCategory from "./SelectCategory";
import InputBarcode from "./InputBarcode";
import ProgressHeader from "./ProgressHeader";
import { InfoForm, StepProps } from "@/types/profile";
import NextStepBtn from "./NextStepBtn";

const stepComponentMap: Record<number, React.ComponentType<StepProps>> = {
  1: SelectMembership,
  2: SelectGender,
  3: InputBirth,
  4: SelectCategory,
  5: InputBarcode,
};

const SignupContainer = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [info, setInfo] = useState<InfoForm>({
    rank: "",
    gender: "",
    birthDate: "",
    categoryIds: [],
    barcode: "",
  });
  const StepComponent = stepComponentMap[currentStep];

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return info.rank !== "";
      case 2:
        return info.gender !== "";
      case 3:
        return info.birthDate !== "";
      case 4:
        return info.categoryIds.length > 0;
      case 5:
        return !info.barcode || info.barcode.length === 0 || info.barcode.length === 16;
      default:
        return false;
    }
  };

  return (
    <div className="scroll-none flex h-[100dvh] flex-col justify-between bg-white">
      <div>
        <ProgressHeader currentStep={currentStep} setCurrentStep={setCurrentStep} />
        <div className="flex-1 px-5 py-4">
          {StepComponent ? <StepComponent info={info} setInfo={setInfo} /> : null}
        </div>
      </div>
      <NextStepBtn
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        canProceed={canProceed}
        info={info}
      />
    </div>
  );
};

export default SignupContainer;
