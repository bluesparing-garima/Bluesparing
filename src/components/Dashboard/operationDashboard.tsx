import React, { useCallback, useEffect, useState } from "react";
import {
  DAYJS_DISPLAY_FORMAT,
  header,
  SafeKaroUser,
} from "../../context/constant";
import { Button, Grid, Tooltip as Tip } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale as linear,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import TotalLeadIcon from "../../assets/totalLead.png";
import RequestLeadIcon from "../../assets/requestedLead.png";
import AcceptedLeadIcon from "../../assets/acceptedLead.png";
import BookedLeadIcon from "../../assets/bookedLead.png";
import TotalBookingIcon from "../../assets/totalBooking.png";
import AcceptedBookingIcon from "../../assets/acceptedBooking.png";
import BookedBookingIcon from "../../assets/bookedBooking.png";
import RequestedBookingIcon from "../../assets/requestedBooking.png";
import deleteIcon from "../../assets/delete.png";
import { IData } from "./IDashboard";
import { IOperationData } from "./IDashboard";
import getOperationDashboardService from "../../api/Dashboard/GetOperationDashboard/GetOperationDashboardService";
import { Link } from "react-router-dom";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PictureAsPdfSharpIcon from "@mui/icons-material/PictureAsPdfSharp";
import { rmGenerateExcel as operationGenerateExcel } from "../../utils/DashboardExcel";
import { rmGeneratePDF as operationGeneratePdf } from "../../utils/DashboardPdf";
import { IEmployee } from "../HR/Attendance/IAttendance";
import GetAttendanceCountService from "../../api/Role/GetAttendanceCount/GetAttendanceCountService";
import AttendanceCard from "../HR/Attendance/AttendanceRecord/AttendanceCard";
import { AttendanceDataSvg, EmployeeSvg, PlanDetailsDataSvg } from "./data/Svg";
import { CartButton } from "./dashboard";
import toast, { Toaster } from "react-hot-toast";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  linear,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const OperationDashboard: React.FC = () => {
  const [data, setData] = useState<IData[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [employee, setEmployee] = useState<IEmployee | null>();
  const [firstCart, setFirstCart] = useState(true);
  const [secondCart, setSecondCart] = useState(false);
  const [thirdCart, setThirdCart] = useState(false);
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const [selectedCard, setSelectedcard] = useState("1");
  const GetDashboardCount = useCallback(() => {
    getOperationDashboardService({
      header,
      operationUserId: UserData.profileId,
    })
      .then((dashboardData) => {
        setIsVisible(true);
        setData(dashboardData.data);
      })
      .catch((error) => {
        setIsVisible(true);
        console.error("Failed to fetch product details", error);
      });
  }, [UserData.profileId]);

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
  const handleDownloadPDF = () => {
    operationGeneratePdf(data);
  };
  const handleDownloadExcel = () => {
    operationGenerateExcel(data);
  };

  useEffect(() => {
    GetDashboardCount();
    getAttendanceRecord();
    const intervalId = setInterval(GetDashboardCount, 30000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line
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
            {title}
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
  const handleFirstCart = async () => {
    setFirstCart(true);
    setSelectedcard("1");
    setThirdCart(false);
    setSecondCart(false);
  };
  const handleSecondCart = async () => {
    setFirstCart(false);
    setSecondCart(true);
    setThirdCart(false);
    setSelectedcard("2");
  };
  const handleThirdCart = async () => {
    setFirstCart(false);
    setSecondCart(false);
    setThirdCart(true);
    setSelectedcard("3");
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

  return (
    <div className="bg-blue-200 h-screen">
      <Grid container>
        <div className="flex justify-between w-full m-2 items-center gap-x-2">
          <div className="flex justify-center items-center">
            <CartButton
              onClick={handleFirstCart}
              tooltipTitle="View Booking Data"
              iconPath={<EmployeeSvg isActive={selectedCard === "1"} />}
              isSelected={firstCart}
            />
            <CartButton
              onClick={handleSecondCart}
              tooltipTitle="Monthly Attendance "
              iconPath={<AttendanceDataSvg isActive={selectedCard === "2"} />}
              isSelected={secondCart}
            />
            <CartButton
              onClick={handleThirdCart}
              tooltipTitle="Plan Details "
              iconPath={<PlanDetailsDataSvg isActive={selectedCard === "3"} />}
              isSelected={thirdCart}
            />
          </div>
          <div className="flex justify-center items-center gap-x-2">
            <Tip title="Download PDF">
              <Button
                className=" h-10  bg-[#0095FF] shadow-sm rounded flex justify-center items-center text-white"
                onClick={handleDownloadPDF}
              >
                <PictureAsPdfSharpIcon className="w-6 h-6 " />
              </Button>
            </Tip>
            <Tip title="Download Excel">
              <Button
                className=" h-10  bg-[#3BDB03] shadow-sm rounded flex justify-center items-center text-white"
                onClick={handleDownloadExcel}
              >
                <FileDownloadOutlinedIcon className="w-6 h-6 " />
              </Button>
            </Tip>
          </div>
        </div>

        <Grid item lg={12}>
          {isVisible ? (
            <>
              {data &&
                firstCart &&
                data.map((item: IOperationData, index: number) => (
                  <div key={index}>
                    <Grid container spacing={2}>
                      {renderCountBox(
                        "Total Lead",
                        item.leadCounts?.["Total Lead"] || 0,
                        TotalLeadIcon,
                        "/lead"
                      )}
                      {renderCountBox(
                        "Requested Lead",
                        item.leadCounts?.["Requested Lead"] || 0,
                        RequestLeadIcon,
                        "/lead/new"
                      )}
                      {renderCountBox(
                        "Accepted Lead",
                        item.leadCounts?.["Accepted Lead"] || 0,
                        AcceptedLeadIcon,
                        "/lead"
                      )}
                      {renderCountBox(
                        "Booked Lead",
                        item.leadCounts?.["Booked Lead"] || 0,
                        BookedLeadIcon
                      )}
                    </Grid>

                    <Grid container spacing={2}>
                      {renderCountBox(
                        "Total Booking",
                        item.bookingRequests?.["Total Booking"] || 0,
                        TotalBookingIcon,
                        "/booking"
                      )}
                      {renderCountBox(
                        "Requested Booking",
                        item.bookingRequests?.["Requested Booking"] || 0,
                        RequestedBookingIcon,
                        "/booking"
                      )}
                      {renderCountBox(
                        "Accepted Booking",
                        item.bookingRequests?.["Accepted Booking"] || 0,
                        AcceptedBookingIcon,
                        "/booking"
                      )}
                      {renderCountBox(
                        "Booked Booking",
                        item.bookingRequests?.["Booked Booking"] || 0,
                        BookedBookingIcon,
                        "/booking"
                      )}
                      {renderCountBox(
                        "Rejected Booking",
                        item.bookingRequests?.["Rejected Booking"] || 0,
                        deleteIcon,
                        "/booking"
                      )}
                    </Grid>
                  </div>
                ))}
              {secondCart && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={8} lg={9}>
                    {employee && (
                      <>
                        <AttendanceCard employee={employee} />
                      </>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <div>
                      <div className="bg-blue-200 px-7 py-2">
                        {data[0]?.monthlyHolidays && (
                          <Typography className="text-lg font-medium text-gray-800">
                            Monthly Holidays
                          </Typography>
                        )}
                      </div>
                    </div>
                  </Grid>
                </Grid>
              )}
              {thirdCart && (
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
        <Toaster position="bottom-center" reverseOrder={false} />
      </Grid>
    </div>
  );
};

export default OperationDashboard;
