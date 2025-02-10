import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import addFuelTypeService from "../../../../api/FuelType/AddFuelType/addFuelTypeService";
import { IFuelTypeForm } from "../IFuelTypes";
import { Form, Field } from "react-final-form";
import { setIn } from "final-form";
import * as yup from "yup";
import { ADD, header } from "../../../../context/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { fuelTypesPath } from "../../../../sitemap";
import editFuelTypeService from "../../../../api/FuelType/EditFuelType/editFuelTypeService";
import toast, { Toaster } from "react-hot-toast";
export interface AddFuelTypeFormProps {
  initialValues: IFuelTypeForm;
}
const AddFuelTypeForm = (props: AddFuelTypeFormProps) => {
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
    fuelType: yup
      .string()
      .required("Fuel Type Name is required")
      .min(1, "Fuel Type Name must be at least 1 character")
      .max(100, "Fuel Type Name cannot exceed 100 characters"),
  });
  const validate = validateFormValues(validationSchema);

  const onSubmit = async (fuelType: IFuelTypeForm) => {
    if (isAdd) {
      callAddFuelTypeAPI(fuelType);
    } else {
      callEditFuelTypeAPI(fuelType);
    }
  };
  const navigateToFuelTypes = (message: string) => {
    navigate(fuelTypesPath(), {
      state: message,
    });
  };
  const callAddFuelTypeAPI = async (fuelType: IFuelTypeForm) => {
    try {
      setIsLoading(true);
      const newFuelType = await addFuelTypeService({ header, fuelType });
      navigateToFuelTypes(`${newFuelType.message}`);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const callEditFuelTypeAPI = async (fuelType: IFuelTypeForm) => {
    try {
      setIsLoading(true);
      const updatedFuelType = await editFuelTypeService({ header, fuelType });
      navigateToFuelTypes(`${updatedFuelType.message}`);
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
                <Field name="fuelType">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      label="Enter Fuel Type Name"
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
                    ? "Submitting..."
                    : isAdd
                    ? "Add Fuel Type"
                    : "Update Fuel Type"}
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
export default AddFuelTypeForm;
