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
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  console.log("first", UserData);
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
        console.error("Error fetching HR Dashboard data:", error);
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
  return (
    <div className="bg-blue-200 h-[100%] scrollbar">
      <CardContent>
        <Grid>
          <div className="flex w-[100%] items-center lg:flex-row  md:flex-row flex-col sm:flex-row sm:items-center sm:w-[100%] md:w-[100%] justify-center md:flex-wrap md:justify-center bg-blue-200 md:pr-1 sm:justify-between lg:justify-between lg:w-[100%]">
            <div className="flex justify-start lg:w-[30%] flex-wrap lg:flex-nowrap lg:justify-between items-center md:w-[100%] md:justify-around sm:w-[100%] md:items-center md:flex-nowrap sm:justify-start">
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
              <CartButton
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
            </div>
            <div className="md:mt-0 md:flex-row flex sm:flex-row md:w-[100%] w-full justify-around items-center flex-nowrap sm:items-center sm:justify-center sm:w-[40%] py-2 lg:w-[40%] md:justify-between">
              <div className="md:w-[60%] sm:w-[50%] w-[50%] lg:w-[100%]">
                <Form
                  onSubmit={onSubmit}
                  render={({ handleSubmit, submitting, errors, values }) => (
                    <form onSubmit={handleSubmit} noValidate>
                      <div className="flex w-full md:justify-around justify-start md:gap-x-0 gap-x-2 items-center sm:justify-start sm:items-center lg:w-[100%] md:w-[100%]">
                        <div className="md:w-[35%] w-[40%] sm:w-[4vw] sm:h-[10%] lg:w-[42%]">
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
                        <div className="md:w-[35%] w-[40%] sm:w-[4vw] sm:h-[10%] lg:w-[42%]">
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
                          className=" h-10 w-10 sm:w-8 sm:h-10 lg:w-8 lg:h-10 md:w-[10%] md:h-10 bg-[#30A9FF] shadow-sm rounded flex justify-center items-center text-white sm:justify-center sm:items-center"
                          type="submit"
                        >
                          <SearchIcon className="w-6 h-6 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </form>
                  )}
                />
              </div>
              <div className="flex md:my-0 md:gap-x-0 gap-x-3 md:w-[40%] w-[50%] items-center sm:w-[50%] sm:items-start lg:justify-around lg:w-[40%] md:justify-evenly justify-end">
                <Tooltip title="Download PDF">
                  <button
                    className="h-10 w-10 lg:h-10 lg:w-8 md:w-10 md:h-10 sm:w-8 sm:h-10 bg-[#0095FF] shadow-sm rounded flex justify-center items-center text-white"
                    onClick={handleDownloadPDF}
                  >
                    <PictureAsPdfSharpIcon className=" h-6 w-6 sm:w-5 sm:h-5" />
                  </button>
                </Tooltip>
                <Tooltip title="Download Excel">
                  <button
                    className="h-10 w-10 lg:h-10 lg:w-8 md:w-10 md:h-10 sm:w-8 sm:h-10 bg-[#3BDB03] shadow-sm rounded flex justify-center items-center text-white"
                    onClick={handleDownloadExcel}
                  >
                    <FileDownloadOutlinedIcon className="w-6 h-6 sm:w-5 sm:h-5" />
                  </button>
                </Tooltip>
                <button className=" h-10 w-10 lg:h-10 lg:w-8 md:w-10 md:h-10 sm:w-8 sm:h-10 bg-[#E79E28] shadow-sm rounded flex justify-center items-center text-white">
                  {isLoading ? (
                    <CircularProgress className="w-6 h-6 lg:h-10 lg:w-10 sm:w-5 sm:h-5" />
                  ) : (
                    <DashboardMenu
                      selectedCategory={selectedCategory}
                      className="w-6 h-6 lg:h-10 lg:w-10 sm:w-5 sm:h-5"
                    />
                  )}
                </button>
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
                                <div className="bg-blue-200 sm:mt-4">
                                  <div className="md:flex hidden w-[50%] lg:w-[100%] md:w-[100%] justify-center items-center">
                                    {Object.entries(item.categories).map(
                                      ([category], catIndex) => (
                                        <Grid
                                          item
                                          md={4}
                                          xs={12}
                                          key={category}
                                          className={`md:p-1  flex items-center justify-center ${
                                            catIndex === selectedCategoryIndex
                                              ? "bg-[#0095FF] shadow-md "
                                              : "bg-white text-black"
                                          }`}
                                        >
                                          <Button
                                            className="w-full"
                                            type="button"
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
                                                      ? "text-white"
                                                      : "text-black"
                                                  }`}
                                                >
                                                  {category ||
                                                    "Unnamed Category"}
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
                                                      ? "text-[#0095FF]"
                                                      : "text-black"
                                                  }`}
                                                >
                                                  {category ||
                                                    "Unnamed Category"}
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
                                    className="h-[63vh] mb-2 overflow-y-auto scrollbar lg:scrollbar p-2 mt-5"
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
                                  <div className="bg-blue-200 md:p-7 p-2">
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
                                  <div className="bg-blue-200 md:p-7 p-2">
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
                          <div className="bg-blue-200 md:p-7 p-2">
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
                          <div className="bg-blue-200 md:p-7 p-2">
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
        </Grid>
      </CardContent>
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
      className={`p-1 md:p-2 ${
        isSelected ? "bg-[#E59411] shadow-md" : ""
      } rounded`}
    >
      <Tooltip title={tooltipTitle} arrow>
        <Button size={buttonSize} type="button" onClick={onClick}>
          {iconPath}
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
    <div className="bg-white m-2 p-3 rounded-[10.33px] shadow-lg flex items-center justify-between transform transition-transform duration-200 hover:scale-105">
      <div>
        <Typography
          variant="body2"
          className="text-sm text-gray-600 mb-2 font-satoshi"
        >
          {title}
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
