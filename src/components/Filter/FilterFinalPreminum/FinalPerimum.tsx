import  { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { header } from "../../../context/constant";
import toast from "react-hot-toast";
import { Button, Grid, Paper, Tooltip, Typography } from "@mui/material";
import GetTotalFinalNetPremiumPartnerService from "../../../api/Dashboard/GetTotalFinalNetPremiumPartner/GetTotalFinalNetPremiumPartnerService";
import GetTotalFinalNetPremiumBrokerService from "../../../api/Dashboard/GetTotalFinalNetPremiumBroker/GetTotalFinalNetPremiumBrokerService";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { generateExcelFinalPremium } from "../../../utils/DashboardExcel";
import {
  IFinalNetPremiumBroker,
  IFinalNetPremiumPartner,
} from "../../TreeView/ITreeView";
const FinalPremium = () => {
  const title = "Get Final Premium Details";
  const location = useLocation();
  const selectedCategory = location.state as string;
  const [isPartner, setIsPartner] = useState(1);
  const [selectedPartner, setSelectedPartner] = useState(true);
  const [totalFinalPremium, setTotalFinalPremium] = useState<number>(0);
  const [partnerTotalFinalPremium, setPartnerTotalFinalPremium] =
    useState<number>(0);
  const [brokerTotalFinalPremium, setBrokerTotalFinalPremium] =
    useState<number>(0);
  const [partnerFinalPremium, setPartnerFinalPremium] = useState<
    IFinalNetPremiumPartner[]
  >([]);
  const [brokerFinalPremium, setBrokerFinalPremium] = useState<
    IFinalNetPremiumBroker[]
  >([]);
  const handleDownloadExcel = () => {
    if (isPartner === 1) {
      generateExcelFinalPremium(partnerFinalPremium, "partner");
    } else {
      generateExcelFinalPremium(brokerFinalPremium, "broker");
    }
  };
  const fetchPartnerPayments = async () => {
    try {
      const partnerResponse = await GetTotalFinalNetPremiumPartnerService({
        header,
        category: selectedCategory,
      });
      setPartnerFinalPremium(partnerResponse.data);
      setPartnerTotalFinalPremium(partnerResponse.totalAmount);
      const brokerResponse = await GetTotalFinalNetPremiumBrokerService({
        header,
        category: selectedCategory,
      });
      setBrokerFinalPremium(brokerResponse.data);
      setBrokerTotalFinalPremium(brokerResponse.totalAmount);
      const totalFinal = Number(
        brokerResponse.totalAmount + partnerResponse.totalAmount
      );
      setTotalFinalPremium(totalFinal);
    } catch (error) {
      const err: any = await error;
      toast.error(err.message);
    }
  };
  useEffect(() => {
    fetchPartnerPayments();
     // eslint-disable-next-line 
  }, []);
  const handleFinalPremiumClick = async (flag: boolean) => {
    setSelectedPartner(flag);
    if (flag) {
      setIsPartner(1);
    } else {
      setIsPartner(2);
    }
  };
  return (
    <div className="bg-blue-200 p-7 mt-3">
      <Paper elevation={3} style={{ padding: 20 }}>
        <div className="flex justify-between items-center">
          <Typography variant="h5" className="text-black" gutterBottom>
            {title}{" "}
            <span className="text-safekaroDarkOrange">{totalFinalPremium}</span>
          </Typography>
          <Tooltip
            title={
              isPartner === 1
                ? "Download  Partner Excel"
                : "Download Broker Excel"
            }
          >
            <button
              className="md:w-10 md:h-10 h-4 w-4 bg-[#3BDB03] shadow-sm rounded flex justify-center items-center text-white"
              onClick={handleDownloadExcel}
            >
              <FileDownloadOutlinedIcon className="md:w-6 md:h-6 h-3 w-3" />
            </button>
          </Tooltip>
        </div>
        <Grid container mb={2}>
          <Grid item md={6} className={"bg-safekaroDarkOrange "}>
            <Button type="button" onClick={() => handleFinalPremiumClick(true)}>
              <Tooltip title={`View Final Data`}>
                <h2 style={{ color: "white" }}>
                  Partner Total FinalPremium ({partnerTotalFinalPremium})
                </h2>
              </Tooltip>
            </Button>
          </Grid>
          <Grid item md={6} className={"bg-addButton "}>
            <Button
              type="button"
              onClick={() => handleFinalPremiumClick(false)}
            >
              <Tooltip title={`View Final Data`}>
                <h2 style={{ color: "white" }}>
                  Broker Total FinalPremium ({brokerTotalFinalPremium})
                </h2>
              </Tooltip>
            </Button>
          </Grid>
        </Grid>
        <Grid container className="bg-blue-200 mt-3">
          {selectedPartner ? (
            <>
              <Typography variant="h5" className="text-black p-5" gutterBottom>
                {"Partner Final Premium"}
              </Typography>
              <Grid container>
                {partnerFinalPremium.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                    <Link
                      state={selectedCategory}
                      to={`/finalpremium/partner/company/${item.partnerId}`}
                    >
                      <div className="bg-white m-2 p-3 rounded-2xl shadow-lg flex items-center justify-between transform transition-transform duration-200 hover:scale-105">
                        <div>
                          <Typography
                            variant="body2"
                            className="text-sm text-gray-600 mb-2"
                          >
                            {item.partnerName} ({item.userCode})
                          </Typography>
                          <Typography
                            variant="h5"
                            className="text-base font-bold text-gray-800"
                          >
                            {item.finalPremium}
                          </Typography>
                        </div>
                 
                      </div>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <>
              <Typography variant="h5" className="text-black p-5" gutterBottom>
                {"Broker Final Premium"}
              </Typography>
              <Grid container>
                {brokerFinalPremium.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                    <Link
                      state={selectedCategory}
                      to={`/finalpremium/broker/company/${item.brokerId}`}
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
                            {item.finalPremium}
                          </Typography>
                        </div>
                      </div>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Grid>
      </Paper>
    </div>
  );
};
export default FinalPremium;
