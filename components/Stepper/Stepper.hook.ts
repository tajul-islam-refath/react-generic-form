import { ReactElement, ReactNode } from "react";
import { getSteps } from "./Stepper";
import { StepError, useStepperContext } from "./Stepper.context";
import { StepProps } from "./Step";

export const useStepContent = (children: ReactNode) => {
  const { currentStep, setCurrentStep, totalSteps, setStepErrors, stepErrors } =
    useStepperContext();

  const steps = getSteps(children);

  const validateStep = async (step: number): Promise<StepError> => {
    const currentChild = steps[step - 1] as ReactElement<StepProps>;

    if (currentChild?.props.validate) {
      return await currentChild.props.validate();
    }

    return {
      hasError: false,
    };
  };

  const handleNext = async (onComplete?: () => void | Promise<void>) => {
    const error = await validateStep(currentStep);

    if (error.hasError) {
      setStepErrors({ [currentStep - 1]: error });
      return;
    }

    setStepErrors({ [currentStep - 1]: { hasError: false } });

    if (currentStep === totalSteps && onComplete) {
      await onComplete();
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  return {
    currentStep,
    totalSteps,
    stepErrors,
    steps,
    handleNext,
    validateStep,
  };
};
