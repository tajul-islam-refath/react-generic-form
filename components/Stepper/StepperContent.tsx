import { ReactElement, ReactNode } from "react";
import { useStepperContext } from "./Stepper.context";
import { getSteps } from "./Stepper";
import { StepProps } from "./Step";
import { Button } from "../ui/button";
import { useStepContent } from "./Stepper.hook";
import StepIndicator from "./StepIndicator";

type StepperContentProps = {
  children: ReactNode;
  onComplete?: () => void | Promise<void>;
  completeLabel?: string;
};

export const StepperContent = ({
  children,
  onComplete,
  completeLabel = "Complete",
}: StepperContentProps) => {
  const {
    currentStep,
    totalSteps,
    stepErrors,
    handleNext,
    handlePrevious,
    steps,
  } = useStepContent(children);

  const currentChild = steps[currentStep - 1] as ReactElement<StepProps>;

  return (
    <div
      className="flex flex-col h-full gap-4"
      role="region"
      aria-label="Stepper">
      <div className="flex items-center px-8 mt-3">
        <div className="flex items-center w-full">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const step = index + 1;
            const isActive = step === currentStep;
            const isCompleted = step < currentStep;
            const error = stepErrors[step - 1];

            return (
              <div
                className="flex items-center flex-1 last:flex-none"
                key={step}>
                <StepIndicator
                  key={step}
                  step={step}
                  error={error}
                  isActive={isActive}
                  isCompleted={isCompleted}
                />
              </div>
            );
          })}
        </div>
      </div>
      {currentChild}
      <div className="mt-4 flex justify-between">
        <Button
          variant="outline"
          type="button"
          onClick={handlePrevious}
          disabled={currentStep === 1}>
          Prev
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => handleNext(onComplete)}>
          {currentStep === totalSteps ? completeLabel : "Next"}
        </Button>
      </div>
    </div>
  );
};
