import React from "react";
import {
  ArrayPath,
  FieldValues,
  useFieldArray,
  UseFieldArrayReturn,
  useFormContext,
} from "react-hook-form";

export type ArrayFieldProps<TFromValues extends FieldValues> = {
  children: (
    field: UseFieldArrayReturn<TFromValues, ArrayPath<TFromValues>>
  ) => React.ReactNode;
  name: ArrayPath<TFromValues>;
};

const ArrayField = <TFormValues extends FieldValues>({
  children,
  name,
}: ArrayFieldProps<TFormValues>) => {
  const form = useFormContext<TFormValues>();
  const fieldArray = useFieldArray({ control: form.control, name });

  return children(fieldArray);
};

export default ArrayField;
