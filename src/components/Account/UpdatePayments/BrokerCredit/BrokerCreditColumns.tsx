import { MRT_ColumnDef } from "material-react-table";
import { IViewPolicy } from "../../../Policy/IPolicy";
import dayjs from "dayjs";
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
      const od = cell.getValue<number>();
      return <span>{od}%</span>;
    },
  },
  {
    accessorKey: "payInTPPercentage",
    header: "PayOut TP%",
    size: 100,
    Cell: ({ cell }) => {
      const tp = cell.getValue<number>();
      return <span>{tp}%</span>;
    },
  },
  {
    header: "Created On",
    accessorKey: "createdOn",
    size: 50,
    Cell: ({ cell }) => {
      const dateValue = cell.getValue<string | number | Date | null>();
      return dayjs(dateValue).format(DAYJS_DISPLAY_FORMAT);
    },
  },
];
export default BrokerCreditColumns;
