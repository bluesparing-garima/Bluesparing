import React, { useEffect, useState } from "react";
import { header, SafeKaroUser } from "../../context/constant";
import { Grid, Tooltip as Tip } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PictureAsPdfSharpIcon from "@mui/icons-material/PictureAsPdfSharp";
import { bookingGenerateExcel } from "../../utils/DashboardExcel";
import { bookingGeneratePDF } from "../../utils/DashboardPdf";
import GetAttendanceCountService from "../../api/Role/GetAttendanceCount/GetAttendanceCountService";
import { IEmployee } from "../HR/Attendance/IAttendance";
import AttendanceCard from "../HR/Attendance/AttendanceRecord/AttendanceCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ITDashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const [employee, setEmployee] = useState<IEmployee | null>();
  const getAttendanceRecord = async () => {
    try {
      const res = await GetAttendanceCountService({ header, eId: UserData.id });
      setEmployee(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getAttendanceRecord();
    // eslint-disable-next-line
  }, []);

  const handleDownloadPDF = () => {
    bookingGeneratePDF(data);
  };
  const handleDownloadExcel = () => {
    bookingGenerateExcel(data);
  };

  return (
    <>
      {UserData.role.toLowerCase() === "it" ? (
        <div className="bg-blue-200 h-screen p-2">
          <Grid container>
            <div className="flex justify-end w-full  items-center gap-x-2">
              <div className="flex justify-center items-center gap-x-2">
                <Tip title="Download PDF">
                  <button
                    className="md:w-10 md:h-10 h-4 w-4 bg-[#0095FF] shadow-sm rounded flex justify-center items-center text-white"
                    onClick={handleDownloadPDF}
                  >
                    <PictureAsPdfSharpIcon className="md:w-6 md:h-6 h-3 w-3" />
                  </button>
                </Tip>
                <Tip title="Download Excel">
                  <button
                    className="md:w-10 md:h-10 h-4 w-4 bg-[#3BDB03] shadow-sm rounded flex justify-center items-center text-white"
                    onClick={handleDownloadExcel}
                  >
                    <FileDownloadOutlinedIcon className="md:w-6 md:h-6 h-3 w-3" />
                  </button>
                </Tip>
              </div>
            </div>

            <Grid item lg={12}>
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={8} lg={9}>
                    {employee && (
                      <>
                        <Typography className="text-lg font-medium text-gray-800">
                          Monthly Attendance Record
                        </Typography>
                        <AttendanceCard employee={employee} />
                      </>
                    )}
                  </Grid>
                </Grid>
              </>
            </Grid>
          </Grid>
        </div>
      ) : (
        <span>Access denied</span>
      )}
    </>
  );
};

export default ITDashboard;
