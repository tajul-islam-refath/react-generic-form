import {
  Control,
  DefaultValues,
  FieldValues,
  FormState,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { Form } from "../ui/form";
import { GenericFormContext } from "./customContext";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ref, useImperativeHandle } from "react";
import TextField from "./fields/TextField";
import ArrayField from "./fields/ArrayField";
import FormReset from "./fields/FormReset";

export type GenericFormRef<TFormValues extends FieldValues> = {
  control: Control<TFormValues>;
  form: UseFormReturn<TFormValues>;
  formState: FormState<TFormValues>;
  setValue: (
    name: Path<TFormValues>,
    value: TFormValues[Path<TFormValues>]
  ) => void;
  getValues: () => TFormValues;
  reset: (values?: Partial<TFormValues> | undefined) => void;
};

export type GenericFormProps<TSchema extends ZodType> = {
  children: React.ReactNode;
  initialValues: Partial<z.infer<TSchema>>;
  schema: TSchema;
  onSubmit: SubmitHandler<z.infer<TSchema>>;
  mode?: "onBlur" | "onSubmit" | "onChange";
  ref?: Ref<GenericFormRef<z.infer<TSchema>>>;
};

export const GenericForm = <TSchema extends ZodType>({
  children,
  onSubmit,
  schema,
  initialValues,
  mode = "onChange",
  ref,
}: GenericFormProps<TSchema>) => {
  type FormValues = z.infer<TSchema>;
  const form = useForm<FormValues>({
    mode,
    resolver: zodResolver(schema),
    defaultValues: initialValues as DefaultValues<FormValues>,
  });

  useImperativeHandle(ref, () => ({
    control: form.control,
    form,
    formState: form.formState,
    setValue: (name: Path<FormValues>, value: FormValues[Path<FormValues>]) =>
      form.setValue(name, value),
    getValues: form.getValues,
    reset: (values?: Partial<FormValues | undefined>) =>
      form.reset(values as FormValues),
  }));

  return (
    <GenericFormContext value={{ ...form }}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
      </Form>
    </GenericFormContext>
  );
};

GenericForm.displayName = "GenericForm";

GenericForm.TextField = TextField;
GenericForm.ArrayField = ArrayField;
GenericForm.FormReset = FormReset;
