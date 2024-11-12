import {
  Typography,
  Paper,
  Grid,
  FormControl,
  Autocomplete,
  TextField,
  Button,
  Tooltip,
} from "@mui/material";
import { Field, Form } from "react-final-form";
import { setIn } from "final-form";
import * as yup from "yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import toast, { Toaster } from "react-hot-toast";
import { DAY_FORMAT, header } from "../../../context/constant";
import { useEffect, useState } from "react";
import useGetPartners from "../../../Hooks/Partner/useGetPartners";
import React from "react";
import dayjs from "dayjs";
import { useLocation, useParams } from "react-router-dom";
import GetMonthlyPartnerWithCompanyPaidService from "../../../api/Dashboard/GetMonthlyPartnerWithCompanyPaid/GetMonthlyPartnerWithCompanyPaidService";
import { ICompanyPaid } from "../../TreeView/ITreeView";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { generateCompanyPaidExcel } from "../../../utils/DashboardExcel";
const MonthlyCompanyPaidFilterPayOut = () => {
  const title = "Get Monthly Paid Payment Details Of Partner -";
  const location = useLocation();
  const selectedCategory = location.state as string; // This is where you access the passed state
  const { startDate } = useParams();
  const { endDate } = useParams();
  const { partnerId } = useParams();
  let [partners] = useGetPartners({ header: header, role: "partner" });
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [selectedPartnerCode, setSelectedPartnerCode] = useState<string>();
  const [selectedPartnerName, setSelectedPartnerName] = useState<string>();
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>();
  const [companyDetails, setCompanyDetails] = useState<ICompanyPaid[]>([]); // State for all credit debits
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
  const handleDownloadExcel = () => {
    generateCompanyPaidExcel(companyDetails);
  };
  const validationSchema = yup.object().shape({
    startDate: yup.string().required("Start Date is required").nullable(),
    endDate: yup.string().nullable().required("End Date is required"),
    partnerName: yup.string().required("Partner Name is required").nullable(),
  });

  const validate = validateFormValues(validationSchema);

  useEffect(() => {
    filterMonthlyPartnerPaymentWithCompany(startDate!, endDate!, partnerId!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, partnerId]);

  const filterMonthlyPartnerPaymentWithCompany = async (
    startDate: string,
    endDate: string,
    partnerId: string
  ) => {
    GetMonthlyPartnerWithCompanyPaidService({
      header,
      partnerId: partnerId!,
      startDate: startDate,
      endDate: endDate,
      category: selectedCategory,
    }) // Call API to fetch credit debits
      .then((partners) => {
        // On successful API call
        setCompanyDetails(partners.data);
        setTotalAmount(partners.totalAmount);
        setSelectedPartnerCode(partners.partnerCode);
        setSelectedPartnerName(partners.partnerName);
      })
      .catch(async (error) => {
        const err = await error;
        toast.error(err.message);
      });
  };

  const onSubmit = async (value: any) => {
    const newStartDate = dayjs(value.startDate).format(DAY_FORMAT);
    const newEndDate = dayjs(value.endDate).format(DAY_FORMAT);
    filterMonthlyPartnerPaymentWithCompany(
      newStartDate,
      newEndDate,
      selectedPartnerId!
    );
  };
  return (
    <>
      <div className="bg-blue-200 p-7 mt-3">
        <Paper elevation={3} style={{ padding: 20 }}>
          <div className="flex justify-between items-center">
            <Typography
              variant="h5"
              className="text-safekaroDarkOrange"
              gutterBottom
              display="inline"
            >
              {title}{" "}
              <span className="text-addButton">
                {selectedPartnerName} ({selectedPartnerCode})
              </span>
            </Typography>
            <Tooltip title="download Excel">
              <button
                className="md:w-10 md:h-10 h-4 w-4 bg-[#3BDB03] shadow-sm rounded flex justify-center items-center text-white"
                onClick={handleDownloadExcel}
              >
                <FileDownloadOutlinedIcon className="md:w-6 md:h-6 h-3 w-3" />
              </button>
            </Tooltip>
          </div>
          <React.Fragment>
            <Form
              onSubmit={onSubmit}
              // initialValues={initialValues}
              validate={validate}
              render={({ handleSubmit, submitting, errors, values }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2} mt={2} mb={2}>
                    {/* Account Code Selection */}
                    <Grid item lg={3} md={3} sm={6} xs={12}>
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
                    <Grid item lg={3} md={3} sm={6} xs={12}>
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
                                options={partners} // Replace with your options array
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
          <Typography variant="body2" className="text-sm text-gray-600 mb-2">
            Total Amount{" "}
            <span className="text-safekaroDarkOrange">{totalAmount}</span>
          </Typography>
          <Grid container className="bg-blue-200 mt-3">
            {companyDetails.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                <div className="bg-white m-2 p-3 rounded-2xl shadow-lg flex items-center justify-between transform transition-transform duration-200 hover:scale-105">
                  <div>
                    <Typography
                      variant="body2"
                      className="text-sm text-gray-600 mb-2"
                    >
                      {item.companyName}
                    </Typography>
                    <Typography
                      variant="h5"
                      className="text-base font-bold text-gray-800"
                    >
                      {item.totalPayOutAmount}
                    </Typography>
                  </div>
                  {/* Uncomment if needed
                <img src={icon} alt={title} className="h-8 w-8" />
                */}
                </div>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default MonthlyCompanyPaidFilterPayOut;