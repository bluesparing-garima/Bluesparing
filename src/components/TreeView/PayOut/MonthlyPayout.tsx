import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import GetMonthlyPartnerPaymentService from "../../../api/Dashboard/GetMonthlyPartnerPayment/GetMonthlyPartnerPaymentService";
import { DAY_FORMAT, header } from "../../../context/constant";
import toast from "react-hot-toast";
import FolderLikeStructureForPayout from "../FolderView/FolderViewMonthlyPayout";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { Field, Form } from "react-final-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import * as yup from "yup";
import { setIn } from "final-form";
import GetMonthlyPaidPayoutService from "../../../api/Dashboard/GetMonthlytPaidPayout/GetMonthlyPaidPayoutService";
import GetMonthlyPayoutBalanceService from "../../../api/Dashboard/GetMonthlyPayoutBalance/GetMonthlyPayoutBalanceService";
import GetMonthlyLeftDistributionService from "../../../api/Dashboard/GetMonthlyLeftDistribution/GetMonthlyLeftDistributionService";
import { useLocation } from "react-router-dom";
import { IPartnerBalance, IPartnerPaid, PartnerPayment } from "../ITreeView";
const MonthlyPayout = () => {
  const location = useLocation();
  const selectedCategory = location.state as string;
  const [partnerTotalPayment, setPartnerTotalPayment] = useState<number>(0);
  const [partnerPayment, setPartnerPayment] = useState<PartnerPayment[]>([]);
  const [partnerPaidTotalPayment, setPartnerPaidTotalPayment] =
    useState<number>(0);
  const [partnerLeftDisTotalamount, setPartnerLeftDisTotalamount] =
    useState<number>(0);
  const [partnerPayoutBalTotalPayment, setPartnerPayoutBalTotalPayment] =
    useState<number>(0);
  const [partnerPaidPayment, setpartnerPaidPayment] = useState<IPartnerPaid[]>(
    []
  );
  const [partnerPayOutBalance, setPartnerPayOutBalance] = useState<
    IPartnerPaid[]
  >([]);
  const [partnerLeftDisData, setPartnerLeftDisData] = useState<
  IPartnerBalance[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const fetchPartnerPayments = async (
    formattedFirstDay: any,
    formattedLastDay: any
  ) => {
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
      });
  };
  const fetchPartnerPaid = async (startDate: string, endDate: string) => {
    try {
      const res = await GetMonthlyPaidPayoutService({
        header,
        startDate,
        endDate,
        category: selectedCategory,
      });
      setpartnerPaidPayment(res.data);
      setPartnerPaidTotalPayment(res.totalAmount);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  const fetchpartnerPayOutBalance = async (
    startDate: string,
    endDate: string
  ) => {
    try {
      const res = await GetMonthlyPayoutBalanceService({
        header,
        startDate,
        endDate,
        category: selectedCategory,
      });
      setPartnerPayOutBalance(res.data);
      setPartnerPayoutBalTotalPayment(res.totalAmount);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  const fetchPartnerLeftDistributedAmount = async (
    startDate: string,
    endDate: string
  ) => {
    try {
      const res = await GetMonthlyLeftDistributionService({
        header,
        startDate,
        endDate,
        category: selectedCategory,
      });
      setPartnerLeftDisTotalamount(res.totalAmount);
      setPartnerLeftDisData(res.data);
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
      fetchPartnerPayments(formattedFirstDay, formattedLastDay),
      fetchPartnerPaid(formattedFirstDay, formattedLastDay),
      fetchpartnerPayOutBalance(formattedFirstDay, formattedLastDay),
      fetchPartnerLeftDistributedAmount(formattedFirstDay, formattedLastDay),
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
                  {}
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
          Monthly Payout
        </Typography>
        <FolderLikeStructureForPayout
          data={{
            name: "Monthly Payout amount",
            amount: partnerTotalPayment,
            children: partnerPayment,
          }}
          api="monthly_payout"
          startDate={selectedStartDate}
          endDate={selectedEndDate}
        />
        <FolderLikeStructureForPayout
          data={{
            name: "Monthly Paid Payout amount",
            amount: partnerPaidTotalPayment,
            children: partnerPaidPayment,
          }}
          api="monthly_paid_payout"
          startDate={selectedStartDate}
          endDate={selectedEndDate}
        />
        <FolderLikeStructureForPayout
          data={{
            name: "Monthly  Payout Balance",
            amount: partnerPayoutBalTotalPayment,
            children: partnerPayOutBalance,
          }}
          api="monthly_payout_balance"
          startDate={selectedStartDate}
          endDate={selectedEndDate}
        />
        <FolderLikeStructureForPayout
          data={{
            name: "Monthly  Payout Left Distributed Amount",
            amount: partnerLeftDisTotalamount,
            children: partnerLeftDisData,
          }}
          api="monthly_left_dis_amount"
          startDate={selectedStartDate}
          endDate={selectedEndDate}
        />
      </Paper>
    </div>
  );
};
export default MonthlyPayout;
