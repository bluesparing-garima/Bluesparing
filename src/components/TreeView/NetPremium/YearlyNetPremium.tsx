import { CircularProgress, Paper, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { header } from "../../../context/constant";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { INetPremiumBroker, INetPremiumPartner } from "../ITreeView";
import FolderViewYearlyNetPremium from "../FolderView/FolderViewYearlyNetPremium";
import GetTotalNetPremiumPartnerService from "../../../api/Dashboard/GetTotalNetPremiumPartner/GetTotalNetPremiumPartnerService";
import GetTotalNetPremiumBrokerService from "../../../api/Dashboard/GetTotalNetPremiumBroker/GetTotalNetPremiumBrokerService";

const YearlyNetPremium = () => {
  const location = useLocation();
  const selectedCategory = location.state as string;
  const [netPremiumPartnerData, setNetPremiumPartnerData] =
    useState<INetPremiumPartner[]>();
  const [netPremiumPartnerTotal, setNetPremiumPartnerTotal] = useState(0);
  const [netPremiumBrokerData, setNetPremiumBrokerData] =
    useState<INetPremiumBroker[]>();
  const [netPremiumBrokerTotal, setNetPremiumBrokerTotal] = useState(0);

  const [loading, setLoading] = useState<boolean>(true);
  const fetchPartnerNetPayments = async () => {
    GetTotalNetPremiumPartnerService({
      header,
      category: selectedCategory,
    })
      .then((res) => {
        setNetPremiumPartnerData(res.data);
        setNetPremiumPartnerTotal(res.totalAmount);
      })
      .catch(async (error) => {
        const err = await error;
        toast.error(err.message);
      });
  };
  const fetchBrokerNetPayments = async () => {
    GetTotalNetPremiumBrokerService({
      header,
      category: selectedCategory,
    })
      .then((res) => {
        setNetPremiumBrokerData(res.data);
        setNetPremiumBrokerTotal(res.totalAmount);
      })
      .catch(async (error) => {
        const err = await error;
        toast.error(err.message);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchPartnerNetPayments(), fetchBrokerNetPayments()]);
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
          Total Net Premium
        </Typography>

        <FolderViewYearlyNetPremium
          data={{
            name: "Total  Net  Premium Partner",
            amount: netPremiumPartnerTotal,
            children: netPremiumPartnerData,
          }}
          api="partner_net_premium"
        />
        <FolderViewYearlyNetPremium
          data={{
            name: "Total  Net  Premium Broker",
            amount: netPremiumBrokerTotal,
            children: netPremiumBrokerData,
          }}
          api="broker_net_premium"
        />
      </Paper>
    </div>
  );
};

export default YearlyNetPremium;
