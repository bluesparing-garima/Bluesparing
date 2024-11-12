import { useMemo } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import { ICreditDebits, ICreditDebitsVM } from "../ICreditDebits";
import { DAYJS_DISPLAY_FORMAT } from "../../../../context/constant";
interface PoliciesDetailsProps {
  creditDebits: ICreditDebits[];
}
const ViewCreditDebitByBroker = ({ creditDebits }: PoliciesDetailsProps) => {
  const columns = useMemo<MRT_ColumnDef<ICreditDebits>[]>(
    () => [
      {
        accessorKey: "transactionCode",
        header: "Transactions Code",
        size: 200,
      },
      {
        accessorKey: "accountType",
        header: "Account Type",
        size: 200,
      },
      {
        accessorKey: "accountCode",
        header: "Account",
        size: 200,
      },
      {
        accessorKey: "transactionCode",
        header: "Transaction Code",
        size: 200,
      },
      {
        accessorKey: "amount",
        header: "Amount",
        size: 200,
      },
      {
        accessorKey: "brokerBalance",
        header: "Balance",
        size: 200,
      },
      {
        header: "Payment Start Date",
        accessorKey: "startDate",
        size: 50,
      },
      {
        header: "Payment End Date",
        accessorKey: "endDate",
        size: 50,
      },
      {
        header: "Distributed Date",
        accessorKey: "distributedDate",
        size: 50,
      },
    ],
    []
  );
  const parsedData = useMemo<ICreditDebitsVM[]>(() => {
    return creditDebits.map((creditDebit: ICreditDebits) => ({
      id: creditDebit._id,
      accountType: creditDebit.accountType,
      type: creditDebit.type,
      accountId: creditDebit.accountId,
      accountCode: creditDebit.accountCode,
      transactionCode: creditDebit.transactionCode,
      brokerName: creditDebit.brokerName,
      brokerId: creditDebit.brokerId,
      partnerName: creditDebit.partnerName,
      partnerId: creditDebit.partnerId,
      employeeId: creditDebit.employeeId,
      employeeName: creditDebit.employeeName,
      brokerBalance: creditDebit.brokerBalance!,
      policyNumber: creditDebit.policyNumber,
      amount: creditDebit.amount,
      remarks: creditDebit.remarks,
      startDate: dayjs(creditDebit.startDate).format(DAYJS_DISPLAY_FORMAT),
      endDate: dayjs(creditDebit.endDate).format(DAYJS_DISPLAY_FORMAT),
      distributedDate: dayjs(creditDebit.distributedDate).format(
        DAYJS_DISPLAY_FORMAT
      ),
      isActive: creditDebit.isActive,
      createdOn: dayjs(creditDebit.createdOn).format(DAYJS_DISPLAY_FORMAT),
      updatedOn: dayjs(creditDebit.updatedOn).format(DAYJS_DISPLAY_FORMAT),
    }));
  }, [creditDebits]);
  return (
    <div className="bg-blue-200 p-7 mt-2">
      <Paper elevation={3} style={{ padding: 30 }}>
       
        <Typography className="text-safekaroDarkOrange" variant="h5">
          Credits Records
        </Typography>
       
        <MaterialReactTable
          columns={columns}
          data={parsedData}
        />
      </Paper>
    </div>
  );
};
export default ViewCreditDebitByBroker;
