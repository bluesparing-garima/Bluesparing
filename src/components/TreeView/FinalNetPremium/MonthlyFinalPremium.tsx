import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DAY_FORMAT, header } from "../../../context/constant";
import toast from "react-hot-toast";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { Field, Form } from "react-final-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import * as yup from "yup";
import { setIn } from "final-form";
import { useLocation } from "react-router-dom";
import { IFinalNetPremiumBroker, IFinalNetPremiumPartner } from "../ITreeView";
import GetMonthlyBrokerFinalPremiumService from "../../../api/Dashboard/GetMonthlyBrokerFinalPremium/GetMonthlyBrokerFinalPremiumService";
import GetMonthlyPartnerFinalPremiumService from "../../../api/Dashboard/GetMonthlyPartnerFinalPremium/GetMonthlyPartnerFinalPremiumService";
import FolderViewMonthlyFinalNetPremium from "../FolderView/FolderViewMonthlyFinalNetPremium";
const MonthlyFinalNetPremium = () => {
  const location = useLocation();
  const selectedCategory = location.state as string;
  const [loading, setLoading] = useState<boolean>(true);
  const [finalNetPremiumPartnerData, setFinalNetPremiumPartnerData] =
    useState<IFinalNetPremiumPartner[]>();
  const [finalNetPremiumPartnerTotal, setFinalNetPremiumPartnerTotal] =
    useState(0);
  const [finalNetPremiumBrokerData, setFinalNetPremiumBrokerData] =
    useState<IFinalNetPremiumBroker[]>();
  const [finalNetPremiumBrokerTotal, setFinalNetPremiumBrokerTotal] =
    useState(0);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const fetchBrokerFinalNetPremium = async (startDate: any, endDate: any) => {
    try {
      const res = await GetMonthlyBrokerFinalPremiumService({
        header,
        startDate,
        endDate,
        category: selectedCategory,
      });
      setFinalNetPremiumBrokerData(res.data);
      setFinalNetPremiumBrokerTotal(res.totalAmount);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  const fetchPartnerFinalNetPremium = async (startDate: any, endDate: any) => {
    try {
      const res = await GetMonthlyPartnerFinalPremiumService({
        header,
        startDate,
        endDate,
        category: selectedCategory,
      });
      setFinalNetPremiumPartnerData(res.data);
      setFinalNetPremiumPartnerTotal(res.totalAmount);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  const getFormattedMonthDates = () => {
    const currentDate = new Date();
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    const formattedFirstDay = format(firstDayOfMonth, "yyyy-MM-dd");
    const formattedLastDay = format(lastDayOfMonth, "yyyy-MM-dd");
    return { formattedFirstDay, formattedLastDay };
  };
  const fetchData = async (sd?: string, ed?: string) => {
    let { formattedFirstDay, formattedLastDay } = getFormattedMonthDates();
    if (sd) {
      formattedFirstDay = sd;
    }
    if (ed) {
      formattedLastDay = ed;
    }
    setSelectedStartDate(formattedFirstDay);
    setSelectedEndDate(formattedLastDay);
    setLoading(true);
    await Promise.all([
      fetchBrokerFinalNetPremium(formattedFirstDay, formattedLastDay),
      fetchPartnerFinalNetPremium(formattedFirstDay, formattedLastDay),
    ]);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
     // eslint-disable-next-line 
  }, []);
  const validationSchema = yup.object().shape({
    startDate: yup.string().required("Start Date is required").nullable(),
    endDate: yup.string().nullable().required("End Date is required"),
  });
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
  const validate = validateFormValues(validationSchema);
  const onSubmit = async (value: any) => {
    const newStartDate = dayjs(value.startDate).format(DAY_FORMAT);
    const newEndDate = dayjs(value.endDate).format(DAY_FORMAT);
    fetchData(newStartDate, newEndDate);
  };
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="bg-blue-200 p-7 mt-3">
      <Paper elevation={3} style={{ padding: 20 }}>
        <>
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
        </>
        <Typography
          variant="h5"
          className="text-safekaroDarkOrange"
          gutterBottom
        >
          Monthly Final Premium
        </Typography>
        <FolderViewMonthlyFinalNetPremium
          data={{
            name: "Monthly Final Premium Partner",
            amount: finalNetPremiumPartnerTotal,
            children: finalNetPremiumPartnerData,
          }}
          api="partner_final_net_premium"
          startDate={selectedStartDate}
          endDate={selectedEndDate}
        />
        <FolderViewMonthlyFinalNetPremium
          data={{
            name: "Monthly Final Premium Broker",
            amount: finalNetPremiumBrokerTotal,
            children: finalNetPremiumBrokerData,
          }}
          api="broker_final_net_premium"
          startDate={selectedStartDate}
          endDate={selectedEndDate}
        />
      </Paper>
    </div>
  );
};
export default MonthlyFinalNetPremium;
