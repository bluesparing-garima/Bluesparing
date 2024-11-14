import React from "react";
import { Typography, Paper } from "@mui/material";
import AddPolicyFormCard from "./AddPolicyFormCard";
import { Link } from "react-router-dom";
const AddPolicy = () => {
  const title = "Add Motor Policy";
  return (
    <>
      <div className="bg-blue-200 md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography
            variant="h5"
            className="text-safekaroDarkOrange"
            gutterBottom
            display="inline"
          >
            {title}
          </Typography>
          <Typography variant="h5" mb={2}>
            <Link to="/dashboard" className="text-addButton font-bold text-sm">
              Dashboard {" / "}
            </Link>
            <Link to="/policy/motor-policies" className="text-addButton font-bold text-sm">
              Policy /
            </Link>
            <span className="text-grey-600 text-sm">{title}</span>
            
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>
          <AddPolicyFormCard />
        </Paper>
      </div>
    </>
  );
};
export default AddPolicy;
