import React, { useCallback, useEffect, useState } from "react";
import { Grid, TextField, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import { SafeKaroUser, header } from "../../context/constant";
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
  ViewAdminDataSvg,
  ViewPartnerSvg,
} from "./data/Svg";
import SearchIcon from "@mui/icons-material/Search";
import { CartButton } from "./dashboard";
import { IEmployee } from "../HR/Attendance/IAttendance";
import GetAttendanceCountService from "../../api/Role/GetAttendanceCount/GetAttendanceCountService";
import AttendanceCard from "../HR/Attendance/AttendanceRecord/AttendanceCard";
import dayjs from "dayjs";
import toast from "react-hot-toast";
const AccountDashboard: React.FC = () => {
  const [data, setData] = useState<IAccountData[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [firstCart, setFirstCart] = useState(true);
  const [secondCart, setSecondCart] = useState(false);
  const [thirdCart, setThirdCart] = useState(false);
  const [fourthCart, setFourthCart] = useState(false);
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const [selectedCard, setSelectedcard] = useState("1");
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
      const res = await GetAttendanceCountService({ header, eId: UserData.profileId });
      setEmployee(res.data);
    } catch (error:any) {
      const err = await error;
      toast.error(err.message)
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
      typeof count === "number" ? Math.round(count).toLocaleString() : "0";
    const content = (
      <div className="bg-white m-2 p-3 rounded-[10.33px] shadow-lg flex items-center justify-between transform transition-transform duration-200 hover:scale-105">
        <div>
          <Typography
            variant="body2"
            className="text-sm text-gray-600 mb-2 font-satoshi"
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
  const onSubmit = async (value: any) => {
    const utcStartDate = new Date(value.startDate!);
    const formattedStartDate = format(utcStartDate, "yyyy-MM-dd'T'HH:mm:ss");
    value.startDate = formattedStartDate;
    const utcEndDate = new Date(value.endDate!);
    const formattedEndDate = format(utcEndDate, "yyyy-MM-dd'T'HH:mm:ss");
    value.endDate = formattedEndDate;
    GetDashboardCount(value.startDate, value.endDate);
  };
  const handleFirstCart = async () => {
    setFirstCart(true);
    setSecondCart(false);
    setThirdCart(false);
    setFourthCart(false);
    setSelectedcard("1");
  };
  const handleSecondCart = async () => {
    setFirstCart(false);
    setSecondCart(true);
    setThirdCart(false);
    setFourthCart(false);
    setSelectedcard("2");
  };
  const handleThirdCart = async () => {
    setFirstCart(false);
    setSecondCart(false);
    setThirdCart(true);
    setFourthCart(false);
    setSelectedcard("3");
  };
  const handleFourthCart = async () => {
    setFirstCart(false);
    setSecondCart(false);
    setThirdCart(false);
    setFourthCart(true);
    setSelectedcard("4");
  };
  const handleDownloadPDF = () => {
    accountGeneratePDF(data);
  };
  const handleDownloadExcel = () => {
    accountGenerateExcel(data);
  };
  return (
    <div className="bg-blue-200 h-screen">
      <Grid container sx={{ margin: 1 }}>
        <div className="flex justify-between w-full m-2 items-center gap-x-2">
          <div className="flex justify-start items-center w-[40%]">
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
          </div>
          <div className="flex w-full flex-wrap  justify-evenly items-center">
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit, submitting, errors, values }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="flex w-1/2 md:w-full  items-center flex-1 gap-x-2 justify-between">
                    <div className="w-[47%]">
                      <Field name="startDate">
                        {({ input, meta }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              disableFuture
                              inputFormat="DD/MM/YYY"
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
                              inputFormat="DD/MM/YYY"
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
                      className="md:w-10 md:h-10 h-4 w-4 bg-[#30A9FF] shadow-sm rounded flex justify-center items-center text-white"
                      type="submit"
                    >
                      <SearchIcon className="md:w-6 md:h-6 h-3 w-3" />
                    </button>
                  </div>
                </form>
              )}
            />
            <div className="flex justify-between items-center gap-x-2">
              <Tooltip title="Download PDF">
                <button
                  className="md:w-10 md:h-10 h-4 w-4 bg-[#0095FF] shadow-sm rounded flex justify-center items-center text-white"
                  onClick={handleDownloadPDF}
                >
                  <PictureAsPdfSharpIcon className="md:w-6 md:h-6 h-3 w-3" />
                </button>
              </Tooltip>
              <Tooltip title="Download Excel">
                <button
                  className="md:w-10 md:h-10 h-4 w-4 bg-[#3BDB03] shadow-sm rounded flex justify-center items-center text-white"
                  onClick={handleDownloadExcel}
                >
                  <FileDownloadOutlinedIcon className="md:w-6 md:h-6 h-3 w-3" />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
        <Grid item md={12}>
          {UserData.role.toLowerCase() === "account" ? (
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
                      {secondCart && (
                        <>
                          {data.map((item, index) => (
                            <div key={index}>
                              <div className="bg-blue-200 md:p-7 p-2">
                                <Grid container spacing={2}>
                                  {item.totalAccounts &&
                                    renderCountBox(
                                      "Total Accounts",
                                      item.totalAccounts,
                                      TotalAccounts,
                                      "/account"
                                    )}
                                  {item.totalAmount &&
                                    renderCountBox(
                                      "Total Amount",
                                      item.totalAmount,
                                      TotalAccounts,
                                      "/account"
                                    )}
                                </Grid>
                                <Grid container spacing={2}>
                                  {item.accounts &&
                                    item.accounts.map(
                                      (account: Account, idx: number) =>
                                        renderCountBox(
                                          account.accountCode!,
                                          account.amount,
                                          Accounts,
                                          "/account"
                                        )
                                    )}
                                </Grid>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                      {thirdCart && (
                        <div className="bg-blue-200 md:p-7 p-2">
                          <Grid container spacing={2}>
                            <Grid item md={6}>
                              <AdminCommissionChart />
                            </Grid>
                            <Grid item md={6}>
                              <AdminPolicyChart />
                            </Grid>
                          </Grid>
                        </div>
                      )}
                      {fourthCart && employee && (
                        <>
                          <Typography className="text-lg font-medium text-gray-800">
                            Monthly Attendance Record
                          </Typography>
                          <AttendanceCard employee={employee} />
                          <Grid container>
                            {data[0]?.monthlyHolidays?.holidays.map(
                              (holiday: any, index: number) =>
                                renderCountBox(
                                  holiday.name.toUpperCase(),
                                  dayjs(holiday.date).format("MM/DD/YYYY dddd"),
                                  ""
                                )
                            )}
                          </Grid>
                        </>
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
    </div>
  );
};
export default AccountDashboard;
