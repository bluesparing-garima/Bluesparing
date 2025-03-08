import React, { useEffect, useState } from "react";
import { CardContent, CircularProgress, Grid, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { Field, Form } from "react-final-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Link } from "react-router-dom";
import { header, SafeKaroUser } from "../../context/constant";
import { endOfMonth, startOfMonth, format } from "date-fns";
import GetHrDashboardServices from "../../api/HR/GetHrDashboard/GetHrDashboardServices";
import dayjs from "dayjs";


const HrDashBoard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
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
        console.error("Error fetching HR Dashboard data:", error);
      }
    };
    if (UserData.role.toLowerCase() === "hr") {
      fetchData();
    }
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId);
  }, []);
  const renderCountBox = (
    title: string,
    count: number | string,
    path?: string
  ) => {
    let formattedCount = count;
    if (typeof count === "number") {
      formattedCount = Math.round(count).toLocaleString();
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
      console.error("Error fetching HR Dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {UserData.role.toLowerCase() === "hr" ? (
        <div className="bg-blue-200 h-[90vh]">
          <CardContent>
            <Grid container>
              <div className="flex w-full items-center justify-end bg-blue-200 pr-1">
                <div className="flex w-full flex-wrap justify-end gap-x-4 items-center">
                  <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit }) => (
                      <form onSubmit={handleSubmit} noValidate>
                        <div className="flex w-1/2 md:w-full items-center flex-1 gap-x-2 justify-between">
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
                            className="md:w-10 md:h-10 h-4 w-4 bg-[#30A9FF] shadow-sm rounded flex justify-center items-center text-white"
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
                </div>
              </div>
              <Grid item md={12}>
                <Grid container>
                  <Grid item xs={12}>
                    <div>
                      <div className="bg-blue-200 px-7 py-1">
                        <Typography className="text-md font-medium text-gray-800 font-satoshi">
                          Team Counts
                        </Typography>
                        <Grid container>
                          {data?.roles &&
                            Object.entries(data.roles).map(([key, value]) =>
                              renderCountBox(
                                key.toUpperCase(),
                                Number(value) || 0,
                                "/team"
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
                      <div className="bg-blue-200 px-7 py-1">
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
                    <div>
                      <div className="bg-blue-200 px-7 py-2">
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
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </div>
      ) : (
        <div>Access denied</div>
      )}
    </>
  );
};
export default HrDashBoard;
