import React from "react";
import { MRT_ColumnDef } from "material-react-table";
import dayjs from "dayjs";
import { DAYJS_DISPLAY_FORMAT } from "../../../../context/constant";
import { ITdsType } from "../ITDS";
const PayOutTdsColumns: MRT_ColumnDef<ITdsType>[] = [
  {
    accessorKey: "totalAmountWithTds",
    header: "Tds Apply On",
    size: 150,
  },
  {
    accessorKey: "tdsPercentage",
    header: "TDS Percentage",
    size: 100,
    Cell: ({ cell }) => {
      const tdsPercentage = cell.getValue<number>();
      return <span>{tdsPercentage}%</span>;
    },
  },
  {
    accessorKey: "tdsAmount",
    header: "TDS Amount",
    size: 100,
  },
  {
    accessorKey: "partnerName",
    header: "Partner",
    size: 100,
  },
  {
    accessorKey: "accountCode",
    header: "Account Code",
    size: 150,
  },
  {
    accessorKey: "receiverName",
    header: "Receiver  Name",
    size: 150,
  },
  {
    accessorKey: "receiverPan",
    header: "Receiver Pan No",
    size: 150,
  },
  {
    accessorKey: "receiverAccountNumber",
    header: "Receiver Account Number",
    size: 150,
  },
  {
    accessorKey: "receiverIFSCCode",
    header: "Receiver Bank IFSC Code",
    size: 150,
  }, {
    accessorKey: "receiverBankName",
    header: "Receiver Bank Name",
    size: 150,
  }
  , {
    accessorKey: "receiverAccountCode",
    header: "Receiver  Account Code",
    size: 150,
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    size: 150,
    Cell: ({ cell }) => {
      const startDate = cell.getValue<string | Date | null>();
      return startDate ? dayjs(startDate).format(DAYJS_DISPLAY_FORMAT) : "-";
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    size: 150,
    Cell: ({ cell }) => {
      const endDate = cell.getValue<string | Date | null>();
      return endDate ? dayjs(endDate).format(DAYJS_DISPLAY_FORMAT) : "-";
    },
  },
  {
    accessorKey: "distributedDate",
    header: "Distributed Date",
    size: 150,
    Cell: ({ cell }) => {
      const endDate = cell.getValue<string | Date | null>();
      return endDate ? dayjs(endDate).format(DAYJS_DISPLAY_FORMAT) : "-";
    },
  }

];
export default PayOutTdsColumns;
