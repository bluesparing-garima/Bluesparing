import { Typography, Paper } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { AttendanceLocationState } from "../IAttendance";
import { SafeKaroUser } from "../../../../context/constant";
import AddAttendanceForm from "./AddAttendanceForm";
const AddAttendance = () => {
  const location = useLocation();
  const state = location.state as AttendanceLocationState;
  const attendance = state?.attendance;
  const isAdd = !attendance._id;
  const title = isAdd ? "Add Attendance" : "Update Attendance";
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const generateDashBoardLink = () => {
    const role = UserData.role.toLowerCase();
    switch (role) {
      case "hr":
        return "/hr/dashboard";
      case "booking":
        return "/bookingdashboard";
      case "account":
        return "/accountdashboard";
      case "operation":
        return "/operationdashboard";
      case "rm":
        return "/rm/dashboard";
      case "it":
        return "it/dashboard";
      default:
        return "/hr/dashboard";
    }
  };
  return (
    <>
      <div className="bg-blue-200 md:p-7 p-2">
        <Paper
          elevation={3}
          style={{ padding: 20, margin: 30, borderRadius: 10 }}
        >
          <Typography className="text-safekaroDarkOrange" variant="h5">
            {title}
          </Typography>
          <Typography variant="h5" mb={2}>
            <Link
              to="/hr/dashboard"
              className="text-addButton font-bold text-sm"
            >
              Dashboard {" / "}
            </Link>
            <Link
              to={generateDashBoardLink()}
              className="text-addButton font-bold text-sm"
            >
              Attendance /
            </Link>
            <span className="text-grey-600 text-sm"> {title}</span>
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>
          <AddAttendanceForm
            initialValues={{
              ...attendance,
            }}
          />
        </Paper>
      </div>
    </>
  );
};
export default AddAttendance;
