import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  Tooltip,
} from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Link } from "react-router-dom";
import { Form, Field } from "react-final-form";
import * as yup from "yup";
import { header } from "../../../context/constant";
import toast, { Toaster } from "react-hot-toast";
import ExcelPayOutService from "../../../api/uploadExcel/ExcelPayOutOdTp/ExcelPayOutService";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
const ExcelPayout = () => {
  const title = "Upload PayOut Excel";
  const [excelUploaded, setExcelUploaded] = useState(false);

  const onSubmit = (values: FormValues) => {
    uploadFile(values.file);
  };

  useEffect(() => {
    if (excelUploaded) {
      setExcelUploaded(false);
    }
  }, [excelUploaded]);

  const uploadFile = async (file: File | null) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("excel", file); // Ensure the key 'excel' matches the backend expectation

        ExcelPayOutService({ header, excel: formData })
          .then((response) => {
            if (response.status.toLowerCase() === "success") {
              setExcelUploaded(true);
              console.log(response.message);
              toast.success(response.message);
            }
          })
          .catch(async (error) => {
            const err = await error;
            toast.error(err.message);
            console.error("Failed to fetch Payout Excel details", error);
          });
      } catch (error: any) {
        const err = await error;
        toast.error(err.message);
      }
    }
  };

  interface FormValues {
    file: File | null;
  }

  const schema = yup.object().shape({
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
      ),
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
    <div className="bg-blue-200 ">
      <Paper
        elevation={3}
        style={{ padding: 20, margin: 30, borderRadius: 10 }}
      >
        <div className="flex justify-between items-center">
          <Typography className="text-safekaroDarkOrange" variant="h5">
            {title}
          </Typography>
          <Tooltip title="Download Excel Sample">
            <a
              href="payOutSample.xlsx"
              download="payOutSample.xlsx"
              className="md:w-10 md:h-10 h-4 w-4 bg-[#3BDB03] shadow-sm rounded flex justify-center items-center text-white"
            >
              <FileDownloadOutlinedIcon className="md:w-6 md:h-6 h-3 w-3" />
            </a>
          </Tooltip>
        </div>
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
                        className=" w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                      >
                        Upload Excel
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          </CardContent>
        </Card>
      </Paper>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default ExcelPayout;
