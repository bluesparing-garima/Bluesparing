import React, { useEffect, useState } from "react";
import {
  Avatar,
  Typography,
  Grid,
  Box,
  IconButton,
  Badge,
  Card,
  CardContent,
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
    <>
        <Link
          to={link}
          style={{ textDecoration: "none", position: "relative" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "auto",
              padding:'20px 0'
            }}
          >
            <Badge
              color="primary"
              badgeContent={timePassed}
              overlap="circular"
              sx={{
                "& .MuiBadge-dot": {
                  height: "12px",
                  width: "12px",
                  borderRadius: "50%",
                },
              }}
            >
              <Card
                sx={{
                  ...ui,
                  padding: "20px",
                  borderRadius: 3,
                  boxShadow: "0 0 20px 10px #F2DDD4",
                  color: "black",
                  border: "none",
                  background: "#fff",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  position: "relative",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0 0 30px 15px #F2DDD4",
                  },
                }}
                className="sm:w-[50vw]"
              >
                <CardContent>
                  <div className="flex items-center mb-4">
                    {avatarContent}
                    <Typography
                      variant="h5"
                      className="ml-2"
                      sx={{ color: "#F15729" }}
                    >
                      {employee.employeeName?.toUpperCase()}
                    </Typography>
                  </div>

                  {/* Status Icons */}
                  <div className="flex justify-around mt-4">
                    <div className="flex flex-col items-center">
                      <CancelIcon className="text-red-500" fontSize="large" />
                      <Typography variant="h6">{employee.leave}</Typography>
                      <Typography variant="caption">Leave</Typography>
                    </div>
                    <div className="flex flex-col items-center">
                      <AccessAlarmIcon
                        className="text-yellow-500"
                        fontSize="large"
                      />
                      <Typography variant="h6">{employee.halfDay}</Typography>
                      <Typography variant="caption">Half Day</Typography>
                    </div>
                    <div className="flex flex-col items-center">
                      <CheckCircleIcon
                        className="text-green-500"
                        fontSize="large"
                      />
                      <Typography variant="h6">{employee.present}</Typography>
                      <Typography variant="caption">Present</Typography>
                    </div>
                  </div>

                  <Typography variant="body1" sx={{ mt: 4, color: "#F15729" }}>
                    Today -{" "}
                    <strong>
                      {employee.todaysAttendance === "Default"
                        ? "No Record"
                        : employee.todaysAttendance}
                    </strong>
                  </Typography>
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
                </CardContent>
              </Card>
            </Badge>
          </Box>
        </Link>
    </>
  );
};

export default AttendanceCard;
