/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  Autocomplete,
} from "@mui/material";
import { IModelForm } from "../IModel";
import { Form, Field } from "react-final-form";
import { setIn } from "final-form";
import * as yup from "yup";
import { ADD, header } from "../../../../context/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { modelPath } from "../../../../sitemap";
import { IMakes } from "../../Make/IMake";
import useGetMakes from "../../../../Hooks/Make/useGetMakes";
import editModelService from "../../../../api/Model/EditMake/editModelService";
import addModelService from "../../../../api/Model/AddMake/addModelService";
import validateModelService from "../../../../api/Model/ValidateModel/validateModelService";
import toast, { Toaster } from "react-hot-toast";

export interface addModelFormProps {
  initialValues: IModelForm;
}

const AddModelForm = (props: addModelFormProps) => {
  let [makes] = useGetMakes({ header: header });
  const [selectedMakeName, setSelectedMakeName] = useState("");
  const [selectedMakeId, setSelectedMakeId] = useState("");

  const { initialValues } = props;
  const navigate = useNavigate();
  const location = useLocation() as any;
  const pathName = location.pathname.split("/");
  const isAddEdit = pathName[pathName.length - 1] as string;
  const isAdd = isAddEdit === ADD;
  const [errorMessage, setErrorMessage] = useState("");
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
    modelName: yup
      .string()
      .required("Model Name is required")
      .min(1, "Model must be at least 1 character")
      .max(100, "Model cannot exceed 100 characters"),
  });

  const validate = validateFormValues(validationSchema);

  const onSubmit = async (model: IModelForm) => {
    model.makeId = selectedMakeId ? selectedMakeId : model.makeId;
    model.makeName = selectedMakeName ? selectedMakeName : model.makeName;
    if (isAdd) {
      callAddModelAPI(model);
    } else {
      callEditModelAPI(model);
    }
  };

  const navigateToModels = (message: string) => {
    navigate(modelPath(), {
      state: message,
    });
  };

  const callAddModelAPI = async (model: IModelForm) => {
    try {
      const newModel = await addModelService({ header, model });
      navigateToModels(`${newModel.message}`);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };

  const callEditModelAPI = async (model: IModelForm) => {
    try {
      const newModel = await editModelService({ header, model });
      navigateToModels(`${newModel.message}`);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  const handleSelectMake = async (e: IMakes) => {
    if (e) {
      setSelectedMakeId(e._id!);
      setSelectedMakeName(e.makeName!);
    }
  };
  const ValidateModel = async (e: any) => {
    const modelName = e.target.value;
    try {
      const modelResponse = await validateModelService({
        header,
        modelName,
      });
      if (modelResponse.exist === true) {
        setErrorMessage(modelResponse.message);
      } else {
        setErrorMessage("");
      }
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
              <Grid item xs={6}>
                <Field name="makeName">
                  {({ input, meta }) => (
                    <div>
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          {...input}
                          id="makeName"
                          value={
                            input.value !== undefined
                              ? input.value
                              : initialValues.makeName || null
                          }
                          options={makes} // Replace with your options array
                          getOptionLabel={(option) =>
                            typeof option === "string"
                              ? option
                              : option.makeName || ""
                          }
                          onChange={(event, newValue) => {
                            input.onChange(newValue);
                            handleSelectMake(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=" Select Make Name"
                              className="rounded-sm w-full"
                              size="small"
                              variant="outlined"
                              error={meta.touched && !!meta.error}
                              helperText={meta.touched && meta.error}
                            />
                          )}
                        />
                      </FormControl>
                    </div>
                  )}
                </Field>
              </Grid>
              <Grid item sm={6}>
                <Field name="modelName">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      size="small"
                      label="Enter Model Name"
                      variant="outlined"
                      type="text"
                      onChangeCapture={ValidateModel}
                      className="rounded-sm w-full"
                      error={
                        (meta.touched && Boolean(meta.error)) ||
                        Boolean(errorMessage)
                      }
                      helperText={(meta.touched && meta.error) || errorMessage}
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
                  {isAdd ? "Add Model" : "Update Model"}
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

export default AddModelForm;
