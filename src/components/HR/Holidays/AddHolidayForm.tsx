import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Form, Field } from "react-final-form";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { IHolidayForm } from "./IHolidayForm";
import dayjs from "dayjs";
import AddHolidayService from "../../../api/HR/Holidays/AddHoliday/AddHolidayService";
import { header } from "../../../context/constant";
import { IAddHolidays } from "../../../api/HR/getHrTypes";
import { useNavigate } from "react-router-dom";
import EditHolidayService from "../../../api/HR/Holidays/EditHoliday/EditHolidayService";
interface AddHolidayFormProps {
  initialValues: IHolidayForm;
}

const AddHolidayForm: React.FC<AddHolidayFormProps> = ({ initialValues }) => {
  const navigate = useNavigate();

  const [selectedDay, setSelectedDay] = useState(
    initialValues ? initialValues.day : ""
  );
  const validationSchema = yup.object().shape({
    holidayName: yup
      .string()
      .required("Holiday Name is required")
      .min(1, "Holiday Name must be at least 1 character")
      .max(100, "Holiday Name cannot exceed 100 characters"),
    holidayDate: yup
      .date()
      .required("Date is required")
      .nullable()
      .typeError("Invalid date"),
  });

  const validateFormValues =
    (schema: yup.ObjectSchema<any>) => async (values: Record<string, any>) => {
      try {
        await schema.validate(values, { abortEarly: false });
      } catch (err) {
        console.log(err);
      }
    };

  const validate = validateFormValues(validationSchema);

  const onSubmit = async (values: IHolidayForm) => {
    try {
      const hd = dayjs(values.date).format("MM/DD/YYYY");
      const holidayData: IAddHolidays = { name: values.name, date: hd };
      if (initialValues.id) {
        await EditHolidayService({ header, holidayData, id: initialValues.id });
      } else {
        await AddHolidayService({ header, holidayData });
      }

      navigate("/hr/holidays");
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  const handleChange = (input: any, date: any) => {
    const d = dayjs(date);
    const dayOfWeek = d.format("dddd");
    input.onChange(date);
    setSelectedDay(dayOfWeek);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={validate}
        render={({ handleSubmit, submitting, errors }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="name">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      label="Enter Holiday Name"
                      variant="outlined"
                      fullWidth
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      style={{ minWidth: "250px" }} // Set a minimum width
                    />
                  )}
                </Field>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="date">
                  {({ input, meta }) => (
                    <DatePicker
                      {...input}
                      label="Select Holiday Date"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={meta.touched && Boolean(meta.error)}
                          helperText={meta.touched && meta.error}
                          fullWidth
                          style={{ minWidth: "250px" }} // Set a minimum width
                        />
                      )}
                      onChange={(date) => handleChange(input, date)}
                      value={input.value || null} // ensure controlled input
                    />
                  )}
                </Field>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="holidayDay">
                  {({ input }) => (
                    <TextField
                      {...input}
                      label="Holiday Day"
                      variant="outlined"
                      fullWidth
                      value={selectedDay}
                      InputProps={{
                        readOnly: true, // Make it read-only
                      }}
                      style={{ minWidth: "250px" }} // Set a minimum width
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
                  {initialValues.id === "0" ? "Add Holiday" : "Update Holiday"}
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

export default AddHolidayForm;
