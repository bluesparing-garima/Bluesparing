import React from "react";
import { TextField, Button, Grid } from "@mui/material";
import { IPolicyTypeForm } from "../IPolicyType";
import { Form, Field } from "react-final-form";
import { setIn } from "final-form";
import * as yup from "yup";
import { ADD, header } from "../../../../context/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { policyTypePath } from "../../../../sitemap";
import addPolicyTypeService from "../../../../api/PolicyType/AddPolicyType/addPolicyTypeService";
import editPolicyTypeService from "../../../../api/PolicyType/EditPolicyType/editPolicyTypeService";
import toast, { Toaster } from "react-hot-toast";
export interface AddPolicyTypeFormProps {
  initialValues: IPolicyTypeForm;
}
const AddPolicyTypeForm = (props: AddPolicyTypeFormProps) => {
  const { initialValues } = props;
  const navigate = useNavigate();
  const location = useLocation() as any;
  const pathName = location.pathname.split("/");
  const isAddEdit = pathName[pathName.length - 1] as string;
  const isAdd = isAddEdit === ADD;
  const validateFormValues = (schema: any) => async (values: any) => {
    if (typeof schema === "function") {
      schema = schema();
    }
    try {
      await schema.validate(values, { abortEarly: false });
    } catch (err: any) {
      const errors = err.inner.reduce((formError: any, innerError: any) => {
        return setIn(formError, innerError.path, innerError.message);
      }, {});
      return errors;
    }
  };
  const validationSchema = yup.object().shape({
    policyType: yup
      .string()
      .required("Policy Type is required")
      .min(1, "Policy Type must be at least 1 character")
      .max(100, "Policy Type cannot exceed 100 characters"),
  });
  const validate = validateFormValues(validationSchema);
  const onSubmit = async (policyType: IPolicyTypeForm) => {
    if (isAdd) {
      callAddPolicyTypeAPI(policyType);
    } else {
      callEditPolicyTypeAPI(policyType);
    }
  };
  const navigateToPolicyTypes = (message: string) => {
    navigate(policyTypePath(), {
      state: message,
    });
  };
  const callAddPolicyTypeAPI = async (policyType: IPolicyTypeForm) => {
    try {
      const newPolicyType = await addPolicyTypeService({ header, policyType });
      navigateToPolicyTypes(`${newPolicyType.message}`);
    } catch (error: any) {
      const err = await error
      toast.error(err.message)
    }
  };
  const callEditPolicyTypeAPI = async (policyType: IPolicyTypeForm) => {
    try {
      const newPolicyType = await editPolicyTypeService({ header, policyType });
      navigateToPolicyTypes(`${newPolicyType.message}`);
    } catch (error: any) {
      const err = await error
      toast.error(err.message)
    }
  };
  return (
    <>
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validate}
      render={({ handleSubmit, submitting, errors }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <Field name="policyType">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    label="Enter Policy Type"
                    variant="outlined"
                    className="rounded-sm w-full"
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                disabled={submitting}
                variant="contained"
                color="primary"
                className=" w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
              >
                {isAdd ? "Add Policy Type" : "Update Policy Type"}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    />
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};
export default AddPolicyTypeForm;
