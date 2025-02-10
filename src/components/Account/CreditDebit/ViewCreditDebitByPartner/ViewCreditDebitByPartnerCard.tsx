import {
  Typography,
  Paper,
  Grid,
  FormControl,
  Autocomplete,
  TextField,
  Button,
} from "@mui/material";
import { Field, Form } from "react-final-form";
import { setIn } from "final-form";
import * as yup from "yup";
import { header } from "../../../../context/constant";
import React, { useState } from "react";
import useGetPartners from "../../../../Hooks/Partner/useGetPartners";
import ViewCreditDebitByPartner from "./ViewCreditDebitByPartner";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { format } from "date-fns";
import { ICreditDebits } from "../ICreditDebits";
import GetAccountManageByPartnerByDateRangeService from "../../../../api/CreditDebit/GetAccountManageByPartnerByDateRange/GetAccountManageByPartnerByDateRangeService";
import toast, { Toaster } from "react-hot-toast";
const ViewCreditDebitByPartnerCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const title = "Get Debits Details";
  let [partners] = useGetPartners({ header: header, role: "partner" });
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>();
  const [creditDebits, setCreditDebits] = useState<ICreditDebits[]>([]);
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
    partnerName: yup.string().required("Partner is required").nullable(),
  });
  const validate = validateFormValues(validationSchema);
  const onSubmit = async (creditDebitForm: any) => {
    const utcStartDate = new Date(creditDebitForm.startDate!);
    const formattedStartDate = format(utcStartDate, "yyyy-MM-dd'T'HH:mm:ss");
    creditDebitForm.startDate = formattedStartDate;
    const utcEndDate = new Date(creditDebitForm.endDate!);
    const formattedEndDate = format(utcEndDate, "yyyy-MM-dd'T'HH:mm:ss");
    creditDebitForm.endDate = formattedEndDate;
    try {
      setIsLoading(true);
      const res = await GetAccountManageByPartnerByDateRangeService({
        header,
        partnerId: selectedPartnerId!,
        startDate: creditDebitForm.startDate,
        endDate: creditDebitForm.endDate,
      });
      setIsVisible(true);
      setCreditDebits(res.data);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="bg-blue-200 p-7 mt-3">
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography
            variant="h5"
            className="text-safekaroDarkOrange"
            gutterBottom
            display="inline"
          >
            {title}
          </Typography>
          <React.Fragment>
            <Form
              onSubmit={onSubmit}
              validate={validate}
              render={({ handleSubmit, submitting, errors, values }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2} mt={2} mb={2}>
                    {}
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
                                    : `${option.fullName} - ${option.partnerId}` ||
                                      ""
                                }
                                options={partners}
                                onChange={(event, newValue) => {
                                  input.onChange(newValue.fullName);
                                  setSelectedPartnerId(newValue._id);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label=" Select Partner Name"
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
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        variant="contained"
                        color="primary"
                        className=" w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                      >
                        {isLoading ? "Submitting..." : "Get Records"}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          </React.Fragment>
          {isVisible && (
            <ViewCreditDebitByPartner creditDebits={creditDebits} />
          )}
        </Paper>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};
export default ViewCreditDebitByPartnerCard;
