import { IViewPolicy } from "../IPolicy";
import { SafeKaroUser } from "../../../context/constant";
let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
export const disputedCol = [
  {
    accessorKey: "isPublished",
    header: "Publish",
    size: 100,
    visible:
      userData.role.toLowerCase() === "admin" ||
      userData.role.toLowerCase() === "account" ||
      userData.role.toLowerCase() === "booking",
    Cell: ({ cell }: any) => {
      const publish = cell.getValue();
      return <span>{publish ? "Yes" : "NO"}</span>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    size: 100,
    visible: userData.role === "admin",
  },
  {
    accessorKey: "vehicleNumber",
    header: "Vehicle Number",
    size: 100,
  },
  {
    accessorKey: "policyNumber",
    header: "Policy Number",
    size: 100,
  },
  {
    accessorKey: "policyType",
    header: "Policy Type",
    size: 100,
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
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
    accessorKey: "caseType",
    header: "Case Type",
    size: 100,
  },
  {
    accessorKey: "productType",
    header: "Product",
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
    accessorKey: "broker",
    header: "Broker",
    size: 100,
    visible:
      userData.role.toLowerCase() === "admin" ||
      userData.role.toLowerCase() === "account" ||
      userData.role.toLowerCase() === "booking",
    Cell: ({ row }: { row: { original: IViewPolicy } }) => {
      const { broker, brokerCode } = row.original;
      return (
        <span>
          {broker} - {brokerCode}
        </span>
      );
    },
  },
  {
    accessorKey: "partnerName",
    header: "Partner",
    size: 100,
    visible:
      userData.role.toLowerCase() === "admin" ||
      userData.role.toLowerCase() === "account" ||
      userData.role.toLowerCase() === "booking",
    Cell: ({ row }: { row: { original: IViewPolicy } }) => {
      const { partnerName, partnerCode } = row.original;
      return (
        <span>
          {partnerName} - {partnerCode}
        </span>
      );
    },
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
    accessorKey: "ncb",
    header: "NCB",
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
    header: "PayIn OD %",
    size: 100,
    visible:
      userData.role.toLowerCase() === "admin" ||
      userData.role.toLowerCase() === "account",
  },
  {
    accessorKey: "payInTPPercentage",
    header: "PayIn TP %",
    size: 100,
    visible:
      userData.role.toLowerCase() === "admin" ||
      userData.role.toLowerCase() === "account",
  },
  {
    accessorKey: "payInCommission",
    header: "PayIn Amount",
    size: 100,
    visible:
      userData.role.toLowerCase() === "admin" ||
      userData.role.toLowerCase() === "account",
  },
  {
    accessorKey: "payInAmount",
    header: "PayIn Paid Amount",
    size: 100,
    visible:
      userData.role.toLowerCase() === "admin" ||
      userData.role.toLowerCase() === "account",
  },
  {
    accessorKey: "payInBalance",
    header: "PayIn Balance",
    size: 100,
    visible:
      userData.role.toLowerCase() === "admin" ||
      userData.role.toLowerCase() === "account",
  },
  {
    accessorKey: "payOutODPercentage",
    header: "PayOut OD %",
    size: 100,
    visible:
      userData.role.toLowerCase() === "admin" ||
      userData.role.toLowerCase() === "account",
    Cell: ({ cell }: any) => {
      const od = cell.getValue();
      return <span>{od}%</span>;
    },
  },
  {
    accessorKey: "payOutTPPercentage",
    header: "PayOut TP %",
    size: 100,
    visible:
      userData.role.toLowerCase() === "admin" ||
      userData.role.toLowerCase() === "account",
    Cell: ({ cell }: any) => {
      const tp = cell.getValue();
      return <span>{tp}%</span>;
    },
  },
  {
    accessorKey: "payOutCommission",
    header: "PayOut Amount",
    size: 100,
    visible:
      userData.role.toLowerCase() === "admin" ||
      userData.role.toLowerCase() === "account",
  },
  {
    accessorKey: "payOutAmount",
    header: "PayOut Paid Amount",
    size: 100,
    visible:
      userData.role.toLowerCase() === "admin" ||
      userData.role.toLowerCase() === "account",
  },
  {
    accessorKey: "payOutBalance",
    header: "PayOut Balance",
    size: 100,
    visible:
      userData.role.toLowerCase() === "admin" ||
      userData.role.toLowerCase() === "account",
  },
  {
    header: "Revenue OD %",
    accessorKey: "revenue",
    visible:
      userData.role.toLowerCase() === "admin" ||
      userData.role.toLowerCase() === "account",
    Cell: ({ row }: { row: { original: IViewPolicy } }) => {
      const { payInODPercentage, payOutODPercentage } = row.original;
      const revenue = (payInODPercentage ?? 0) - (payOutODPercentage ?? 0);
      return <span>{Math.round(revenue * 100) / 100}</span>;
    },
    size: 150,
  },
  {
    header: "Revenue TP %",
    accessorKey: "revenue",
    visible:
      userData.role.toLowerCase() === "admin" ||
      userData.role.toLowerCase() === "account",
    Cell: ({ row }: { row: { original: IViewPolicy } }) => {
      const { payInTPPercentage, payOutTPPercentage } = row.original;
      const revenue = (payInTPPercentage ?? 0) - (payOutTPPercentage ?? 0);
      return <span>{Math.round(revenue * 100) / 100}</span>;
    },
    size: 150,
  },
  {
    header: "Revenue Amount",
    accessorKey: "revenue",
    visible:
      userData.role.toLowerCase() === "admin" ||
      userData.role.toLowerCase() === "account",
    Cell: ({ row }: { row: { original: IViewPolicy } }) => {
      const { payInCommission, payOutCommission } = row.original;
      const revenue = (payInCommission ?? 0) - (payOutCommission ?? 0);
      return <span>{Math.round(revenue * 100) / 100}</span>;
    },
    size: 150,
  },
  {
    accessorKey: "issueDate",
    header: "Issue Date",
    size: 100,
  },
  {
    header: "Created On",
    accessorKey: "createdOn",
    size: 50,
  },
  {
    header: "Remarks",
    accessorKey: "policyRemarks",
    size: 50,
  },
];
