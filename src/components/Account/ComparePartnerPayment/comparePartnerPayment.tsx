/* eslint-disable react-hooks/rules-of-hooks */
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
import ComparePartnerResult from "./comparePartnerResult";
import { ComparePartnerResultProps } from "../ICompareResult";
import PartnerCompareExcelService from "../../../api/compareExcel/PartnerCompareExcel/PartnerCompareExcelService";
import { DAY_FORMAT, header } from "../../../context/constant";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import toast, { Toaster } from "react-hot-toast";
import useGetPartners from "../../../Hooks/Partner/useGetPartners";

interface FormValues {
  file: File | null;
  endDate: string;
  startDate: string;
}

const comparePartnerPayment: React.FC = () => {
  const title = "Upload Partner Payment Excel";
  const [excelUploaded, setExcelUploaded] = useState(false);
  const [comparePolicyResult, setComparePolicyResult] =
    useState<ComparePartnerResultProps | null>(null);
  let [partners] = useGetPartners({ header: header, role: "partner" });
  const [partnerCode, setPartnerCode] = useState("");
  const onSubmit = async (values: FormValues) => {
    const newStartDate = dayjs(values.startDate).format(DAY_FORMAT);
    const newEndDate = dayjs(values.endDate).format(DAY_FORMAT);
    if (values.file) {
      await uploadFile(values.file, newStartDate, newEndDate);
    }
  };

  const uploadFile = async (file: File, startDate: string, endDate: string) => {
    console.log(partnerCode);
    try {
      const formData = new FormData();
      formData.append("excel", file);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      formData.append("partnerCode", partnerCode);
      PartnerCompareExcelService({
        header,
        excel: formData,
      })
        .then((response) => {
          if (response.status === "Success") {
            console.log(response);
            setExcelUploaded(true);
            setComparePolicyResult(response);
          }
        })
        .catch(async (error) => {
          const errRes = await error;
          toast.error(errRes.message);
        });
    } catch (error: any) {
      const errRes = await error;
      toast.error(errRes.message);
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
    partnerName: yup.string().nullable().required("partner Name is required"),
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
    <div className="bg-blue-200 p-2">
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
        <Card>
          <CardContent>
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
                                  input.onChange(
                                    newValue ? newValue.fullName : ""
                                  );

                                  setPartnerCode(newValue?.partnerId);
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
                        disabled={submitting}
                        variant="contained"
                        color="primary"
                        className="w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                      >
                        Upload Partner Payment
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
            {comparePolicyResult && (
              <ComparePartnerResult
                comparison={comparePolicyResult}
                onExcelUploaded={() => setExcelUploaded(true)}
              />
            )}
          </CardContent>
        </Card>
      </Paper>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default comparePartnerPayment;