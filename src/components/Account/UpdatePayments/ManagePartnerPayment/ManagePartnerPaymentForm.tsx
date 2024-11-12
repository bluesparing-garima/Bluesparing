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
import useGetPartners from "../../../../Hooks/Partner/useGetPartners";
import PartnerPaymentPoliciesDetails from "../PartnerPaymentPoliciesDetails";
import getFilterPaidServices from "../../../../api/UpdatePayment/getFilterPaid/getFilterPaidServices";
import toast, { Toaster } from "react-hot-toast";
dayjs.extend(utc);
const ManagePartnerPaymentForm = () => {
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>();
  const [partnerName, setPartnerName] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [motorPolicies, setMotorPolicies] = useState<IViewPolicy[]>([]);
  const [partnerAmount, setTotalPartnerAmount] = useState(0);
  const [partnerBalance, setTotalPartnerBalance] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [distributedDate, setdistributedDate] = useState("");
  const [remarks, setRemarks] = useState("");
  let [partners] = useGetPartners({ header: header, role: "partner" });
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
      const policies = await getFilterPaidServices({
        header,
        startDate: newStartDate,
        endDate: newEndDate,
        partnerId: selectedPartnerId!,
      });
      setIsVisible(true);
      setMotorPolicies(policies.data.payments);
      setTotalPartnerAmount(policies.data.totalAmount);
      setTotalPartnerBalance(policies.data.partnerBalance);
    } catch (error: any) {
      const err = await error
      toast.error(err.message)
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
              <Grid item lg={3} md={3} sm={6} xs={12}>
                <Field name="partnerName">
                  {({ input, meta }) => (
                    <div>
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          {...input}
                          id="partnerName"
                          value={input.value !== undefined ? input.value : null}
                          getOptionLabel={(option) =>
                            typeof option === "string"
                              ? option
                              : `${option.fullName} - ${option.partnerId}` || ""
                          }
                          options={partners}
                          onChange={(event, newValue) => {
                            input.onChange(newValue.fullName);
                            setSelectedPartnerId(newValue._id);
                            setPartnerName(newValue.fullName);
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
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Button
                  type="submit"
                  disabled={submitting}
                  variant="contained"
                  color="primary"
                  className=" w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                >
                  {"Get Motor Policies"}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
      {isVisible ? (
        <>
          <PartnerPaymentPoliciesDetails
            policies={motorPolicies!}
            partnerAmount={partnerAmount}
            partnerBalance={partnerBalance}
            remarks={remarks}
            partnerId={selectedPartnerId!}
            partnerName={partnerName}
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
export default ManagePartnerPaymentForm;
