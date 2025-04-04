import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Tooltip,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import {
  DAYJS_DISPLAY_FORMAT,
  RmLinkMapper,
  SafeKaroUser,
  header,
} from "../../context/constant";
import { IData } from "./IDashboard";
import PictureAsPdfSharpIcon from "@mui/icons-material/PictureAsPdfSharp";
import AdminCommissionChart from "./Chart/AdminCommissionChart";
import AdminPolicyChart from "./Chart/AdminPolicyChart";
import { startOfMonth, endOfMonth, format } from "date-fns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Field, Form } from "react-final-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import RevenueChart from "./Chart/AdminRevenueChart";
import GetRMDashboardService from "../../api/Dashboard/GetRMDashboard/GetRMDashboardService";
import { rmGeneratePDF } from "../../utils/DashboardPdf";
import { rmGenerateExcel } from "../../utils/DashboardExcel";
import { CartButton } from "./dashboard";
import SearchIcon from "@mui/icons-material/Search";
import {
  AttendanceDataSvg,
  MotorSvg,
  PlanDetailsDataSvg,
  ViewAdminDataSvg,
  ViewChartSvg,
} from "./data/Svg";
import AttendanceCard from "../HR/Attendance/AttendanceRecord/AttendanceCard";
import GetAttendanceCountService from "../../api/Role/GetAttendanceCount/GetAttendanceCountService";
import { IEmployee } from "../HR/Attendance/IAttendance";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import SwipeableTemporaryDrawer from "../../utils/ui/SwipeableTemporaryDrawer";


const RMDashboard: React.FC = () => {
  const [data, setData] = useState<IData[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [employee, setEmployee] = useState<IEmployee | null>();
  const [firstCart, setFirstCart] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [secondCart, setSecondCart] = useState(false);
  const [thirdCart, setThirdCart] = useState(false);
  const [selectedCard, setSelectedcard] = useState("1");
  const [categoryEntries, setCategoryEntries] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("");
  const [fourthCart, setFourthCart] = useState(false);
  const [fifthCart, setFifthCart] = useState(false);
  const [open, setOpen] = useState(false);
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const GetDashboardCount = useCallback(
    (startDate: string, endDate: string, rmId: string) => {
      GetRMDashboardService({
        header,
        startDate,
        endDate,
        rmId,
      })
        .then((dashboardData) => {
          setIsVisible(true);
          setData(dashboardData.data);
          const cat = Object.keys(dashboardData.data[0].categories).sort()
         setSelectedCategory(cat[0]);

          const entries = dashboardData.data.flatMap((item: any) =>
            Object.entries(item.categories)
          );
          setCategoryEntries(entries);
        })
        .catch((error: any) => {
          throw error
          setIsVisible(true);
        });
    },
    // eslint-disable-next-line
    [header]
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
  useEffect(() => {
    const currentDate = new Date();
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    const formattedFirstDay = format(firstDayOfMonth, "yyyy-MM-dd");
    const formattedLastDay = format(lastDayOfMonth, "yyyy-MM-dd");
    getAttendanceRecord();
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await GetDashboardCount(
          formattedFirstDay,
          formattedLastDay,
          UserData.profileId
        );
      } catch (error) {
        throw error
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, [GetDashboardCount, UserData.profileId]);
 
  const renderCountBox = (title: any, count: any, icon: string, link?: any) => {

    const content = (
      <div style={{ boxShadow: '6.08px 6.08px 30.41px 0px #F2DDD480' }} className="bg-white cursor-pointer m-2 p-3 rounded-2xl shadow-lg flex items-center justify-between transform transition-transform duration-200 hover:scale-105">
        <div>
          <Typography
            variant="body2"
            className="text-sm text-gray-600 mb-2 font-satoshi"
          >
            {title === 'Policy Count' ? 'Remaining Policy Count' : title}
          </Typography>
          <Typography
            variant="h5"
            className="text-base font-bold text-[#202224]"
          >
            {count}
          </Typography>
        </div>
      </div>
    );
    const urlPath = RmLinkMapper[link]?RmLinkMapper[link]:link;
    return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        {link ? (
          <Link to={urlPath}  state={selectedCategory} >
            {content}
          </Link>
        ) : (
          content
        )}
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
    GetDashboardCount(value.startDate, value.endDate, UserData.profileId);
  };
  const handleFirstCart = async () => {
    setFirstCart(true);
    setThirdCart(false);
    setSecondCart(false);
    setFourthCart(false);
    setFifthCart(false);
    setSelectedcard("1");
  };
  const handleSecondCart = async () => {
    setSecondCart(true);
    setFirstCart(false);
    setThirdCart(false);
    setFourthCart(false);
    setFifthCart(false);
    setSelectedcard("2");
  };
  const handleThirdCart = async () => {
    setFirstCart(false);
    setThirdCart(true);
    setSecondCart(false);
    setFourthCart(false);
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
    setThirdCart(false);
    setSecondCart(false);
    setFourthCart(false);
    setFifthCart(true);
    setSelectedcard("5");
    
  };
  const openDateFilter = () => {
    setOpen(!open)
  }
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
  const handleCategoryCart = async (index: any, key?: any) => {
    setSelectedCategoryIndex(index);
    setSelectedCategory(key);
  };
  const handleDownloadPDF = () => {
    rmGeneratePDF(data);
  };
  const handleDownloadExcel = () => {
    rmGenerateExcel(data);
  };
  const isValidIndex = (index: any) =>
    index >= 0 && index < categoryEntries.length;

  return (
    <div className=" h-screen">
      <CardContent>
        <Grid container>
          <div className="flex w-full items-center flex-col gap-2 md:gap-0 lg:flex-row justify-start">
            <div className="flex lg:justify-start justify-center gap-x-1  lg:gap-x-8 items-center w-[40%]">
              <CartButton
                onClick={handleFirstCart}
                tooltipTitle="View Policy Data"
                iconPath={<MotorSvg isActive={selectedCard === "1"} />}
                isSelected={firstCart}
              />
              <CartButton
                onClick={handleSecondCart}
                tooltipTitle="View Chart"
                iconPath={<ViewChartSvg isActive={selectedCard === "2"} />}
                isSelected={secondCart}
              />
              <CartButton
                onClick={handleThirdCart}
                tooltipTitle="View Admin Data"
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
                iconPath={
                  <PlanDetailsDataSvg isActive={selectedCard === "5"} />
                }
                isSelected={fifthCart}
              />

              <div
                className={`flex w-8 h-8 md:w-10 md:h-10 lg:hidden justify-center items-center  rounded-full shadow-lg m-1`}
              >
                <Tooltip title="Date Filter" arrow>
                  <Button className="w-full h-full text-black" type="button" onClick={openDateFilter}>
                    <svg width="24"
                      height="24" xmlns="http://www.w3.org/2000/svg" fill="#00000" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                    </svg>
                  </Button>
                </Tooltip>
              </div>

              <div
                className={`flex w-8 h-8 md:w-10 md:h-10 lg:hidden justify-center items-center  rounded-full shadow-lg m-1`}
              >
                <Button className="w-full h-full text-black" type="button" onClick={handleDownloadPDF} disabled={isLoading}>
                  <Tooltip title="Download PDF">
                    {isLoading ? <CircularProgress className="h-6 w-6" /> : <PictureAsPdfSharpIcon className="h-6 w-6" />}
                  </Tooltip>
                </Button>
              </div>

              <div
                className={`flex w-8 h-8 md:w-10 md:h-10 lg:hidden justify-center items-center  rounded-full shadow-lg m-1`}
              >
                <Button className="w-full h-full text-black" type="button" onClick={handleDownloadExcel} disabled={isLoading}>
                  <Tooltip title="Download Excel">
                    {isLoading ? <CircularProgress className="h-6 w-6" /> : <FileDownloadOutlinedIcon className="h-6 w-6" />}

                  </Tooltip>
                </Button>
              </div>
            </div>

            <div className="lg:flex hidden w-full md:flex-wrap  justify-center lg:justify-end gap-x-2 items-center">
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
                        className="md:w-10 md:h-10 h-4 w-4 bg-white  rounded-full flex justify-center items-center text-black shadow-lg"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <CircularProgress className="md:w-6 md:h-6 h-3 w-3" />
                        ) : (
                          <SearchIcon className="md:w-6 md:h-6 h-3 w-3" />
                        )}
                      </button>
                    </div>
                  </form>
                )}
              />
              <div className="flex justify-between items-center gap-x-2">
                <Tooltip title="Download PDF">
                  <button
                    className="md:w-10 md:h-10 h-4 w-4 bg-white  rounded-full flex justify-center items-center text-black shadow-lg"
                    onClick={handleDownloadPDF}
                  >
                    <PictureAsPdfSharpIcon className="md:w-6 md:h-6 h-3 w-3" />
                  </button>
                </Tooltip>
                <Tooltip title="Download Excel">
                  <button
                    className="md:w-10 md:h-10 h-4 w-4 bg-white  rounded-full flex justify-center items-center text-black shadow-lg"
                    onClick={handleDownloadExcel}
                  >
                    <FileDownloadOutlinedIcon className="md:w-6 md:h-6 h-3 w-3" />
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>
          <hr className="h-1 w-full rounded-lg bg-[#F15729] lg:hidden my-2 " />
          <Grid item md={12}>
            <>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {isVisible ? (
                    <>
                      {firstCart && (
                        <>
                          {data.map((item, index) => (
                            <>
                              <div key={index}>
                                <div className=" w-full ">
                                  <div className="flex  justify-center  my-3 items-center shadow-sm">
                                    {Object.entries(item.categories).sort().map(
                                      ([category], catIndex) => (
                                        <Grid
                                          item
                                          md={3}
                                          key={category}
                                          className={`p-1  flex items-center justify-center ${catIndex === selectedCategoryIndex
                                            ? "shadow-custom-sb   font-bold bg-[#F2DDD499] rounded-lg"
                                            : "bg-white text-black"
                                            }`}
                                        >
                                          <Button
                                            type="button"
                                            onClick={() =>
                                              handleCategoryCart(
                                                catIndex,
                                                category
                                              )
                                            }
                                          >
                                            <Tooltip
                                              title={`View ${category} Data`}
                                            >
                                              <h2
                                                className={` font-satoshi font-semibold text-center ${catIndex ===
                                                  selectedCategoryIndex
                                                  ? "text-[#F15729]"
                                                  : "text-black"
                                                  }`}
                                              >
                                                {category || "Unnamed Category"}
                                              </h2>
                                            </Tooltip>
                                          </Button>
                                        </Grid>
                                      )
                                    )}
                                  </div>

                                  <Grid container>
                                    {isValidIndex(selectedCategoryIndex) && (
                                      <Grid container sx={{ margin: 1 }}>
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
                                              `${key.toLowerCase()}`
                                            )}
                                          </React.Fragment>
                                        ))}
                                      </Grid>
                                    )}
                                  </Grid>
                                </div>
                              </div>
                            </>
                          ))}
                        </>
                      )}
                      {secondCart && (
                        <>
                          {data.map((item, index) => (
                            <>
                              <div key={index}>
                                <div className=" md:p-7 p-2">
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
                      {thirdCart && (
                        <div className=" md:p-7 p-2">
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
                      {fourthCart && employee && (
                        <>
                          <Typography className="text-lg font-medium text-gray-800">
                            Monthly Attendance Record
                          </Typography>
                          <AttendanceCard employee={employee} />
                        </>
                      )}
                      {fifthCart && (
                        <div className=" md:p-7 p-2">
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
                                  {Object?.entries(UserData.userLimit).map(
                                    ([key, value]) => (
                                      <React.Fragment key={key}>
                                        {renderCountBox(
                                          key.toUpperCase(),
                                          value === 'Infinity' ? "Unlimited" : Number(value) || 0,
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
          </Grid>
        </Grid>
      </CardContent>
      <SwipeableTemporaryDrawer open={open} setOpen={setOpen}>
        <>
          <Box height={300} display="flex" justifyContent="space-between" alignItems="center" gap={5}>
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-xl shadow-2xl border border-gray-200">
                  <div className="flex flex-col md:flex-row gap-6 items-center justify-center " >
                    <Field name="startDate" style={{ boxShadow: '6.08px 6.08px 30.41px 0px #F2DDD480' }}>
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
                                className="bg-white rounded-md"
                                error={meta.touched && !!meta.error}
                                helperText={meta.touched && meta.error}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      )}
                    </Field>

                    <Field name="endDate" style={{ boxShadow: '6.08px 6.08px 30.41px 0px #F2DDD480' }}>
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
                                className="bg-white rounded-md"
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
                      className="flex items-center justify-center px-5 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 disabled:opacity-50 transition duration-300 ease-in-out"
                      disabled={submitting}
                    >
                      {submitting ? <CircularProgress size={24} className="text-white" /> : <SearchIcon className="mr-2" />}
                      <span>Search</span>
                    </button>
                  </div>
                </form>
              )}
            />
          </Box>
        </>

      </SwipeableTemporaryDrawer>
    </div>
  );
};
export default RMDashboard;
