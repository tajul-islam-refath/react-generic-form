import React from "react";
import Stepper from "../Stepper/Stepper";

const StepperPlayground = () => {
  return (
    <Stepper
      onComplete={() => {
        alert("Completed");
      }}>
      <Stepper.Step
        validate={async () => {
          return { hasError: false };
        }}>
        <p>Step 1</p>
      </Stepper.Step>
      <Stepper.Step>
        <p>Step 2</p>
      </Stepper.Step>
    </Stepper>
  );
};

export default StepperPlayground;
