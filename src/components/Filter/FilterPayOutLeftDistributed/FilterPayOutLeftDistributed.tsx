import { Typography, Paper, Grid, Tooltip } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { header } from "../../../context/constant";
import { useEffect, useState } from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Link, useLocation } from "react-router-dom";
import TotalPayOutLeftDistService from "../../../api/YearlyPayout/TotalPayOutLeftDist/TotalPayOutLeftDistService";
import { IPartnerBalance } from "../../TreeView/ITreeView";
import { generatePartnerBalanceExcel } from "../../../utils/DashboardExcel";

const FilterPayOutLeftDistributed = () => {
  const title = "Get Total Payout Details Of All Partners";
  const location = useLocation();
  const selectedCategory = location.state as string; // This is where you access the passed state

  const [partnerTotalPayment, setPartnerTotalPayment] = useState<number>(0); // State for all credit debits
  const [partnerPayment, setPartnerPayment] = useState<IPartnerBalance[]>([]); // State for all credit debits
  useEffect(() => {
    const fetchPartnerPayments = async () => {
      TotalPayOutLeftDistService({
        header,
        category: selectedCategory!,
      }) // Call API to fetch credit debits
        .then((partnerPayment) => {
          // On successful API call
          setPartnerPayment(partnerPayment.data);
          setPartnerTotalPayment(partnerPayment.totalAmount);
        })
        .catch(async (error) => {
          const err = await error;
          toast.error(err.message);
        });
    };
    fetchPartnerPayments();
    // eslint-disable-next-line
  }, []);
  const handleDownloadExcel = () => {
    generatePartnerBalanceExcel(partnerPayment)
  };

  return (
    <div className="bg-blue-200 p-7 mt-3">
      <Paper elevation={3} style={{ padding: 20 }}>
        <div className="flex justify-between items-center">

        <Typography variant="h5" className="text-black" gutterBottom>
          {title}{" "}
          <span className="text-safekaroDarkOrange">{partnerTotalPayment}</span>
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
          {partnerPayment.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
              <Link
                state={selectedCategory}
                to={`/payouts/leftDistributed/company/${item.partnerId}`}
              >
                <div className="bg-white m-2 p-3 rounded-2xl shadow-lg flex items-center justify-between transform transition-transform duration-200 hover:scale-105">
                  <div>
                    <Typography
                      variant="body2"
                      className="text-sm text-gray-600 mb-2"
                    >
                      {item.partnerName} ({item.partnerCode})
                    </Typography>
                    <Typography
                      variant="h5"
                      className="text-base font-bold text-gray-800"
                    >
                      {item.totalPartnerBalance}
                    </Typography>
                  </div>
                  {/* Uncomment if needed
                <img src={icon} alt={title} className="h-8 w-8" />
                */}
                </div>
              </Link>
            </Grid>
          ))}
        </Grid>

        <Toaster position="bottom-center" reverseOrder={false} />
      </Paper>
    </div>
  );
};

export default FilterPayOutLeftDistributed;
