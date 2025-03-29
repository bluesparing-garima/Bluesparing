import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { ADD, header } from "../../../../context/constant";
import { IModelForm } from "../IModel";
import AddModelForm from "./addModelForm";
import { convertIModelVMToIModelForm } from "../../../../api/Model/convertIModelVMToIModelForm";
import getModelDetailsService from "../../../../api/Model/GetMakeDetails/getModelDetailsService";
import toast, { Toaster } from "react-hot-toast";
const AddModel = () => {
  const { modelId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [editModelDetails, setEditModelDetails] = useState<IModelForm | undefined>(
    undefined
  );
  useEffect(() => {
    if (!isAdd && modelId) {
      getModelDetailsService({ header, modelId })
        .then((modelDetails) => {
          const modelVMToModelForm = convertIModelVMToIModelForm(modelDetails);
          setEditModelDetails(modelVMToModelForm);
        })
        .catch(async(error) => {
          const err = await error
          toast.error(err.message)
        });
    }
  }, [isAdd, modelId]);
  const title = isAdd ? "Add Model" : "Update Model";
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
          <Link to="/models" className="text-addButton font-bold text-sm">
            Models /
          </Link>
          <span className="text-grey-600 text-sm"> {title}</span>
          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
        </Typography>
        <AddModelForm
          initialValues={{
            id: isAdd ? "0" : editModelDetails?.id || "",
            makeId: isAdd ? "0" : editModelDetails?.makeId || "",
            makeName: isAdd ? "" : editModelDetails?.makeName || "",
            modelName: isAdd ? "" : editModelDetails?.modelName || "",
            createdBy: "Admin",
          }}
        />
      </Paper>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};
export default AddModel;
