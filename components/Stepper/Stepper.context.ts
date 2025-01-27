import { createContext, useContext } from "react";

export type StepError = {
  hasError: boolean;
  message?: string;
};

export type StepperContextType = {
  currentStep: number;
  totalSteps: number;
  setCurrentStep: (step: number) => void;
  stepErrors: Record<number, StepError>;
  setStepErrors: (errors: Record<number, StepError>) => void;
};

export const StepperContext = createContext<StepperContextType | null>(null);

export const useStepperContext = () => {
  const context = useContext(StepperContext);

  if (!context) {
    throw new Error("useStepperContext must be used within a Stepper");
  }

  return context;
};
