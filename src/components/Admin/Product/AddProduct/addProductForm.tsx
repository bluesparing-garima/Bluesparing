import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  Autocomplete,
} from "@mui/material";
import addProductService from "../../../../api/Product/AddProduct/addProductService";
import editProductService from "../../../../api/Product/EditProduct/editProductService";
import { IProductForm } from "../IProduct";
import { Form, Field } from "react-final-form";
import { setIn } from "final-form";
import * as yup from "yup";
import { ADD, header } from "../../../../context/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { productPath } from "../../../../sitemap";
import useGetCatgories from "../../../../Hooks/Category/useGetCategories";
import { ICategories } from "../../Category/ICategory";
import toast, { Toaster } from "react-hot-toast";
export interface addProductFormProps {
  initialValues: IProductForm;
}
const AddProductForm = (props: addProductFormProps) => {
  let [categories] = useGetCatgories({ header: header });
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
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
    productName: yup
      .string()
      .required("Product Name is required")
      .min(1, "Product must be at least 1 character")
      .max(100, "Product cannot exceed 100 characters"),
  });
  const validate = validateFormValues(validationSchema);
  const onSubmit = async (product: IProductForm) => {
    product.categoryId = selectedCategoryId
      ? selectedCategoryId
      : product.categoryId;
    product.categoryName = selectedCategoryName
      ? selectedCategoryName
      : product.categoryName;
    if (isAdd) {
      callAddProductAPI(product);
    } else {
      callEditProductAPI(product);
    }
  };
  const navigateToProducts = (message: string) => {
    navigate(productPath(), {
      state: message,
    });
  };
  const callAddProductAPI = async (product: IProductForm) => {
    try {
      const newProduct = await addProductService({ header, product });
      navigateToProducts(`${newProduct.message}`);
    } catch (error:any) {
      const err = await error
      toast.error(err.message)
    }
  };
  const callEditProductAPI = async (product: IProductForm) => {
    try {
      const newProduct = await editProductService({ header, product });
      navigateToProducts(`${newProduct.message}`);
    } catch (error:any) {
      const err = await error
      toast.error(err.message)
    }
  };
  const handleSelectCategory = async (e: ICategories) => {
    setSelectedCategoryId(e._id!);
    setSelectedCategoryName(e.categoryName!);
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
              <Field name="categoryName">
                {({ input, meta }) => (
                  <div>
                    <FormControl fullWidth size="small">
                      <Autocomplete
                        {...input}
                        id="categoryName"
                        value={
                          input.value !== undefined
                            ? input.value
                            : initialValues.categoryName || null
                        }
                        options={categories}
                        getOptionLabel={(option) =>
                          typeof option === "string"
                            ? option
                            : option.categoryName || ""
                        }
                        onChange={(event, newValue) => {
                          input.onChange(newValue);
                          handleSelectCategory(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label=" Select Product"
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
              <Field name="productName">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    size="small"
                    label="Enter Product Name"
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
                {isAdd ? "Add Product" : "Update Product"}
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
export default AddProductForm;
