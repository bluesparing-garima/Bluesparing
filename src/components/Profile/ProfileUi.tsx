import React from "react";
import { Card, Avatar, Grid, Box, Typography, Divider } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { ITeamsVM } from "../Admin/Team/ITeam";
import { DAYJS_DISPLAY_FORMAT, imagePath } from "../../context/constant";
import dayjs from "dayjs";
const ProfileUi: React.FC<ITeamsVM> = ({
  email,
  fullName,
  phoneNumber,
  role,
  salary,
  branchName,
  dateOfBirth,
  address,
  pincode,
  profileImage,
  planName,
  transactionStatus,
  isActive,
  gender,
  joiningDate,
}) => {
  const data = [
    { key: "Email", value: email },
    { key: "Name", value: fullName },
    { key: "Phone Number", value: phoneNumber },
    { key: "Salary", value:role==='admin'?"": `₹ ${salary?.toLocaleString()}` },
    { key: "Branch Name", value: branchName },
    { key: "DOB", value: dateOfBirth },
    {
      key: "Joining Date",
      value: dayjs(joiningDate).format(DAYJS_DISPLAY_FORMAT),
    },
    { key: "Gender", value: gender },
    { key: "Address", value: address },
    { key: "Pincode", value: pincode },
    { key: "Plan", value: planName },
    { key: "Role", value: role },
    { key: "Status", value: isActive ? "Active" : "Inactive" },
    { key: "Payment Status", value: transactionStatus ? "Success" : "Pending" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#bfdbfe",
        minHeight: "80vh",
        padding: 2,
        fontFamily: "'Satoshi', sans-serif",
      }}
    >
      <Card
        sx={{
          width: { xs: "90%", sm: "80%", md: 800 },
          padding: 4,
          borderRadius: 4,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
        }}
      >
        <div>
          <Avatar
            src={`${imagePath}/${profileImage}`}
            alt={fullName}
            sx={{
              bgcolor: deepPurple[500],
              width: 120,
              height: 120,
              fontSize: "3rem",
              marginRight: { xs: 0, md: 2 },
              marginBottom: { xs: 2, md: 0 },
              border: "3px solid white",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            {fullName?.charAt(0).toUpperCase()}
          </Avatar>
        </div>
        <Box sx={{ flexGrow: 1, textAlign: { xs: "center", md: "left" } }}>
          <Divider sx={{ marginY: 2 }} />
          <Grid container spacing={2}>
            {data
              .filter((ele) => ele.value)
              .map((ele) => (
                <Grid item xs={12} sm={6} key={ele.key}>
                  <Typography className="font-satoshi font-bold">
                    {ele.key}:
                  </Typography>
                  <Typography className="font-sm font-satoshi bg-[#f0f0f0] p-1 rounded capitalize font-medium">
                    {ele.value}
                  </Typography>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Card>
    </Box>
  );
};
export default ProfileUi;
