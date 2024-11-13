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
import useGetBrokers from "../../../../Hooks/Broker/useGetBrokers";
import GetCreditDebitByBrokerService from "../../../../api/CreditDebit/GetCreditDebitByBroker/GetCreditDebitByBrokerService";
import { ICreditDebits } from "../ICreditDebits";
import ViewCreditDebitByBroker from "./ViewCreditDebitByBroker";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
const ViewCreditDebitByBrokerCard = () => {
  const title = "Get Credits Details";
  let [brokers] = useGetBrokers({ header: header });
  const [isVisible, setIsVisible] = useState(false);
  const [selectedBrokerId, setSelectedBrokerId] = useState<string>();
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
    brokerName: yup.string().required("Broker is required").nullable(),
  });
  const validate = validateFormValues(validationSchema);
  const onSubmit = async (creditdebitForm: any) => {
    const utcStartDate = new Date(creditdebitForm.startDate!);
    const formattedStartDate = format(utcStartDate, "yyyy-MM-dd'T'HH:mm:ss");
    creditdebitForm.startDate = formattedStartDate;
    const utcEndDate = new Date(creditdebitForm.endDate!);
    const formattedEndDate = format(utcEndDate, "yyyy-MM-dd'T'HH:mm:ss");
    creditdebitForm.endDate = formattedEndDate;
    GetCreditDebitByBrokerService({
      header,
      brokerId: selectedBrokerId!,
      startDate: creditdebitForm.startDate,
      endDate: creditdebitForm.endDate,
    })
      .then((creditDebitsDetails) => {
        setIsVisible(true);
        setCreditDebits(creditDebitsDetails.data);
      })
      .catch(async (error) => {
        const err = await error;
        toast.error(err.message);
      });
  };
  return (
    <>
      <div className="my-2">
        <div >
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
                   
                    <Grid item lg={3} md={3} sm={6} xs={12}>
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
                    <Grid item lg={3} md={3} sm={6} xs={12}>
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
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                      <Field name="brokerName">
                        {({ input, meta }) => (
                          <div>
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                {...input}
                                id="brokerName"
                                value={
                                  input.value !== undefined ? input.value : null
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
                                    label=" Select Broker Name"
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
          {isVisible && <ViewCreditDebitByBroker creditDebits={creditDebits} />}
        </div>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};
export default ViewCreditDebitByBrokerCard;
