import React from "react";
import { Card, Avatar, Grid, Box, Typography, Divider, CardContent } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { ITeamsVM } from "../Admin/Team/ITeam";
import { DAYJS_DISPLAY_FORMAT, imagePath } from "../../context/constant";
import dayjs from "dayjs";

const ProfileUi: React.FC<ITeamsVM> = ({
  email,
  name,
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
  userCode,
  planExpired,
  planStartDate,
  headRM,
  wallet,
  policyCount,
  userLimit,
}) => {
  const data = [
    { key: "Email", value: email },
    { key: "Name", value: name },
    { key: "Phone Number", value: phoneNumber },
    { key: "Salary", value: role === 'admin' ? "" : `₹ ${salary?.toLocaleString()}` },
    { key: "Branch Name", value: branchName },
    { key: "DOB", value: dayjs(dateOfBirth).format(DAYJS_DISPLAY_FORMAT) },
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
    { key: "User Code", value: userCode },
    { key: "Plan Expired", value: dayjs(planExpired).format(DAYJS_DISPLAY_FORMAT) },
    { key: "Plan Start Date", value: dayjs(planStartDate).format(DAYJS_DISPLAY_FORMAT) },
    { key: "Head RM", value: headRM },
    { key: "Wallet", value: wallet },
  ];

  const userLimitDisplayNames: { [key: string]: string } = {
    partner: "Partner",
    booking: "Booking",
    operation: "Operation",
    account: "Account",
    rm: "Relationship Manager",
    hr: "HR",
  };
  const newRole = role?.toLowerCase();

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
            alt={name}
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
            {name?.charAt(0).toUpperCase()}
          </Avatar>
        </div>
        <Box sx={{ flexGrow: 1, textAlign: { xs: "center", md: "left" } }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Profile Details
            </Typography>
            <Divider sx={{ marginY: 2 }} />
            <Grid container spacing={2}>
              {data
                .filter((ele) => ele.value)
                .map((ele) => (
                  <Grid item xs={12} sm={4} key={ele.key}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {ele.key}:
                    </Typography>
                    <Typography variant="body2" sx={{ backgroundColor: "#f0f0f0", padding: 1, borderRadius: 1 }}>
                      {ele.value}
                    </Typography>
                  </Grid>
                ))}
              {(newRole  === 'admin' || newRole  === 'account' || newRole  === 'booking' || newRole  === 'hr') && (
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Policy Count:
                  </Typography>
                  <Typography variant="body2" sx={{ backgroundColor: "#f0f0f0", padding: 1, borderRadius: 1 }}>
                    {policyCount}
                  </Typography>
                </Grid>
              )}
              {(newRole  === 'admin' || newRole  === 'account' || newRole  === 'hr') && (
                <Grid item xs={12}>
                  <Typography variant="subtitle1" fontWeight="bold" marginBottom={2}>
                    User Limit:
                  </Typography>
                  <Grid container spacing={2} sx={{ backgroundColor: "#f0f0f0", padding: 1, borderRadius: 1 }}>
                    {Object.entries(userLimit || {}).map(([key, value], index) => (
                      <Grid item xs={12} sm={4} key={key}>
                        <Typography variant="body2" sx={{ backgroundColor: "#f0f0f0", padding: 1, borderRadius: 1 }}>
                          {userLimitDisplayNames[key] || key}: {value}
                        </Typography>
                        {index < Object.entries(userLimit || {}).length - 1 && <Divider sx={{ my: 1 }} />}
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              )}
              {newRole  === 'relationship manager' && (
                <Grid item xs={12} sm={4}>
                    <Typography variant="subtitle1" fontWeight="bold" >
                      Partner Limit: 
                    </Typography>
                  <Typography variant="body2" sx={{ backgroundColor: "#f0f0f0", padding: 1, borderRadius: 1 }}>
                    {userLimit?.partner}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default ProfileUi;