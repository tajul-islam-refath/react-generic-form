import React from "react";
import { FieldValues, Path } from "react-hook-form";
import { useGenericFormContext } from "../customContext";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type TextFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "number";
};

const TextField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
}: TextFieldProps<T>) => {
  const control = useGenericFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input {...field} type={type} placeholder={placeholder} id={name} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextField;
