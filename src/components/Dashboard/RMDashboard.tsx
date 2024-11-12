import React, { useCallback, useEffect, useState } from "react";
import { Button, CardContent, Grid, TextField, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { SafeKaroUser, header } from "../../context/constant";
import { IData } from "./IDashboard";
import PictureAsPdfSharpIcon from "@mui/icons-material/PictureAsPdfSharp";
import AdminCommisionChart from "./Chart/AdminCommisionChart";
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
import { AttendanceDataSvg, MotorSvg, ViewAdminDataSvg, ViewChartSvg } from "./data/Svg";
import AttendanceCard from "../HR/Attendance/AttendanceRecord/AttendanceCard";
import GetAttendanceCountService from "../../api/Role/GetAttendanceCount/GetAttendanceCountService";
import { IEmployee } from "../HR/Attendance/IAttendnace";
const RMDashboard: React.FC = () => {
  const [data, setData] = useState<IData[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [employee, setEmployee] = useState<IEmployee | null>();
  const [firstCart, setFirstCart] = useState(true);
  const [secondCart, setSecondCart] = useState(false);
  const [thirdCart, setThirdCart] = useState(false);
  const [selectedCard, setSelectedcard] = useState("1");
  const [categoryEntries, setCategoryEntries] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [fourthCart, setFourthCart] = useState(false);
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
          console.log("Data fetched", dashboardData);
          setIsVisible(true);
          setData(dashboardData.data);

          const entries = dashboardData.data.flatMap((item: any) =>
            Object.entries(item.categories)
          );
          setCategoryEntries(entries);
        })
        .catch((error: any) => {
          console.error("Error fetching dashboard data", error);
          setIsVisible(true);
        });
    },
    // eslint-disable-next-line
    [header]
  ); // Ensure all necessary dependencies are passed
  const getAttendaceRecord = async () => {
    try {
      const res = await GetAttendanceCountService({ header, eId: UserData.id });
      setEmployee(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const currentDate = new Date(); // Example current date
    // Calculate first day of current month
    const firstDayOfMonth = startOfMonth(currentDate);
    // Calculate last day of current month
    const lastDayOfMonth = endOfMonth(currentDate);
    // Format the dates if needed
    const formattedFirstDay = format(firstDayOfMonth, "yyyy-MM-dd");
    const formattedLastDay = format(lastDayOfMonth, "yyyy-MM-dd");
    getAttendaceRecord()
    const fetchData = () => {
      GetDashboardCount(formattedFirstDay, formattedLastDay, UserData.id);
    };
    fetchData();
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId);
     // eslint-disable-next-line
  }, [GetDashboardCount, UserData.id]);

  const renderCountBox = (title: any, count: any, icon: string, link?: any) => {
    const content = (
      <div className="bg-white cursor-pointer m-2 p-3 rounded-2xl shadow-lg flex items-center justify-between transform transition-transform duration-200 hover:scale-105">
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
            {count}
          </Typography>
        </div>
      </div>
    );

    return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        {content}
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
    GetDashboardCount(value.startDate, value.endDate, UserData.id);
  };

  const handleFirstCart = async () => {
    setFirstCart(true);
    setThirdCart(false);
    setSecondCart(false);
    setSelectedcard("1");
  };

  const handleSecondCart = async () => {
    setSecondCart(true);
    setFirstCart(false);
    setThirdCart(false);
    setFourthCart(false);
    setSelectedcard("2");
  };
  const handleThirdCart = async () => {
    setFirstCart(false);
    setThirdCart(true);
    setSecondCart(false);
    setFourthCart(false);
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
  const handleCategoryCart = async (index: any, key?: any) => {
    setSelectedCategoryIndex(index);
    //setSelectedCategoryKey(key);
  };
  const handleDownloadPDF = () => {
    rmGeneratePDF(data);
  };
  const handleDownloadExcel = () => {
    rmGenerateExcel(data);
  };

  // Check if selected index is valid
  const isValidIndex = (index: any) =>
    index >= 0 && index < categoryEntries.length;
  console.log("isValidIndex", isValidIndex);
  return (
    <div className="bg-blue-200 h-screen">
      <CardContent>
        <Grid container>
          <div className="flex w-full items-center justify-start bg-blue-200 pr-1">
            <div className="flex justify-start items-center w-[40%]">
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
                tooltipTitle="Monthly Attendace "
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
                                value={input.value || null} // Initialize the value if it's undefined
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
                                value={input.value || null} // Initialize the value if it's undefined
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
                                <div className="bg-blue-200 w-full ">
                                  <div className="flex w-full justify-center items-center">
                                    {Object.entries(item.categories).map(
                                      ([category], catIndex) => (
                                        <Grid
                                          item
                                          md={3}
                                          key={category}
                                          className={`p-1  flex items-center justify-center ${
                                            catIndex === selectedCategoryIndex
                                              ? "bg-[#0095FF] shadow-md "
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
                                                className={` font-inter font-semibold text-center ${
                                                  catIndex ===
                                                  selectedCategoryIndex
                                                    ? "text-white"
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

                                  {/* Selected Category Data */}
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
                                              `/${key.toLowerCase()}`
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
                                            "/team"
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
                        <div className="bg-blue-200 md:p-7 p-2">
                          <Grid container spacing={2}>
                            <Grid item md={6}>
                              <AdminCommisionChart />
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
    </div>
  );
};

export default RMDashboard;
