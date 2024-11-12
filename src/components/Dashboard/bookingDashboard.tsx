/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useEffect, useState } from "react";
import { header, SafeKaroUser } from "../../context/constant";
import { Button, Grid, TextField, Tooltip as Tip } from "@mui/material";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
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
import deleteIcon from "../../assets/delete.png";
import MotorIcon from "../../assets/motor1.png";
import NetPremiumIcon from "../../assets/netPremium.png";
import FinalPremiumIcon from "../../assets/finalPremium.png";
import TotalBookingIcon from "../../assets/totalBooking.png";
import AcceptedBookingIcon from "../../assets/acceptedBooking.png";
import BookedBookingIcon from "../../assets/bookedBooking.png";
import RequestedBookingIcon from "../../assets/requestedBooking.png";
import { IBookingData } from "./IDashboard";
import getBookingDashboardService from "../../api/Dashboard/GetBookingDashboard/getBookingDashboardService";
import { endOfMonth, startOfMonth, format } from "date-fns";
import { Link } from "react-router-dom";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PictureAsPdfSharpIcon from "@mui/icons-material/PictureAsPdfSharp";
import { bookingGenerateExcel } from "../../utils/DashboardExcel";
import { bookingGeneratePDF } from "../../utils/DashboardPdf";
import GetAttendanceCountService from "../../api/Role/GetAttendanceCount/GetAttendanceCountService";
import { IEmployee } from "../HR/Attendance/IAttendnace";
import AttendanceCard from "../HR/Attendance/AttendanceRecord/AttendanceCard";
import { AttendanceDataSvg, EmployeeSvg } from "./data/Svg";
import { CartButton } from "./dashboard";
import { Field, Form } from "react-final-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Toaster } from "react-hot-toast";
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

const bookingDashboard: React.FC = () => {
  const [data, setData] = useState<IBookingData[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [firstCart, setFirstCart] = useState(true);
  const [selectedCard, setSelectedcard] = useState("1");
  const [secondCart, setSecondCart] = useState(false);
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const [employee, setEmployee] = useState<IEmployee | null>();
  const GetDashboardCount = useCallback(
    (startDate: string, endDate: string) => {
      getBookingDashboardService({
        header,
        bookingUserId: UserData.id,
        startDate,
        endDate,
      })
        .then((dashboardData) => {
          setIsVisible(true);
          setData(dashboardData.data);
        })
        .catch((error) => {
          setIsVisible(true);
          console.error("Failed to fetch product details", error);
        });
    },
    [UserData.id]
  );

  const getAttendaceRecord = async () => {
    try {
      const res = await GetAttendanceCountService({ header, eId: UserData.id });
      setEmployee(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFirstCart = async () => {
    setFirstCart(true);
    setSelectedcard("1");
    setSecondCart(false);
  };
  const handleSecondCart = async () => {
    setFirstCart(false);
    setSecondCart(true);
    setSelectedcard("2");
  };
  useEffect(() => {
    // Calculate first day of current month
    const currentDate = new Date();
    const firstDayOfMonth = startOfMonth(currentDate);
    // Calculate last day of current month
    const lastDayOfMonth = endOfMonth(currentDate);
    // Format the dates if needed
    const formattedFirstDay = format(firstDayOfMonth, "yyyy-MM-dd");
    const formattedLastDay = format(lastDayOfMonth, "yyyy-MM-dd");
    const fetchData = () => {
      GetDashboardCount(formattedFirstDay, formattedLastDay);
    };
    getAttendaceRecord();
    fetchData();
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, [GetDashboardCount]);

  const onSubmit = async (value: any) => {
    const utcStartDate = new Date(value.startDate!);
    const formattedStartDate = format(utcStartDate, "yyyy-MM-dd");
    value.startDate = formattedStartDate;
    const utcEndDate = new Date(value.endDate!);
    const formattedEndDate = format(utcEndDate, "yyyy-MM-dd");
    value.endDate = formattedEndDate;

    GetDashboardCount(value.startDate, value.endDate);
  };
  const handleDownloadPDF = () => {
    bookingGeneratePDF(data);
  };
  const handleDownloadExcel = () => {
    bookingGenerateExcel(data);
  };

  const renderCountBox = (
    title: string,
    count: number | string,
    icon: string,
    path?: string
  ) => {
    const formattedCount =
      typeof count === "number" ? Math.round(count).toLocaleString() : "0";

    const content = (
      <div className="bg-white m-2 p-3 rounded-[10.33px] shadow-lg flex items-center justify-between transform transition-transform duration-200 hover:scale-105">
        <div>
          <Typography
            variant="body2"
            className="text-sm text-gray-600 mb-2 font-inter"
          >
            {title}
          </Typography>
          <Typography
            variant="h5"
            className="text-base font-bold text-[#202224]"
          >
            {formattedCount}
          </Typography>
        </div>
        <img src={icon} alt={title} className="h-8 w-8" />
      </div>
    );

    return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        {path ? <Link to={path}>{content}</Link> : content}
      </Grid>
    );
  };

  return (
    <div className="bg-blue-200 h-screen p-2">
      <Grid container>
        <div className="flex justify-between w-full m-2 items-center gap-x-2 flex-wrap gap-3 md:gap-0 ">
          <div className="flex justify-center items-center">
            <CartButton
              onClick={handleFirstCart}
              tooltipTitle="View Booking Data"
              iconPath={<EmployeeSvg isActive={selectedCard === "1"} />}
              isSelected={firstCart}
            />
            <CartButton
              onClick={handleSecondCart}
              tooltipTitle="Monthly Attendace "
              iconPath={<AttendanceDataSvg isActive={selectedCard === "2"} />}
              isSelected={secondCart}
            />
          </div>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, submitting, errors, values }) => (
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex w-full  items-center flex-1 gap-x-2 justify-between">
                  <div className="w-[47%]">
                    <Field name="startDate">
                      {({ input, meta }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            disableFuture
                            label="Start Date"
                            value={input.value || null}
                            onChange={(date) => {
                              input.onChange(date);
                            }}
                            renderInput={(params: any) => (
                              <TextField
                                variant="outlined"
                                size="small"
                                fullWidth
                                {...params}
                                error={meta.touched && !!meta.error}
                                helperText={meta.touched && meta.error}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      )}
                    </Field>
                  </div>
                  <div className="w-[47%]">
                    <Field name="endDate">
                      {({ input, meta }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            disableFuture
                            label="End Date"
                            value={input.value || null}
                            onChange={(date) => {
                              input.onChange(date);
                            }}
                            renderInput={(params: any) => (
                              <TextField
                                variant="outlined"
                                size="small"
                                fullWidth
                                {...params}
                                error={meta.touched && !!meta.error}
                                helperText={meta.touched && meta.error}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      )}
                    </Field>
                  </div>
                  <Button
                    className=" h-10  bg-[#30A9FF] shadow-sm rounded flex justify-center items-center text-white"
                    type="submit"
                  >
                    <SearchIcon className="w-6 h-6" />
                  </Button>
                </div>
              </form>
            )}
          />
          <div className="flex justify-center items-center gap-x-2">
            <Tip title="Download PDF">
              <Button
                className=" h-10  bg-[#0095FF] shadow-sm rounded flex justify-center items-center text-white"
                onClick={handleDownloadPDF}
              >
                <PictureAsPdfSharpIcon className="w-6 h-6 " />
              </Button>
            </Tip>
            <Tip title="Download Excel">
              <Button
                className=" h-10  bg-[#3BDB03] shadow-sm rounded flex justify-center items-center text-white"
                onClick={handleDownloadExcel}
              >
                <FileDownloadOutlinedIcon className="w-6 h-6 " />
              </Button>
            </Tip>
          </div>
        </div>

        <Grid item lg={12}>
          {isVisible ? (
            <>
              {data &&
                firstCart &&
                data.map((item: IBookingData, index: number) => (
                  <div key={index}>
                    <Grid container spacing={2}>
                      {renderCountBox(
                        "Motor",
                        item.policyCounts?.motor || 0,
                        MotorIcon,
                        "/policy/motorpolicies"
                      )}
                    </Grid>
                    <Grid container spacing={2}>
                      {renderCountBox(
                        "Net Premium",
                        item.premiums?.["Net Premium"] || 0,
                        NetPremiumIcon,
                        "/policy/motorpolicies"
                      )}
                      {renderCountBox(
                        "Final Premium",
                        item.premiums?.["Final Premium"] || 0,
                        FinalPremiumIcon,
                        "/policy/motorpolicies"
                      )}
                    </Grid>
                    <Grid container spacing={2}>
                      {renderCountBox(
                        "Total Booking",
                        item.bookingRequests?.["Total Booking"] || 0,
                        TotalBookingIcon,
                        "/booking"
                      )}
                      {renderCountBox(
                        "Requested Booking",
                        item.bookingRequests?.["Requested Booking"] || 0,
                        RequestedBookingIcon,
                        "/booking"
                      )}
                      {renderCountBox(
                        "Accepted Booking",
                        item.bookingRequests?.["Accepted Booking"] || 0,
                        AcceptedBookingIcon,
                        "/booking"
                      )}
                      {renderCountBox(
                        "Booked Booking",
                        item.bookingRequests?.["Booked Booking"] || 0,
                        BookedBookingIcon,
                        "/policy/motorpolicies"
                      )}
                      {renderCountBox(
                        "Rejected Booking",
                        item.bookingRequests?.["Rejected Booking"] || 0,
                        deleteIcon,
                        "/booking/reject"
                      )}
                    </Grid>
                  </div>
                ))}
              {secondCart && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={8} lg={9}>
                    {employee && (
                      <>
                        <AttendanceCard employee={employee} />
                      </>
                    )}
                  </Grid>
                </Grid>
              )}
            </>
          ) : (
            <Typography variant="h6">Loading...</Typography>
          )}
        </Grid>
        <Toaster position="bottom-center" reverseOrder={false} />
      </Grid>
    </div>
  );
};

export default bookingDashboard;
