import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { Paper, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import {
  DAYJS_DISPLAY_FORMAT,
  header,
} from "../../context/constant";

import toast, { Toaster } from "react-hot-toast";
import TransactionHistoryBrokerService from "../../api/Broker/TransactionHistory/TransactionHistoryBrokerService";
import { IPolicyPayment } from "../Policy/IPolicy";

const BrokerPoliciesTransaction = () => {
  const loc = useLocation();
  const { brokerId, transactionCode,remarks } = loc.state as any;
  const [isLoading, setIsLoading] = useState(false);
  const [brokerHistoryCard, setBrokerHistoryCard] = useState<IPolicyPayment[]>(
    []
  );
  const GetBrokerHistoryCard = useCallback((transactionCode, brokerId) => {
    setIsLoading(true);
    TransactionHistoryBrokerService({
      header,
      transactionCode: transactionCode,
      brokerId,
    })
      .then((partnerHistoryCardDetails) => {
        setBrokerHistoryCard(partnerHistoryCardDetails.data);
        setIsLoading(false);
      })
      .catch(async (error) => {
        setIsLoading(false);
        const err = await error;
        toast.error(err.message);
      });
  }, []);
  useEffect(() => {
    if (brokerId) {
      GetBrokerHistoryCard(transactionCode, brokerId);
    }
    // eslint-disable-next-line 
  }, [transactionCode, brokerId]);
  const columns = useMemo<MRT_ColumnDef<IPolicyPayment>[]>(
    () => [
      {
        accessorKey: "policyNumber",
        header: "Policy Number",
        size: 100,
      },
      {
        accessorKey: "payInCommission",
        header: "Total Commission",
        size: 100,
      },
      {
        accessorKey: "payInAmount",
        header: "Paid Amount",
        size: 100,
      },
      {
        accessorKey: "payInBalance",
        header: "Balance",
        size: 100,
      },
      {
        accessorKey: "policyDate",
        header: "Policy Date",
        size: 100,
      },
      {
        accessorKey: "paymentUpdatedOn",
        header: "Payment Date",
        size: 100,
      },
      {
        accessorKey: "remarks",
        header: "Remarks",
        size: 200,
        muiTableBodyCellProps: {
          sx: {
            height: "122px",
            overflow: "auto",
            width: "100px",
            display: "flex",
          },
        },
      },
    ],
    []
  );
  const parsedData = useMemo(
    () =>
      brokerHistoryCard.map(
        (motorPolicy: IPolicyPayment) =>
          ({
            policyNumber: motorPolicy.policyNumber,
            od: motorPolicy.od?.toLocaleString(),
            tp: motorPolicy.tp?.toLocaleString(),
            netPremium: motorPolicy.netPremium?.toLocaleString(),
            finalPremium: motorPolicy.finalPremium?.toLocaleString(),
            payInCommission: motorPolicy.payInCommission,
            payInAmount: motorPolicy.payInAmount,
            payInPaymentStatus: motorPolicy.payInPaymentStatus,
            payInBalance: motorPolicy.payInBalance,
            remarks: remarks,
            paymentUpdatedOn: dayjs(motorPolicy.paymentUpdatedOn).format(
              DAYJS_DISPLAY_FORMAT
            ),
            policyDate: dayjs(motorPolicy.policyDate).format(
              DAYJS_DISPLAY_FORMAT
            ),
          } as unknown as IPolicyPayment)
      ) ?? [],
    [brokerHistoryCard]
  );


  return (
    <div className="bg-blue-200 md:p-7 p-2">
      <Paper elevation={3} style={{ padding: 30 }}>
        {}
        <Typography className="text-safekaroDarkOrange" variant="h5">
          Account History Table
        </Typography>
        {}
        <Typography variant="h5" mb={2}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <Link
                to="/dashboard"
                className="text-addButton font-bold text-sm"
              >
                Dashboard {"/ "}
              </Link>
              <Link
                to="/partnerdashboard/withdrawal"
                className="text-addButton font-bold text-sm"
              >
                History /
              </Link>
              <span className="text-grey-600 text-sm"> Account History</span>
            </div>
          </div>
          {}
          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
        </Typography>
        {/* <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, submitting, errors, values }) => (
            <form onSubmit={handleSubmit} noValidate>
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
                          onChange={(date) => {
                            input.onChange(date);
                            setStartDate(date);
                          }}
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
                          onChange={(date) => {
                            input.onChange(date);
                            setEndDate(date);
                          }}
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
                {}
                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    className="ml-4 w-26 h-10 bg-safekaroDarkOrange text-white p-3 text-xs rounded-sm"
                    onClick={handleClickDebit}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        /> */}
        {}
        <MaterialReactTable
          state={{ isLoading }}
          columns={columns}
          data={parsedData}
        />
      </Paper>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default BrokerPoliciesTransaction;
