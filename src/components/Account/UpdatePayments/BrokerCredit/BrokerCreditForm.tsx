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
import { Field, Form } from "react-final-form";
import { DAY_FORMAT, header } from "../../../../context/constant";
import { setIn } from "final-form";
import * as yup from "yup";
import useGetAccounts from "../../../../Hooks/Account/useGetAccounts";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { IViewPolicy } from "../../../Policy/IPolicy";
import dayjs from "dayjs";
import { ICreditDebitForm } from "../../CreditDebit/ICreditDebits";
import BrokerPaymentPoliciesData from "./BrokerPaymentPoliciesData";
import useGetBrokers from "../../../../Hooks/Broker/useGetBrokers";
import getFilterPoliciesForBrokerService from "../../../../api/UpdatePayment/getFilterPoliciesForBroker/getFilterPoliciesForBrokerService";
import toast, { Toaster } from "react-hot-toast";
export interface addCreditDebitFormProps {
  initialValues: ICreditDebitForm;
}
const BrokerCreditForm = (props: addCreditDebitFormProps) => {
  let { initialValues } = props;
  let [brokers] = useGetBrokers({ header: header });
  const [totalDistributedAmount, settotalDistributedAmount] = useState(0);
  let [accounts] = useGetAccounts({ header: header });
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [distributedDate, setdistributedDate] = useState("");
  const [selectedBrokerId, setSelectedBrokerId] = useState(
    initialValues.brokerId
  );
  const [accountCode, setAccountCode] = useState<string>("");
  const [selectedAccountId, setSelectedAccountId] = useState(
    initialValues.accountId
  );
  const [remarks, setRemarks] = useState("");
  const [motorPolicies, setMotorPolicies] = useState<IViewPolicy[]>([]);
  const [amountInAccount, setAmountInAccount] = useState(0);
  const [brokerBalance, setBrokerBalance] = useState(0);
  const [brokerName, setbrokerName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit = async (creditdebitForm: ICreditDebitForm, form: any) => {
    setIsLoading(true);
    const newStartDate = dayjs(creditdebitForm.startDate).format(DAY_FORMAT);
    const newEndDate = dayjs(creditdebitForm.endDate).format(DAY_FORMAT);
    const distributedDate = dayjs(creditdebitForm.distributedDate).format(
      DAY_FORMAT
    );
    setdistributedDate(distributedDate);
    setRemarks(creditdebitForm.remarks || "");
    creditdebitForm.amount = Number(creditdebitForm.amount!);
    setStartTime(newStartDate);
    setEndTime(newEndDate);
    try {
      const policies = await getFilterPoliciesForBrokerService({
        header,
        startDate: newStartDate,
        endDate: newEndDate,
        brokerId: selectedBrokerId,
      });
      setMotorPolicies(policies.data.payments);
      settotalDistributedAmount(policies.data.totalAmount);
      setBrokerBalance(policies.data.brokerBalance);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
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
    endDate: yup.string().required("End Date is required").nullable(),
    distributedDate: yup
      .string()
      .required("Distributed Date is required")
      .nullable(),
    amount: yup.number().nullable().required("Amount is required"),
  });
  const addValidate = validateFormValues(validationSchema);
  const calculateAmountInAccount = (id: string) => {
    const result = accounts.find((obj) => obj.accountCode === id);
    if (result?.amount === undefined || result.amount <= 0) {
      setAmountInAccount(0);
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
                      <Field name="brokerName">
                        {({ input, meta }) => (
                          <div>
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                id="brokerName"
                                options={brokers || []}
                                value={
                                  brokers.find(
                                    (broker) => broker._id === selectedBrokerId
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
                                    setbrokerName(newValue.brokerName!);
                                    setSelectedBrokerId(newValue._id);
                                  } else {
                                    setbrokerName("");
                                    setSelectedBrokerId("");
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
                                options={accounts}
                                onChange={(event, newValue) => {
                                  if (newValue) {
                                    input.onChange(newValue.accountCode);
                                    calculateAmountInAccount(
                                      newValue.accountCode
                                    );
                                    setSelectedAccountId(newValue._id);
                                    setAccountCode(newValue.accountCode);
                                  }
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
                   
                   
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="startDate">
                        {({ input, meta }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              disableFuture
                              label="Start Date"
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
                   
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="endDate">
                        {({ input, meta }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              disableFuture
                              label="End Date"
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
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="distributedDate">
                        {({ input, meta }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              disableFuture
                              label="Distributed Date"
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
          ) : motorPolicies?.length > 0 ? (
            <BrokerPaymentPoliciesData
              key={Date.now()}
              policies={motorPolicies!}
              totalPaidAmount={totalDistributedAmount}
              brokerBalance={brokerBalance}
              startDate={startTime}
              endDate={endTime}
              brokerId={selectedBrokerId!}
              accountId={selectedAccountId!}
              accountCode={accountCode}
              distributedDate={distributedDate}
              brokerName={brokerName}
              remarks={remarks}
              balanceInAccount={amountInAccount}
            />
          ) : (
            startTime &&
            endTime &&
            selectedBrokerId &&
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
        <Toaster position="bottom-center" reverseOrder={false} />
      </React.Fragment>
    </>
  );
};
export default BrokerCreditForm;
