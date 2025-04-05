import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  FormControl,
  Autocomplete,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Form, Field } from "react-final-form";
import * as yup from "yup";
import CompareBrokerResult from "./compareBrokerResult";
import { CompareBrokerResultProps } from "../ICompareResult";
import { DAY_FORMAT, header } from "../../../context/constant";
import BrokerCompareExcelService from "../../../api/compareExcel/BrokerCompareExcel/BrokerCompareExcelService";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import toast, { Toaster } from "react-hot-toast";
import useGetBrokers from "../../../Hooks/Broker/useGetBrokers";
interface FormValues {
  file: File | null;
  endDate: string;
  startDate: string;
}
const CompareBrokerPayment: React.FC = () => {
  const title = "Upload Broker Payment Excel";
  const [excelUploaded, setExcelUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [comparePolicyResult, setComparePolicyResult] =
    useState<CompareBrokerResultProps | null>(null);
  let [brokers] = useGetBrokers({ header: header });
  const [selectedBrokerId, setSelectedBrokerId] = useState("");

  const onSubmit = async (values: FormValues) => {
    const newStartDate = dayjs(values.startDate).format(DAY_FORMAT);
    const newEndDate = dayjs(values.endDate).format(DAY_FORMAT);
    if (values.file) {
      await uploadFile(values.file, newStartDate, newEndDate);
    }
  };
  const uploadFile = async (file: File, startDate: string, endDate: string) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("excel", file);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      formData.append("brokerId", selectedBrokerId);
      BrokerCompareExcelService({
        header,
        excel: formData,
      })
        .then((response) => {
          if (response.status === "Success") {
            setExcelUploaded(true);
            setComparePolicyResult(response);
          }
        })
        .catch(async (error: any) => {
          const errRes = await error;
          toast.error(errRes.message);
        });
    } catch (error: any) {
      const errRes = await error;
      toast.error(errRes.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (excelUploaded) {
      setExcelUploaded(false);
    }
  }, [excelUploaded]);
  const schema = yup.object().shape({
    startDate: yup
      .date()
      .required("Start Date is required")
      .nullable()
      .typeError("Invalid date format"),
    endDate: yup
      .date()
      .required("End Date is required")
      .nullable()
      .typeError("Invalid date format")
      .min(yup.ref("startDate"), "End Date must be after Start Date"),
    file: yup
      .mixed()
      .required("File is required")
      .test(
        "fileType",
        "Only .xls or .xlsx files are allowed",
        (value) =>
          value &&
          (value.type === "application/vnd.ms-excel" ||
            value.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
      )
      .test(
        "fileSize",
        "File size should be less than 2MB",
        (value) => value && value.size <= 2 * 1024 * 1024
      ),
    broker: yup.string().nullable().required("Broker Name is required"),
  });
  const validate = (values: FormValues) => {
    try {
      schema.validateSync(values, { abortEarly: false });
      return {};
    } catch (err) {
      const validationErrors: { [key: string]: string } = {};
      if (err instanceof yup.ValidationError && err.inner) {
        err.inner.forEach((error) => {
          if (error.path) validationErrors[error.path] = error.message;
        });
      }
      return validationErrors;
    }
  };
  return (
    <div className="blue-200 p-2">
      <Paper
        elevation={3}
        style={{ padding: 20, margin: 30, borderRadius: 10 }}
      >
        <Typography className="text-safekaroDarkOrange" variant="h5">
          {title}
        </Typography>
        <Typography variant="h5" mb={2}>
          <Link to="/dashboard" className="text-addButton font-bold text-sm">
            Dashboard {" / "}
          </Link>
          <span className="text-grey-600 text-sm"> {title}</span>
          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
        </Typography>

        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
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
                  <Field name="broker">
                    {({ input, meta }) => (
                      <div>
                        <FormControl fullWidth size="small">
                          <Autocomplete
                            {...input}
                            id="broker"
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
                              input.onChange(
                                newValue ? newValue.brokerName : ""
                              );
                              setSelectedBrokerId(
                                newValue ? newValue._id : ""
                              );
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
                <Grid item lg={8} xs={12}>
                  <Field name="file">
                    {({ input, meta }) => (
                      <div>
                        <Grid item lg={12} xs={12}>
                          <input
                            type="file"
                            style={{
                              border: "1px solid #c4c4c4",
                              padding: "5px",
                              width: "100%",
                              borderRadius: "5px",
                            }}
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const file = event.target.files
                                ? event.target.files[0]
                                : null;
                              input.onChange(file);
                            }}
                            accept=".xls,.xlsx"
                          />
                          {meta.touched && meta.error && (
                            <span style={{ color: "red" }}>
                              {meta.error}
                            </span>
                          )}
                        </Grid>
                      </div>
                    )}
                  </Field>
                </Grid>
                <Grid item lg={4} xs={12}>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="btnGradient text-black px-4 py-3 rounded-md w-full sm:w-auto text-[10px] md:text-xs"
                  >
                    {isLoading ? "Submitting..." : "Upload"}
                  </Button>

                </Grid>
              </Grid>
            </form>
          )}
        />

        {comparePolicyResult && (
          <div className=" p-2 mt-3">
            <CompareBrokerResult
              comparison={comparePolicyResult}
              onExcelUploaded={() => setExcelUploaded(true)}
            />
          </div>
        )}
      </Paper>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};
export default CompareBrokerPayment;
