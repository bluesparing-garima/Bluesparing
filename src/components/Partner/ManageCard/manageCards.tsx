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
const ManageCards = () => {
  const { partnerId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [partnerCard, setPartnerCard] = useState<ICreditDebits[]>([]);
  const navigate = useNavigate();
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const GetPartnerCard = useCallback(
    (startDate: any, endDate: any) => {
      setIsLoading(true);
      GetCreditDebitByPartnerByDateRangeService({
        header,
        partnerId:
          userData.role.toLowerCase() === "admin"
            ? partnerId
            : userData.profileId,
        startDate,
        endDate,
      })
        .then((partnerCardDetails) => {
          setPartnerCard(partnerCardDetails.data);
          setIsLoading(false);
        })
        .catch(async (error) => {
          setIsLoading(false);
          const err = await error;
          toast.error(err.message);
        });
    },
    // eslint-disable-next-line
    [userData.profileId]
  );
  useEffect(() => {
    const currentDate = new Date();
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    const formattedFirstDay = format(firstDayOfMonth, "yyyy-MM-dd");
    const formattedLastDay = format(lastDayOfMonth, "yyyy-MM-dd");
    GetPartnerCard(formattedFirstDay, formattedLastDay);
  }, [GetPartnerCard]);

  const makeAccountType = (type: string, accountType: string, tds?: number) => {
    const at = accountType.toLowerCase().trim();
    const t = type.toLowerCase().trim();
    if (at === "payin") {
      if (t === "credit") {
        return "Payin-Credit";
      } else {
        return "Payin-Distribution";
      }
    } else if (at === "payout") {
      if (t === "credit") {
        return "Payout-Credit";
      } else {
        return "Payout-Distribution";
      }
    } else {
      return `${accountType}@${tds}%`;
    }
  };
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
        size: 200,
        Cell: ({ row }) => {
          const { type, accountType, tdsPercentage } = row.original;
          const modifiedType = makeAccountType(
            type || "",
            accountType || "",
            tdsPercentage
          );
          return <span>{modifiedType}</span>;
        },
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
        muiTableBodyCellProps: {
          sx: {
            height: "122px",
            overflow: "auto",
            width: "100px",
            display: "flex",
          },
        },
      },
    ],
    []
  );
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
      tdsAmount: partnerCard.tdsAmount,
      tdsPercentage: partnerCard.tdsPercentage,
    }));
  }, [partnerCard]);
  const handleClickViewCreditDebit = (partnerCard: ICreditDebitsVM) => {
    const utcStartDate = new Date(partnerCard.startDate!);
    const formattedStartDate = format(utcStartDate, "yyyy-MM-dd'T'HH:mm:ss");
    partnerCard.startDate = formattedStartDate;
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
    // Ensure both dates are provided
    if (!creditdebitForm.startDate || !creditdebitForm.endDate) {
      toast.error("Both start date and end date are required.")
      // alert("Both start date and end date are required.");
      return;
    }
  
    // Convert input dates to Date objects
    const utcStartDate = new Date(creditdebitForm.startDate);
    const utcEndDate = new Date(creditdebitForm.endDate);
  
    // Validate if dates are valid
    if (isNaN(utcStartDate.getTime()) || isNaN(utcEndDate.getTime())) {
      toast.error("Invalid date selected. Please select valid dates.");
      // alert("Invalid date selected. Please select valid dates.");
      return;
    }
  
    // Ensure endDate is not before startDate
    if (utcEndDate < utcStartDate) {
      toast.error("End date cannot be before start date.")
      // alert("End date cannot be before start date.");
      return;
    }
  
    // Format dates before passing them
    const formattedStartDate = format(utcStartDate, "yyyy-MM-dd'T'HH:mm:ss");
    creditdebitForm.startDate = formattedStartDate;
    // const utcEndDate = new Date(creditdebitForm.endDate!);
    const formattedEndDate = format(utcEndDate, "yyyy-MM-dd'T'HH:mm:ss");
    creditdebitForm.endDate = formattedEndDate;
    GetPartnerCard(creditdebitForm.startDate, creditdebitForm.endDate);
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
    startDate: yup.string().required("Start Date is required").nullable(),
    endDate: yup.string().nullable().required("End Date is required"),
  });
  const validate = validateFormValues(validationSchema);
  return (
    <div className="bg-blue-200 md:p-7 p-2 ">
      <Paper elevation={3} style={{ padding: 30 }}>
        <Typography className="text-safekaroDarkOrange" variant="h5">
          Wallet History Table
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
              <span className="text-grey-600 text-sm">Withdrawals</span>
            </div>
          </div>

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
                  <Grid item lg={3} md={3} sm={6} xs={12}>
                    <Field name="startDate">
                      {({ input, meta }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            disableFuture
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
                            disableFuture
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

        <MaterialReactTable
          state={{ isLoading }}
          columns={columns}
          data={parsedData}
          enableRowActions
          positionActionsColumn="last"
          renderRowActions={({ row }) => (
            <div style={{ display: "flex", flexWrap: "nowrap" }}>
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
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-safekaroDarkOrange"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
export default ManageCards;
