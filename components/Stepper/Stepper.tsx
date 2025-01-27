import React, { Children, isValidElement, ReactNode, useState } from "react";
import { StepperContext } from "./Stepper.context";
import { Step } from "./Step";
import { StepperContent } from "./StepperContent";

type StepperProps = {
  children: React.ReactNode;
};

const Stepper = ({ children }: StepperProps) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const steps = getSteps(children);

  return (
    <StepperContext
      value={{
        currentStep,
        totalSteps: steps.length,
        setCurrentStep,
        stepErrors: {},
        setStepErrors: () => {},
      }}>
      <StepperContent>{children}</StepperContent>
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
