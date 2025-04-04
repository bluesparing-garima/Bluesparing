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
      <div className="bg-white m-2 p-3 mt-8 rounded-[10.33px] shadow-[0_0_10px_2px_#F2DDD4] flex items-center justify-between transform transition-transform duration-200 hover:scale-105">
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
    <div className="pl-5 pr-5 pt-2">
      <Grid container>
        <div className="flex justify-between w-full m-2 items-center gap-x-2 gap-3 md:gap-0">
          <div className="flex justify-between w-[100%] items-center lg:w-[12%] lg:gap-x-5 md:gap-x-7 sm:w-[100%]">
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

            <div className="flex justify-around items-center lg:hidden ">
              <Tip title="Select Date">
                <Button
                  className="w-10 h-10 flex justify-center items-center md:w-9 md:h-9 rounded-lg shadow-[0_0_5px_1px_#F2DDD4] border-gray-100 hover:bg-gray-200 transition duration-200"
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
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                    />
                  </svg>
                </Button>
              </Tip>
            </div>
            <div className="lg:hidden">
              <CustomIconButton
                title="Download PDF"
                onClick={handleDownloadPDF}
                icon={
                  <PictureAsPdfSharpIcon className="w-6 h-6 text-red-500" />
                }
                isLoading={isLoading}
              />
            </div>
            <div className="lg:hidden">
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
        <Box textAlign="center" mb={3}>
          <h2 className="text-2xl font-semibold text-gray-800">Select Date Range</h2>
        </Box>
        <Form
              onSubmit={onSubmit}
              render={({ handleSubmit, submitting }) => (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2}>
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
                                error={meta.touched && !!meta.error}
                                helperText={meta.touched && meta.error}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      )}
                    </Field>
                  </Box>
                  <div className="mt-6 flex justify-center items-center">
                      <Button
                        className="btnGradient"
                        disableRipple
                        disableElevation
                        color="primary"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          // gap: 1,
                          px: 4,
                          py: 1.5,
                          borderRadius: "8px",
                          fontWeight: "bold",
                          color : 'black',
                          mt:2
                        }}
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <CircularProgress className="w-6 h-6" />
                        ) : (
                          // <Box display="flex" justifyContent="flex-end">
                          <SearchIcon
                            className="w-8 h-8"
                            onClick={() => setOpen(false)}
                          />
                        )}
                      </Button>
                  </div>
                </form>
              )}
            />
        </SwipeableTemporaryDrawer>
      </Grid>
    </div>
  );
};
export default BookingDashboard;
