import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { DAYJS_DISPLAY_FORMAT, header } from "../../../context/constant";
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
import useGetPartners from "../../../Hooks/Partner/useGetPartners";
const PartnerWallet = () => {
  const [isLoading, setIsLoading] = useState(false);
  let [partners] = useGetPartners({ header: header, role: "partner" });
  const [partnerCard, setPartnerCard] = useState<ICreditDebits[]>([]);
  const [selectedPartnerId, setSelectedPartnerId] = useState("");
  const navigate = useNavigate();
  const GetPartnerCard = useCallback(
    (startDate: any, endDate: any) => {
      setIsLoading(true);
      setPartnerCard([]);
      GetCreditDebitByPartnerByDateRangeService({
        header,
        partnerId: selectedPartnerId,
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
    [selectedPartnerId]
  );
  const makeAccountType = (type: string, accountType: string, tds?: number) => {
    const at = accountType.toLowerCase().trim();
    const t = type.toLowerCase().trim();
    if (at === "payin") {
      if (t === "credit") {
        return "Payin-Distribution";
      } else {
        return "Payin-Withdrawal";
      }
    } else if (at === "payout") {
      if (t === "credit") {
        return "Payout-Distribution";
      } else {
        return "Payout-Withdrawal";
      }
    } else {
      return `${accountType}@${tds}%`;
    }
  };
  useEffect(() => {
    if (selectedPartnerId) {
      const currentDate = new Date();
      const firstDayOfMonth = startOfMonth(currentDate);
      const lastDayOfMonth = endOfMonth(currentDate);
      const formattedFirstDay = format(firstDayOfMonth, "yyyy-MM-dd");
      const formattedLastDay = format(lastDayOfMonth, "yyyy-MM-dd");
      GetPartnerCard(formattedFirstDay, formattedLastDay);
    }
    // eslint-disable-next-line
  }, [selectedPartnerId]);
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
      tdsPercentage: partnerCard.tdsPercentage || 0,
    }));
  }, [partnerCard]);
  const handleClickViewCreditDebit = (row: ICreditDebitsVM) => {
    const payload = {
      partnerId: row.partnerId,
      transactionCode: row.transactionCode,
      remarks: row.remarks,
    };
    navigate("/wallet/payout-transaction", { state: payload });
  };
  const onSubmit = async (creditdebitForm: any) => {
    const utcStartDate = new Date(creditdebitForm.startDate!);
    const formattedStartDate = format(utcStartDate, "yyyy-MM-dd'T'HH:mm:ss");
    creditdebitForm.startDate = formattedStartDate;
    const utcEndDate = new Date(creditdebitForm.endDate!);
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
    <div className="md:p-7 p-2 ">
      <Paper elevation={3} style={{ padding: 30 }}>
        { }
        <Typography className="text-safekaroDarkOrange" variant="h5">
          Partner Wallet History Table
        </Typography>
        { }
        <Typography variant="h5" mb={2}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <Link
                to="/dashboard"
                className="text-addButton font-bold text-sm"
              >
                Dashboard
              </Link>
            </div>
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
                <Grid container spacing={2} marginBottom={2}>
                  <Grid item lg={3} md={3} sm={6} xs={12}>
                    <Field name="partnerName">
                      {({ input, meta }) => (
                        <div>
                          <FormControl fullWidth size="small">
                            <Autocomplete
                              {...input}
                              id="partnerName"
                              value={
                                input.value !== undefined ? input.value : null
                              }
                              getOptionLabel={(option) =>
                                typeof option === "string"
                                  ? option
                                  : `${option.name} - ${option.userCode}` ||
                                  ""
                              }
                              options={partners}
                              onChange={(event, newValue) => {
                                if (newValue) {
                                  input.onChange(newValue.fullName);
                                  setSelectedPartnerId(newValue._id);
                                } else {
                                  input.onChange(null);
                                  setSelectedPartnerId("");
                                }
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  className="rounded-sm w-full"
                                  size="small"
                                  label="Select Partners"
                                  variant="outlined"
                                  error={meta.touched && !!meta.error}
                                  helperText={meta.touched && meta.error}
                                />
                              )}
                            />
                          </FormControl>
                        </div>
                      )}
                    </Field>
                  </Grid>
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
                      disabled={isLoading}
                      className="btnGradient text-black px-4 py-3 rounded-md w-full sm:w-auto text-[10px] md:text-xs"
                    >
                      {isLoading ? "Getting..." : "Get Records"}
                    </Button>

                  </Grid>
                </Grid>
              </form>
            )}
          />
        </React.Fragment>
        { }
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
          positionActionsColumn="last"
          renderRowActions={({ row }) => (
            <div style={{ display: "flex", flexWrap: "nowrap" }}>
              { }
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

export default PartnerWallet;
