import React, { useEffect, useState } from "react";
import {
  Avatar,
  Typography,
  Badge,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IAttendance, IEmployee } from "../IAttendnace";
import duration from "dayjs/plugin/duration";
import MarkInTime from "./MarkInTime";
import MarkOutTime from "./MarkOutTime";
import dayjs from "dayjs";

dayjs.extend(duration);

interface AttendanceCardProps {
  employee: IEmployee;
  attendance: IAttendance | null;
  setAttendance: React.Dispatch<
    React.SetStateAction<IAttendance | null | undefined>
  >;
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

const MarkAttendanceCard: React.FC<AttendanceCardProps> = ({
  employee,
  attendance,
  setAttendance,
}) => {
  const ui = getRowStyle(
    attendance?.attendanceType || employee.todaysAttendance
  );
  const [timePassed, setTimePassed] = useState<string>("");
  const checkExistOutTime = () => {
    if (attendance && attendance.outTime && attendance.outTime !== "00:00") {
      return true;
    }
    return false;
  };
  const calculateTotalHours = (inTime: string | null) => {
    let outTime;
    if (checkExistOutTime()) {
      setTimePassed(attendance?.totalHours || "");
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

  useEffect(() => {
    const inTime = attendance?.inTime || null;
    calculateTotalHours(inTime);
    const intervalId = setInterval(() => {
      if (!checkExistOutTime()) {
        calculateTotalHours(inTime);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, [attendance]);

  const avatarContent = employee.profileImage ? (
    <Avatar src={employee.profileImage} alt={employee.employeeName} />
  ) : (
    <Avatar>{employee.employeeName.charAt(0)}</Avatar>
  );

  return (
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
        margin: "20px",
      }}
    >
      <Card
        sx={{
          ...ui,
          borderRadius: 2,
          boxShadow: 3,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          position: "relative",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: 6,
          },
        }}
      >
        <CardContent>
          <div className="flex items-center mb-4">
            {avatarContent}
            <Typography
              variant="h6"
              className="ml-2"
              style={{ color: ui.color }}
            >
              {employee.employeeName.toUpperCase()}
            </Typography>
          </div>

          {/* Status Icons */}
          <div className="flex justify-around mt-2">
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
            className="mt-4"
            style={{ color: ui.color }}
          >
            Today -{" "}
            <span className="font-bold">
              {employee.todaysAttendance === "Default"
                ? "No Record"
                : employee.todaysAttendance}
            </span>
          </Typography>
        </CardContent>

        <CardActions
          sx={{ justifyContent: "space-between", padding: "8px 16px" }}
        >
          <Button
            size="small"
            sx={{
              padding: "4px 8px",
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#FCFAEE",
              color: "white",
              "&:hover": {
                backgroundColor: "#FADFA1",
              },
            }}
          >
            <MarkInTime attendance={attendance} setAttendance={setAttendance} />
          </Button>

          <Button
            size="small"
            sx={{
              padding: "4px 8px",
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#FCFAEE",
              color: "white",
              "&:hover": {
                backgroundColor: "#FADFA1",
              },
            }}
          >
            <MarkOutTime
              attendance={attendance}
              setAttendance={setAttendance}
            />
          </Button>
        </CardActions>
      </Card>
    </Badge>
  );
};

export default MarkAttendanceCard;