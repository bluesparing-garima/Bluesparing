import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const SuperAdminDashBoard = () => {
  const data = [
    { name: "Free", amount: "₹ 0" },
    {
      name: "Star ",
      amount: { start: "₹ 399", end: "₹ 999" },
    },
    {
      name: "Super Star",
      amount: { start: "₹ 3000", end: "₹ 5000" },
    },
    {
      name: "Mega Star",
      amount: { start: "₹ 10000", end: "₹ 50000" },
    },
    { name: "Free Plan Policies", amount: 100 },
    { name: "Star Plan Policies", amount: { start: "3000", end: "7000" } },
    {
      name: "Super Star Plan Policies",
      amount: { start: "10000", end: "30000" },
    },
    {
      name: "Mega Star Plan Policies",
      amount: { start: "50000", end: "100000" },
    },
    { name: "Free Plan Premium", amount: 0 },
    { name: "Star Plan Premium", amount: { start: "1 Lakh", end: "2 Lakh" } },
    {
      name: "Super Star Plan Premium",
      amount: { start: "10 Lakh", end: "50 Lakh" },
    },
    { name: "Mega Plan Premium", amount: { start: "1 Cr", end: "10 Cr" } },
  ];
  

  const renderCountBox = (
    title: string,
    count: string | number | { start: string; end: string },
    path?: string
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
      <div className="bg-white m-2 p-3 rounded-[10.33px] shadow-lg flex items-center justify-between transform transition-transform duration-200 hover:scale-105">
        <div>
          <Typography
            variant="body2"
            className="text-sm text-gray-600 mb-2 font-inter"
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
        {data.map((item, index) => renderCountBox(item.name, item.amount, ""))}
      </Grid>
    </div>
  );
};

export default SuperAdminDashBoard;
