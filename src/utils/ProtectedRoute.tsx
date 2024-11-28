// import React from "react";
// import { Navigate } from "react-router-dom";
// import { SafeKaroUser } from "../context/constant";
// interface ProtectedRouteProps {
//   children?: React.ReactNode;
//   accessRole: string[];
//   activeSubs: string[];
// }
// const withProtectedRoute = <P extends object>(
//   Component: React.ComponentType<P>
// ): React.FC<P & ProtectedRouteProps> => {
//   return ({ accessRole, activeSubs, ...props }: ProtectedRouteProps) => {
//     const storedUser = localStorage.getItem("user");
//     const userData: SafeKaroUser | null = storedUser ? JSON.parse(storedUser) : null;
//     if (!userData) {
//       return <Navigate to="/403" replace />;
//     }
//     const userRole = userData.role.toLowerCase();
//     const userSubs = userData.subs?.toLowerCase();
//     const hasAccessByRole = accessRole.some((role) => role.toLowerCase() === userRole);
//     const hasValidSubscription = userSubs
//       ? activeSubs.some((sub) => sub.toLowerCase() === userSubs)
//       : false;
//     if (!hasAccessByRole || !hasValidSubscription) {
//       return <Navigate to="/403" replace />;
//     }
//     return <Component {...(props as P)} />;
//   };
// };
// export default withProtectedRoute;
import React from 'react'

const ProtectedRoute = () => {
  return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute