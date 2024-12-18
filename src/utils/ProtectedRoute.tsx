import React, { FC } from "react";
import { SafeKaroUser } from "../context/constant";
import { Navigate } from "react-router-dom";
interface ProtectedRouteProps {
  children?: React.ReactNode;
}
const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
}) => {
  const storedUser = localStorage.getItem("user");
  const userData: SafeKaroUser | null = storedUser
    ? JSON.parse(storedUser)
    : null;
  const currentRole = userData?.role.toLowerCase();

  const isAuthorized = () => {
    return !!currentRole
  };

  return <>{isAuthorized() ? children : <> <Navigate to={"/"}/></>}</>;
};

export default ProtectedRoute;
