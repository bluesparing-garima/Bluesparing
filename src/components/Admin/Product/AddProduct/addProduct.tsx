import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { ADD, header } from "../../../../context/constant";
import { IProductForm } from "../IProduct";
import AddProductForm from "./addProductForm";
import getProductDetailsService from "../../../../api/Product/GetProductDetails/getProductDetailsService";
import { convertIProductVMToIProductForm } from "../../../../api/Product/convertIProductVMToIProductForm";
import toast, { Toaster } from "react-hot-toast";
const AddProduct = () => {
  const { productId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [editProductDetails, setEditProductDetails] = useState<IProductForm>();
  useEffect(() => {
    if (!isAdd && productId) {
      getProductDetailsService({ header, productId })
        .then((productDetails) => {
          const productVMToProductForm =
            convertIProductVMToIProductForm(productDetails);
          setEditProductDetails(productVMToProductForm);
        })
        .catch(async(error) => {
          const err = await error
          toast.error(err.message)
        });
    }
  }, [isAdd, productId]);
  const title = isAdd ? "Add Product" : "Update Product";
  return (
    <div className="bg-blue-200 md:p-7 ">
      <Paper
        elevation={3}
        style={{ padding: 20, margin: 30, borderRadius: 10 }}
      >
        <Typography className="text-safekaroDarkOrange" variant="h5">
          {title}
        </Typography>
        <Typography variant="h5" mb={2}>
          <Link to="/dashboard" className="text-addButton font-bold text-sm">
            Dashboard {" / "}
          </Link>
          <Link to="/products" className="text-addButton font-bold text-sm">
            Products /
          </Link>
          <span className="text-grey-600 text-sm"> {title}</span>
          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
        </Typography>
        <AddProductForm
          initialValues={{
            id: isAdd ? "0" : editProductDetails?.id || "",
            categoryId: isAdd ? "0" : editProductDetails?.categoryId || "",
            categoryName: isAdd ? "" : editProductDetails?.categoryName || "",
            productName: isAdd ? "" : editProductDetails?.productName || "",
            createdBy: "Admin",
          }}
        />
      </Paper>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};
export default AddProduct;
