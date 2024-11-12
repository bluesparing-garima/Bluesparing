import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { ADD, header } from "../../../../context/constant";
import { IRankForm } from "../IRank";
import AddRankForm from "./addRankForm";
import getRankDetailsService from "../../../../api/Rank/GetRankDetails/getRankDetailsService";
import { convertIRankVMToIRankForm } from "../../../../api/Rank/convertIRankVMToIRankForm";
import toast, { Toaster } from "react-hot-toast";

const AddRank = () => {
  const { rankId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [editRankDetails, setEditRankDetails] = useState<IRankForm | undefined>(
    undefined
  );

  useEffect(() => {
    if (!isAdd && rankId) {
      getRankDetailsService({ header, rankId })
        .then((rankDetails) => {
          const rankVMToRankForm = convertIRankVMToIRankForm(rankDetails);
          setEditRankDetails(rankVMToRankForm);
        })
        .catch(async (error: any) => {
          const err = await error;
          toast.error(err.message);
        });
    }
  }, [isAdd, rankId]);

  const title = isAdd ? "Add Rank" : "Update Rank";

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
          <Link to="/ranks" className="text-addButton font-bold text-sm">
            Ranks /
          </Link>
          <span className="text-grey-600 text-sm"> {title}</span>
          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
        </Typography>

        <AddRankForm
          initialValues={{
            id: isAdd ? "0" : editRankDetails?.id || "",
            rank: isAdd ? "" : editRankDetails?.rank || "",
            count: isAdd ? 0 : editRankDetails?.count || 0,
            createdBy: "Admin",
          }}
        />
      </Paper>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default AddRank;
