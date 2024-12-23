import React, { FC } from "react";
import { SafeKaroUser } from "../context/constant";
import { Navigate, useLocation } from "react-router-dom";
import UpdatePlan from "../components/UpdatePlan/UpdatePlan";
import UnAuthorizedPage from "../Auth/UnAuthorizedPage";
interface ProtectedRouteProps {
  children?: React.ReactNode;
}
const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const userData: SafeKaroUser | null = storedUser
    ? JSON.parse(storedUser)
    : null;
  const currentRole = userData?.role.toLowerCase();
  const location = useLocation();
  const currentUrl = location.pathname;


  const isAuthorized = () => {
    return !!currentRole;
  };
  if (!userData?.transactionStatus) {
    return <UnAuthorizedPage />;
  }
  return (
    <>
      {isAuthorized() ? (
        children
      ) : (
        <>
          <Navigate to={"/unauthorized"} />
        </>
      )}
    </>
  );
};

export default ProtectedRoute;
