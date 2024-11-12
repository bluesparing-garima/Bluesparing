import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { ADD, header } from "../../../../context/constant";
import { ICaseTypeForm } from "../ICaseTypes";
import AddCaseTypeForm from "./addCaseTypeForm";
import getCaseTypeDetailsService from "../../../../api/CaseType/GetCaseTypeDetails/getCaseTypeDetailsService";
import { convertICaseTypeVMToICaseTypeForm } from "../../../../api/CaseType/convertICaseTypeVMToICaseTypeForm";
import toast, { Toaster } from "react-hot-toast";
const AddCaseType = () => {
  const { caseTypeId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [editCaseTypeDetails, setEditCaseTypeDetails] = useState<ICaseTypeForm | undefined>(
    undefined
  );
  useEffect(() => {
    if (!isAdd && caseTypeId) {
      getCaseTypeDetailsService({ header, caseTypeId })
        .then((caseTypeDetails) => {
          const caseTypeVMToCaseTypeForm = convertICaseTypeVMToICaseTypeForm(caseTypeDetails);
          setEditCaseTypeDetails(caseTypeVMToCaseTypeForm);
        })
        .catch(async(error) => {
          const err = await error
          toast.error(err.message)
        });
    }
  }, [isAdd, caseTypeId]);
  const title = isAdd ? "Add Case Type" : "Update Case Type";
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
          <Link to="/casetype" className="text-addButton font-bold text-sm">
            Case Types /
          </Link>
          <span className="text-grey-600 text-sm"> {title}</span>
          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
        </Typography>
        <AddCaseTypeForm
          initialValues={{
            id: isAdd ? "0" : editCaseTypeDetails?.id || "",
            caseType: isAdd ? "" : editCaseTypeDetails?.caseType || "",
            createdBy: "Admin",
          }}
        />
      </Paper>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};
export default AddCaseType;
