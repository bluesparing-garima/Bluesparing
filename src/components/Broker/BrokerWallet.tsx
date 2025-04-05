import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import {
  ICreditDebits,
  ICreditDebitsVM,
} from "../Account/CreditDebit/ICreditDebits";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DAY_FORMAT,
  DAYJS_DISPLAY_FORMAT,
  header,
  SafeKaroUser,
} from "../../context/constant";
import toast, { Toaster } from "react-hot-toast";
import GetCreditDebitByBrokerByDateRangeService from "../../api/CreditDebit/GetCreditDebitByBrokerByDateRange/GetCreditDebitByBrokerByDateRangeService";
import { GetCreditDebitByBrokerProps } from "../../api/CreditDebit/getCreditDebitTypes";
import dayjs from "dayjs";
import useGetBrokers from "../../Hooks/Broker/useGetBrokers";
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
import { Field, Form } from "react-final-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as yup from "yup";
import { setIn } from "final-form";
const BrokerWallet = () => {
  const [brokerCard, setBrokerCard] = useState<ICreditDebits[]>([]);
  const [selectedBroker, setSelectedBroker] = useState("");
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  let [brokers] = useGetBrokers({ header: header });

  const fetchData = async (startDate: string, endDate: string) => {
    try {
      setIsLoading(true);
      const payload: GetCreditDebitByBrokerProps = {
        header,
        startDate,
        endDate,
        brokerId: selectedBroker,
      };
      const res = await GetCreditDebitByBrokerByDateRangeService(payload);
      setBrokerCard(res.data);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message || "error occurred in fetching broker wallet ");
    } finally {
      setIsLoading(false);
    }
  };
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
        accessorKey: "brokerBalance",
        header: "Balance",
        size: 50,
      },
      {
        header: "Date",
        accessorKey: "distributedDate",
        size: 200,
        Cell: ({ cell }) => {
          const startDate = cell.getValue<string | Date | null>();
          return startDate
            ? dayjs(startDate).format(DAYJS_DISPLAY_FORMAT)
            : "-";
        },
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
  const validationSchema = yup.object().shape({});
  const validate = validateFormValues(validationSchema);
  const handleClickViewCreditDebit = (row: ICreditDebitsVM) => {
    const payload = {
      brokerId: row.brokerId,
      transactionCode: row.transactionCode,
      remarks: row.remarks,
    };
    navigate("/wallet/payin-transaction", { state: payload });
  };
  useEffect(() => {
    const startOfMonth = dayjs().startOf("month").format(DAY_FORMAT);
    const endOfMonth = dayjs().endOf("month").format(DAY_FORMAT);
    if (selectedBroker) {
      fetchData(startOfMonth, endOfMonth);
    }
    // eslint-disable-next-line
  }, [selectedBroker]);
  const onSubmit = async (data: any) => {
    let startDate;
    let endDate;
    if (!data.startDate) {
      startDate = dayjs().startOf("month").format(DAY_FORMAT);
      endDate = dayjs().endOf("month").format(DAY_FORMAT);
    } else {
      startDate = dayjs(data.startDate).format(DAY_FORMAT);
      endDate = dayjs(data.endDate).format(DAY_FORMAT);
    }
    fetchData(startDate, endDate);
  };
  return (
    <div className="md:p-7 p-2 ">
      <Paper elevation={3} style={{ padding: 30 }}>
        { }
        <Typography className="text-safekaroDarkOrange" variant="h5">
          Broker Wallet History Table
        </Typography>
        { }
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
                    <Field name="brokerName">
                      {({ input, meta }) => (
                        <div>
                          <FormControl fullWidth size="small">
                            <Autocomplete
                              id="brokerName"
                              options={brokers || []}
                              value={
                                brokers.find(
                                  (broker) => broker._id === selectedBroker
                                ) || null
                              }
                              getOptionLabel={(option) =>
                                typeof option === "string"
                                  ? option
                                  : `${option.brokerName} - ${option.brokerCode}` ||
                                  ""
                              }
                              onChange={(event, newValue) => {
                                if (newValue) {
                                  setSelectedBroker(newValue._id || "");
                                } else {
                                  setSelectedBroker("");
                                }
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Select Broker"
                                  variant="outlined"
                                  size="small"
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
                      disabled={submitting}
                      className="btnGradient text-black px-4 py-3 rounded-md w-full sm:w-auto text-[10px] md:text-xs"
                    >
                      Get Records
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
          data={brokerCard}
          enableRowActions
          positionActionsColumn="last"
          renderRowActions={({ row }) => (
            <div style={{ display: "flex", flexWrap: "nowrap" }}>
              { }
              {row.original.debit ? (
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

export default BrokerWallet;
