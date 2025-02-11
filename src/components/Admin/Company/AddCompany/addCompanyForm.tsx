import { TextField, Button, Grid } from "@mui/material";
import addCompanyService from "../../../../api/Company/AddCompany/addCompanyServices";
import editCompanyService from "../../../../api/Company/EditCompany/editCompanyService";
import { ICompanyForm } from "../ICompany";
import { Form, Field } from "react-final-form";
import { setIn } from "final-form";
import * as yup from "yup";
import { ADD, header } from "../../../../context/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { companyPath } from "../../../../sitemap";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
export interface addCompanyFormProps {
  initialValues: ICompanyForm;
}
const AddCompanyForm = (props: addCompanyFormProps) => {
  const { initialValues } = props;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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
    companyName: yup
      .string()
      .required("Company Name is required")
      .min(1, "Company must be at least 1 character")
      .max(100, "Company cannot exceed 100 characters"),
  });
  const validate = validateFormValues(validationSchema);

  const onSubmit = async (company: ICompanyForm) => {
    if (isAdd) {
      callAddCompanyAPI(company);
    } else {
      callEditCompanyAPI(company);
    }
  };
  const navigateToCompany = (message: string) => {
    navigate(companyPath(), {
      state: message,
    });
  };
  const callAddCompanyAPI = async (company: ICompanyForm) => {
    try {
      setIsLoading(true);
      const newCompany = await addCompanyService({ header, company });
      navigateToCompany(`${newCompany.message}`);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const callEditCompanyAPI = async (company: ICompanyForm) => {
    try {
      setIsLoading(true);
      const newCompany = await editCompanyService({ header, company });
      navigateToCompany(`${newCompany.message}`);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    } finally {
      setIsLoading(false);
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
                <Field name="companyName">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      label="Enter Company Name"
                      variant="outlined"
                      type="text"
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
                  disabled={isLoading}
                  variant="contained"
                  color="primary"
                  className=" w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                >
                  {isLoading
                    ? "Submitting"
                    : isAdd
                    ? "Add Company"
                    : "Update Company"}
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
export default AddCompanyForm;
