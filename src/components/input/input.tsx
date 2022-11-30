import {
  NumberInput,
  PasswordInput,
  PasswordInputProps,
  TextInput,
  TextInputProps,
  Textarea,
  TextareaProps,
  createStyles,
} from "@mantine/core";

import { NumberProps } from "./NumberInput";

type _InputProps =
  | (TextInputProps & React.RefAttributes<HTMLInputElement>)
  | (TextareaProps & React.RefAttributes<HTMLTextAreaElement>)
  | (PasswordInputProps & React.RefAttributes<HTMLInputElement>)
  | (NumberProps & React.RefAttributes<HTMLInputElement>);

export type InputProps = _InputProps & {
  type?: React.HTMLInputTypeAttribute | "textarea" | "Number";
  width?: number | string;
};

export const Input = ({ value, type, width, ...rest }: InputProps) => {
  const { classes } = useStyles({ width });
  const Component = getComponent(type || "text") as React.FC<InputProps>;
  return <Component classNames={classes} radius="xl" size="sm" {...rest} />;
};

function getComponent(type: InputProps["type"]) {
  switch (type) {
    case "password":
      return PasswordInput;
    case "Number":
      return NumberInput;
    case "textarea":
      return Textarea;
    default:
      return TextInput;
  }
}

export default Input;

const useStyles = createStyles((theme, { width }: Partial<InputProps>) => ({
  wrapper: {
    width,
  },
}));
