import { cn } from "@/lib/utils";
import { StepError } from "./Stepper.context";

type StepIndicatorProps = {
  step: number;
  error?: StepError;
  isActive: boolean;
  isCompleted: boolean;
};

const StepIndicator = ({
  step,
  error,
  isActive,
  isCompleted,
}: StepIndicatorProps) => {
  const baseClassName =
    "w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0";

  if (error?.hasError) {
    return (
      <div className={cn(baseClassName, "border-red-500 text-red-500")}>
        <span>{step}</span>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div
        className={cn(
          baseClassName,
          "border-green-500 bg-green-500 text-white"
        )}>
        <span>{step}</span>
      </div>
    );
  }

  if (isActive) {
    return (
      <div className={cn(baseClassName, "border-primary text-primary")}>
        <span>{step}</span>
      </div>
    );
  }
  return (
    <div className={cn(baseClassName, "border-gray-300 text-gray-300")}>
      <span>{step}</span>
    </div>
  );
};

export default StepIndicator;
