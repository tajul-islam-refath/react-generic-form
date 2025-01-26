import { z } from "zod";
import { GenericForm, GenericFormRef } from "../GenericForm";

import { Button } from "../ui/button";
import { useRef } from "react";

const FormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  skills: z.array(z.string()),
});

type FormTypes = z.infer<typeof FormSchema>;

const defaultValues: FormTypes = {
  name: "",
  email: "",
  skills: ["JavaScript", "TypeScript"],
};

const GenericFormPlayground = () => {
  const ref = useRef<GenericFormRef<FormTypes>>(null);

  return (
    <GenericForm
      schema={FormSchema}
      initialValues={defaultValues}
      onSubmit={(value) => console.log(value)}
      ref={ref}>
      <div className="space-y-4 w-96 ml-auto mr-auto">
        <GenericForm.TextField<FormTypes>
          name="name"
          label="Name"
          placeholder="Enter your name"
        />
        <GenericForm.TextField<FormTypes>
          name="email"
          label="Email"
          placeholder="Enter your email"
          type="email"
        />

        <GenericForm.ArrayField name="skills">
          {({ append, remove, fields }) => (
            <div>
              {fields.map((field, index) => (
                <div className="flex items-center" key={field.id}>
                  <GenericForm.TextField<FormTypes>
                    key={field.id}
                    name={`skills.${index}`}
                    label={`Skill ${index + 1}`}
                    placeholder="Enter your skill"
                  />
                  <Button
                    variant="default"
                    onClick={() => remove(index)}
                    className="ml-2">
                    X
                  </Button>
                </div>
              ))}
              <Button
                variant="default"
                onClick={() => append("")}
                className="mt-2"
                type="button">
                Add Skill
              </Button>
            </div>
          )}
        </GenericForm.ArrayField>

        <div>
          <GenericForm.FormReset<FormTypes> label="Reset" />
          <Button variant="default" type="submit">
            Submit
          </Button>
        </div>
      </div>
    </GenericForm>
  );
};

export default GenericFormPlayground;
