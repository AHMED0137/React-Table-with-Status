import { Button, ButtonProps } from "@mantine/core";

import { isValid } from "./formUtils";
import { useFormContext } from "./formProvider";

interface FormButtonProps extends ButtonProps {
  label: string;
}

export const FormButton = ({ label, type, ...rest }: FormButtonProps) => {
  const { form, schema } = useFormContext();

  return (
    <Button
      disabled={type === "submit" ? !isValid(form?.values, schema) : false}
      onClick={handleClick}
      type={type}
      {...rest}
    >
      {label}
    </Button>
  );

  function handleClick() {
    if (type === "reset") {
      form?.reset();
    }
  }
};

FormButton.defaultProps = {
  type: "submit",
  label: "Submit",
};

export default FormButton;
