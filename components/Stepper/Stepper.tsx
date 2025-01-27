import React, { Children, isValidElement, ReactNode, useState } from "react";
import { StepError, StepperContext } from "./Stepper.context";
import { Step } from "./Step";
import { StepperContent } from "./StepperContent";

type StepperProps = {
  children: React.ReactNode;
  onComplete?: () => void | Promise<void>;
  completeLabel?: string;
};

const Stepper = ({
  children,
  onComplete,
  completeLabel = "Complete",
}: StepperProps) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [stepErrors, setStepErrors] = useState<Record<number, StepError>>({});
  const steps = getSteps(children);

  return (
    <StepperContext
      value={{
        currentStep,
        totalSteps: steps.length,
        setCurrentStep,
        stepErrors,
        setStepErrors,
      }}>
      <StepperContent onComplete={onComplete} completeLabel={completeLabel}>
        {children}
      </StepperContent>
    </StepperContext>
  );
};

export default Stepper;

export const getSteps = (children: ReactNode) => {
  return Children.toArray(children).filter((child) => {
    return isValidElement(child) && child.type === Step;
  });
};

Stepper.Step = Step;
