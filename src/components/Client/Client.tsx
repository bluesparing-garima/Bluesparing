import { Card, CardContent, Typography, Grid } from "@mui/material";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";
import Footer from "../Footer/Footer";
import ClientHeader from "./ClientHeader";

const Client = () => {
  const loc = useLocation();
  let policy = loc.state as any;

  const details = [
    { label: "Policy Number", value: policy[0].policyNumber },
    { label: "Policy Type", value: policy[0].policyType },
    { label: "Vehicle", value: `${policy[0].make} - ${policy[0].model}` },
    { label: "Fuel Type", value: policy[0].fuelType },
    { label: "Owner Name", value: policy[0].fullName },
    {
      label: "Phone",
      value: `${policy[0].phoneNumber}`,
    },
    {
      label: "Email",
      value: `${policy[0].emailId}`,
    },
    { label: "IDV", value: `₹${policy[0].idv}` },
    { label: "Premium", value: `₹${policy[0].finalPremium}` },
    { label: "Vehicle Number", value: `${policy[0].vehicleNumber}` },
    { label: "CC", value: `${policy[0].cc}` },
    { label: "RTO Code", value: `${policy[0].rto}` },
    { label: "Company Name", value: `${policy[0].companyName}` },
    { label: "Issue Date", value: `${dayjs(policy[0].issueDate).format(DAYJS_DISPLAY_FORMAT)}` },
    { label: "Policy Renew Date", value: `${dayjs(policy[0].endDate).format(DAYJS_DISPLAY_FORMAT)}` },
    { label: "NCB", value: `${policy[0].ncb}` },
    { label: "Tenure", value: `${policy[0].tenure}` },
    // { label: "Payment Mode", value: `${policy[0].paymentMode}` },
    // { label: "Payment Details", value: `${policy[0].paymentDetails}` },
  ];

  return (
    <>
    <ClientHeader />
    <div className="p-4 md:p-7">
      <Typography
        variant="h5"
        className="text-xl font-bold text-gray-800 mb-6 text-center underline"
      >
        Policy Details
      </Typography>
      <Grid container spacing={2}>
        {details.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card className="bg-white rounded-[10.33px] shadow-[0_0_10px_2px_#F2DDD4] transform transition-transform duration-200 hover:scale-105">
              <CardContent>
                <Typography
                  variant="subtitle1"
                  className="font-semibold text-gray-700"
                >
                  {item.label.toLocaleUpperCase()}:
                </Typography>
                <Typography className="text-gray-700 text-md font-medium">
                  {item.value.toLocaleUpperCase()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
    <div className="flex justify-center items-center text-center">
  <Footer />
</div>
    </>
  );
};

export default Client;