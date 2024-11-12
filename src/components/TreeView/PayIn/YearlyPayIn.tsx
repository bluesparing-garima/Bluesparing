import { CircularProgress, Paper, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { header } from "../../../context/constant";
import toast from "react-hot-toast";

import { useLocation } from "react-router-dom";
import {
  BrokerPayInCommissionProps,
  BrokerPayInLeftDistributedProps,
  BrokerReceivedPayInProps,
} from "../ITreeView";
import GetReceivedBrokerPaymentService from "../../../api/Dashboard/GetRecievedBrokerPayment/GetRecievedBrokerPaymentService";
import GetBrokerBalancePaymentService from "../../../api/Dashboard/GetBrokerBalancePayment/GetBrokerBalancePaymentService";
import GetBrokerLeftDistributedPaymentService from "../../../api/Dashboard/GetBrokerLeftDistributedPayment/GetBrokerLeftDistributedPaymentService";
import FolderViewYearlyPayIn from "../FolderView/FolderViewYearlyPayIn";
import GetTotalBrokerPaymentService from "../../../api/Dashboard/GetTotalBrokerPayment/GetTotalBrokerPaymentService";

const YearlyPayIn = () => {
  const location = useLocation();
  const selectedCategory = location.state as string;
  const [loading, setLoading] = useState<boolean>(true);
  const [yearlyBrokerPayment, setYearlyBrokerPayment] =
    useState<BrokerPayInCommissionProps[]>();
  const [yearlyBrokerPaymentTotal, setYearlyBrokerPaymentTotal] = useState(0);
  const [yearlyReceivedAmount, setYearlyReceivedAmount] =
    useState<BrokerReceivedPayInProps[]>();
  const [yearlyReceivedAmountTotal, setYearlyReceivedAmountTotal] = useState(0);
  const [yearlyLeftDistAmount, setYearlyLeftDistAmount] =
    useState<BrokerPayInLeftDistributedProps[]>();
  const [yearlyLeftDistAmountTotal, setYearlyLeftDistAmountTotal] = useState(0);
  const [yearlyPayInBalance, setYearlyPayInBalance] =
    useState<BrokerReceivedPayInProps[]>();
  const [yearlyPayInBalanceTotal, setYearlyPayInBalancetTotal] = useState(0);
  const fetchBrokerPayments = async () => {
    try {
      const res = await GetTotalBrokerPaymentService({
        header,
        category: selectedCategory,
      });
      setYearlyBrokerPayment(res.data);
      setYearlyBrokerPaymentTotal(res.totalAmount);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };

  const fetchBrokerReceivedPayment = async () => {
    try {
      const res = await GetReceivedBrokerPaymentService({
        header,
        category: selectedCategory,
      });
      setYearlyReceivedAmount(res.data);
      setYearlyReceivedAmountTotal(res.totalAmount);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  const fetchBrokerPayOutBalance = async () => {
    try {
      const res = await GetBrokerBalancePaymentService({
        header,
        category: selectedCategory,
      });
      setYearlyPayInBalancetTotal(res.totalAmount);
      setYearlyPayInBalance(res.data);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  const fetchBrokerLeftDistributedAmount = async () => {
    try {
      const res = await GetBrokerLeftDistributedPaymentService({
        header,
        category: selectedCategory,
      });
      setYearlyLeftDistAmount(res.data);
      setYearlyLeftDistAmountTotal(res.totalBalance);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        fetchBrokerPayments(),
        fetchBrokerReceivedPayment(),
        fetchBrokerPayOutBalance(),
        fetchBrokerLeftDistributedAmount(),
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
          Yearly Pay In
        </Typography>
        <FolderViewYearlyPayIn
          data={{
            name: "Yearly PayIn amount",
            amount: yearlyBrokerPaymentTotal,
            children: yearlyBrokerPayment,
          }}
          api="year_payin"
        />
        <FolderViewYearlyPayIn
          data={{
            name: "Yearly Received  PayIn ",
            amount: yearlyReceivedAmountTotal,
            children: yearlyReceivedAmount,
          }}
          api="year_paid_payin"
        />
        <FolderViewYearlyPayIn
          data={{
            name: "Yearly PayIn Balance ",
            amount: yearlyPayInBalanceTotal,
            children: yearlyPayInBalance,
          }}
          api="year_payin_balance"
        />
        <FolderViewYearlyPayIn
          data={{
            name: "Yearly Left Distribution Amount",
            amount: yearlyLeftDistAmountTotal,
            children: yearlyLeftDistAmount,
          }}
          api="year_left_dis_amount"
        />
      </Paper>
    </div>
  );
};

export default YearlyPayIn;
