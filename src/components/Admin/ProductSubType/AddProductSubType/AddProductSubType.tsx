import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { ADD, header } from "../../../../context/constant";
import { IProductSubTypeForm } from "../IProductSubTypes";
import AddProductSubTypeForm from "./AddProductSubTypeForm";
import getProductSubTypeDetailsService from "../../../../api/ProductSubType/GetProductSubTypeDetails/getProductSubTypeDetailsService";
import { convertIProductSubTypeVMToIProductSubTypeForm } from "../../../../api/ProductSubType/convertIProductSubTypeVMToIProductSubTypeForm";
import toast, { Toaster } from "react-hot-toast";

const AddProductSubType = () => {
  const { productId } = useParams();
  const { productSubTypeId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [editProductSubTypeDetails, setEditProductSubTypeDetails] = useState<
    IProductSubTypeForm | undefined
  >(undefined);

  useEffect(() => {
    if (!isAdd && productSubTypeId) {
      getProductSubTypeDetailsService({ header, productSubTypeId })
        .then((productSubTypeDetails) => {
          const productSubTypeVMToProductSubTypeForm =
            convertIProductSubTypeVMToIProductSubTypeForm(
              productSubTypeDetails
            );
          setEditProductSubTypeDetails(productSubTypeVMToProductSubTypeForm);
        })
        .catch(async(error:any) => {
          const err = await error
          toast.error(err.message)
       
        });
    }
  }, [isAdd, productSubTypeId]);

  const title = isAdd
    ? "Add Product Sub Category"
    : "Update Product Sub Category";

  return (
    <div className="bg-blue-200 md:p-7">
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
            Product /
          </Link>
          <Link
            to="/subproducts"
            className="text-addButton font-bold text-sm"
          >
            Product Sub Category /
          </Link>
          <span className="text-grey-600 text-sm"> {title}</span>
          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
        </Typography>

        <AddProductSubTypeForm
          initialValues={{
            id: isAdd ? "0" : editProductSubTypeDetails?.id || "",
            productId: isAdd
              ? productId
                ? productId
                : "0"
              : editProductSubTypeDetails?.productId || "",
            productName: isAdd
              ? ""
              : editProductSubTypeDetails?.productName || "",
            productSubType: isAdd
              ? ""
              : editProductSubTypeDetails?.productSubType || "",
            createdBy: "Admin",
          }}
        />
      </Paper>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default AddProductSubType;
