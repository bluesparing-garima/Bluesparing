import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, CardContent, CircularProgress, Grid, TextField, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import { DAYJS_DISPLAY_FORMAT, SafeKaroUser, header } from "../../context/constant";
import { IPartnerData } from "./IDashboard";
import BrokersIcon from "../../assets/broker.png";
import FinalPremiumIcon from "../../assets/finalPremium.png";
import MotorIcon from "../../assets/motor1.png";
import NetPremiumIcon from "../../assets/netPremium.png";
import AcceptedBookingIcon from "../../assets/acceptedBooking.png";
import RequestedBookingIcon from "../../assets/requestedBooking.png";
import TotalLeadIcon from "../../assets/totalLead.png";
import deleteIcon from "../../assets/delete.png";
import PayInCommissionIcon from "../../assets/payIn.png";
import PayOutCommissionIcon from "../../assets/payOut.png";
import { startOfMonth, endOfMonth, format } from "date-fns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Field, Form } from "react-final-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import getPartnerDashboardService from "../../api/Dashboard/GetPartnerDashboard/getPartnerDashboardService";
import PartnerPolicyChart from "./Chart/PartnerPolicyChart";
import PayOutCommissionChart from "./Chart/PayOutCommissionChart";
import { Link } from "react-router-dom";
import PictureAsPdfSharpIcon from "@mui/icons-material/PictureAsPdfSharp";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { partnerGeneratePDF } from "../../utils/DashboardPdf";
import { partnerGenerateExcel } from "../../utils/DashboardExcel";
import { CartButton } from "./dashboard";
import SearchIcon from "@mui/icons-material/Search";
import { MotorSvg, PlanDetailsDataSvg, ViewAdminDataSvg, ViewPartnerSvg } from "./data/Svg";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import SwipeableTemporaryDrawer from "../../utils/ui/SwipeableTemporaryDrawer";

const PartnerDashboard: React.FC = () => {
  const [data, setData] = useState<IPartnerData[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [firstCart, setFirstCart] = useState(true);
  const [secondCart, setSecondCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [thirdCart, setThirdCart] = useState(false);
  const [fourthCart, setFourthCart] = useState(false);
  const [selectedCard, setSelectedcard] = useState("1");
  const [open, setOpen] = useState(false);
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const GetDashboardCount = useCallback(
    (startDate, endDate) => {
      getPartnerDashboardService({
        header,
        startDate,
        endDate,
        partnerId: UserData.profileId,
      })
        .then((dashboardData) => {
          setIsVisible(true);
          setData(dashboardData.data);
        })
        .catch((error) => {
          setIsVisible(false);
          throw error;
        });
    },
    [UserData.profileId]
  );
  useEffect(() => {
    const currentDate = new Date();
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    const formattedFirstDay = format(firstDayOfMonth, "yyyy-MM-dd");
    const formattedLastDay = format(lastDayOfMonth, "yyyy-MM-dd");
    const fetchData = async () => {
      try {
        setIsLoading(true)
        GetDashboardCount(formattedFirstDay, formattedLastDay);
      } catch (error) {
        throw error
      } finally {
        setIsLoading(false);
      }
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
    const formattedCount = typeof count === "number" ? Math.round(count).toLocaleString() : count;
    const content = (
      <div style={{ boxShadow: '6.08px 6.08px 30.41px 0px #F2DDD480' }} className="bg-white m-2 p-3 rounded-lg shadow-lg flex items-center justify-between transform transition-transform duration-200 hover:scale-105">
        <div>
          <Typography
            variant="body2"
            className="text-sm text-[#595959] mb-2 font-satoshi font-medium"
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
        {icon && <img src={icon} alt={title} className="h-8 w-8" />}
      </div>
    );
    return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        {path ? <Link to={path}>{content}</Link> : content}
      </Grid>
    );
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
  const onSubmit = async (value: any) => {
    if (!value.startDate || !value.endDate) {

      toast.error("Both start date and end date are required");

      return;
    }
    const utcStartDate = new Date(value.startDate!);
    const utcEndDate = new Date(value.endDate!);

    if (isNaN(utcStartDate.getTime()) || isNaN(utcEndDate.getTime())) {
      toast.error("Invalid date selected. Please select valid dates.");
      return;
    }

    if (utcEndDate < utcStartDate) {
      toast.error("End date cannot be before start date.")
      return;
    }

    const formattedStartDate = format(utcStartDate, "yyyy-MM-dd'T'HH:mm:ss");
    value.startDate = formattedStartDate;
    const formattedEndDate = format(utcEndDate, "yyyy-MM-dd'T'HH:mm:ss");
    value.endDate = formattedEndDate;
    GetDashboardCount(value.startDate, value.endDate);
    setOpen(false)
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
    partnerGeneratePDF(data);
  };
  const handleDownloadExcel = () => {
    partnerGenerateExcel(data);
  };


  const openDateFilter = () => {
    setOpen(!open)
  }
  return (
    <div className=" h-screen ">
      <CardContent>
        <Grid container>
          <div className="flex w-full items-center flex-col gap-2 md:gap-0 md:flex-row justify-start">
            <div className="flex md:justify-start justify-center gap-x-3  lg:gap-x-8 items-center w-[40%]">
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
                tooltipTitle="Plan Details "
                iconPath={<PlanDetailsDataSvg isActive={selectedCard === "4"} />}
                isSelected={fourthCart}
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
            <hr className="h-1 w-full rounded-lg bg-[#F15729] md:hidden  " />
            <div className="md:flex hidden w-full md:flex-wrap  justify-center md:justify-end gap-x-2 items-center">
              <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, submitting, errors, values }) => (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="flex w-3/4  md:w-full  items-center flex-1 gap-x-2 md:gap-x-3 lg:gap-x-4  justify-between">
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

              <button
                className="md:w-10 md:h-10 h-4 w-4 bg-white  rounded-full flex justify-center items-center text-black shadow-lg"
                onClick={handleDownloadPDF} disabled={isLoading}
              ><Tooltip title="Download PDF">
                  {isLoading ? <CircularProgress className="h-6 w-6" /> : <PictureAsPdfSharpIcon className="h-6 w-6" />}
                </Tooltip>                      </button>

              <Tooltip title="Download Excel">
                <button
                  className="h-6 w-6 bg-white  rounded-full flex justify-center items-center text-black shadow-lg"
                  onClick={handleDownloadExcel}
                >
                  {isLoading ? <CircularProgress className="h-6 w-6" /> : <FileDownloadOutlinedIcon className="h-6 w-6" />}

                </button>
              </Tooltip>



            </div>
          </div>
          <Grid item md={12} marginTop={5}>
            {UserData.role.toLowerCase() === "partner" ? (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {isVisible ? (
                      <>
                        {firstCart && (
                          <>
                            {data.map((item, index) => (
                              <div key={index}>
                                <div className=" md:p-7 p-2">
                                  <Grid container spacing={2}>
                                    {renderCountBox(
                                      "Balance",
                                      item.commissions?.["Balance"] || 0,
                                      BrokersIcon
                                    )}
                                    {renderCountBox(
                                      "Net Premium",
                                      item.premiums?.["Net Premium"] || 0,
                                      NetPremiumIcon
                                    )}
                                  </Grid>
                                  <Grid container spacing={2}>
                                    {renderCountBox(
                                      "Monthly PayOut",
                                      item.commissions?.[
                                      "Monthly Commission"
                                      ] || 0,
                                      PayInCommissionIcon
                                    )}
                                    {renderCountBox(
                                      "Monthly Paid PayOut",
                                      item.commissions?.[
                                      "Monthly Paid Amount"
                                      ] || 0,
                                      PayOutCommissionIcon
                                    )}
                                    {renderCountBox(
                                      "Monthly UnPaid PayOut",
                                      item.commissions?.[
                                      "Monthly UnPaid Amount"
                                      ] || 0,
                                      FinalPremiumIcon
                                    )}
                                  </Grid>
                                  <Grid container spacing={2}>
                                    {renderCountBox(
                                      "Total PayOut",
                                      item.commissions?.["Total Commission"] ||
                                      0,
                                      PayOutCommissionIcon
                                    )}
                                    {renderCountBox(
                                      "Total Paid PayOut",
                                      item.commissions?.["Total Paid Amount"] ||
                                      0,
                                      PayOutCommissionIcon
                                    )}
                                    {renderCountBox(
                                      "Total UnPaid PayOut",
                                      item.commissions?.[
                                      "Total UnPaid Amount"
                                      ] || 0,
                                      FinalPremiumIcon
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
                                <div className=" md:p-7 p-2">
                                  <Grid container spacing={2}>
                                    {renderCountBox(
                                      "Motor",
                                      item.policyCounts?.motor || 0,
                                      MotorIcon,
                                      "/booking"
                                    )}
                                  </Grid>
                                  <Grid container spacing={2}>
                                    {renderCountBox(
                                      "Requested Booking",
                                      item.bookingRequests?.[
                                      "Requested Booking"
                                      ] || 0,
                                      RequestedBookingIcon,
                                      "/booking"
                                    )}
                                    {renderCountBox(
                                      "Accepted Booking",
                                      item.bookingRequests?.[
                                      "Accepted Booking"
                                      ] || 0,
                                      AcceptedBookingIcon,
                                      "/booking"
                                    )}
                                    {renderCountBox(
                                      "Rejected Booking",
                                      item.bookingRequests?.[
                                      "Rejected Booking"
                                      ] || 0,
                                      deleteIcon,
                                      "/booking/reject"
                                    )}
                                  </Grid>
                                  <Grid container spacing={2}>
                                    {renderCountBox(
                                      "Total Lead",
                                      item.leadCounts?.["Total Lead"] || 0,
                                      TotalLeadIcon,
                                      "/lead"
                                    )}
                                  </Grid>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                        {thirdCart && (
                          <div className=" md:p-7 p-2">
                            <Grid container spacing={2}>
                              <Grid item md={6}>
                                <PayOutCommissionChart
                                  partnerId={UserData.profileId!}
                                />
                              </Grid>
                              <Grid item md={6}>
                                <PartnerPolicyChart
                                  partnerId={UserData.profileId!}
                                />
                              </Grid>
                            </Grid>
                          </div>
                        )}
                        {fourthCart && (
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
            ) : (
              <Typography variant="h6">Access Denied</Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
      <Toaster position="bottom-center" reverseOrder={false} />
      <SwipeableTemporaryDrawer open={open} setOpen={setOpen}>
      <Box height={300} display="flex" justifyContent="space-between" alignItems="center" gap={5}>

      <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-xl shadow-2xl border border-gray-200">
                <div className="flex flex-col md:flex-row gap-6 items-center justify-center " >
                  <Field name="startDate"  style={{ boxShadow: '6.08px 6.08px 30.41px 0px #F2DDD480' }}>
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

                  <Field name="endDate"  style={{ boxShadow: '6.08px 6.08px 30.41px 0px #F2DDD480' }}>
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
    </div>
  );
};
export default PartnerDashboard;