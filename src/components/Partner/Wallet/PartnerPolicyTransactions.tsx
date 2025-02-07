import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { Paper, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import {
  DAYJS_DISPLAY_FORMAT,
  header,

} from "../../../context/constant";
import { IPolicyPayment } from "../../Policy/IPolicy";

import TransactionHistoryService from "../../../api/Partner/TransactionHistory/TransactionHistoryService";
import toast, { Toaster } from "react-hot-toast";
const PartnerPolicyTransactions = () => {
  const loc = useLocation();
  const { partnerId, transactionCode, remarks } = loc.state as any;

  const [isLoading, setIsLoading] = useState(false);
  const [partnerHistoryCard, setPartnerHistoryCard] = useState<
    IPolicyPayment[]
  >([]);

  const GetPartnerHistoryCard = useCallback((transactionCode, partnerId) => {
    setIsLoading(true);
    TransactionHistoryService({
      header,
      transactionCode: transactionCode,
      partnerId: partnerId,
    })
      .then((partnerHistoryCardDetails) => {
        setPartnerHistoryCard(partnerHistoryCardDetails.data);
        setIsLoading(false);
      })
      .catch(async (error) => {
        setIsLoading(false);
        const err = await error;
        toast.error(err.message);
      });
  }, []);
  useEffect(() => {
    if (partnerId) {
      GetPartnerHistoryCard(transactionCode, partnerId);
    }
    // eslint-disable-next-line
  }, [partnerId]);
  const columns = useMemo<MRT_ColumnDef<IPolicyPayment>[]>(
    () => [
      {
        accessorKey: "policyNumber",
        header: "Policy Number",
        size: 100,
      },
      {
        accessorKey: "payOutCommission",
        header: "Total Commission",
        size: 100,
      },
      {
        accessorKey: "payOutAmount",
        header: "Paid Amount",
        size: 100,
      },
      {
        accessorKey: "payOutBalance",
        header: "Balance",
        size: 100,
      },
      {
        accessorKey: "policyDate",
        header: "Policy Date",
        size: 100,
      },
      {
        accessorKey: "paymentUpdatedOn",
        header: "Payment Date",
        size: 100,
      },
      {
        accessorKey: "remarks",
        header: "Remarks",
        size: 200,
        muiTableBodyCellProps: {
          sx: {
            height: "122px",
            overflow: "auto",
            width: "100px",
            display: "flex",
          },
        },
      },
    ],
    []
  );
  const parsedData = useMemo(
    () =>
      partnerHistoryCard.map(
        (motorPolicy: IPolicyPayment) =>
          ({
            policyNumber: motorPolicy.policyNumber,
            od: motorPolicy.od?.toLocaleString(),
            tp: motorPolicy.tp?.toLocaleString(),
            netPremium: motorPolicy.netPremium?.toLocaleString(),
            finalPremium: motorPolicy.finalPremium?.toLocaleString(),
            payOutCommission: motorPolicy.payOutCommission,
            payOutAmount: motorPolicy.payOutAmount,
            payOutPaymentStatus: motorPolicy.payOutPaymentStatus,
            payOutBalance: motorPolicy.payOutBalance,
            remarks: remarks,
            paymentUpdatedOn: dayjs(motorPolicy.paymentUpdatedOn).format(
              DAYJS_DISPLAY_FORMAT
            ),
            policyDate: dayjs(motorPolicy.policyDate).format(
              DAYJS_DISPLAY_FORMAT
            ),
          } as unknown as IPolicyPayment)
      ) ?? [],
    [partnerHistoryCard, remarks]
  );

  return (
    <div className="bg-blue-200 md:p-7 p-2">
      <Paper elevation={3} style={{ padding: 30 }}>
        {}
        <Typography className="text-safekaroDarkOrange" variant="h5">
          Account History Table
        </Typography>
        {}
        <Typography variant="h5" mb={2}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <Link
                to="/dashboard"
                className="text-addButton font-bold text-sm"
              >
                Dashboard {"/ "}
              </Link>
              <Link
                to="/partnerdashboard/withdrawal"
                className="text-addButton font-bold text-sm"
              >
                History /
              </Link>
              <span className="text-grey-600 text-sm"> Account History</span>
            </div>
          </div>
          {}
          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
        </Typography>

        <MaterialReactTable
          state={{ isLoading }}
          columns={columns}
          data={parsedData}
        />
      </Paper>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default PartnerPolicyTransactions;
