import React from "react";
import { Typography, Paper } from "@mui/material";
import AddLeadFormCard from "./AddLeadForm";
import { Link } from "react-router-dom";
const AddLead = () => {
  const title = "Add Lead";
  return (
    <>
      <div className="md:p-4 p-2">
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
            <Link to="/lead" className="text-addButton font-bold text-sm">
              Lead /
            </Link>
            <span className="text-grey-600 text-sm">{title}</span>
            
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>
          <AddLeadFormCard
            initialValues={{
              category: "Motor",
              policyType: "",
              caseType: "",
              companyName: "",
              partnerId: "",
              partnerName: "",
              relationshipManagerId: "",
              relationshipManagerName: "",
              status: "",
              leadCreatedBy: "",
              rcFront: "",
              rcBack: "",
              previousPolicy: "",
              survey: "",
              puc: "",
              fitness: "",
              proposal: "",
              currentPolicy: "",
              other: "",
              remarks: "",
              isActive: true,
              createdBy: "",
            }}
          />
        </Paper>
      </div>
    </>
  );
};
export default AddLead;
