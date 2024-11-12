import dayjs from "dayjs";
import { SafeKaroUser } from "../../../../context/constant";
import GetTodayAttendanceRecordService from "../../../../api/HR/Attendance/GetTodayAttendanceRecord/GetEmployeeDepartmentService";
import { header } from "../../../../context/constant";
import { useEffect, useState } from "react";
import { IAttendance, IEmployee } from "../IAttendnace";
import { Button, CircularProgress } from "@mui/material";
import MarkInTime from "./MarkInTime";
import MarkOutTime from "./MarkOutTime";
import GetAttendanceCountService from "../../../../api/Role/GetAttendanceCount/GetAttendanceCountService";
import MarkAttendanceCard from "./MarkAttendanceCard";
import { Grid } from "react-feather";

const MarkAttendance = () => {
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const id = UserData.id;
  const [attendance, setAttendance] = useState<IAttendance | null>();
  const [employee, setEmployee] = useState<IEmployee | null>();

  const getAttendaceRecord = async () => {
    try {
      const res = await GetAttendanceCountService({ header, eId: UserData.id });
      setEmployee(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const Fetchdata = async () => {
    try {
      const now = dayjs().format("YYYY-MM-DD");
      const res = await GetTodayAttendanceRecordService({
        header,
        d: now,
        eId: id,
      });
      setAttendance(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Fetchdata();
    getAttendaceRecord();
    // eslint-disable-next-line
  }, []);

  if (!employee || !attendance) {
    return <CircularProgress />;
  }
  return (
    <>
      <div className="bg-blue-200 px-2 h-screen">
        <MarkAttendanceCard employee={employee} attendance={attendance} setAttendance={setAttendance} />
      </div>
    </>
  );
};

export default MarkAttendance;
