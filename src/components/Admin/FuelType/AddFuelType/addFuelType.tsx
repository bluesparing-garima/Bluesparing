import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { ADD, header } from "../../../../context/constant";
import { IFuelTypeForm } from "../IFuelTypes";
import AddFuelTypeForm from "./addFuelTypeForm";
import getFuelTypeDetailsService from "../../../../api/FuelType/GetFuelTypeDetails/getFuelTypeDetailsService";
import { convertIFuelTypeVMToIFuelTypeForm } from "../../../../api/FuelType/convertIFuelTypeVMToIFuelTypeForm";
import toast, { Toaster } from "react-hot-toast";
const AddFuelType = () => {
  const { fuelTypeId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [editFuelTypeDetails, setEditFuelTypeDetails] = useState<IFuelTypeForm | undefined>(
    undefined
  );
  useEffect(() => {
    if (!isAdd && fuelTypeId) {
      getFuelTypeDetailsService({ header, fuelTypeId })
        .then((fuelTypeDetails) => {
          const fuelTypeVMToFuelTypeForm = convertIFuelTypeVMToIFuelTypeForm(fuelTypeDetails);
          setEditFuelTypeDetails(fuelTypeVMToFuelTypeForm);
        })
        .catch(async(error) => {
          const err = await error
          toast.error(err.message)
        });
    }
  }, [isAdd, fuelTypeId]);
  const title = isAdd ? "Add Fuel Type" : "Update Fuel Type";
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
          <Link to="/fueltype" className="text-addButton font-bold text-sm">
            Fuel Types /
          </Link>
          <span className="text-grey-600 text-sm"> {title}</span>
          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
        </Typography>
        <AddFuelTypeForm
          initialValues={{
            id: isAdd ? "0" : editFuelTypeDetails?.id || "",
            fuelType: isAdd ? "" : editFuelTypeDetails?.fuelType || "",
            createdBy: "Admin",
          }}
        />
      </Paper>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};
export default AddFuelType;
