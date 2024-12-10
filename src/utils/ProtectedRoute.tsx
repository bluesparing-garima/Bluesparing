import React, { FC } from "react";
import { SafeKaroUser } from "../context/constant";
interface ProtectedRouteProps {
  children?: React.ReactNode;
  accessByRole: string;
}
const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  accessByRole,
}) => {
  const storedUser = localStorage.getItem("user");
  const userData: SafeKaroUser | null = storedUser
    ? JSON.parse(storedUser)
    : null;
  const currentRole = userData?.role.toLowerCase();

  const isAuthorized = () => {
    return accessByRole.toLowerCase() === currentRole;
  };
  return <>{isAuthorized() ? children : <> Unauthorized</>}</>;
};

export default ProtectedRoute;
