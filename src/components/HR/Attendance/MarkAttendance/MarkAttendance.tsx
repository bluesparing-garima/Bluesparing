import dayjs from "dayjs";
import { SafeKaroUser } from "../../../../context/constant";
import GetTodayAttendanceRecordService from "../../../../api/HR/Attendance/GetTodayAttendanceRecord/GetEmployeeDepartmentService";
import { header } from "../../../../context/constant";
import { useEffect, useState } from "react";
import { IAttendance, IEmployee } from "../IAttendance";
import { CircularProgress } from "@mui/material";
import GetAttendanceCountService from "../../../../api/Role/GetAttendanceCount/GetAttendanceCountService";
import MarkAttendanceCard from "./MarkAttendanceCard";
import toast from "react-hot-toast";
const MarkAttendance = () => {
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const id = UserData.id;
  const [attendance, setAttendance] = useState<IAttendance | null>();
  const [employee, setEmployee] = useState<IEmployee | null>();
  const getAttendanceRecord = async () => {
    try {
      const res = await GetAttendanceCountService({ header, eId: UserData.id });
      setEmployee(res.data);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  const FetchData = async () => {
    try {
      const now = dayjs().format("YYYY-MM-DD");
      const res = await GetTodayAttendanceRecordService({
        header,
        d: now,
        eId: id,
      });
      setAttendance(res.data[0]);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  useEffect(() => {
    FetchData();
    getAttendanceRecord();
    // eslint-disable-next-line
  }, []);
  if (!employee || !attendance) {
    return <CircularProgress />;
  }
  return (
    <>
      <div className="bg-blue-200 px-2 h-screen">
        <MarkAttendanceCard
          employee={employee}
          attendance={attendance}
          setAttendance={setAttendance}
        />
      </div>
    </>
  );
};
export default MarkAttendance;
