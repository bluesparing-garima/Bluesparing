import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { ADD, header } from "../../../../context/constant";
import { IMakeForm } from "../IMake";
import AddMakeForm from "./addMakeForm";
import getMakeDetailsService from "../../../../api/Make/GetMakeDetails/getMakeDetailsService";
import { convertIMakeVMToIMakeForm } from "../../../../api/Make/convertIMakeVMToIMakeForm";
import toast, { Toaster } from "react-hot-toast";
const AddMake = () => {
  const { makeId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [editMakeDetails, setEditMakeDetails] = useState<IMakeForm | undefined>(
    undefined
  );
  useEffect(() => {
    if (!isAdd && makeId) {
      getMakeDetailsService({ header, makeId })
        .then((makeDetails) => {
          const makeVMToMakeForm = convertIMakeVMToIMakeForm(makeDetails);
          setEditMakeDetails(makeVMToMakeForm);
        })
        .catch(async(error) => {
          const err = await error
          toast.error(err.message)
        });
    }
  }, [isAdd, makeId]);
  const title = isAdd ? "Add Make" : "Update Make";
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
          <Link to="/makes" className="text-addButton font-bold text-sm">
            Makes /
          </Link>
          <span className="text-grey-600 text-sm"> {title}</span>
          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
        </Typography>
        <AddMakeForm
          initialValues={{
            id: isAdd ? "0" : editMakeDetails?.id || "",
            makeName: isAdd ? "" : editMakeDetails?.makeName || "",
            createdBy: "Admin",
          }}
        />
      </Paper>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};
export default AddMake;
