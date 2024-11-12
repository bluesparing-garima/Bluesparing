import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import {
  DAY_FORMAT,
  DAYJS_DISPLAY_FORMAT,
  header,
  SafeKaroUser,
} from "../../../context/constant";
import { IPolicyPayment } from "../../Policy/IPolicy";
import { Field, Form } from "react-final-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { setIn } from "final-form";
import * as yup from "yup";
import TransactionHistoryService from "../../../api/Partner/TransactionHistory/TransactionHistoryService";
import DebitHistoryService from "../../../api/Partner/DebitHistory/DebitHistoryService";
import toast, { Toaster } from "react-hot-toast";

const ViewCardHistory = () => {
  const { partnerId } = useParams();
  const { transactionCode } = useParams();
  const { startDate } = useParams();
  const { endDate } = useParams();
  // State and hooks initialization
  const [policyStartDate, setStartDate] = useState<any>(); // Loading state
  const [policyEndDate, setEndDate] = useState<any>(); // Loading state
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [partnerHistoryCard, setPartnerHistoryCard] = useState<
    IPolicyPayment[]
  >([]); // State for all credit debits
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;

  // Function to fetch credit debits from API
  const GetPartnerHistoryCard = useCallback((transactionCode, partnerId) => {
    setIsLoading(true); // Set loading state to true
    TransactionHistoryService({
      header,
      transactionCode: transactionCode,
      partnerId: partnerId,
    }) // Call API to fetch credit debits
      .then((partnerHistoryCardDetails) => {
        // On successful API call
        setPartnerHistoryCard(partnerHistoryCardDetails.data); // Set all credit debits
        setIsLoading(false); // Set loading state to false
      })
      .catch(async(error) => {
        setIsLoading(false); // Set loading state to false
        const err = await error
        toast.error(err.message)
      });
  }, []);

  // Call GetPartnerHistoryCard on component mount
  useEffect(() => {
    if (partnerId) {
      setStartDate(startDate!);
      setEndDate(endDate!);
      GetPartnerHistoryCard(transactionCode, partnerId);
    } else {
    }
  }, [partnerId, startDate, endDate, transactionCode, GetPartnerHistoryCard]);

  // Define columns for MaterialReactTable using useMemo for optimization
  const columns = useMemo<MRT_ColumnDef<IPolicyPayment>[]>(
    () => [
      {
        accessorKey: "policyNumber", //normal accessorKey
        header: "Policy Number",
        size: 100,
      },
      {
        accessorKey: "payOutCommission", //normal accessorKey
        header: "Total Commission",
        size: 100,
      },
      {
        accessorKey: "payOutAmount", //normal accessorKey
        header: "Paid Amount",
        size: 100,
      },
      {
        accessorKey: "payOutBalance", //normal accessorKey
        header: "Balance",
        size: 100,
      },
      {
        accessorKey: "policyDate", //normal accessorKey
        header: "Policy Date",
        size: 100,
      },
      {
        accessorKey: "paymentUpdatedOn", //normal accessorKey
        header: "Payment Date",
        size: 100,
      },
      {
        accessorKey: "remarks",
        header: "Remarks",
        size: 200,
      },
    ],
    []
  );

  const parsedData = useMemo(
    () =>
      partnerHistoryCard.map(
        (motorPolicy: IPolicyPayment) =>
          ({
            policyNumber: motorPolicy.policyNumber,
            od: motorPolicy.od?.toLocaleString(),
            tp: motorPolicy.tp?.toLocaleString(),
            netPremium: motorPolicy.netPremium?.toLocaleString(),
            finalPremium: motorPolicy.finalPremium?.toLocaleString(),
            payOutCommission: motorPolicy.payOutCommission,
            payOutAmount: motorPolicy.payOutAmount,
            payOutPaymentStatus: motorPolicy.payOutPaymentStatus,
            payOutBalance: motorPolicy.payOutBalance,
            remarks: motorPolicy.remarks,
            paymentUpdatedOn: dayjs(motorPolicy.paymentUpdatedOn).format(
              DAYJS_DISPLAY_FORMAT
            ),
            policyDate: dayjs(motorPolicy.policyDate).format(
              DAYJS_DISPLAY_FORMAT
            ),
            // documents: motorPolicy.documents,
            // forceUpdate: forcedRenderCount,
          } as unknown as IPolicyPayment)
      ) ?? [],
    [partnerHistoryCard]
  );

  // Event handlers for filtering partnerHistoryCard

  const handleClickDebit = () => {
    const newStartDate = dayjs(policyStartDate).format(DAY_FORMAT);
    const newEndDate = dayjs(policyEndDate).format(DAY_FORMAT);
    setPartnerHistoryCard([]);
    DebitHistoryService({
      header,
      startDate: newStartDate,
      endDate: newEndDate,
      partnerId: userData.partnerId!,
    }) // Call API to fetch credit debits
      .then((partnerHistoryCardDetails) => {
        // On successful API call
        setPartnerHistoryCard(partnerHistoryCardDetails.data); // Set all credit debits
        setIsLoading(false); // Set loading state to false
      })
      .catch(async(error) => {
       
        setIsLoading(false); // Set loading state to false
        const err = await error
        toast.error(err.message)
      });
    // GetPartnerHistoryCard(transactionCode, userData.partnerId);
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

  const onSubmit = async () => {};
  // JSX rendering
  return (
    <div className="bg-blue-200 md:p-7 p-2">
      <Paper elevation={3} style={{ padding: 30 }}>
        {/* Title */}
        <Typography className="text-safekaroDarkOrange" variant="h5">
          Account History Table
        </Typography>
        {/* Breadcrumb and add button */}
        <Typography variant="h5" mb={2}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <Link
                to="/dashboard"
                className="text-addButton font-bold text-sm"
              >
                Dashboard {"/ "}
              </Link>
              <Link
                to="/partnerdashboard/withdrawal"
                className="text-addButton font-bold text-sm"
              >
                History /
              </Link>
              <span className="text-grey-600 text-sm"> Account History</span>
            </div>
          </div>
          {/* Divider */}
          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
        </Typography>

        <Form
          onSubmit={onSubmit}
          // initialValues={initialValues}
          validate={validate}
          render={({ handleSubmit, submitting, errors, values }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <Field name="startDate">
                    {({ input, meta }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          disableFuture
                          label="Start Date"
                          value={input.value || null} // Initialize the value if it's undefined
                          onChange={(date) => {
                            input.onChange(date);
                            setStartDate(date);
                          }}
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
                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <Field name="endDate">
                    {({ input, meta }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          disableFuture
                          label="End Date"
                          value={input.value || null} // Initialize the value if it's undefined
                          onChange={(date) => {
                            input.onChange(date);
                            setEndDate(date);
                          }}
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
                {/* Buttons for filtering partnerHistoryCard */}
                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    className="ml-4 w-26 h-10 bg-safekaroDarkOrange text-white p-3 text-xs rounded-sm"
                    onClick={handleClickDebit}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        />
        {/* MaterialReactTable component */}
        <MaterialReactTable
          state={{ isLoading }} // Loading state
          columns={columns} // Columns configuration
          data={parsedData} // Data to be displayed
        />
      </Paper>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default ViewCardHistory;
