import { CircularProgress, Paper, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { header } from "../../../context/constant";
import toast from "react-hot-toast";
import GetTotalPartnerPaymentService from "../../../api/Dashboard/GetTotalPartnerPayment/GetTotalPartnerPaymentService";
import FolderViewYearlyPayout from "../FolderView/FolderViewYearlyPayout";
import TotalPayOutLeftDistService from "../../../api/YearlyPayout/TotalPayOutLeftDist/TotalPayOutLeftDistService";
import TotalPaidPayoutService from "../../../api/YearlyPayout/TotalPaidPayout/TotalPaidPayoutService";
import TotalPayoutBalanceService from "../../../api/YearlyPayout/TotalPayoutBalance/TotalPayoutBalanceService";
import { useLocation } from "react-router-dom";
import { IPartnerBalance, IPartnerPaid, PartnerPayment } from "../ITreeView";

const YearlyPayout = () => {
  const location = useLocation();
  const selectedCategory = location.state as string;
  const [partnerTotalPayment, setPartnerTotalPayment] = useState<number>(0);
  const [partnerPayment, setPartnerPayment] = useState<PartnerPayment[]>([]);
  const [partnerPaidTotalPayment, setPartnerPaidTotalPayment] =
    useState<number>(0);
  const [partnerLeftDisTotalamount, setPartnerLeftDisTotalamount] =
    useState<number>(0);
  const [partnerPayoutBalTotalPayment, setPartnerPayoutBalTotalPayment] =
    useState<number>(0);
  const [partnerPaidPayment, setpartnerPaidPayment] = useState<IPartnerPaid[]>(
    []
  );
  const [partnerPayOutBalance, setPartnerPayOutBalance] = useState<
    IPartnerPaid[]
  >([]);
  const [partnerLeftDisData, setPartnerLeftDisData] = useState<
  IPartnerBalance[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchPartnerPayments = async () => {
    GetTotalPartnerPaymentService({
      header,
      category: selectedCategory,
    })
      .then((partnerPayment) => {
        setPartnerPayment(partnerPayment.data);
        setPartnerTotalPayment(partnerPayment.totalAmount);
      })
      .catch(async (error) => {
        const err = await error;
        toast.error(err.message);
      });
  };

  const fetchPartnerPaid = async () => {
    try {
      const res = await TotalPaidPayoutService({
        header,
        category: selectedCategory,
      });
      setpartnerPaidPayment(res.data);
      setPartnerPaidTotalPayment(res.totalAmount);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  const fetchpartnerPayOutBalance = async () => {
    try {
      const res = await TotalPayoutBalanceService({
        header,
        category: selectedCategory,
      });
      setPartnerPayOutBalance(res.data);
      setPartnerPayoutBalTotalPayment(res.totalAmount);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  const fetchPartnerLeftDistributedAmount = async () => {
    try {
      const res = await TotalPayOutLeftDistService({
        header,
        category: selectedCategory,
      });
      setPartnerLeftDisTotalamount(res.totalAmount);
      setPartnerLeftDisData(res.data);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        fetchPartnerPayments(),
        fetchPartnerPaid(),
        fetchpartnerPayOutBalance(),
        fetchPartnerLeftDistributedAmount(),
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
          Yearly Payout
        </Typography>
        <FolderViewYearlyPayout
          data={{
            name: "Total Payout amount",
            amount: partnerTotalPayment,
            children: partnerPayment,
          }}
          api="yearly_payout"
        />
        <FolderViewYearlyPayout
          data={{
            name: "Total Paid Payout amount",
            amount: partnerPaidTotalPayment,
            children: partnerPaidPayment,
          }}
          api="yearly_paid_payout"
        />
        <FolderViewYearlyPayout
          data={{
            name: "Total  Payout Balance",
            amount: partnerPayoutBalTotalPayment,
            children: partnerPayOutBalance,
          }}
          api="yearly_payout_balance"
        />
        <FolderViewYearlyPayout
          data={{
            name: "Total  Payout Left Distributed Amount",
            amount: partnerLeftDisTotalamount,
            children: partnerLeftDisData,
          }}
          api="yearly_left_dis_amount"
        />
      </Paper>
    </div>
  );
};

export default YearlyPayout;
