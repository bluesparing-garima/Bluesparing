import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Field, Form } from "react-final-form"; // Using react-final-form for managing form state
import { DAY_FORMAT, header } from "../../../../context/constant"; // Constants and enums
// Hooks for navigation and location
import { setIn } from "final-form"; // final-form utilities
import * as yup from "yup"; // yup for form validation
// API service for editing credit/debit
import useGetPartners from "../../../../Hooks/Partner/useGetPartners"; // Custom hook for fetching partners
// Custom hook for fetching brokers
import useGetAccounts from "../../../../Hooks/Account/useGetAccounts"; // Custom hook for fetching accounts
import { LocalizationProvider } from "@mui/x-date-pickers"; // Localization provider for date pickers
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Adapter for dayjs in date picker
import { DatePicker } from "@mui/x-date-pickers/DatePicker"; // Date picker component
import { IViewPolicy } from "../../../Policy/IPolicy";
import dayjs from "dayjs";
import PartnerPaymentPoliciesData from "./PartnerPaymentPoliciesData";
import getFilterUnpaidPartialServices from "../../../../api/UpdatePayment/getFilterUnpaidPartial/getFilterUnpaidPartialServices";
import { ICreditDebitForm } from "../../CreditDebit/ICreditDebits";
import toast, { Toaster } from "react-hot-toast";

export interface addCreditDebitFormProps {
  initialValues: ICreditDebitForm; // Interface for initial form values
}

const PartnerDebitForm = (props: addCreditDebitFormProps) => {
  let { initialValues } = props; // Destructure initial values from props

  let [partners] = useGetPartners({ header: header, role: "partner" }); // Fetch partners using custom hook
  const [totalDistributedAmount, settotalDistributedAmount] = useState(0);
  let [accounts] = useGetAccounts({ header: header }); // Fetch accounts using custom hook
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [distributedDate, setdistributedDate] = useState("");
  const [selectedPartnerId, setSelectedPartnerId] = useState(
    initialValues.partnerId
  );
  const [accountCode, setAccountCode] = useState<string>("");
  const [selectedAccountId, setSelectedAccountId] = useState(
    initialValues.accountId
  );
  const [remarks,setRemarks] = useState('')
  const [motorPolicies, setMotorPolicies] = useState<IViewPolicy[]>([]);
  const [amountInput, setAmount] = useState(0);
  const [amountInAccount, setAmountInAccount] = useState(0);
  const [partnerBalance, setpartnerBalance] = useState(0);
  const [partnerName, setPartnerName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [flag,setFlag ] = useState(false)
  // Form submission handler
  const onSubmit = async (creditdebitForm: ICreditDebitForm, form: any) => {
    setIsLoading(true);
    const newStartDate = dayjs(creditdebitForm.startDate).format(DAY_FORMAT);
    const newEndDate = dayjs(creditdebitForm.endDate).format(DAY_FORMAT);
    const distributedDate = dayjs(creditdebitForm.distributedDate).format(
      DAY_FORMAT
    );
    setdistributedDate(distributedDate);
    setRemarks(creditdebitForm.remarks ||"")
    creditdebitForm.amount = Number(creditdebitForm.amount!);
    setAmount(creditdebitForm.amount!);
    if (amountInAccount <= 0) {
      setIsLoading(false);
     
      return;
    }
    setStartTime(newStartDate);
    setEndTime(newEndDate);

    try {
      const policies = await getFilterUnpaidPartialServices({
        header,
        startDate: newStartDate,
        endDate: newEndDate,
        partnerId: selectedPartnerId,
      });
      setMotorPolicies(policies.data.payments);
      settotalDistributedAmount(policies.data.totalAmount);
      setpartnerBalance(policies.data.partnerBalance);
    } catch (error: any) {
      const err = await error
     toast.error(err.message)
    } finally {
      setIsLoading(false);
    }
  };

  // Validation function for form values
  const validateFormValues = (schema: any) => async (values: any) => {
    if (typeof schema === "function") {
      schema = schema(); // Ensure schema is a function
    }
    try {
      await schema.validate(values, { abortEarly: false }); // Validate values against schema
    } catch (err: any) {
      // Handle validation errors
      const errors = err.inner.reduce((formError: any, innerError: any) => {
        return setIn(formError, innerError.path, innerError.message);
      }, {});
      return errors; // Return validation errors
    }
  };

  // Schema for form validation using yup
  const validationSchema = yup.object().shape({
    startDate: yup.string().required("Start Date is required").nullable(),
    endDate: yup.string().required("End Date is required").nullable(),
    distributedDate: yup
      .string()
      .required("Distributed Date is required")
      .nullable(),
    amount: yup.number().nullable().required("Amount is required"),
  });

  const addValidate = validateFormValues(validationSchema); // Validate function for adding

  const calculateAmountInAccount = (id: string) => {
    setFlag(false)
    const result = accounts.find((obj) => obj.accountCode === id);

    if (result?.amount === undefined || result.amount <= 0) {
      setAmountInAccount(0);
      setFlag(true)
    } else {
      setAmountInAccount(result.amount);
    }
  };

  return (
    <>
      <React.Fragment>
        <Card>
          {amountInAccount > 0 && (
            <Grid item lg={12} md={12} sm={12} xs={12} mt={2} ml={3}>
              <Typography
                variant="subtitle1"
                gutterBottom
                display="inline"
                align="center"
              >
                Total Amount in Account:{" "}
                <span className="text-safekaroDarkOrange">
                  {amountInAccount}
                </span>
              </Typography>
            </Grid>
          )}
          {
            flag &&   <Grid item lg={12} md={12} sm={12} xs={12} mt={2} ml={3}>
            <Typography
              variant="subtitle1"
              gutterBottom
              display="inline"
              align="center"
            >
              <span className="text-red-500">   you have low balance in account</span>
           
             
            </Typography>
          </Grid>
          }
          <CardContent>
            <Form
              mt={3}
              onSubmit={onSubmit}
              initialValues={initialValues}
              validate={addValidate}
              render={({ handleSubmit, submitError, submitting }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="partnerName">
                        {({ input, meta }) => (
                          <div>
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                {...input}
                                id="partnerName"
                                value={
                                  input.value !== undefined
                                    ? input.value
                                    : initialValues.partnerName || null
                                }
                                getOptionLabel={(option) =>
                                  typeof option === "string"
                                    ? option
                                    : `${option.fullName} - ${option.partnerId}` ||
                                      ""
                                }
                                options={partners} // Replace with your options array
                                onChange={(event, newValue) => {
                                  if (newValue) {
                                    input.onChange(newValue.fullName);
                                    setPartnerName(newValue.fullName);
                                    setSelectedPartnerId(newValue._id); // Set selected partner ID
                                  } else {
                                    input.onChange(null);
                                    setSelectedPartnerId(""); // Reset partner ID when no value is selected
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

                    {/* Account Code Selection */}
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="accountCode">
                        {({ input, meta }) => (
                          <div>
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                {...input}
                                id="accountCode"
                                value={
                                  input.value !== undefined
                                    ? input.value
                                    : initialValues.accountCode || null
                                }
                                getOptionLabel={(option) =>
                                  typeof option === "string"
                                    ? option
                                    : option.accountCode || ""
                                }
                                options={accounts} // Replace with your options array
                                onChange={(event, newValue) => {
                                  if (newValue) {
                                    input.onChange(newValue.accountCode);
                                    calculateAmountInAccount(
                                      newValue.accountCode
                                    );
                                    setSelectedAccountId(newValue._id);
                                    setAccountCode(newValue.accountCode);
                                  }
                                  // Set selected account ID
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label=" Select Account Details"
                                    className="rounded-sm w-full"
                                    size="small"
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

                    {/* Amount Input */}

                    {/* Start Date Picker */}
                    <Grid item lg={4} md={4} sm={6} xs={12}>
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

                    {/* End Date Picker */}
                    <Grid item lg={4} md={4} sm={6} xs={12}>
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
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="distributedDate">
                        {({ input, meta }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              disableFuture
                              label="Distributed Date"
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
                    {/* Remarks Input */}
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Field name="remarks">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            id="remarks"
                            size="small"
                            multiline
                            rows={4}
                            fullWidth
                            label="Enter Remarks"
                            variant="outlined"
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
                    </Grid>
                  </Grid>

                  {/* Submit Button and Error Handling */}
                  <Grid container spacing={2} mt={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      {submitError && (
                        <div className="error text-safekaroDarkOrange">
                          {submitError}
                        </div>
                      )}
                      <Button variant="contained" type="submit">
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          </CardContent>
          {isLoading ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : motorPolicies.length > 0 ? (
            <PartnerPaymentPoliciesData
              key={Date.now()}
              policies={motorPolicies!}
              totalPaidAmount={totalDistributedAmount}
              partnerBalance={partnerBalance}
              startDate={startTime}
              endDate={endTime}
              partnerId={selectedPartnerId!}
              accountId={selectedAccountId!}
              accountCode={accountCode}
              distributedDate={distributedDate}
              partnerName={partnerName}
              remarks={remarks}
              balanceInAccount ={amountInAccount}
            />
          ) : (
            startTime &&
            endTime &&
            selectedPartnerId &&
            selectedAccountId && (
              <Paper elevation={3} style={{ padding: 30 }}>
                <Grid item lg={12} md={12} sm={12} xs={12} mt={2} ml={3}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    display="inline"
                    align="center"
                  >
                    No Data found
                  </Typography>
                </Grid>
              </Paper>
            )
          )}
        </Card>

      </React.Fragment>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default PartnerDebitForm;
