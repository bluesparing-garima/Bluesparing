import React from "react";
import { TextField, Button, Grid } from "@mui/material";
import addBranchService from "../../../../api/Branch/AddBranch/addBranchService";
import editBranchService from "../../../../api/Branch/EditBranch/editBranchService";
import { IBranchForm } from "../IBranch";
import { Form, Field } from "react-final-form";
import { setIn } from "final-form";
import * as yup from "yup";
import { ADD, header } from "../../../../context/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { branchPath } from "../../../../sitemap";
import toast, { Toaster } from "react-hot-toast";
export interface addBranchFormProps {
  initialValues: IBranchForm;
}
const AddBranchForm = (props: addBranchFormProps) => {
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
    branchName: yup
      .string()
      .required("Branch Name is required")
      .min(1, "Branch must be at least 1 character")
      .max(100, "Branch cannot exceed 100 characters"),
  });
  const validate = validateFormValues(validationSchema);
  const onSubmit = async (branch: IBranchForm) => {
    if (isAdd) {
      callAddBranchAPI(branch);
    } else {
      callEditBranchAPI(branch);
    }
  };
  const navigateToBranches = (message: string) => {
    navigate(branchPath(), {
      state: message,
    });
  };
  const callAddBranchAPI = async (branch: IBranchForm) => {
    try {
      const newBranch = await addBranchService({ header, branch });
      navigateToBranches(`${newBranch.message}`);
    } catch (err: any) {
      const errObj = await err;
      toast.error(errObj.message);
    }
  };
  const callEditBranchAPI = async (branch: IBranchForm) => {
    try {
      const newBranch = await editBranchService({ header, branch });
      navigateToBranches(`${newBranch.message}`);
    } catch (err: any) {
      const errObj = await err;
      toast.error(errObj.message);
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
                <Field name="branchName">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      label="Enter Branch Name"
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
                  {isAdd ? "Add Branch" : "Update Branch"}
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
export default AddBranchForm;
