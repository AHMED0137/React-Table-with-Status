import { Center, createStyles, Paper, Title } from "@mantine/core";
import { CellContext } from "@tanstack/react-table";
import Joi from "joi";
import { MyModal } from "../../HOC/Modal";
import { Form } from "../form";
import { User } from "./DataTable2";
export const RowForm = ({ table, row }: CellContext<User, unknown>) => {
  let initialValues = row.original;
  const schema = Joi.object<User>({
    id: Joi.number(),
    nso: Joi.string().required(),
    notes: Joi.string().required(),
    description: Joi.string().required(),
    otherSources: Joi.string().required(),
    otp: Joi.string().required(),
    sportsCanada: Joi.string().required(),
    total: Joi.string().required(),
  });

  const { classes } = useStyles();

  function handleFormSubmit(formValues: User) {
    console.log(formValues);
    initialValues=formValues;
  }

  return (
    <Paper className={classes.paper}>
      <Center>
        <Title order={3}>Edit Row</Title>
      </Center>

      <Form
        className={classes.form}
        initialValues={initialValues}
        onFormSubmit={handleFormSubmit}
        schema={schema}
      >
        <Form.FormField name={"description"} label="Description" type="text" />
        <Form.FormField name={"notes"} label="Notes" type="text" />
        <Form.FormField name={"otp"} label="OTP Sources" type="number" />
        <Form.FormField
          name={"sportsCanada"}
          label="Sports Canada"
          type="number"
        />
        <Form.FormField name={"nso"} label="NSO" type="text" />
        <Form.FormField
          name={"otherSources"}
          label="Other Sources"
          type="number"
        />
        <Form.FormField name={"total"} label="Grand Total" type="number" />
        <Form.FormButton label="Done" className="mt-2" color="orange" type="submit" />
      </Form>
    </Paper>
  );
};

RowForm.displayName = "RowForm";

export const RowFormWithDrawer = MyModal(RowForm);

const useStyles = createStyles((theme) => ({
  paper: {
    width: theme.breakpoints.sm / 2,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing.lg,
  },
  formField: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
}));
