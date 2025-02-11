import { endOfMonth, format, startOfMonth } from "date-fns";
import { setIn } from "final-form";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DAY_FORMAT, header } from "../../../context/constant";
import toast from "react-hot-toast";
import * as yup from "yup";
import dayjs from "dayjs";
import { Field, Form } from "react-final-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import GetMonthlyBrokerFinalPremiumService from "../../../api/Dashboard/GetMonthlyBrokerFinalPremium/GetMonthlyBrokerFinalPremiumService";
import GetMonthlyPartnerFinalPremiumService from "../../../api/Dashboard/GetMonthlyPartnerFinalPremium/GetMonthlyPartnerFinalPremiumService";
import { IFinalNetPremiumBroker, IFinalNetPremiumPartner } from "../../TreeView/ITreeView";
import { generateExcelFinalPremium } from "../../../utils/DashboardExcel";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
const MonthlyFinalPremium = () => {
  const title = "Get Monthly Final Preminum Details";
  const location = useLocation();
  const selectedCategory = location.state as string;
  const [isPartner, setIsPartner] = useState(1);
  const [selectedPartner, setSelectedPartner] = useState(true);
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();
  const [totalFinalPremium, setTotalFinalPremium] = useState<number>(0);
  const [partnerTotalFinalPremium, setPartnerTotalFinalPremium] =
    useState<number>(0);
  const [brokerTotalFinalPremium, setBrokerTotalFinalPremium] =
    useState<number>(0);
  const [partnerFinalPremium, setPartnerFinalPremium] = useState<
  IFinalNetPremiumPartner[]
  >([]);
  const[isLoading,setIsLoading] = useState(false)
  const [brokerFinalPremium, setBrokerFinalPremium] = useState<
  IFinalNetPremiumBroker[]
  >([]);
  const fetchPartnerPayments = async (
    formattedFirstDay: any,
    formattedLastDay: any
  ) => {
    setSelectedStartDate(formattedFirstDay);
    setSelectedEndDate(formattedLastDay);
    try {
      setIsLoading(true)
      const partnerResponse = await GetMonthlyBrokerFinalPremiumService({
        header,
        startDate: formattedFirstDay,
        endDate: formattedLastDay,
        category: selectedCategory,
      });
      setBrokerFinalPremium(partnerResponse.data);
      setBrokerTotalFinalPremium(partnerResponse.totalAmount);
      const brokerResponse = await GetMonthlyPartnerFinalPremiumService({
        header,
        startDate: formattedFirstDay,
        endDate: formattedLastDay,
        category: selectedCategory,
      });
      setPartnerFinalPremium(brokerResponse.data);
      setPartnerTotalFinalPremium(brokerResponse.totalAmount);
      const totalFinal = Number(
        brokerResponse.totalAmount + partnerResponse.totalAmount
      );
      setTotalFinalPremium(totalFinal);
    } catch (error) {
      const err: any = await error;
      toast.error(err.message);
    }finally{
      setIsLoading(false)
    }
  };
  const handleDownloadExcel = () => {
    if (isPartner === 1) {
      generateExcelFinalPremium(partnerFinalPremium, "partner");
    } else {
      generateExcelFinalPremium(brokerFinalPremium, "broker");
    }
  };
  useEffect(() => {
    const currentDate = new Date();
    const firstDayOfMonth = format(startOfMonth(currentDate), "yyyy-MM-dd");
    const lastDayOfMonth = format(endOfMonth(currentDate), "yyyy-MM-dd");
    fetchPartnerPayments(firstDayOfMonth, lastDayOfMonth);
     // eslint-disable-next-line 
  }, []);
  const validateFormValues = (schema: any) => async (values: any) => {
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
  const onSubmit = async (values: any) => {
    const newStartDate = dayjs(values.startDate).format(DAY_FORMAT);
    const newEndDate = dayjs(values.endDate).format(DAY_FORMAT);
    fetchPartnerPayments(newStartDate, newEndDate);
  };
  const handleFinalPremiumClick = async (flag: boolean) => {
    setSelectedPartner(flag);
    if (flag) {
      setIsPartner(1);
    } else {
      setIsPartner(2);
    }
  };
  return (
    <div className="bg-blue-200 p-7 mt-3">
      <Paper elevation={3} style={{ padding: 20 }}>
        <div className="flex justify-between items-center">
        <Typography variant="h5" className="text-black" gutterBottom>
          {title}{" "}
          <span className="text-safekaroDarkOrange">{totalFinalPremium}</span>
        </Typography>
        <Tooltip
            title={
              isPartner === 1
                ? "Download  Partner Excel"
                : "Download Broker Excel"
            }
          >
            <button
              className="md:w-10 md:h-10 h-4 w-4 bg-[#3BDB03] shadow-sm rounded flex justify-center items-center text-white"
              onClick={handleDownloadExcel}
            >
              <FileDownloadOutlinedIcon className="md:w-6 md:h-6 h-3 w-3" />
            </button>
          </Tooltip>
        </div>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, submitting }) => (
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
                          renderInput={(params) => (
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
                          renderInput={(params) => (
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
                    className="w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                  >
                    {isLoading?'Submitting':'Get Records'}
                                      </Button>
                </Grid>
              </Grid>
            </form>
          )}
        />
        <Grid container mb={2}>
          <Grid item md={6} className={"bg-safekaroDarkOrange "}>
            <Button type="button" onClick={() => handleFinalPremiumClick(true)}>
              <Tooltip title={`View Final Data`}>
                <h2 style={{ color: "white" }}>
                  Partner Total FinalPremium ({partnerTotalFinalPremium})
                </h2>
              </Tooltip>
            </Button>
          </Grid>
          <Grid item md={6} className={"bg-addButton "}>
            <Button
              type="button"
              onClick={() => handleFinalPremiumClick(false)}
            >
              <Tooltip title={`View Final Data`}>
                <h2 style={{ color: "white" }}>
                  Broker Total FinalPremium ({brokerTotalFinalPremium})
                </h2>
              </Tooltip>
            </Button>
          </Grid>
        </Grid>
        <Grid container className="bg-blue-200 mt-3">
          {selectedPartner ? (
            <>
              <Typography variant="h5" className="text-black p-5" gutterBottom>
                {"Partner Final Premium"}
              </Typography>
              <Grid container>
                {partnerFinalPremium.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                    <Link
                      state={selectedCategory}
                      to={`/finalpremium/monthly/partner/company/${selectedStartDate}/${selectedEndDate}/${item.partnerId}`}
                    >
                      <div className="bg-white m-2 p-3 rounded-2xl shadow-lg flex items-center justify-between transform transition-transform duration-200 hover:scale-105">
                        <div>
                          <Typography
                            variant="body2"
                            className="text-sm text-gray-600 mb-2"
                          >
                            {item.partnerName} ({item.partnerCode})
                          </Typography>
                          <Typography
                            variant="h5"
                            className="text-base font-bold text-gray-800"
                          >
                            {item.finalPremium}
                          </Typography>
                        </div>
                        {/* Uncomment if needed
                <img src={icon} alt={title} className="h-8 w-8" />
                */}
                      </div>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <>
              <Typography variant="h5" className="text-black p-5" gutterBottom>
                {"Broker Final Premium"}
              </Typography>
              <Grid container>
                {brokerFinalPremium.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                    <Link
                      state={selectedCategory}
                      to={`/finalpremium/monthly/broker/company/${selectedStartDate}/${selectedEndDate}/${item.brokerId}`}
                    >
                      <div className="bg-white m-2 p-3 rounded-2xl shadow-lg flex items-center justify-between transform transition-transform duration-200 hover:scale-105">
                        <div>
                          <Typography
                            variant="body2"
                            className="text-sm text-gray-600 mb-2"
                          >
                            {item.brokerName} ({item.brokerCode})
                          </Typography>
                          <Typography
                            variant="h5"
                            className="text-base font-bold text-gray-800"
                          >
                            {item.finalPremium}
                          </Typography>
                        </div>
                        {/* Uncomment if needed
              <img src={icon} alt={title} className="h-8 w-8" />
              */}
                      </div>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Grid>
      </Paper>
    </div>
  );
};
export default MonthlyFinalPremium;
