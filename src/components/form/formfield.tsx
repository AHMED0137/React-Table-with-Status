/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { InputProps, TextInput } from "@mantine/core";

import { isRequired } from "./formUtils";
import { useFormContext } from "./formProvider";

type FormFieldProps = InputProps & {
  value?: string;
  label?: string;
  name: string;
  description?: string;
  type: string;
};

export const FormField = ({
  label,
  type,
  name,
  description,
  ...rest
}: FormFieldProps) => {
  const { form, schema } = useFormContext();

  return (
    <TextInput
      description={description}
      error={form?.errors[name]}
      errorProps={{
        style: {
          marginTop: 0,
          fontStyle: "italic",
          display: "inline-flex",
        },
      }}
      label={label}
      radius="xs"
      required={isRequired(name, schema!)}
      {...form?.getInputProps(name)}
      type={type}
      {...rest}
    />
  );
};

export default FormField;
