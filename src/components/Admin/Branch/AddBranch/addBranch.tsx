import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { ADD, header } from "../../../../context/constant";
import { IBranchForm } from "../IBranch";
import AddBranchForm from "./addBranchForm";
import getBranchDetailsService from "../../../../api/Branch/GetBranchDetails/getBranchService";
import { convertIBranchVMToIBranchForm } from "../../../../api/Branch/convertIBranchVMToIBranchForm";
import toast, { Toaster } from "react-hot-toast";

const AddBranch = () => {
  const { branchId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [editBranchDetails, setEditBranchDetails] = useState<
    IBranchForm | undefined
  >(undefined);

  useEffect(() => {
    if (!isAdd && branchId) {
      getBranchDetailsService({ header, branchId })
        .then((branchDetails) => {
          const branchVMToBranchForm =
            convertIBranchVMToIBranchForm(branchDetails);
          setEditBranchDetails(branchVMToBranchForm);
        })
        .catch(async (error: any) => {
          const err = await error;
          toast.error(err.message);
        });
    }
  }, [isAdd, branchId]);

  const title = isAdd ? "Add Branch" : "Update Branch";

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
          <Link to="/branch" className="text-addButton font-bold text-sm">
            Branches /
          </Link>
          <span className="text-grey-600 text-sm"> {title}</span>
          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
        </Typography>

        <AddBranchForm
          initialValues={{
            id: isAdd ? "0" : editBranchDetails?.id || "",
            branchName: isAdd ? "" : editBranchDetails?.branchName || "",
            createdBy: "Admin",
          }}
        />
      </Paper>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default AddBranch;
