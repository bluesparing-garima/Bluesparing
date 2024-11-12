import { Typography, Paper, Grid, Tooltip } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { header } from "../../../context/constant";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import GetBrokerWithCompanyPaymentService from "../../../api/Dashboard/GetBrokerWithCompanyPayment/GetBrokerWithCompanyPaymentService";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { generateBrokerCompanyPayInCommissionExcel } from "../../../utils/DashboardExcel";
import { BrokerPayInCommissionCompanyProps } from "../../TreeView/ITreeView";
const CompanyFilterPayIn = () => {
  const title = "Get Payment Details Of Broker -";
  const location = useLocation();
  const selectedCategory = location.state as string; // This is where you access the passed state
  const { brokerId } = useParams();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [selectedBrokerName, setSelectedBrokerName] = useState<string>();
  const [selectedBrokerCode, setSelectedBrokerCode] = useState<string>();
  const [companyDetails, setCompanyDetails] = useState<
    BrokerPayInCommissionCompanyProps[]
  >([]); // State for all credit debits

  useEffect(() => {
    filterMonthlyBrokerPaymentWithCompany(brokerId!);
    // eslint-disable-next-line
  }, []);
  const handleDownloadExcel = () => {
    generateBrokerCompanyPayInCommissionExcel(companyDetails);
  };
  const filterMonthlyBrokerPaymentWithCompany = async (brokerId: string) => {
    GetBrokerWithCompanyPaymentService({
      header,
      brokerId: brokerId!,
      category: selectedCategory,
    }) // Call API to fetch credit debits
      .then((brokers) => {
        // On successful API call
        setCompanyDetails(brokers.data);
        setTotalAmount(brokers.totalAmount);
        setSelectedBrokerName(brokers.brokerName);
        setSelectedBrokerCode(brokers.brokerCode);
      })
      .catch(async (error) => {
        const err = await error;
        toast.error(err.message);
      });
  };

  return (
    <>
      <div className="bg-blue-200 p-7 mt-3">
        <Paper elevation={3} style={{ padding: 20 }}>
          <div className="flex justify-between items-center">
            <Typography
              variant="h5"
              className="text-safekaroDarkOrange"
              gutterBottom
              display="inline"
            >
              {title}{" "}
              <span className="text-addButton">
                {selectedBrokerName} ({selectedBrokerCode})
              </span>
            </Typography>
            <Tooltip title="download Excel">
              <button
                className="md:w-10 md:h-10 h-4 w-4 bg-[#3BDB03] shadow-sm rounded flex justify-center items-center text-white"
                onClick={handleDownloadExcel}
              >
                <FileDownloadOutlinedIcon className="md:w-6 md:h-6 h-3 w-3" />
              </button>
            </Tooltip>
          </div>

          <Typography variant="body2" className="text-sm text-gray-600 mb-2">
            Total Amount{" "}
            <span className="text-safekaroDarkOrange">{totalAmount}</span>
          </Typography>
          <Grid container className="bg-blue-200 mt-3">
            {companyDetails.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                <div className="bg-white m-2 p-3 rounded-2xl shadow-lg flex items-center justify-between transform transition-transform duration-200 hover:scale-105">
                  <div>
                    <Typography
                      variant="body2"
                      className="text-sm text-gray-600 mb-2"
                    >
                      {item.companyName}
                    </Typography>
                    <Typography
                      variant="h5"
                      className="text-base font-bold text-gray-800"
                    >
                      {item.totalPayInCommission}
                    </Typography>
                  </div>
                  {/* Uncomment if needed
                <img src={icon} alt={title} className="h-8 w-8" />
                */}
                </div>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default CompanyFilterPayIn;
