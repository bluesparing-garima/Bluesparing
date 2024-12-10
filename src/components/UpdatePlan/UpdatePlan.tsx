import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import useSubscription from "../../Hooks/Subscription/useSubscription";
import { Link } from "react-router-dom";

const UpdatePlan = () => {
  const [subsData] = useSubscription();
  const renderCountBox = (
    title: string,
    count: string | number | { start: string; end: string },
    path?: string,k?:string
  ) => {
    let formattedCount: string;
    if (typeof count === "object") {
      formattedCount = `${count.start} - ${count.end}`;
    } else if (typeof count === "number") {
      formattedCount = count.toLocaleString(); // Formats numbers with commas
    } else {
      formattedCount = count; // Use the string as-is
    }

    const content = (
      <div key={k} className="bg-white m-2 p-3 rounded-[10.33px] shadow-lg flex items-center justify-between transform transition-transform duration-200 hover:scale-105">
        <div>
          <Typography
            variant="body2"
            className="text-sm text-gray-600 mb-2 font-satoshi"
          >
            {title}
          </Typography>
          <Typography
            variant="h5"
            className="text-base font-bold text-[#202224]"
          >
            {formattedCount}
          </Typography>
        </div>
      </div>
    );

    return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        {path ? <Link to={path}>{content}</Link> : content}
      </Grid>
    );
  };
  return (
    <div className="bg-blue-200 h-screen p-4">
    <Grid container spacing={2}>
      {subsData.map((item, index) => renderCountBox(item.planName, `₹ ${item.monthlyAmount}`, "",`${item.planName}${index}`))}
    </Grid>
  </div>
  );
};

export default UpdatePlan;
