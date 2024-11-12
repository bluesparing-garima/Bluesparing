/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import {
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import {
  DAYJS_DISPLAY_FORMAT,
  header,
  SafeKaroUser,
} from "../../../context/constant";
import { cardHistoryPath } from "../../../sitemap";
import {
  ICreditDebits,
  ICreditDebitsVM,
} from "../../Account/CreditDebit/ICreditDebits";
import GetCreditDebitByPartnerByDateRangeService from "../../../api/CreditDebit/GetCreditDebitByPartnerByDateRange/GetCreditDebitByPartnerByDateRangeService";
import { endOfMonth, format, startOfMonth } from "date-fns";
import React from "react";
import { Field, Form } from "react-final-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as yup from "yup";
import { setIn } from "final-form";
import toast, { Toaster } from "react-hot-toast";
const manageCards = () => {
  // State and hooks initialization
  const { partnerId } = useParams();
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [partnerCard, setPartnerCard] = useState<ICreditDebits[]>([]); // State for all credit debits
  const navigate = useNavigate(); // React Router's navigation hook
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  // Function to fetch credit debits from API
  const GetPartnerCard = useCallback(
    (startDate: any, endDate: any) => {
      setIsLoading(true); // Set loading state to true
      GetCreditDebitByPartnerByDateRangeService({
        header,
        partnerId:
          userData.role.toLowerCase() === "admin"
            ? partnerId
            : userData.partnerId,
        startDate,
        endDate,
      }) // Call API to fetch credit debits
        .then((partnerCardDetails) => {
          // On successful API call
          setPartnerCard(partnerCardDetails.data); // Set all credit debits
          setIsLoading(false); // Set loading state to false
        })
        .catch(async (error) => {
          setIsLoading(false); // Set loading state to false
          const err = await error;
          toast.error(err.message);
        });
    },
    [userData.partnerId]
  );

  // Call GetPartnerCard on component mount
  useEffect(() => {
    const currentDate = new Date(); // Example current date

    // Calculate first day of current month
    const firstDayOfMonth = startOfMonth(currentDate);

    // Calculate last day of current month
    const lastDayOfMonth = endOfMonth(currentDate);
    // Format the dates if needed
    const formattedFirstDay = format(firstDayOfMonth, "yyyy-MM-dd");
    const formattedLastDay = format(lastDayOfMonth, "yyyy-MM-dd");

    GetPartnerCard(formattedFirstDay, formattedLastDay);
  }, [GetPartnerCard]);

  // Define columns for MaterialReactTable using useMemo for optimization
  const columns = useMemo<MRT_ColumnDef<ICreditDebits>[]>(
    () => [
      {
        accessorKey: "transactionCode",
        header: "Transactions Code",
        size: 200,
      },
      {
        accessorKey: "accountType",
        header: "Particular",
        size: 100,
      },
      {
        accessorKey: "credit",
        header: "Credit",
        size: 100,
      },
      {
        accessorKey: "debit",
        header: "Debit",
        size: 100,
      },
      {
        accessorKey: "partnerBalance",
        header: "Balance",
        size: 50,
      },
      {
        header: "Date",
        accessorKey: "distributedDate",
        size: 200,
      },
      {
        accessorKey: "remarks",
        header: "Remarks",
        size: 200,
      },
    ],
    []
  );

  // Transform partnerCard data for rendering using useMemo for optimization
  const parsedData = useMemo<ICreditDebitsVM[]>(() => {
    return partnerCard.map((partnerCard: ICreditDebits) => ({
      id: partnerCard._id,
      accountType: partnerCard.accountType,
      type: partnerCard.type,
      partnerId: partnerCard.partnerId,
      partnerBalance: partnerCard.partnerBalance!,
      credit: partnerCard.credit,
      debit: partnerCard.debit,
      remarks: partnerCard.remarks,
      transactionCode: partnerCard.transactionCode,
      accountCode: partnerCard.accountCode,
      startDate: dayjs(partnerCard.startDate).format(DAYJS_DISPLAY_FORMAT),
      endDate: dayjs(partnerCard.endDate).format(DAYJS_DISPLAY_FORMAT),
      distributedDate: dayjs(partnerCard.distributedDate).format(
        DAYJS_DISPLAY_FORMAT
      ),
      isActive: partnerCard.isActive,
    }));
  }, [partnerCard]);

  // Navigate to edit page for a specific partnerCard
  const handleClickViewCreditDebit = (partnerCard: ICreditDebitsVM) => {
    const utcStartDate = new Date(partnerCard.startDate!);
    // Format the date
    const formattedStartDate = format(utcStartDate, "yyyy-MM-dd'T'HH:mm:ss");
    partnerCard.startDate = formattedStartDate;
    // Create a Date object from the UTC date string
    const utcEndDate = new Date(partnerCard.endDate!);
    const formattedEndDate = format(utcEndDate, "yyyy-MM-dd'T'HH:mm:ss");
    partnerCard.endDate = formattedEndDate;
    navigate(
      cardHistoryPath(
        partnerCard.transactionCode!,
        partnerCard.startDate!,
        partnerCard.endDate!,
        partnerCard.partnerId!
      )
    );
  };
  const onSubmit = async (creditdebitForm: any) => {
    const utcStartDate = new Date(creditdebitForm.startDate!);
    // Format the date
    const formattedStartDate = format(utcStartDate, "yyyy-MM-dd'T'HH:mm:ss");
    creditdebitForm.startDate = formattedStartDate;
    // Create a Date object from the UTC date string
    const utcEndDate = new Date(creditdebitForm.endDate!);
    const formattedEndDate = format(utcEndDate, "yyyy-MM-dd'T'HH:mm:ss");
    creditdebitForm.endDate = formattedEndDate;
    GetPartnerCard(creditdebitForm.startDate, creditdebitForm.endDate);
  };
  // JSX rendering
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
    <div className="bg-blue-200 md:p-7 p-2 ">
      <Paper elevation={3} style={{ padding: 30 }}>
        {/* Title */}
        <Typography className="text-safekaroDarkOrange" variant="h5">
          Wallet History Table
        </Typography>
        {/* Breadcrumb and add button */}
        <Typography variant="h5" mb={2}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <Link
                to="/dashboard"
                className="text-addButton font-bold text-sm"
              >
                Dashboard /
              </Link>
              <span className="text-grey-600 text-sm">Withdrawals</span>
            </div>
          </div>
          {/* Divider */}
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
                      className=" w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                    >
                      {"Get Records"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          />
        </React.Fragment>

        {/* MaterialReactTable component */}
        <MaterialReactTable
          state={{ isLoading }} // Loading state
          columns={columns} // Columns configuration
          data={parsedData} // Data to be displayed
          enableRowActions // Enable row actions (like edit)
          positionActionsColumn="last" // Position of row actions column
          renderRowActions={({ row }) => (
            <div style={{ display: "flex", flexWrap: "nowrap" }}>
              {/* View IconButton */}
              {row.original.credit ? (
                <Tooltip title="View Wallet History">
                  <IconButton
                    color="primary"
                    aria-label="View Wallet History"
                    component="span"
                    onClick={() => {
                      handleClickViewCreditDebit(
                        row.original as ICreditDebitsVM
                      );
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6 text-safekaroDarkOrange"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </IconButton>
                </Tooltip>
              ) : (
                ""
              )}
            </div>
          )}
        />
      </Paper>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default manageCards;
