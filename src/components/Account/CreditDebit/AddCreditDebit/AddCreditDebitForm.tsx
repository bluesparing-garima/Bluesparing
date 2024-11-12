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
import { Field, Form } from "react-final-form"; // Using react-final-form for managing form state
import {
  ADD,
  DAY_FORMAT,
  SafeKaroUser,
  header,
} from "../../../../context/constant"; // Constants and enums
import { useLocation, useNavigate } from "react-router-dom"; // Hooks for navigation and location
import { FORM_ERROR, setIn } from "final-form"; // final-form utilities
import * as yup from "yup"; // yup for form validation
import { ICreditDebitForm } from "../ICreditDebits"; // Interface for credit/debit form
import { creditDebitsPath } from "../../../../sitemap"; // Path for credit/debits
import editCreditDebitService from "../../../../api/CreditDebit/EditCreditDebit/editCreditDebitService"; // API service for editing credit/debit
import useGetBrokers from "../../../../Hooks/Broker/useGetBrokers"; // Custom hook for fetching brokers
import useGetAccounts from "../../../../Hooks/Account/useGetAccounts"; // Custom hook for fetching accounts
import { LocalizationProvider } from "@mui/x-date-pickers"; // Localization provider for date pickers
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Adapter for dayjs in date picker
import { DatePicker } from "@mui/x-date-pickers/DatePicker"; // Date picker component
import useGetEmployees from "../../../../Hooks/Team/useGetEmployes"; // Custom hook for fetching employees
import useGetPartners from "../../../../Hooks/Partner/useGetPartners";
import addAccountManageService from "../../../../api/CreditDebit/AddAccountManage/AddAccountManageService";
import dayjs from "dayjs";
import toast, { Toaster } from "react-hot-toast";
export interface addCreditDebitFormProps {
  initialValues: ICreditDebitForm; // Interface for initial form values
}

const AddCreditDebitForm = (props: addCreditDebitFormProps) => {
  let { initialValues } = props; // Destructure initial values from props
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation() as any; // Hook for getting current location
  const pathName = location.pathname.split("/"); // Splitting pathname to determine add/edit
  const isAddEdit = pathName[pathName.length - 1] as string; // Determine if it's add or edit
  const isAdd = isAddEdit === ADD; // Check if it's add operation
  let [partners] = useGetPartners({ header: header, role: "partner" }); // Fetch partners using custom hook
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null; // Retrieve user info from local storage
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme; // Parse user data if available
  let [brokers] = useGetBrokers({ header: header }); // Fetch brokers using custom hook
  let [employees] = useGetEmployees({ header: header }); // Fetch employees using custom hook
  let [accounts] = useGetAccounts({ header: header }); // Fetch accounts using custom hook

  // State variables to store selected IDs and account type
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

  // Effect to update state when editing existing data
  useEffect(() => {
    if (!isAdd) {
      setAccountType(initialValues.accountType);
      setSelectedAccountId(initialValues.accountId);
      setSelectedPartnerId(initialValues.partnerId);
      setSelectedBrokerId(initialValues.brokerId);
    }
  }, [isAdd, initialValues]);

  // Form submission handler
  const onSubmit = (creditdebitForm: ICreditDebitForm, form: any) => {
    // Convert to local time

    const newStartDate = dayjs(creditdebitForm.startDate).format(DAY_FORMAT);
    const newEndDate = dayjs(creditdebitForm.endDate).format(DAY_FORMAT);
    const distributedDate = dayjs(creditdebitForm.distributedDate).format(
      DAY_FORMAT
    );
    // Create a Date object from the UTC date string
    //const utcStartDate = new Date(creditdebitForm.startDate!);
    // Format the date
    //const formattedStartDate = format(utcStartDate, "yyyy-MM-dd'T'HH:mm:ss");
    creditdebitForm.startDate = newStartDate;
    // Create a Date object from the UTC date string
    // const utcEndDate = new Date(creditdebitForm.endDate!);
    // const formattedEndDate = format(utcEndDate, "yyyy-MM-dd'T'HH:mm:ss");
    creditdebitForm.endDate = newEndDate;
    // Create a Date object from the UTC date string
    // const utcDistributedDate = new Date(creditdebitForm.distributedDate!);
    //const formattedDistributedDate = format(
    //   utcDistributedDate,
    //   "yyyy-MM-dd'T'HH:mm:ss"
    // );
    creditdebitForm.distributedDate = distributedDate;
    creditdebitForm.partnerId = selectedPartnerId; // Assign selected partner ID
    creditdebitForm.brokerId = selectedBrokerId; // Assign selected broker ID
    creditdebitForm.accountId = selectedAccountId; // Assign selected account ID
    creditdebitForm.employeeId = selectedEmployeeId; // Assign selected employee ID
    creditdebitForm.amount = Number(creditdebitForm.amount!); // Convert amount to number
    creditdebitForm.createdBy = userData.name; // Assign user's name as creator

    if (isAdd) {
      callAddCreditDebitAPI(creditdebitForm); // Call API to add credit/debit
    } else {
      callEditCreditDebitAPI(creditdebitForm, creditdebitForm.id!); // Call API to edit credit/debit
    }
  };

  // Function to call API for adding credit/debit
  const callAddCreditDebitAPI = async (creditDebit: ICreditDebitForm) => {
    try {
      const creditdebitResponse = await addAccountManageService({
        header,
        creditDebit,
      });
      if (creditdebitResponse.status === "success") {
        navigate(creditDebitsPath()); // Navigate to credit/debits page on success
      } else {
        return { [FORM_ERROR]: `error` }; // Return error message if API call fails
      }
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
      return { [FORM_ERROR]: `error` }; // Return error message if API call fails
    }
  };

  // Function to call API for editing credit/debit
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
        navigate(creditDebitsPath()); // Navigate to credit/debits page on success
      } else {
        return { [FORM_ERROR]: `error` }; // Return error message if API call fails
      }
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
      return { [FORM_ERROR]: `error` }; // Return error message if API call fails
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

  const addValidate = validateFormValues(validationSchema); // Validate function for adding

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
                    {/* Account Type Selection */}
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
                                  ); // Ensure newValue is not null before accessing .value
                                  setAccountType(newValue.value); // Set selected account type
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

                    {/* Type Selection based on Account Type */}
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
                                  ); // Ensure newValue is not null before accessing .value
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

                    {/* Broker Selection for PayIn */}
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
                                  options={brokers} // Replace with your options array
                                  onChange={(event, newValue) => {
                                    input.onChange(newValue.brokerName);
                                    setSelectedBrokerId(newValue._id); // Set selected broker ID
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

                    {/* Employee Selection for Salary */}
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
                                  options={employees} // Replace with your options array
                                  onChange={(event, newValue) => {
                                    input.onChange(newValue.fullName);
                                    setSelectedEmployeeId(newValue._id!); // Set selected employee ID
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

                    {/* Policy Number Input for CutPay */}
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
                                    options={partners} // Replace with your options array
                                    onChange={(event, newValue) => {
                                      input.onChange(newValue.fullName);
                                      setSelectedPartnerId(newValue._id!); // Set selected partner ID
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
                                  input.onChange(newValue.accountCode);
                                  setSelectedAccountId(newValue._id); // Set selected account ID
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
        </Card>
      </React.Fragment>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default AddCreditDebitForm;
