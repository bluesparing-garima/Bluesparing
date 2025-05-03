import React from "react";
import { Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Field } from "react-final-form";
import { Dayjs } from "dayjs";

interface DynamicDateFieldProps {
  name: string;
  label: string;
  disableFuture?: boolean;
  gridProps?: {
    lg?: number;
    md?: number;
    sm?: number;
    xs?: number;
  };
  onChangeDate?: (date: Dayjs | null) => void;
}

const DynamicDateField: React.FC<DynamicDateFieldProps> = ({
  name,
  label,
  disableFuture = false,
  gridProps = { lg: 4, md: 4, sm: 6, xs: 12 },onChangeDate
}) => {
  return (
    <Grid item {...gridProps}>
      <Field name={name}>
        {({ input, meta }: any) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disableFuture={disableFuture}
              label={label}
              value={input.value || null} 
             
              inputFormat="DD/MM/YYYY"
              onChange={(date) => {
                input.onChange(date);
                onChangeDate?.(date); 
              }}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={meta.touched && !!meta.error}
                  helperText={meta.touched && meta.error}
                />
              )}
            />
          </LocalizationProvider>
        )}
      </Field>
    </Grid>
  );
};

export default DynamicDateField;
