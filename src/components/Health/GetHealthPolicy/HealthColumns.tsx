import dayjs from "dayjs";
import { DAYJS_DISPLAY_FORMAT_TABLES, SafeKaroUser } from "../../../context/constant";

let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
export  const HealthColumns = [
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
        accessorKey: "companyName",
        header: "Company Name",
        size: 100,
        Cell: ({ row }: { row: { original: any } }) => {
            return row.original.companyId?.companyName || "-";
        },
    },
    {
        accessorKey: "broker",
        header: "Broker",
        size: 100,
        Cell: ({ row }: { row: { original: any } }) => {
            const { brokerId } = row.original;
            return brokerId ? `${brokerId.brokerName} - ${brokerId.brokerCode}` : "-";
        },
        visible:
            userData?.role.toLowerCase() === "admin" ||
            userData?.role.toLowerCase() === "account" ||
            userData?.role.toLowerCase() === "booking",
    },
    {
        accessorKey: "partnerName",
        header: "Partner",
        size: 100,
        Cell: ({ row }: { row: { original: any } }) => {
            const { partnerId } = row.original;
            return partnerId ? `${partnerId.name} - ${partnerId.userCode}` : "-";
        },
        visible:
            userData?.role.toLowerCase() === "admin" ||
            userData?.role.toLowerCase() === "account" ||
            userData?.role.toLowerCase() === "booking",
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
        accessorKey: "issueDate",
        header: "Start Date",
        size: 100,
        Cell: ({ row }: { row: { original: any } }) => {
            return  dayjs(row.original.issueDate).format(DAYJS_DISPLAY_FORMAT_TABLES);
        },
    },
    {
        accessorKey: "endDate",
        header: "End Date",
        size: 100,
        Cell: ({ row }: { row: { original: any } }) => {
            return  dayjs(row.original.endDate).format(DAYJS_DISPLAY_FORMAT_TABLES);
        },
    },
    {
        accessorKey: "firstPurchasedDate",
        header: "First Purchased Date",
        size: 100,
        Cell: ({ row }: { row: { original: any } }) => {
            return  dayjs(row.original.firstPurchasedDate).format(DAYJS_DISPLAY_FORMAT_TABLES);
        },
    },
    {
        accessorKey: "renewalYear",
        header: "Renewal Year",
        size: 100,
    },
    {
        accessorKey: "createdAt",
        header: "Created On",
        size: 100,
        Cell: ({ row }: { row: { original: any } }) => {
            return dayjs(row.original.createdAt).format(DAYJS_DISPLAY_FORMAT_TABLES);
        },
    },
];
