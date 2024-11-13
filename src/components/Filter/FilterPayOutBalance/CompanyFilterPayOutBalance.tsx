import { Typography, Paper, Grid, Tooltip } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { header } from "../../../context/constant";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import TotalPayoutBalanceCompanyService from "../../../api/YearlyPayout/TotalPayoutBalanceCompany/TotalPayoutBalanceCompanyService";
import { ICompanyPaid } from "../../TreeView/ITreeView";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { generateCompanyPaidExcel } from "../../../utils/DashboardExcel";
const CompanyFilterPayOutBalance = () => {
  const title = "Get Balance Payment Details Of Partner -";
  const location = useLocation();
  const selectedCategory = location.state as string;
  const { partnerId } = useParams();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [selectedPartnerCode, setSelectedPartnerCode] = useState<string>();
  const [selectedPartnerName, setSelectedPartnerName] = useState<string>();
  const [companyDetails, setCompanyDetails] = useState<
  ICompanyPaid[]
  >([]);
  useEffect(() => {
    filterMonthlyPartnerPaymentWithCompany(partnerId!);
     // eslint-disable-next-line 
  }, [partnerId]);
  const handleDownloadExcel = () => {
    generateCompanyPaidExcel(companyDetails)
  };
  const filterMonthlyPartnerPaymentWithCompany = async (partnerId: string) => {
    TotalPayoutBalanceCompanyService({
      header,
      partnerId: partnerId!,
      category: selectedCategory,
    })
      .then((partners) => {
        setCompanyDetails(partners.data);
        setTotalAmount(partners.totalAmount);
        setSelectedPartnerCode(partners.partnerCode);
        setSelectedPartnerName(partners.partnerName);
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
              {selectedPartnerName} ({selectedPartnerCode})
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
                      {item.totalPayOutAmount}
                    </Typography>
                  </div>
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
export default CompanyFilterPayOutBalance;
