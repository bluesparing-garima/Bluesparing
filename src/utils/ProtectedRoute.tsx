import React, { FC } from "react";
import {
  CURRENT_ROLE_MENUS,
  CURRENT_SUBSID,
  SafeKaroUser,
} from "../context/constant";
import { Navigate, useLocation } from "react-router-dom";
import UnAuthorizedPage from "../Auth/UnAuthorizedPage";
import useLocalStorage from "../Hooks/LocalStorage/useLocalStorage";
import { IMenu } from "../api/Menu/IMenuType";
interface ProtectedRouteProps {
  children?: React.ReactNode;
}
const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const [subsLocalData, setSubsLocalData] = useLocalStorage<string[]>(
    CURRENT_SUBSID,
    []
  );
  const [currentMenus, setCurrentMenu] = useLocalStorage<IMenu[]>(
    CURRENT_ROLE_MENUS,
    []
  );
  const storedUser = localStorage.getItem("user");
  const userData: SafeKaroUser | null = storedUser
    ? JSON.parse(storedUser)
    : null;

  const location = useLocation();
  const currentUrl = location.pathname.toLowerCase().trim();

  const getMenuIdByPath = () => {
    if (currentMenus.length > 0) {
      const menu = currentMenus.find(
        (ele) => ele.pageURL.toLowerCase().trim() === currentUrl
      );
      if (menu) {
        return menu._id;
      }
    } else {
      return "-1";
    }
  };
  // const isAuthorized = () => {
  //   if (!userData?.transactionStatus) {
  //     return false;
  //   }
  //   const menuId = getMenuIdByPath();
  //   if (menuId === "-1") {
  //     return false;
  //   }
  //   if (menuId) {
  //     const isAuth = subsLocalData?.includes(menuId);
  //     return isAuth;
  //   }

  //   return false;
  // };
const isAuthorized = ()=>{
  return true;
}
  return (
    <>
      {isAuthorized() ? (
        children
      ) : (
        <>
          <UnAuthorizedPage />
        </>
      )}
    </>
  );
};

export default ProtectedRoute;
