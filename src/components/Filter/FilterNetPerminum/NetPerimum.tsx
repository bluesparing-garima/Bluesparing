import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { header } from "../../../context/constant";
import toast from "react-hot-toast";
import { Button, Grid, Paper, Tooltip, Typography } from "@mui/material";
import GetTotalNetPremiumPartnerService from "../../../api/Dashboard/GetTotalNetPremiumPartner/GetTotalNetPremiumPartnerService";
import GetTotalNetPremiumBrokerService from "../../../api/Dashboard/GetTotalNetPremiumBroker/GetTotalNetPremiumBrokerService";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import {
  INetPremiumBroker,
  INetPremiumPartner,
} from "../../TreeView/ITreeView";
import { generateExcelForNetPremium } from "../../../utils/DashboardExcel";
const NetPremium = () => {
  const title = "Get Net Premium Details";
  const location = useLocation();
  const selectedCategory = location.state as string;
  const [isPartner, setIsPartner] = useState(1);
  const [selectedPartner, setSelectedPartner] = useState(true);
  const [totalNetPremium, setTotalNetPremium] = useState<number>(0);
  const [partnerTotalNetPremium, setPartnerTotalNetPremium] =
    useState<number>(0);
  const [brokerTotalNetPremium, setBrokerTotalNetPremium] = useState<number>(0);
  const [partnerNetPremium, setPartnerNetPremium] = useState<
    INetPremiumPartner[]
  >([]);
  const [brokerNetPremium, setBrokerNetPremium] = useState<INetPremiumBroker[]>(
    []
  );
  const handleDownloadExcel = () => {
    if (isPartner === 1) {
      generateExcelForNetPremium(partnerNetPremium, "partner");
    } else {
      generateExcelForNetPremium(brokerNetPremium, "broker");
    }
  };
  const fetchPartnerPayments = async () => {
    try {
      const partnerResponse = await GetTotalNetPremiumBrokerService({
        header,
        category: selectedCategory,
      });
      setBrokerNetPremium(partnerResponse.data);
      setBrokerTotalNetPremium(partnerResponse.totalAmount);
      const brokerResponse = await GetTotalNetPremiumPartnerService({
        header,
        category: selectedCategory,
      });
      setPartnerNetPremium(brokerResponse.data);
      setPartnerTotalNetPremium(brokerResponse.totalAmount);
      const totalNet = Number(
        brokerResponse.totalAmount + partnerResponse.totalAmount
      );
      setTotalNetPremium(totalNet);
    } catch (error) {
      const err: any = await error;
      toast.error(err.message);
    }
  };
  useEffect(() => {
    fetchPartnerPayments();
     // eslint-disable-next-line 
  }, []);
  const handleNetPremiumClick = async (flag: boolean) => {
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
            <span className="text-safekaroDarkOrange">{totalNetPremium}</span>
          </Typography>
          <Tooltip
            title={
              isPartner === 1
                ? "Download Partner Excel"
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
            <Button type="button" onClick={() => handleNetPremiumClick(true)}>
              <Tooltip title={`View Net Data`}>
                <h2 style={{ color: "white" }}>
                  Partner Total NetPremium ({partnerTotalNetPremium})
                </h2>
              </Tooltip>
            </Button>
          </Grid>
          <Grid item md={6} className={"bg-addButton "}>
            <Button type="button" onClick={() => handleNetPremiumClick(false)}>
              <Tooltip title={`View Net Data`}>
                <h2 style={{ color: "white" }}>
                  Broker Total NetPremium ({brokerTotalNetPremium})
                </h2>
              </Tooltip>
            </Button>
          </Grid>
        </Grid>
        <Grid container className="bg-blue-200 mt-3">
          {selectedPartner ? (
            <>
              <Typography variant="h5" className="text-black p-5" gutterBottom>
                {"Partner Net Premium"}
              </Typography>
              <Grid container>
                {partnerNetPremium.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                    <Link
                      state={selectedCategory}
                      to={`/netpremium/partner/company/${item.partnerId}`}
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
                            {item.netPremium}
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
            </>
          ) : (
            <>
              <Typography variant="h5" className="text-black p-5" gutterBottom>
                {"Broker Net Premium"}
              </Typography>
              <Grid container>
                {brokerNetPremium.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                    <Link
                      state={selectedCategory}
                      to={`/netpremium/broker/company/${item.brokerId}`}
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
                            {item.netPremium}
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
export default NetPremium;
