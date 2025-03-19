import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";

const Client = () => {
  const loc = useLocation();
  let policy=loc.state as any;
 
  return (
    <Card className="shadow-lg rounded-2xl p-4 max-w-4xl mx-auto my-6">
    <CardContent>
      <Typography variant="h5" className="font-bold text-center mb-4">
        Policy Details
      </Typography>
      <Grid container spacing={2}>
        {/* General Details */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" className="font-semibold">
            Policy Number:
          </Typography>
          <Typography>{policy[0].policyNumber}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" className="font-semibold">
            Policy Type:
          </Typography>
          <Typography>{policy[0].policyType}</Typography>
        </Grid>
        
        {/* Vehicle Details */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" className="font-semibold">
            Vehicle:
          </Typography>
          <Typography>{policy[0].make} - {policy[0].model}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" className="font-semibold">
            Fuel Type:
          </Typography>
          <Typography>{policy[0].fuelType}</Typography>
        </Grid>
        
        {/* User Details */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" className="font-semibold">
            Owner Name:
          </Typography>
          <Typography>{policy[0].fullName}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" className="font-semibold">
            Contact:
          </Typography>
          <Typography>{policy[0].phoneNumber} / {policy[0].emailId}</Typography>
        </Grid>
        
        {/* Financial Details */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" className="font-semibold">
            IDV:
          </Typography>
          <Typography>₹{policy[0].idv}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" className="font-semibold">
            Premium:
          </Typography>
          <Typography>₹{policy[0].finalPremium}</Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
  )
}

export default Client
