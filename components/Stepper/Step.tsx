import { ReactNode } from "react";
import { StepError, useStepperContext } from "./Stepper.context";

export type StepProps = {
  children: ReactNode;
  validate?: () => Promise<StepError>;
};

export const Step = ({ children }: StepProps) => {
  const { currentStep, totalSteps, stepErrors } = useStepperContext();

  const error = stepErrors[currentStep - 1];
  return (
    <div className="py-2">
      {error?.hasError && (
        <div className="bg-red-500 text-white p-2 mb-2">{error.message}</div>
      )}
      <p>Current step : {currentStep}</p>
      <p>Total steps : {totalSteps}</p>
      {children}
    </div>
  );
};
