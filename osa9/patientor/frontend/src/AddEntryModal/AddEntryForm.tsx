import React from "react";
import { Grid, Button, Header } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { HealthCheckEntry } from "../types";
import { useStateValue } from "../state";
import {
  DiagnosisSelection,
  NumberField,
  TextField,
} from "../AddPatientModal/FormField";

export type EntryFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        healthCheckRating: 0,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.healthCheckRating === undefined) {
          errors.healthCheckRating = requiredError;
        }
        if (values.healthCheckRating < 0 || values.healthCheckRating > 3) {
          errors.healthCheckRating = "The value should be between 0 and 3";
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Header as="h2" content="Health check" />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Health Check Rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
