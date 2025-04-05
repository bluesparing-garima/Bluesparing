import {
  TextField,
  Button,
  Grid,
  FormControl,
  Autocomplete,
} from "@mui/material";
import { Form, Field } from "react-final-form";
import { setIn } from "final-form";
import * as yup from "yup";
import { DAY_FORMAT, header } from "../../../../context/constant";
import { useState } from "react";
import { IViewPolicy } from "../../../Policy/IPolicy";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { IUpdatePartnerPaymentPolicy } from "../IUpdatePayments";
import BrokerPaymentPoliciesDetails from "../BrokerPaymentPoliciesDetails";
import useGetBrokers from "../../../../Hooks/Broker/useGetBrokers";
import getFilterPaidForBrokerService from "../../../../api/UpdatePayment/GetFilterPaidForBroker/GetFilterPaidForBrokerService";
import toast, { Toaster } from "react-hot-toast";
dayjs.extend(utc);
const ManageBrokerPaymentForm = () => {
  const [selectedBrokerId, setSelectedBrokerId] = useState<string>();
  const [brokerName, setBrokerName] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [motorPolicies, setMotorPolicies] = useState<IViewPolicy[]>([]);
  const [brokerBalance, setbrokerBalance] = useState(0);
  const [policyTotal, setPolicyTotal] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [distributedDate, setdistributedDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [remarks, setRemarks] = useState("");
  let [brokers] = useGetBrokers({ header: header });
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

  const onSubmit = async (updatePayment: IUpdatePartnerPaymentPolicy) => {
    const newStartDate = dayjs(updatePayment.startDate).format(DAY_FORMAT);
    const newEndDate = dayjs(updatePayment.endDate).format(DAY_FORMAT);
    const distributedDate = dayjs(updatePayment.distributedDate).format(
      DAY_FORMAT
    );
    setStartTime(newStartDate);
    setEndTime(newEndDate);
    setdistributedDate(distributedDate);
    setRemarks(updatePayment.remarks!);
    try {
      setIsLoading(true);
      const policies = await getFilterPaidForBrokerService({
        header,
        startDate: newStartDate,
        endDate: newEndDate,
        brokerId: selectedBrokerId!,
      });
      setIsVisible(true);
      setMotorPolicies(policies.data.payments);
      setPolicyTotal(policies.data.totalAmount);
      setbrokerBalance(policies.data.brokerBalance);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <React.Fragment>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, submitting, errors, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="brokerName">
                  {({ input, meta }) => (
                    <div>
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          {...input}
                          id="brokerName"
                          value={input.value !== undefined ? input.value : null}
                          getOptionLabel={(option) =>
                            typeof option === "string"
                              ? option
                              : `${option.brokerName} - ${option.brokerCode}` ||
                              ""
                          }
                          options={brokers}
                          onChange={(event, newValue) => {
                            input.onChange(newValue.brokerName);
                            setBrokerName(newValue?.brokerName);
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
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="btnGradient text-black px-4 py-2.5 rounded-md w-full sm:w-auto text-[10px] md:text-xs"
                >
                  {isLoading ? "Submitting" : "Get Motor Policies"}
                </Button>

              </Grid>
            </Grid>
          </form>
        )}
      />
      {isVisible ? (
        <>
          <BrokerPaymentPoliciesDetails
            policies={motorPolicies!}
            brokerBalance={brokerBalance}
            remarks={remarks}
            brokerAmount={policyTotal}
            brokerId={selectedBrokerId!}
            brokerName={brokerName}
            distributedDate={distributedDate}
            endDate={endTime}
            startDate={startTime}
          />
        </>
      ) : (
        ""
      )}
      <Toaster position="bottom-center" reverseOrder={false} />
    </React.Fragment>
  );
};
export default ManageBrokerPaymentForm;
