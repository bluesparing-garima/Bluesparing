import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { ADD, header, SafeKaroUser } from "../../../../context/constant";
import { IAppUser } from "../ITeam";
import AddTeamForm from "./AddTeamForm";
import getTeamDetailsService from "../../../../api/Team/GetTeamDetails/getTeamDetailsService";
import toast, { Toaster } from "react-hot-toast";
const AddTeam = () => {
  const { teamId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [editTeamDetails, setEditTeamDetails] = useState<IAppUser | undefined>(
    undefined
  );
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  useEffect(() => {
    if (!isAdd && teamId) {
      getTeamDetailsService({ header, teamId })
        .then((teamDetails) => {
          setEditTeamDetails(teamDetails);
        })
        .catch(async (error: any) => {
          const err = await error;
          toast.error(err.message);
        });
    }
  }, [isAdd, teamId]);
  const title = isAdd ? "Add Team" : "Update Team";
  return (
    <>
      <div className="md:p-4 ">
        <Paper
          elevation={3}
          style={{ padding: 20, margin: 30, borderRadius: 10 }}
        >
          <Typography className="text-safekaroDarkOrange" variant="h5">
            {title}
          </Typography>
          <Typography variant="h5" mb={2}>
            <Link
              to={UserData.role === "hr" ? "/hr/dashboard" : "/dashboard"}
              className="text-addButton font-bold text-sm"
            >
              Dashboard {" / "}
            </Link>
            <Link to="/team" className="text-addButton font-bold text-sm">
              Teams /
            </Link>
            <span className="text-grey-600 text-sm"> {title}</span>
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>
          {editTeamDetails ? (
            <AddTeamForm initialValues={editTeamDetails} />
          ) : (
            <AddTeamForm />
          )}
        </Paper>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};
export default AddTeam;
