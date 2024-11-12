import React from "react"; // Ensure React is imported
import { MRT_ColumnDef } from "material-react-table";
import { IViewPolicy } from "../../../Policy/IPolicy";
import dayjs from "dayjs"; // Import dayjs for date formatting
import { DAYJS_DISPLAY_FORMAT } from "../../../../context/constant";

const BrokerCreditColumns: MRT_ColumnDef<IViewPolicy>[] = [
  {
    accessorKey: "payInCommission",
    header: "PayIn",
    size: 100,
  },
  {
    accessorKey: "payInAmount",
    header: "Paid Amount",
    size: 100,
  },
  {
    accessorKey: "payInBalance",
    header: "Balance",
    size: 100,
  },
  {
    accessorKey: "policyNumber",
    header: "Policy Number",
    size: 100,
  },
  {
    accessorKey: "od",
    header: "OD",
    size: 100,
  },
  {
    accessorKey: "tp",
    header: "TP",
    size: 100,
  },
  {
    accessorKey: "netPremium",
    header: "Net Premium",
    size: 100,
  },
  {
    accessorKey: "finalPremium",
    header: "Final Premium",
    size: 100,
  },
  {
    accessorKey: "payInODPercentage",
    header: "PayOut OD%",
    size: 100,
    Cell: ({ cell }) => {
      const od = cell.getValue<number>(); // Explicitly declare type
      return <span>{od}%</span>; // Display with percentage
    },
  },
  {
    accessorKey: "payInTPPercentage",
    header: "PayOut TP%",
    size: 100,
    Cell: ({ cell }) => {
      const tp = cell.getValue<number>(); // Explicitly declare type
      return <span>{tp}%</span>; // Display with percentage
    },
  },
  {
    header: "Created On",
    accessorKey: "createdOn",
    size: 50,
    Cell: ({ cell }) => {
      const dateValue = cell.getValue<string | number | Date | null>(); // Explicitly cast to a valid type
      return dayjs(dateValue).format(DAYJS_DISPLAY_FORMAT);
    },
  },
];

export default BrokerCreditColumns;
