import { Button, ButtonProps } from "@/components/ui/button";
import React from "react";
import { DefaultValues, FieldValues, useFormContext } from "react-hook-form";

type ButtonFormProps<T extends FieldValues> = ButtonProps & {
  label?: string;
  resetValues?: Partial<T>;
};

const FormReset = <T extends FieldValues>({
  label = "Reset",
  resetValues,
  ...props
}: ButtonFormProps<T>) => {
  const {
    reset,
    formState: { defaultValues },
  } = useFormContext<T>();

  const handleClick = () => {
    reset((resetValues as DefaultValues<T>) || defaultValues);
  };

  return (
    <Button type="reset" onClick={handleClick} {...props}>
      {label}
    </Button>
  );
};

export default FormReset;
