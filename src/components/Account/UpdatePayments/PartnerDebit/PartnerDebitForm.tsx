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
import useGetPartners from "../../../../Hooks/Partner/useGetPartners";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { IViewPolicy } from "../../../Policy/IPolicy";
import dayjs from "dayjs";
import PartnerPaymentPoliciesData from "./PartnerPaymentPoliciesData";
import getFilterUnpaidPartialServices from "../../../../api/UpdatePayment/getFilterUnpaidPartial/getFilterUnpaidPartialServices";
import { ICreditDebitForm } from "../../CreditDebit/ICreditDebits";
import toast, { Toaster } from "react-hot-toast";
import useGetAccountByRole from "../../../../Hooks/Account/useGetAccountByRole";
export interface addCreditDebitFormProps {
  initialValues: ICreditDebitForm;
}
const PartnerDebitForm = (props: addCreditDebitFormProps) => {
  let { initialValues } = props;

  const [totalDistributedAmount, settotalDistributedAmount] = useState(0);
  let [accounts] = useGetAccountByRole({ header: header, role: "Admin" });
  let [partners] = useGetPartners({ header: header, role: "partner" });
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
  const [remarks, setRemarks] = useState("");
  const [motorPolicies, setMotorPolicies] = useState<IViewPolicy[]>([]);
  const [amountInput, setAmount] = useState(0);
  const [amountInAccount, setAmountInAccount] = useState(0);
  const [partnerBalance, setpartnerBalance] = useState(0);
  const [partnerName, setPartnerName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [flag, setFlag] = useState(false);
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
    setAmount(creditdebitForm.amount!);
    if (amountInAccount <= 0) {
      setIsLoading(false);
      return;
    }
    setStartTime(newStartDate);
    setEndTime(newEndDate);
    try {
      setIsLoading(true)
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
    remarks: yup
      .string()
      .required("Remarks is required")
      .nullable()
      .max(200, "Remarks should not exceed 200 characters"),
  });
  const addValidate = validateFormValues(validationSchema);
  const calculateAmountInAccount = (id: string) => {
    setFlag(false);
    const result = accounts.find((obj) => obj.accountCode === id);
    if (result?.amount === undefined || result.amount <= 0) {
      setAmountInAccount(0);
      setFlag(true);
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
          {flag && (
            <Grid item lg={12} md={12} sm={12} xs={12} mt={2} ml={3}>
              <Typography
                variant="subtitle1"
                gutterBottom
                display="inline"
                align="center"
              >
                <span className="text-red-500">
                  {" "}
                  you have low balance in account
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
                                    : `${option.name} - ${option.userCode}` ||
                                      ""
                                }
                                options={partners}
                                onChange={(event, newValue) => {
                                  if (newValue) {
                                    setPartnerName(newValue.fullName);
                                    setSelectedPartnerId(newValue._id);
                                    input.onChange(newValue.fullName);
                                  } else {
                                    setSelectedPartnerId("");
                                    input.onChange(null);
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
                    {}
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
                    {}
                    {}
                    <Grid item lg={4} md={4} sm={6} xs={12}>
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
                    {}
                    <Grid item lg={4} md={4} sm={6} xs={12}>
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
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="distributedDate">
                        {({ input, meta }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              disableFuture
                              label="Distributed Date"
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
                    {}
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
                  {}
                  <Grid container spacing={2} mt={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      {submitError && (
                        <div className="error text-safekaroDarkOrange">
                          {submitError}
                        </div>
                      )}
                      <Button variant="contained" type="submit" disabled={isLoading}>
                     {isLoading?"Submitting...":"Submit"}   
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
          ) : (
          (  startTime &&
            endTime &&
            selectedPartnerId &&
            selectedAccountId) && (
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
                balanceInAccount={amountInAccount}
              />
            )
          )}
        </Card>
      </React.Fragment>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};
export default PartnerDebitForm;
