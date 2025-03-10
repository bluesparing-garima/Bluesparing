import React from "react";
import { IAttendance } from "../IAttendance";
import dayjs from "dayjs";
import { IAddAttendanceProps } from "../../../../api/HR/getHrTypes";
import AddAttendanceService from "../../../../api/HR/Attendance/AddAttendance/AddHolidayService";
import { header } from "../../../../context/constant";
import toast from "react-hot-toast";
interface IMarkOutTimeProps {
  attendance: IAttendance | null;
  setAttendance: React.Dispatch<React.SetStateAction<IAttendance | null | undefined>>
}
const MarkOutTime: React.FC<IMarkOutTimeProps> = ({ attendance ,setAttendance}) => {
  const calculateTotalHours = (
    inTime: string | null,
    outTime: string | null
  ) => {
    if (inTime && outTime) {
      const start = dayjs(inTime, "HH:mm");
      const end = dayjs(outTime, "HH:mm");
      if (start.isValid() && end.isValid()) {
        const diffInMinutes = end.diff(start, "minute");

        // Calculate hours and remaining minutes
        const hours = Math.floor(diffInMinutes / 60);
        const minutes = diffInMinutes % 60;

        return `${hours} hours ${minutes} mins`;
      }
    }
    return "0";
  };
  const handleOutTimeAttendance = async () => {
    try {
      if(attendance?.outTime){
        return;
      }
      let attendanceData: IAddAttendanceProps = {
        employeeName: attendance?.employeeName || "",
        employeeId: attendance?.employeeId || "",
        attendanceType: attendance?.attendanceType,
        outTime: dayjs().format("HH:mm"),
        totalHours: calculateTotalHours(
          attendance?.inTime || null,
          dayjs().format("HH:mm")
        ),
      };

    const res =  await AddAttendanceService({
        header,
        attendanceData,
        id: attendance?._id,
      });
      if(res.status==="success"){
        setAttendance(res.data)
      }
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };

  const IsInTimeExist = () => {
    if(attendance && attendance.outTime){
      return false;
    }
    if (attendance && attendance.inTime && attendance.inTime !== "00:00") {
      return true;
    }
    return false;
  };


  return (
    <button
      className={`${
        !IsInTimeExist()
          ? "text-gray-400 opacity-50 cursor-not-allowed"
          :  "text-[#243642] font-semibold cursor-pointer"
      }`}
      disabled={!IsInTimeExist()}
      onClick={handleOutTimeAttendance}
    >
      Mark Out Time
    </button>
  );
};

export default MarkOutTime;
