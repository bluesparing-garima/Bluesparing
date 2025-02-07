import { Box, CircularProgress } from "@mui/material";
import React, { Suspense } from "react";

interface SuspenseWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const SuspenseWrapper: React.FC<SuspenseWrapperProps> = ({ children }) => {
  const fallback = (
    <div className="w-[90vw] flex justify-center items-center h-screen">
      <CircularProgress />
    </div>
  );
  return <Suspense fallback={fallback}>{children}</Suspense>;
};

export default SuspenseWrapper;
