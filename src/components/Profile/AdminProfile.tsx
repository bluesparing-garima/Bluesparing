import React from "react";
import { Card, Avatar, TextField, Grid, Box, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { IProfile } from "./IProfile";

const AdminProfile: React.FC<IProfile> = ({
  email,
  name,
  partnerCode,
  partnerId,
  phoneNumber,
  role,
  status,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "#f0f0f0",
        padding: 2,
        fontFamily: "'Satoshi', sans-serif",
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          padding: 4,
          borderRadius: 4,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} display="flex" justifyContent="center">
            <Avatar
              sx={{
                bgcolor: deepPurple[500],
                width: 120,
                height: 120,
                fontSize: "3rem",
              }}
            >
              {name?.charAt(0).toUpperCase()}
            </Avatar>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {name
                ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
                : ""}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {role?.toUpperCase()}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="email"
              label="Email"
              value={email}
              variant="standard"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="phone"
              label="Phone Number"
              value={phoneNumber}
              variant="standard"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="partner-code"
              label="Partner Code"
              value={partnerCode}
              variant="standard"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

         
        </Grid>
      </Card>
    </Box>
  );
};

export default AdminProfile;
