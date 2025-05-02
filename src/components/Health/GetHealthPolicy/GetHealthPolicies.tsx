import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  MaterialReactTable,
  MRT_Cell,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState,
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
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { healthPolicyAddPath } from "../../../sitemap";
import dayjs from "dayjs";
import ConfirmationDialogBox from "../../../context/ConfirmationDialogBox";
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
import EditPublishStatusService from "../../../api/Policies/EditPublishStatus/EditPublishStatusService";
import { IPolicyPayment } from "../../Policy/IPolicy";

interface MenuIconButtonProps {
  row: { original: IViewPolicy };
  isAdmin?: boolean;
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
  onPublish?: () => void;
  addRemark?: () => void;
}
// type UserApiResponse = {
//   data: Array<User>;
//   meta: {
//     totalRowCount: number;
//   };
// };
interface IViewPolicy {
  [key: string]: any;
}
const GetHealthPolicies = () => {
  const [data, setData] = useState<IViewPolicy[]>([]);
  const [isError, setIsError] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  //table state
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const startTime = sessionStorage.getItem("startDate");
  const endTime = sessionStorage.getItem("endDate");
  const [isLoading, setIsLoading] = useState(false);
  const [healthPolicies, setHealthPolicies] = useState<IViewPolicy[]>([]);
  const [DialogTitle, setDialogTitle] = useState("Title");
  const [calculationData, setCalculationData] = useState<IPolicyPayment>();
  const [stDate, setStDate] = useState(startTime || "");
  const [eDate, setEdate] = useState(endTime || "");
  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedPolicyId, setSelectedPolicyId] = useState("");
  const handleClickAddHealthPolicy = () => {
    // savePaginationState(pagination, MOTOR_POLICY_STORAGE_KEY);
    navigate(healthPolicyAddPath());
  };
  let [partners] = useGetPartners({ header: header, role: "partner" });
  let [brokers] = useGetBrokers({ header: header });
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //! start here new api fetching
  useEffect(() => {
    const fetchData = async () => {
      if (!data.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }

      // const url = new URL("/api/data", location.origin);
      // url.searchParams.set(
      //   "start",
      //   `${pagination.pageIndex * pagination.pageSize}`
      // );
      // url.searchParams.set("size", `${pagination.pageSize}`);
      // url.searchParams.set("filters", JSON.stringify(columnFilters ?? []));
      // url.searchParams.set("globalFilter", globalFilter ?? "");
      // url.searchParams.set("sorting", JSON.stringify(sorting ?? []));

      // try {
      //   const response = await fetch(url.href);
      //   const json = (await response.json()) as UserApiResponse;
      //   setData(json.data);
      //   setRowCount(json.meta.totalRowCount);
      // } catch (error) {
      //   setIsError(true);
      //   console.error(error);
      //   return;
      // }
      setIsError(false);
      setIsLoading(false);
      setIsRefetching(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    columnFilters, //re-fetch when column filters change
    globalFilter, //re-fetch when global filter changes
    pagination.pageIndex, //re-fetch when page index changes
    pagination.pageSize, //re-fetch when page size changes
    sorting, //re-fetch when sorting changes
  ]);

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
    if (!stDate || !eDate) {
      toast.error("Both start date and end date are required.");
      return;
    }

    const startDate = dayjs(stDate);
    const endDate = dayjs(eDate);

    if (!startDate.isValid() || !endDate.isValid()) {
      toast.error("Invalid date selected. Please select valid dates.");
      return;
    }

    if (endDate.isBefore(startDate)) {
      toast.error("End date cannot be before start date.");
      return;
    }

    const newStartDate = startDate.format(DAY_FORMAT);
    const newEndDate = endDate.format(DAY_FORMAT);

    // try {
    //   const userRole = userData.role.toLowerCase();

    //   if (userRole === "admin" || userRole === "account") {
    //     await GetPolicies(newStartDate, newEndDate);
    //   } else if (userRole === "booking") {
    //     await GetPoliciesByPolicyCompletedById(newStartDate, newEndDate);
    //   } else if (userRole === "partner") {
    //     await GetPoliciesById(newStartDate, newEndDate);
    //   }
    // } catch (error) {
    //   toast.error("Failed to fetch policies. Please try again.");
    // }
  };
  // const GetPolicies = useCallback((startDate, endDate) => {
  //   setIsLoading(true);
  //   getMotorPolicyService({ header, startDate, endDate })
  //     .then((motorPolicy) => {
  //       const res = motorPolicy.data;
  //       // setMotorPolicies([...res]);
  //     })
  //     .catch(async (error: any) => {
  //       const err = await error;
  //       toast.error(err.message);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);
  const handlePublishPolicy = async (row: IViewPolicy) => {
    const payload = {
      policyNumber: row.policyNumber,
      isPublished: true,
      header,
    };
    const res = await EditPublishStatusService(payload);
    if (res.message) {
      toast.success(res.message);
    } else {
      toast.error("error publish policy");
    }
  };
  const handleAddRemarks = async (row: IViewPolicy) => {
    setSelectedPolicyId(row.id);
    handleOpen();
  };
  // const GetPoliciesById = useCallback(
  //   (startDate, endDate) => {
  //     setIsLoading(true);
  //     getPolicyByPartnerIdService({
  //       header,
  //       partnerId: userData.profileId,
  //       startDate,
  //       endDate,
  //     })
  //       .then((bookingRequestDetails) => {
  //         // setMotorPolicies(bookingRequestDetails.data);
  //       })
  //       .catch(async (error) => {
  //         const err = await error;
  //         toast.error(err.message);
  //       })
  //       .finally(() => {
  //         setIsLoading(false);
  //       });
  //   },
  //   [userData.profileId]
  // );
  // const GetPoliciesByPolicyCompletedById = useCallback(
  //   (startDate, endDate) => {
  //     setIsLoading(true);
  //     getPolicyCompletedByIdService({
  //       header,
  //       policyCompletedById: userData.profileId,
  //       startDate,
  //       endDate,
  //     })
  //       .then((bookingRequestDetails) => {
  //         // setMotorPolicies(bookingRequestDetails.data);
  //       })
  //       .catch(async (error) => {
  //         const err = await error;
  //         toast.error(err.message);
  //       })
  //       .finally(() => {
  //         setIsLoading(false);
  //       });
  //   },
  //   [userData.profileId]
  // );
  // useEffect(() => {
  //   const currentDate = new Date();
  //   const firstDayOfMonth = startOfMonth(currentDate);
  //   const lastDayOfMonth = endOfMonth(currentDate);
  //   let formattedFirstDay = format(firstDayOfMonth, "yyyy-MM-dd");
  //   let formattedLastDay = format(lastDayOfMonth, "yyyy-MM-dd");
  //   if (stDate) {
  //     formattedFirstDay = stDate;
  //   }
  //   if (eDate) {
  //     formattedLastDay = eDate;
  //   }
  //   if (
  //     userData.role.toLowerCase() === "admin" ||
  //     userData.role.toLowerCase() === "account"
  //   ) {
  //     GetPolicies(formattedFirstDay, formattedLastDay);
  //   } else if (userData.role.toLowerCase() === "booking") {
  //     GetPoliciesByPolicyCompletedById(formattedFirstDay, formattedLastDay);
  //   } else if (userData.role.toLowerCase() === "partner") {
  //     GetPoliciesById(formattedFirstDay, formattedLastDay);
  //   }
  // }, [
  //   userData.role,
  //   stDate,
  //   eDate,
  //   GetPolicies,
  //   GetPoliciesById,
  //   GetPoliciesByPolicyCompletedById,
  //   open,
  // ]);
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
    // const csv = Papa.unparse(rowData, { header: true });
    // downloadCsv("motor-policy.csv", csv);
  };
  const payloadMaker = (row: IViewPolicy): IPolicyPayment => {
    let {
      // od,
      // tp,
      netPremium,
      finalPremium,
      // payInODPercentage,
      // payInTPPercentage,
      // payInODAmount,
      // payInTPAmount,
      // payInCommission,
      // payOutODPercentage,
      // payOutTPPercentage,
      // payOutODAmount,
      // payOutTPAmount,
      // payOutCommission,
      policyNumber,
      id,
    } = row;
    let policyPayment: any = {
      // od: Number(od),
      // tp: Number(tp),
      netPremium: Number(netPremium),
      finalPremium: Number(finalPremium),
      // payInODPercentage,
      // payInTPPercentage,
      // payInODAmount,
      // payInTPAmount,
      // payInCommission,
      // payOutODPercentage,
      // payOutTPPercentage,
      // payOutODAmount,
      // payOutTPAmount,
      // payOutCommission,
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
      // motorPolicies[cell.row.index]["partnerCode"] = value.partnerId;
      // motorPolicies[cell.row.index]["partnerId"] = value._id;
      // motorPolicies[cell.row.index]["partnerName"] = value.fullName;
    } else if (cell.column.id === "broker") {
      const policyId = cell.row.original.id;
      const payloadData = {
        brokerCode: value.brokerCode,
        brokerId: value._id,
        brokerName: value.brokerName,
      };
      const policy = new FormData();
      // policy.append("brokerCode", payloadData.brokerCode);
      // policy.append("brokerId", payloadData.brokerId);
      // policy.append("broker", payloadData.brokerName);
      try {
        const newPolicy = await editPolicyService({ header, policy, policyId });
        if (newPolicy.status === "success") {
          toast.success(`${key} is updated successfully`);
        }
      } catch (err: any) {
        const errorData = await err;
        toast.error(errorData.message);
      }
      // motorPolicies[cell.row.index]["brokerCode"] = value.brokerCode;
      // motorPolicies[cell.row.index]["brokerId"] = value._id;
      // motorPolicies[cell.row.index]["broker"] = value.brokerName;
    } else {
      let policyForm = payloadMaker(cell.row.original);
      healthPolicies[cell.row.index][key] = Number(value);
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
      healthPolicies[cell.row.index]["payInODAmount"] =
        calculatedPayInODPercentage;
      policyForm.payInTPAmount = calculatedPayInTPPercentage;
      healthPolicies[cell.row.index]["payInTPAmount"] =
        calculatedPayInTPPercentage;
      let payInCommission =
        calculatedPayInODPercentage + calculatedPayInTPPercentage;
      payInCommission = Math.round(payInCommission);
      policyForm.payInCommission = payInCommission;
      healthPolicies[cell.row.index]["payInCommission"] = payInCommission;
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
      healthPolicies[cell.row.index]["payOutODAmount"] =
        calculatedPayOutODPercentage;
      healthPolicies[cell.row.index]["payOutTPAmount"] =
        calculatedPayOutTPPercentage;
      let payOutCommission =
        calculatedPayOutODPercentage + calculatedPayOutTPPercentage;
      payOutCommission = Math.round(payOutCommission);
      policyForm.payOutCommission = payOutCommission;
      healthPolicies[cell.row.index]["payOutCommission"] = payOutCommission;
    }
    // setMotorPolicies([...motorPolicies]);
  };
  const columns = useMemo<MRT_ColumnDef<IViewPolicy>[]>(
    () => [
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

      // {
      //   accessorKey: "companyName",
      //   header: "Company Name",
      //   size: 100,
      // },

      // {
      //   accessorKey: "mfgYear",
      //   header: "MFG Year",
      //   size: 100,
      // },

      // {
      //   accessorKey: "netPremium",
      //   header: "Net Premium",
      //   size: 100,
      // },
      // {
      //   accessorKey: "finalPremium",
      //   header: "Final Premium",
      //   size: 100,
      // },

      // {
      //   accessorKey: "issueDate",
      //   header: "Issue Date",
      //   size: 100,
      // },
      // {
      //   header: "Created On",
      //   accessorKey: "createdOn",
      //   size: 50,
      // },
      // {
      //   header: "Remarks",
      //   accessorKey: "policyRemarks",
      //   size: 50,
      // },
    ],
    []
  );
  // const parsedData = useMemo(
  //   () =>
  //     healthPolicies?.map(
  //       (motorPolicy: IViewPolicy) =>
  //         ({
  //           id: motorPolicy._id,
  //           policyId: motorPolicy.policyId,
  //           fullName: motorPolicy.fullName,
  //           productType: motorPolicy.productType,
  //           emailId: motorPolicy.emailId,
  //           weight: motorPolicy.weight,
  //           broker: motorPolicy.broker,
  //           brokerCode: motorPolicy.brokerCode,
  //           policyType: motorPolicy.policyType,
  //           caseType: motorPolicy.caseType,
  //           category: motorPolicy.category,
  //           subCategory: motorPolicy.subCategory,
  //           companyName: motorPolicy.companyName,
  //           make: motorPolicy.make,
  //           model: motorPolicy.model,
  //           fuelType: motorPolicy.fuelType,
  //           rto: motorPolicy.rto,
  //           vehicleNumber: motorPolicy.vehicleNumber,
  //           seatingCapacity: motorPolicy.seatingCapacity,
  //           vehicleAge: motorPolicy.vehicleAge,
  //           ncb: motorPolicy.ncb,
  //           policyNumber: motorPolicy.policyNumber,
  //           phoneNumber: motorPolicy.phoneNumber,
  //           mfgYear: motorPolicy.mfgYear,
  //           registrationDate: dayjs(motorPolicy.registrationDate).format(
  //             DAYJS_DISPLAY_FORMAT
  //           ),
  //           endDate: dayjs(motorPolicy.endDate).format(DAYJS_DISPLAY_FORMAT),
  //           issueDate: dayjs(motorPolicy.issueDate).format(
  //             DAYJS_DISPLAY_FORMAT
  //           ),
  //           tenure: motorPolicy.tenure,
  //           idv: motorPolicy.idv,
  //           od: motorPolicy.od,
  //           tp: motorPolicy.tp,
  //           netPremium: motorPolicy.netPremium,
  //           finalPremium: parseInt(motorPolicy.finalPremium),
  //           cc: motorPolicy.cc,
  //           paymentMode: motorPolicy.paymentMode,
  //           policyCreatedBy: motorPolicy.policyCreatedBy,
  //           createdOn: dayjs(motorPolicy.createdOn).format(
  //             DAYJS_DISPLAY_FORMAT
  //           ),
  //           paymentDetails: motorPolicy.paymentDetails,
  //           policyStatus: motorPolicy.policyStatus,
  //           partnerCode: motorPolicy.partnerCode,
  //           partnerId: motorPolicy.partnerId,
  //           partnerName: motorPolicy.partnerName,
  //           relationshipManagerName: motorPolicy.relationshipManagerName,
  //           relationshipManagerId: motorPolicy.relationshipManagerId,
  //           rcFront: motorPolicy.rcFront,
  //           rcBack: motorPolicy.rcBack,
  //           previousPolicy: motorPolicy.previousPolicy,
  //           policyCompletedByName: motorPolicy.policyCompletedByName,
  //           policyCompletedByCode: motorPolicy.policyCompletedByCode,
  //           survey: motorPolicy.survey,
  //           puc: motorPolicy.puc,
  //           fitness: motorPolicy.fitness,
  //           proposal: motorPolicy.proposal,
  //           currentPolicy: motorPolicy.currentPolicy,
  //           payInPaymentStatus: motorPolicy.payInPaymentStatus,
  //           payInODAmount: motorPolicy.payInODAmount,
  //           payInODPercentage: motorPolicy.payInODPercentage,
  //           payInTPPercentage: motorPolicy.payInTPPercentage,
  //           payInTPAmount: motorPolicy.payInTPAmount,
  //           payInBalance: motorPolicy.payInBalance,
  //           payInCommission: motorPolicy.payInCommission,
  //           payOutODPercentage: motorPolicy.payOutODPercentage,
  //           payOutTPPercentage: motorPolicy.payOutTPPercentage,
  //           payOutODAmount: motorPolicy.payOutODAmount,
  //           payOutTPAmount: motorPolicy.payOutTPAmount,
  //           payOutBalance: motorPolicy.payOutBalance,
  //           payOutCommission: motorPolicy.payOutCommission,
  //           payInAmount: motorPolicy.payInAmount,
  //           payOutAmount: motorPolicy.payOutAmount,
  //           payOutPaymentStatus: motorPolicy.payOutPaymentStatus,
  //           other: motorPolicy.other,
  //           isPublished: motorPolicy.isPublished || false,
  //           policyRemarks: motorPolicy.policyRemarks || "",
  //           isDispute: motorPolicy.isDispute,
  //         } as unknown as IViewPolicy)
  //     ) ?? [],
  //   [healthPolicies]
  // );
  const updateLoading = useCallback(async () => {
    setIsLoading(healthPolicies.length >= 0 ? false : true);
  }, [healthPolicies]);
  useEffect(() => {
    updateLoading();
  }, [updateLoading]);
  const [dataToPass, setdataToPass] = useState<any>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDialogTitle("");
  };

  const downloadFile = (url: string, fileName: string) => {
    const urlFileName = url.substring(url.lastIndexOf("/") + 1);
    const fileExtension = urlFileName.split(".").pop()?.toLowerCase();
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
        .catch((error) => {
          throw error;
        });
    } else {
    }
  };
  const isPaid = (row: any) => {
    const result = [
      "partnerName",
      "payInODPercentage",
      "payInTPPercentage",
      "payOutTPPercentage",
      "payOutODPercentage",
      "brokerName",
    ];
    let { payInPaymentStatus, payOutPaymentStatus } = row;
    payInPaymentStatus =
      typeof payInPaymentStatus === "string"
        ? payInPaymentStatus.toLowerCase().trim()
        : "";
    payOutPaymentStatus =
      typeof payOutPaymentStatus === "string"
        ? payOutPaymentStatus.toLowerCase().trim()
        : "";
    payInPaymentStatus =
      payInPaymentStatus === "partial" ? "paid" : payInPaymentStatus;
    payOutPaymentStatus =
      payOutPaymentStatus === "partial" ? "paid" : payOutPaymentStatus;
    if (payInPaymentStatus === "paid" && payOutPaymentStatus === "paid") {
      return ["partnerName", "brokerName"];
    } else if (
      payInPaymentStatus === "paid" &&
      payOutPaymentStatus === "unpaid"
    ) {
      return [
        "partnerName",
        "payOutTPPercentage",
        "payOutODPercentage",
        "brokerName",
      ];
    } else if (
      payInPaymentStatus === "unpaid" &&
      payOutPaymentStatus === "paid"
    ) {
      return [
        "payInODPercentage",
        "payInTPPercentage",
        "brokerName",
        "partnerName",
      ];
    } else {
      return result;
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

  const handleClickDeletePolicy = async (policy: IViewPolicy) => {
    deletePolicyService({
      header,
      policyId: policy.id,
      policies: healthPolicies,
    })
      .then((bookingRequestDetails) => {
        toast.success("policy deleted successfully");
        // setMotorPolicies([...bookingRequestDetails]);
      })
      .catch(async (error) => {
        const err = await error;
        toast.error(err.message);
      });
  };
  const handleClickDownloadDocuments = async (policy: IViewPolicy) => {
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
  };
  const MenuIconButton: React.FC<MenuIconButtonProps> = ({
    row,
    isAdminAction,
    isAdmin,
    onEdit,
    onDownload,
    onView,
    onDelete,
    onPublish,
    addRemark,
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
                    {onPublish && (
                      <MenuItem
                        onClick={() => {
                          onPublish();
                          handleClose();
                        }}
                      >
                        Publish Policy
                      </MenuItem>
                    )}
                    {addRemark && (
                      <MenuItem
                        onClick={() => {
                          addRemark();
                          handleClose();
                        }}
                      >
                        Add Remarks
                      </MenuItem>
                    )}
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
                            View Health Policy
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
                            View Health Policy
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
      <div className=" md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Health Policies Table
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
                <span className="text-grey-600 text-sm"> Health Policies</span>
              </div>
              {/* {userData.role.toLowerCase() === "admin" ||
              userData.role.toLowerCase() === "booking" ||
              userData.role.toLowerCase() === "account" ? ( */}
              <Button
                type="button"
                size="small"
                onClick={handleClickAddHealthPolicy}
                className="btnGradient text-black px-4 py-3 rounded-md w-full sm:w-auto"
              >
                <span className="text-[10px] md:text-xs">
                  Add Health Policies
                </span>
              </Button>
              {/* ) : ( */}
              {/* "" */}
              {/* )} */}
            </div>
            {}
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>
          <React.Fragment>
            <Form
              validate={validate}
              onSubmit={onSubmit}
              render={({ handleSubmit, submitting, errors, values }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    {}
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                      <Field name="startDate">
                        {({ input, meta }) => {
                          return (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="Start Date"
                                inputFormat="DD/MM/YYYY"
                                value={dayjs(stDate)}
                                // minDate={
                                //   userData.role.toLowerCase().trim() ===
                                //   "partner"
                                //     ? new Date(2025, 0, 1)
                                //     : undefined
                                // }
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
                                label="End Date"
                                inputFormat="DD/MM/YYYY"
                                value={dayjs(eDate)}
                                // minDate={
                                //   userData.role.toLowerCase().trim() ===
                                //   "partner"
                                //     ? new Date(2025, 0, 1)
                                //     : undefined
                                // }
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
                        disabled={isLoading}
                        variant="contained"
                        color="primary"
                        className="btnGradient text-black px-4 py-2.5 rounded-md w-full sm:w-auto text-[10px] md:text-xs"
                      >
                        {isLoading ? "Getting..." : "Get Records"}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          </React.Fragment>

          {/* //! react table start from here */}

          <MaterialReactTable
            muiTablePaperProps={{
              sx: {
                boxShadow: "none",
                backgroundColor: "transparent",
              },
            }}
            muiTableContainerProps={{
              sx: {
                boxShadow: "none",
                backgroundColor: "transparent",
              },
            }}
            state={{
              columnFilters,
              globalFilter: globalFilter.trim(),
              isLoading,
              pagination,
              showAlertBanner: isError,
              showProgressBars: isRefetching,
              sorting,
            }}
            columns={columns}
            data={data}
            enableRowSelection={true}
            getRowId={(row) => row.phoneNumber}
            initialState={{ showColumnFilters: true }}
            manualFiltering={true}
            manualPagination={true}
            manualSorting={true}
            muiToolbarAlertBannerProps={
              isError
                ? {
                    color: "error",
                    children: "Error loading data",
                  }
                : undefined
            }
            onColumnFiltersChange={setColumnFilters}
            onGlobalFilterChange={setGlobalFilter}
            onSortingChange={setSorting}
            rowCount={rowCount}
            onPaginationChange={setPagination}
            autoResetPageIndex={false}
            paginateExpandedRows={false}
            enableRowActions
            editingMode="cell"
            enableGlobalFilter
            globalFilterFn="fuzzy"
            // muiTableBodyCellEditTextFieldProps={({ cell }) => {
            //   const editableColumns = isPaid(cell.row.original);
            //   const isEditable = editableColumns.includes(cell.column.id);
            //   if (cell.column.id === "partnerName") {
            //     return {
            //       select: true,
            //       children: (
            //         <Autocomplete
            //           sx={{ width: "200px", margin: "3px" }}
            //           options={partners.sort()}
            //           getOptionLabel={(option) =>
            //             `${option.name} - ${option.userCode}`
            //           }
            //           renderInput={(params) => (
            //             <TextField
            //               {...params}
            //               label="Select Partner"
            //               variant="outlined"
            //               size="small"
            //             />
            //           )}
            //           onChange={(event, newValue) => {
            //             handleSaveCell(cell, newValue);
            //           }}
            //           value={
            //             partners.find((p) => p._id === cell.getValue()) || null
            //           }
            //           isOptionEqualToValue={(option, value) =>
            //             option._id === value._id
            //           }
            //         />
            //       ),
            //     };
            //   }
            //   if (cell.column.id === "broker") {
            //     return {
            //       select: true,
            //       children: (
            //         <Autocomplete
            //           sx={{ width: "200px", margin: "3px" }}
            //           options={brokers.sort()}
            //           getOptionLabel={(option) =>
            //             `${option.brokerName} - ${option.brokerCode}`
            //           }
            //           renderInput={(params) => (
            //             <TextField
            //               {...params}
            //               label="Select Broker"
            //               variant="outlined"
            //               size="small"
            //             />
            //           )}
            //           onChange={(event, newValue) => {
            //             handleSaveCell(cell, newValue);
            //           }}
            //           value={
            //             brokers.find((b) => b._id === cell.getValue()) || null
            //           }
            //           isOptionEqualToValue={(option, value) =>
            //             option._id === value._id
            //           }
            //         />
            //       ),
            //     };
            //   }
            //   return isEditable
            //     ? {
            //         onBlur: (event) => {
            //           const newValue = event.target.value;
            //           handleSaveCell(cell, newValue);
            //         },
            //       }
            //     : {
            //         disabled: true,
            //       };
            // }}
            renderTopToolbarCustomActions={({ table }) => (
              <>
                <Button
                  className="btnGradient text-black px-4 py-2.5 m-2 rounded-md w-full sm:w-auto text-[10px] md:text-xs"
                  disabled={table.getRowModel().rows.length === 0}
                  onClick={() =>
                    handleExportRows(table.getFilteredRowModel().rows)
                  }
                >
                  Export Filter Data
                </Button>
              </>
            )}
            // renderRowActions={({ row }) => {
            //   return (
            //     <div className="flex justify-center items-center">
            //       {(userData.role.toLowerCase() === "admin" ||
            //         userData.role.toLowerCase() === "account" ||
            //         userData.role.toLowerCase() === "partner") && (
            //         <Tooltip title={"Policy Dispute"}>
            //           <IconButton
            //             color="primary"
            //             aria-label={"Dispute"}
            //             component="span"
            //             onClick={() => {
            //               savePaginationState(
            //                 pagination,
            //                 MOTOR_POLICY_STORAGE_KEY
            //               );
            //               navigate(`/policy/policy-dispute`, {
            //                 state: row.original,
            //               });
            //             }}
            //           >
            //             {row.original.isDispute && (
            //               <svg
            //                 xmlns="http://www.w3.org/2000/svg"
            //                 fill="none"
            //                 viewBox="0 0 24 24"
            //                 strokeWidth={1.5}
            //                 stroke="currentColor"
            //                 className="size-6"
            //               >
            //                 <path
            //                   strokeLinecap="round"
            //                   strokeLinejoin="round"
            //                   d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            //                 />
            //               </svg>
            //             )}
            //             {row.original.isDispute === false && (
            //               <svg
            //                 xmlns="http://www.w3.org/2000/svg"
            //                 fill="none"
            //                 viewBox="0 0 24 24"
            //                 strokeWidth={1.5}
            //                 stroke="currentColor"
            //                 className="size-6"
            //               >
            //                 <path
            //                   strokeLinecap="round"
            //                   strokeLinejoin="round"
            //                   d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            //                 />
            //               </svg>
            //             )}
            //           </IconButton>
            //         </Tooltip>
            //       )}
            //       {/* <MenuIconButton row={row}
            //         isAdmin={
            //           userData.role.toLowerCase() === "admin" ||
            //           userData.role.toLowerCase() === "account" ||
            //           userData.role.toLowerCase().trim() === "booking"
            //             ? true
            //             : false
            //         }
            //         isAdminAction={
            //           row.original.payInPaymentStatus! === "UnPaid" &&
            //           row.original.payOutPaymentStatus! === "UnPaid"
            //             ? true
            //             : false
            //         }
            //         onPublish={
            //           (userData.role.toLowerCase() === "admin" ||
            //             userData?.role?.toLowerCase().trim() === "booking" ||
            //             userData?.role?.toLowerCase().trim() === "account") &&
            //           row.original.isPublished === false
            //             ? () => handlePublishPolicy(row.original)
            //             : undefined
            //         }
            //         addRemark={
            //           userData?.role.toLowerCase() === "admin" ||
            //           userData?.role?.toLowerCase().trim() === "account" ||
            //           userData?.role.toLowerCase() === "partner"
            //             ? () => handleAddRemarks(row.original)
            //             : undefined
            //         }
            //         onEdit={() => handleClickEditPolicy(row.original)}
            //         onDelete={() => handleClickDeletePolicy(row.original)}
            //         onDownload={() =>
            //           handleClickDownloadDocuments(row.original)
            //         }
            //         onAdminView={
            //           userData.role.toLowerCase() === "admin" ||
            //           userData?.role?.toLowerCase().trim() === "account"
            //             ? () => handleClickViewAdminPolicy(row.original)
            //             : undefined
            //         }
            //         onView={() => handleClickViewPolicy(row.original)}
            //         onEditCommission={
            //           userData.role.toLowerCase() === "admin" ||
            //           userData?.role?.toLowerCase().trim() === "account"
            //             ? () => handleClickPolicyEditCommission(row.original)
            //             : undefined
            //         }
            //         onPayIn={
            //           userData.role.toLowerCase() === "admin" ||
            //           userData?.role?.toLowerCase().trim() === "account"
            //             ? () => handleClickCalculatePayIn(row.original)
            //             : undefined
            //         }
            //         onPayOut={
            //           userData.role.toLowerCase() === "admin" ||
            //           userData?.role?.toLowerCase().trim() === "account"
            //             ? () => handleClickCalculatePayOut(row.original)
            //             : undefined
            //         }
            //       /> */}
            //     </div>
            //   );
            // }}
          />

          {/* //! react table start from here */}

          {/* <ConfirmationDialogBox
            open={dialogOpen}
            onClose={handleCloseDialog}
            title={DialogTitle}
            content=""
            data={dataToPass}
            onAction={handleDialogAction}
          /> */}
        </Paper>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
      {/* <AddRemarksModal
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
        policyId={selectedPolicyId}
      /> */}
    </>
  );
};
export default GetHealthPolicies;
