import { createContext, useContext } from "react";
import { Control, FieldValues } from "react-hook-form";

export type GenericFormContext<T extends FieldValues = any> = {
  control: Control<T>;
};

export const GenericFormContext = createContext<GenericFormContext | null>(
  null
);

export const useGenericFormContext = <T extends FieldValues = any>() => {
  const context = useContext(GenericFormContext);

  if (!context) {
    throw new Error("useGenericFormContext must be used within a GenericForm");
  }

  return context.control as Control<T>;
};
