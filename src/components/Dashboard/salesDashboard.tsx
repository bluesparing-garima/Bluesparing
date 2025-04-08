import { Card, CardContent, Typography, Grid } from "@mui/material";
import dayjs from "dayjs";
import { useEffect } from "react";
import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";
import useGetMenuByRoleId from "../../Hooks/Menu/useGetMenu";

const SalesDashboard = () => {
  // Simulating stored user object from localStorage
  const storedUser = localStorage.getItem("user");
  const UserData = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    console.log("UserData", UserData);

  }, [UserData]);
  useGetMenuByRoleId(UserData?.roleId);
  // Dummy Sale Record using fields from user
  const sale = {
    productName: "Wireless Earbuds",
    quantity: 2,
    totalAmount: 4998,
    paymentMode: "UPI",
    saleDate: "2025-04-08",
    status: "Completed",
  };

  const details = [
    { label: "Salesperson Name", value: UserData?.name || "N/A" },
    { label: "Phone Number", value: UserData?.phoneNumber || "N/A" },
    { label: "Email", value: UserData?.email || "N/A" },
    { label: "Product", value: sale.productName },
    { label: "Quantity", value: sale.quantity },
    { label: "Total Amount", value: `₹${sale.totalAmount}` },
    { label: "Payment Mode", value: sale.paymentMode },
    { label: "Sale Date", value: dayjs(sale.saleDate).format(DAYJS_DISPLAY_FORMAT) },
    { label: "Plan Name", value: UserData?.planName || "N/A" },
    { label: "Plan Start Date", value: dayjs(UserData?.planStartDate).format(DAYJS_DISPLAY_FORMAT) },
    { label: "Plan Expiry", value: dayjs(UserData?.planExpired).format(DAYJS_DISPLAY_FORMAT) },
    { label: "Head RM", value: UserData?.headRM || "N/A" },
    { label: "Parent Admin", value: UserData?.parentUserName || "N/A" },
    { label: "User Code", value: UserData?.userCode || "N/A" },
    { label: "Status", value: sale.status },
  ];

  return (
    <div className="bg-green-100 min-h-screen p-4 md:p-7">
      <Typography
        variant="h5"
        className="text-xl font-bold text-gray-800 mb-6 text-center"
      >
        Sales Dashboard
      </Typography>
      <Grid container spacing={2}>
        {details.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card className="shadow-lg rounded-xl bg-white transition-transform transform hover:scale-105 hover:shadow-2xl">
              <CardContent>
                <Typography
                  variant="subtitle1"
                  className="font-semibold text-gray-700"
                >
                  {item.label.toUpperCase()}:
                </Typography>
                <Typography className="text-gray-700 text-md font-medium">
                  {`${item.value}`.toUpperCase()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SalesDashboard;
