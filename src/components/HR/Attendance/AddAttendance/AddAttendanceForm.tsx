import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, MenuItem } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Form, Field } from "react-final-form";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { AddAttendanceFormProps, IAttendance } from "../IAttendance";
import AddAttendanceService from "../../../../api/HR/Attendance/AddAttendance/AddHolidayService";
import { IAddAttendanceProps } from "../../../../api/HR/getHrTypes";
import { header } from "../../../../context/constant";

const AddAttendanceForm: React.FC<AddAttendanceFormProps> = ({
  initialValues,
}) => {
  const navigate = useNavigate();

  const [inTime, setInTime] = useState<string | null>(
    initialValues?.inTime || null
  );
  const [outTime, setOutTime] = useState<string | null>(
    initialValues?.outTime || null
  );
  const [totalHours, setTotalHours] = useState<string | null>(null);

  const validationSchema = yup.object().shape({
    employeeName: yup
      .string()
      .required("Employee Name is required")
      .min(1, "Employee Name must be at least 1 character")
      .max(100, "Employee Name cannot exceed 100 characters"),
    attendanceType: yup.string().required("Attendance Type is required"),
    inTime: yup
      .string()
      .required("In Time is required")
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),
    outTime: yup.string().when("attendanceType", {
      is: "leave",
      then: yup.string().notRequired(),
      otherwise: yup
        .string()
        .required("Out Time is required")
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),
    }),
    date: yup
      .date()
      .required("Date is required")
      .nullable()
      .typeError("Invalid date"),
    remark: yup.string().when("attendanceType", {
      is: (type: string) => type === "half day" || type === "leave",
      then: yup.string().required("Remark is required"),
      otherwise: yup.string().notRequired(),
    }),
  });

  const validateFormValues =
    (schema: yup.ObjectSchema<any>) => async (values: Record<string, any>) => {
      try {
        await schema.validate(values, { abortEarly: false });
      } catch (error: any) {
        const err = await error;
        toast.error(err.message);
      }
    };

  const validate = validateFormValues(validationSchema);

  const calculateTotalHours = (
    inTime: string | null,
    outTime: string | null
  ) => {
    if (inTime && outTime) {
      const start = dayjs(inTime, "HH:mm");
      const end = dayjs(outTime, "HH:mm");
      if (start.isValid() && end.isValid()) {
        const diffInMinutes = end.diff(start, "minute");

        // Calculate hours and remaining minutes
        const hours = Math.floor(diffInMinutes / 60);
        const minutes = diffInMinutes % 60;

        return `${hours} hours ${minutes} mins`;
      }
    }
    return "0";
  };

  useEffect(() => {
    const hours = calculateTotalHours(inTime, outTime);
    setTotalHours(hours);
  }, [inTime, outTime]);

  const onSubmit = async (values: IAttendance) => {
    try {
      let attendanceData: IAddAttendanceProps = {
        employeeName: initialValues?.employeeName || "",
        employeeId: initialValues?.employeeId || "",
      };
      if (values.attendanceType === "leave") {
        attendanceData.remarks = values.remarks;
        attendanceData.attendanceType = "leave";
        attendanceData.inTime = "0:0";
        attendanceData.outTime = "0:0";
        attendanceData.totalHours = "0:0";
      } else {
        attendanceData = {
          employeeName: initialValues?.employeeName || "",
          attendanceType: values.attendanceType,
          inTime: inTime ?? "0",
          outTime: outTime ?? null,
          remarks: values.remarks || "",
          employeeId: initialValues?.employeeId || "",
          totalHours: totalHours ?? "0",
        };
      }

      const res = await AddAttendanceService({
        header,
        attendanceData,
        id: initialValues?._id,
      });
      if (res.status === "success") {
        navigate(-1);
      }
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={validate}
        render={({ handleSubmit, submitting, errors, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="attendanceType">
                  {({ input, meta }) => (
                    <TextField
                      select
                      {...input}
                      label="Attendance Type"
                      variant="outlined"
                      fullWidth
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    >
                      <MenuItem value="present">Present</MenuItem>
                      <MenuItem value="leave">Leave</MenuItem>
                      <MenuItem value="half day">Half Day</MenuItem>
                    </TextField>
                  )}
                </Field>
              </Grid>

              {values.attendanceType !== "leave" && (
                <>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <Field name="inTime">
                      {({ input, meta }) => (
                        <TimePicker
                          label="In Time"
                          value={
                            inTime
                              ? dayjs(inTime, "HH:mm")
                              : dayjs().format("HH:mm")
                          }
                          onChange={(newValue) => {
                            const formattedTime =
                              dayjs(newValue).format("HH:mm");
                            setInTime(formattedTime);
                            input.onChange(formattedTime);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={meta.touched && Boolean(meta.error)}
                              helperText={meta.touched && meta.error}
                            />
                          )}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <Field name="outTime">
                      {({ input, meta }) => (
                        <TimePicker
                          label="Out Time"
                          value={
                            outTime
                              ? dayjs(outTime, "HH:mm")
                              : dayjs().format("HH:mm")
                          }
                          onChange={(newValue) => {
                            const formattedTime =
                              dayjs(newValue).format("HH:mm");
                            setOutTime(formattedTime);
                            input.onChange(formattedTime);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={meta.touched && Boolean(meta.error)}
                              helperText={meta.touched && meta.error}
                            />
                          )}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <TextField
                      label="Total Hours"
                      value={totalHours || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <Field name="remarks">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      label="Remark"
                      variant="outlined"
                      fullWidth
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  disabled={submitting}
                  variant="contained"
                  color="primary"
                  className="w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                >
                  {initialValues?._id ? "Update Attendance" : "Add Attendance"}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
      <Toaster position="bottom-center" reverseOrder={false} />
    </LocalizationProvider>
  );
};

export default AddAttendanceForm;
