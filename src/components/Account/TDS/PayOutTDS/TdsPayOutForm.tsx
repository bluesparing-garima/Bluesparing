import { useState } from "react";
import { DAY_FORMAT, header } from "../../../../context/constant";
import dayjs from "dayjs";
import toast, { Toaster } from "react-hot-toast";
import * as yup from "yup";
import { ITdsPayOutForms, ITdsType } from "../ITDS";
import { setIn } from "final-form";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Form } from "react-final-form";
import { IAccounts } from "../../IAccounts";
import DynamicDateField from "../../../../utils/ui/DynamicDateField";
import DynamicTextField from "../../../../utils/ui/DynamicTextField";
import PayOutTdsDetails from "./PayOutTdsDetails";
import useGetAccountByRole from "../../../../Hooks/Account/useGetAccountByRole";
import PayOutTdsServices from "../../../../api/Account/PayOutTds/PayOutTdsServices";
import TDSWrapper from "../TDSWrapper";
const TdsPayOutForm = () => {
  let [accounts] = useGetAccountByRole({ header: header, role: "Admin" });
  const [tdsData, setTdsData] = useState<ITdsType[]>([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [distributedDate, setDistributedDate] = useState("");

  const [accountCode, setAccountCode] = useState<string>("");
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [remarks, setRemarks] = useState("");
  const [amountInAccount, setAmountInAccount] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setAllState = (
    startDate: string,
    endDate: string,
    distributionDate: string,
    accountCode: string,
    accountId: string,
    remarks?: string
  ) => {
    setStartTime(startDate);
    setEndTime(endDate);
    setDistributedDate(distributionDate);
    setSelectedAccountId(accountId);
    setAccountCode(accountCode);
    if (remarks) {
      setRemarks(remarks);
    }
  };

  const checkValidateTime = (timeData: string, filedName: string) => {
    if (!timeData) {
      return "";
    }
    const val = dayjs(timeData);

    if (!val.isValid()) {
      toast.error(`${filedName} is not valid`);
      return "";
    }
    return val.format(DAY_FORMAT);
  };
  const onSubmit = async (formData: ITdsPayOutForms, form: any) => {
    const startDate = checkValidateTime(formData.startDate || "", "Start Date");
    const endDate = checkValidateTime(formData.endDate || "", "End Date");

    const distDate = checkValidateTime(
      formData.distributedDate || "",
      "Distributed Date"
    );

    if (!startDate || !endDate || !distDate) {
      return;
    }
    const remarks = formData.remarks;
    const account = formData.accountCode;

    try {
      setIsLoading(true);
      const res = await PayOutTdsServices({
        startDate,
        endDate,
        partnerId: "",
      });
      if (res?.length > 0) {
        setTdsData(res);
      }
    } catch (error: any) {
      const err = await error;
      toast.error(
        err.message || "error occurred while getting payout tds data"
      );
    } finally {
      setIsLoading(false);
    }

    setAllState(
      startDate,
      endDate,
      distDate,
      account.accountCode || "",
      account._id || "",
      remarks
    );
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
    remarks: yup
      .string()
      .nullable()
      .required("Remarks is required")
      .max(200, "Remarks should not exceed 200 characters"),
  });
  const addValidate = validateFormValues(validationSchema);

  return (
    <>
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
              <span className="text-safekaroDarkOrange">{amountInAccount}</span>
            </Typography>
          </Grid>
        )}
        <CardContent>
          <Form
            mt={3}
            onSubmit={onSubmit}
            validate={addValidate}
            render={({ handleSubmit, submitError, submitting }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                  {/* <Grid item lg={4} md={4} sm={6} xs={12}>
                    <Field name="partner">
                      {({ input, meta }) => (
                        <div>
                          <FormControl fullWidth size="small">
                            <Autocomplete
                              id="partner"
                              options={partners || []}
                              getOptionLabel={(option) =>
                                typeof option === "string"
                                  ? option
                                  : `${option.fullName} - ${option.partnerId}` ||
                                    ""
                              }
                              value={
                                input.value !== undefined ? input.value : null
                              }
                              onChange={(event, newValue) => {
                                input.onChange(newValue);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Select Partner"
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
                  </Grid> */}

                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <Field name="accountCode">
                      {({ input, meta }) => (
                        <div>
                          <FormControl fullWidth size="small">
                            <Autocomplete
                              {...input}
                              id="accountCode"
                              value={
                                input.value !== undefined ? input.value : null
                              }
                              getOptionLabel={(option) =>
                                typeof option === "string"
                                  ? option
                                  : option.accountCode || ""
                              }
                              options={accounts}
                              onChange={(event, newValue: IAccounts) => {
                                if (newValue) {
                                  input.onChange(newValue);
                                  setAmountInAccount(newValue.amount || 0);
                                  setSelectedAccountId(newValue?._id || "");
                                  setAccountCode(newValue.accountCode || "");
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
                    <Button
                      disabled={isLoading}
                      type="submit"
                      className="btnGradient text-black px-4 py-2.5 rounded-md w-full sm:w-auto text-[10px] md:text-xs"
                    >
                      {isLoading ? "Submitting..." : "Submit"}
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
        ) : tdsData.length > 0 ? (
          <>
            <PayOutTdsDetails
              policies={tdsData}
              startDate={startTime}
              endDate={endTime}
              distributedDate={distributedDate}
              accountId={selectedAccountId!}
              accountCode={accountCode}
              remarks={remarks}
              balanceInAccount={amountInAccount}
            />
          </>
        ) : (
          <>
            <TDSWrapper title="Empty Record">
              <Alert severity="error">No Data Found</Alert>
            </TDSWrapper>
          </>
        )}
      </Card>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};
export default TdsPayOutForm;
