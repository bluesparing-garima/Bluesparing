import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  MaterialReactTable,
  MRT_Cell,
  type MRT_ColumnDef,
} from "material-react-table";
import {
  DAYJS_DISPLAY_FORMAT,
  DAY_FORMAT,
  SafeKaroUser,
  header,
  imagePath,
} from "../../../context/constant";
import {
  Autocomplete,
  Button,
  ClickAwayListener,
  Grid,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  TextField,
  Typography,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  motorPolicyAddPath,
  motorPolicyEditCommissionPath,
  motorPolicyEditPath,
  motorPolicyPath,
  motorPolicyViewDetailsPath,
  motorPolicyViewPath,
} from "../../../sitemap";
import { IPolicyPayment } from "../IPolicy";
import dayjs from "dayjs";
import getCalculatePayinService from "../../../api/CalcualtePayouts/GetCalculatePayin/getCalculatePayinService";
import ConfirmationDialogBox from "../../../context/ConfirmationDialogBox";
import getCalculatePayOutService from "../../../api/CalcualtePayouts/GetCalculatePayOut/getCalculatePayOutService";
import editMotorPolicyPaymentService from "../../../api/MotorPolicyPayment/EditMotorPolicyPayment/editMotorPolicyPaymentService";
import getPolicyCompletedByIdService from "../../../api/Policies/GetPolicyCompletedById/getPolicyCompletedByIdService";
import getPolicyWithPaymentService from "../../../api/Policies/GetPolicyWithPayment/getPolicyWithPaymentService";
import { MoreVertical } from "react-feather";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Field, Form } from "react-final-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { setIn } from "final-form";
import * as yup from "yup";
import deletePolicyService from "../../../api/Policies/DeletePolicy/deletePolicyService";
import Papa from "papaparse";
import useGetPartners from "../../../Hooks/Partner/useGetPartners";
import { IPartners } from "../../Partner/IPartner";
import editPolicyService from "../../../api/Policies/EditPolicy/editPolicyService";
import useGetBrokers from "../../../Hooks/Broker/useGetBrokers";
import { IBroker } from "../../Admin/Broker/IBroker";
import GetRenewedPolicyService from "../../../api/Policies/GetRenewedPolicy/GetRenewedPolicyService";
//import { mkConfig, generateCsv, download } from "export-to-csv"; //or use your library of choice here
interface MenuIconButtonProps {
  row: { original: IViewPolicy };
  isAdmin?: boolean; // Determine if the user is an admin
  isAdminAction?: boolean;
  onEdit?: () => void;
  onDownload?: () => void;
  onAdminView?: () => void;
  onView?: () => void;
  onDelete?: () => void;
  onEditCommission?: () => void;
  onViewCommission?: () => void;
  onPayIn?: () => void;
  onPayOut?: () => void;
}
interface IViewPolicy {
  // Define properties of IViewPolicy
  [key: string]: any; // Adjust based on actual type requirements
}
const GetRenewals = () => {
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const startTime = sessionStorage.getItem("startDate");
  const endTime = sessionStorage.getItem("endDate");
  const [isLoading, setIsLoading] = useState(false);
  const [motorPolicies, setMotorPolicies] = useState<IViewPolicy[]>([]);
  const [DialogTitle, setDialogTitle] = useState("Title");
  const [calculationData, setCalculationData] = useState<IPolicyPayment>();

  const [stDate, setStDate] = useState(startTime || "");
  const [eDate, setEdate] = useState(endTime || "");

  const navigate = useNavigate();
  const handleClickAddMotorPolicy = () => {
    navigate(motorPolicyAddPath());
  };
  let [partners] = useGetPartners({ header: header, role: "partner" });
  let [brokers] = useGetBrokers({ header: header });
  useEffect(() => {
    if (stDate) {
      sessionStorage.setItem("startDate", stDate);
    }
  }, [stDate]);

  useEffect(() => {
    if (eDate) {
      sessionStorage.setItem("endDate", eDate);
    }
  }, [eDate]);

  const onSubmit = async (filterForm: any) => {
    // Ensure both dates are provided
    if (!stDate || !eDate) {
      alert("Both start date and end date are required.");
      return;
    }
  
    // Convert input dates to Date objects
    const newStartDate = new Date(stDate);
    const newEndDate = new Date(eDate);
  
    // Validate if dates are valid
    if (isNaN(newStartDate.getTime()) || isNaN(newEndDate.getTime())) {
      alert("Invalid date selected. Please select valid dates.");
      return;
    }
  
    // Ensure endDate is not before startDate
    if (newEndDate < newStartDate) {
      alert("End date cannot be before start date.");
      return;
    }
  
    // Proceed based on user role
    const userRole = userData.role.toLowerCase();
  
    if (userRole === "admin" || userRole === "account") {
      GetPolicies(newStartDate, newEndDate);
    } else if (userRole === "booking") {
      GetPoliciesByPolicyCompletedById(newStartDate, newEndDate);
    } else if (userRole === "partner") {
      GetPoliciesById(newStartDate, newEndDate);
    }
  };
  

  const GetPolicies = useCallback(
    (startDate, endDate) =>
      GetRenewedPolicyService({ header, startDate, endDate })
        .then((motorPolicy) => {
          setMotorPolicies(motorPolicy.data);
        })
        .catch(async (error: any) => {
          const err = await error;
          toast.error(err.message);
        }),
    []
  );

  const GetPoliciesById = useCallback(
    (startDate, endDate) =>
      GetRenewedPolicyService({
        header,
        startDate,
        endDate,
        partnerId: userData.profileId,
      })
        .then((bookingRequestDetails) => {
          setMotorPolicies(bookingRequestDetails.data);
        })
        .catch(async (error) => {
          const err = await error;
          toast.error(err.message);
        }),
    [userData.profileId]
  );

  const GetPoliciesByPolicyCompletedById = useCallback(
    (startDate, endDate) =>
      getPolicyCompletedByIdService({
        header,
        policyCompletedById: userData.profileId,
        startDate,
        endDate,
      })
        .then((bookingRequestDetails) => {
          setMotorPolicies(bookingRequestDetails.data);
        })
        .catch(async (error) => {
          const err = await error;
          toast.error(err.message);
        }),
    [userData.profileId]
  );

  useEffect(() => {
    const currentDate = new Date();
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    let formattedFirstDay = format(firstDayOfMonth, "yyyy-MM-dd");
    let formattedLastDay = format(lastDayOfMonth, "yyyy-MM-dd");

    if (stDate) {
      formattedFirstDay = stDate;
    }
    if (eDate) {
      formattedLastDay = eDate;
    }
    if (
      userData.role.toLowerCase() === "admin" ||
      userData.role.toLowerCase() === "account"
    ) {
      GetPolicies(formattedFirstDay, formattedLastDay);
    } else if (userData.role.toLowerCase() === "booking") {
      GetPoliciesByPolicyCompletedById(formattedFirstDay, formattedLastDay);
    } else if (userData.role.toLowerCase() === "partner") {
      GetPoliciesById(formattedFirstDay, formattedLastDay);
    }
  }, [
    userData.role,
    stDate,
    eDate,
    GetPolicies,
    GetPoliciesById,
    GetPoliciesByPolicyCompletedById,
  ]);

  // Function to create a CSV file and trigger download
  const downloadCsv = (filename: string, csv: string) => {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleExportRows = (rows: any[]) => {
    const exclusiveCol = [
      "policyId",
      "id",
      "uuid",
      "brokerCode",
      "partnerId",
      "relationshipManagerId",
      "rcFront",
      "rcBack",
      "previousPolicy",
      "survey",
      "puc",
      "fitness",
      "proposal",
      "currentPolicy",
      "bookingDate",
      "bookingTimer",
      "leadDate",
      "leadTimer",
    ];
    const rowData = rows.map((row) => {
      const modifiedRow = { ...row.original };
      exclusiveCol.forEach((col) => {
        delete modifiedRow[col];
      });

      return modifiedRow;
    });
    const csv = Papa.unparse(rowData, { header: true });
    downloadCsv("motor-policy.csv", csv);
  };
  const payloadMaker = (row: IViewPolicy): IPolicyPayment => {
    let {
      od,
      tp,
      netPremium,
      finalPremium,
      payInODPercentage,
      payInTPPercentage,
      payInODAmount,
      payInTPAmount,
      payInCommission,
      payOutODPercentage,
      payOutTPPercentage,
      payOutODAmount,
      payOutTPAmount,
      payOutCommission,
      policyNumber,
      id,
    } = row;
    let policyPayment: IPolicyPayment = {
      od: Number(od),
      tp: Number(tp),
      netPremium: Number(netPremium),
      finalPremium: Number(finalPremium),
      payInODPercentage,
      payInTPPercentage,
      payInODAmount,
      payInTPAmount,
      payInCommission,
      payOutODPercentage,
      payOutTPPercentage,
      payOutODAmount,
      payOutTPAmount,
      payOutCommission,
      policyNumber,
      policyId: id,
    };

    return policyPayment;
  };
  const handleSaveCell = async (
    cell: MRT_Cell<IViewPolicy>,
    value: IPartners | IBroker | any
  ) => {
    const key = cell.column.id as keyof IPolicyPayment;

    if (cell.column.id === "partnerName") {
      const policyId = cell.row.original.id;

      const payloadData = {
        partnerCode: value.partnerId,
        partnerId: value._id,
        partnerName: value.fullName,
      };
      const policy = new FormData();
      policy.append("partnerCode", payloadData.partnerCode);
      policy.append("partnerId", payloadData.partnerId);
      policy.append("partnerName", payloadData.partnerName);
      try {
        const newPolicy = await editPolicyService({ header, policy, policyId });
        if (newPolicy.status === "success") {
          toast.success(`${key} is updated successfully`);
        }
      } catch (err: any) {
        const errorData = await err;
        toast.error(errorData.message);
      }
      motorPolicies[cell.row.index]["partnerCode"] = value.partnerId;
      motorPolicies[cell.row.index]["partnerId"] = value._id;
      motorPolicies[cell.row.index]["partnerName"] = value.fullName;
    } else if (cell.column.id === "broker") {
      const policyId = cell.row.original.id;

      const payloadData = {
        brokerCode: value.brokerCode,
        brokerId: value._id,
        brokerName: value.brokerName,
      };

      const policy = new FormData();
      policy.append("brokerCode", payloadData.brokerCode);
      policy.append("brokerId", payloadData.brokerId);
      policy.append("broker", payloadData.brokerName);
      try {
        const newPolicy = await editPolicyService({ header, policy, policyId });
        if (newPolicy.status === "success") {
          toast.success(`${key} is updated successfully`);
        }
      } catch (err: any) {
        const errorData = await err;
        toast.error(errorData.message);
      }
      motorPolicies[cell.row.index]["brokerCode"] = value.brokerCode;
      motorPolicies[cell.row.index]["brokerId"] = value._id;
      motorPolicies[cell.row.index]["broker"] = value.brokerName;
    } else {
      let policyForm = payloadMaker(cell.row.original);
      motorPolicies[cell.row.index][key] = Number(value);
      policyForm[key] = Number(value);
      const ODAmount = policyForm.od;
      const TPAmount = policyForm.tp;
      const payInODPercentage = policyForm.payInODPercentage;
      const payInTPPercentage = policyForm.payInTPPercentage;
      let calculatedPayInODPercentage: number =
        (ODAmount * payInODPercentage) / 100;
      let calculatedPayInTPPercentage: number =
        (TPAmount * payInTPPercentage) / 100;

      calculatedPayInODPercentage = Math.round(calculatedPayInODPercentage);
      calculatedPayInTPPercentage = Math.round(calculatedPayInTPPercentage);
      policyForm.payInODAmount = calculatedPayInODPercentage;
      motorPolicies[cell.row.index]["payInODAmount"] =
        calculatedPayInODPercentage;
      policyForm.payInTPAmount = calculatedPayInTPPercentage;
      motorPolicies[cell.row.index]["payInTPAmount"] =
        calculatedPayInTPPercentage;
      let payInCommission =
        calculatedPayInODPercentage + calculatedPayInTPPercentage;
      payInCommission = Math.round(payInCommission);
      policyForm.payInCommission = payInCommission;
      motorPolicies[cell.row.index]["payInCommission"] = payInCommission;
      // ---------payOut------------
      const payOutODPercentage = policyForm.payOutODPercentage;
      const payOutTPPercentage = policyForm.payOutTPPercentage;
      let calculatedPayOutODPercentage: number =
        (ODAmount * payOutODPercentage) / 100;
      let calculatedPayOutTPPercentage: number =
        (TPAmount * payOutTPPercentage) / 100;

      calculatedPayOutODPercentage = Math.round(calculatedPayOutODPercentage);
      calculatedPayOutTPPercentage = Math.round(calculatedPayOutTPPercentage);
      policyForm.payOutODAmount = calculatedPayOutODPercentage;
      policyForm.payOutTPAmount = calculatedPayOutTPPercentage;
      motorPolicies[cell.row.index]["payOutODAmount"] =
        calculatedPayOutODPercentage;
      motorPolicies[cell.row.index]["payOutTPAmount"] =
        calculatedPayOutTPPercentage;
      let payOutCommission =
        calculatedPayOutODPercentage + calculatedPayOutTPPercentage;
      payOutCommission = Math.round(payOutCommission);
      policyForm.payOutCommission = payOutCommission;
      motorPolicies[cell.row.index]["payOutCommission"] = payOutCommission;
      try {
        const newPayment = await editMotorPolicyPaymentService({
          header,
          policyPayment: policyForm,
        });
        motorPolicies[cell.row.index][cell.column.id as keyof IViewPolicy] =
          value;
        if (newPayment.status === "success") {
          toast.success(`${key} is updated successfully`);
        }
      } catch (error: any) {
        const err = await error;
        toast.error(err.message);
      }
    }

    setMotorPolicies([...motorPolicies]);
  };

  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<IViewPolicy>[]>(
    () =>
      [
        {
          accessorKey: "endDate", 
          header: "End Date",
          size: 100,
          visible: userData.role === "admin", 
        },
        {
          accessorKey: "issueDate", 
          header: "Issue Date",
          size: 100,
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
          accessorKey: "policyNumber", //normal accessorKey
          header: "Policy Number",
          size: 100,
        },
        {
          accessorKey: "policyType", //normal accessorKey
          header: "Policy Type",
          size: 100,
        },
        {
          accessorKey: "fullName", //normal accessorKey
          header: "Full Name",
          size: 100,
        },
        {
          accessorKey: "emailId", //normal accessorKey
          header: "Email",
          size: 100,
        },
        {
          accessorKey: "phoneNumber", //normal accessorKey
          header: "Phone Number",
          size: 100,
        },
        {
          accessorKey: "caseType", //normal accessorKey
          header: "Case Type",
          size: 100,
        },
        {
          accessorKey: "productType", //normal accessorKey
          header: "Product",
          size: 100,
        },
        {
          accessorKey: "subCategory", //normal accessorKey
          header: "Sub Category",
          size: 100,
        },
        {
          accessorKey: "companyName", //normal accessorKey
          header: "Company Name",
          size: 100,
        },
        {
          accessorKey: "vehicleAge", //normal accessorKey
          header: "Vehicle Age",
          size: 100,
        },
        {
          accessorKey: "mfgYear", //normal accessorKey
          header: "MFG Year",
          size: 100,
        },
        {
          accessorKey: "tenure", //normal accessorKey
          header: "Tenure",
          size: 100,
        },
        {
          accessorKey: "broker", //normal accessorKey
          header: "Broker",
          size: 100,
          visible:
            userData.role.toLowerCase() === "admin" ||
            userData.role.toLowerCase() === "account",
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
            userData.role.toLowerCase() === "account",
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
          accessorKey: "make", //normal accessorKey
          header: "Make",
          size: 100,
        },
        {
          accessorKey: "model", //normal accessorKey
          header: "Model",
          size: 100,
        },
        {
          accessorKey: "fuelType", //normal accessorKey
          header: "Fuel Type",
          size: 100,
        },
        {
          accessorKey: "rto", //normal accessorKey
          header: "RTO",
          size: 100,
        },
        {
          accessorKey: "cc", //normal accessorKey
          header: "CC",
          size: 100,
        },
        {
          accessorKey: "seatingCapacity", //normal accessorKey
          header: "Seating Capacity",
          size: 100,
        },
        {
          accessorKey: "ncb", //normal accessorKey
          header: "NCB",
          size: 100,
        },
        {
          accessorKey: "od", //normal accessorKey
          header: "OD",
          size: 100,
        },
        {
          accessorKey: "tp", //normal accessorKey
          header: "TP",
          size: 100,
        },
        {
          accessorKey: "netPremium", //normal accessorKey
          header: "Net Premium",
          size: 100,
        },
        {
          accessorKey: "finalPremium", //normal accessorKey
          header: "Final Premium",
          size: 100,
        },
        {
          accessorKey: "payInODPercentage", //normal accessorKey
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
          Cell: ({ cell }: any) => {
            const od = cell.getValue();
            return <span>{od}%</span>;
          },
        },
        {
          accessorKey: "payOutTPPercentage",
          header: "PayOut TP %",
          size: 100,
          Cell: ({ cell }: any) => {
            const tp = cell.getValue();
            return <span>{tp}%</span>;
          },
        },
        {
          accessorKey: "payOutCommission", //normal accessorKey
          header: "PayOut Amount",
          size: 100,
        },
        {
          accessorKey: "payOutAmount", //normal accessorKey
          header: "PayOut Paid Amount",
          size: 100,
        },
        {
          accessorKey: "payOutBalance", //normal accessorKey
          header: "PayOut Balance",
          size: 100,
        },

        {
          header: "Revenue OD %",
          accessorKey: "revenue",
          visible:
            userData.role.toLowerCase() === "admin" ||
            userData.role.toLowerCase() === "account", // Conditional visibility
          Cell: ({ row }: { row: { original: IViewPolicy } }) => {
            // Assuming `payInCommission` and `payOutCommission` are available in `row.original`
            const { payInODPercentage, payOutODPercentage } = row.original;
            const revenue =
              (payInODPercentage ?? 0) - (payOutODPercentage ?? 0);
            return <span>{Math.round(revenue * 100) / 100}</span>; // Rounded to 2 decimal places
          },
          size: 150, // Adjust size as needed
        },
        {
          header: "Revenue TP %",
          accessorKey: "revenue",
          visible:
            userData.role.toLowerCase() === "admin" ||
            userData.role.toLowerCase() === "account", // Conditional visibility
          Cell: ({ row }: { row: { original: IViewPolicy } }) => {
            // Assuming `payInCommission` and `payOutCommission` are available in `row.original`
            const { payInTPPercentage, payOutTPPercentage } = row.original;
            const revenue =
              (payInTPPercentage ?? 0) - (payOutTPPercentage ?? 0);
            return <span>{Math.round(revenue * 100) / 100}</span>; // Rounded to 2 decimal places
          },
          size: 150, // Adjust size as needed
        },
        {
          header: "Revenue Amount",
          accessorKey: "revenue",
          visible:
            userData.role.toLowerCase() === "admin" ||
            userData.role.toLowerCase() === "account", // Conditional visibility
          // Assuming `payInCommission` and `payOutCommission` are available in `row.original`
          Cell: ({ row }: { row: { original: IViewPolicy } }) => {
            const { payInCommission, payOutCommission } = row.original;
            const revenue = (payInCommission ?? 0) - (payOutCommission ?? 0);
            return <span>{Math.round(revenue * 100) / 100}</span>; // Rounded to 2 decimal places
          },
          size: 150, // Adjust size as needed
        },

        {
          accessorKey: "policyCompletedByName", //normal accessorKey
          header: "Booking Person Name",
          size: 100,
          Cell: ({ row }: { row: { original: IViewPolicy } }) => {
            const { policyCompletedByName, policyCompletedByCode } =
              row.original;
            return (
              <span>
                {policyCompletedByName} - {policyCompletedByCode}
              </span>
            );
          },
        },

        
        {
          header: "Created On",
          accessorKey: "createdOn",
          size: 50,
        },
      ].filter((column) => column.visible !== false),
    [userData.role]
  );

  const parsedData = useMemo(
    () =>
      motorPolicies?.map(
        (motorPolicy: IViewPolicy) =>
          ({
            id: motorPolicy._id,
            policyId: motorPolicy.policyId,
            fullName: motorPolicy.fullName,
            productType: motorPolicy.productType,
            emailId: motorPolicy.emailId,
            weight: motorPolicy.weight,
            broker: motorPolicy.broker,
            brokerCode: motorPolicy.brokerCode,
            policyType: motorPolicy.policyType,
            caseType: motorPolicy.caseType,
            category: motorPolicy.category,
            subCategory: motorPolicy.subCategory,
            companyName: motorPolicy.companyName,
            make: motorPolicy.make,
            model: motorPolicy.model,
            fuelType: motorPolicy.fuelType,
            rto: motorPolicy.rto,
            vehicleNumber: motorPolicy.vehicleNumber,
            seatingCapacity: motorPolicy.seatingCapacity,
            vehicleAge: motorPolicy.vehicleAge,
            ncb: motorPolicy.ncb,
            policyNumber: motorPolicy.policyNumber,
            phoneNumber: motorPolicy.phoneNumber,
            mfgYear: motorPolicy.mfgYear,
            registrationDate: dayjs(motorPolicy.registrationDate).format(
              DAYJS_DISPLAY_FORMAT
            ),
            endDate: dayjs(motorPolicy.endDate).format(DAYJS_DISPLAY_FORMAT),
            issueDate: dayjs(motorPolicy.issueDate).format(
              DAYJS_DISPLAY_FORMAT
            ),
            tenure: motorPolicy.tenure,
            idv: motorPolicy.idv,
            od: motorPolicy.od,
            tp: motorPolicy.tp,
            netPremium: motorPolicy.netPremium,
            finalPremium: parseInt(motorPolicy.finalPremium),
            cc: motorPolicy.cc,
            paymentMode: motorPolicy.paymentMode,
            policyCreatedBy: motorPolicy.policyCreatedBy,
            createdOn: dayjs(motorPolicy.createdOn).format(
              DAYJS_DISPLAY_FORMAT
            ),
            paymentDetails: motorPolicy.paymentDetails,
            policyStatus: motorPolicy.policyStatus,
            partnerCode: motorPolicy.partnerCode,
            partnerId: motorPolicy.partnerId,
            partnerName: motorPolicy.partnerName,
            relationshipManagerName: motorPolicy.relationshipManagerName,
            relationshipManagerId: motorPolicy.relationshipManagerId,
            rcFront: motorPolicy.rcFront,
            rcBack: motorPolicy.rcBack,
            previousPolicy: motorPolicy.previousPolicy,
            policyCompletedByName: motorPolicy.policyCompletedByName,
            policyCompletedByCode: motorPolicy.policyCompletedByCode,
            survey: motorPolicy.survey,
            puc: motorPolicy.puc,
            fitness: motorPolicy.fitness,
            proposal: motorPolicy.proposal,
            currentPolicy: motorPolicy.currentPolicy,
            payInPaymentStatus: motorPolicy.payInPaymentStatus,
            payInODAmount: motorPolicy.payInODAmount,
            payInODPercentage: motorPolicy.payInODPercentage,
            payInTPPercentage: motorPolicy.payInTPPercentage,
            payInTPAmount: motorPolicy.payInTPAmount,
            payInBalance: motorPolicy.payInBalance,
            payInCommission: motorPolicy.payInCommission,
            payOutODPercentage: motorPolicy.payOutODPercentage,
            payOutTPPercentage: motorPolicy.payOutTPPercentage,
            payOutODAmount: motorPolicy.payOutODAmount,
            payOutTPAmount: motorPolicy.payOutTPAmount,
            payOutBalance: motorPolicy.payOutBalance,
            payOutCommission: motorPolicy.payOutCommission,
            payInAmount: motorPolicy.payInAmount,
            payOutAmount: motorPolicy.payOutAmount,
            payOutPaymentStatus: motorPolicy.payOutPaymentStatus,
            other: motorPolicy.other,
           
          } as unknown as IViewPolicy)
      ) ?? [],
    [motorPolicies]
  );

  const updateLoading = useCallback(async () => {
    // setIsLoading(true) when motorPolicies.length is 0, and setIsLoading(false) when motorPolicies.length is > 0
    setIsLoading(motorPolicies.length >= 0 ? false : true);
  }, [motorPolicies]);

  useEffect(() => {
    updateLoading();
  }, [updateLoading]);
  const [dataToPass, setdataToPass] = useState<any>();

  const handleClickCalculatePayIn = async (policy: IViewPolicy) => {
    setDialogOpen(true);
    setDialogTitle("PayIn Calculation");
    try {
      const newPolicy = await getCalculatePayinService({
        header,
        fuelType: policy.fuelType!,
        policyType: policy.policyType!,
        companyName: policy.companyName!,
        productType: policy.productType!,
        subCategory: policy.subCategory!,
        engine: policy.cc!,
        weight: policy.weight === undefined ? null : policy.weight!,
        ncb: policy.ncb!,
        rto: policy.rto!,
        // insuredType: "School Bus",
        vehicleAge: policy.vehicleAge!,
        caseType: policy.caseType!,
        make: policy.make!,
        model: policy.model!,
      });

      const ODAmount = policy?.od!;
      const TPAmount = policy?.tp!;
      ///---------------------------Pay In----------------------///
      //value from Form
      const payInODPercentage = newPolicy.data.od;
      const payInTPPercentage = newPolicy.data.tp;

      //PayINCalcuation
      const calculatedPayInODAmount: number =
        (ODAmount * payInODPercentage) / 100;
      const calculatedPayInTPAmount: number =
        (TPAmount * payInTPPercentage) / 100;

      const payInCommission = calculatedPayInODAmount + calculatedPayInTPAmount;

      const data = `
       OD Percentage: ${newPolicy.data.od} %
       TP Percentage: ${newPolicy.data.tp} %
       OD Commission: ${calculatedPayInODAmount}
       TP Commission: ${calculatedPayInTPAmount}
       Total Commission: ${payInCommission}
      `;
      setdataToPass(data);
      const calcuation = {
        od: ODAmount,
        tp: TPAmount,
        policyNumber: policy.policyNumber,
        partnerId: policy.partnerId,
        policyId: policy.id,
        bookingId: policy.bookingId,
        netPremium: policy.netPremium,
        finalPremium: policy.finalPremium,
        payInODPercentage: payInODPercentage,
        payInTPPercentage: payInTPPercentage,
        payInODAmount: calculatedPayInODAmount,
        payInTPAmount: calculatedPayInTPAmount,
        payInCommission: payInCommission,
        payOutODPercentage: 0,
        payOutTPPercentage: 0,
        payOutODAmount: 0,
        payOutTPAmount: 0,
        payOutCommission: 0, //payOutTPAmount+payOutODAmount
      };
      setCalculationData(calcuation);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };

  const handleClickCalculatePayOut = async (policy: IViewPolicy) => {
    setDialogOpen(true);
    setDialogTitle("PayOut Calculation");
    try {
      const newPolicy = await getCalculatePayOutService({
        header,
        fuelType: policy.fuelType!,
        policyType: policy.policyType!,
        companyName: policy.companyName!,
        productType: policy.productType!,
        subCategory: policy.subCategory!,
        engine: policy.cc!,
        weight: policy.weight === undefined ? null : policy.weight!,
        ncb: policy.ncb!,
        rto: policy.rto!,
        // insuredType: "School Bus",
        vehicleAge: policy.vehicleAge!,
        caseType: policy.caseType!,
        make: policy.make!,
        model: policy.model!,
      });

      const ODAmount = policy?.od!;
      const TPAmount = policy?.tp!;
      ///---------------------------Pay Out----------------------///
      //value from Form
      const payOutODPercentage = newPolicy.data.od;
      const payOutTPPercentage = newPolicy.data.tp;

      const calculatedPayOutODAmount: number =
        (ODAmount * payOutODPercentage) / 100;
      const calculatedPayOutTPAmount: number =
        (TPAmount * payOutTPPercentage) / 100;

      const payOutCommission =
        calculatedPayOutODAmount + calculatedPayOutTPAmount;

      const data = `
       OD Percentage: ${newPolicy.data.od} %
       TP Percentage: ${newPolicy.data.tp} %
       OD Commission: ${calculatedPayOutODAmount}
      TP Commission: ${calculatedPayOutTPAmount}
       Total Commission: ${payOutCommission}
      `;
      setdataToPass(data);
      const calcuation = {
        od: ODAmount,
        tp: TPAmount,
        policyNumber: policy.policyNumber,
        partnerId: policy.partnerId,
        policyId: policy.id,
        bookingId: policy.bookingId,
        netPremium: policy.netPremium,
        finalPremium: policy.finalPremium,
        payOutODPercentage: payOutODPercentage,
        payOutTPPercentage: payOutTPPercentage,
        payOutODAmount: calculatedPayOutODAmount,
        payOutTPAmount: calculatedPayOutTPAmount,
        payOutCommission: payOutCommission,
        payInODPercentage: 0,
        payInTPPercentage: 0,
        payInODAmount: 0,
        payInTPAmount: 0,
        payInCommission: 0, //payOutTPAmount+payOutODAmount
      };
      setCalculationData(calcuation);
      if (newPolicy.status === "success") {
        navigate("");
      }
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };

  const handleClickViewAdminPolicy = async (policy: IViewPolicy) => {
    navigate(motorPolicyViewPath(policy?.id!));
  };
  const handleClickViewPolicy = async (policy: IViewPolicy) => {
    navigate(motorPolicyViewDetailsPath(policy?.id!));
  };
  const handleClickPolicyEditCommission = async (policy: IViewPolicy) => {
    navigate(motorPolicyEditCommissionPath(policy?.id!));
  };
  //const handleClickDownloadPDF = async () => {};

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDialogTitle("");
  };

  const handleDialogAction = async () => {
    try {
      const newPayment = await editMotorPolicyPaymentService({
        header,
        policyPayment: calculationData!,
      });
      if (newPayment.status === "success") {
        navigate(motorPolicyPath());
      }
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };

  // Function to handle file download
  const downloadFile = (url: string, fileName: string) => {
    // Extract file extension from the original URL
    const urlFileName = url.substring(url.lastIndexOf("/") + 1);
    const fileExtension = urlFileName.split(".").pop()?.toLowerCase();

    // Validate file extension
    if (
      fileExtension === "pdf" ||
      fileExtension === "png" ||
      fileExtension === "jpg" ||
      fileExtension === "jpeg"
    ) {
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          const href = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = href;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        })
        .catch((error) => console.error("Error downloading file:", error));
    } else {
      console.error("Unsupported file type:", fileExtension);
      //alert("Unsupported file type. Only PDF and PNG files are supported.");
    }
  };

  const handleStartDateChange = (date: any, input: any) => {
    const newDate = dayjs(date).format(DAY_FORMAT);
    setStDate(newDate);
    if (input) {
      input.onChange(date);
    }
  };

  const handleEndDateChange = (date: any, input: any) => {
    const newDate = dayjs(date).format(DAY_FORMAT);
    input.onChange(date);
    setEdate(newDate);
  };
  // Function to handle click events
  const handleClickViewPaymentDetails = async (policy: IViewPolicy) => {
    setDialogOpen(true);
    setDialogTitle("Payment Details");

    getPolicyWithPaymentService({ header, policyId: policy.id! })
      .then((policyDetails) => {
        // setPolicyDetails(policyDetails.data);
        const data = `
        OD Amount: ${policyDetails.data.od}
        TP TPAmount: ${policyDetails.data.tp}
        PayIn ODPercentage: ${policyDetails.data.payInODPercentage} %
        PayIn TPPercentage: ${policyDetails.data.payInTPPercentage} %
        PayIn ODAmount: ${policyDetails.data.payInODAmount}
        PayIn TPAmount: ${policyDetails.data.payInTPAmount}
        Total PayIn Commission: ${policyDetails.data.payInCommission}
        PayOut ODPercentage: ${policyDetails.data.payOutODPercentage} %
        PayOut TPPercentage: ${policyDetails.data.payOutTPPercentage} %
        PayOut ODAmount: ${policyDetails.data.payOutODAmount}
        PayOut TPAmount: ${policyDetails.data.payOutTPAmount}
        Total Payout Commission: ${policyDetails.data.payOutCommission}
       `;
        setdataToPass(data);
      })
      .catch(async (error: any) => {
        const err = await error;
        toast.error(err.message);
      });
  };
  const handleClickEditPolicy = async (policy: IViewPolicy) => {
    navigate(motorPolicyEditPath(policy.id!));
  };
  const handleClickDeletePolicy = async (policy: IViewPolicy) => {
    deletePolicyService({
      header,
      policyId: policy.id,
      policies: motorPolicies,
    })
      .then((bookingRequestDetails) => {
        toast.success("policy deleted successfully");
        setMotorPolicies([...bookingRequestDetails]);
      })
      .catch(async (error) => {
        const err = await error;
        toast.error(err.message);
      });
  };

  const handleClickDownloadDocuments = async (policy: IViewPolicy) => {
    // Example usage
    if (policy.rcBack) {
      downloadFile(`${imagePath}${policy?.rcBack!}`, "rcBack");
    }
    if (policy.rcFront) {
      downloadFile(`${imagePath}${policy?.rcFront!}`, "rcFront");
    }
    if (policy.puc) {
      downloadFile(`${imagePath}${policy?.puc!}`, "puc");
      // openFileInNewTab(`${imagePath}${policy?.puc!}`, "puc");
    }
    if (policy.currentPolicy) {
      downloadFile(`${imagePath}${policy?.currentPolicy!}`, "currentPolicy");
    }
    if (policy.previousPolicy) {
      downloadFile(`${imagePath}${policy?.previousPolicy!}`, "previousPolicy");
    }
    if (policy.survey) {
      downloadFile(`${imagePath}${policy?.survey!}`, "survey");
    }
    if (policy.fitness) {
      downloadFile(`${imagePath}${policy?.fitness!}`, "fitness");
    }
    if (policy.proposal) {
      downloadFile(`${imagePath}${policy?.proposal!}`, "proposal");
    }
    if (policy.other) {
      downloadFile(`${imagePath}${policy?.other!}`, "other");
    }
    // downloadFile('https://api.safekaro.com/uploads/Manish_668919929794ffa14999dc82.png', 'Manish_668919929794ffa14999dc82.png');
  };
  const MenuIconButton: React.FC<MenuIconButtonProps> = ({
    row,
    isAdminAction,
    isAdmin,
    onEdit,
    onDownload,
    onView,
    onDelete,
    onAdminView,
    onEditCommission,
    onViewCommission,
    onPayIn,
    onPayOut,
  }) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <>
        <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <MoreVertical style={{ color: "black" }} />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper style={{ backgroundColor: "white", marginLeft: "60px" }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list"
                    aria-labelledby="composition-button"
                    sx={{}}
                  >
                    {isAdmin ? (
                      <>
                        {isAdminAction ? (
                          <>
                            {onEdit && (
                              <MenuItem
                                onClick={() => {
                                  onEdit();
                                  handleClose();
                                }}
                              >
                                Edit Policy
                              </MenuItem>
                            )}
                            {onDelete && (
                              <MenuItem
                                onClick={() => {
                                  onDelete();
                                  handleClose();
                                }}
                              >
                                Delete Policy
                              </MenuItem>
                            )}
                          </>
                        ) : (
                          ""
                        )}

                        {onDownload && (
                          <MenuItem
                            onClick={() => {
                              onDownload();
                              handleClose();
                            }}
                          >
                            Download Documents
                          </MenuItem>
                        )}
                        {onAdminView && (
                          <MenuItem
                            onClick={() => {
                              onAdminView();
                              handleClose();
                            }}
                          >
                            View Motor Policy
                          </MenuItem>
                        )}
                        {onEditCommission && (
                          <MenuItem
                            onClick={() => {
                              onEditCommission();
                              handleClose();
                            }}
                          >
                            Edit Commission
                          </MenuItem>
                        )}
                        {onViewCommission && (
                          <MenuItem
                            onClick={() => {
                              onViewCommission();
                              handleClose();
                            }}
                          >
                            View Commission
                          </MenuItem>
                        )}
                        {onPayIn && (
                          <MenuItem
                            onClick={() => {
                              onPayIn();
                              handleClose();
                            }}
                          >
                            Calculate Pay In
                          </MenuItem>
                        )}
                        {onPayOut && (
                          <MenuItem
                            onClick={() => {
                              onPayOut();
                              handleClose();
                            }}
                          >
                            Calculate Pay Out
                          </MenuItem>
                        )}
                      </>
                    ) : (
                      <>
                        {onDownload && (
                          <MenuItem
                            onClick={() => {
                              onDownload();
                              handleClose();
                            }}
                          >
                            Download Documents
                          </MenuItem>
                        )}
                        {onView && (
                          <MenuItem
                            onClick={() => {
                              onView();
                              handleClose();
                            }}
                          >
                            View Motor Policy
                          </MenuItem>
                        )}
                      </>
                    )}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
    );
  };
  const validateFormValues = (schema: any) => async (values: any) => {
    if (typeof schema === "function") {
      schema = schema();
    }
    try {
      await schema.validate(values, { abortEarly: false });
    } catch (err: any) {
      const errors = err.inner.reduce((formError: any, innerError: any) => {
        return setIn(formError, innerError.path, innerError.message);
      }, {});
      return errors;
    }
  };
  const validationSchema = yup.object().shape({
    startDate: yup.string().nullable().required("Start Date is required"),
    endDate: yup.string().nullable().required("End Date is required"),
  });

  const validate = validateFormValues(validationSchema);

  return (
    <>
      <div className="bg-blue-200 md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Motor Policies Renewals Table
          </Typography>
          <Typography variant="h5" mb={2}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <Link
                  to="/dashboard"
                  className="text-addButton font-bold text-sm"
                >
                  Dashboard /
                </Link>
                <span className="text-grey-600 text-sm">
                  {" "}
                  Motor Policies Renewals
                </span>
              </div>
              {userData.role.toLowerCase() === "admin" ||
              userData.role.toLowerCase() === "booking" ||
              userData.role.toLowerCase() === "account" ? (
                <Button
                  type="button"
                  className="w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                  onClick={handleClickAddMotorPolicy}
                  size="small"
                >
                  <span className="md:text-xs text-[10px]">
                    Add Motor Policies
                  </span>
                </Button>
              ) : (
                ""
              )}
            </div>
            {/* Add a full-width grey line here */}
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>

          <React.Fragment>
            <Form
              validate={validate}
              onSubmit={onSubmit}
              // initialValues={initialValues}

              render={({ handleSubmit, submitting, errors, values }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    {/* Account Code Selection */}
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                      <Field name="startDate">
                        {({ input, meta }) => {
                          return (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                disableFuture
                                label="Start Date"
                                inputFormat="DD/MM/YYYY"
                                value={dayjs(stDate)}
                                onChange={(date) => {
                                  handleStartDateChange(date, input);
                                }}
                                renderInput={(params: any) => (
                                  <TextField
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={stDate}
                                    {...params}
                                    error={meta.touched && !!meta.error}
                                    helperText={meta.touched && meta.error}
                                  />
                                )}
                              />
                            </LocalizationProvider>
                          );
                        }}
                      </Field>
                    </Grid>
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                      <Field name="endDate">
                        {({ input, meta }) => {
                          return (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                disableFuture
                                label="End Date"
                                inputFormat="DD/MM/YYYY"
                                value={dayjs(eDate)}
                                onChange={(date) =>
                                  handleEndDateChange(date, input)
                                }
                                renderInput={(params: any) => (
                                  <TextField
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    {...params}
                                    error={meta.touched && !!meta.error}
                                    helperText={meta.touched && meta.error}
                                  />
                                )}
                              />
                            </LocalizationProvider>
                          );
                        }}
                      </Field>
                    </Grid>

                    <Grid item lg={3} md={3} sm={6} xs={12}>
                      <Button
                        type="submit"
                        disabled={submitting}
                        variant="contained"
                        color="primary"
                        className=" w-26 h-10 bg-addButton text-white p-3 md:text-xs text-[10px] rounded-sm"
                      >
                        {"Get Records"}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          </React.Fragment>

          <MaterialReactTable
            state={{ isLoading }}
            columns={columns}
            data={parsedData}
          
            renderTopToolbarCustomActions={({ table }) => (
              <>
                <Button
                  className="text-white bg-safekaroDarkOrange md:m-2 md:p-2 md:text-xs text-[10px]"
                  disabled={table.getRowModel().rows.length === 0}
                  onClick={() =>
                    handleExportRows(table.getFilteredRowModel().rows)
                  }
                >
                  Export Filter Data
                </Button>
              </>
            )}
           
          />
          <ConfirmationDialogBox
            open={dialogOpen}
            onClose={handleCloseDialog}
            title={DialogTitle}
            content=""
            data={dataToPass}
            onAction={handleDialogAction}
          />
        </Paper>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default GetRenewals;
