import React, { useEffect, useMemo, useState } from "react";
import { IViewPolicy } from "../IPolicy";
import {
  DAY_FORMAT,
  DAYJS_DISPLAY_FORMAT,
  header,
  SafeKaroUser,
} from "../../../context/constant";
import { endOfMonth, format, startOfMonth } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import GetRmPoliciesService from "../../../api/Policies/GetRmPolicies/GetRmPoliciesService";
import dayjs from "dayjs";
import Timer from "../../../utils/Timer";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Field, Form } from "react-final-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { setIn } from "final-form";
import * as yup from "yup";
const RMGetMotorPolicies = () => {
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const startTime = sessionStorage.getItem("startDate");
  const endTime = sessionStorage.getItem("endDate");
  const [isLoading, setIsLoading] = useState(false);
  const [motorPolicies, setMotorPolicies] = useState<IViewPolicy[]>([]);

  const [stDate, setStDate] = useState(startTime || "");
  const [eDate, setEdate] = useState(endTime || "");

  const parsedData = useMemo(
    () =>
      motorPolicies?.map(
        (motorPolicy: IViewPolicy) =>
          ({
            uuid: motorPolicy.uuid,
            id: motorPolicy._id,
            policyId: motorPolicy.policyId,
            fullName: motorPolicy.fullName,
            bookingDate: motorPolicy.bookingDate,
            bookingTimer: motorPolicy.bookingTimer,
            leadDate: motorPolicy.leadDate,
            leadTimer: motorPolicy.leadTimer,
            productType: motorPolicy.productType,
            emailId: motorPolicy.emailId,
            weight: motorPolicy.weight,
            broker: motorPolicy.broker,
            policyType: motorPolicy.policyType,
            caseType: motorPolicy.caseType,
            category: motorPolicy.category,
            subCategory: motorPolicy.subCategory,
            companyName: motorPolicy.companyName,
            make: motorPolicy.make,
            model: motorPolicy.model,
            fuelType: motorPolicy.fuelType,
            rto: motorPolicy.rto,
            vehicleNumber: motorPolicy.vehicleNumber,
            seatingCapacity: motorPolicy.seatingCapacity,
            vehicleAge: motorPolicy.vehicleAge,
            ncb: motorPolicy.ncb,
            policyNumber: motorPolicy.policyNumber,
            phoneNumber: motorPolicy.phoneNumber,
            mfgYear: motorPolicy.mfgYear,
            registrationDate: dayjs(motorPolicy.registrationDate).format(
              DAYJS_DISPLAY_FORMAT
            ),
            endDate: dayjs(motorPolicy.endDate).format(DAYJS_DISPLAY_FORMAT),
            issueDate: dayjs(motorPolicy.issueDate).format(
              DAYJS_DISPLAY_FORMAT
            ),
            tenure: motorPolicy.tenure?.toLocaleString(),
            idv: motorPolicy.idv?.toLocaleString(),
            od: motorPolicy.od?.toLocaleString(),
            tp: motorPolicy.tp?.toLocaleString(),
            netPremium: motorPolicy.netPremium?.toLocaleString(),
            finalPremium: motorPolicy.finalPremium?.toLocaleString(),
            cc: motorPolicy.cc,
            paymentMode: motorPolicy.paymentMode,
            policyCreatedBy: motorPolicy.policyCreatedBy,
            createdOn: dayjs(motorPolicy.createdOn).format(
              DAYJS_DISPLAY_FORMAT
            ),
            paymentDetails: motorPolicy.paymentDetails,
            policyStatus: motorPolicy.policyStatus,
            partnerCode: motorPolicy.partnerCode,
            partnerId: motorPolicy.partnerId,
            partnerName: motorPolicy.partnerName,
            relationshipManagerName: motorPolicy.relationshipManagerName,
            relationshipManagerId: motorPolicy.relationshipManagerId,
            rcFront: motorPolicy.rcFront,
            rcBack: motorPolicy.rcBack,
            previousPolicy: motorPolicy.previousPolicy,
            survey: motorPolicy.survey,
            puc: motorPolicy.puc,
            fitness: motorPolicy.fitness,
            proposal: motorPolicy.proposal,
            currentPolicy: motorPolicy.currentPolicy,
            payInPaymentStatus: motorPolicy.payInPaymentStatus,
            payInODAmount: motorPolicy.payInODAmount,
            payInODPercentage: motorPolicy.payInODPercentage,
            payInTPPercentage: motorPolicy.payInTPPercentage,
            payInTPAmount: motorPolicy.payInTPAmount,
            payInBalance: motorPolicy.payInBalance,
            payInCommission: motorPolicy.payInCommission,
            payOutODPercentage: motorPolicy.payOutODPercentage,
            payOutTPPercentage: motorPolicy.payOutTPPercentage,
            payOutODAmount: motorPolicy.payOutODAmount,
            payOutTPAmount: motorPolicy.payOutTPAmount,
            payOutBalance: motorPolicy.payOutBalance,
            payOutCommission: motorPolicy.payOutCommission,
            payInAmount: motorPolicy.payInAmount,
            payOutAmount: motorPolicy.payOutAmount,
            payOutPaymentStatus: motorPolicy.payOutPaymentStatus,
            other: motorPolicy.other,
            // documents: motorPolicy.documents,
            // forceUpdate: forcedRenderCount,
          } as unknown as IViewPolicy)
      ) ?? [],
    [motorPolicies]
  );

  const columns = useMemo<MRT_ColumnDef<IViewPolicy>[]>(
    () =>
      [
        {
          header: "Booking Time",
          accessorKey: "bookingTimer",
          visible: userData.role.toLowerCase() === "admin", //Conditional visibility
          Cell: ({ row }: { row: { original: IViewPolicy } }) => (
            <Timer timer={row.original.bookingTimer!} />
          ),
          size: 200,
        },
        {
          accessorKey: "leadTimer", //normal accessorKey
          header: "Lead Time",
          size: 100,
          visible: userData.role === "admin", // Conditional visibility
          Cell: ({ row }: { row: { original: IViewPolicy } }) => (
            <Timer timer={row.original.bookingTimer!} />
          ),
        },
        {
          accessorKey: "policyNumber",
          header: "Policy Number",
          size: 100,
        },
        {
          accessorKey: "policyType",
          header: "Policy Type",
          size: 100,
        },
        {
          accessorKey: "caseType",
          header: "Case Type",
          size: 100,
        },

        {
          accessorKey: "category",
          header: "Category",
          size: 100,
        },
        {
          accessorKey: "productType", //normal accessorKey
          header: "Product",
          size: 100,
        },
        {
          accessorKey: "subCategory", //normal accessorKey
          header: "Sub Category",
          size: 100,
        },
        {
          accessorKey: "companyName", //normal accessorKey
          header: "Company Name",
          size: 100,
        },
        {
          accessorKey: "vehicleNumber", //normal accessorKey
          header: "Vehicle Number",
          size: 100,
        },
        {
          accessorKey: "broker", //normal accessorKey
          header: "Broker",
          size: 100,
        },
        {
          accessorKey: "partnerName", //normal accessorKey
          header: "Partner Name",
          size: 100,
        },
        {
          accessorKey: "partnerCode",
          header: "Partner Code",
          size: 100,
        },
        {
          accessorKey: "make",
          header: "Make",
          size: 100,
        },
        {
          accessorKey: "model",
          header: "Model",
          size: 100,
        },
        {
          accessorKey: "fuelType",
          header: "Fuel Type",
          size: 100,
        },
        {
          accessorKey: "rto",
          header: "RTO",
          size: 100,
        },
        {
          accessorKey: "cc",
          header: "CC",
          size: 100,
        },
        {
          accessorKey: "seatingCapacity",
          header: "Seating Capacity",
          size: 100,
        },
        {
          accessorKey: "ncb",
          header: "NCB",
          size: 100,
        },
        {
          accessorKey: "od",
          header: "OD",
          size: 100,
        },
        {
          accessorKey: "tp",
          header: "TP",
          size: 100,
        },
        {
          accessorKey: "netPremium",
          header: "Net Premium",
          size: 100,
        },
        {
          accessorKey: "finalPremium",
          header: "Final Premium",
          size: 100,
        },
        {
          accessorKey: "payOutODPercentage",
          header: "PayOut OD %",
          size: 100,
        },
        {
          accessorKey: "payOutTPPercentage",
          header: "PayOut TP %",
          size: 100,
        },
        {
          accessorKey: "payOutCommission",
          header: "PayOut Amount",
          size: 100,
        },
        {
          accessorKey: "payOutAmount",
          header: "PayOut Paid Amount",
          size: 100,
        },
        {
          accessorKey: "payOutBalance",
          header: "PayOut Balance",
          size: 100,
        },
        {
          accessorKey: "payInODPercentage", //normal accessorKey
          header: "PayIn OD %",
          size: 100,
        },
        {
          accessorKey: "payInTPPercentage", //normal accessorKey
          header: "PayIn TP %",
          size: 100,
        },
        {
          accessorKey: "payInCommission", //normal accessorKey
          header: "PayIn Amount",
          size: 100,
        },
        {
          accessorKey: "payInAmount", //normal accessorKey
          header: "PayIn Paid Amount",
          size: 100,
        },
        {
          accessorKey: "payInBalance", //normal accessorKey
          header: "PayIn Balance",
          size: 100,
        },
        {
          header: "Revenue OD %",
          accessorKey: "revenue",
          Cell: ({ row }: { row: { original: IViewPolicy } }) => {
            // Assuming `payInCommission` and `payOutCommission` are available in `row.original`
            const { payInODPercentage, payOutODPercentage } = row.original;
            const revenue =
              (payInODPercentage ?? 0) - (payOutODPercentage ?? 0);
            return <span>{Math.round(revenue * 100) / 100}</span>; // Rounded to 2 decimal places
          },
          size: 150, // Adjust size as needed
        },
        {
          header: "Revenue TP %",
          accessorKey: "revenue",
          Cell: ({ row }: { row: { original: IViewPolicy } }) => {
            // Assuming `payInCommission` and `payOutCommission` are available in `row.original`
            const { payInTPPercentage, payOutTPPercentage } = row.original;
            const revenue =
              (payInTPPercentage ?? 0) - (payOutTPPercentage ?? 0);
            return <span>{Math.round(revenue * 100) / 100}</span>; // Rounded to 2 decimal places
          },
          size: 150, // Adjust size as needed
        },
        {
          header: "Revenue Amount",
          accessorKey: "revenue",
          // Assuming `payInCommission` and `payOutCommission` are available in `row.original`
          Cell: ({ row }: { row: { original: IViewPolicy } }) => {
            const { payInCommission, payOutCommission } = row.original;
            const revenue = (payInCommission ?? 0) - (payOutCommission ?? 0);
            return <span>{Math.round(revenue * 100) / 100}</span>; // Rounded to 2 decimal places
          },
          size: 150, // Adjust size as needed
        },
        {
          accessorKey: "fullName", //normal accessorKey
          header: "Full Name",
          size: 100,
        },
        {
          accessorKey: "emailId", //normal accessorKey
          header: "Email",
          size: 100,
        },
        {
          accessorKey: "phoneNumber", //normal accessorKey
          header: "Phone Number",
          size: 100,
        },
        {
          accessorKey: "vehicleAge", //normal accessorKey
          header: "Vehicle Age",
          size: 100,
        },
        {
          accessorKey: "mfgYear", //normal accessorKey
          header: "MFG Year",
          size: 100,
        },
        {
          accessorKey: "tenure", //normal accessorKey
          header: "Tenure",
          size: 100,
        },

        {
          accessorKey: "issueDate", //normal accessorKey
          header: "Issue Date",
          size: 100,
        },
        {
          header: "Created On",
          accessorKey: "createdOn",
          size: 50,
        },
      ].filter((column) => column.visible !== false),
    [userData.role]
  );

  useEffect(() => {
    if (stDate) {
      sessionStorage.setItem("startDate", stDate);
    }
  }, [stDate]);

  useEffect(() => {
    if (eDate) {
      sessionStorage.setItem("endDate", eDate);
    }
  }, [eDate]);

  useEffect(() => {
    const currentDate = new Date();
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    let formattedFirstDay = format(firstDayOfMonth, "yyyy-MM-dd");
    let formattedLastDay = format(lastDayOfMonth, "yyyy-MM-dd");
    if (stDate) {
      formattedFirstDay = stDate;
    }
    if (eDate) {
      formattedLastDay = eDate;
    }

    getPolicies(formattedFirstDay, formattedLastDay);
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
  const getPolicies = async (startDate: string, endDate: string) => {
    setIsLoading(true);
    try {
      const rmId = userData.id;
      const res = await GetRmPoliciesService({
        header,
        startDate,
        endDate,
        rmId,
      });
      setMotorPolicies(res.data);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const validationSchema = yup.object().shape({
    startDate: yup.string().nullable().required("Start Date is required"),
    endDate: yup.string().nullable().required("End Date is required"),
  });

  const validate = validateFormValues(validationSchema);

  const onSubmit = async () => {
    if (stDate && eDate) {
      const startDate = dayjs(stDate).format(DAY_FORMAT);
      const endDate = dayjs(eDate).format(DAY_FORMAT);
      getPolicies(startDate, endDate);
    } else {
      toast.error("please fill startDate and endDate ");
    }
  };
  const handleStartDateChange = (date: any, input: any) => {
    const newDate = dayjs(date).format(DAY_FORMAT);
    setStDate(newDate);
    if (input) {
      input.onChange(date);
    }
  };
  const handleEndDateChange = (date: any, input: any) => {
    const newDate = dayjs(date).format(DAY_FORMAT);
    input.onChange(date);
    setEdate(newDate);
  };
  return (
    <>
      <div className="bg-blue-200 md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Motor Policies Table
          </Typography>
          <Typography variant="h5" mb={2}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <Link
                  to="/rm/dashboard"
                  className="text-addButton font-bold text-sm"
                >
                  Dashboard /
                </Link>
                <span className="text-grey-600 text-sm"> Motor Policies</span>
              </div>
            </div>
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>

          <React.Fragment>
            <Form
              validate={validate}
              onSubmit={onSubmit}
              render={({ handleSubmit, submitting, errors, values }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    {/* Account Code Selection */}
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                      <Field name="startDate">
                        {({ input, meta }) => {
                          return (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="Start Date"
                                inputFormat="DD/MM/YYYY"
                                value={dayjs(stDate)}
                                onChange={(date) => {
                                  handleStartDateChange(date, input);
                                }}
                                renderInput={(params: any) => (
                                  <TextField
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={stDate}
                                    {...params}
                                    error={meta.touched && !!meta.error}
                                    helperText={meta.touched && meta.error}
                                  />
                                )}
                              />
                            </LocalizationProvider>
                          );
                        }}
                      </Field>
                    </Grid>
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                      <Field name="endDate">
                        {({ input, meta }) => {
                          return (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="End Date"
                                inputFormat="DD/MM/YYYY"
                                value={dayjs(eDate)} // Initialize the value if it's undefined
                                onChange={(date) =>
                                  handleEndDateChange(date, input)
                                }
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
                          );
                        }}
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
                        {isLoading ? "Getting..." : "Get Records"}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          </React.Fragment>

          <MaterialReactTable
            state={{ isLoading }}
            columns={columns}
            data={parsedData}
          />
        </Paper>
      </div>
      <Toaster position="bottom-center" reverseOrder={true} />
    </>
  );
};

export default RMGetMotorPolicies;
