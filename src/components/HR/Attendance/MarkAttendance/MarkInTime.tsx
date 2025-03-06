import React from "react";
import { IAttendance } from "../IAttendance";
import dayjs from "dayjs";
import { IAddAttendanceProps } from "../../../../api/HR/getHrTypes";
import AddAttendanceService from "../../../../api/HR/Attendance/AddAttendance/AddHolidayService";
import { header } from "../../../../context/constant";
import toast from "react-hot-toast";
interface IMarkInTimeProps {
  attendance: IAttendance | null;
  setAttendance: React.Dispatch<
    React.SetStateAction<IAttendance | null | undefined>
  >;
}
const MarkInTime: React.FC<IMarkInTimeProps> = ({
  attendance,
  setAttendance,
}) => {
  const isTimeAfter1130AM = (): boolean => {
    const now = dayjs();
    const tenThirtyAM = dayjs()
      .set("hour", 11)
      .set("minute", 30)
      .set("second", 0);
    return now.isAfter(tenThirtyAM);
  };
  const handleInTimeAttendance = async () => {
    try {
      let attendanceData: IAddAttendanceProps = {
        employeeName: attendance?.employeeName || "",
        employeeId: attendance?.employeeId || "",
        // attendanceType: isTimeAfter1130AM() ? "half day" : "present",
        attendanceType: isTimeAfter1130AM() ? "half day" : "present",
        inTime: dayjs().format("HH:mm"),
        remarks: `${attendance?.employeeName} is present`,
      };
      const res = await AddAttendanceService({
        header,
        attendanceData,
        id: attendance?._id,
      });
      if (res.status === "success") {
        setAttendance(res.data);
      }
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  return (
    <button
      className={`${
        !attendance
          ? "text-gray-400 opacity-50 cursor-not-allowed"
          : "text-[#243642] font-semibold cursor-pointer"
      }`}
      disabled={attendance ? false : true}
      onClick={handleInTimeAttendance}
    >
      Mark In Time
    </button>
  );
};
export default MarkInTime;
