import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Autocomplete,
  FormControl,
} from "@mui/material";
import { IProductSubTypeForm } from "../IProductSubTypes";
import { Form, Field } from "react-final-form";
import { setIn } from "final-form";
import * as yup from "yup";
import { ADD, header } from "../../../../context/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { productSubTypesPath } from "../../../../sitemap";
import useGetProducts from "../../../../Hooks/Product/useGetProducts";
import { IProducts } from "../../Product/IProduct";
import addProductSubTypeService from "../../../../api/ProductSubType/AddProductSubType/addProductSubTypeService";
import editProductSubTypeService from "../../../../api/ProductSubType/EditProductSubType/editProductSubTypeService";
import toast, { Toaster } from "react-hot-toast";
export interface addPolicyTypeFormProps {
  initialValues: IProductSubTypeForm;
}
const AddProductSubTypeForm = (props: addPolicyTypeFormProps) => {
  const { initialValues } = props;
  let [products] = useGetProducts({ header: header,category:"motor" });
  const navigate = useNavigate();
  const [selectedProductName, setSelectedProductName] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
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
    productSubType: yup
      .string()
      .required("Product Type is required")
      .min(1, "Product Type must be at least 1 character")
      .max(100, "ProductSubType cannot exceed 100 characters"),
  });
  const validate = validateFormValues(validationSchema);
  const onSubmit = async (productSubType: IProductSubTypeForm) => {
    productSubType.productName = selectedProductName
      ? selectedProductName
      : productSubType.productName;
    productSubType.productId = selectedProductId
      ? selectedProductId
      : productSubType.productId;
    if (isAdd) {
      callAddProductSubTypeAPI(productSubType);
    } else {
      callEditProductSubTypeAPI(productSubType);
    }
  };
  const navigateToProductSubTypes = (message: string) => {
    navigate(productSubTypesPath(), {
      state: message,
    });
  };
  const callAddProductSubTypeAPI = async (
    productSubType: IProductSubTypeForm
  ) => {
    try {
      const newProductSubType = await addProductSubTypeService({
        header,
        productSubType,
      });
      navigateToProductSubTypes(`${newProductSubType.message}`);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  const handleSelectProduct = async (e: IProducts) => {
    setSelectedProductId(e._id!);
    setSelectedProductName(e.productName!);
  };
  const callEditProductSubTypeAPI = async (
    productSubType: IProductSubTypeForm
  ) => {
    try {
      const newProductSubType = await editProductSubTypeService({
        header,
        productSubType,
      });
      navigateToProductSubTypes(`${newProductSubType.message}`);
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
                <Field name="productName">
                  {({ input, meta }) => (
                    <div>
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          {...input}
                          id="productName"
                          value={
                            input.value !== undefined
                              ? input.value
                              : initialValues.productName || null
                          }
                          options={products}
                          getOptionLabel={(option) =>
                            typeof option === "string"
                              ? option
                              : option.productName || ""
                          }
                          onChange={(event, newValue) => {
                            if (newValue) {
                              input.onChange(newValue);
                              handleSelectProduct(newValue);
                            }
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
                <Field name="productSubType">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      size="small"
                      label="Enter Product Type Name"
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
                  {isAdd ? "Add Product Sub Type" : "Update Product Sub Type"}
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
export default AddProductSubTypeForm;
