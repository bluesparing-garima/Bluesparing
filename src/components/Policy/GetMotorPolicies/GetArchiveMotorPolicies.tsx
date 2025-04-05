import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import {
  DAYJS_DISPLAY_FORMAT,
  DAY_FORMAT,
  SafeKaroUser,
  header,
} from "../../../context/constant";
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
import { motorPolicyAddPath } from "../../../sitemap";
import { IPolicy, IPolicyVM } from "../IPolicy";
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
import toast, { Toaster } from "react-hot-toast";
import Papa from "papaparse";
import UpdateStatusService from "../../../api/Policies/UpdateStatus/UpdateStatusService";

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
          if (motorPolicy.status === "success") {
            setMotorPolicies(motorPolicy.data);
          }
        })
        .catch(async (error: any) => {
          const err = await error;
          toast.error(err.message);

        }),
    []
  );
  useEffect(() => {
    const currentDate = new Date();
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    const formattedFirstDay = format(firstDayOfMonth, "yyyy-MM-dd");
    const formattedLastDay = format(lastDayOfMonth, "yyyy-MM-dd");
    if (
      userData.role.toLowerCase() === "admin" ||
      userData.role.toLowerCase() === "account"
    ) {
      GetPolicies(formattedFirstDay, formattedLastDay);
    }
  }, [GetPolicies, userData.role]);
  const columns = useMemo<MRT_ColumnDef<IPolicy>[]>(
    () =>
      [
        {
          header: "Booking Time",
          accessorKey: "bookingTimer",
          visible: userData.role === "admin",
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
          accessorKey: "leadTimer",
          header: "Lead Time",
          size: 100,
          visible: userData.role === "admin",
          Cell: ({ row }: { row: { original: IPolicy } }) => (
            <CountdownTimer
              registerDate={row.original.updatedOn || row.original.createdOn}
              status={"booked"}
              timer={row.original.leadTimer!}
            />
          ),
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
          accessorKey: "productType",
          header: "Product",
          size: 100,
        },
        {
          accessorKey: "subCategory",
          header: "sub Category",
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
          accessorKey: "broker",
          header: "Broker",
          size: 100,
        },
        {
          accessorKey: "partnerName",
          header: "Partner Name",
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
          header: "cc",
          size: 100,
        },
        {
          accessorKey: "seatingCapacity",
          header: "Seating Capacity",
          size: 100,
        },
        {
          accessorKey: "ncb",
          header: "ncb",
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
    const policyId = policy.id;
    const status = true;
    try {
      const res = await UpdateStatusService({ header, policyId, status })
      toast.success(res.message)
    } catch (error: any) {
      const errorData = await error;
      toast.error(errorData.message);
      return;
    }
  };
  const updateLoading = useCallback(async () => {
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
      <div className=" md:p-7 p-2">
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
                  onClick={handleClickAddMotorPolicy}
                  className="btnGradient text-black px-4 py-3 rounded-md w-full sm:w-auto text-[10px] md:text-xs"
                >
                  Add Motor Policies
                </Button>

              ) : (
                ""
              )}
            </div>
            { }
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>
          <React.Fragment>
            <Form
              onSubmit={onSubmit}
              validate={validate}
              render={({ handleSubmit, submitting, errors, values }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    { }
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                      <Field name="startDate">
                        {({ input, meta }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="Start Date"
                              inputFormat="DD/MM/YYYY"
                              value={input.value || null}
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
                              label="End Date"
                              inputFormat="DD/MM/YYYY"
                              value={input.value || null}
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
            state={{ isLoading }}
            columns={columns}
            data={parsedData}
            enableRowActions
            enablePagination
            autoResetPageIndex={false}
            renderTopToolbarCustomActions={({ table }) => (
              <>
                <Button
                  className="btnGradient text-black px-4 py-2 rounded-md w-full sm:w-auto text-[10px] md:text-xs md:m-2"
                  disabled={table.getRowModel().rows.length === 0}
                  onClick={() => handleExportRows(table.getFilteredRowModel().rows)}
                >
                  Export Filter Data
                </Button>

              </>
            )}
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
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-addButton"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
