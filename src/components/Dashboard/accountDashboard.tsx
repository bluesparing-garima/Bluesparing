import React, { useCallback, useEffect, useState } from "react";
import { Button, Grid, TextField, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
  DAYJS_DISPLAY_FORMAT,
  SafeKaroUser,
  header,
} from "../../context/constant";
import { Account, IAccountData } from "./IDashboard";
import MotorIcon from "../../assets/motor1.png";
import NetPremiumIcon from "../../assets/netPremium.png";
import FinalPremiumIcon from "../../assets/finalPremium.png";
import PayInCommissionIcon from "../../assets/payIn.png";
import PayOutCommissionIcon from "../../assets/payOut.png";
import TotalAccounts from "../../assets/bookedBooking.png";
import Accounts from "../../assets/totalLead.png";
import AdminCommissionChart from "./Chart/AdminCommissionChart";
import AdminPolicyChart from "./Chart/AdminPolicyChart";
import { startOfMonth, endOfMonth, format } from "date-fns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Field, Form } from "react-final-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import getAccountDashboardService from "../../api/Dashboard/GetAccountDashboard/getAccountDashboardService";
import { Link } from "react-router-dom";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PictureAsPdfSharpIcon from "@mui/icons-material/PictureAsPdfSharp";
import { accountGeneratePDF } from "../../utils/DashboardPdf";
import { accountGenerateExcel } from "../../utils/DashboardExcel";
import {
  AttendanceDataSvg,
  MotorSvg,
  PlanDetailsDataSvg,
  ViewAdminDataSvg,
  ViewPartnerSvg,
} from "./data/Svg";
import SearchIcon from "@mui/icons-material/Search";
import { CartButton } from "./dashboard";
import { IEmployee } from "../HR/Attendance/IAttendance";
import GetAttendanceCountService from "../../api/Role/GetAttendanceCount/GetAttendanceCountService";
import AttendanceCard from "../HR/Attendance/AttendanceRecord/AttendanceCard";
import dayjs from "dayjs";
import toast, { Toaster } from "react-hot-toast";
import CustomIconButton from "./data/CustomIconButton";
const AccountDashboard: React.FC = () => {
  const [data, setData] = useState<IAccountData[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [firstCart, setFirstCart] = useState(true);
  const [secondCart, setSecondCart] = useState(false);
  const [thirdCart, setThirdCart] = useState(false);
  const [fourthCart, setFourthCart] = useState(false);
  const [fifthCart, setFifthCart] = useState(false);
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const [selectedCard, setSelectedcard] = useState("1");
  const [open, setOpen] = useState(false);
  const [employee, setEmployee] = useState<IEmployee | null>();
  const GetDashboardCount = useCallback((startDate, endDate) => {
    getAccountDashboardService({
      header,
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
  }, []);
  const getAttendanceRecord = async () => {
    try {
      const res = await GetAttendanceCountService({
        header,
        eId: UserData?.profileId,
      });
      setEmployee(res.data);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  useEffect(() => {
    const currentDate = new Date();
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    const formattedFirstDay = format(firstDayOfMonth, "yyyy-MM-dd");
    const formattedLastDay = format(lastDayOfMonth, "yyyy-MM-dd");
    getAttendanceRecord();
    const fetchData = () => {
      GetDashboardCount(formattedFirstDay, formattedLastDay);
    };
    fetchData();
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId);
  }, [GetDashboardCount]);
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
  const onSubmit = async (value: any) => {
    // Check if both startDate and endDate are provided
    // alert("on submit clicked")
    if (!value.startDate || !value.endDate) {
      toast.error("Both start date and end date are required.");
      return;
    }

    // Convert input dates to Date objects
    const utcStartDate = new Date(value.startDate);
    const utcEndDate = new Date(value.endDate);

    // Validate if dates are valid
    if (isNaN(utcStartDate.getTime()) || isNaN(utcEndDate.getTime())) {
      toast.error("Invalid date selected. Please select valid dates.");
      return;
    }

    // Ensure endDate is not before startDate
    if (utcEndDate < utcStartDate) {
      toast.error("End date cannot be before start date.");
      return;
    }

    // Format dates before passing them
    const formattedStartDate = format(utcStartDate, "yyyy-MM-dd'T'HH:mm:ss");
    const formattedEndDate = format(utcEndDate, "yyyy-MM-dd'T'HH:mm:ss");

    // Assign formatted values
    value.startDate = formattedStartDate;
    value.endDate = formattedEndDate;

    // Call API function
    GetDashboardCount(value.startDate, value.endDate);
  };

  const handleFirstCart = async () => {
    setFirstCart(true);
    setSecondCart(false);
    setThirdCart(false);
    setFourthCart(false);
    setFifthCart(false);
    setSelectedcard("1");
  };
  const handleSecondCart = async () => {
    setFirstCart(false);
    setSecondCart(true);
    setThirdCart(false);
    setFourthCart(false);
    setFifthCart(false);
    setSelectedcard("2");
  };
  const handleThirdCart = async () => {
    setFirstCart(false);
    setSecondCart(false);
    setThirdCart(true);
    setFourthCart(false);
    setFifthCart(false);
    setSelectedcard("3");
  };
  const handleFourthCart = async () => {
    setFirstCart(false);
    setSecondCart(false);
    setThirdCart(false);
    setFourthCart(true);
    setFifthCart(false);
    setSelectedcard("4");
  };
  const handleFifthCart = async () => {
    setFirstCart(false);
    setSecondCart(false);
    setThirdCart(false);
    setFourthCart(false);
    setFifthCart(true);
    setSelectedcard("5");
  };
  const handleDownloadPDF = () => {
    accountGeneratePDF(data);
  };
  const handleDownloadExcel = () => {
    accountGenerateExcel(data);
  };

  const planDetails = [
    {
      label: "Plan Name",
      value: UserData?.planName,
    },
    {
      label: "Plan Start Date",
      value: dayjs(UserData?.planStartDate).format(DAYJS_DISPLAY_FORMAT),
    },
    {
      label: "Plan Expiry Date",
      value: dayjs(UserData?.planExpired).format(DAYJS_DISPLAY_FORMAT),
    },
    {
      label: "Policy Count",
      value: UserData?.policyCount,
    },
  ];

  const openDateFilter = () => {
    setOpen(!open);
  };

  return (
    <div className="bg-blue-50 min-h-[90vh] pl-5 pr-5 pt-2">
      <Grid container>
        <div className="flex justify-between w-full m-2 items-center gap-x-2 gap-3 md:gap-0">
          <div className="flex justify-between w-[100%] items-center lg:w-[12%] lg:gap-x-5 md:gap-x-7 sm:w-[100%]">
            <CartButton
              onClick={handleFirstCart}
              tooltipTitle="View Policy Data"
              iconPath={<MotorSvg isActive={selectedCard === "1"} />}
              isSelected={firstCart}
            />
            <CartButton
              onClick={handleSecondCart}
              tooltipTitle="View Partner Data"
              iconPath={<ViewPartnerSvg isActive={selectedCard === "2"} />}
              isSelected={secondCart}
            />
            <CartButton
              onClick={handleThirdCart}
              tooltipTitle="View Chart"
              iconPath={<ViewAdminDataSvg isActive={selectedCard === "3"} />}
              isSelected={thirdCart}
            />
            <CartButton
              onClick={handleFourthCart}
              tooltipTitle="Monthly Attendance "
              iconPath={<AttendanceDataSvg isActive={selectedCard === "4"} />}
              isSelected={fourthCart}
            />
            <CartButton
              onClick={handleFifthCart}
              tooltipTitle="Plan Details "
              iconPath={<PlanDetailsDataSvg isActive={selectedCard === "5"} />}
              isSelected={fifthCart}
            />
            <div className="flex justify-around items-center lg:hidden ">
              <Tooltip title="Select Date">
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
              </Tooltip>
            </div>
            <div className="lg:hidden">
              <CustomIconButton
                title="Download PDF"
                onClick={handleDownloadPDF}
                icon={
                  <PictureAsPdfSharpIcon className="w-6 h-6 text-red-500" />
                }
              />
            </div>
            <div className="lg:hidden">
              <CustomIconButton
                title="Download Excel"
                onClick={handleDownloadExcel}
                icon={
                  <FileDownloadOutlinedIcon className="w-6 h-6 text-green-700" />
                }
              />
            </div>
          </div>
          <div className="hidden lg:flex w-[100%] flex-wrap justify-end gap-x-4 items-center">
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit, submitting, errors, values }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="flex w-[100%] items-center flex-1 gap-x-2 justify-end">
                    <div className="lg:w-[30%]">
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
                    <div className="lg:w-[30%]">
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
              />
              <CustomIconButton
                title="Download Excel"
                onClick={handleDownloadExcel}
                icon={
                  <FileDownloadOutlinedIcon className="w-6 h-6 text-green-700" />
                }
              />
            </div>
          </div>
        </div>
        <Grid item md={12}>
          {UserData?.role.toLowerCase() === "account" ? (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {isVisible ? (
                    <>
                      {firstCart && (
                        <>
                          {data.map((item, index) => (
                            <div key={index}>
                              <div className="pb-8 pt-5">
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
                                    NetPremiumIcon
                                  )}
                                  {renderCountBox(
                                    "Final Premium",
                                    item.premiums?.["Final Premium"] || 0,
                                    FinalPremiumIcon
                                  )}
                                </Grid>
                                <Grid container spacing={2}>
                                  {renderCountBox(
                                    "PayIn Commission",
                                    item.commissions?.["PayIn Commission"] || 0,
                                    PayInCommissionIcon
                                  )}
                                  {renderCountBox(
                                    "PayOut Commission",
                                    item.commissions?.["PayOut Commission"] ||
                                      0,
                                    PayOutCommissionIcon
                                  )}
                                  {renderCountBox(
                                    "Broker Amount",
                                    item.commissions?.["Broker Amount"] || 0,
                                    PayOutCommissionIcon,
                                    "/account"
                                  )}
                                  {renderCountBox(
                                    "Broker Balance",
                                    item.commissions?.["Broker Balance"] || 0,
                                    PayOutCommissionIcon,
                                    "/account"
                                  )}
                                </Grid>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                      {fifthCart && (
                        <div className="pt-5 pb-8">
                          <Typography
                            variant="h5"
                            className="text-lg font-bold text-gray-800"
                          >
                            Plan Details
                          </Typography>
                          <Grid container>
                            {planDetails?.map((item, index) => (
                              <React.Fragment key={index}>
                                {renderCountBox(
                                  item.label,
                                  item.value || "N/A",
                                  "",
                                  `/update-plan`
                                )}
                              </React.Fragment>
                            ))}
                          </Grid>

                          {UserData?.userLimit &&
                            typeof UserData?.userLimit === "object" && (
                              <>
                                <Typography
                                  variant="h5"
                                  className="text-lg font-bold text-gray-800 mt-4"
                                >
                                  User Limits
                                </Typography>
                                <Grid container>
                                  {Object.entries(UserData?.userLimit).map(
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
              </Grid>
            </>
          ) : (
            <Typography variant="h6">Access Denied</Typography>
          )}
        </Grid>
      </Grid>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};
export default AccountDashboard;
