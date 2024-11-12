/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { TextField, Button, Grid } from "@mui/material";
import addRankService from "../../../../api/Rank/AddRank/addRankService";
import editRankService from "../../../../api/Rank/EditRank/editRankService";
import { IRankForm } from "../IRank";
import { Form, Field } from "react-final-form";
import { setIn } from "final-form";
import * as yup from "yup";
import { ADD, header } from "../../../../context/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { rankPath } from "../../../../sitemap";
import toast, { Toaster } from "react-hot-toast";

export interface addRankFormProps {
  initialValues: IRankForm;
}

const AddRankForm = (props: addRankFormProps) => {
  const { initialValues } = props;
  const navigate = useNavigate();
  const location = useLocation() as any;
  const pathName = location.pathname.split("/");
  const isAddEdit = pathName[pathName.length - 1] as string;
  const isAdd = isAddEdit === ADD;

  // To be passed to React Final Form
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
    rank: yup
      .string()
      .required("Rank Name is required")
      .min(1, "Rank must be at least 1 character")
      .max(100, "Rank cannot exceed 100 characters"),
    count: yup
      .number()
      .required("Count is required")
      .min(1, "Rank must be at least 1 character"),
  });

  const validate = validateFormValues(validationSchema);

  const onSubmit = async (rank: IRankForm) => {
    if (isAdd) {
      callAddRankAPI(rank);
    } else {
      callEditRankAPI(rank);
    }
  };

  const navigateToRanks = (message: string) => {
    navigate(rankPath(), {
      state: message,
    });
  };

  const callAddRankAPI = async (rank: IRankForm) => {
    try {
      const newRank = await addRankService({ header, rank });
      navigateToRanks(`${newRank.message}`);
    } catch (err: any) {
      const errObj = await err;
      toast.error(errObj.message);
    }
  };

  const callEditRankAPI = async (rank: IRankForm) => {
    try {
      const newRank = await editRankService({ header, rank });
      navigateToRanks(`${newRank.message}`);
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
              <Grid item sm={6}>
                <Field name="rank">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      label="Enter Rank Name"
                      type="text"
                      variant="outlined"
                      className="rounded-sm w-full"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item sm={6}>
                <Field name="count">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      label="Enter Policy Count"
                      type="number"
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
                  {isAdd ? "Add Rank" : "Update Rank"}
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

export default AddRankForm;
