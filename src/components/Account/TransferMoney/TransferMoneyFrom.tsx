import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import { setIn } from "final-form";
import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import * as yup from "yup";
import { DAY_FORMAT, header } from "../../../context/constant";
import useGetAccountByRole from "../../../Hooks/Account/useGetAccountByRole";
import { IAccounts } from "../IAccounts";
import DynamicDateField from "../../../utils/ui/DynamicDateField";
import DynamicTextField from "../../../utils/ui/DynamicTextField";
import dayjs from "dayjs";
import toast, { Toaster } from "react-hot-toast";
import TransferMoneyService from "../../../api/Account/TransferMoney/TransferMoneyService";
const TransferMoneyFrom = () => {
  const [isLoading, setIsLoading] = useState(false);
  let [accounts] = useGetAccountByRole({ header: header, role: "Admin" });

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
    remarks: yup
      .string()
      .nullable()
      .required("Remarks is required")
      .max(200, "Remarks should not exceed 200 characters"),
  });
  const onSubmit = async (data: any, form: any) => {
    const {
      senderAccount,
      receiverAccount,
      startDate,
      endDate,
      distributionDate,
      remarks,
      amount,
    } = data;
    const senderAccountId = senderAccount._id as string;
    const senderBal = senderAccount.amount as number;
    const receiverAccountId = receiverAccount._id as string;
    const st = dayjs(startDate).format(DAY_FORMAT);
    const et = dayjs(endDate).format(DAY_FORMAT);
    const dt = dayjs(distributionDate).format(DAY_FORMAT);
    const r = remarks as string;
    const money = Number(amount);
    if (senderAccountId === receiverAccountId) {
      toast.error("Sender and receiver account is same");
      return;
    }
    if (Number(senderBal) < money) {
      toast.error("Insufficient balance");
      return;
    }
    try {
      setIsLoading(true);
      const payload = {
        senderAccountId,
        receiverAccountId,
        startDate: st,
        endDate: et,
        distributedDate: dt,
        remarks: r,
        amount: money,
      };
      const res = await TransferMoneyService(payload);
      if (res.success) {
        toast.success(res.message);
        form.reset();
        return;
      }
    } catch (error: any) {
      const err = await error;
      toast.error(err.message || "Error occurred in transfer money");
    } finally {
      setIsLoading(false);
    }
  };
  const addValidate = validateFormValues(validationSchema);
  return (
    <>
      <Form
        mt={3}
        onSubmit={onSubmit}
        validate={addValidate}
        render={({ handleSubmit, submitError }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="senderAccount">
                  {({ input, meta }) => (
                    <div>
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          {...input}
                          id="senderAccount"
                          value={input.value !== undefined ? input.value : null}
                          getOptionLabel={(option) =>
                            typeof option === "string"
                              ? option
                              : option.accountCode || ""
                          }
                          options={accounts}
                          onChange={(event, newValue: IAccounts) => {
                            if (newValue) {
                              input.onChange(newValue);
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=" Select Sender Account"
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
                <Field name="receiverAccount">
                  {({ input, meta }) => (
                    <div>
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          {...input}
                          id="receiverAccount"
                          value={input.value !== undefined ? input.value : null}
                          getOptionLabel={(option) =>
                            typeof option === "string"
                              ? option
                              : option.accountCode || ""
                          }
                          options={accounts}
                          onChange={(event, newValue: IAccounts) => {
                            if (newValue) {
                              input.onChange(newValue);
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select Receiver Account"
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
              <DynamicTextField
                name="amount"
                label="Enter Amount"
                type="number"
                gridProps={{ lg: 4, md: 4, sm: 6, xs: 12 }}
              />
              <DynamicDateField
                name="startDate"
                label="Start Date"
                disableFuture
                gridProps={{ lg: 4, md: 4, sm: 6, xs: 12 }}
              />
              <DynamicDateField
                name="endDate"
                label="End Date"
                disableFuture
                gridProps={{ lg: 4, md: 4, sm: 6, xs: 12 }}
              />
              <DynamicDateField
                name="distributedDate"
                label="Distributed Date"
                disableFuture
                gridProps={{ lg: 4, md: 4, sm: 6, xs: 12 }}
              />
              <DynamicTextField
                name="remarks"
                label="Enter Remarks"
                multiline
                rows={4}
                gridProps={{ lg: 12, md: 12, sm: 12, xs: 12 }}
              />
            </Grid>
            <Grid container spacing={2} mt={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {submitError && (
                  <div className="error text-safekaroDarkOrange">
                    {submitError}
                  </div>
                )}
                <Button disabled={isLoading} variant="contained" type="submit">
                  {isLoading ? "Submitting.." : "Submit"}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default TransferMoneyFrom;
