import React, { useEffect, useState } from "react";
import { Box, Button, CardContent, CircularProgress, Grid, TextField, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { Field, Form } from "react-final-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Link } from "react-router-dom";
import PictureAsPdfSharpIcon from "@mui/icons-material/PictureAsPdfSharp";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import {
  DAYJS_DISPLAY_FORMAT,
  header,
  SafeKaroUser,
} from "../../context/constant";
import { endOfMonth, startOfMonth, format } from "date-fns";
import GetHrDashboardServices from "../../api/HR/GetHrDashboard/GetHrDashboardServices";
import dayjs from "dayjs";
import { CartButton } from "./dashboard";
import { PlanDetailsDataSvg, ViewChartSvg } from "./data/Svg";
import SwipeableTemporaryDrawer from "../../utils/ui/SwipeableTemporaryDrawer";

const HrDashBoard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [firstCart, setFirstCart] = useState(true);
  const [selectedCard, setSelectedcard] = useState("1");
  const [secondCart, setSecondCart] = useState(false);
  const [open, setOpen] = useState(false);
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  useEffect(() => {
    const fetchData = async () => {
      const currentDate = new Date();
      const firstDayOfMonth = startOfMonth(currentDate);
      const lastDayOfMonth = endOfMonth(currentDate);
      const formattedFirstDay = format(firstDayOfMonth, "yyyy-MM-dd");
      const formattedLastDay = format(lastDayOfMonth, "yyyy-MM-dd");
      try {
        const response = await GetHrDashboardServices({
          header,
          startDate: formattedFirstDay,
          endDate: formattedLastDay,
          hrId: UserData.profileId,
        });
        if (response.status === "success") {
          setData(response.data);
        }
      } catch (error) {
      }
    };
    if (UserData.role.toLowerCase() === "hr") {
      fetchData();
    }
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId);
  }, []);

  const handleFirstCart = async () => {
    setFirstCart(true);
    setSecondCart(false);
    setSelectedcard("1");
  };
  const handleSecondCart = async () => {
    setFirstCart(false);
    setSecondCart(true);
    setSelectedcard("2");
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
    path?: string
  ) => {
    const formattedCount =
      typeof count === "number" ? Math.round(count).toLocaleString() : count;
    const content = (
      <div style={{ boxShadow: '6.08px 6.08px 30.41px 0px #F2DDD480' }} className="bg-white m-2 p-3 rounded-[10.33px] shadow-lg flex items-center justify-between transform transition-transform duration-200 hover:scale-105">
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
            {formattedCount}
          </Typography>
        </div>
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
    try {
      setIsLoading(true);
      const response = await GetHrDashboardServices({
        header,
        startDate: value.startDate,
        endDate: value.endDate,
        hrId: UserData.profileId,
      });
      if (response.status === "success") {
        setData(response.data);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };


  const openDateFilter = () => {
    setOpen(!open)
  }
  return (
    <>
      {UserData.role.toLowerCase() === "hr" ? (
        <div className="h-[90vh]">
          <CardContent>
            <Grid container>
              <div className="flex w-full items-center flex-col gap-2 mb-4 md:gap-0 md:flex-row justify-start">
                <div className="flex md:justify-start justify-center gap-x-3  lg:gap-x-8 items-center w-[40%]">
                  <CartButton
                    onClick={handleFirstCart}
                    tooltipTitle="View HR Data"
                    iconPath={<ViewChartSvg isActive={selectedCard === "1"} />}
                    isSelected={firstCart}
                  />
                  <CartButton
                    onClick={handleSecondCart}
                    tooltipTitle="Plan Details "
                    iconPath={
                      <PlanDetailsDataSvg isActive={selectedCard === "2"} />
                    }
                    isSelected={secondCart}
                  />

                  <div
                    className={`flex w-8 h-8 md:w-10 md:h-10 lg:hidden justify-center items-center  shadow-[0_0_5px_2px_#F2DDD4] rounded-full  m-1`}
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


                </div>
                <hr className="h-1 w-full rounded-lg bg-[#F15729] md:hidden my-3 " />
                <div className="md:flex hidden w-full md:flex-wrap  justify-center md:justify-end gap-x-2 items-center">
                  <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit }) => (
                      <form onSubmit={handleSubmit} noValidate>
                        <div className="flex w-3/4  md:w-full  items-center flex-1 gap-x-2 md:gap-x-3 lg:gap-x-4  justify-between">
                          <div className="w-[47%]">
                            <Field name="startDate">
                              {({ input }) => (
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DatePicker
                                    disableFuture
                                    inputFormat="DD/MM/YYYY"
                                    value={input.value || null}
                                    onChange={(date) => {
                                      input.onChange(date);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        {...params}
                                      />
                                    )}
                                  />
                                </LocalizationProvider>
                              )}
                            </Field>
                          </div>
                          <div className="w-[47%]">
                            <Field name="endDate">
                              {({ input }) => (
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DatePicker
                                    disableFuture
                                    inputFormat="DD/MM/YYYY"
                                    value={input.value || null}
                                    onChange={(date) => {
                                      input.onChange(date);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        {...params}
                                      />
                                    )}
                                  />
                                </LocalizationProvider>
                              )}
                            </Field>
                          </div>
                          <button
                        className="md:w-10 md:h-10 h-4 w-4 bg-white   rounded-full flex justify-center items-center text-black shadow-lg"
                        type="submit" disabled={isLoading}
                      >
                        {isLoading ? <CircularProgress
                          className="h-6 w-6"
                        /> :
                          <SearchIcon className=" h-6 w-6" />
                        }
                      </button>
                        </div>
                      </form>
                    )}
                  />
                </div>
              </div>
          
              <Grid item md={12}>
                {firstCart && (
                  <Grid container>
                    <Grid item xs={12}>
                      <div>
                        <div className=" px-7 py-1">
                          <Typography className="text-md font-medium text-gray-800 font-satoshi">
                            Team Counts
                          </Typography>
                          <Grid container>
                            {data?.roles &&
                              Object.entries(data.roles).map(([key, value]) =>
                                renderCountBox(
                                  key.toUpperCase(),
                                  Number(value) || 0,
                                  `/team?role=${key}`
                                )
                              )}
                            {data &&
                              renderCountBox(
                                "Today Leave count",
                                data.leaveCountToday || 0
                              )}
                            {data &&
                              renderCountBox(
                                "Today Present count",
                                data.presentCountToday || 0
                              )}
                          </Grid>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div>
                        <div className=" px-7 py-1">
                          {data?.leaveDetailsToday &&
                            data.leaveDetailsToday.length > 0 && (
                              <>
                                <Typography className="text-md font-medium text-gray-800 font-satoshi">
                                  Today Leave Details
                                </Typography>
                                <Grid container>
                                  {data.leaveDetailsToday.map(
                                    (leave: any, index: number) =>
                                      renderCountBox(
                                        leave.employeeName.toUpperCase(),
                                        leave.remarks
                                      )
                                  )}
                                </Grid>
                              </>
                            )}
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                    
                    {
                      data?.monthlyHolidays?.holidays.length>0 &&   <div>
                      <div className="px-7 py-2">
                        {data?.monthlyHolidays && (
                          <Typography className="text-md font-medium text-gray-800">
                            Monthly Holidays
                          </Typography>
                        )}
                        <Grid container>
                          {data?.monthlyHolidays?.holidays.map(
                            (holiday: any, index: number) =>
                              renderCountBox(
                                holiday.name.toUpperCase(),
                                dayjs(holiday.date).format("MM/DD/YYYY dddd")
                              )
                          )}
                        </Grid>
                      </div>
                    </div>
                    }
                     
                    </Grid>
                  </Grid>
                )}
                {secondCart && (
                  <div className=" md:p-7 p-2">
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
                                    value === 'Infinity' ? "Unlimited" : Number(value) || 0,
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
              </Grid>
            </Grid>
          </CardContent>
        </div>
      ) : (
        <div>Access denied</div>
      )}
      <SwipeableTemporaryDrawer open={open} setOpen={setOpen}>
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
      </SwipeableTemporaryDrawer>
    </>
  );
};
export default HrDashBoard;
