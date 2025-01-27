import { ReactElement, ReactNode } from "react";
import { useStepperContext } from "./Stepper.context";
import { getSteps } from "./Stepper";
import { StepProps } from "./Step";
import { Button } from "../ui/button";

export const StepperContent = ({ children }: { children: ReactNode }) => {
  const { currentStep, setCurrentStep, totalSteps } = useStepperContext();

  const steps = getSteps(children);
  const currentChild = steps[currentStep - 1] as ReactElement<StepProps>;

  const nextStep = () => {
    if (currentStep === totalSteps) {
      return;
    }

    if (currentChild.props.validate && !currentChild.props.validate()) {
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep === 1) {
      return;
    }
    setCurrentStep(currentStep - 1);
  };

  return (
    <div>
      {currentChild}
      <div className="mt-4">
        <Button variant="outline" type="button" onClick={prevStep}>
          Prev
        </Button>
        <Button variant="outline" type="button" onClick={nextStep}>
          Next
        </Button>
      </div>
    </div>
  );
};
