import React from "react";
import { Typography, Paper } from "@mui/material";
import PolicyPDFFormCard from "./PolicyPDFFormCard";
import { Link } from "react-router-dom";
const PolicyPDF = () => {
  const title = "Upload PDF Motor Policy";
  return (
    <>
      <div className="h-full md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 25 }}>
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
          <PolicyPDFFormCard />
        </Paper>
      </div>
    </>
  );
};
export default PolicyPDF;
