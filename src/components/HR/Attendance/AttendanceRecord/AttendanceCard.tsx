import React, { useEffect, useState } from "react";
import {
  Avatar,
  Typography,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IEmployee } from "../IAttendance";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration"; 
dayjs.extend(duration);
interface AttendanceCardProps {
  employee: IEmployee;
}

const getRowStyle = (attendanceType: string) => {
  switch (attendanceType.toLowerCase()) {
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

const AttendanceCard: React.FC<AttendanceCardProps> = ({ employee }) => {
  const [timePassed, setTimePassed] = useState<string>("");
  const link = `/hr/attendance/${employee.employeeId}`;
  const ui = getRowStyle(employee.todaysAttendance);

  const avatarContent = employee.profileImage ? (
    <Avatar src={employee.profileImage} alt={employee.employeeName} />
  ) : (
    <Avatar>{employee.employeeName?.charAt(0)}</Avatar>
  );

  const calculateTotalHours = (inTime: string | null) => {
    let outTime;
    if (checkExistOutTime()) {
      const start = dayjs(inTime, "HH:mm");
      const out = dayjs(employee.todayOutTime, "HH:mm");
      const diffInMilliseconds = out.diff(start);
      const diffDuration = dayjs.duration(diffInMilliseconds);
      const hours = Math.floor(diffDuration.asHours());
      const minutes = diffDuration.minutes();
      const seconds = diffDuration.seconds();
      setTimePassed(`${hours}:${minutes}:${seconds}`);
      return;
    } else {
      outTime = dayjs();
    }

    if (inTime) {
      const start = dayjs(inTime, "HH:mm");
      if (start.isValid()) {
        const diffInMilliseconds = outTime.diff(start);
        const diffDuration = dayjs.duration(diffInMilliseconds);
        const hours = Math.floor(diffDuration.asHours());
        const minutes = diffDuration.minutes();
        const seconds = diffDuration.seconds();
        setTimePassed(`${hours}:${minutes}:${seconds}`);
      }
    }
  };
  const checkExistOutTime = () => {
    if (
      employee &&
      employee.todayOutTime &&
      employee.todayOutTime !== "0 hours 0 mins"
    ) {
      return true;
    }
    return false;
  };

  const checkExistInTime = () => {
    if (
      employee &&
      employee.todayInTime &&
      employee.todayInTime !== "0 hours 0 mins"
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (checkExistInTime()) {
      const inTime = employee?.todayInTime || null;
      calculateTotalHours(inTime);
      const intervalId = setInterval(() => {
        if (!checkExistOutTime()) {
          calculateTotalHours(inTime);
        } else {
          clearInterval(intervalId);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }

    // eslint-disable-next-line
  }, [employee]);
  return (
    <Grid item xs={12} sm={6} md={4} lg={4}>
      <Link to={link} style={{ textDecoration: "none", position: "relative" }}>
        <Box
          sx={{
            ...ui,
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            ":hover": {
              transform: "scale(1.05)",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
            },
          }}
        >
          {/* Avatar and Name */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            mb={2}
          >
            {avatarContent}
            <Typography
              variant="body2"
              sx={{
                ml: 2,
                fontSize: "1.1rem",
                fontWeight: "bold",
                color: ui.color,
              }}
            >
              {employee.employeeName?.toUpperCase()}
            </Typography>
          </Box>

          {/* Status Icons */}
          <Box display="flex" justifyContent="space-around" width="100%" mt={2}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <CancelIcon className="text-red-500" fontSize="large" />
              <Typography variant="body1" fontWeight="bold">
                {employee.leave}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Leave
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <AccessAlarmIcon className="text-yellow-500" fontSize="large" />
              <Typography variant="body1" fontWeight="bold">
                {employee.halfDay}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Half Day
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <CheckCircleIcon className="text-green-500" fontSize="large" />
              <Typography variant="body1" fontWeight="bold">
                {employee.present}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Present
              </Typography>
            </Box>
          </Box>

          {/* Today's Attendance */}
          <Typography
            variant="body2"
            mt={2}
            color={ui.color}
            fontWeight="medium"
          >
            Today -{" "}
            {employee.todaysAttendance === "Default"
              ? "No Record"
              : employee.todaysAttendance}
          </Typography>
        </Box>
        <IconButton
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            color: `{${getRowStyle(employee.todaysAttendance)}}`,
            fontWeight: "medium",
            fontSize: "12px",
          }}
        >
          <AvTimerIcon />
          {timePassed}
        </IconButton>
      </Link>
    </Grid>
  );
};

export default AttendanceCard;
