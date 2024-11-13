import { CircularProgress, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { header } from "../../../context/constant";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { IFinalNetPremiumBroker, IFinalNetPremiumPartner } from "../ITreeView";
import GetTotalFinalNetPremiumPartnerService from "../../../api/Dashboard/GetTotalFinalNetPremiumPartner/GetTotalFinalNetPremiumPartnerService";
import GetTotalFinalNetPremiumBrokerService from "../../../api/Dashboard/GetTotalFinalNetPremiumBroker/GetTotalFinalNetPremiumBrokerService";
import FolderViewYearlyFinalNetPremium from "../FolderView/FolderViewYearlyFinalNetPremium";
const YearlyFinalNetPremium = () => {
  const location = useLocation();
  const selectedCategory = location.state as string;
  const [finalNetPremiumPartnerData, setFinalNetPremiumPartnerData] =
    useState<IFinalNetPremiumPartner[]>();
  const [finalNetPremiumPartnerTotal, setFinalNetPremiumPartnerTotal] =
    useState(0);
  const [finalNetPremiumBrokerData, setFinalNetPremiumBrokerData] =
    useState<IFinalNetPremiumBroker[]>();
  const [finalNetPremiumBrokerTotal, setFinalNetPremiumBrokerTotal] =
    useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchPartnerFinalNetPayments = async () => {
    GetTotalFinalNetPremiumPartnerService({
      header,
      category: selectedCategory,
    })
      .then((res) => {
        setFinalNetPremiumPartnerData(res.data);
        setFinalNetPremiumPartnerTotal(res.totalAmount);
      })
      .catch(async (error) => {
        const err = await error;
        toast.error(err.message);
      });
  };
  const fetchBrokerFinalNetPayments = async () => {
    GetTotalFinalNetPremiumBrokerService({
      header,
      category: selectedCategory,
    })
      .then((res) => {
        setFinalNetPremiumBrokerData(res.data);
        setFinalNetPremiumBrokerTotal(res.totalAmount);
      })
      .catch(async (error) => {
        const err = await error;
        toast.error(err.message);
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        fetchPartnerFinalNetPayments(),
        fetchBrokerFinalNetPayments(),
      ]);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line 
  }, []);
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="bg-blue-200 p-7 mt-3">
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography
          variant="h5"
          className="text-safekaroDarkOrange"
          gutterBottom
        >
          Final Net Premium
        </Typography>
        <FolderViewYearlyFinalNetPremium
          data={{
            name: "Final Net Premium Partner",
            amount: finalNetPremiumPartnerTotal,
            children: finalNetPremiumPartnerData,
          }}
          api="partner_final_net_premium"
        />
        <FolderViewYearlyFinalNetPremium
          data={{
            name: "Final Net Premium Broker",
            amount: finalNetPremiumBrokerTotal,
            children: finalNetPremiumBrokerData,
          }}
          api="broker_final_net_premium"
        />
      </Paper>
    </div>
  );
};
export default YearlyFinalNetPremium;
