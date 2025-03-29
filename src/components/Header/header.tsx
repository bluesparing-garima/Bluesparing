import React, { useCallback, useEffect, useState, useMemo } from "react";
import { header, imagePath, SafeKaroUser } from "../../context/constant";
import NotificationBadge from "../../utils/NotificationBadge";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import getRankBadgeDetailsService from "../../api/Rank/RankBadge/getRankBadgeDetailsService";
import toast from "react-hot-toast";
import { IAttendance } from "../HR/Attendance/IAttendance";
import dayjs from "dayjs";
import GetTodayAttendanceRecordService from "../../api/HR/Attendance/GetTodayAttendanceRecord/GetEmployeeDepartmentService";
import MarkInTime from "../HR/Attendance/MarkAttendance/MarkInTime";
import MarkOutTime from "../HR/Attendance/MarkAttendance/MarkOutTime";
import { INotification } from "../Notification/INotification";
// import GetNotificationByRoleService from "../../api/Notification/GetNotificationByRole/GetNotificationByRoleService";
import CustomToast from "../../utils/CustomToast";
import {
  getNotifications,
  storeNotifications,
} from "../../utils/NotificationSessionHandler";
import crownIcon from "../../assets/pl.png";
import { styled, keyframes } from "@mui/system"; // Styled System MUI से

// 🔴 Blinking Red Dot Animation
const blink = keyframes`
  0% { opacity: 1; transform: scale(1); box-shadow: 0 0 8px red; }
  100% { opacity: 0.9; transform: scale(1.2); box-shadow: 0 0 2px red; }
`;

// 🏆 Styled Icon Button
const PremiumButton = styled(IconButton)({
  position: "relative",
  transform: "scale(1.2)",
  background: "transparent",
  "&:hover": {
    background: "transparent",
    transform: "scale(1.3)",
  },
});

// 👑 Styled Crown Icon
const CrownImage = styled("img")({
  width: "25px",
  filter: "drop-shadow(0px 0px 3px gold)",
  transition: "transform 0.3s ease-in-out, filter 0.3s ease-in-out",
});

// 🔴 Styled Red Dot
const RedDot = styled("span")({
  position: "absolute",
  top: "8px",
  right: "3px",
  width: "5px",
  height: "5px",
  backgroundColor: "red",
  borderRadius: "50%",
  animation: `${blink} 1s infinite alternate`,
});

interface HeaderProps {
  isSidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = React.memo<HeaderProps>(({ isSidebarOpen, setSidebarOpen }) => {
  const [userData, setUserData] = useState<any>();
  const [userRank, setUserRank] = useState<any>();
  const storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  const UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const [attendance, setAttendance] = useState<IAttendance | null>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [notificationData, setNotificationData] = useState<INotification[]>([]);
  const navigate = useNavigate();

  const accessNotification = useMemo(() => {
    const role = UserData?.role?.toLowerCase();
    switch (role) {
      case "booking":
        return ["operation"];
      case "operation":
        return ["booking", "partner"];
      case "partner":
        return ["booking", "operation"];
      default:
        return ["booking"];
    }
  }, [UserData?.role]);

  const debounce = <T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  const isViewNotification = useCallback(() => {
    return ["booking", "operation", "partner"].includes(
      UserData?.role?.toLowerCase()
    );
  }, [UserData?.role]);

  const fetchData = async () => {
    try {
      const now = dayjs().format("YYYY-MM-DD");
      const res = await GetTodayAttendanceRecordService({
        header,
        d: now,
        eId: userData?.profileId,
      });
      setAttendance(res?.data[0]);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  const canMarkAttendance = useMemo(() => {
    const role = UserData?.role?.toLowerCase();
    return role !== "admin" && role !== "partner";
  }, [UserData?.role]);
  useEffect(() => {
    if (userData) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [userData]);
  useEffect(() => {
    if (storedTheme) {
      const newData = JSON.parse(storedTheme);
      setUserData(newData);
      if (newData.role === "Partner") {
        getRankBadgeDetailsService({ header, partnerId: newData.profileId })
          .then((dashboardData) => {
            const rankData = dashboardData.data;
            setUserRank(rankData.rank);
          })
          .catch((error) => {
            throw error;
          });
      }
    }
  }, [storedTheme]);
  const signOut = useCallback(() => {
    localStorage.clear();
    sessionStorage.clear();
    handleClose();
  }, []);
  const showToast = (msg: string) => {
    toast.custom((t) => <CustomToast t={t} message={msg} />);
  };
  const handlePlay = (msg: string) => {
    showToast(msg);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <div className="flex items-center justify-between bg-white py-2 px-2">
        <div className="mx-2 md:hidden">
          {isSidebarOpen ? (
            <div onClick={handleSidebar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          ) : (
            <div onClick={() => setSidebarOpen(!isSidebarOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="md:flex hidden md:text-xl font-medium font-satoshi content-start">
          Welcome Back, {userData?.name}
        </div>
        <div className="flex md:hidden text-sm font-medium font-satoshi content-start">
          {userData?.name}
        </div>
        <div className="flex items-center justify-center gap-3">
          <Tooltip title="Update Plan" arrow>
            <PremiumButton onClick={() => navigate("/update-plan")}>
              <RedDot />
              <CrownImage src={crownIcon} alt="Crown" />
            </PremiumButton>
          </Tooltip>

          <Avatar
            className="md:w-[40px] md:h-[40px] w-[30px] h-[30px]"
            alt={userData?.name}
            src={`${imagePath}/${userData?.profileImage}`}
          />
          <div className="flex items-center justify-between bg-white px-2">
            <Link to="/profile" className="menu-hover text-black">
              <p className="md:text-[14px] text-[12px] font-medium">
                {userData?.name} ({userData?.userCode})
              </p>
              <p className="text-[#737791] md:text-xs text-[10px]">
                {userData?.role}
                {userData?.role === "Partner" && (
                  <span className="text-safekaroDarkOrange"> ({userRank})</span>
                )}
              </p>
            </Link>
          </div>
          <div className="self-start">
            <Button
              id="basic-button"
              sx={{ color: "black" }}
              onClick={handleClick}
            >
              <KeyboardArrowDownIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <Link to="/profile" onClick={handleClose}>
                <MenuItem>Profile</MenuItem>
              </Link>
              {canMarkAttendance && (
                <div>
                  <MenuItem onClick={handleClose}>
                    <MarkInTime
                      attendance={attendance ? attendance : null}
                      setAttendance={setAttendance}
                    />
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <MarkOutTime
                      attendance={attendance ? attendance : null}
                      setAttendance={setAttendance}
                    />
                  </MenuItem>
                </div>
              )}
              {UserData?.role?.toLowerCase().trim() === "admin" && (
                <Link to="/upload-logo" onClick={handleClose}>
                  <MenuItem>Upload Logo</MenuItem>
                </Link>
              )}

              <Link to="/" onClick={signOut}>
                <MenuItem>Logout</MenuItem>
              </Link>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
});
export default Header;
