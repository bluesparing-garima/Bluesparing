import React from "react";
import { Card, Avatar, Grid, Box, Typography, Divider } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { ITeamsVM } from "../Admin/Team/ITeam";
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
  image,
  isActive,
}) => {
  const data = [
    { key: "Email", value: email },
    { key: "Name", value: fullName },
    { key: "Phone Number", value: phoneNumber },
    { key: "Salary", value: `₹ ${salary?.toLocaleString()}` },
    { key: "Branch Name", value: branchName },
    { key: "DOB", value: dateOfBirth },
    { key: "Address", value: address },
    { key: "Pincode", value: pincode },
    { key: "Role", value: role },
    { key: "Status", value: isActive?"Active":"Inactive" },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#e3f2fd",
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
        <div >
          <Avatar
            src={image}
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
            {data.map((ele) => (
              <Grid item xs={12} sm={6} key={ele.key}>
                <Typography sx={{ fontWeight: 600 }}>{ele.key}:</Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    backgroundColor: "#f0f0f0",
                    padding: 0.5,
                    borderRadius: 1,
                  }}
                >
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
