import React, { useCallback, useEffect, useState } from "react";
import {
  DAYJS_DISPLAY_FORMAT,
  header,
  SafeKaroUser,
} from "../../context/constant";
import {
  Box,
  Button,
  CircularProgress,
  DialogContent,
  Grid,
  TextField,
  Tooltip as Tip,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale as linear,
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
import { IEmployee } from "../HR/Attendance/IAttendance";
import AttendanceCard from "../HR/Attendance/AttendanceRecord/AttendanceCard";
import { AttendanceDataSvg, EmployeeSvg, PlanDetailsDataSvg } from "./data/Svg";
import { CartButton } from "./dashboard";
import { Field, Form } from "react-final-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import toast, { Toaster } from "react-hot-toast";
import dayjs from "dayjs";
import SwipeableTemporaryDrawer from "../../utils/ui/SwipeableTemporaryDrawer";
import IconButton from "./data/CustomIconButton";
import CustomIconButton from "./data/CustomIconButton";
ChartJS.register(
  CategoryScale,
  linear,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);
const BookingDashboard: React.FC = () => {
  const [data, setData] = useState<IBookingData[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [firstCart, setFirstCart] = useState(true);
  const [selectedCard, setSelectedcard] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const [secondCart, setSecondCart] = useState(false);
  const [thirdCart, setThirdCart] = useState(false);
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const [employee, setEmployee] = useState<IEmployee | null>();
  const [open, setOpen] = useState(false);
  const GetDashboardCount = useCallback(
    (startDate: string, endDate: string) => {
      getBookingDashboardService({
        header,
        bookingUserId: UserData.profileId,
        startDate,
        endDate,
      })
        .then((dashboardData) => {
          setIsVisible(true);
          setData(dashboardData.data);
        })
        .catch((error) => {
          setIsVisible(true);
        });
    },
    [UserData.profileId]
  );
  const getAttendanceRecord = async () => {
    try {
      const res = await GetAttendanceCountService({
        header,
        eId: UserData.profileId,
      });
      setEmployee(res.data);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  const handleFirstCart = async () => {
    setFirstCart(true);
    setSelectedcard("1");
    setSecondCart(false);
    setThirdCart(false);
  };
  const handleSecondCart = async () => {
    setFirstCart(false);
    setSecondCart(true);
    setThirdCart(false);
    setSelectedcard("2");
  };
  const handleThirdCart = async () => {
    setFirstCart(false);
    setSecondCart(false);
    setThirdCart(true);
    setSelectedcard("3");
  };
  useEffect(() => {
    const currentDate = new Date();
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    const formattedFirstDay = format(firstDayOfMonth, "yyyy-MM-dd");
    const formattedLastDay = format(lastDayOfMonth, "yyyy-MM-dd");
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await GetDashboardCount(formattedFirstDay, formattedLastDay);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    getAttendanceRecord();
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
  const planDetails = [
    {
      label: "Plan Name",
      value: UserData?.planName || "N/A",
    },
    {
      label: "Plan Start Date",
      value: UserData?.planStartDate
        ? dayjs(UserData.planStartDate).format(DAYJS_DISPLAY_FORMAT)
        : "N/A",
    },
    {
      label: "Plan Expiry Date",
      value: UserData?.planExpired
        ? dayjs(UserData.planExpired).format(DAYJS_DISPLAY_FORMAT)
        : "N/A",
    },
    {
      label: "Policy Count",
      value: UserData?.policyCount ?? "N/A",
    },
  ];

  const renderCountBox = (
    title: string,
    count: number | string,
    icon: string,
    path?: string
  ) => {
    const formattedCount =
      typeof count === "number" ? Math.round(count).toLocaleString() : count;
    const content = (
      <div className="bg-white m-2 p-3 mt-8 rounded-[10.33px] shadow-[0_0_5px_2px_#F2DDD4] flex items-center justify-between transform transition-transform duration-200 hover:scale-105">
        <div>
          <Typography
            variant="body2"
            className="text-sm text-gray-600 mb-2 font-satoshi"
          >
            {title === "Policy Count" ? "Remaining Policy Count" : title}
          </Typography>
          <Typography
            variant="h5"
            className="text-base font-bold text-[#202224]"
          >
            {formattedCount}
          </Typography>
        </div>
        {icon && <img src={icon} alt={title} className="h-8 w-8" />}
      </div>
    );
    return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        {path ? <Link to={path}>{content}</Link> : content}
      </Grid>
    );
  };
  const openDateFilter = () => {
    setOpen(!open);
  };
  return (
    // <div className="bg-[#F2DDD4] h-full p-2">
    <div className="bg-blue-50 min-h-[90vh] pl-5 pr-5 pt-2">
      <Grid container>
        <div className="flex justify-between w-full m-2 items-center gap-x-2 gap-3 md:gap-0">
          {/* Left Side: Cart Buttons */}
          <div className="flex justify-between items-center gap-x-6 lg:w-[12%] lg:gap-x-5 md:gap-x-8 sm:gap-x-5">
            <CartButton
              onClick={handleFirstCart}
              tooltipTitle="View Booking Data"
              iconPath={<EmployeeSvg isActive={selectedCard === "1"} />}
              isSelected={firstCart}
            />
            <CartButton
              onClick={handleSecondCart}
              tooltipTitle="Monthly Attendance"
              iconPath={<AttendanceDataSvg isActive={selectedCard === "2"} />}
              isSelected={secondCart}
            />
            <CartButton
              onClick={handleThirdCart}
              tooltipTitle="Plan Details"
              iconPath={<PlanDetailsDataSvg isActive={selectedCard === "3"} />}
              isSelected={thirdCart}
            />

            {/* md और उससे छोटे स्क्रीन के लिए Filter, PDF, Excel Icons */}
            <div className="flex gap-x-6 md:flex lg:hidden sm:gap-x-5 md:gap-x-8">
              <Tip title="Date Filter">
                <Button
                  className="w-10 h-10 flex justify-center items-center md:w-9 md:h-9 rounded-full shadow-[0_0_5px_1px_#F2DDD4] border-gray-100 hover:bg-gray-200 transition duration-200"
                  type="button"
                  onClick={openDateFilter}
                  sx={{
                    minWidth: 0,
                    width: "100%", // Button ko full width dene ke liye
                    height: "100%", // Button ko full height dene ke liye
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid #D1D5DB",
                    backgroundColor: "transparent",
                    "&:hover": { backgroundColor: "transparent" },
                    "&:focus": { outline: "none" },
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#00000"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                    />
                  </svg>
                </Button>
              </Tip>
              <CustomIconButton
                title="Download PDF"
                onClick={handleDownloadPDF}
                icon={
                  <PictureAsPdfSharpIcon className="w-6 h-6 text-red-500" />
                }
                isLoading={isLoading}
              />
              <CustomIconButton
                title="Download Excel"
                onClick={handleDownloadExcel}
                icon={
                  <FileDownloadOutlinedIcon className="w-6 h-6 text-green-700" />
                }
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Right Side: Filters (Only in lg screens) */}
          <div className="hidden lg:flex w-[100%] flex-wrap justify-end gap-x-2 items-center">
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit, submitting, errors, values }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="flex w-[100%] items-center flex-1 gap-x-2 justify-evenly">
                    <div className="lg:w-[40%] md:w-[25%]">
                      <Field name="startDate">
                        {({ input, meta }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              disableFuture
                              label="Start Date"
                              inputFormat="DD/MM/YYYY"
                              value={input.value || null}
                              onChange={(date) => input.onChange(date)}
                              renderInput={(params) => (
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
                    <div className="lg:w-[40%] md:w-[25%]">
                      <Field name="endDate">
                        {({ input, meta }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              disableFuture
                              label="End Date"
                              inputFormat="DD/MM/YYYY"
                              value={input.value || null}
                              onChange={(date) => input.onChange(date)}
                              renderInput={(params) => (
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
                    <CustomIconButton
                      type="submit"
                      icon={<SearchIcon className="w-6 h-6" />}
                      isLoading={isLoading}
                    />
                  </div>
                </form>
              )}
            />
            {/* PDF & Excel Buttons (Only in lg screens) */}
            <div className="flex justify-between items-center gap-x-4">
              <CustomIconButton
                title="Download PDF"
                onClick={handleDownloadPDF}
                icon={
                  <PictureAsPdfSharpIcon className="w-6 h-6 text-red-500" />
                }
                isLoading={isLoading}
              />
              <CustomIconButton
                title="Download Excel"
                onClick={handleDownloadExcel}
                icon={
                  <FileDownloadOutlinedIcon className="w-6 h-6 text-green-700" />
                }
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
        <Grid item lg={12}>
          {isVisible ? (
            <>
              {data &&
                firstCart &&
                data.map((item: IBookingData, index: number) => (
                  <div key={index} className="pb-20">
                    <Grid container spacing={2}>
                      {renderCountBox(
                        "Motor",
                        item.policyCounts?.motor || 0,
                        MotorIcon,
                        "/policy/motor-policies"
                      )}
                    </Grid>
                    <Grid container spacing={2}>
                      {renderCountBox(
                        "Net Premium",
                        item.premiums?.["Net Premium"] || 0,
                        NetPremiumIcon,
                        "/policy/motor-policies"
                      )}
                      {renderCountBox(
                        "Final Premium",
                        item.premiums?.["Final Premium"] || 0,
                        FinalPremiumIcon,
                        "/policy/motor-policies"
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
                        "/policy/motor-policies"
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
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={8}
                    lg={12}
                    sx={{ marginTop: "50px" }}
                  >
                    {employee && (
                      <>
                        <AttendanceCard employee={employee} />
                      </>
                    )}
                  </Grid>
                </Grid>
              )}
              {thirdCart && (
                <div className="md:p-7 p-2">
                  <Typography
                    variant="h5"
                    className="text-lg font-bold text-gray-800"
                  >
                    Plan Details
                  </Typography>
                  <Grid container>
                    {planDetails.map((item, index) => (
                      <React.Fragment key={index}>
                        {renderCountBox(
                          item.label,
                          item.value,
                          "",
                          `/update-plan`
                        )}
                      </React.Fragment>
                    ))}
                  </Grid>

                  {UserData?.userLimit &&
                    typeof UserData.userLimit === "object" && (
                      <>
                        <Typography
                          variant="h5"
                          className="text-lg font-bold text-gray-800 mt-4"
                        >
                          User Limits
                        </Typography>
                        <Grid container>
                          {Object.entries(UserData.userLimit).map(
                            ([key, value]) => (
                              <React.Fragment key={key}>
                                {renderCountBox(
                                  key.toUpperCase(),
                                  value === "Infinity"
                                    ? "Unlimited"
                                    : Number(value) || 0,
                                  "",
                                  `/update-plan`
                                )}
                              </React.Fragment>
                            )
                          )}
                        </Grid>
                      </>
                    )}
                </div>
              )}
            </>
          ) : (
            <Typography variant="h6">Loading...</Typography>
          )}
        </Grid>
        <Toaster position="bottom-center" reverseOrder={false} />

        <SwipeableTemporaryDrawer open={open} setOpen={setOpen}>
          <Box className="p-2 md:p-8 rounded-2xl shadow-lg">
            {/* 🔵 Dialog Title */}
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-center mb-4">
              Select Date Range
            </h2>
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit, submitting }) => (
                <form
                  onSubmit={handleSubmit}
                  className="w-full max-w-2xl bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200"
                >
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center">
                    <Field name="startDate">
                      {({ input, meta }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            disableFuture
                            inputFormat="DD/MM/YYYY"
                            value={input.value || null}
                            onChange={(date) => input.onChange(date)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Start Date"
                                variant="outlined"
                                size="small"
                                fullWidth
                                className="bg-white rounded-md mt-2 mb-2 md:mr-3"
                                error={meta.touched && !!meta.error}
                                helperText={meta.touched && meta.error}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      )}
                    </Field>

                    <Field name="endDate">
                      {({ input, meta }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            disableFuture
                            inputFormat="DD/MM/YYYY"
                            value={input.value || null}
                            onChange={(date) => input.onChange(date)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="End Date"
                                variant="outlined"
                                size="small"
                                fullWidth
                                className="bg-white rounded-md mt-2 mb-2 md:ml-3"
                                error={meta.touched && !!meta.error}
                                helperText={meta.touched && meta.error}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      )}
                    </Field>
                  </div>
                  <div className="mt-6 flex justify-center">
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-400 disabled:opacity-50 transition duration-300 ease-in-out"
                      disabled={submitting}
                    >
                      <Button
                        className="w-full h-10 flex justify-center items-center rounded-full shadow-[0_0_5px_1px_#F2DDD4] border-gray-100 hover:bg-gray-200 transition duration-200"
                        disableRipple
                        disableElevation
                        sx={{
                          minWidth: 0,
                          width: "71vw", // Button ko full width dene ke liye
                          height: "100%", // Button ko full height dene ke liye
                          display: "flex",
                          justifyContent: "center",
                          marginTop:'15px',
                          alignItems: "center",
                          border: "1px solid #D1D5DB",
                          backgroundColor: "transparent",
                          "&:hover": { backgroundColor: "transparent" },
                          "&:focus": { outline: "none" },
                        }}
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <CircularProgress className="w-6 h-6" />
                        ) : (
                          // <Box display="flex" justifyContent="flex-end">
                          <SearchIcon
                            className="w-6 h-6 md:w-5 md:h-5"
                            onClick={() => setOpen(false)}
                          />
                        )}
                      </Button>
                    </button>
                  </div>
                </form>
              )}
            />
          </Box>
        </SwipeableTemporaryDrawer>
      </Grid>
    </div>
  );
};
export default BookingDashboard;
