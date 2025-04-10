import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { IconButton, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import CustomIconButton from "./data/CustomIconButton";

const DAYJS_DISPLAY_FORMAT = "DD MMM YYYY";

interface LocationState {
  user: {
    name: string;
    role: string;
  };
  role: string;
}

const roleDashboardMapping: { [key: string]: string } = {
  admin: "/dashboard",
  operation: "/operationdashboard",
  booking: "/bookingdashboard",
  account: "/accountdashboard",
  rm: "/rm/dashboard",
  hr: "/hr/dashboard",
  it: "/it/dashboard",
  default: "/partnerdashboard",
};

const WelcomePage = () => {
  const location = useLocation() as { state: LocationState };
  const navigate = useNavigate();
  const { user, role } = location.state || {};

  const storedUser = localStorage.getItem("user");
  const UserData = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    if (!user || !role) {
      navigate("/signin");
    }
  }, [user, role]);

  const handleClose = () => {
    const dashboardPath =
      roleDashboardMapping[role] || roleDashboardMapping.default;
    navigate(dashboardPath);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[201] flex justify-center items-center px-4">
      <div className="bg-white rounded-xl w-full max-w-2xl min-h-auto max-h-[90vh] p-6 shadow-xl flex flex-col justify-between relative overflow-y-auto">
        <div className="absolute top-2 right-2">
          <CustomIconButton
            title="Download PDF"
            onClick={handleClose}
            icon={<CloseIcon className="w-5 h-5 text-black" />}
          />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Welcome, {user?.name}!
          </h2>
          <p className="text-gray-700 text-sm sm:text-base">
            Role: <span className="font-medium capitalize">{role}</span>
          </p>
          <p className="text-gray-600 text-sm sm:text-base">
            Thank you for signing in. You can now access your dashboard.
          </p>

          {/* Plan Details */}
          {UserData && (
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">Plan Details</h3>
              <Grid container spacing={2} paddingLeft={2} paddingRight={2} paddingBottom={1}>
                <Grid item xs={12} sm={4}>
                  <div className="bg-white rounded-[10.33px] shadow-[0_0_10px_2px_#F2DDD4] p-3 text-sm transform transition-transform duration-200 hover:scale-105">
                    <p className="font-medium text-gray-700">Plan Name</p>
                    <p>{UserData.planName || "-"}</p>
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div className="bg-white rounded-[10.33px] shadow-[0_0_10px_2px_#F2DDD4] p-3 text-sm transform transition-transform duration-200 hover:scale-105">
                    <p className="font-medium text-gray-700">Start Date</p>
                    <p>
                      {UserData.planStartDate
                        ? dayjs(UserData.planStartDate).format(
                            DAYJS_DISPLAY_FORMAT
                          )
                        : "-"}
                    </p>
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div className="bg-white rounded-[10.33px] shadow-[0_0_10px_2px_#F2DDD4] p-3 text-sm transform transition-transform duration-200 hover:scale-105">
                    <p className="font-medium text-gray-700">Expiry Date</p>
                    <p>
                      {UserData.planExpired
                        ? dayjs(UserData.planExpired).format(
                            DAYJS_DISPLAY_FORMAT
                          )
                        : "-"}
                    </p>
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div className="bg-white rounded-[10.33px] shadow-[0_0_10px_2px_#F2DDD4] p-3 text-sm transform transition-transform duration-200 hover:scale-105">
                    <p className="font-medium text-gray-700">Policy Count</p>
                    <p>{UserData.policyCount || 0}</p>
                  </div>
                </Grid>
              </Grid>

              {/* User Limits */}
              {UserData.userLimit && typeof UserData.userLimit === "object" && (
                <>
                  <h4 className="text-md font-semibold pt-2">User Limits</h4>
                  <Grid container spacing={2}  paddingLeft={2} paddingRight={2}>
                    {Object.entries(UserData.userLimit).map(([key, value]) => (
                      <Grid item xs={12} sm={4} key={key}>
                        <div className="bg-white rounded-[10.33px] shadow-[0_0_10px_2px_#F2DDD4] p-3 text-sm transform transition-transform duration-200 hover:scale-105">
                          <p className="font-medium text-gray-700">
                            {key.toUpperCase()}
                          </p>
                          <p>
                            {value === "Infinity" ? "Unlimited" : value || 0}
                          </p>
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
