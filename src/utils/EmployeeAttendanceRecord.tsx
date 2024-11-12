import { Avatar, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { IEmployee } from "../components/HR/Attendance/IAttendnace";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Present icon
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm"; // Half day icon
import CancelIcon from "@mui/icons-material/Cancel";
const EmployeeAttendanceRecord = () => {
  const getRowStyle = (attendanceType: string) => {
    switch (attendanceType) {
      case "leave":
        return { backgroundColor: "#DB7093", color: "white" };
      case "half day":
        return { backgroundColor: "#F0E68C", color: "black" };
      case "present":
        return { backgroundColor: "#ACE1AF", color: "grey" };
      default:
        return { backgroundColor: "white", color: "black" };
    }
  };

  const renderCountBox = (employee: IEmployee) => {
    const link = `/hr/attendance/${employee.employeeId}`;
    const ui = getRowStyle(employee.todaysAttendance.toLowerCase());

    const avatarContent = employee.profileImage ? (
      <Avatar src={employee.profileImage} alt={employee.employeeName} />
    ) : (
      <Avatar>{employee.employeeName.charAt(0)}</Avatar>
    );

    const content = (
      <div
        style={{
          ...ui,
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        className="m-2 flex flex-col items-center justify-between transform hover:scale-105 hover:shadow-xl"
      >
        {/* Avatar and Name */}
        <div className="flex items-center justify-between w-full mb-4">
          {avatarContent}
          <Typography
            variant="body2"
            className="ml-4 text-lg font-inter font-semibold"
            style={{ color: ui.color }}
          >
            {employee.employeeName.toUpperCase()}
          </Typography>
        </div>

        {/* Status Icons */}
        <div className="flex justify-around w-full mt-2">
          <div className="flex flex-col items-center">
            <CancelIcon className="text-red-500" fontSize="large" />
            <span className="text-sm font-bold">{employee.leave}</span>
            <Typography variant="caption" className="text-gray-600">
              Leave
            </Typography>
          </div>
          <div className="flex flex-col items-center">
            <AccessAlarmIcon className="text-yellow-500" fontSize="large" />
            <span className="text-sm font-bold">{employee.halfDay}</span>
            <Typography variant="caption" className="text-gray-600">
              Half Day
            </Typography>
          </div>
          <div className="flex flex-col items-center">
            <CheckCircleIcon className="text-green-500" fontSize="large" />
            <span className="text-sm font-bold">{employee.present}</span>
            <Typography variant="caption" className="text-gray-600">
              Present
            </Typography>
          </div>
        </div>

        {/* Today's Attendance */}
        <Typography
          variant="body2"
          className="mt-4 text-sm font-inter font-medium"
          style={{ color: ui.color }}
        >
          Today -{" "}
          {employee.todaysAttendance === "Default"
            ? "No Record"
            : employee.todaysAttendance}
        </Typography>
      </div>
    );

    return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Link to={link} style={{ textDecoration: "none" }}>
          {content}
        </Link>
      </Grid>
    );
  };

  return <div>EmployeeAttendanceRecord</div>;
};

export default EmployeeAttendanceRecord;
