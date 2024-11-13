import React from "react";
import { TextField, Button, Grid } from "@mui/material";
import { IBlogCategoryForm } from "../IBlogCategory";
import { Form, Field } from "react-final-form";
import { setIn } from "final-form";
import * as yup from "yup";
import { ADD, header } from "../../../../context/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { blogCategoryPath } from "../../../../sitemap";
import toast, { Toaster } from "react-hot-toast";
import addBlogCategoryServices from "../../../../api/Website/Category/AddBlogCategory/addBlogCategoryServices";
import editBlogCategoryService from "../../../../api/Website/Category/EditBlogCategory/editBlogCategoryService";
export interface addPolicyTypeFormProps {
  initialValues: IBlogCategoryForm;
}
const AddBlogCategoryForm = (props: addPolicyTypeFormProps) => {
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
    category: yup
      .string()
      .required("Category Name is required")
      .min(1, "Category must be at least 1 character")
      .max(100, "Category cannot exceed 100 characters"),
  });
  const validate = validateFormValues(validationSchema);
  const onSubmit = async (category: IBlogCategoryForm) => {
    if (isAdd) {
      callAddCategoryAPI(category);
    } else {
      callEditCategoryAPI(category);
    }
  };
  const navigateToCategories = (message: string) => {
    navigate(blogCategoryPath(), {
      state: message,
    });
  };
  const callAddCategoryAPI = async (category: IBlogCategoryForm) => {
    try {
      const newCategory = await addBlogCategoryServices({ header, category });
      navigateToCategories(`${newCategory.message}`);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  const callEditCategoryAPI = async (category: IBlogCategoryForm) => {
    try {
      const newCategory = await editBlogCategoryService({ header, category });
      navigateToCategories(`${newCategory.message}`);
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
                <Field name="category">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      label="Enter Category Name"
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
                  {isAdd ? "Add Category" : "Update Category"}
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
export default AddBlogCategoryForm;
