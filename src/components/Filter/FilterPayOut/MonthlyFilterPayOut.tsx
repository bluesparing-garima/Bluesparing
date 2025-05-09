import { Typography, Paper, Grid, Button, TextField, Tooltip } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { DAY_FORMAT, header } from "../../../context/constant";
import { useEffect, useState } from "react";
import { endOfMonth, format, startOfMonth } from "date-fns";
import GetMonthlyPartnerPaymentService from "../../../api/Dashboard/GetMonthlyPartnerPayment/GetMonthlyPartnerPaymentService";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Field, Form } from "react-final-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { setIn } from "final-form";
import * as yup from "yup";
import dayjs from "dayjs";
import { Link, useLocation } from "react-router-dom";
import { PartnerPayment } from "../../TreeView/ITreeView";
import { generatePartnerPaymentExcel } from "../../../utils/DashboardExcel";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
const MonthlyFilterPayOut = () => {
  const title = "Get Monthly Payout Details Of All Partners";
  const location = useLocation();
  const selectedCategory = location.state as string;
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();
  const[isLoading,setIsLoading] = useState(false);
  const [partnerTotalPayment, setPartnerTotalPayment] = useState<number>(0);
  const [partnerPayment, setPartnerPayment] = useState<PartnerPayment[]>([]);
  const fetchPartnerPayments = async (
    formattedFirstDay: any,
    formattedLastDay: any
  ) => {setIsLoading(true)
    setSelectedStartDate(formattedFirstDay);
    setSelectedEndDate(formattedLastDay);
    GetMonthlyPartnerPaymentService({
      header,
      startDate: formattedFirstDay,
      endDate: formattedLastDay,
      category: selectedCategory,
    })
      .then((partnerPayment) => {
        setPartnerPayment(partnerPayment.data);
        setPartnerTotalPayment(partnerPayment.totalAmount);
      })
      .catch(async (error) => {
        const err = await error;
        toast.error(err.message);
      }).finally(()=>{
        setIsLoading(false)
      })
  };
  const handleDownloadExcel = () => {
    generatePartnerPaymentExcel(partnerPayment)
  };
  useEffect(() => {
    const currentDate = new Date();
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    let formattedFirstDay = format(firstDayOfMonth, "yyyy-MM-dd");
    let formattedLastDay = format(lastDayOfMonth, "yyyy-MM-dd");
    fetchPartnerPayments(formattedFirstDay, formattedLastDay);
     // eslint-disable-next-line 
  }, []);
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
  const onSubmit = async (value: any) => {
    const newStartDate = dayjs(value.startDate).format(DAY_FORMAT);
    const newEndDate = dayjs(value.endDate).format(DAY_FORMAT);
    fetchPartnerPayments(newStartDate, newEndDate);
  };
  return (
    <div className="bg-blue-200 p-7 mt-3">
      <Paper elevation={3} style={{ padding: 20 }}>
        <div className="flex justify-between items-center">
        <Typography variant="h5" className="text-black" gutterBottom>
          {title}{" "}
          <span className="text-safekaroDarkOrange">{partnerTotalPayment}</span>
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
                    <Button
                      type="submit"
                      disabled={isLoading}
                      variant="contained"
                      color="primary"
                      className=" w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                    >
                      {isLoading?'Submitting...':"Get Records"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          />
        </React.Fragment>
        <Grid container className="bg-blue-200 mt-3">
          {partnerPayment.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
              <Link
                state={selectedCategory}
                to={`/payouts/monthly/company/${selectedStartDate}/${selectedEndDate}/${item.partnerId}`}
              >
                <div className="bg-white m-2 p-3 rounded-2xl shadow-lg flex items-center justify-between transform transition-transform duration-200 hover:scale-105">
                  <div>
                    <Typography
                      variant="body2"
                      className="text-sm text-gray-600 mb-2"
                    >
                      {item.partnerName} ({item.userCode})
                    </Typography>
                    <Typography
                      variant="h5"
                      className="text-base font-bold text-gray-800"
                    >
                      {item.totalPayOutCommission}
                    </Typography>
                  </div>
                
                </div>
              </Link>
            </Grid>
          ))}
        </Grid>
        <Toaster position="bottom-center" reverseOrder={false} />
      </Paper>
    </div>
  );
};
export default MonthlyFilterPayOut;
