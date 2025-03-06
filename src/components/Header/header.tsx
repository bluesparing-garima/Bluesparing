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
import UpgradeRoundedIcon from "@mui/icons-material/WorkspacePremium"; // Premium Icon
import { keyframes, styled } from "@mui/system";

interface HeaderProps {
  isSidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// ✨ **Gold Shine Animation**
const shine = keyframes`
  0% { filter: brightness(1.1); transform: rotate(0deg); }
  100% { filter: brightness(1.2); transform: rotate(45deg); }
`;

// 🏆 **Styled Gold Upgrade Button**
const GoldUpgradeButton = styled(IconButton)({
  background: "#FD8112",
  borderRadius: "50%",
  boxShadow: "0px 0px 10px rgba(255, 215, 0, 0.5)",
  padding: "12px",
  transition: "all 0.3s ease-in-out",
  animation: `${shine} 2s infinite alternate ease-in-out`,
  "&:hover": {
    background: "#f39610",
    boxShadow: "0px 0px 10px rgba(255, 215, 0, 0.9)",
    transform: "scale(1.2) rotate(5deg)",
  },
});

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
  // eslint-disable-next-line
  // const fetchNotification = useCallback(
  //   debounce(async () => {
  //     try {
  //       const res = await GetNotificationByRoleService({
  //         header,
  //         role: accessNotification,
  //         type: "success",
  //         isView: false,
  //       });
  //       if (res.status === "success") {
  //         const filterData = res.data.filter(
  //           (ele: INotification) => ele.notificationFor === UserData?.profileId
  //         );
  //         setNotificationData(filterData);
  //         const storeNotification = getNotifications(UserData?.profileId);
  //         if (
  //           storeNotification.length > 0 &&
  //           filterData.length > storeNotification.length
  //         ) {
  //           const filterDataIds = new Set(
  //             storeNotification.map((ele: INotification) => ele._id)
  //           );
  //           const extraElements = filterData.filter(
  //             (ele: INotification) => !filterDataIds.has(ele._id)
  //           );
  //           storeNotifications(UserData?.profileId, filterData);
  //           extraElements.forEach((ele: INotification) => {
  //             handlePlay(ele.title || "");
  //           });
  //         }
  //       }
  //     } catch (error: any) {
  //       toast.error(error.message);
  //     }
  //   }, 300),
  //   [UserData?.profileId, accessNotification]
  // );
  // const fetchNotificationData = useCallback(() => {
  //   if (isViewNotification()) {
  //     fetchNotification();
  //   }
  // }, [fetchNotification, isViewNotification]);
  // useEffect(() => {
  //   if (isViewNotification()) {
  //     fetchNotificationData();
  //     const intervalId = setInterval(fetchNotificationData, 30000);
  //     return () => clearInterval(intervalId);
  //   }
  // }, [fetchNotificationData, isViewNotification]);
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
            console.error(error);
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
        <div className="flex items-center justify-center gap-[15px]">
          {/* {isViewNotification() && (
            <div className="cursor-pointer rounded-lg mr-3">
              <NotificationBadge notificationData={notificationData || []} />
            </div>
          )} */}

          {/* "Update Policy" Icon Button */}
          {/* <IconButton onClick={() => navigate("/update-plan")} color="primary">
          <UpgradeIcon />
        </IconButton> */}

          {/* "Update Policy" Premium Icon with Tooltip */}
          <Tooltip title="Update Policy" arrow>
            <GoldUpgradeButton onClick={() => navigate("/update-plan")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-white font-bold"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </GoldUpgradeButton>
          </Tooltip>

          <Avatar
            className="md:w-[50px] md:h-[50px] w-[30px] h-[30px]"
            alt={userData?.name}
            // src="https://picsum.photos/200"
            src={`${imagePath}/${userData?.profileImage}`}
          />
          <div className="flex items-center justify-between space-x-0 bg-white px-4">
            <Link to="/profile" className="menu-hover text-black lg:mx-4">
              <p className="md:text-[16px] text-[12px] font-medium font-satoshi">
                {userData?.name} {" ("} {userData?.partnerCode} {")"}
              </p>
              <p className="text-[#737791] md:text-sm text-[10px]">
                {userData?.role}
                {userData?.role === "Partner" && (
                  <span className="text-safekaroDarkOrange md:text-sm text-[10px]">
                    {" "}
                    ({userRank})
                  </span>
                )}
              </p>
            </Link>
          </div>
          <div className="self-start">
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
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
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <Link
                to="/profile"
                className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-1"
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
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
