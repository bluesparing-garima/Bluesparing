import { MRT_ColumnDef } from "material-react-table";
import { IViewPolicy } from "../../../Policy/IPolicy";
const BrokerCreditColumns: MRT_ColumnDef<IViewPolicy>[] = [
  {
    accessorKey: "payInCommission",
    header: "PayIn ",
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
    accessorKey: "fullName",
    header: "Full Name",
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
    header: "PayIn OD%",
    size: 100,
    Cell: ({ cell }) => {
      const od = cell.getValue<number>();
      return <span>{od}%</span>;
    },
  },
  {
    accessorKey: "payInTPPercentage",
    header: "PayIn TP%",
    size: 100,
    Cell: ({ cell }) => {
      const tp = cell.getValue<number>();
      return <span>{tp}%</span>;
    },
  },
  {
    accessorKey: "issueDate",
    header: "Issue Date",
    size: 100,
  },
  {
    accessorKey: "policyType",
    header: "Policy Type",
    size: 100,
  },
  {
    accessorKey: "caseType",
    header: "Case Type",
    size: 100,
  },
  {
    accessorKey: "category",
    header: "Category",
    size: 100,
  },
  {
    accessorKey: "subCategory",
    header: "Sub Category",
    size: 100,
  },
  {
    accessorKey: "companyName",
    header: "Company Name",
    size: 100,
  },
  {
    accessorKey: "vehicleNumber",
    header: "Vehicle Number",
    size: 100,
  },
  {
    accessorKey: "partnerName",
    header: "Partner Name",
    size: 100,
  },
  {
    accessorKey: "broker",
    header: "Broker",
    size: 100,
  },
  {
    accessorKey: "make",
    header: "Make",
    size: 100,
  },
  {
    accessorKey: "model",
    header: "Model",
    size: 100,
  },
  {
    accessorKey: "fuelType",
    header: "Fuel Type",
    size: 100,
  },
  {
    accessorKey: "rto",
    header: "RTO",
    size: 100,
  },
  {
    accessorKey: "cc",
    header: "CC",
    size: 100,
  },
  {
    accessorKey: "seatingCapacity",
    header: "Seating Capacity",
    size: 100,
  },
  {
    accessorKey: "weight",
    header: "Weight",
    size: 100,
  },
  {
    accessorKey: "ncb",
    header: "NCB",
    size: 100,
  },
  {
    accessorKey: "emailId",
    header: "Email",
    size: 100,
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    size: 100,
  },
  {
    accessorKey: "vehicleAge",
    header: "Vehicle Age",
    size: 100,
  },
  {
    accessorKey: "mfgYear",
    header: "MFG Year",
    size: 100,
  },
  {
    accessorKey: "tenure",
    header: "Tenure",
    size: 100,
  },
  {
    header: "Created On",
    accessorKey: "createdOn",
    size: 50,
  },
];
export default BrokerCreditColumns;
