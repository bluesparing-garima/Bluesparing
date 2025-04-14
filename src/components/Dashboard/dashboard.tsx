import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import getAdminDashboardService from "../../api/Dashboard/GetAdminDashboard/getAdminDashboardService";
import {
  DAYJS_DISPLAY_FORMAT,
  SafeKaroUser,
  header,
} from "../../context/constant";
import { IData } from "./IDashboard";
import SearchIcon from "@mui/icons-material/Search";
import AdminCommissionChart from "./Chart/AdminCommissionChart";
import AdminPolicyChart from "./Chart/AdminPolicyChart";
import { startOfMonth, endOfMonth, format } from "date-fns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Field, Form } from "react-final-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Link } from "react-router-dom";
import RevenueChart from "./Chart/AdminRevenueChart";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PictureAsPdfSharpIcon from "@mui/icons-material/PictureAsPdfSharp";
import { rmGenerateExcel as adminGenerateExcel } from "../../utils/DashboardExcel";
import { rmGeneratePDF as adminGeneratePdf } from "../../utils/DashboardPdf";
import DashboardMenu from "../../utils/DashboardMenu";
import {
  AttendanceDataSvg,
  MotorSvg,
  PlanDetailsDataSvg,
  ViewAdminDataSvg,
  ViewChartSvg,
  ViewPartnerSvg,
} from "./data/Svg";
import Attendance from "../HR/Attendance/AttendanceRecord/Attendance";
import PlanCard from "../UpdatePlan/PlanCard";
import dayjs from "dayjs";
import CustomIconButton from "./data/CustomIconButton";
import SwipeableTemporaryDrawer from "../../utils/ui/SwipeableTemporaryDrawer";
interface CartButtonProps {
  onClick: () => void;
  tooltipTitle: string;
  iconPath: JSX.Element;
  isSelected: boolean;
}
const Dashboard: React.FC = () => {
  const [data, setData] = useState<IData[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [firstCart, setFirstCart] = useState(true);
  const [secondCart, setSecondCart] = useState(false);
  const [thirdCart, setThirdCart] = useState(false);
  const [fourCart, setFourCart] = useState(false);
  const [fifthCart, setFifthCart] = useState(false);
  const [sixthCart, setSixthCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryEntries, setCategoryEntries] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedCard, setSelectedcard] = useState("1");
  const [open, setOpen] = useState(false);
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const GetDashboardCount = useCallback((startDate, endDate) => {
    getAdminDashboardService({
      header,
      startDate,
      endDate,
    })
      .then((dashboardData) => {
        setIsVisible(true);
        setData(dashboardData.data);
        const entries = dashboardData.data.flatMap((item: any) =>
          Object.entries(item.categories)
        );
        setCategoryEntries(entries);
        setSelectedCategory(entries[0][0]);
      })
      .catch((error) => {
        setIsVisible(true);
      });
  }, []);
  const handleDownloadPDF = () => {
    adminGeneratePdf(data);
  };
  const handleDownloadExcel = () => {
    adminGenerateExcel(data);
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
    fetchData();
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId);
  }, [GetDashboardCount]);

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
    setSelectedcard("1");
    setSecondCart(false);
    setThirdCart(false);
    setFourCart(false);
    setSixthCart(false);
    setFifthCart(false);
  };
  const handleSecondCart = async () => {
    setFirstCart(false);
    setSecondCart(true);
    setSelectedcard("2");
    setThirdCart(false);
    setFourCart(false);
    setSixthCart(false);
    setFifthCart(false);
  };
  const handleThirdCart = async () => {
    setFirstCart(false);
    setSecondCart(false);
    setThirdCart(true);
    setFourCart(false);
    setFifthCart(false);
    setSixthCart(false);
    setSelectedcard("3");
  };
  const handleFourCart = async () => {
    setFirstCart(false);
    setSecondCart(false);
    setThirdCart(false);
    setFourCart(true);
    setFifthCart(false);
    setSixthCart(false);
    setSelectedcard("4");
  };
  const handleFifthCart = async () => {
    setFirstCart(false);
    setSecondCart(false);
    setThirdCart(false);
    setFourCart(false);
    setFifthCart(true);
    setSixthCart(false);
    setSelectedcard("5");
  };
  const handleSixthCart = async () => {
    setFirstCart(false);
    setSecondCart(false);
    setThirdCart(false);
    setFourCart(false);
    setFifthCart(false);
    setSixthCart(true);
    setSelectedcard("6");
  };

  const planDetails = [
    {
      label: "Plan Name",
      value: UserData.planName,
    },
    {
      label: "Plan Start Date",
      value: dayjs(UserData.planStartDate).format(DAYJS_DISPLAY_FORMAT),
    },
    {
      label: "Plan Expiry Date",
      value: dayjs(UserData.planExpired).format(DAYJS_DISPLAY_FORMAT),
    },
    {
      label: "Policy Count",
      value: UserData.policyCount,
    },
  ];

  const handleCategoryCart = async (index: any, key?: any) => {
    setSelectedCategoryIndex(index);
    setSelectedCategory(key);
  };
  const isValidIndex = (index: any) =>
    index >= 0 && index < categoryEntries.length;
  const openDateFilter = () => {
    setOpen(!open);
  };
  return (
    <div className="pl-5 pr-5 pt-2 h-[100%] overflow-x-hidden min-h-screen ">
      <Grid container>
        <div className="flex justify-between w-full m-2 items-center gap-x-2 gap-3 md:gap-0">
          <div className="flex justify-between w-[100%] items-center lg:w-[12%] lg:gap-x-5 sm:w-[100%]">
            <CartButton
              onClick={handleFirstCart}
              tooltipTitle="View Policy Data"
              iconPath={
                <MotorSvg
                  isActive={selectedCard === "1"}
                  className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
                />
              }
              isSelected={firstCart}
            />
            <CartButton
              onClick={handleSecondCart}
              tooltipTitle="View Partner Data"
              iconPath={
                <ViewPartnerSvg
                  isActive={selectedCard === "2"}
                  className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
                />
              }
              isSelected={secondCart}
            />
            <CartButton
              onClick={handleThirdCart}
              tooltipTitle="View Admin Data"
              iconPath={
                <ViewChartSvg
                  isActive={selectedCard === "3"}
                  className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
                />
              }
              isSelected={thirdCart}
            />
            <CartButton
              onClick={handleFourCart}
              tooltipTitle="View Chart "
              iconPath={
                <ViewAdminDataSvg
                  isActive={selectedCard === "4"}
                  className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
                />
              }
              isSelected={fourCart}
            />
            {
              UserData.userLimit.hr &&   <CartButton
              onClick={handleFifthCart}
              tooltipTitle="Monthly Attendance "
              iconPath={
                <AttendanceDataSvg
                  isActive={selectedCard === "5"}
                  className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
                />
              }
              isSelected={fifthCart}
            />
            }
          
            <CartButton
              onClick={handleSixthCart}
              tooltipTitle="Plan Details "
              iconPath={
                <PlanDetailsDataSvg
                  isActive={selectedCard === "6"}
                  className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
                />
              }
              isSelected={sixthCart}
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
            <div className="lg:hidden">
              <CustomIconButton
                title="Download Excel"
                icon={
                  <DashboardMenu
                    selectedCategory={selectedCategory}
                    className="w-6 h-6 lg:h-10 lg:w-10 sm:w-5 sm:h-5"
                  />
                }
                isLoading={isLoading}
              />
            </div>
          </div>
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
              <CustomIconButton
                icon={
                  <DashboardMenu
                    selectedCategory={selectedCategory}
                    className="w-6 h-6"
                  />
                }
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
        <Grid item md={12}>
          {UserData.role.toLowerCase() === "admin" ? (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {isVisible ? (
                    <>
                      {firstCart && (
                        <>
                          {data.map((item, index) => (
                            <div key={index}>
                              <div className="sm:mt-4">
                                <div className="md:flex hidden w-[50%] lg:w-[100%] md:w-[100%] justify-end items-center pr-2">
                                  {Object.entries(item.categories).map(
                                    ([category], catIndex) => (
                                      <Grid
                                        item
                                        md={1.5}
                                        xs={12}
                                        key={category}
                                        className={`md:p-1 flex items-center justify-around ${
                                          catIndex === selectedCategoryIndex
                                            ? "shadow-[0_0_10px_2px_#F2DDD4] bg-[#F15729]"
                                            : "bg-white text-black shadow-[0_0_5px_1px_#F2DDD4]"
                                        }
                                        ${
                                          catIndex === 0
                                            ? "rounded-r-none rounded-l-lg"
                                            : "rounded-l-none rounded-r-lg"
                                        }`}
                                      >
                                        <Button
                                          className="w-full bg-transparent"
                                          type="button"
                                          disableRipple
                                          disableElevation
                                          onClick={() =>
                                            handleCategoryCart(
                                              catIndex,
                                              category
                                            )
                                          }
                                          disabled={isLoading}
                                        >
                                          {isLoading ? (
                                            <CircularProgress className="w-6 h-6 " />
                                          ) : (
                                            <Tooltip
                                              title={`View ${category} Data`}
                                            >
                                              <h2
                                                className={`w-full font-satoshi md:text-xs text-[10px] font-semibold text-center ${
                                                  catIndex ===
                                                  selectedCategoryIndex
                                                    ? "text-white font-bold"
                                                    : "text-[#636566]"
                                                }`}
                                              >
                                                {category || "Unnamed Category"}
                                              </h2>
                                            </Tooltip>
                                          )}
                                        </Button>
                                      </Grid>
                                    )
                                  )}
                                </div>
                                <div className="flex w-full md:hidden justify-center items-center">
                                  <FormControl fullWidth>
                                    <InputLabel>Select Category</InputLabel>
                                    <Select
                                      value={selectedCategoryIndex}
                                      onChange={(e) => {
                                        const selectedIndex = e.target
                                          .value as number;
                                        handleCategoryCart(
                                          selectedIndex,
                                          Object.keys(item.categories)[
                                            selectedIndex
                                          ]
                                        );
                                      }}
                                    >
                                      {Object.entries(item.categories).map(
                                        ([category], catIndex) => (
                                          <MenuItem
                                            key={category}
                                            value={catIndex}
                                          >
                                            <Tooltip
                                              title={`View ${category} Data`}
                                            >
                                              <h2
                                                className={`font-satoshi text-center ${
                                                  catIndex ===
                                                  selectedCategoryIndex
                                                    ? "text-white font-bold"
                                                    : "text-[#636566]"
                                                }`}
                                              >
                                                {category || "Unnamed Category"}
                                              </h2>
                                            </Tooltip>
                                          </MenuItem>
                                        )
                                      )}
                                    </Select>
                                  </FormControl>
                                </div>
                                <Grid
                                  container
                                  className="h-[68vh] mb-2 overflow-y-auto overflow-x-hidden scrollbar lg:scrollbar p-2 mt-5"
                                >
                                  {isValidIndex(selectedCategoryIndex) && (
                                    <Grid container>
                                      {Object.entries(
                                        categoryEntries[
                                          selectedCategoryIndex
                                        ][1]
                                      ).map(([key, value]) => (
                                        <React.Fragment key={key}>
                                          {renderCountBox(
                                            key,
                                            value,
                                            "",
                                            `/${key.toLowerCase()}`,
                                            selectedCategory
                                          )}
                                        </React.Fragment>
                                      ))}
                                    </Grid>
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
                            <>
                              <div key={index}>
                                <div className="md:p-7 p-2">
                                  <Typography
                                    variant="h5"
                                    className="text-lg font-bold text-gray-800"
                                  >
                                    Account Counts
                                  </Typography>
                                  <Grid container>
                                    <React.Fragment key={index}>
                                      {renderCountBox(
                                        `Total Account - ${item.totalAccounts}`,
                                        item.totalAmount,
                                        "",
                                        `/account`,
                                        selectedCategory
                                      )}
                                    </React.Fragment>
                                    {Object.entries(item.accounts).map(
                                      ([accountCode, account], index) => (
                                        <React.Fragment key={index}>
                                          {renderCountBox(
                                            accountCode,
                                            account.amount,
                                            "",
                                            `/account/creditdebit/${account.accountId}/view`
                                          )}
                                        </React.Fragment>
                                      )
                                    )}
                                  </Grid>
                                  <Typography
                                    variant="h5"
                                    className="text-lg font-bold text-gray-800"
                                  >
                                    Booking Counts
                                  </Typography>
                                  <Grid container>
                                    {Object.entries(item.bookingRequests).map(
                                      ([key, value]) => (
                                        <>
                                          {renderCountBox(
                                            key.toUpperCase(),
                                            value || 0,
                                            "",
                                            `/booking`
                                          )}
                                        </>
                                      )
                                    )}
                                  </Grid>
                                  <Typography
                                    variant="h5"
                                    className="text-lg font-bold text-gray-800"
                                  >
                                    Lead Counts
                                  </Typography>
                                  <Grid container>
                                    {Object.entries(item.leadCounts).map(
                                      ([key, value]) => (
                                        <>
                                          {renderCountBox(
                                            key.toUpperCase(),
                                            value || 0,
                                            "",
                                            `/lead`
                                          )}
                                        </>
                                      )
                                    )}
                                  </Grid>
                                </div>
                              </div>
                            </>
                          ))}
                        </>
                      )}
                      {thirdCart && (
                        <>
                          {data.map((item, index) => (
                            <>
                              <div key={index}>
                                <div className="md:p-7 p-2">
                                  <Typography
                                    variant="h5"
                                    className="text-lg font-bold text-gray-800"
                                  >
                                    Team Counts
                                  </Typography>
                                  <Grid container>
                                    {Object.entries(item.roleCounts).map(
                                      ([key, value]) => (
                                        <>
                                          {renderCountBox(
                                            key.toUpperCase(),
                                            value || 0,
                                            "",
                                            `/team?role=${key}`
                                          )}
                                        </>
                                      )
                                    )}
                                  </Grid>
                                  <Typography
                                    variant="h5"
                                    className="text-lg font-bold text-gray-800"
                                  >
                                    Admin Counts
                                  </Typography>
                                  <Grid container>
                                    {Object.entries(item.adminCounts).map(
                                      ([key, value]) => (
                                        <>
                                          {renderCountBox(
                                            key.toUpperCase(),
                                            value || 0,
                                            "",
                                            `/${key.toLowerCase()}`
                                          )}
                                        </>
                                      )
                                    )}
                                  </Grid>
                                </div>
                              </div>
                            </>
                          ))}
                        </>
                      )}
                      {fourCart && (
                        <div className="md:p-7 p-2">
                          <Grid container spacing={2}>
                            <Grid item md={6}>
                              <AdminCommissionChart />
                            </Grid>
                            <Grid item md={6}>
                              <AdminPolicyChart />
                            </Grid>
                            <Grid item md={6}>
                              <RevenueChart />
                            </Grid>
                          </Grid>
                        </div>
                      )}
                      {fifthCart && (
                        <>
                          <Attendance />
                        </>
                      )}
                      {sixthCart && (
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
                                  item.value || "N/A",
                                  "",
                                  `/update-plan`
                                )}
                              </React.Fragment>
                            ))}
                          </Grid>

                          {UserData.userLimit &&
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
                                            : value || 0,
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
        <SwipeableTemporaryDrawer open={open} setOpen={setOpen}>
          <Box textAlign="center" mb={3}>
            <h4
              className="text-gray-800"
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Select Date Range
            </h4>
          </Box>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit} className="space-y-6">
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", md: "row" }}
                  gap={2}
                >
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
                      color: "black",
                      mt: 2,
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

export const CartButton: React.FC<CartButtonProps> = ({
  onClick,
  tooltipTitle,
  iconPath,
  isSelected,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const buttonSize = isSmallScreen ? "small" : "medium";

  return (
    <div
      className={`w-10 border h-10 md:w-9 md:h-9 flex justify-center items-center rounded-lg  shadow-[0_0_5px_2px_#F2DDD4] transition duration-200 
        ${
          isSelected
            ? "bg-[#F15729] shadow-sm"
            : "border border-gray-100 hover:bg-gray-200"
        }
      `}
    >
      <Tooltip title={tooltipTitle} arrow>
        <Button
          size={buttonSize}
          type="button"
          onClick={onClick}
          disableRipple
          disableElevation
          sx={{
            minWidth: 0,
            width: "100%", // Button ko full width dene ke liye
            height: "100%", // Button ko full height dene ke liye
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            "&:hover": { backgroundColor: "transparent" },
            "&:focus": { outline: "none" },
          }}
        >
          <span className="h-full w-full flex justify-center items-center">
            {iconPath}
          </span>
        </Button>
      </Tooltip>
    </div>
  );
};

const renderCountBox = (
  title: any,
  count: any,
  icon: string,
  link?: any,
  selectedCategory?: any
) => {
  if (link === "/total payout amount") {
    link = "/payouts";
  }
  if (link === "/total payin amount") {
    link = "/payins";
  }
  if (link === "/total policy count" || link === "/monthly policy count") {
    link = "/policy/motor-policies";
  }
  if (link === "/monthly payout amount") {
    link = "/payouts/monthly";
  }
  if (link === "/monthly payin") {
    link = "/payins/monthly";
  }
  if (link === "/total received payin amount") {
    link = "/payins/recieved";
  }
  if (link === "/monthly received payin") {
    link = "/payins/recieved/monthly";
  }
  if (link === "/total payin balance") {
    link = "/payins/balance";
  }
  if (link === "/monthly payin balance") {
    link = "/payins/balance/monthly";
  }
  if (link === "/total payin left dist") {
    link = "/payins/leftDistributed";
  }
  if (link === "/monthly payin left dist") {
    link = "/payins/leftDistributed/monthly";
  }
  if (link === "/monthly paid payout amount") {
    link = "/payouts/monthly/paid";
  }
  if (link === "/monthly payout balance") {
    link = "/payouts/monthly/balance";
  }
  if (link === "/monthly payout left dist") {
    link = "/payouts/monthly/leftDistributed";
  }
  if (link === "/total paid payout amount") {
    link = "/payouts/paid";
  }
  if (link === "/total payout balance") {
    link = "/payouts/balance";
  }
  if (link === "/total payout left dist") {
    link = "/payouts/leftDistributed";
  }
  if (link === "/monthly net premium") {
    link = "/netpremium/monthly_preminum";
  }
  if (link === "/monthly final premium") {
    link = "/finalpremium/monthly";
  }
  if (link === "/total net premium") {
    link = "/netpremium";
  }
  if (link === "/total final premium") {
    link = "/finalpremium";
  }
  if (link === "/total revenue" || link === "/monthly revenue") {
    link = "/dashboard";
  }
  if (
    link === "/quarterly renewed count" ||
    link === "/half yearly renewed count" ||
    link === "/yearly renewed count" ||
    link === "/monthly renewed policy count"
  ) {
    link = "/policy/renewals";
  }
  const content = (
    <div className="bg-white m-2 p-3 rounded-[10.33px] shadow-[0_0_10px_2px_#F2DDD4]  flex items-center justify-between transform transition-transform duration-200 hover:scale-105">
      <div>
        <Typography
          variant="body2"
          className="text-sm text-gray-600 mb-2 font-satoshi"
        >
          {title === "Policy Count" ? "Remaining Policy Count" : title}
        </Typography>
        <Typography variant="h5" className="text-base font-bold text-[#202224]">
          {count}
        </Typography>
      </div>
      {}
    </div>
  );
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      {link ? (
        <Link to={link} state={selectedCategory}>
          {content}
        </Link>
      ) : (
        content
      )}
    </Grid>
  );
};

export default Dashboard;
