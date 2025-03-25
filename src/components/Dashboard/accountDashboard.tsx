import React, { useCallback, useEffect, useState } from "react";
import { Grid, TextField, Tooltip } from "@mui/material";
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
  const [employee, setEmployee] = useState<IEmployee | null>();
  const GetDashboardCount = useCallback((startDate, endDate) => {
    console.log("first", UserData);
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
      <div className="bg-white m-2 p-3 rounded-[10.33px] shadow-lg flex items-center justify-between transform transition-transform duration-200 hover:scale-105">
        <div>
          <Typography
            variant="body2"
            className="text-sm text-gray-600 mb-2 font-satoshi"
          >
            {title==='Policy Count' ? 'Remaining Policy Count' : title}
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

  console.log(UserData);
  return (
    <div className="bg-blue-200 h-full pb-5">
      <Grid container sx={{ margin: 1 }}>
        <div className="flex justify-around w-[100%] m-2 items-center flex-row flex-wrap gap-x-2">
          <div className="flex justify-start items-center w-[95%] flex-row flex-wrap">
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
          </div>
          <div className="flex w-[95%] justify-start mt-2 items-center">
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit, submitting, errors, values }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="flex w-[100%] md:w-full items-start flex-1 gap-x-2 justify-start">
                    <div className="w-[47%]">
                      <Field name="startDate">
                        {({ input, meta }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              disableFuture
                              inputFormat="DD/MM/YYYY"
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
                              inputFormat="DD/MM/YYYY"
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
                    <button
                      className="md:w-10 md:h-10 h-10 w-10 bg-[#30A9FF] shadow-sm rounded flex justify-center items-center text-white"
                      type="submit"
                    >
                      <SearchIcon className="md:w-6 md:h-6 h-5 w-5" />
                    </button>
                  </div>
                </form>
              )}
            />
            <div className="flex w-[50%] justify-end items-center gap-x-2">
              <Tooltip title="Download PDF">
                <button
                  className="md:w-10 md:h-10 h-10 w-10 bg-[#0095FF] shadow-sm rounded flex justify-center items-center text-white"
                  onClick={handleDownloadPDF}
                >
                  <PictureAsPdfSharpIcon className="md:w-6 md:h-6 h-6 w-6" />
                </button>
              </Tooltip>
              <Tooltip title="Download Excel">
                <button
                  className="md:w-10 md:h-10 h-10 w-10 bg-[#3BDB03] shadow-sm rounded flex justify-center items-center text-white"
                  onClick={handleDownloadExcel}
                >
                  <FileDownloadOutlinedIcon className="md:w-6 md:h-6 h-6 w-6" />
                </button>
              </Tooltip>
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
                              <div className="bg-blue-200 md:p-7 p-2">
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
                        <div className="bg-blue-200 md:p-7 p-2">
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
                                          value==='Infinity'?"Unlimited":Number(value) || 0,
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
