import { Typography, Paper, Grid, Tooltip } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { header } from "../../../context/constant";
import { useEffect, useState } from "react";
import GetTotalBrokerPaymentService from "../../../api/Dashboard/GetTotalBrokerPayment/GetTotalBrokerPaymentService";
import { Link, useLocation } from "react-router-dom";
import { BrokerPayInCommissionProps } from "../../TreeView/ITreeView";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { generateBrokerPayInCommissionExcel } from "../../../utils/DashboardExcel";
const FilterPayIn = () => {
  const title = "Get PayIn Details Of All Brokers";
  const location = useLocation();
  const selectedCategory = location.state as string;
  const [brokerTotalPayment, setBrokerTotalPayment] = useState<number>(0);
  const [brokerPayment, setBrokerPayment] = useState<
    BrokerPayInCommissionProps[]
  >([]);
  useEffect(() => {
    const fetchBrokerPayments = async () => {
      GetTotalBrokerPaymentService({
        header,
        category: selectedCategory,
      })
        .then((brokerPayment) => {
          setBrokerPayment(brokerPayment.data);
          setBrokerTotalPayment(brokerPayment.totalAmount);
        })
        .catch(async (error) => {
          const err = await error;
          toast.error(err.message);
        });
    };
    fetchBrokerPayments();
     // eslint-disable-next-line 
  }, []);
  const handleDownloadExcel = () => {
    generateBrokerPayInCommissionExcel(brokerPayment);
  };
  return (
    <div className="bg-blue-200 p-7 mt-3">
      <Paper elevation={3} style={{ padding: 20 }}>
        <div className="flex justify-between items-center">
          <Typography variant="h5" className="text-black" gutterBottom>
            {title}{" "}
            <span className="text-safekaroDarkOrange">
              {brokerTotalPayment}
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
        <Grid container className="bg-blue-200 mt-3">
          {brokerPayment && brokerPayment.length > 0 ? (
            brokerPayment.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                <Link
                  to={`/payins/company/${item.brokerId}`}
                  state={selectedCategory}
                >
                  <div className="bg-white m-2 p-3 rounded-2xl shadow-lg flex items-center justify-between transform transition-transform duration-200 hover:scale-105">
                    <div>
                      <Typography
                        variant="body2"
                        className="text-sm text-gray-600 mb-2"
                      >
                        {item.brokerName} ({item.brokerCode})
                      </Typography>
                      <Typography
                        variant="h5"
                        className="text-base font-bold text-gray-800"
                      >
                        {item.totalPayInCommission}
                      </Typography>
                    </div>
               
                  </div>
                </Link>
              </Grid>
            ))
          ) : (
            <Typography
              variant="body2"
              className="text-gray-600 text-center w-full p-4"
            >
              No Record found
            </Typography>
          )}
        </Grid>
        <Toaster position="bottom-center" reverseOrder={false} />
      </Paper>
    </div>
  );
};
export default FilterPayIn;
