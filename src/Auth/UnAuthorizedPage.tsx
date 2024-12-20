import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Box, Card, CardContent } from "@mui/material";
const UnAuthorizedPage: React.FC = () => {
  return (
    <Box className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="max-w-lg w-full shadow-lg">
        <CardContent>
          <Box className="flex flex-col items-center">
            {}
            <Box className="bg-yellow-500 rounded-full p-4 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </Box>

            <Typography variant="h5" className="text-gray-800 font-bold mb-2">
              Whoops!
            </Typography>

            <Typography
              variant="body1"
              className="uppercase text-gray-600 font-satoshi font-bold mb-4 text-center"
            >
              Yor are unauthorized .
            </Typography>

            <Box className="flex items-center gap-2">
              <Typography className="font-satoshi font-medium uppercase" variant="body2">
                If you want to access this page {" "}
                <Link to="/update-plan">
                  <span className="uppercase font-satoshi font-bold text-[#e59411] underline" >visit</span>
                </Link>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
export default UnAuthorizedPage;
