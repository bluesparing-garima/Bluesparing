import { Card, CardContent, Typography, Grid, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";
import logo from "../../assets/login_logo.png";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

const Client = () => {
  const loc = useLocation();
  let policy = loc.state as any;
  console.log(policy);

  const details = [
    { label: "Policy Number", value: policy[0].policyNumber },
    { label: "Policy Type", value: policy[0].policyType },
    { label: "Fuel Type", value: policy[0].fuelType },
    { label: "Owner Name", value: policy[0].fullName },
    { label: "Phone", value: `${policy[0].phoneNumber}` },
    { label: "Email", value: `${policy[0].emailId}` },
    { label: "IDV", value: `₹${policy[0].idv}` },
    { label: "Premium", value: `₹${policy[0].finalPremium}` },
    { label: "Vehicle Number", value: `${policy[0].vehicleNumber}` },
    { label: "CC", value: `${policy[0].cc}` },
    { label: "RTO Code", value: `${policy[0].rto}` },
    {
      label: "Issue Date",
      value: `${dayjs(policy[0].issueDate).format(DAYJS_DISPLAY_FORMAT)}`,
    },
    {
      label: "Policy Renew Date",
      value: `${dayjs(policy[0].endDate).format(DAYJS_DISPLAY_FORMAT)}`,
    },
    { label: "NCB", value: `${policy[0].ncb}` },
    { label: "Tenure", value: `${policy[0].tenure}` },
    { label: "Vehicle", value: `${policy[0].make} - ${policy[0].model}` },
    { label: "Company Name", value: `${policy[0].companyName}` },
  ];

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `${policy[0].currentPolicy}`;
    link.download = policy[0]?.currentPolicy || "policy_document.png"; // Default Name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-blue-200 min-h-screen md:p-7">
      {/* Fixed Header */}
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full flex items-center justify-between px-10 py-3 z-50">
        <img src={logo} alt="no_img" className="h-12" />
        <Tooltip title="Download Documents">
          <button
            className="h-10 w-10 bg-[#3BDB03] shadow-sm rounded flex justify-center items-center text-white"
            onClick={handleDownload}
          >
            <FileDownloadOutlinedIcon className="bg-orange-400 h-full w-full rounded-sm" />
          </button>
        </Tooltip>
      </nav>

      {/* Page Content */}
      <div className="pt-20">
        {" "}
        {/* Padding to prevent content hiding under fixed navbar */}
        <Typography
          variant="h5"
          className="text-xl font-bold text-gray-800 mb-6 text-center"
        >
          Policy Details
        </Typography>
        <Grid container spacing={2}>
          {details.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card className="shadow-lg rounded-xl bg-white transition-transform transform hover:scale-105 hover:shadow-2xl border border-gray-200">
                <CardContent>
                  <Typography
                    variant="subtitle2"
                    className="font-semibold text-gray-700 text-sm"
                  >
                    {item.label.toLocaleUpperCase()}:
                  </Typography>
                  <Typography className="text-gray-900 text-md font-medium">
                    {item.value.toLocaleUpperCase()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Client;
