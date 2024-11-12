import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import {
  DAYJS_DISPLAY_FORMAT,
  DAY_FORMAT,
  SafeKaroUser,
  header,
} from "../../../context/constant";
//import dayjs from "dayjs";
import {
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { motorPolicyAddPath, motorPolicyPath } from "../../../sitemap";
import { IAddEditPolicyForm, IPolicy, IPolicyVM } from "../IPolicy";
import dayjs from "dayjs";
import { endOfMonth, format, startOfMonth } from "date-fns";
import CountdownTimer from "../../../utils/CountdownTimer";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Field, Form } from "react-final-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { setIn } from "final-form";
import * as yup from "yup";
import getArchiveMotorPolicyService from "../../../api/Policies/GetArchiveMotorPolicy/getArchiveMotorPolicyService";
import editPolicyService from "../../../api/Policies/EditPolicy/editPolicyService";
import toast, { Toaster } from "react-hot-toast";
import Papa from "papaparse";
const GetArchiveMotorPolicies = () => {
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const [isLoading, setIsLoading] = useState(false);
  const [motorPolicies, setMotorPolicies] = useState<IPolicy[]>([]);
  const navigate = useNavigate();
  const handleClickAddMotorPolicy = () => {
    navigate(motorPolicyAddPath());
  };
  const onSubmit = async (filterForm: any) => {
    const newStartDate = dayjs(filterForm.startDate).format(DAY_FORMAT);
    const newEndDate = dayjs(filterForm.endDate).format(DAY_FORMAT);
    GetPolicies(newStartDate, newEndDate);
  };
  const GetPolicies = useCallback(
    (startDate, endDate) =>
      getArchiveMotorPolicyService({ header, startDate, endDate })
        .then((motorPolicy) => {
          setMotorPolicies(motorPolicy.data);
        })
        .catch(async (error: any) => {
          const err = await error;
          toast.error(err.message);
          console.error("Failed to fetch polices details", error);
        }),
    []
  );

  useEffect(() => {
    const currentDate = new Date(); // Example current date
    // Calculate first day of current month
    const firstDayOfMonth = startOfMonth(currentDate);
    // Calculate last day of current month
    const lastDayOfMonth = endOfMonth(currentDate);
    // Format the dates if needed
    const formattedFirstDay = format(firstDayOfMonth, "yyyy-MM-dd");
    const formattedLastDay = format(lastDayOfMonth, "yyyy-MM-dd");
    if (
      userData.role.toLowerCase() === "admin" ||
      userData.role.toLowerCase() === "account"
    ) {
      GetPolicies(formattedFirstDay, formattedLastDay);
    }
  }, [GetPolicies, userData.role]);

  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<IPolicy>[]>(
    () =>
      [
        {
          header: "Booking Time",
          accessorKey: "bookingTimer",
          visible: userData.role === "admin", // Conditional visibility
          Cell: ({ row }: { row: { original: IPolicy } }) => (
            <CountdownTimer
              registerDate={row.original.updatedOn || row.original.createdOn}
              status={"booked"}
              timer={row.original.bookingTimer!}
            />
          ),
          size: 200,
        },
        {
          accessorKey: "leadTimer", //normal accessorKey
          header: "Lead Time",
          size: 100,
          visible: userData.role === "admin", // Conditional visibility
          Cell: ({ row }: { row: { original: IPolicy } }) => (
            <CountdownTimer
              registerDate={row.original.updatedOn || row.original.createdOn}
              status={"booked"}
              timer={row.original.leadTimer!}
            />
          ),
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
          accessorKey: "caseType", //normal accessorKey
          header: "Case Type",
          size: 100,
        },

        {
          accessorKey: "category", //normal accessorKey
          header: "Category",
          size: 100,
        },
        {
          accessorKey: "productType", //normal accessorKey
          header: "Product",
          size: 100,
        },
        {
          accessorKey: "subCategory", //normal accessorKey
          header: "sub Category",
          size: 100,
        },
        {
          accessorKey: "companyName", //normal accessorKey
          header: "Company Name",
          size: 100,
        },
        {
          accessorKey: "vehicleNumber", //normal accessorKey
          header: "Vehicle Number",
          size: 100,
        },
        {
          accessorKey: "broker", //normal accessorKey
          header: "Broker",
          size: 100,
        },
        {
          accessorKey: "partnerName", //normal accessorKey
          header: "Partner Name",
          size: 100,
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
          header: "cc",
          size: 100,
        },
        {
          accessorKey: "seatingCapacity", //normal accessorKey
          header: "Seating Capacity",
          size: 100,
        },
        {
          accessorKey: "ncb", //normal accessorKey
          header: "ncb",
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
          accessorKey: "issueDate", //normal accessorKey
          header: "Issue Date",
          size: 100,
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
      motorPolicies.map(
        (motorPolicy: IPolicy) =>
          ({
            uuid: motorPolicy.uuid,
            id: motorPolicy._id,
            fullName: motorPolicy.fullName,
            bookingDate: motorPolicy.bookingDate,
            bookingTimer: motorPolicy.bookingTimer,
            leadDate: motorPolicy.leadDate,
            leadTimer: motorPolicy.leadTimer,
            productType: motorPolicy.productType,
            emailId: motorPolicy.emailId,
            weight: motorPolicy.weight,
            broker: motorPolicy.broker,
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
            finalPremium: motorPolicy.finalPremium,
            cc: motorPolicy.cc,
            paymentMode: motorPolicy.paymentMode,
            policyCreatedBy: motorPolicy.policyCreatedBy,
            createdOn: dayjs(motorPolicy.createdOn).format(
              DAYJS_DISPLAY_FORMAT
            ),
            paymentDetails: motorPolicy.paymentDetails,
            policyStatus: motorPolicy.policyStatus,
            partnerId: motorPolicy.partnerId,
            partnerName: motorPolicy.partnerName,
            relationshipManagerName: motorPolicy.relationshipManagerName,
            relationshipManagerId: motorPolicy.relationshipManagerId,
            rcFront: motorPolicy.rcFront,
            rcBack: motorPolicy.rcBack,
            previousPolicy: motorPolicy.previousPolicy,
            survey: motorPolicy.survey,
            puc: motorPolicy.puc,
            fitness: motorPolicy.fitness,
            proposal: motorPolicy.proposal,
            currentPolicy: motorPolicy.currentPolicy,
            other: motorPolicy.other,
          } as unknown as IPolicyVM)
      ) ?? [],
    [motorPolicies]
  );
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
    const rowData = rows.map((row) => row.original);
    const csv = Papa.unparse(rowData, { header: true });
    downloadCsv("exported-rows.csv", csv);
  };
  const handleClickRestorePolicy = async (policy: any) => {
    const formData = new FormData();
    policy.isActive = true;
    Object.keys(policy).forEach((key) => {
      formData.append(key, policy[key as keyof IAddEditPolicyForm]);
    });
    try {
      const newPolicy = await editPolicyService({
        header,
        policy: formData,
        policyId: policy.id!,
      });
      if (newPolicy.status === "success") {
        navigate(motorPolicyPath());
      } else {
        return;
      }
      //navigateToPolicies(`${newPolicy.message}`);
    } catch (err: any) {
      const errorData = await err;
      toast.error(errorData.message);
      return;
    }
  };
  const updateLoading = useCallback(async () => {
    // setIsLoading(true) when motorPolicies.length is 0, and setIsLoading(false) when motorPolicies.length is > 0
    setIsLoading(motorPolicies.length >= 0 ? false : true);
  }, [motorPolicies]);

  useEffect(() => {
    updateLoading();
  }, [updateLoading]);

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
    startDate: yup.string().required("Start Date is required").nullable(),
    endDate: yup.string().nullable().required("End Date is required"),
  });

  const validate = validateFormValues(validationSchema);

  return (
    <>
      <div className="bg-blue-200 md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Archive Motor Policies Table
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
                <span className="text-grey-600 text-sm"> Motor Policies</span>
              </div>
              {userData.role.toLowerCase() === "admin" ||
              userData.role.toLowerCase() === "booking" ? (
                <Button
                  type="button"
                  className="w-26 h-10 bg-addButton text-white p-3 md:text-xs text-[10px] rounded-sm"
                  onClick={handleClickAddMotorPolicy}
        
                >
                  Add Motor Policies
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
              onSubmit={onSubmit}
              // initialValues={initialValues}
              validate={validate}
              render={({ handleSubmit, submitting, errors, values }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    {/* Account Code Selection */}
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                      <Field name="startDate">
                        {({ input, meta }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              disableFuture
                              label="Start Date"
                              value={input.value || null} // Initialize the value if it's undefined
                              onChange={(date) => input.onChange(date)}
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
                        )}
                      </Field>
                    </Grid>
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                      <Field name="endDate">
                        {({ input, meta }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              disableFuture
                              label="End Date"
                              value={input.value || null} // Initialize the value if it's undefined
                              onChange={(date) => input.onChange(date)}
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
                        )}
                      </Field>
                    </Grid>

                    <Grid item lg={3} md={3} sm={6} xs={12}>
                      <Button
                        type="submit"
                        disabled={submitting}
                        variant="contained"
                        color="primary"
                        className=" w-26 h-10 bg-addButton text-white p-3 md:text-xs text-[10px]  rounded-sm"
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
            enableRowActions
            enablePagination
            autoResetPageIndex={false}
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
            // positionActionsColumn="last"
            renderRowActions={({ row }) => (
              <div style={{ display: "flex", flexWrap: "nowrap" }}>
                <Tooltip title={"Restore Policy"}>
                  <IconButton
                    color="primary"
                    aria-label={"Restore Policy"}
                    component="span"
                    onClick={() => {
                      handleClickRestorePolicy(row.original as IPolicyVM);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-5 text-addButton"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  </IconButton>
                </Tooltip>
              </div>
            )}
          />
        </Paper>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </>
  );
};

export default GetArchiveMotorPolicies;
