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
  const id = UserData.profileId;
  const [attendance, setAttendance] = useState<IAttendance | null>();
  const [employee, setEmployee] = useState<IEmployee | null>();
  const [isLoading,setIsLoading]=useState(false);
  const getAttendanceRecord = async () => {
    try {
      setIsLoading(true)
      const res = await GetAttendanceCountService({ header, eId: UserData.profileId });
      setEmployee(res.data);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }finally{
      setIsLoading(false)
    }
  };
  const FetchData = async () => {
    try {
      setIsLoading(true)
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
    }finally{
      setIsLoading(false)
    }
  };
  useEffect(() => {
    FetchData();
    getAttendanceRecord();
    // eslint-disable-next-line
  }, []);
  if(isLoading){
    return <div className="flex justify-center w-full items-center h-[50vh]"><CircularProgress  /></div>;
  }
  if (!employee || !attendance) {
    return <span>Error occurred while fetching attendance</span>;
  }
  return (
    <>
      <div className="bg-white">
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
