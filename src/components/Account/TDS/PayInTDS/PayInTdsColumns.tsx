import React from "react"; // Ensure React is imported
import { MRT_ColumnDef } from "material-react-table";
import dayjs from "dayjs"; // Import dayjs for date formatting
import { DAYJS_DISPLAY_FORMAT } from "../../../../context/constant";
import { ITdsType } from "../ITDS";

const PayInTdsColumns: MRT_ColumnDef<ITdsType>[] = [
  {
    accessorKey: "totalAmountWithTds",
    header: "TDS Apply On",
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
    accessorKey: "accountCode",
    header: "Account Code",
    size: 150,
  },
  {
    accessorKey: "brokerName",
    header: "Broker",
    size: 100,
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
];

export default PayInTdsColumns;
