import { FC, useCallback, useEffect, useState } from "react";
import {
  CURRENT_ROLE_MENUS,
  CURRENT_SUBSID,
  SafeKaroUser,
} from "../../context/constant";
import useGetSubsById from "../../Hooks/Subscription/useGetSubsById";
import { IMenu } from "../../api/Menu/IMenuType";
import useGetMenuByRoleId from "../../Hooks/Menu/useGetMenu";
import SidebarUi from "./SidebarUi";
import { CircularProgress } from "@mui/material";
import useLocalStorage from "../../Hooks/LocalStorage/useLocalStorage";
type MenuItem = {
  id: string;
  label: string;
  svgIcon?: string;
  link?: string;
  role: string;
  isLocked: boolean;
  subMenu?: MenuItem[];
};
interface DynamicSidebarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const DynamicSidebar: FC<DynamicSidebarProps> = ({
  isSidebarOpen,
  setSidebarOpen,
}) => {
  const [subsIds, setSubsIds] = useState<string[]>([]);
  const [, setSubsLocalData] = useLocalStorage<string[]>(CURRENT_SUBSID, []);
  const [, setCurrentMenu] = useLocalStorage<IMenu[]>(
    CURRENT_ROLE_MENUS,
    []
  );
  const lockSvg =
    "M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z";
  const defaultMenu = "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5";
  const storedUser = localStorage.getItem("user");
  const userData: SafeKaroUser | null = storedUser
    ? JSON.parse(storedUser)
    : null;
  const [roleMenus] = useGetMenuByRoleId(userData?.roleId || "");

  const [subsData] = useGetSubsById(userData?.planId || "");

  const mapAssignByRole = () => {
    const roleName = userData?.role?.toLowerCase();
    switch (roleName) {
      case "partner":
        return "assignedPartnerMenu";
      case "booking":
        return "assignedBookingMenu";
      case "relationship manager":
        return "assignedRMMenu";
      case "operation":
        return "assignedOperationMenu";
      case "account":
        return "assignedAccountMenu";
      case "hr":
        return "assignedHRMenu";
      case "admin":
        return "assignedAdminMenu";
      default:
        return "assignedMenu";
    }
  };

  const isLockMenu = useCallback(
    (id: string) => {
      if (subsIds.includes(id)) {
        return false;
      } else {
        return true;
      }
    },
    [subsIds]
  );

  const transformData = useCallback(
    (data: IMenu[]): MenuItem[] => {
      const map: { [key: string]: MenuItem } = {};
      const menuItems: MenuItem[] = [];
    data.sort((a, b) => (a.childOrder ?? 0) - (b.childOrder ?? 0));

      data.forEach((item) => {
        const checkLock = isLockMenu(item._id);
        map[item._id] = {
          id: item._id,
          label: item.displayName,
          svgIcon: checkLock ? lockSvg : item.cssClass || defaultMenu,
          link: checkLock ? "unauthorized" : item.pageURL || undefined,
          role: item.role || "",
          isLocked: checkLock,
          subMenu: [],
        };
      });

      data.forEach((item) => {
        const menuItem = map[item._id];
        if (item.parentId && item.parentId !== "0") {
          const parent = map[item.parentId];
          if (parent) {
            parent.subMenu!.push(menuItem);
          }
        } else {
          menuItems.push(menuItem);
        }
      });
      return menuItems;
    },
    [isLockMenu]
  );

  useEffect(() => {
    const menuKey = mapAssignByRole();
    if (subsData && menuKey && typeof menuKey === "string") {
      let data = subsData[menuKey];
      if (data) {
        setSubsIds(data);
        setSubsLocalData(data);
      }
    }
    // eslint-disable-next-line
  }, [subsData?._id]);

  useEffect(() => {
    setCurrentMenu(roleMenus);
    // eslint-disable-next-line
  }, [roleMenus.length]);
  return (
    <>
      {roleMenus.length > 0 ? (
        <SidebarUi
          menuItems={transformData(roleMenus)}
          setSidebarOpen={setSidebarOpen}
          isSidebarOpen={isSidebarOpen}
        />
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
export default DynamicSidebar;
