'use client'
import { useState } from "react";
import SelectMembership from "./SelectMembership";
import SelectGender from "./SelectGender";
import InputBirth from "./InputBirth";
import SelectCategory from "./SelectCategory";
import InputBarcodeNumber from "./InputBarcodeNumber";
import ProgressHeader from "./ProgressHeader";

const stepComponentMap: Record<number, React.ComponentType> = {
  1: SelectMembership,
  2: SelectGender,
  3: InputBirth,
  4: SelectCategory,
  5: InputBarcodeNumber,
};

const SignupContainer = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const StepComponent = stepComponentMap[currentStep];

  return (
    <div>
      <ProgressHeader currentStep={currentStep} setCurrentStep={setCurrentStep} />
      {StepComponent ? <StepComponent /> : null}
    </div>
  );
};

export default SignupContainer;