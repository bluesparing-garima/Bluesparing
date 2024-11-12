import React from "react";
import { TextField, Button, Grid } from "@mui/material";
import addCaseTypeService from "../../../../api/CaseType/AddCaseType/addCaseTypeService";
import { ICaseTypeForm } from "../ICaseTypes";
import { Form, Field } from "react-final-form";
import { setIn } from "final-form";
import * as yup from "yup";
import { ADD, header } from "../../../../context/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { caseTypesPath } from "../../../../sitemap";
import editCaseTypeService from "../../../../api/CaseType/EditCaseType/editCaseTypeService";
import toast, { Toaster } from "react-hot-toast";
export interface AddCaseTypeFormProps {
  initialValues: ICaseTypeForm;
}
const AddCaseTypeForm = (props: AddCaseTypeFormProps) => {
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
    caseType: yup
      .string()
      .required("Case Type Name is required")
      .min(1, "Case Type Name must be at least 1 character")
      .max(100, "Case Type Name cannot exceed 100 characters"),
  });
  const validate = validateFormValues(validationSchema);
  const onSubmit = async (caseType: ICaseTypeForm) => {
    if (isAdd) {
      callAddCaseTypeAPI(caseType);
    } else {
      callEditCaseTypeAPI(caseType);
    }
  };
  const navigateToCaseTypes = (message: string) => {
    navigate(caseTypesPath(), {
      state: message,
    });
  };
  const callAddCaseTypeAPI = async (caseType: ICaseTypeForm) => {
    try {
      const newCaseType = await addCaseTypeService({ header, caseType });
      navigateToCaseTypes(`${newCaseType.message}`);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  const callEditCaseTypeAPI = async (caseType: ICaseTypeForm) => {
    try {
      const updatedCaseType = await editCaseTypeService({ header, caseType });
      navigateToCaseTypes(`${updatedCaseType.message}`);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
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
                <Field name="caseType">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      label="Enter Case Type Name"
                      type="text"
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
                  {isAdd ? "Add Case Type" : "Update Case Type"}
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
export default AddCaseTypeForm;
