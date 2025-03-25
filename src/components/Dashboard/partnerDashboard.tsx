import React, { useCallback, useEffect, useState } from "react";
import { CardContent, CircularProgress, Grid, TextField, Tooltip } from "@mui/material";
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

const PartnerDashboard: React.FC = () => {
  const [data, setData] = useState<IPartnerData[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [firstCart, setFirstCart] = useState(true);
  const [secondCart, setSecondCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [thirdCart, setThirdCart] = useState(false);
  const [fourthCart, setFourthCart] = useState(false);
  const [selectedCard, setSelectedcard] = useState("1");
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
          console.error("Failed to fetch product details", error);
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
        console.error("Error fetching HR Dashboard data:", error);
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
  return (
    <div className="bg-blue-200 h-screen">
      <CardContent>
        <Grid container>
          <div className="flex w-full items-center justify-start bg-blue-200 ">
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
                tooltipTitle="Plan Details "
                iconPath={<PlanDetailsDataSvg isActive={selectedCard === "4"} />}
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
                        className="md:w-10 md:h-10 h-4 w-4 bg-[#30A9FF] shadow-sm rounded flex justify-center items-center text-white"
                        type="submit" disabled={isLoading}
                      >
                        {isLoading ? <CircularProgress
                          className="md:w-6 md:h-6 h-3 w-3"
                        /> :
                          <SearchIcon className="md:w-6 md:h-6 h-3 w-3" />
                        }
                      </button>
                    </div>
                  </form>
                )}
              />
              <div className="flex justify-between items-center gap-x-2">

                <button
                  className="md:w-10 md:h-10 h-4 w-4 bg-[#0095FF] shadow-sm rounded flex justify-center items-center text-white"
                  onClick={handleDownloadPDF} disabled={isLoading}
                ><Tooltip title="Download PDF">
                    {isLoading ? <CircularProgress className="md:w-6 md:h-6 h-3 w-3" /> : <PictureAsPdfSharpIcon className="md:w-6 md:h-6 h-3 w-3" />}
                  </Tooltip>                      </button>

                <Tooltip title="Download Excel">
                  <button
                    className="md:w-10 md:h-10 h-4 w-4 bg-[#3BDB03] shadow-sm rounded flex justify-center items-center text-white"
                    onClick={handleDownloadExcel}
                  >
                    {isLoading ? <CircularProgress className="md:w-6 md:h-6 h-3 w-3" /> : <FileDownloadOutlinedIcon className="md:w-6 md:h-6 h-3 w-3" />}

                  </button>
                </Tooltip>
              </div>
            </div>
          </div>
          <Grid item md={12}>
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
                                <div className="bg-blue-200 md:p-7 p-2">
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
                                <div className="bg-blue-200 md:p-7 p-2">
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
                          <div className="bg-blue-200 md:p-7 p-2">
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
    </div>
  );
};
export default PartnerDashboard;