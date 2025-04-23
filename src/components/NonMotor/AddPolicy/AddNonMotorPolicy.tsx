import { Typography, Paper } from "@mui/material";
import AddNonMotorPolicyFormCard from "./AddNonMotorPolicyFormCard";
import { Link } from "react-router-dom";
const AddNonMotorPolicy = () => {
  const title = "Add Non Motor Policy";
  return (
    <>
      <div className=" md:p-7 p-2">
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
            <Link to="/policy/motorpolicies" className="text-addButton font-bold text-sm">
              Policy /
            </Link>
            <span className="text-grey-600 text-sm">{title}</span>
            {/* Add a full-width grey line here */}
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>

          <AddNonMotorPolicyFormCard />
        </Paper>
      </div>
    </>
  );
};

export default AddNonMotorPolicy;
