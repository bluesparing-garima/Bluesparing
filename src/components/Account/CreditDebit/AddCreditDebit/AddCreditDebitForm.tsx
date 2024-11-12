import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import {
  ADD,
  DAY_FORMAT,
  SafeKaroUser,
  header,
} from "../../../../context/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { FORM_ERROR, setIn } from "final-form";
import * as yup from "yup";
import { ICreditDebitForm } from "../ICreditDebits";
import { creditDebitsPath } from "../../../../sitemap";
import editCreditDebitService from "../../../../api/CreditDebit/EditCreditDebit/editCreditDebitService";
import useGetBrokers from "../../../../Hooks/Broker/useGetBrokers";
import useGetAccounts from "../../../../Hooks/Account/useGetAccounts";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useGetEmployees from "../../../../Hooks/Team/useGetEmployes";
import useGetPartners from "../../../../Hooks/Partner/useGetPartners";
import addAccountManageService from "../../../../api/CreditDebit/AddAccountManage/AddAccountManageService";
import dayjs from "dayjs";
import toast, { Toaster } from "react-hot-toast";
export interface addCreditDebitFormProps {
  initialValues: ICreditDebitForm;
}
const AddCreditDebitForm = (props: addCreditDebitFormProps) => {
  let { initialValues } = props;
  const navigate = useNavigate();
  const location = useLocation() as any;
  const pathName = location.pathname.split("/");
  const isAddEdit = pathName[pathName.length - 1] as string;
  const isAdd = isAddEdit === ADD;
  let [partners] = useGetPartners({ header: header, role: "partner" });
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  let [brokers] = useGetBrokers({ header: header });
  let [employees] = useGetEmployees({ header: header });
  let [accounts] = useGetAccounts({ header: header });
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(
    initialValues.employeeId
  );
  const [selectedPartnerId, setSelectedPartnerId] = useState(
    initialValues.partnerId
  );
  const [selectedAccountId, setSelectedAccountId] = useState(
    initialValues.accountId
  );
  const [selectedBrokerId, setSelectedBrokerId] = useState(
    initialValues.brokerId
  );
  const [accountType, setAccountType] = useState(initialValues.accountType);
  useEffect(() => {
    if (!isAdd) {
      setAccountType(initialValues.accountType);
      setSelectedAccountId(initialValues.accountId);
      setSelectedPartnerId(initialValues.partnerId);
      setSelectedBrokerId(initialValues.brokerId);
    }
  }, [isAdd, initialValues]);
  const onSubmit = (creditdebitForm: ICreditDebitForm, form: any) => {
    const newStartDate = dayjs(creditdebitForm.startDate).format(DAY_FORMAT);
    const newEndDate = dayjs(creditdebitForm.endDate).format(DAY_FORMAT);
    const distributedDate = dayjs(creditdebitForm.distributedDate).format(
      DAY_FORMAT
    );
    creditdebitForm.startDate = newStartDate;
    creditdebitForm.endDate = newEndDate;
    creditdebitForm.distributedDate = distributedDate;
    creditdebitForm.partnerId = selectedPartnerId;
    creditdebitForm.brokerId = selectedBrokerId;
    creditdebitForm.accountId = selectedAccountId;
    creditdebitForm.employeeId = selectedEmployeeId;
    creditdebitForm.amount = Number(creditdebitForm.amount!);
    creditdebitForm.createdBy = userData.name;
    if (isAdd) {
      callAddCreditDebitAPI(creditdebitForm);
    } else {
      callEditCreditDebitAPI(creditdebitForm, creditdebitForm.id!);
    }
  };
  const callAddCreditDebitAPI = async (creditDebit: ICreditDebitForm) => {
    try {
      const creditdebitResponse = await addAccountManageService({
        header,
        creditDebit,
      });
      if (creditdebitResponse.status === "success") {
        navigate(creditDebitsPath());
      } else {
        return { [FORM_ERROR]: `error` };
      }
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
      return { [FORM_ERROR]: `error` };
    }
  };
  const callEditCreditDebitAPI = async (
    creditDebit: any,
    creditDebitId: string
  ) => {
    try {
      const creditdebitResponse = await editCreditDebitService({
        header,
        creditDebit,
        creditDebitId,
      });
      if (creditdebitResponse.status === "success") {
        navigate(creditDebitsPath());
      } else {
        return { [FORM_ERROR]: `error` };
      }
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
      return { [FORM_ERROR]: `error` };
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
    accountType: yup.string().required("Account Type is required").nullable(),
    type: yup.string().required("Amount Type is required").nullable(),
    startDate: yup.string().required("Start Date is required").nullable(),
    endDate: yup.string().required("End Date is required").nullable(),
    distributedDate: yup
      .string()
      .required("Distributed Date is required")
      .nullable(),
    amount: yup.number().nullable().required("Amount is required"),
  });
  const addValidate = validateFormValues(validationSchema);
  return (
    <>
      <React.Fragment>
        <Card>
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
                      <Field name="accountType">
                        {({ input, meta }) => (
                          <div>
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                {...input}
                                id="accountType"
                                value={
                                  input.value !== undefined
                                    ? input.value
                                    : initialValues.accountType || null
                                }
                                getOptionLabel={(option) =>
                                  typeof option === "string"
                                    ? option
                                    : option.label || ""
                                }
                                onChange={(event, newValue) => {
                                  input.onChange(
                                    newValue ? newValue.value : null
                                  );
                                  setAccountType(newValue.value);
                                }}
                                options={[
                                  { label: "CutPay", value: "CutPay" },
                                  { label: "Salary", value: "Salary" },
                                  {
                                    label: "Electricity",
                                    value: "Electricity",
                                  },
                                  { label: "Rent", value: "Rent" },
                                  { label: "Other", value: "Other" },
                                ]}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Select Account Type"
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
                      <Field name="type">
                        {({ input, meta }) => (
                          <div>
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                {...input}
                                id="type"
                                value={
                                  input.value !== undefined
                                    ? input.value
                                    : initialValues.type || null
                                }
                                getOptionLabel={(option) =>
                                  typeof option === "string"
                                    ? option
                                    : option.label || ""
                                }
                                onChange={(event, newValue) => {
                                  input.onChange(
                                    newValue ? newValue.value : null
                                  );
                                }}
                                options={
                                  accountType === "PayIn"
                                    ? [{ label: "credit", value: "credit" }]
                                    : accountType === "Salary" ||
                                      accountType === "Electricity" ||
                                      accountType === "Rent"
                                    ? [{ label: "debit", value: "debit" }]
                                    : [
                                        { label: "credit", value: "credit" },
                                        { label: "debit", value: "debit" },
                                      ]
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Select Type"
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
                   
                    {accountType === "PayIn" && (
                      <Grid item lg={4} md={4} sm={6} xs={12}>
                        <Field name="brokerName">
                          {({ input, meta }) => (
                            <div>
                              <FormControl fullWidth size="small">
                                <Autocomplete
                                  {...input}
                                  id="brokerName"
                                  value={
                                    input.value !== undefined
                                      ? input.value
                                      : initialValues.brokerName || null
                                  }
                                  getOptionLabel={(option) =>
                                    typeof option === "string"
                                      ? option
                                      : `${option.brokerName} - ${option.brokerCode}` ||
                                        ""
                                  }
                                  options={brokers}
                                  onChange={(event, newValue) => {
                                    input.onChange(newValue.brokerName);
                                    setSelectedBrokerId(newValue._id);
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label=" Select Broker"
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
                    )}
                   
                    {accountType === "Salary" && (
                      <Grid item lg={4} md={4} sm={6} xs={12}>
                        <Field name="employeeName">
                          {({ input, meta }) => (
                            <div>
                              <FormControl fullWidth size="small">
                                <Autocomplete
                                  {...input}
                                  id="employeeName"
                                  value={
                                    input.value !== undefined
                                      ? input.value
                                      : initialValues.employeeName || null
                                  }
                                  getOptionLabel={(option) =>
                                    typeof option === "string"
                                      ? option
                                      : `${option.fullName} - ${option.partnerId}` ||
                                        ""
                                  }
                                  options={employees}
                                  onChange={(event, newValue) => {
                                    input.onChange(newValue.fullName);
                                    setSelectedEmployeeId(newValue._id!);
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      className="rounded-sm w-full"
                                      size="small"
                                      label="Select Employee"
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
                    )}
                   
                    {accountType === "CutPay" && (
                      <>
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
                                    options={partners}
                                    onChange={(event, newValue) => {
                                      input.onChange(newValue.fullName);
                                      setSelectedPartnerId(newValue._id!);
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
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                          <Field name="policyNumber">
                            {({ input, meta }) => (
                              <TextField
                                {...input}
                                id="policyNumber"
                                size="small"
                                fullWidth
                                label="Enter Policy Number"
                                variant="outlined"
                                error={meta.touched && Boolean(meta.error)}
                                helperText={meta.touched && meta.error}
                                onChange={(e) => {
                                  const value = e.target.value.replace(
                                    /\s/g,
                                    ""
                                  );
                                  input.onChange(value);
                                }}
                              />
                            )}
                          </Field>
                        </Grid>
                      </>
                    )}
                   
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
                                  input.onChange(newValue.accountCode);
                                  setSelectedAccountId(newValue._id);
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
                      <Field name="amount">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            id="amount"
                            size="small"
                            fullWidth
                            type="number"
                            label="Enter Amount"
                            variant="outlined"
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
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
        </Card>
      </React.Fragment>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};
export default AddCreditDebitForm;
